import React, { useState } from 'react';
import { X, User, Mail, Phone, BookOpen, Calendar, CreditCard, ShieldCheck, Printer } from 'lucide-react';

export default function StudentDetailsModal({ student, onClose, onEdit }) {
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'idcard'

  if (!student) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div 
              style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '50%', 
                background: 'var(--accent-gradient)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'white',
                fontWeight: '700',
                fontSize: '1.2rem'
              }}
            >
              {student.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="modal-title font-heading">{student.name}</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Student ID #{student.id}
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          <button 
            className={`btn btn-secondary ${activeTab === 'details' ? 'btn-primary' : ''}`}
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
            onClick={() => setActiveTab('details')}
          >
            <User size={15} />
            <span>Profile Details</span>
          </button>

          <button 
            className={`btn btn-secondary ${activeTab === 'idcard' ? 'btn-primary' : ''}`}
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
            onClick={() => setActiveTab('idcard')}
          >
            <CreditCard size={15} />
            <span>Student ID Badge</span>
          </button>
        </div>

        {activeTab === 'details' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', margin: '1rem 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <BookOpen size={14} /> Course / Department
                </div>
                <div style={{ fontWeight: '600', marginTop: '0.2rem', color: 'var(--accent-primary)' }}>
                  {student.course}
                </div>
              </div>

              <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={14} /> Semester
                </div>
                <div style={{ fontWeight: '600', marginTop: '0.2rem' }}>
                  {student.semester}
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={14} /> Age
              </div>
              <div style={{ fontWeight: '600', marginTop: '0.2rem' }}>
                {student.age} years old
              </div>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={14} /> Email Address
              </div>
              <div style={{ fontWeight: '600', marginTop: '0.2rem' }}>
                {student.email}
              </div>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Phone size={14} /> Phone Contact
              </div>
              <div style={{ fontWeight: '600', marginTop: '0.2rem' }}>
                {student.phone || 'Not provided'}
              </div>
            </div>
          </div>
        ) : (
          /* Student ID Card Badge View */
          <div className="id-card-preview">
            <div className="id-card">
              <div className="id-card-header">
                <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.05em' }}>EDUPULSE COLLEGE</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>OFFICIAL STUDENT IDENTIFICATION</div>
              </div>

              <div className="id-card-body">
                <div className="id-avatar">
                  {student.name.charAt(0).toUpperCase()}
                </div>

                <div className="id-name">{student.name}</div>
                <div className="id-dept">{student.course}</div>

                <div className="id-grid">
                  <div>
                    <span className="id-lbl">ID NO</span>
                    <span className="id-val">#STU-{String(student.id).padStart(4, '0')}</span>
                  </div>
                  <div>
                    <span className="id-lbl">SEMESTER</span>
                    <span className="id-val">{student.semester}</span>
                  </div>
                </div>

                <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center' }}>
                  <div className="barcode-stub">
                    ||| | |||| | |||||| || | ||| |||| |
                  </div>
                </div>
              </div>

              <div className="id-card-footer">
                <ShieldCheck size={14} /> Verified Student Credential
              </div>
            </div>

            <button className="btn btn-secondary" onClick={handlePrint} style={{ marginTop: '1rem', width: '100%' }}>
              <Printer size={16} />
              <span>Print Student Badge</span>
            </button>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={() => { onClose(); onEdit(student); }}>
            Edit Record
          </button>
        </div>
      </div>
    </div>
  );
}
