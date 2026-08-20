import React from 'react';
import { 
  Plus, Moon, Sun, RefreshCw, Download, 
  LayoutDashboard, Home, Users, Bell, Calendar, LogIn, LogOut, ShieldCheck 
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
  onLogout
}) {
  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'ADMIN': return { bg: 'rgba(239, 68, 68, 0.2)', text: '#f87171', label: 'ADMIN' };
      case 'FACULTY': return { bg: 'rgba(13, 148, 136, 0.2)', text: '#2dd4bf', label: 'FACULTY' };
      default: return { bg: 'rgba(0, 127, 255, 0.2)', text: '#60a5fa', label: 'STUDENT' };
    }
  };

  const roleStyle = currentUser ? getRoleBadgeStyle(currentUser.role) : null;

  return (
    <header className="app-header">
      {/* Header Top Bar with Official Company Logo */}
      <div className="company-header-top">
        <div className="brand" onClick={() => setActiveView('landing')} style={{ cursor: 'pointer' }}>
          <img src="/logo.png" alt="Company Logo" className="brand-logo-img" />
          <div>
            <h1 className="brand-title">OPELS <span style={{ color: 'var(--company-blue)', fontWeight: 400 }}>EduPulse</span></h1>
            <p className="brand-subtitle">Educational Resource Planning & Administration</p>
          </div>
        </div>

        <div className="header-actions">
          {/* User Account / Role Status */}
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255, 255, 255, 0.08)', padding: '0.4rem 0.85rem', borderRadius: '0px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <span className="badge" style={{ background: roleStyle.bg, color: roleStyle.text, padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}>
                {roleStyle.label}
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>{currentUser.name}</span>
              <button 
                className="btn btn-secondary btn-icon" 
                style={{ width: '28px', height: '28px', marginLeft: '0.2rem', background: 'rgba(255, 255, 255, 0.1)', color: 'white', border: 'none' }}
                onClick={onLogout}
                title="Sign Out"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={onOpenLogin} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              <LogIn size={16} />
              <span>Sign In</span>
            </button>
          )}

          <button 
            className="btn btn-secondary btn-icon" 
            style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white', border: 'none' }}
            onClick={toggleTheme}
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {activeView === 'portal' && (
            <>
              <button 
                className="btn btn-secondary" 
                style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.2)' }}
                onClick={onExportCSV}
                title="Export Current Roster to CSV"
              >
                <Download size={18} />
                <span>Export CSV</span>
              </button>

              <button 
                className="btn btn-secondary btn-icon" 
                style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white', border: 'none' }}
                onClick={onRefresh}
                title="Refresh Data"
              >
                <RefreshCw size={18} />
              </button>

              {(!currentUser || currentUser.role === 'ADMIN' || currentUser.role === 'FACULTY') && (
                <button className="btn btn-primary" onClick={onAddStudent}>
                  <Plus size={18} />
                  <span>Add Student</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Nav Ribbon Tabs */}
      <nav className="nav-tabs">
        <button 
          className={`nav-tab ${activeView === 'landing' ? 'active' : ''}`}
          onClick={() => setActiveView('landing')}
        >
          <Home size={15} />
          <span>Home Overview</span>
        </button>

        <button 
          className={`nav-tab ${activeView === 'portal' ? 'active' : ''}`}
          onClick={() => setActiveView('portal')}
        >
          <LayoutDashboard size={15} />
          <span>Student Directory</span>
        </button>

        <button 
          className={`nav-tab ${activeView === 'faculty' ? 'active' : ''}`}
          onClick={() => setActiveView('faculty')}
        >
          <Users size={15} />
          <span>Faculty & Staff</span>
        </button>

        <button 
          className={`nav-tab ${activeView === 'notices' ? 'active' : ''}`}
          onClick={() => setActiveView('notices')}
        >
          <Bell size={15} />
          <span>Campus Notices</span>
        </button>

        <button 
          className={`nav-tab ${activeView === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveView('schedule')}
        >
          <Calendar size={15} />
          <span>Academic Timetable</span>
        </button>
      </nav>
    </header>
  );
}
