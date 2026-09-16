import React, { useState, useEffect } from 'react';
import { 
  Briefcase, TrendingUp, Award, Users, Search, 
  ArrowRight, CheckCircle2, Building, DollarSign, Quote, ExternalLink 
} from 'lucide-react';
import { learningApi } from '../services/api';
import { placementData as fallbackPlacementData } from '../data/learningData';

export default function CrioPlacements({ onApplyNow }) {
  const [placementData, setPlacementData] = useState(fallbackPlacementData);
  const [selectedStoryFilter, setSelectedStoryFilter] = useState('all');
  const [currentSalary, setCurrentSalary] = useState(4.5); // in LPA
  const [partnerSearch, setPartnerSearch] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function fetchPlacements() {
      try {
        const data = await learningApi.getPlacements();
        if (isMounted && data) {
          setPlacementData(data);
        }
      } catch (err) {
        // Fallback already initialized in state
      }
    }
    fetchPlacements();
    return () => { isMounted = false; };
  }, []);

  // Compute projected salary using industry placement statistics
  const calculateProjectedSalary = (current) => {
    let multiplier = 2.8;
    if (current <= 4) multiplier = 3.8;
    else if (current <= 8) multiplier = 2.6;
    else multiplier = 2.0;

    const projectedMin = Math.round(current * (multiplier - 0.3) * 10) / 10;
    const projectedMax = Math.round(current * multiplier * 10) / 10;
    const percentage = Math.round(((projectedMax - current) / current) * 100);

    return { projectedMin, projectedMax, percentage };
  };

  const { projectedMin, projectedMax, percentage } = calculateProjectedSalary(currentSalary);

  const stories = placementData?.stories || [];
  const filteredStories = selectedStoryFilter === 'all'
    ? stories
    : stories.filter(s => {
        if (selectedStoryFilter === 'service-to-product') {
          return s.previousRole.includes('TCS') || s.previousRole.includes('Wipro') || s.previousRole.includes('Infosys');
        }
        if (selectedStoryFilter === 'non-tech') {
          return s.previousRole.includes('Non-CS') || s.previousRole.includes('Mechanical');
        }
        if (selectedStoryFilter === 'sdet') {
          return s.newRole.includes('SDET') || s.program.includes('QA');
        }
        return true;
      });

  const hiringPartners = placementData?.hiringPartners || [
    "Amazon", "Microsoft", "Google", "Flipkart", "Swiggy", "CRED",
    "Razorpay", "PhonePe", "Walmart Global Tech", "Atlassian", "Jio",
    "Capgemini", "Societe Generale", "Morgan Stanley", "Paytm", "Dell"
  ];

  const filteredPartners = partnerSearch.trim()
    ? hiringPartners.filter(p => p.toLowerCase().includes(partnerSearch.toLowerCase()))
    : hiringPartners;

  return (
    <section className="crio-section-wrapper" id="placements-section">
      {/* Section Header */}
      <div className="section-header-centered">
        <div className="section-pill">PROVEN CAREER OUTCOMES</div>
        <h2 className="section-main-heading">
          Where OPELS & Crio Fellows <span className="highlight-blue">Get Placed</span>
        </h2>
        <p className="section-sub-heading">
          Our graduates work at the world's most innovative tech companies.
          With 900+ active hiring partners and dedicated placement drives, your portfolio does the talking.
        </p>
      </div>

      {/* Placement Numbers Ribbon */}
      <div className="placements-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-val">94.2%</div>
          <div className="kpi-label">Placement Success Rate</div>
          <div className="kpi-sub">Across all batches in 2025-2026</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-val highlight">12.8 LPA</div>
          <div className="kpi-label">Average CTC Offered</div>
          <div className="kpi-sub">Median package: 11.5 LPA</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-val">43.0 LPA</div>
          <div className="kpi-label">Highest Package</div>
          <div className="kpi-sub">Offered by Tier-1 product tech firm</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-val">900+</div>
          <div className="kpi-label">Active Hiring Partners</div>
          <div className="kpi-sub">Direct interview referrals</div>
        </div>
      </div>

      {/* Interactive Salary Hike Calculator */}
      <div className="salary-calculator-panel">
        <div className="calc-left-col">
          <div className="calc-badge">
            <TrendingUp size={14} className="text-cyan" />
            <span>INTERACTIVE SALARY HIKE CALCULATOR</span>
          </div>
          <h3 className="calc-title">Calculate Your Projected Salary Leap</h3>
          <p className="calc-desc">
            Based on career transitions of 15,000+ engineers from IT services & fresh graduate backgrounds
            who completed our project-based tracks.
          </p>

          <div className="slider-control-group">
            <div className="slider-label-row">
              <span>Current CTC:</span>
              <span className="slider-current-val">{currentSalary} LPA</span>
            </div>
            <input 
              type="range" 
              min="2.5" 
              max="15" 
              step="0.5"
              value={currentSalary}
              onChange={(e) => setCurrentSalary(parseFloat(e.target.value))}
              className="salary-range-slider"
            />
            <div className="slider-ticks">
              <span>₹2.5 LPA</span>
              <span>₹8 LPA</span>
              <span>₹15 LPA</span>
            </div>
          </div>
        </div>

        <div className="calc-right-col">
          <div className="projected-card">
            <span className="projected-tag">ESTIMATED SALARY AFTER COMPLETION</span>
            <div className="projected-num">
              {projectedMin} - {projectedMax} <span className="unit">LPA</span>
            </div>
            <div className="projected-hike-badge">
              <TrendingUp size={16} /> +{percentage}% Average Increase
            </div>
            <p className="projected-note">
              Qualify for roles like SDE-1, SDE-2, Full Stack Developer, and Backend Systems Engineer.
            </p>
            <button className="btn btn-primary btn-full" onClick={onApplyNow}>
              Check My Eligibility for this Bracket
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Filterable Career Transition Stories */}
      <div className="success-stories-section">
        <div className="stories-filter-bar">
          <h3 className="stories-heading">Verified Student Success Stories</h3>
          <div className="story-filter-pills">
            <button 
              className={`story-tab ${selectedStoryFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedStoryFilter('all')}
            >
              All Transitions
            </button>
            <button 
              className={`story-tab ${selectedStoryFilter === 'service-to-product' ? 'active' : ''}`}
              onClick={() => setSelectedStoryFilter('service-to-product')}
            >
              Service to Product (TCS, Wipro, Infosys)
            </button>
            <button 
              className={`story-tab ${selectedStoryFilter === 'non-tech' ? 'active' : ''}`}
              onClick={() => setSelectedStoryFilter('non-tech')}
            >
              Non-Tech / Non-CS Transitions
            </button>
            <button 
              className={`story-tab ${selectedStoryFilter === 'sdet' ? 'active' : ''}`}
              onClick={() => setSelectedStoryFilter('sdet')}
            >
              SDET & Automation
            </button>
          </div>
        </div>

        <div className="stories-grid">
          {filteredStories.map((story) => (
            <div key={story.id} className="story-card">
              <div className="story-header">
                <img src={story.avatar} alt={story.name} className="story-avatar" />
                <div className="story-user-info">
                  <h4 className="story-name">{story.name}</h4>
                  <span className="story-program-tag">{story.program}</span>
                </div>
                <div className="story-hike-pill">
                  +{story.hike} Hike
                </div>
              </div>

              {/* Transition Journey Bar */}
              <div className="transition-journey-bar">
                <div className="transition-step before">
                  <span className="step-lbl">BEFORE</span>
                  <div className="step-val">{story.previousRole}</div>
                  <div className="step-salary">{story.prevSalary}</div>
                </div>
                <div className="transition-arrow">──▶</div>
                <div className="transition-step after">
                  <span className="step-lbl">AFTER OPELS</span>
                  <div className="step-val highlight">{story.newRole} @ {story.company}</div>
                  <div className="step-salary highlight">{story.newSalary}</div>
                </div>
              </div>

              <div className="story-quote">
                <Quote size={16} className="quote-icon" />
                <p>"{story.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 900+ Hiring Partners Directory */}
      <div className="hiring-partners-directory">
        <div className="partners-header-row">
          <div>
            <h3 className="partners-title">Our Network of 900+ Hiring Partners</h3>
            <p className="partners-sub">Companies that hire engineers based on their verified OPELS & Crio project portfolios.</p>
          </div>
          <div className="partner-search-box">
            <Search size={16} className="text-muted" />
            <input 
              type="text" 
              placeholder="Search hiring company..." 
              value={partnerSearch}
              onChange={(e) => setPartnerSearch(e.target.value)}
              className="partner-search-input"
            />
          </div>
        </div>

        <div className="partners-grid-chips">
          {filteredPartners.map((partner, idx) => (
            <div key={idx} className="partner-logo-card">
              <Building size={16} className="text-blue" />
              <span className="partner-company-name">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
