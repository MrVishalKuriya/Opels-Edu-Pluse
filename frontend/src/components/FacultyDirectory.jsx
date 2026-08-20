import React, { useState } from 'react';
import { UserCheck, Mail, Phone, Clock, Plus, Search, BookOpen, Trash2, X, Save } from 'lucide-react';

export default function FacultyDirectory({ facultyList, onAddFaculty, onDeleteFaculty }) {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    department: 'Computer Science',
    designation: 'Assistant Professor',
    email: '',
    phone: '',
    officeHours: 'Mon/Wed 10:00 AM - 12:00 PM'
  });

  const filteredFaculty = facultyList.filter(f =>
    f.name?.toLowerCase().includes(search.toLowerCase()) ||
    f.department?.toLowerCase().includes(search.toLowerCase()) ||
    f.designation?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      onAddFaculty(formData);
      setIsModalOpen(false);
      setFormData({
        name: '',
        department: 'Computer Science',
        designation: 'Assistant Professor',
        email: '',
        phone: '',
        officeHours: 'Mon/Wed 10:00 AM - 12:00 PM'
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Bar */}
      <div className="glass-panel controls-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search faculty by professor name or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          <span>Add Professor</span>
        </button>
      </div>

      {/* Faculty Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filteredFaculty.map(f => (
          <div key={f.id} className="glass-panel" style={{ padding: '1.5rem', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div 
                style={{ 
                  width: '52px', 
                  height: '52px', 
                  borderRadius: '16px', 
                  background: 'var(--accent-gradient)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1.25rem'
                }}
              >
                {f.name.charAt(0)}
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{f.name}</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                  {f.designation}
                </div>
              </div>

              <button 
                className="btn btn-danger btn-icon" 
                style={{ width: '32px', height: '32px' }}
                onClick={() => onDeleteFaculty(f.id, f.name)}
                title="Remove Faculty Record"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={16} style={{ color: 'var(--text-muted)' }} />
                <span><strong>Dept:</strong> {f.department}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} style={{ color: 'var(--text-muted)' }} />
                <span>{f.email}</span>
              </div>

              {f.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={16} style={{ color: 'var(--text-muted)' }} />
                  <span>{f.phone}</span>
                </div>
              )}

              {f.officeHours && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.3rem', background: 'var(--bg-surface)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <Clock size={14} style={{ color: 'var(--warning)' }} />
                  <span style={{ fontSize: '0.8rem' }}><strong>Office Hours:</strong> {f.officeHours}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Faculty Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title font-heading">Add Faculty Member</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Professor Full Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Dr. Rajesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Department *</label>
                  <select
                    className="form-control"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Designation *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Professor & HOD"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@college.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Contact</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="+91 9800011122"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Office Hours</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mon/Wed 10:00 AM - 12:00 PM"
                  value={formData.officeHours}
                  onChange={(e) => setFormData({ ...formData, officeHours: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={18} />
                  <span>Save Faculty Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
