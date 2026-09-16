import React from 'react';
import { Terminal, Code, Award, Briefcase, Heart, ExternalLink, ShieldCheck } from 'lucide-react';

export default function CrioFooter({ setActiveView, onOpenApply }) {
  return (
    <footer className="crio-footer-wrapper">
      <div className="footer-top-grid">
        {/* Brand Col */}
        <div className="footer-brand-col">
          <div className="footer-brand-header">
            <img src="/logo.png" alt="OPELS Logo" className="footer-logo" />
            <div>
              <div className="footer-brand-title">OPELS <span>Learn</span></div>
              <span className="footer-brand-tag">CRIO-INSPIRED EXPERIENTIAL FELLOWSHIP</span>
            </div>
          </div>
          <p className="footer-about-text">
            Empowering engineers to break into Tier-1 product companies through 100% project-based
            software engineering and micro-experiences. Zero passive video lectures, real code only.
          </p>
          <div className="footer-badge-accredited">
            <ShieldCheck size={16} className="text-cyan" />
            <span>Accredited Developer Fellowship • 900+ Hiring Partners</span>
          </div>
        </div>

        {/* Links Col 1: Fellowships */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Fellowship Programs</h4>
          <ul>
            <li><a href="#programs" onClick={(e) => { e.preventDefault(); setActiveView('programs'); }}>Full Stack Web Dev with AI</a></li>
            <li><a href="#programs" onClick={(e) => { e.preventDefault(); setActiveView('programs'); }}>Enterprise Backend Engineering</a></li>
            <li><a href="#programs" onClick={(e) => { e.preventDefault(); setActiveView('programs'); }}>NextGen Data Science & GenAI</a></li>
            <li><a href="#programs" onClick={(e) => { e.preventDefault(); setActiveView('programs'); }}>QA Automation & SDET Track</a></li>
            <li><a href="#scholarship" onClick={(e) => { e.preventDefault(); setActiveView('scholarship'); }}>Scholarship & Eligibility Test</a></li>
          </ul>
        </div>

        {/* Links Col 2: Practice & Sandboxes */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Interactive Sandboxes</h4>
          <ul>
            <li><a href="#sandbox" onClick={(e) => { e.preventDefault(); setActiveView('sandbox'); }}>QKart E-Commerce Microservices</a></li>
            <li><a href="#sandbox" onClick={(e) => { e.preventDefault(); setActiveView('sandbox'); }}>QTrip Travel Experience Grid</a></li>
            <li><a href="#sandbox" onClick={(e) => { e.preventDefault(); setActiveView('sandbox'); }}>QMoney Stock Portfolio Engine</a></li>
            <li><a href="#sandbox" onClick={(e) => { e.preventDefault(); setActiveView('sandbox'); }}>Enterprise RAG & AI Copilot</a></li>
            <li><a href="#masterclasses" onClick={(e) => { e.preventDefault(); setActiveView('masterclasses'); }}>Free System Design Masterclasses</a></li>
          </ul>
        </div>

        {/* Links Col 3: Career & ERP */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Career & Enterprise</h4>
          <ul>
            <li><a href="#placements" onClick={(e) => { e.preventDefault(); setActiveView('placements'); }}>Placement Report (94.2%)</a></li>
            <li><a href="#placements" onClick={(e) => { e.preventDefault(); setActiveView('placements'); }}>Salary Hike Calculator</a></li>
            <li><a href="#placements" onClick={(e) => { e.preventDefault(); setActiveView('placements'); }}>900+ Tech Hiring Partners</a></li>
            <li><a href="#portal" onClick={(e) => { e.preventDefault(); setActiveView('portal'); }}>Campus Student ERP System</a></li>
            <li><a href="https://opels.co.in" target="_blank" rel="noreferrer" className="external-link">Opels Official Portal <ExternalLink size={12} /></a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div>
          © {new Date().getFullYear()} OPELS Technologies Pvt. Ltd. All Rights Reserved. Built with Crio.do experiential learning methodology.
        </div>
        <div className="footer-sub-links">
          <span>Enterprise Sharp Edition</span>
          <span>•</span>
          <span>Privacy & Honor Code</span>
          <span>•</span>
          <span>100% Practical Guarantee</span>
        </div>
      </div>
    </footer>
  );
}
