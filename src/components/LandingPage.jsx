import React from 'react';
import { Sparkles, ArrowRight, Code2, Users, Award, Briefcase } from 'lucide-react';

export default function LandingPage({ onExplorePrograms, onOpenSandbox, onOpenApply }) {
  return (
    <div className="space-y-12">
      <div className="hero-section text-center py-16 px-6">
        <div className="hero-badge mx-auto mb-4">
          <Sparkles size={14} className="text-cyan-400" />
          <span>India's Premier Applied Tech Fellowship</span>
        </div>
        <h1 className="hero-title max-w-3xl mx-auto">
          Learn Software Engineering by <span className="gradient-text">Building Real Products</span>
        </h1>
        <p className="hero-description max-w-2xl mx-auto mt-4">
          Skip generic video courses. Gain work-like experience with microservices, scalable databases, and system design, mentored by engineering leads.
        </p>
        <div className="hero-cta-group justify-center mt-8">
          <button className="btn btn-primary" onClick={onOpenApply}>
            <span>Book Free Trial Session</span>
            <ArrowRight size={16} />
          </button>
          <button className="btn btn-secondary" onClick={onOpenSandbox}>
            <Code2 size={16} />
            <span>Launch Dev Sandbox</span>
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value text-cyan-400">94.2%</div>
          <div className="stat-label">Placement Success Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-emerald-400">14.5 LPA</div>
          <div className="stat-label">Average CTC</div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-amber-400">1,200+</div>
          <div className="stat-label">Hiring Partners</div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-blue-400">4 Micro-Projects</div>
          <div className="stat-label">Portfolio Ready</div>
        </div>
      </div>
    </div>
  );
}
