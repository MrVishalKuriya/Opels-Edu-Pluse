import React from 'react';
import { 
  ArrowRight, BarChart3, Search, 
  Download, CreditCard, Database, Users, Sparkles 
} from 'lucide-react';

export default function LandingPage({ onLaunchPortal, stats }) {
  const totalStudents = stats?.totalStudents || 0;
  const courseCounts = stats?.courseCounts || {};
  const totalCourses = Object.keys(courseCounts).length;

  const features = [
    {
      icon: <Users size={28} />,
      title: "Student Record Management",
      description: "Full CRUD operations for managing student profiles, enrollment semesters, contact information, and academic departments.",
      color: "rgba(0, 127, 255, 0.15)",
      textColor: "#007fff"
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Real-Time Academic Analytics",
      description: "Live stats dashboard with total enrollment metrics, average age distribution, and department breakdown charts.",
      color: "rgba(13, 148, 136, 0.15)",
      textColor: "#0d9488"
    },
    {
      icon: <Search size={28} />,
      title: "Smart Multi-Criteria Filter",
      description: "Instant search by name, email, or phone number alongside course and semester filtering for instant data lookup.",
      color: "rgba(0, 210, 255, 0.15)",
      textColor: "#00b4d8"
    },
    {
      icon: <Download size={28} />,
      title: "One-Click CSV Export",
      description: "Export full or filtered student rosters directly to CSV files for administrative reports and record keeping.",
      color: "rgba(245, 158, 11, 0.15)",
      textColor: "#d97706"
    },
    {
      icon: <CreditCard size={28} />,
      title: "Digital ID Card Preview",
      description: "Generate official digital student ID badges with student photo avatars, QR code placeholders, and college credentials.",
      color: "rgba(37, 99, 235, 0.15)",
      textColor: "#2563eb"
    },
    {
      icon: <Database size={28} />,
      title: "MySQL Enterprise Backend",
      description: "Powered by Spring Boot 3.3 REST APIs, JPA Hibernate persistence, and MySQL enterprise relational database.",
      color: "rgba(10, 13, 20, 0.15)",
      textColor: "#0a0d14"
    }
  ];

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section glass-panel">
        <div className="hero-badge">
          <img src="/logo.png" alt="Company Logo" style={{ height: '22px', width: 'auto' }} />
          <span>Opels Educational Enterprise Platform</span>
        </div>

        <h1 className="hero-title">
          Empower Your Institution with <span style={{ color: 'var(--company-blue)' }}>Opels EduPulse</span>
        </h1>

        <p className="hero-subtitle">
          Streamline student enrollments, monitor departmental analytics, manage faculty staffing, post campus announcements, and access timetables with real-time speed.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary btn-hero" onClick={onLaunchPortal}>
            <span>Launch Student Portal</span>
            <ArrowRight size={20} />
          </button>
          
          <a href="#features" className="btn btn-secondary btn-hero">
            <span>Explore Features</span>
          </a>
        </div>

        {/* Live Quick Counters */}
        <div className="hero-stats-banner">
          <div className="hero-stat-item">
            <div className="hero-stat-num">{totalStudents}+</div>
            <div className="hero-stat-text">Active Students</div>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <div className="hero-stat-num">{totalCourses > 0 ? totalCourses : 5}</div>
            <div className="hero-stat-text">Academic Departments</div>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat-item">
            <div className="hero-stat-num">99.9%</div>
            <div className="hero-stat-text">System Reliability</div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2 className="section-title">Comprehensive Campus Features</h2>
          <p className="section-subtitle">Everything you need to run your college student directory efficiently.</p>
        </div>

        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card glass-panel">
              <div className="feature-icon" style={{ background: feature.color, color: feature.textColor }}>
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive CTA Banner */}
      <section className="cta-banner glass-panel">
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Ready to Manage Campus Records?
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Access student rosters, add new enrollments, and export departmental reports instantly.
          </p>
        </div>
        <button className="btn btn-primary" onClick={onLaunchPortal} style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
          <span>Open Management Portal</span>
          <ArrowRight size={18} />
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <img src="/logo.png" alt="Company Logo" style={{ height: '24px', width: 'auto' }} />
          <span style={{ fontWeight: 700 }}>Opels EduPulse System</span>
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} Opels Educational Enterprise Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
