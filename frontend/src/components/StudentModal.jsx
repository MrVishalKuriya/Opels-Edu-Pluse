import React, { useState, useEffect } from 'react';
import { X, Save, UserPlus } from 'lucide-react';

export default function StudentModal({ isOpen, onClose, onSave, studentToEdit, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    age: 20,
    course: 'Computer Science',
    semester: 'Semester 1',
    email: '',
    phone: '',
    status: 'Active',
    attendanceRate: 90.0,
    gpa: 3.5,
    feeStatus: 'Paid'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        name: studentToEdit.name || '',
        age: studentToEdit.age || 20,
        course: studentToEdit.course || 'Computer Science',
        semester: studentToEdit.semester || 'Semester 1',
        email: studentToEdit.email || '',
        phone: studentToEdit.phone || '',
        status: studentToEdit.status || 'Active',
        attendanceRate: studentToEdit.attendanceRate !== undefined ? studentToEdit.attendanceRate : 90.0,
        gpa: studentToEdit.gpa !== undefined ? studentToEdit.gpa : 3.5,
        feeStatus: studentToEdit.feeStatus || 'Paid'
      });
    } else {
      setFormData({
        name: '',
        age: 20,
        course: 'Computer Science',
        semester: 'Semester 1',
        email: '',
        phone: '',
        status: 'Active',
        attendanceRate: 90.0,
        gpa: 3.5,
        feeStatus: 'Paid'
      });
    }
    setErrors({});
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Invalid email address format';
    }
    if (!formData.age || formData.age < 16 || formData.age > 100) {
      errs.age = 'Age must be between 16 and 100';
    }
    if (formData.attendanceRate < 0 || formData.attendanceRate > 100) {
      errs.attendanceRate = 'Attendance rate must be between 0% and 100%';
    }
    if (formData.gpa < 0 || formData.gpa > 4.0) {
      errs.gpa = 'GPA must be between 0.0 and 4.0';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserPlus className="text-gradient" size={24} />
            <h2 className="modal-title font-heading">
              {studentToEdit ? 'Edit Student Profile' : 'Enroll New Student'}
            </h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Student Full Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Aarav Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>

          {/* Course & Semester */}
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Academic Department *</label>
              <select
                className="form-control"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
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
              <label className="form-label">Current Semester *</label>
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

          {/* Email & Age */}
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                className="form-control"
                placeholder="aarav.sharma@college.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Age (Years) *</label>
              <input
                type="number"
                className="form-control"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
              />
              {errors.age && <div className="form-error">{errors.age}</div>}
            </div>
          </div>

          {/* Attendance % & GPA */}
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Attendance Rate (%)</label>
              <input
                type="number"
                step="0.1"
                className="form-control"
                placeholder="e.g. 92.5"
                value={formData.attendanceRate}
                onChange={(e) => setFormData({ ...formData, attendanceRate: parseFloat(e.target.value) || 0 })}
              />
              {errors.attendanceRate && <div className="form-error">{errors.attendanceRate}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">GPA Score (0.0 - 4.0)</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                placeholder="e.g. 3.85"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: parseFloat(e.target.value) || 0 })}
              />
              {errors.gpa && <div className="form-error">{errors.gpa}</div>}
            </div>
          </div>

          {/* Fee Status & Phone */}
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Tuition Fee Status</label>
              <select
                className="form-control"
                value={formData.feeStatus}
                onChange={(e) => setFormData({ ...formData, feeStatus: e.target.value })}
              >
                <option value="Paid">Fee Paid</option>
                <option value="Pending">Fee Pending</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Contact Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              <Save size={18} />
              <span>{isSubmitting ? 'Saving...' : studentToEdit ? 'Update Profile' : 'Enroll Student'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
