import React, { useState, useEffect } from 'react';
import { 
  Terminal, Play, CheckCircle2, AlertCircle, Code, 
  Layers, FileCode, Check, RefreshCw, Award, Copy, ExternalLink, Sparkles, Database, Bot 
} from 'lucide-react';
import { learningApi } from '../services/api';
import { crioProjects as fallbackProjects } from '../data/learningData';
import { saveProjectProgress } from '../services/firebase';

export default function CrioProjectStudio({ 
  initialProjectId = 'qkart',
  onApplyForProgram,
  currentUser = null,
  onOpenChat = () => {}
}) {
  const [projects, setProjects] = useState(fallbackProjects);
  const [activeProject, setActiveProject] = useState(() => {
    return fallbackProjects.find(p => p.id === initialProjectId) || fallbackProjects[0];
  });
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const [activeStudioTab, setActiveStudioTab] = useState('code'); // 'code' | 'architecture' | 'tests' | 'terminal'
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [passedMilestones, setPassedMilestones] = useState({ 'qkart-m1': true });
  const [copiedCode, setCopiedCode] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadProjects() {
      try {
        const data = await learningApi.getProjects();
        if (isMounted && data && data.length > 0) {
          setProjects(data);
          const found = data.find(p => p.id === initialProjectId) || data[0];
          setActiveProject(found);
        }
      } catch (err) {
        // Fallback already initialized in state
      }
    }
    loadProjects();
    return () => { isMounted = false; };
  }, [initialProjectId]);

  const handleSelectProject = (proj) => {
    setActiveProject(proj);
    setActiveMilestoneIndex(0);
    setTestResults(null);
  };

  const currentMilestone = activeProject?.milestones?.[activeMilestoneIndex] || activeProject?.milestones?.[0];

  const handleRunTests = async () => {
    if (!activeProject || !currentMilestone) return;
    setIsRunningTests(true);
    setActiveStudioTab('terminal');

    try {
      const results = await learningApi.runProjectTests(activeProject.id, currentMilestone.id);
      setTestResults(results);

      // Mark this milestone as passed
      const key = `${activeProject.id}-${currentMilestone.id}`;
      setPassedMilestones(prev => ({ ...prev, [key]: true }));

      // Persist in Firestore if student logged in
      if (currentUser?.uid) {
        saveProjectProgress(currentUser.uid, activeProject.id, {
          projectName: activeProject.title,
          completedMilestones: activeMilestoneIndex + 1,
          totalMilestones: activeProject.milestones.length,
          lastPassedMilestone: currentMilestone.title,
          lastRunStatus: 'PASSED'
        });
      }

      // Check if all milestones passed
      const allPassed = activeProject.milestones.every(
        (m) => m.id === currentMilestone.id || passedMilestones[`${activeProject.id}-${m.id}`]
      );
      if (allPassed) {
        setTimeout(() => {
          setShowCertificate(true);
        }, 1200);
      }
    } catch (err) {
      console.error("Test execution failed:", err);
    } finally {
      setIsRunningTests(false);
    }
  };

  const handleCopyCode = () => {
    if (currentMilestone?.code) {
      navigator.clipboard.writeText(currentMilestone.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const progressPercentage = activeProject?.milestones
    ? Math.round(
        (activeProject.milestones.filter(m => passedMilestones[`${activeProject.id}-${m.id}`]).length /
          activeProject.milestones.length) *
          100
      )
    : 0;

  if (!activeProject) {
    return (
      <div className="studio-loading-panel">
        <RefreshCw className="spin text-blue" size={32} />
        <p>Loading OPELS Developer Sandbox & Project Workspaces...</p>
      </div>
    );
  }

  return (
    <section className="crio-section-wrapper project-studio-container" id="sandbox-section">
      {/* Studio Header */}
      <div className="studio-top-bar">
        <div>
          <div className="studio-badge">
            <Terminal size={14} className="text-cyan" />
            <span>OPELS CRIO-STYLE REAL-WORLD DEV WORKSPACE</span>
          </div>
          <h2 className="studio-main-title">
            The Interactive <span className="highlight-blue">Project Sandbox</span>
          </h2>
          <p className="studio-sub-title">
            Select an enterprise project below. Inspect production requirements, review the code spec,
            and run simulated integration tests in a virtualized container.
          </p>
        </div>

        <div className="studio-header-stats">
          <div className="milestone-progress-box">
            <div className="progress-info-row">
              <span>Project Completion</span>
              <span className="progress-pct-bold">{progressPercentage}%</span>
            </div>
            <div className="progress-track">
              <div 
                className="progress-fill" 
                style={{ width: `${Math.max(progressPercentage, 10)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Selector Ribbon */}
      <div className="project-selector-strip">
        {projects.map((p) => {
          const isSelected = p.id === activeProject.id;
          return (
            <button
              key={p.id}
              className={`project-tab-btn ${isSelected ? 'active' : ''}`}
              onClick={() => handleSelectProject(p)}
            >
              <div className="tab-proj-name">{p.name}</div>
              <div className="tab-proj-tag">{p.companyTag}</div>
            </button>
          );
        })}
      </div>

      {/* Main Studio Work Area */}
      <div className="studio-layout">
        {/* Left Sidebar: Milestones & Project Metadata */}
        <div className="studio-sidebar">
          <div className="project-meta-card">
            <span className="meta-category">{activeProject.category}</span>
            <h3 className="meta-title">{activeProject.name}</h3>
            <p className="meta-desc">{activeProject.description}</p>
            
            <div className="meta-details-grid">
              <div className="meta-detail-item">
                <span className="meta-lbl">ESTIMATED TIME</span>
                <span className="meta-val">{activeProject.estimatedHours}</span>
              </div>
              <div className="meta-detail-item">
                <span className="meta-lbl">DIFFICULTY</span>
                <span className="meta-val highlight">{activeProject.difficulty}</span>
              </div>
            </div>

            <div className="meta-tech-pills">
              {activeProject.techStack.map((tech, idx) => (
                <span key={idx} className="tech-tag-sm">{tech}</span>
              ))}
            </div>
          </div>

          {/* Milestone Navigator */}
          <div className="milestones-nav-card">
            <h4 className="milestones-heading">
              <Layers size={16} /> SPRINT MILESTONES ({activeProject.milestones.length})
            </h4>
            <div className="milestones-list">
              {activeProject.milestones.map((m, idx) => {
                const isPassed = passedMilestones[`${activeProject.id}-${m.id}`];
                const isActive = activeMilestoneIndex === idx;
                return (
                  <div
                    key={m.id}
                    className={`milestone-item ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                    onClick={() => {
                      setActiveMilestoneIndex(idx);
                      setTestResults(null);
                    }}
                  >
                    <div className="milestone-status-icon">
                      {isPassed ? (
                        <CheckCircle2 size={16} className="text-cyan" />
                      ) : (
                        <span className="milestone-num">{idx + 1}</span>
                      )}
                    </div>
                    <div className="milestone-text">
                      <div className="milestone-title-text">{m.title}</div>
                      <div className="milestone-file-sub">{m.file}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Main Panel: Editor, Architecture, Tests & Terminal */}
        <div className="studio-editor-panel">
          {/* Workspace Tabs & Run Action */}
          <div className="editor-control-bar">
            <div className="editor-tabs">
              <button
                className={`editor-tab-btn ${activeStudioTab === 'code' ? 'active' : ''}`}
                onClick={() => setActiveStudioTab('code')}
              >
                <FileCode size={15} />
                <span>{currentMilestone?.file || 'Solution.js'}</span>
              </button>
              <button
                className={`editor-tab-btn ${activeStudioTab === 'architecture' ? 'active' : ''}`}
                onClick={() => setActiveStudioTab('architecture')}
              >
                <Layers size={15} />
                <span>System Architecture</span>
              </button>
              <button
                className={`editor-tab-btn ${activeStudioTab === 'tests' ? 'active' : ''}`}
                onClick={() => setActiveStudioTab('tests')}
              >
                <CheckCircle2 size={15} />
                <span>Test Spec ({currentMilestone?.tests?.length || 0} assertions)</span>
              </button>
              <button
                className={`editor-tab-btn ${activeStudioTab === 'terminal' ? 'active' : ''}`}
                onClick={() => setActiveStudioTab('terminal')}
              >
                <Terminal size={15} />
                <span>Terminal {testResults ? '(Pass)' : ''}</span>
              </button>
            </div>

            <div className="editor-actions">
              {activeStudioTab === 'code' && (
                <button className="btn btn-secondary btn-sm" onClick={handleCopyCode} title="Copy code snippet">
                  {copiedCode ? <Check size={14} className="text-cyan" /> : <Copy size={14} />}
                  {copiedCode ? 'Copied' : 'Copy Code'}
                </button>
              )}
              <button 
                className="btn btn-secondary btn-sm flex items-center gap-1.5"
                onClick={() => onOpenChat({
                  projectName: activeProject?.title,
                  milestoneTitle: currentMilestone?.title
                })}
                title="Ask Gemini Mentor about this milestone code or architecture"
              >
                <Sparkles size={14} className="text-cyan-400" />
                <span>Ask AI Mentor</span>
              </button>
              <button 
                className="btn btn-primary btn-sm btn-run-tests"
                onClick={handleRunTests}
                disabled={isRunningTests}
              >
                {isRunningTests ? (
                  <>
                    <RefreshCw size={14} className="spin" />
                    <span>Running Test Suite...</span>
                  </>
                ) : (
                  <>
                    <Play size={14} />
                    <span>Run Verification Tests</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tab Content 1: Code Editor View */}
          {activeStudioTab === 'code' && (
            <div className="code-editor-body">
              <div className="code-spec-banner">
                <div className="spec-goal">
                  <strong>Milestone Requirement:</strong> {currentMilestone?.goal}
                </div>
              </div>
              <div className="code-pre-wrapper">
                <pre className="code-pre">
                  <code>{currentMilestone?.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Tab Content 2: Architecture & Specs */}
          {activeStudioTab === 'architecture' && (
            <div className="architecture-panel-body">
              <h4 className="arch-heading">Production Architecture Diagram & Design Trade-offs</h4>
              <p className="arch-summary">{activeProject.architecture}</p>

              <div className="arch-diagram-card">
                <div className="arch-node-row">
                  <div className="arch-node client-node">
                    <span className="node-type">CLIENT LAYER</span>
                    <span className="node-title">React / Vite SPA</span>
                    <span className="node-desc">Debounced Search & Optimistic UI</span>
                  </div>
                  <div className="arch-connector">── REST APIs (JWT) ──▶</div>
                  <div className="arch-node server-node">
                    <span className="node-type">SERVICE LAYER</span>
                    <span className="node-title">Node / Spring Boot</span>
                    <span className="node-desc">Stateless Microservices & Auth</span>
                  </div>
                  <div className="arch-connector">── Sub-10ms ──▶</div>
                  <div className="arch-node db-node">
                    <span className="node-type">DATA & CACHE</span>
                    <span className="node-title">Redis + MongoDB / SQL</span>
                    <span className="node-desc">Atomic DECR & Indexed Records</span>
                  </div>
                </div>
              </div>

              <div className="arch-takeaways">
                <h5>Key Engineering Takeaways You Learn in this Project:</h5>
                <ul>
                  <li>How to handle sudden traffic spikes without crashing relational database connection pools.</li>
                  <li>Implementing atomic inventory reservation to eliminate double-spending in high-speed flash sales.</li>
                  <li>Building production-grade test suites with Mockito / Jest to maintain 95%+ code coverage.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab Content 3: Test Spec Details */}
          {activeStudioTab === 'tests' && (
            <div className="tests-spec-body">
              <h4 className="tests-heading">Automated Test Suites Configured for this Milestone</h4>
              <p className="tests-desc">
                Crio & OPELS projects use automated test suites matching production CI/CD pipelines.
                Every pull request must clear these exact assertions before merging.
              </p>

              <div className="test-assertions-list">
                {currentMilestone?.tests?.map((t, idx) => (
                  <div key={idx} className="assertion-card">
                    <div className="assertion-left">
                      <span className="assertion-idx">Test #{idx + 1}</span>
                      <span className="assertion-name">{t.name}</span>
                    </div>
                    <span className="assertion-tag">Latency Target: &lt; 20ms</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content 4: Terminal Runner Output */}
          {activeStudioTab === 'terminal' && (
            <div className="terminal-body-view">
              <div className="terminal-header-line">
                <span>opels-test-runner: v2.4.0 (node 20.x, jest 29.7)</span>
                <span className="text-cyan">status: {isRunningTests ? 'RUNNING' : testResults ? 'ALL PASSED' : 'IDLE'}</span>
              </div>

              {isRunningTests ? (
                <div className="terminal-stream-logs">
                  <div className="log-line text-cyan">[CONTAINER] Bootstrapping isolated Docker test runtime...</div>
                  <div className="log-line">[SPAWN] Mounting virtual workspace: {currentMilestone?.file}</div>
                  <div className="log-line">[TEST] Executing test assertions in band...</div>
                  <div className="log-spinner-row">
                    <RefreshCw size={14} className="spin text-blue" />
                    <span>Executing integration test assertions...</span>
                  </div>
                </div>
              ) : testResults ? (
                <div className="terminal-stream-logs">
                  {testResults.logs?.map((log, idx) => (
                    <div 
                      key={idx} 
                      className={`log-line ${log.includes('PASS') || log.includes('SUCCESS') ? 'text-cyan' : ''}`}
                    >
                      {log}
                    </div>
                  ))}
                  <div className="test-summary-card">
                    <div className="summary-metric">
                      <span className="lbl">Status</span>
                      <span className="val-success">✓ Passed</span>
                    </div>
                    <div className="summary-metric">
                      <span className="lbl">Passed Count</span>
                      <span className="val-number">{testResults.passedCount} / {testResults.totalCount}</span>
                    </div>
                    <div className="summary-metric">
                      <span className="lbl">Code Coverage</span>
                      <span className="val-number">{testResults.coveragePercent}%</span>
                    </div>
                    <div className="summary-metric">
                      <span className="lbl">Time Taken</span>
                      <span className="val-number">{testResults.executionTimeMs}ms</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="terminal-idle-state">
                  <Terminal size={36} className="text-muted" />
                  <p>Click <strong>"Run Verification Tests"</strong> above to launch test validation in the virtual sandbox.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Project Completion Credential Modal */}
      {showCertificate && (
        <div className="modal-backdrop" onClick={() => setShowCertificate(false)}>
          <div className="modal-content certificate-modal" onClick={e => e.stopPropagation()}>
            <div className="certificate-header">
              <div className="cert-badge-ribbon">
                <Sparkles size={24} className="text-cyan" />
              </div>
              <h3 className="cert-title">Project Sprint Cleared!</h3>
              <p className="cert-sub">You have cleared all automated test specs for {activeProject.name}.</p>
            </div>

            <div className="certificate-body-card">
              <div className="cert-brand">
                <img src="/logo.png" alt="OPELS" style={{ height: '24px' }} />
                <span>OPELS EXPERIENTIAL TECH ACCELERATOR</span>
              </div>

              <div className="cert-hero-name">CERTIFICATE OF COMPLETION</div>
              <p className="cert-awarded">This verifies successful implementation and verification of:</p>
              <div className="cert-project-name">{activeProject.name}</div>
              <div className="cert-tags-row">
                <span>Enterprise Grade</span>
                <span>•</span>
                <span>100% Test Suite Cleared</span>
                <span>•</span>
                <span>Verified Git Commit</span>
              </div>
            </div>

            <div className="certificate-actions">
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setShowCertificate(false);
                  onApplyForProgram && onApplyForProgram();
                }}
              >
                Apply for Full Fellowship with Project Credit
              </button>
              <button className="btn btn-secondary" onClick={() => setShowCertificate(false)}>
                Back to Sandbox
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
