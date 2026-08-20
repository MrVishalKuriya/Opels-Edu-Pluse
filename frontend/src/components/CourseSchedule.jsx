import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, BookOpen } from 'lucide-react';

export default function CourseSchedule() {
  const [selectedDept, setSelectedDept] = useState('Computer Science');

  const schedules = {
    'Computer Science': [
      { day: 'Monday', time: '09:00 AM - 10:30 AM', subject: 'Data Structures & Algorithms', room: 'Lab 301', faculty: 'Dr. Rajesh Kumar' },
      { day: 'Monday', time: '11:00 AM - 12:30 PM', subject: 'Database Management Systems', room: 'Hall B', faculty: 'Prof. Meera Nair' },
      { day: 'Tuesday', time: '10:00 AM - 11:30 AM', subject: 'Operating Systems & Architecture', room: 'Lab 302', faculty: 'Dr. Rajesh Kumar' },
      { day: 'Wednesday', time: '09:00 AM - 10:30 AM', subject: 'Web Technologies & REST APIs', room: 'Lab 301', faculty: 'Prof. Meera Nair' },
      { day: 'Thursday', time: '02:00 PM - 03:30 PM', subject: 'Computer Networks & Security', room: 'Hall A', faculty: 'Dr. Rajesh Kumar' },
      { day: 'Friday', time: '11:00 AM - 12:30 PM', subject: 'Software Engineering Project', room: 'Lab 304', faculty: 'Prof. Meera Nair' }
    ],
    'Information Technology': [
      { day: 'Monday', time: '10:00 AM - 11:30 AM', subject: 'Cloud Computing & DevOps', room: 'Lab 201', faculty: 'Prof. Meera Nair' },
      { day: 'Tuesday', time: '09:00 AM - 10:30 AM', subject: 'Information Security & Cryptography', room: 'Hall C', faculty: 'Dr. Rajesh Kumar' },
      { day: 'Wednesday', time: '01:30 PM - 03:00 PM', subject: 'Network Architecture', room: 'Lab 202', faculty: 'Prof. Meera Nair' },
      { day: 'Thursday', time: '10:00 AM - 11:30 AM', subject: 'Mobile Application Development', room: 'Lab 201', faculty: 'Prof. Meera Nair' }
    ],
    'Data Science': [
      { day: 'Monday', time: '11:00 AM - 12:30 PM', subject: 'Machine Learning & Neural Nets', room: 'AI Lab 101', faculty: 'Dr. Amitav Ghosh' },
      { day: 'Tuesday', time: '02:00 PM - 03:30 PM', subject: 'Big Data Analytics & SQL', room: 'AI Lab 102', faculty: 'Dr. Amitav Ghosh' },
      { day: 'Thursday', time: '09:00 AM - 10:30 AM', subject: 'Applied Probability & Statistics', room: 'Hall D', faculty: 'Dr. Amitav Ghosh' }
    ]
  };

  const currentSchedule = schedules[selectedDept] || schedules['Computer Science'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Controls */}
      <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="brand-icon" style={{ width: '40px', height: '40px' }}>
            <Calendar size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Academic Timetable</h2>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>Weekly lecture schedule, lecture halls, and professor assignments.</p>
          </div>
        </div>

        <select
          className="select-custom"
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="Computer Science">Computer Science</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Data Science">Data Science</option>
        </select>
      </div>

      {/* Schedule Table */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Lecture Time</th>
                <th>Subject / Course</th>
                <th>Classroom / Lab</th>
                <th>Faculty Professor</th>
              </tr>
            </thead>
            <tbody>
              {currentSchedule.map((slot, idx) => (
                <tr key={idx}>
                  <td>
                    <span className="badge badge-cs" style={{ fontSize: '0.85rem' }}>
                      {slot.day}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                      <Clock size={14} style={{ color: 'var(--accent-primary)' }} />
                      <span>{slot.time}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                      {slot.subject}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)' }}>
                      <MapPin size={14} style={{ color: 'var(--warning)' }} />
                      <span>{slot.room}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)' }}>
                      <User size={14} style={{ color: 'var(--success)' }} />
                      <span>{slot.faculty}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
