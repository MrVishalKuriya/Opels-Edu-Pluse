import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function StudentModal({ isOpen, onClose, onSave, studentToEdit, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: 20,
    course: 'Computer Science',
    semester: 'Semester 4',
    feeStatus: 'Paid',
    attendanceRate: 90
  });

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        name: studentToEdit.name || '',
        email: studentToEdit.email || '',
        phone: studentToEdit.phone || '',
        age: studentToEdit.age || 20,
        course: studentToEdit.course || 'Computer Science',
        semester: studentToEdit.semester || 'Semester 4',
        feeStatus: studentToEdit.feeStatus || 'Paid',
        attendanceRate: studentToEdit.attendanceRate || 90
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        age: 20,
        course: 'Computer Science',
        semester: 'Semester 4',
        feeStatus: 'Paid',
        attendanceRate: 90
      });
    }
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {studentToEdit ? 'Edit Student Record' : 'Enroll New Student'}
          </h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              required
              className="form-control"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Aarav Sharma"
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                required
                className="form-control"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="student@college.edu"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Phone</label>
              <input 
                type="tel" 
                className="form-control"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 9876543210"
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Department / Track</label>
              <select 
                className="form-control"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Data Science">Data Science</option>
                <option value="Business Administration">Business Administration</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Semester</label>
              <select 
                className="form-control"
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              >
                <option value="Semester 1">Semester 1</option>
                <option value="Semester 2">Semester 2</option>
                <option value="Semester 3">Semester 3</option>
                <option value="Semester 4">Semester 4</option>
                <option value="Semester 5">Semester 5</option>
                <option value="Semester 6">Semester 6</option>
                <option value="Semester 7">Semester 7</option>
                <option value="Semester 8">Semester 8</option>
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Fee Status</label>
              <select 
                className="form-control"
                value={formData.feeStatus}
                onChange={(e) => setFormData({ ...formData, feeStatus: e.target.value })}
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Scholarship">Scholarship Waiver</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Attendance %</label>
              <input 
                type="number" 
                min="0"
                max="100"
                className="form-control"
                value={formData.attendanceRate}
                onChange={(e) => setFormData({ ...formData, attendanceRate: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/10">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : studentToEdit ? 'Update Student' : 'Enroll Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
