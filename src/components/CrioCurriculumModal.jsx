import React from 'react';
import { X, CheckCircle2, Clock, Calendar, Download, ArrowRight, Layers, Award } from 'lucide-react';

export default function CrioCurriculumModal({ program, onClose, onApply }) {
  if (!program) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content syllabus-modal-container" onClick={e => e.stopPropagation()}>
        {/* Modal Top Ribbon */}
        <div className="syllabus-header">
          <div>
            <span className="syllabus-badge">{program.badge}</span>
            <h3 className="syllabus-title">{program.title}</h3>
            <div className="syllabus-meta-row">
              <span><Clock size={13} /> {program.duration}</span>
              <span>•</span>
              <span><Calendar size={13} /> Next Cohort: {program.nextCohort}</span>
              <span>•</span>
              <span className="text-cyan">{program.mode}</span>
            </div>
          </div>
          <button className="btn-close-circle" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Body: Sprints Breakdown */}
        <div className="syllabus-body-scroll">
          <div className="syllabus-overview-card">
            <h4>Program Learning Architecture</h4>
            <p>
              Each sprint is engineered like a 2-week developer iteration at a tech startup.
              You pick tickets from the backlog, implement functionality in your local IDE,
              write automated test cases, and pass CI checks.
            </p>
          </div>

          <div className="sprints-timeline">
            {program.curriculum?.map((sprint, idx) => (
              <div key={idx} className="sprint-timeline-node">
                <div className="sprint-marker">
                  <span className="marker-num">{idx + 1}</span>
                </div>
                <div className="sprint-content-card">
                  <div className="sprint-top">
                    <span className="sprint-pill">{sprint.sprint}</span>
                    <span className="sprint-weeks">{sprint.weeks}</span>
                  </div>
                  <h4 className="sprint-name">{sprint.title}</h4>
                  <p className="sprint-details-text">{sprint.details}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Real Projects Included */}
          <div className="syllabus-projects-highlight">
            <h4>Projects You Will Commit to Your GitHub Portfolio:</h4>
            <div className="syllabus-project-tags">
              {program.projectsList?.map((p, i) => (
                <div key={i} className="syllabus-p-item">
                  <CheckCircle2 size={16} className="text-cyan" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="syllabus-footer">
          <div className="syllabus-footer-left">
            <span className="footer-ctc-note">Average CTC: <strong>{program.avgCtc}</strong></span>
          </div>
          <div className="syllabus-footer-actions">
            <button className="btn btn-secondary" onClick={onClose}>
              Close Syllabus
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => {
                onClose();
                onApply(program);
              }}
            >
              Apply for this Track
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
