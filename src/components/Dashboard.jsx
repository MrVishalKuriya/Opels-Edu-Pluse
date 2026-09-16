import React from 'react';
import { Users, GraduationCap, Award, CheckCircle2 } from 'lucide-react';

export default function Dashboard({ stats }) {
  const statItems = [
    {
      label: 'Total Students',
      value: stats?.totalStudents || 5,
      icon: Users,
      colorClass: 'text-cyan-400',
      bgClass: 'bg-cyan-500/10'
    },
    {
      label: 'Average Age',
      value: `${stats?.averageAge || 20.4} yrs`,
      icon: GraduationCap,
      colorClass: 'text-emerald-400',
      bgClass: 'bg-emerald-500/10'
    },
    {
      label: 'Average Attendance',
      value: `${stats?.avgAttendanceRate || 89.6}%`,
      icon: CheckCircle2,
      colorClass: 'text-blue-400',
      bgClass: 'bg-blue-500/10'
    },
    {
      label: 'Fee Clearance',
      value: `${stats?.paidFeeCount ?? 4} Paid`,
      icon: Award,
      colorClass: 'text-amber-400',
      bgClass: 'bg-amber-500/10'
    }
  ];

  return (
    <div className="stats-grid">
      {statItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="stat-card">
            <div className={`stat-icon-wrapper ${item.bgClass}`}>
              <Icon size={22} className={item.colorClass} />
            </div>
            <div>
              <div className="stat-value">{item.value}</div>
              <div className="stat-label">{item.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
