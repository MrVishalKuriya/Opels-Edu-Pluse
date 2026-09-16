import React, { useState } from 'react';
import { X, ShieldCheck, UserCheck, GraduationCap, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { signInWithGoogle } from '../services/firebase';

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setAuthError('');
    try {
      const user = await signInWithGoogle();
      onLogin(user);
      onClose();
    } catch (err) {
      console.error("Google sign in failed:", err);
      setAuthError(err?.message || "Google sign-in failed. You can use the quick demo accounts below.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handlePresetSelect = (selectedRole, defaultEmail) => {
    setRole(selectedRole);
    setEmail(defaultEmail);
    setPassword('password123');
    onLogin({
      uid: `local-${selectedRole.toLowerCase()}`,
      email: defaultEmail,
      displayName: selectedRole === 'ADMIN' ? 'System Administrator' : selectedRole === 'FACULTY' ? 'Dr. Rajesh Kumar' : 'Aarav Sharma',
      name: selectedRole === 'ADMIN' ? 'System Administrator' : selectedRole === 'FACULTY' ? 'Dr. Rajesh Kumar' : 'Aarav Sharma',
      role: selectedRole,
      xpPoints: selectedRole === 'STUDENT' ? 320 : 1000,
      targetTrack: 'Full Stack Developer'
    });
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      onLogin({
        uid: `local-${email.replace(/[^a-zA-Z0-9]/g, '')}`,
        email,
        displayName: role === 'ADMIN' ? 'System Admin' : role === 'FACULTY' ? 'Faculty Professor' : 'Student Learner',
        name: role === 'ADMIN' ? 'System Admin' : role === 'FACULTY' ? 'Faculty Professor' : 'Student Learner',
        role,
        xpPoints: 200,
        targetTrack: 'Full Stack Developer'
      });
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock className="text-cyan-400" size={24} />
            <h2 className="modal-title font-heading">Sign In to OPELS & Crio</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Connect with Google Firebase Auth to save project progress, chat with Gemini AI, and track placements.
        </p>

        {/* Secure Google Sign-In with Firebase Auth */}
        <button
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="google-auth-btn"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            padding: '0.85rem 1rem',
            background: '#ffffff',
            color: '#1f2937',
            border: '2px solid #e5e7eb',
            fontWeight: 600,
            fontSize: '0.925rem',
            cursor: googleLoading ? 'wait' : 'pointer',
            marginBottom: '1.25rem',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.616z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.173 0 7.548 0 9s.347 2.827.957 4.039l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
          </svg>
          <span>{googleLoading ? 'Signing in with Google...' : 'Continue with Google'}</span>
        </button>

        {authError && (
          <div style={{ padding: '0.6rem 0.8rem', background: '#fee2e2', border: '1px solid #f87171', color: '#991b1b', fontSize: '0.8rem', marginBottom: '1rem' }}>
            {authError}
          </div>
        )}

        {/* 1-Click Quick Account Presets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Or 1-Click Student & Demo Accounts
          </div>

          <button 
            className="btn btn-secondary" 
            style={{ justifyContent: 'space-between', padding: '0.65rem 0.9rem' }}
            onClick={() => handlePresetSelect('STUDENT', 'student@college.edu')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <GraduationCap size={18} style={{ color: '#00a8cc' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Sign in as Student Learner</div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Project milestones & AI mentor notes</div>
              </div>
            </div>
            <ArrowRight size={15} />
          </button>

          <button 
            className="btn btn-secondary" 
            style={{ justifyContent: 'space-between', padding: '0.65rem 0.9rem' }}
            onClick={() => handlePresetSelect('ADMIN', 'admin@college.edu')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldCheck size={18} style={{ color: '#818cf8' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Sign in as Administrator</div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Full ERP & admissions dashboard</div>
              </div>
            </div>
            <ArrowRight size={15} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>MANUAL CREDENTIALS</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label className="form-label">Role Account Type</label>
            <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="STUDENT">Student Learner (Sandbox & Tracks)</option>
              <option value="ADMIN">Administrator (Full Access)</option>
              <option value="FACULTY">Faculty / Mentor</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
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

          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
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

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
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
