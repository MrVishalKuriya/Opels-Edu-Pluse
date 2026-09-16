import React, { useState } from 'react';
import { 
  Code, Database, Cpu, ShieldCheck, ArrowRight, 
  Clock, Calendar, Award, Sparkles, CheckCircle2, ChevronRight, FileText 
} from 'lucide-react';

export default function CrioPrograms({ 
  programs = [], 
  onSelectProgramForSyllabus, 
  onApplyForProgram,
  onOpenSandboxWithProject
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Fellowships' },
    { id: 'fullstack-dev', label: 'Full Stack & AI' },
    { id: 'backend-dev', label: 'Backend Engineering' },
    { id: 'data-science-ai', label: 'Data Science & GenAI' },
    { id: 'qa-automation', label: 'QA Automation & SDET' }
  ];

  const filteredPrograms = selectedCategory === 'all' 
    ? programs 
    : programs.filter(p => p.id === selectedCategory);

  const getProgramIcon = (id) => {
    switch (id) {
      case 'fullstack-dev': return <Code className="text-blue" size={24} />;
      case 'backend-dev': return <Database className="text-cyan" size={24} />;
      case 'data-science-ai': return <Cpu className="text-blue" size={24} />;
      case 'qa-automation': return <ShieldCheck className="text-cyan" size={24} />;
      default: return <Sparkles className="text-blue" size={24} />;
    }
  };

  return (
    <section className="crio-section-wrapper" id="programs-section">
      {/* Section Header */}
      <div className="section-header-centered">
        <div className="section-pill">CAREER ACCELERATOR TRACKS</div>
        <h2 className="section-main-heading">
          Industry-Accredited <span className="highlight-blue">Developer Fellowships</span>
        </h2>
        <p className="section-sub-heading">
          No traditional passive lectures. You will work in sprints, submit pull requests,
          get code reviews, and build production software that recruiters love.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="category-filter-strip">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`filter-tab-pill ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Programs Grid */}
      <div className="programs-grid">
        {filteredPrograms.map((prog) => (
          <div key={prog.id} className="program-card">
            <div className="program-card-top">
              <div className="program-badge-row">
                <span className="program-tag">{prog.badge}</span>
                <span className="cohort-tag">
                  <Calendar size={12} /> Starts {prog.nextCohort}
                </span>
              </div>

              <div className="program-title-row">
                <div className="prog-icon-box">{getProgramIcon(prog.id)}</div>
                <div>
                  <h3 className="program-card-title">{prog.title}</h3>
                  <div className="program-duration-sub">
                    <Clock size={13} /> {prog.duration}
                  </div>
                </div>
              </div>

              <p className="program-desc">{prog.tagline}</p>
            </div>

            {/* CTC Highlights */}
            <div className="program-ctc-strip">
              <div className="ctc-item">
                <span className="ctc-label">AVERAGE CTC</span>
                <span className="ctc-val">{prog.avgCtc}</span>
              </div>
              <div className="ctc-divider"></div>
              <div className="ctc-item">
                <span className="ctc-label">HIGHEST CTC</span>
                <span className="ctc-val highlight">{prog.highestCtc}</span>
              </div>
            </div>

            {/* Real Projects Built */}
            <div className="program-projects-preview">
              <div className="projects-header-label">
                <span>{prog.projectsCount} REAL-WORLD ENTERPRISE PROJECTS:</span>
                <span className="mode-badge">{prog.mode}</span>
              </div>
              <div className="project-chips-list">
                {prog.projectsList.map((proj, idx) => (
                  <span 
                    key={idx} 
                    className="project-name-chip"
                    onClick={() => onOpenSandboxWithProject && onOpenSandboxWithProject(proj)}
                    title="Click to launch in Project Sandbox"
                  >
                    <span className="chip-dot"></span>
                    {proj}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills / Tech Stack */}
            <div className="program-skills-section">
              <span className="skills-header">TECH STACK MASTERED:</span>
              <div className="skills-tags">
                {prog.skills.map((skill, idx) => (
                  <span key={idx} className="skill-pill">{skill}</span>
                ))}
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="program-card-actions">
              <button 
                className="btn btn-secondary btn-full"
                onClick={() => onSelectProgramForSyllabus(prog)}
              >
                <FileText size={16} />
                Explore Syllabus ({prog.curriculum?.length || 6} Sprints)
              </button>
              <button 
                className="btn btn-primary btn-full"
                onClick={() => onApplyForProgram(prog)}
              >
                Apply for Fellowship
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="crio-guarantee-banner">
        <div className="guarantee-icon">
          <Award size={36} className="text-cyan" />
        </div>
        <div className="guarantee-text">
          <h4>The OPELS 100% Practical Guarantee</h4>
          <p>
            If you do not build functional, git-committed production microservices within the first 14 days,
            get a full 100% refund — no questions asked.
          </p>
        </div>
        <button 
          className="btn btn-outline-white" 
          onClick={() => onApplyForProgram(filteredPrograms[0] || programs[0])}
        >
          Book 1-on-1 Profile Assessment
        </button>
      </div>
    </section>
  );
}
