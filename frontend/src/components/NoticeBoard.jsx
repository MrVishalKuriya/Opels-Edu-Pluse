import React, { useState } from 'react';
import { Bell, Plus, Trash2, Calendar, User, AlertCircle, X, Save } from 'lucide-react';

export default function NoticeBoard({ notices, onAddNotice, onDeleteNotice, userRole }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic',
    content: '',
    urgent: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.content) {
      onAddNotice(formData);
      setIsModalOpen(false);
      setFormData({ title: '', category: 'Academic', content: '', urgent: false });
    }
  };

  const getCategoryColor = (cat) => {
    switch (cat.toLowerCase()) {
      case 'exams': return { bg: 'rgba(239, 68, 68, 0.15)', text: '#f87171' };
      case 'financial': return { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24' };
      case 'events': return { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399' };
      default: return { bg: 'rgba(99, 102, 241, 0.15)', text: '#818cf8' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Bar */}
      <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="brand-icon" style={{ width: '40px', height: '40px' }}>
            <Bell size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Campus Notice Board</h2>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>Official college announcements, exam schedules, and events.</p>
          </div>
        </div>

        {userRole === 'ADMIN' && (
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            <span>Post Announcement</span>
          </button>
        )}
      </div>

      {/* Notices List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {notices.length === 0 ? (
          <div className="glass-panel empty-state">
            <h3>No Active Campus Notices</h3>
            <p>Check back later for news and announcements.</p>
          </div>
        ) : (
          notices.map(notice => {
            const style = getCategoryColor(notice.category);
            return (
              <div key={notice.id} className="glass-panel" style={{ padding: '1.5rem', borderLeft: notice.urgent ? '4px solid var(--danger)' : '4px solid var(--accent-primary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span className="badge" style={{ background: style.bg, color: style.text, border: `1px solid ${style.text}44` }}>
                      {notice.category}
                    </span>

                    {notice.urgent && (
                      <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
                        <AlertCircle size={12} style={{ marginRight: '4px' }} /> URGENT
                      </span>
                    )}

                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{notice.title}</h3>
                  </div>

                  {userRole === 'ADMIN' && (
                    <button 
                      className="btn btn-danger btn-icon" 
                      style={{ width: '32px', height: '32px' }}
                      onClick={() => onDeleteNotice(notice.id, notice.title)}
                      title="Remove Announcement"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                  {notice.content}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={14} />
                    <span>Posted {notice.datePosted || 'Today'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <User size={14} />
                    <span>{notice.postedBy || 'Campus Admin'}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Post Notice Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title font-heading">Post Campus Announcement</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Announcement Title *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Midterm Examination Schedule"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-control"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Academic">Academic</option>
                    <option value="Exams">Exams</option>
                    <option value="Financial">Financial</option>
                    <option value="Events">Events & Sports</option>
                  </select>
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', marginTop: '1.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--danger)', fontWeight: 600 }}>
                    <input
                      type="checkbox"
                      checked={formData.urgent}
                      onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                    />
                    Mark as Urgent Announcement
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Announcement Details *</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Enter full details for students and faculty..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={18} />
                  <span>Publish Notice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
