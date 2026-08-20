import React, { useState } from 'react';
import { X, ShieldCheck, UserCheck, GraduationCap, Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ADMIN');

  if (!isOpen) return null;

  const handlePresetSelect = (selectedRole, defaultEmail) => {
    setRole(selectedRole);
    setEmail(defaultEmail);
    setPassword('password123');
    onLogin({
      email: defaultEmail,
      name: selectedRole === 'ADMIN' ? 'System Administrator' : selectedRole === 'FACULTY' ? 'Dr. Rajesh Kumar' : 'Aarav Sharma',
      role: selectedRole
    });
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      onLogin({
        email,
        name: role === 'ADMIN' ? 'System Admin' : role === 'FACULTY' ? 'Faculty Professor' : 'Student User',
        role
      });
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock className="text-gradient" size={24} />
            <h2 className="modal-title font-heading">Campus Sign In</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Select a role or log in with your credentials to access personalized permissions.
        </p>

        {/* 1-Click Quick Account Presets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            1-Click Demo Accounts
          </div>

          <button 
            className="btn btn-secondary" 
            style={{ justifyContent: 'space-between', padding: '0.75rem 1rem' }}
            onClick={() => handlePresetSelect('ADMIN', 'admin@college.edu')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldCheck size={20} style={{ color: '#818cf8' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Sign in as Administrator</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Full CRUD & system management</div>
              </div>
            </div>
            <ArrowRight size={16} />
          </button>

          <button 
            className="btn btn-secondary" 
            style={{ justifyContent: 'space-between', padding: '0.75rem 1rem' }}
            onClick={() => handlePresetSelect('FACULTY', 'faculty@college.edu')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <UserCheck size={20} style={{ color: '#34d399' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Sign in as Faculty Member</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Update grades & attendance</div>
              </div>
            </div>
            <ArrowRight size={16} />
          </button>

          <button 
            className="btn btn-secondary" 
            style={{ justifyContent: 'space-between', padding: '0.75rem 1rem' }}
            onClick={() => handlePresetSelect('STUDENT', 'student@college.edu')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <GraduationCap size={20} style={{ color: '#f0abfc' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Sign in as Student</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Personal ID badge & course schedule</div>
              </div>
            </div>
            <ArrowRight size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.25rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>OR ENTER CREDENTIALS</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Role Account Type</label>
            <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="ADMIN">Administrator (Full Access)</option>
              <option value="FACULTY">Faculty / Professor</option>
              <option value="STUDENT">Student Directory User</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="user@college.edu" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <span>Sign In</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
