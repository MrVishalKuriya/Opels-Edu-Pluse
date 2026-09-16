import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Send, Sparkles, X, Minimize2, Maximize2, RefreshCw, 
  Copy, Check, User, Code2, Briefcase, Wrench, ChevronDown, 
  HelpCircle, BookOpen, Lightbulb, Trash2 
} from 'lucide-react';
import { saveChatMessageToFirestore, subscribeToChatMessages } from '../services/firebase';

// Helper to format inline markdown (bold & inline code)
function formatInlineMarkdown(text) {
  const parts = [];
  let remaining = text;
  let key = 0;

  // Simple token regex for bold and inline code
  const regex = /(\*\*.*?\*\*|`.*?`)/g;
  const split = remaining.split(regex);

  return split.map((token, i) => {
    if (token.startsWith('**') && token.endsWith('**')) {
      return <strong key={i} className="font-semibold text-cyan-400">{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith('`') && token.endsWith('`')) {
      return (
        <code 
          key={i} 
          className="px-1.5 py-0.5 mx-0.5 bg-black/40 text-cyan-300 font-mono text-[11px] border border-cyan-500/20"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    return token;
  });
}

// Markdown renderer for rich AI responses
function MarkdownContent({ content, onCopyCode }) {
  const blocks = [];
  const lines = content.split('\n');
  let inCodeBlock = false;
  let codeBlockLines = [];
  let codeBlockLang = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLang = line.replace('```', '').trim() || 'code';
        codeBlockLines = [];
      } else {
        inCodeBlock = false;
        const codeString = codeBlockLines.join('\n');
        blocks.push({
          type: 'code',
          lang: codeBlockLang,
          code: codeString
        });
        codeBlockLines = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.replace('### ', '') });
    } else if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.replace('## ', '') });
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      blocks.push({ type: 'bullet', text: line.slice(2) });
    } else if (line.trim().length > 0) {
      blocks.push({ type: 'p', text: line });
    }
  }

  // Handle unclosed code block if streaming/partial
  if (inCodeBlock && codeBlockLines.length > 0) {
    blocks.push({
      type: 'code',
      lang: codeBlockLang,
      code: codeBlockLines.join('\n')
    });
  }

  return (
    <div className="chat-markdown-body space-y-2">
      {blocks.map((block, bIdx) => {
        if (block.type === 'code') {
          return (
            <div key={bIdx} className="my-2 bg-[#050914] border border-cyan-900/50 overflow-hidden text-xs">
              <div className="flex items-center justify-between px-3 py-1.5 bg-[#0a1226] border-b border-cyan-950 text-[10px] text-gray-400">
                <span className="font-mono uppercase text-cyan-400 font-semibold">{block.lang}</span>
                <button
                  type="button"
                  onClick={() => onCopyCode(block.code)}
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <Copy size={11} />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="p-3 overflow-x-auto text-emerald-300 font-mono text-[11px] leading-relaxed">
                <code>{block.code}</code>
              </pre>
            </div>
          );
        }

        if (block.type === 'h2' || block.type === 'h3') {
          return (
            <h4 key={bIdx} className="font-bold text-cyan-300 text-xs mt-2.5 mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-cyan-400 inline-block"></span>
              <span>{block.text}</span>
            </h4>
          );
        }

        if (block.type === 'bullet') {
          return (
            <div key={bIdx} className="flex items-start gap-1.5 my-1 ml-1 text-xs">
              <span className="text-cyan-400 font-bold">•</span>
              <div>{formatInlineMarkdown(block.text)}</div>
            </div>
          );
        }

        return (
          <p key={bIdx} className="my-1 text-xs leading-relaxed">
            {formatInlineMarkdown(block.text)}
          </p>
        );
      })}
    </div>
  );
}

export default function StudentGeminiChat({ 
  currentUser, 
  currentContext = null, 
  isOpen = false, 
  onClose = () => {},
  isFloating = true 
}) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'model',
      content: `### Welcome to your OPELS AI Developer Mentor! 🚀\n\nI'm here to help you learn by doing. You can ask me to:\n- **Explain project architecture** (e.g., Redis atomicity, debounced APIs, RAG)\n- **Debug failing test cases** in the Developer Sandbox\n- **Prepare for placement rounds** at top product companies (Amazon, Swiggy, CRED)\n\n*Choose a role or click a prompt below to get started!*`,
      modelUsed: 'gemini-3.5-flash',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-3.5-flash'); // 'gemini-3.5-flash' | 'gemini-3.1-pro-preview' | 'gemini-3.1-flash-lite'
  const [selectedRole, setSelectedRole] = useState('mentor'); // 'mentor' | 'career' | 'debugger'
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Real-time Firestore sync when student is logged in
  useEffect(() => {
    if (!currentUser?.uid) return;

    const unsubscribe = subscribeToChatMessages(currentUser.uid, (remoteMsgs) => {
      if (remoteMsgs && remoteMsgs.length > 0) {
        setMessages(prev => {
          const existingMap = new Set(prev.map(m => m.content));
          const newOnes = remoteMsgs.filter(m => !existingMap.has(m.content));
          return [...prev, ...newOnes];
        });
      }
    });

    return () => unsubscribe();
  }, [currentUser?.uid]);

  const handleSendMessage = async (customPrompt = null) => {
    const textToSend = customPrompt || input.trim();
    if (!textToSend || loading) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    // Save to Firestore if student is logged in
    if (currentUser?.uid) {
      saveChatMessageToFirestore(currentUser.uid, userMessage);
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ role: m.role, content: m.content })),
          role: selectedRole,
          model: selectedModel,
          studentContext: currentContext ? {
            projectName: currentContext.projectName,
            milestone: currentContext.milestoneTitle,
            userName: currentUser?.displayName || currentUser?.name || 'Student'
          } : null
        })
      });

      const data = await response.json();
      const modelMessage = {
        id: `reply-${Date.now()}`,
        role: 'model',
        content: data.reply || "I've reviewed your request! Let's examine the next engineering step.",
        modelUsed: data.modelUsed || selectedModel,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, modelMessage]);

      if (currentUser?.uid) {
        saveChatMessageToFirestore(currentUser.uid, modelMessage);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'model',
          content: "⚠️ I encountered a temporary connection issue. Please verify your internet or try re-submitting your query.",
          modelUsed: selectedModel,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = (text, idx = null) => {
    navigator.clipboard.writeText(text);
    if (idx !== null) {
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        content: `### Conversation Cleared 🔄\n\nHow can I help you with your projects, coding doubts, or interview preparation today?`,
        modelUsed: selectedModel,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const quickPrompts = [
    { label: 'Debounce Search Logic', prompt: 'How does debouncing search input in QKart prevent API thrashing? Show standard JS implementation.' },
    { label: 'Redis Atomic Decr', prompt: 'Why is Redis DECRBY needed before writing inventory in MongoDB? Explain concurrency race conditions.' },
    { label: 'Swiggy System Design', prompt: 'What are the main architectural layers expected in an e-commerce checkout interview round?' },
    { label: 'Explain Test Suite', prompt: 'Explain how Vitest / Jest mocks async network calls in milestone verification.' }
  ];

  if (!isOpen) return null;

  return (
    <div className={`gemini-chat-container ${isFloating ? 'floating-widget' : ''} ${isMinimized ? 'minimized' : ''}`}>
      {/* Header Bar */}
      <div className="gemini-chat-header">
        <div className="flex items-center gap-2.5">
          <div className="chat-avatar-icon">
            <Sparkles size={16} className="text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-wide">OPELS Gemini Copilot</h3>
              <span className="badge badge-accent text-[10px] py-0 px-1 font-mono">
                {selectedModel.replace('gemini-', '').replace('-preview', '')}
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              {currentContext?.projectName ? `Context: ${currentContext.projectName}` : 'Socratic Code & Placement Mentor'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={handleClearChat}
            className="btn btn-icon btn-secondary btn-sm text-gray-400 hover:text-white"
            title="Clear Chat Thread"
          >
            <Trash2 size={13} />
          </button>
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="btn btn-icon btn-secondary btn-sm text-gray-400 hover:text-white"
            title={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
          </button>
          <button 
            onClick={onClose}
            className="btn btn-icon btn-secondary btn-sm text-gray-400 hover:text-red-400"
            title="Close Chat"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Controls: Model & Persona Selector */}
          <div className="gemini-chat-controls">
            <div className="control-group">
              <span className="control-label">AI Model:</span>
              <select 
                value={selectedModel} 
                onChange={(e) => setSelectedModel(e.target.value)}
                className="chat-select"
              >
                <option value="gemini-3.5-flash">Gemini 3.5 Flash (Recommended)</option>
                <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Deep Architecture)</option>
                <option value="gemini-3.1-flash-lite">Gemini 3.1 Flash Lite (Ultra Fast)</option>
              </select>
            </div>

            <div className="control-group">
              <span className="control-label">Mentor Persona:</span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setSelectedRole('mentor')}
                  className={`role-btn ${selectedRole === 'mentor' ? 'active' : ''}`}
                >
                  <Code2 size={12} />
                  <span>Socratic</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('career')}
                  className={`role-btn ${selectedRole === 'career' ? 'active' : ''}`}
                >
                  <Briefcase size={12} />
                  <span>Interview</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('debugger')}
                  className={`role-btn ${selectedRole === 'debugger' ? 'active' : ''}`}
                >
                  <Wrench size={12} />
                  <span>Debugger</span>
                </button>
              </div>
            </div>
          </div>

          {/* Context Banner */}
          {currentContext && (
            <div className="gemini-context-banner">
              <Lightbulb size={13} className="text-cyan-400 flex-shrink-0" />
              <span className="truncate">
                Attached to <strong>{currentContext.projectName}</strong> • {currentContext.milestoneTitle}
              </span>
            </div>
          )}

          {/* Messages Scrollable Area */}
          <div className="gemini-messages-thread">
            {messages.map((msg, idx) => (
              <div 
                key={msg.id || idx} 
                className={`chat-bubble-wrapper ${msg.role === 'user' ? 'user-side' : 'model-side'}`}
              >
                <div className="chat-avatar">
                  {msg.role === 'user' ? (
                    currentUser?.photoURL ? (
                      <img src={currentUser.photoURL} alt="User" className="w-5 h-5 rounded-full object-cover" />
                    ) : (
                      <User size={13} className="text-gray-300" />
                    )
                  ) : (
                    <Bot size={13} className="text-cyan-400" />
                  )}
                </div>

                <div className="chat-bubble">
                  <div className="chat-bubble-meta">
                    <span className="font-semibold text-[11px]">
                      {msg.role === 'user' ? (currentUser?.displayName || 'You') : 'Gemini Mentor'}
                    </span>
                    <span className="text-[10px] text-gray-400 ml-auto">{msg.timestamp}</span>
                  </div>

                  <MarkdownContent 
                    content={msg.content} 
                    onCopyCode={(c) => handleCopyCode(c)} 
                  />

                  {msg.role === 'model' && (
                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/10 text-[10px] text-gray-400">
                      <span>⚡ {msg.modelUsed || selectedModel}</span>
                      <button 
                        onClick={() => handleCopyCode(msg.content, idx)}
                        className="hover:text-white flex items-center gap-1 transition-colors"
                        title="Copy answer"
                      >
                        {copiedIndex === idx ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
                        <span>{copiedIndex === idx ? 'Copied' : 'Copy Full'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-bubble-wrapper model-side">
                <div className="chat-avatar">
                  <Bot size={13} className="text-cyan-400 animate-spin" />
                </div>
                <div className="chat-bubble">
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <Sparkles size={13} className="text-cyan-400 animate-pulse" />
                    <span>Gemini is generating step-by-step guidance...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="gemini-quick-prompts">
            {quickPrompts.map((qp, i) => (
              <button 
                key={i} 
                onClick={() => handleSendMessage(qp.prompt)}
                className="quick-prompt-pill"
                disabled={loading}
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} 
            className="gemini-chat-input-row"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask a question (Role: ${selectedRole})...`}
              className="chat-text-input"
              disabled={loading}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || loading}
              className="chat-send-btn"
              title="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </>
      )}
    </div>
  );
}
