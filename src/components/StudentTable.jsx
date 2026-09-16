import React, { useState } from 'react';
import { Eye, Edit3, Trash2, Search, Filter } from 'lucide-react';

export default function StudentTable({ students, onView, onEdit, onDelete, userRole }) {
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('ALL');

  const filtered = (students || []).filter(s => {
    const matchQuery = s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase()) ||
      s.course?.toLowerCase().includes(search.toLowerCase());
    const matchCourse = courseFilter === 'ALL' || s.course === courseFilter;
    return matchQuery && matchCourse;
  });

  const getBadgeClass = (course) => {
    if (course?.includes('Computer')) return 'badge-cs';
    if (course?.includes('Information')) return 'badge-it';
    if (course?.includes('Data')) return 'badge-ds';
    if (course?.includes('Business')) return 'badge-ba';
    return 'badge-default';
  };

  return (
    <div className="glass-panel p-5">
      <div className="controls-bar">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search students by name, email, or course..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <Filter size={16} className="text-gray-400" />
          <select 
            className="select-custom"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="ALL">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Data Science">Data Science</option>
            <option value="Business Administration">Business Administration</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Department / Track</th>
              <th>Semester</th>
              <th>Attendance</th>
              <th>Fee Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-400">
                  No matching student records found.
                </td>
              </tr>
            ) : (
              filtered.map((student) => (
                <tr key={student.id}>
                  <td className="font-mono text-xs text-gray-400">#{student.id}</td>
                  <td>
                    <div className="font-semibold text-white">{student.name}</div>
                    <div className="text-xs text-gray-400">{student.email}</div>
                  </td>
                  <td>
                    <span className={`badge ${getBadgeClass(student.course)}`}>
                      {student.course}
                    </span>
                  </td>
                  <td className="text-sm">{student.semester || 'Semester 4'}</td>
                  <td className="text-sm font-medium">
                    <span className={student.attendanceRate >= 85 ? 'text-emerald-400' : 'text-amber-400'}>
                      {student.attendanceRate ? `${student.attendanceRate}%` : '90%'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${student.feeStatus === 'Paid' ? 'badge-it' : 'badge-ba'}`}>
                      {student.feeStatus || 'Paid'}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button 
                        className="btn btn-secondary btn-icon"
                        style={{ width: '30px', height: '30px' }}
                        onClick={() => onView(student)}
                        title="View Student Profile"
                      >
                        <Eye size={14} />
                      </button>
                      {(userRole === 'ADMIN' || userRole === 'FACULTY') && (
                        <>
                          <button 
                            className="btn btn-secondary btn-icon"
                            style={{ width: '30px', height: '30px' }}
                            onClick={() => onEdit(student)}
                            title="Edit Student"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button 
                            className="btn btn-danger btn-icon"
                            style={{ width: '30px', height: '30px' }}
                            onClick={() => onDelete(student.id)}
                            title="Delete Record"
                          >
                            <Trash2 size={14} />
                          </button>
                        </>
                      )}
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
