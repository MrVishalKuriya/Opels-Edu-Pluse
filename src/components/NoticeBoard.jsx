import React, { useState } from 'react';
import { Bell, Plus, Trash2, AlertCircle, Calendar } from 'lucide-react';

export default function NoticeBoard({ notices, onAddNotice, onDeleteNotice, userRole }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: 'Academics',
    content: '',
    postedBy: 'Academic Cell',
    urgent: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onAddNotice({
      ...form,
      datePosted: new Date().toISOString().split('T')[0]
    });
    setShowModal(false);
    setForm({
      title: '',
      category: 'Academics',
      content: '',
      postedBy: 'Academic Cell',
      urgent: false
    });
  };

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Campus & Fellowship Notice Board</h2>
          <p className="text-xs text-gray-400 mt-0.5">Real-time official announcements, exam schedules, and placement circulars.</p>
        </div>
        {(userRole === 'ADMIN' || userRole === 'FACULTY') && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} />
            <span>Post Notice</span>
          </button>
        )}
      </div>

      <div className="space-y-3">
        {(notices || []).map((notice) => (
          <div key={notice.id} className="stat-card flex-col items-start gap-2">
            <div className="flex items-start justify-between w-full">
              <div className="flex items-center gap-2 flex-wrap">
                {notice.urgent && (
                  <span className="badge badge-ba flex items-center gap-1 text-[11px]">
                    <AlertCircle size={12} /> Urgent
                  </span>
                )}
                <span className="badge badge-cs text-[11px]">{notice.category}</span>
                <h4 className="font-bold text-sm text-white">{notice.title}</h4>
              </div>
              {userRole === 'ADMIN' && (
                <button 
                  className="btn btn-danger btn-icon"
                  style={{ width: '28px', height: '28px' }}
                  onClick={() => onDeleteNotice(notice.id)}
                  title="Remove Notice"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>

            <p className="text-xs text-gray-300 leading-relaxed mt-1">{notice.content}</p>

            <div className="flex items-center gap-4 text-[11px] text-gray-400 mt-2 pt-2 border-t border-white/5 w-full">
              <span>Posted by: <strong className="text-gray-300">{notice.postedBy}</strong></span>
              <span className="flex items-center gap-1">
                <Calendar size={11} /> {notice.datePosted || 'Today'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title mb-4">Post Official Notice</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="form-label">Notice Title</label>
                <input 
                  type="text" 
                  required
                  className="form-control"
                  placeholder="e.g. Mid-term Exam Schedule Announced"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Category</label>
                <select 
                  className="form-control"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="Exams">Exams & Schedule</option>
                  <option value="Academics">Academics</option>
                  <option value="Placements">Placements</option>
                  <option value="Events">Hackathons & Events</option>
                </select>
              </div>
              <div>
                <label className="form-label">Details / Content</label>
                <textarea 
                  rows={4}
                  required
                  className="form-control"
                  placeholder="Write notice instructions or announcement details..."
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="checkbox"
                  id="urgentNotice"
                  checked={form.urgent}
                  onChange={(e) => setForm({ ...form, urgent: e.target.checked })}
                />
                <label htmlFor="urgentNotice" className="text-xs text-amber-400 font-semibold cursor-pointer">
                  Mark as High Priority / Urgent
                </label>
              </div>
              <div className="flex justify-end gap-3 mt-5">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Publish Notice</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
