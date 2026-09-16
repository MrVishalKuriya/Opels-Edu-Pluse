import React from 'react';
import { X, Edit3, Mail, Phone, BookOpen, Calendar, CheckCircle2 } from 'lucide-react';

export default function StudentDetailsModal({ student, onClose, onEdit }) {
  if (!student) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div className="modal-header">
          <h3 className="modal-title">Student Profile & ID</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="id-card-preview">
          <div className="id-card">
            <div className="id-card-header">
              <div className="text-xs uppercase tracking-widest font-extrabold text-black">OPELS ACADEMY & TECH</div>
              <div className="text-[10px] text-black/80">OFFICIAL STUDENT IDENTITY</div>
            </div>

            <div className="id-card-body">
              <div className="id-avatar">
                {student.name ? student.name.charAt(0) : 'S'}
              </div>

              <div className="id-name">{student.name}</div>
              <div className="id-dept">{student.course}</div>

              <div className="id-grid">
                <div>
                  <span className="id-lbl">ROLL / ID NO</span>
                  <span className="id-val">#STU-{student.id}</span>
                </div>
                <div>
                  <span className="id-lbl">SEMESTER</span>
                  <span className="id-val">{student.semester || 'Semester 4'}</span>
                </div>
                <div>
                  <span className="id-lbl">ATTENDANCE</span>
                  <span className="id-val text-emerald-400">{student.attendanceRate || 92}%</span>
                </div>
                <div>
                  <span className="id-lbl">FEES</span>
                  <span className="id-val text-cyan-400">{student.feeStatus || 'Paid'}</span>
                </div>
              </div>

              <div className="mt-4 text-left space-y-2 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-gray-400" />
                  <span>{student.email}</span>
                </div>
                {student.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-gray-400" />
                    <span>{student.phone}</span>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <div className="barcode-stub">||| | | || ||| || ||| | |||</div>
              </div>
            </div>

            <div className="id-card-footer">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>Verified Enrolled Scholar • OPELS Experiential Tech</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-5 pt-3 border-t border-white/10">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          {onEdit && (
            <button 
              className="btn btn-primary"
              onClick={() => {
                onClose();
                onEdit(student);
              }}
            >
              <Edit3 size={15} />
              <span>Edit Details</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
