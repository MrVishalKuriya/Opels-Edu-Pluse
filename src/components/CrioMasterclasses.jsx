import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Users, Video, ArrowRight, 
  CheckCircle2, Sparkles, BookOpen, Download 
} from 'lucide-react';
import { learningApi } from '../services/api';
import { masterclassesList as fallbackMasterclasses } from '../data/learningData';

export default function CrioMasterclasses({ onShowToast }) {
  const [masterclasses, setMasterclasses] = useState(fallbackMasterclasses);
  const [reservedEvents, setReservedEvents] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadMasterclasses() {
      try {
        const data = await learningApi.getMasterclasses();
        if (isMounted && data && data.length > 0) {
          setMasterclasses(data);
        }
      } catch (err) {
        // Fallback already initialized in state
      }
    }
    loadMasterclasses();
    return () => { isMounted = false; };
  }, []);

  const handleRSVP = async (event) => {
    try {
      await learningApi.rsvpMasterclass(event.id);
      setReservedEvents(prev => ({ ...prev, [event.id]: true }));
      if (onShowToast) {
        onShowToast(`Seat reserved for "${event.title}"! Calendar invite sent to your email.`, 'success');
      }
    } catch (err) {
      console.error("RSVP error:", err);
    }
  };

  const freeResources = [
    { title: "System Design Cheat Sheet (15 HLD Case Studies)", format: "PDF Guide • 42 Pages", downloads: "12,400+ downloads" },
    { title: "FAANG Machine Coding Round Rubric & Boilerplates", format: "GitHub Template • React & Java", downloads: "8,900+ downloads" },
    { title: "Top 100 SDE Interview Questions with Video Solutions", format: "Curated Roadmaps", downloads: "24,000+ downloads" }
  ];

  return (
    <section className="crio-section-wrapper" id="masterclasses-section">
      {/* Section Header */}
      <div className="section-header-centered">
        <div className="section-pill">FREE DEVELOPER WORKSHOPS</div>
        <h2 className="section-main-heading">
          Live Interactive <span className="highlight-blue">Tech Masterclasses</span>
        </h2>
        <p className="section-sub-heading">
          Learn high-level system design, AI pipelines, and coding techniques directly from
          Staff Engineers at Uber, Amazon, and Google. Free, practical, and highly actionable.
        </p>
      </div>

      {/* Masterclasses Grid */}
      <div className="masterclasses-grid">
        {masterclasses.map((event) => {
          const isReserved = reservedEvents[event.id];
          return (
            <div key={event.id} className="masterclass-card">
              <div className="mc-badge-row">
                <span className="mc-category-tag">{event.category}</span>
                <span className="mc-seats-tag">
                  {isReserved ? 'Seat Confirmed' : `${event.seatsLeft} Seats Left`}
                </span>
              </div>

              <h3 className="mc-title">{event.title}</h3>
              <div className="mc-instructor-line">By {event.instructor}</div>

              <div className="mc-meta-box">
                <div className="mc-meta-item">
                  <Calendar size={14} className="text-cyan" />
                  <span>{event.date}</span>
                </div>
                <div className="mc-meta-item">
                  <Clock size={14} className="text-cyan" />
                  <span>{event.duration}</span>
                </div>
                <div className="mc-meta-item">
                  <Users size={14} className="text-cyan" />
                  <span>{event.attendeesCount} Engineers Attending</span>
                </div>
              </div>

              <div className="mc-topics-list">
                <span className="topics-heading">What You Will Build & Learn:</span>
                <ul>
                  {event.topics?.map((topic, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={13} className="text-cyan" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mc-actions">
                {isReserved ? (
                  <button className="btn btn-secondary btn-full" disabled style={{ color: 'var(--company-cyan)' }}>
                    <CheckCircle2 size={16} />
                    Seat Confirmed • Calendar Sent
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary btn-full"
                    onClick={() => handleRSVP(event)}
                  >
                    <Video size={16} />
                    Reserve Free Seat (Limited)
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Free Engineering Resources Banner */}
      <div className="free-resources-card">
        <div className="resources-header">
          <div className="resources-title-col">
            <BookOpen size={24} className="text-cyan" />
            <div>
              <h3>Free Developer Roadmaps & Architecture Guides</h3>
              <p>Handcrafted by OPELS Engineering Leads. No spam, free download.</p>
            </div>
          </div>
        </div>

        <div className="resources-list-row">
          {freeResources.map((res, idx) => (
            <div key={idx} className="resource-item-box">
              <div className="res-title">{res.title}</div>
              <div className="res-sub">{res.format}</div>
              <button 
                className="btn-download-res"
                onClick={() => onShowToast && onShowToast(`Started download: ${res.title}`, 'info')}
              >
                <Download size={14} /> Download Free PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
