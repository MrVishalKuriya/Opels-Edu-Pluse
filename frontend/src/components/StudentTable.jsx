import React, { useState } from 'react';
import { Search, Edit2, Trash2, Eye, Award, CheckCircle, AlertCircle } from 'lucide-react';

export default function StudentTable({ students, onView, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('ALL');
  const [selectedSemester, setSelectedSemester] = useState('ALL');
  const [selectedFeeStatus, setSelectedFeeStatus] = useState('ALL');

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.phone && student.phone.includes(searchTerm));
    
    const matchesCourse = selectedCourse === 'ALL' || student.course === selectedCourse;
    const matchesSemester = selectedSemester === 'ALL' || student.semester === selectedSemester;
    const matchesFee = selectedFeeStatus === 'ALL' || (student.feeStatus || 'Paid') === selectedFeeStatus;

    return matchesSearch && matchesCourse && matchesSemester && matchesFee;
  });

  const getCourseBadgeClass = (course) => {
    switch (course) {
      case 'Computer Science': return 'badge-cs';
      case 'Information Technology': return 'badge-it';
      case 'Data Science': return 'badge-ds';
      case 'Business Administration': return 'badge-ba';
      default: return 'badge-default';
    }
  };

  const getAttendanceColor = (rate) => {
    if (!rate) return 'var(--info)';
    if (rate >= 90) return 'var(--success)';
    if (rate >= 75) return 'var(--warning)';
    return 'var(--danger)';
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      {/* Controls Bar */}
      <div className="controls-bar" style={{ padding: 0, marginBottom: '1.5rem', background: 'transparent' }}>
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by student name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select 
            className="select-custom"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="ALL">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Data Science">Data Science</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
          </select>

          <select 
            className="select-custom"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="ALL">All Semesters</option>
            <option value="Semester 1">Semester 1</option>
            <option value="Semester 2">Semester 2</option>
            <option value="Semester 3">Semester 3</option>
            <option value="Semester 4">Semester 4</option>
            <option value="Semester 5">Semester 5</option>
            <option value="Semester 6">Semester 6</option>
            <option value="Semester 7">Semester 7</option>
            <option value="Semester 8">Semester 8</option>
          </select>

          <select 
            className="select-custom"
            value={selectedFeeStatus}
            onChange={(e) => setSelectedFeeStatus(e.target.value)}
          >
            <option value="ALL">All Fee Statuses</option>
            <option value="Paid">Fee Paid</option>
            <option value="Pending">Fee Pending</option>
          </select>
        </div>
      </div>

      {/* Student Data Table */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Course / Dept</th>
              <th>Semester</th>
              <th>Attendance</th>
              <th>GPA</th>
              <th>Fee Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{ color: 'var(--text-muted)' }}>
                    No student records found matching your query filters.
                  </div>
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>
                      #{String(student.id).padStart(3, '0')}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div 
                        style={{ 
                          width: '36px', 
                          height: '36px', 
                          borderRadius: '50%', 
                          background: 'var(--accent-gradient)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          color: 'white',
                          fontWeight: '700',
                          fontSize: '0.85rem'
                        }}
                      >
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{student.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${getCourseBadgeClass(student.course)}`}>
                      {student.course}
                    </span>
                  </td>
                  <td>{student.semester}</td>
                  <td>
                    <div style={{ width: '120px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                        <span>{student.attendanceRate || 85}%</span>
                      </div>
                      <div style={{ height: '6px', width: '100%', background: 'var(--bg-input)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div 
                          style={{ 
                            height: '100%', 
                            width: `${student.attendanceRate || 85}%`, 
                            background: getAttendanceColor(student.attendanceRate || 85) 
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700, color: 'var(--accent-primary)', background: 'rgba(99, 102, 241, 0.1)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>
                      <Award size={13} />
                      <span>{student.gpa ? student.gpa.toFixed(2) : '3.50'}</span>
                    </div>
                  </td>
                  <td>
                    {(student.feeStatus || 'Paid') === 'Paid' ? (
                      <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                        <CheckCircle size={12} style={{ marginRight: '4px' }} /> Paid
                      </span>
                    ) : (
                      <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                        <AlertCircle size={12} style={{ marginRight: '4px' }} /> Pending
                      </span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button 
                        className="btn btn-secondary btn-icon" 
                        onClick={() => onView(student)}
                        title="View Profile & Digital ID Badge"
                      >
                        <Eye size={16} />
                      </button>

                      <button 
                        className="btn btn-secondary btn-icon" 
                        onClick={() => onEdit(student)}
                        title="Edit Record"
                      >
                        <Edit2 size={16} />
                      </button>

                      <button 
                        className="btn btn-danger btn-icon" 
                        onClick={() => onDelete(student.id, student.name)}
                        title="Delete Student"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
