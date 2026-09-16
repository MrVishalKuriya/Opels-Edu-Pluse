import React, { useState } from 'react';
import { UserCheck, Plus, Trash2, Mail, Phone, Clock } from 'lucide-react';

export default function FacultyDirectory({ facultyList, onAddFaculty, onDeleteFaculty, userRole }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    department: 'Computer Science',
    designation: 'Assistant Professor',
    email: '',
    phone: '',
    officeHours: 'Mon, Wed 2-4 PM'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onAddFaculty(form);
    setShowAddModal(false);
    setForm({
      name: '',
      department: 'Computer Science',
      designation: 'Assistant Professor',
      email: '',
      phone: '',
      officeHours: 'Mon, Wed 2-4 PM'
    });
  };

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Faculty & Mentors Directory</h2>
          <p className="text-xs text-gray-400 mt-0.5">Academic instructors, industry fellows, and lab mentors.</p>
        </div>
        {(userRole === 'ADMIN' || userRole === 'FACULTY') && (
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={16} />
            <span>Add Faculty</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(facultyList || []).map((fac) => (
          <div key={fac.id} className="stat-card flex-col items-start gap-3">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center font-bold text-cyan-300">
                  {fac.name ? fac.name.charAt(fac.name.startsWith('Dr.') ? 4 : 0) : 'F'}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{fac.name}</h4>
                  <span className="text-xs text-cyan-400">{fac.designation}</span>
                </div>
              </div>
              {userRole === 'ADMIN' && (
                <button 
                  className="btn btn-danger btn-icon"
                  style={{ width: '28px', height: '28px' }}
                  onClick={() => onDeleteFaculty(fac.id)}
                  title="Remove Faculty"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>

            <div className="text-xs text-gray-300 space-y-1.5 w-full pt-2 border-t border-white/5">
              <div className="text-xs font-medium text-gray-400">Department: {fac.department}</div>
              <div className="flex items-center gap-2">
                <Mail size={12} className="text-gray-400" />
                <span className="truncate">{fac.email}</span>
              </div>
              {fac.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={12} className="text-gray-400" />
                  <span>{fac.phone}</span>
                </div>
              )}
              {fac.officeHours && (
                <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                  <Clock size={12} />
                  <span>Office: {fac.officeHours}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title mb-4">Add Faculty Member</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="form-control"
                  placeholder="e.g. Dr. Rajesh Kulkarni"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Department</label>
                <input 
                  type="text" 
                  required
                  className="form-control"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Designation</label>
                <input 
                  type="text" 
                  required
                  className="form-control"
                  value={form.designation}
                  onChange={(e) => setForm({ ...form, designation: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  required
                  className="form-control"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-3 mt-5">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
