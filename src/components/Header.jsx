import React from 'react';
import { 
  Plus, Moon, Sun, RefreshCw, Download, 
  Terminal, Code2, Briefcase, Award, Video, 
  LayoutDashboard, Home, Users, Bell, Calendar, LogIn, LogOut, 
  Sparkles, ChevronRight, GraduationCap, Zap, Bot 
} from 'lucide-react';

export default function Header({ 
  activeView, 
  setActiveView, 
  onAddStudent, 
  onExportCSV, 
  onRefresh, 
  theme, 
  toggleTheme,
  currentUser,
  onOpenLogin,
  onLogout,
  onOpenApply,
  onOpenSandbox,
  onOpenChat
}) {
  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'ADMIN': return { bg: 'rgba(239, 68, 68, 0.2)', text: '#f87171', label: 'ADMIN' };
      case 'FACULTY': return { bg: 'rgba(13, 148, 136, 0.2)', text: '#2dd4bf', label: 'MENTOR' };
      default: return { bg: 'rgba(0, 168, 204, 0.2)', text: '#00a8cc', label: 'STUDENT' };
    }
  };

  const roleStyle = currentUser ? getRoleBadgeStyle(currentUser.role) : null;

  return (
    <header className="app-header">
      {/* Header Top Bar with Official Company Logo */}
      <div className="company-header-top">
        <div className="brand" onClick={() => setActiveView('learning-home')} style={{ cursor: 'pointer' }}>
          <img src="/logo.png" alt="OPELS Logo" className="brand-logo-img" />
          <div>
            <div className="brand-title-wrap">
              <h1 className="brand-title">OPELS <span className="highlight-blue-light">Learn</span></h1>
              <span className="brand-crio-badge">EXPERIENTIAL TECH FELLOWSHIP</span>
            </div>
            <p className="brand-subtitle">Learn By Doing in Real Developer Sandboxes • 900+ Hiring Partners</p>
          </div>
        </div>

        <div className="header-actions">
          {/* Gemini AI Mentor Quick Trigger Button */}
          <button 
            className="btn btn-accent btn-header-ai"
            onClick={() => onOpenChat()}
            title="Ask OPELS Gemini AI Study Mentor"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.85rem' }}
          >
            <Sparkles size={15} className="animate-pulse" />
            <span>AI Mentor</span>
            <span className="text-[10px] uppercase font-mono px-1 py-0.2 bg-black/30 border border-white/20">
              Gemini
            </span>
          </button>

          {/* Quick CTA Buttons */}
          <button 
            className="btn btn-secondary btn-header-sandbox"
            onClick={onOpenSandbox}
            title="Launch Crio-style interactive developer sandbox"
          >
            <Terminal size={15} />
            <span>Dev Sandbox</span>
          </button>

          <button 
            className="btn btn-primary btn-header-apply"
            onClick={onOpenApply}
          >
            <Sparkles size={15} />
            <span>Book Free Trial</span>
          </button>

          {/* User Account / Role Status */}
          {currentUser ? (
            <div className="user-profile-badge" onClick={() => setActiveView('student-hub')} style={{ cursor: 'pointer' }} title="View Student Hub">
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt="Avatar" className="w-6 h-6 rounded-full object-cover border border-cyan-400" />
              ) : (
                <span className="badge" style={{ background: roleStyle.bg, color: roleStyle.text, padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}>
                  {roleStyle.label}
                </span>
              )}
              <span className="user-name-text font-medium">{currentUser.displayName || currentUser.name}</span>
              {currentUser.xpPoints && (
                <span className="text-[11px] font-bold text-amber-400 flex items-center gap-0.5">
                  <Zap size={12} /> {currentUser.xpPoints}
                </span>
              )}
              <button 
                className="btn btn-secondary btn-icon btn-logout-icon" 
                onClick={(e) => { e.stopPropagation(); onLogout(); }}
                title="Sign Out"
              >
                <LogOut size={13} />
              </button>
            </div>
          ) : (
            <button className="btn btn-secondary btn-signin" onClick={onOpenLogin}>
              <LogIn size={15} />
              <span>Sign In with Google</span>
            </button>
          )}

          {/* Theme Toggle Button */}
          <button 
            className="btn btn-secondary btn-icon btn-theme-toggle" 
            onClick={toggleTheme}
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Action buttons specific to Campus ERP view */}
          {activeView === 'portal' && (
            <>
              <button 
                className="btn btn-secondary btn-erp-action" 
                onClick={onExportCSV}
                title="Export Current Roster to CSV"
              >
                <Download size={16} />
                <span>Export CSV</span>
              </button>

              <button 
                className="btn btn-secondary btn-icon" 
                onClick={onRefresh}
                title="Refresh Data"
              >
                <RefreshCw size={16} />
              </button>

              {(!currentUser || currentUser.role === 'ADMIN' || currentUser.role === 'FACULTY') && (
                <button className="btn btn-primary btn-erp-action" onClick={onAddStudent}>
                  <Plus size={16} />
                  <span>Add Student</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Nav Ribbon Tabs */}
      <nav className="nav-tabs-wrapper">
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeView === 'learning-home' ? 'active' : ''}`}
            onClick={() => setActiveView('learning-home')}
          >
            <Home size={15} />
            <span>Home</span>
          </button>

          {/* Dedicated Student Friendly Hub Tab */}
          <button 
            className={`nav-tab student-hub-tab ${activeView === 'student-hub' ? 'active' : ''}`}
            onClick={() => setActiveView('student-hub')}
          >
            <GraduationCap size={15} />
            <span>Student Hub</span>
            <span className="badge badge-accent text-[10px] py-0 px-1 ml-1">My Tracks</span>
          </button>

          <button 
            className={`nav-tab ${activeView === 'programs' ? 'active' : ''}`}
            onClick={() => setActiveView('programs')}
          >
            <Code2 size={15} />
            <span>Fellowship Tracks</span>
          </button>

          <button 
            className={`nav-tab ${activeView === 'sandbox' ? 'active' : ''}`}
            onClick={() => setActiveView('sandbox')}
          >
            <Terminal size={15} />
            <span>Project Sandbox</span>
            <span className="nav-pill-pulse">Live</span>
          </button>

          <button 
            className={`nav-tab ${activeView === 'placements' ? 'active' : ''}`}
            onClick={() => setActiveView('placements')}
          >
            <Briefcase size={15} />
            <span>Placements (94.2%)</span>
          </button>

          <button 
            className={`nav-tab ${activeView === 'masterclasses' ? 'active' : ''}`}
            onClick={() => setActiveView('masterclasses')}
          >
            <Video size={15} />
            <span>Live Masterclasses</span>
          </button>

          <button 
            className={`nav-tab ${activeView === 'scholarship' ? 'active' : ''}`}
            onClick={() => setActiveView('scholarship')}
          >
            <Award size={15} />
            <span>Scholarship Quiz</span>
          </button>

          {/* Campus ERP & Directory Toggle */}
          <button 
            className={`nav-tab erp-tab ${['portal', 'faculty', 'notices', 'schedule'].includes(activeView) ? 'active' : ''}`}
            onClick={() => setActiveView('portal')}
            title="Switch to College Campus ERP & Student Records"
          >
            <LayoutDashboard size={15} />
            <span>Campus ERP Portal</span>
          </button>
        </div>

        {/* Sub-navigation for Campus ERP subviews when inside ERP */}
        {['portal', 'faculty', 'notices', 'schedule'].includes(activeView) && (
          <div className="erp-subnav-strip">
            <span className="subnav-label">ERP SUB-MODULES:</span>
            <button 
              className={`subnav-pill ${activeView === 'portal' ? 'active' : ''}`}
              onClick={() => setActiveView('portal')}
            >
              Student Directory
            </button>
            <button 
              className={`subnav-pill ${activeView === 'faculty' ? 'active' : ''}`}
              onClick={() => setActiveView('faculty')}
            >
              Faculty Directory
            </button>
            <button 
              className={`subnav-pill ${activeView === 'notices' ? 'active' : ''}`}
              onClick={() => setActiveView('notices')}
            >
              Notice Board
            </button>
            <button 
              className={`subnav-pill ${activeView === 'schedule' ? 'active' : ''}`}
              onClick={() => setActiveView('schedule')}
            >
              Academic Schedule
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
