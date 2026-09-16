import React, { useState, useEffect } from 'react';
import { 
  Award, BookOpen, CheckCircle2, ChevronRight, Code2, 
  Flame, Plus, Sparkles, Terminal, Trash2, User, ExternalLink,
  Briefcase, ArrowRight, Zap, Target, BookmarkCheck
} from 'lucide-react';
import { 
  addStudentNote, 
  deleteStudentNote,
  subscribeToStudentNotes, 
  getStudentProjectsProgress 
} from '../services/firebase';
import { crioProjects } from '../data/learningData';

export default function StudentDashboard({ 
  currentUser, 
  onNavigateToSandbox, 
  onOpenChat, 
  onOpenLogin 
}) {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteTag, setNewNoteTag] = useState('Interview Prep');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [projectProgressMap, setProjectProgressMap] = useState({});

  // Real-time student notes synchronization via Firestore
  useEffect(() => {
    if (!currentUser?.uid) {
      // Local fallback initial notes
      setNotes([
        {
          id: 'note-1',
          title: 'Debounce Function for Search API',
          content: 'Keep delay around 400ms. Clear timeout on every keyup to avoid overloading Node backend.',
          tags: 'React & Frontend',
          createdAt: new Date().toLocaleDateString()
        },
        {
          id: 'note-2',
          title: 'Redis Atomic Inventory Decrement',
          content: 'Use DECRBY in Redis pipeline before writing order to MongoDB. If balance < 0, roll back with INCRBY.',
          tags: 'Concurrency & Backend',
          createdAt: new Date().toLocaleDateString()
        }
      ]);
      return;
    }

    const unsubscribe = subscribeToStudentNotes(currentUser.uid, (data) => {
      if (data && data.length > 0) {
        setNotes(data);
      }
    });

    // Load progress
    getStudentProjectsProgress(currentUser.uid).then(progress => {
      if (progress) setProjectProgressMap(progress);
    });

    return () => unsubscribe();
  }, [currentUser?.uid]);

  const handleSaveNote = async (e) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    const notePayload = {
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      tags: newNoteTag
    };

    if (currentUser?.uid) {
      await addStudentNote(currentUser.uid, notePayload);
    } else {
      setNotes(prev => [{
        id: `local-note-${Date.now()}`,
        ...notePayload,
        createdAt: new Date().toLocaleDateString()
      }, ...prev]);
    }

    setNewNoteTitle('');
    setNewNoteContent('');
    setIsAddingNote(false);
  };

  const handleDeleteNote = async (noteId) => {
    // Optimistically update
    setNotes(prev => prev.filter(n => n.id !== noteId));
    if (currentUser?.uid) {
      try {
        await deleteStudentNote(currentUser.uid, noteId);
      } catch (err) {
        console.error("Failed to delete note:", err);
      }
    }
  };

  // Student stats
  const xp = currentUser?.xpPoints || 420;
  const completedProjectsCount = currentUser?.completedProjects || 1;
  const studentName = currentUser?.displayName || currentUser?.name || 'Student Learner';

  return (
    <div className="crio-student-dashboard">
      {/* Top Greeting & Stats Ribbon (Navy/Dark Card with High-Contrast White/Cyan Accents) */}
      <div className="student-hero-banner">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="student-avatar-large">
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt={studentName} className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                  {studentName.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white tracking-tight">{studentName}</h1>
                <span className="badge badge-accent text-xs">
                  {currentUser?.role === 'ADMIN' ? 'Administrator' : 'Fellowship Scholar'}
                </span>
              </div>
              <p className="text-gray-200 text-sm mt-1">
                Track: <strong className="text-cyan-300">{currentUser?.targetTrack || 'Full Stack Developer'}</strong> • Target CTC: <strong className="text-emerald-300">14.5 LPA</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => onOpenChat({ projectName: 'Student Hub', milestoneTitle: 'General Guidance' })}
              className="btn btn-accent flex items-center gap-2 text-sm shadow-md"
            >
              <Sparkles size={16} />
              <span>Ask Gemini AI Mentor</span>
            </button>
            {!currentUser && (
              <button onClick={onOpenLogin} className="btn btn-secondary text-sm">
                <span>Sign in with Google</span>
              </button>
            )}
          </div>
        </div>

        {/* Gamification Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="stat-pill">
            <div className="stat-icon bg-amber-500/20 text-amber-400">
              <Zap size={20} />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white">{xp} XP</div>
              <div className="text-xs text-gray-300">Experience Points</div>
            </div>
          </div>

          <div className="stat-pill">
            <div className="stat-icon bg-rose-500/20 text-rose-400">
              <Flame size={20} />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white">5 Days</div>
              <div className="text-xs text-gray-300">Learning Streak</div>
            </div>
          </div>

          <div className="stat-pill">
            <div className="stat-icon bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white">{completedProjectsCount} / 4</div>
              <div className="text-xs text-gray-300">Projects Mastered</div>
            </div>
          </div>

          <div className="stat-pill">
            <div className="stat-icon bg-cyan-500/20 text-cyan-400">
              <Target size={20} />
            </div>
            <div>
              <div className="text-xl font-extrabold text-white">88%</div>
              <div className="text-xs text-gray-300">Interview Readiness</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Projects In-Progress + Study Notes */}
      <div className="dashboard-grid mt-8">
        {/* Left Column: Developer Project Sandboxes */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Code2 size={22} className="text-cyan-500" />
                <span>Production Learning Projects</span>
              </h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                Run code in browser sandboxes, pass unit tests, and earn verified badges.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {crioProjects.map((proj) => {
              const savedProgress = projectProgressMap[proj.id];
              const completedCount = savedProgress?.completedMilestones || (proj.id === 'qkart' ? 2 : 0);
              const totalCount = proj.milestones.length;
              const percent = Math.round((completedCount / totalCount) * 100);

              return (
                <div key={proj.id} className="project-dashboard-card">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{proj.icon}</span>
                        <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                          {proj.title}
                        </h3>
                        <span className="badge badge-secondary text-[11px]">{proj.difficulty}</span>
                      </div>
                      <p className="text-xs mt-1 line-clamp-1" style={{ color: 'var(--text-secondary)' }}>
                        {proj.description}
                      </p>
                      
                      {/* Tech stack tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {proj.techStack.map((tech, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="text-[11px] px-2 py-0.5 font-medium"
                            style={{ 
                              background: 'var(--bg-input)', 
                              border: '1px solid var(--border-color)',
                              color: 'var(--text-secondary)' 
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between gap-2">
                      <div>
                        <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">{percent}% Complete</span>
                        <div className="w-28 bg-gray-200 dark:bg-gray-800 h-2 mt-1 overflow-hidden border border-gray-300 dark:border-gray-700">
                          <div 
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => onNavigateToSandbox(proj.id)}
                        className="btn btn-sm btn-primary flex items-center gap-1.5"
                      >
                        <Terminal size={14} />
                        <span>Open Sandbox</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Milestones list preview */}
                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {proj.milestones.map((m, mIdx) => {
                      const isDone = mIdx < completedCount;
                      return (
                        <div 
                          key={m.id} 
                          className={`p-2 border text-[11px] flex items-center gap-1.5 ${
                            isDone 
                              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300' 
                              : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          <CheckCircle2 size={13} className={isDone ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'} />
                          <span className="truncate">{m.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: AI Doubt Solver & Personal Study Notes */}
        <div className="space-y-6">
          {/* Gemini AI Copilot Card */}
          <div className="gemini-promo-card">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Gemini AI Study Mentor</h3>
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  Stuck on a test case or concept? Ask your dedicated AI mentor for instant explanations and architecture reviews.
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <button 
                onClick={() => onOpenChat({ projectName: 'QKart', milestoneTitle: 'Debounce Search' })}
                className="w-full text-left text-xs p-2.5 transition-colors flex items-center justify-between"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              >
                <span>💡 "Explain debounced API calls with code sample"</span>
                <ChevronRight size={14} className="text-cyan-500" />
              </button>
              <button 
                onClick={() => onOpenChat({ projectName: 'Placements', milestoneTitle: 'Interview Prep' })}
                className="w-full text-left text-xs p-2.5 transition-colors flex items-center justify-between"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              >
                <span>🎯 "What are top questions in Swiggy machine coding?"</span>
                <ChevronRight size={14} className="text-cyan-500" />
              </button>
              <button 
                onClick={() => onOpenChat({ projectName: 'Sandbox', milestoneTitle: 'Test Suite Debugger' })}
                className="w-full text-left text-xs p-2.5 transition-colors flex items-center justify-between"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              >
                <span>⚡ "Why is my Jest / Vitest assertion timing out?"</span>
                <ChevronRight size={14} className="text-cyan-500" />
              </button>
            </div>
          </div>

          {/* Cloud Persisted Study Notes */}
          <div className="project-dashboard-card">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-base flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <BookmarkCheck size={18} className="text-cyan-500" />
                  <span>Quick Study Notes</span>
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Personalized revision bookmarks synced to your Firebase account.
                </p>
              </div>

              <button 
                onClick={() => setIsAddingNote(!isAddingNote)}
                className="btn btn-sm btn-primary flex items-center gap-1 text-xs"
              >
                <Plus size={14} />
                <span>Add Note</span>
              </button>
            </div>

            {/* Note creation form */}
            {isAddingNote && (
              <form onSubmit={handleSaveNote} className="mb-4 p-3 bg-gray-50 dark:bg-slate-900/60 border border-gray-200 dark:border-slate-800 space-y-2">
                <input 
                  type="text"
                  placeholder="Note Title (e.g., Redis Lock Pattern)"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  className="form-control text-xs"
                  required
                />
                <textarea 
                  placeholder="Key concepts, snippet, or interview tip..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="form-control text-xs resize-none"
                  rows={3}
                  required
                />
                <div className="flex items-center justify-between gap-2 pt-1">
                  <select 
                    value={newNoteTag} 
                    onChange={(e) => setNewNoteTag(e.target.value)}
                    className="form-control text-xs max-w-[140px]"
                  >
                    <option value="Interview Prep">Interview Prep</option>
                    <option value="Frontend & React">Frontend & React</option>
                    <option value="Backend & APIs">Backend & APIs</option>
                    <option value="System Design">System Design</option>
                  </select>
                  <div className="flex gap-2">
                    <button 
                      type="button" 
                      onClick={() => setIsAddingNote(false)} 
                      className="btn btn-sm btn-secondary text-xs"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-sm btn-primary text-xs">
                      Save to Cloud
                    </button>
                  </div>
                </div>
              </form>
            )}

            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {notes.length === 0 ? (
                <div className="p-4 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                  No study notes yet. Click <strong>+ Add Note</strong> above to save key learning concepts!
                </div>
              ) : (
                notes.map((n) => (
                  <div 
                    key={n.id} 
                    className="p-3 transition-all"
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-xs" style={{ color: 'var(--text-primary)' }}>
                        {n.title}
                      </h4>
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="text-[10px] px-1.5 py-0.5 font-medium"
                          style={{
                            background: 'rgba(0, 168, 204, 0.1)',
                            color: '#00a8cc',
                            border: '1px solid rgba(0, 168, 204, 0.25)'
                          }}
                        >
                          {n.tags || 'General'}
                        </span>
                        <button
                          onClick={() => handleDeleteNote(n.id)}
                          className="text-gray-400 hover:text-red-500 p-0.5 transition-colors"
                          title="Delete note"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs mt-1.5 leading-relaxed font-sans" style={{ color: 'var(--text-secondary)' }}>
                      {n.content}
                    </p>
                    <div className="text-[10px] mt-2" style={{ color: 'var(--text-muted)' }}>
                      Added on {n.createdAt}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
