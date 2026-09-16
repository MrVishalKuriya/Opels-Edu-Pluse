import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

export default function CourseSchedule() {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const scheduleData = {
    Monday: [
      { time: '09:00 AM - 10:30 AM', course: 'Distributed Systems & Microservices', room: 'Lab 402 / AWS Sandbox', instructor: 'Dr. Rajesh Kulkarni', type: 'Lecture' },
      { time: '11:00 AM - 01:00 PM', course: 'Full-Stack Project Lab: QKart E-commerce', room: 'Dev Cloud Studio', instructor: 'Prof. Sunita Rao', type: 'Lab' },
      { time: '02:00 PM - 03:30 PM', course: 'Data Structures & System Design', room: 'Auditorium 2', instructor: 'Dr. Amit Roy', type: 'Workshop' }
    ],
    Tuesday: [
      { time: '09:30 AM - 11:00 AM', course: 'Database Engineering: MongoDB & Redis', room: 'Lab 301', instructor: 'Prof. Sunita Rao', type: 'Lecture' },
      { time: '11:30 AM - 01:00 PM', course: 'Operating Systems & Concurrency', room: 'Room 204', instructor: 'Dr. Rajesh Kulkarni', type: 'Lecture' },
      { time: '02:30 PM - 04:30 PM', course: 'Mock Technical Interview Sprint', room: 'Online Meet', instructor: 'Career Placement Team', type: 'Mentorship' }
    ],
    Wednesday: [
      { time: '09:00 AM - 11:00 AM', course: 'DevOps & Docker Containerization', room: 'Lab 402', instructor: 'Dr. Amit Roy', type: 'Lab' },
      { time: '11:30 AM - 01:00 PM', course: 'Cloud Infrastructure with AWS ECS', room: 'Room 105', instructor: 'Dr. Rajesh Kulkarni', type: 'Lecture' },
      { time: '02:00 PM - 04:00 PM', course: 'Applied Hackathon Sandbox Session', room: 'Innovation Hub', instructor: 'OPELS Mentor Team', type: 'Hackathon' }
    ],
    Thursday: [
      { time: '10:00 AM - 11:30 AM', course: 'React 18 & State Architecture', room: 'Lab 201', instructor: 'Prof. Sunita Rao', type: 'Lecture' },
      { time: '12:00 PM - 01:30 PM', course: 'API Security & OAuth2 Integration', room: 'Room 302', instructor: 'Dr. Amit Roy', type: 'Lecture' },
      { time: '02:30 PM - 04:00 PM', course: 'Open Source Code Review Roundtable', room: 'Seminar Hall', instructor: 'Fellowship Faculty', type: 'Seminar' }
    ],
    Friday: [
      { time: '09:30 AM - 12:30 PM', course: 'Capstone Milestone Code Submission', room: 'Dev Cloud Studio', instructor: 'Full Faculty Panel', type: 'Evaluation' },
      { time: '02:00 PM - 03:30 PM', course: 'Industry Leader Masterclass & Q&A', room: 'Main Auditorium', instructor: 'Guest Tech Lead (Google/Microsoft)', type: 'Masterclass' }
    ]
  };

  const currentSlots = scheduleData[selectedDay] || [];

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Academic & Sandbox Timetable</h2>
          <p className="text-xs text-gray-400 mt-0.5">Weekly schedule for lectures, hands-on labs, and placement accelerators.</p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {days.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`btn ${selectedDay === d ? 'btn-primary' : 'btn-secondary'} text-xs`}
              style={{ padding: '0.4rem 0.85rem' }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {currentSlots.map((slot, idx) => (
          <div key={idx} className="stat-card justify-between items-center flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex flex-col items-center justify-center text-cyan-300">
                <Clock size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="badge badge-cs text-[11px]">{slot.type}</span>
                  <h4 className="font-bold text-sm text-white">{slot.course}</h4>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400 mt-1 flex-wrap">
                  <span className="flex items-center gap-1 text-gray-300">
                    <Clock size={11} className="text-cyan-400" /> {slot.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={11} className="text-emerald-400" /> {slot.room}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={11} className="text-blue-400" /> {slot.instructor}
                  </span>
                </div>
              </div>
            </div>

            <span className="badge badge-it text-xs">Scheduled</span>
          </div>
        ))}
      </div>
    </div>
  );
}
