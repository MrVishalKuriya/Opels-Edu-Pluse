import React from 'react';
import { Users, BookOpen, Award, BarChart2, CheckCircle2, AlertCircle, Percent } from 'lucide-react';

export default function Dashboard({ stats }) {
  const totalStudents = stats?.totalStudents || 0;
  const averageAge = stats?.averageAge || 0;
  const avgAttendance = stats?.avgAttendanceRate || 85.0;
  const avgGpa = stats?.avgGpa || 3.5;
  const pendingFeeCount = stats?.pendingFeeCount || 0;
  const paidFeeCount = stats?.paidFeeCount || 0;

  const courseCounts = stats?.courseCounts || {};
  const totalCourses = Object.keys(courseCounts).length;

  let topCourse = "N/A";
  let maxCount = 0;
  Object.entries(courseCounts).forEach(([course, count]) => {
    if (count > maxCount) {
      maxCount = count;
      topCourse = course;
    }
  });

  const getCourseColor = (course) => {
    const c = course.toLowerCase();
    if (c.includes('computer') || c.includes('cs')) return '#6366f1';
    if (c.includes('information') || c.includes('it')) return '#10b981';
    if (c.includes('data') || c.includes('ds')) return '#d946ef';
    if (c.includes('business') || c.includes('management')) return '#f59e0b';
    return '#3b82f6';
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* Top Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
            <Users size={26} />
          </div>
          <div>
            <div className="stat-value">{totalStudents}</div>
            <div className="stat-label">Total Enrolled Students</div>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <Percent size={26} />
          </div>
          <div>
            <div className="stat-value">{avgAttendance}%</div>
            <div className="stat-label">Avg Attendance Rate</div>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper" style={{ background: 'rgba(217, 70, 239, 0.15)', color: '#f0abfc' }}>
            <Award size={26} />
          </div>
          <div>
            <div className="stat-value">{avgGpa} / 4.0</div>
            <div className="stat-label">Campus Average GPA</div>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper" style={{ background: pendingFeeCount > 0 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)', color: pendingFeeCount > 0 ? '#fbbf24' : '#34d399' }}>
            {pendingFeeCount > 0 ? <AlertCircle size={26} /> : <CheckCircle2 size={26} />}
          </div>
          <div>
            <div className="stat-value">{pendingFeeCount} Due</div>
            <div className="stat-label">Fee Pending Students ({paidFeeCount} Paid)</div>
          </div>
        </div>
      </div>

      {/* Department Distribution Bars */}
      {totalStudents > 0 && (
        <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <BarChart2 size={20} style={{ color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Department Enrollment Breakdown</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {Object.entries(courseCounts).map(([course, count]) => {
              const percentage = Math.round((count / totalStudents) * 100);
              const color = getCourseColor(course);
              return (
                <div key={course} style={{ background: 'var(--bg-surface)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    <span>{course}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{count} ({percentage}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--bg-input)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: `${percentage}%`, 
                        height: '100%', 
                        background: color, 
                        borderRadius: '4px',
                        transition: 'width 0.5s ease-in-out'
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
