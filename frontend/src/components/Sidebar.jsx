import React from 'react';
import { Home, LayoutDashboard, Users, Bell, Calendar, GraduationCap, Download } from 'lucide-react';

export default function Sidebar({ activeView, setActiveView, onExportCSV }) {
  const menuItems = [
    { id: 'landing', label: 'Home', icon: <Home size={18} /> },
    { id: 'portal', label: 'Student Directory', icon: <LayoutDashboard size={18} /> },
    { id: 'faculty', label: 'Faculty Directory', icon: <Users size={18} /> },
    { id: 'notices', label: 'Notice Board', icon: <Bell size={18} /> },
    { id: 'schedule', label: 'Timetable', icon: <Calendar size={18} /> }
  ];

  return (
    <aside className="zoho-sidebar">
      {/* Brand Header */}
      <div className="zoho-sidebar-brand" onClick={() => setActiveView('landing')} style={{ cursor: 'pointer' }}>
        <div className="zoho-logo-badge">
          <GraduationCap size={22} />
        </div>
        <div>
          <div className="zoho-brand-name">ZOHO <span style={{ color: 'var(--zoho-yellow)', fontWeight: 400 }}>Edu</span></div>
          <div style={{ fontSize: '0.7rem', color: '#718096', letterSpacing: '0.05em' }}>CAMPUS SUITE</div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="zoho-nav-menu">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`zoho-nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => setActiveView(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}

        <div style={{ margin: '1rem 0', height: '1px', background: 'rgba(255, 255, 255, 0.08)' }}></div>

        <button 
          className="zoho-nav-item" 
          onClick={onExportCSV}
          style={{ color: 'var(--zoho-yellow)' }}
        >
          <span className="nav-icon" style={{ color: 'var(--zoho-yellow)' }}>
            <Download size={18} />
          </span>
          <span>Export Roster</span>
        </button>
      </nav>

      {/* Footer Info */}
      <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.75rem', color: '#718096', textAlign: 'center' }}>
        Zoho EduPulse v2.4
      </div>
    </aside>
  );
}
