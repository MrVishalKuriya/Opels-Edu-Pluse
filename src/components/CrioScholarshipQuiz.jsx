import React, { useState } from 'react';
import { 
  Award, CheckCircle2, ArrowRight, ArrowLeft, 
  Sparkles, DollarSign, Clock, Briefcase, RefreshCw, Copy, Check 
} from 'lucide-react';
import { learningApi } from '../services/api';

export default function CrioScholarshipQuiz({ onApplyWithScholarship }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [background, setBackground] = useState('working_pro');
  const [targetTrack, setTargetTrack] = useState('fullstack-dev');
  const [weeklyHours, setWeeklyHours] = useState('12');
  const [isCalculating, setIsCalculating] = useState(false);
  const [scholarshipResult, setScholarshipResult] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCalculate = async () => {
    setIsCalculating(true);
    try {
      const res = await learningApi.checkScholarship({
        background,
        targetTrack,
        weeklyHours: parseInt(weeklyHours, 10),
      });
      setScholarshipResult(res);
      setCurrentStep(4); // Results step
    } catch (err) {
      console.error("Scholarship calculation error:", err);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleCopyCode = () => {
    if (scholarshipResult?.couponCode) {
      navigator.clipboard.writeText(scholarshipResult.couponCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <section className="crio-section-wrapper" id="scholarship-section">
      <div className="section-header-centered">
        <div className="section-pill">SCHOLARSHIP & ELIGIBILITY ASSESSMENT</div>
        <h2 className="section-main-heading">
          Get Up to <span className="highlight-blue">₹30,000 Tuition Grant</span>
        </h2>
        <p className="section-sub-heading">
          Answer 3 quick questions about your experience and engineering goals to unlock
          a merit-based scholarship and personalized developer roadmap.
        </p>
      </div>

      <div className="quiz-container-card">
        {/* Progress Bar */}
        <div className="quiz-step-progress">
          <div className="step-dots-row">
            <div className={`step-dot ${currentStep >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step-line ${currentStep >= 2 ? 'active' : ''}`}></div>
            <div className={`step-dot ${currentStep >= 2 ? 'active' : ''}`}>2</div>
            <div className={`step-line ${currentStep >= 3 ? 'active' : ''}`}></div>
            <div className={`step-dot ${currentStep >= 3 ? 'active' : ''}`}>3</div>
            <div className={`step-line ${currentStep >= 4 ? 'active' : ''}`}></div>
            <div className={`step-dot ${currentStep >= 4 ? 'active' : ''}`}>★</div>
          </div>
          <div className="step-label-indicator">
            {currentStep === 1 && "Step 1: Your Current Background"}
            {currentStep === 2 && "Step 2: Desired Career Track"}
            {currentStep === 3 && "Step 3: Weekly Study Hours"}
            {currentStep === 4 && "Merit Scholarship Result"}
          </div>
        </div>

        {/* Step 1: Background */}
        {currentStep === 1 && (
          <div className="quiz-step-body">
            <h3 className="quiz-question-title">What best describes your current experience?</h3>
            <div className="quiz-options-grid">
              {[
                { id: 'working_pro', label: 'Working Software Engineer / IT Professional', sub: 'Looking to switch to product companies or upskill to SDE-2' },
                { id: 'non_it', label: 'Non-IT Professional / Career Switcher', sub: 'Mechanical, civil, electrical, operations wanting to break into tech' },
                { id: 'student_cs', label: 'College Student (CS / IT / MCA)', sub: 'Building production portfolios before campus placement drives' },
                { id: 'fresh_grad', label: 'Fresh Graduate / Career Break', sub: 'Seeking job-ready practical skills with guaranteed referrals' }
              ].map((opt) => (
                <div
                  key={opt.id}
                  className={`quiz-option-card ${background === opt.id ? 'selected' : ''}`}
                  onClick={() => setBackground(opt.id)}
                >
                  <div className="opt-check-circle">
                    {background === opt.id && <CheckCircle2 size={18} className="text-cyan" />}
                  </div>
                  <div>
                    <div className="opt-title">{opt.label}</div>
                    <div className="opt-sub">{opt.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="quiz-actions-row">
              <div></div>
              <button className="btn btn-primary" onClick={() => setCurrentStep(2)}>
                Next Step <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Desired Track */}
        {currentStep === 2 && (
          <div className="quiz-step-body">
            <h3 className="quiz-question-title">Which engineering domain do you want to specialize in?</h3>
            <div className="quiz-options-grid">
              {[
                { id: 'fullstack-dev', label: 'Full Stack Web Development with AI', sub: 'React, Node, MongoDB, System Design, RAG AI Agents' },
                { id: 'backend-dev', label: 'Enterprise Backend Engineering', sub: 'Java, Spring Boot, Microservices, Redis, Kafka, AWS' },
                { id: 'data-science-ai', label: 'NextGen Data Science & Generative AI', sub: 'Python, SQL, Machine Learning, Deep Learning, BigQuery' },
                { id: 'qa-automation', label: 'QA Automation & SDET with AI', sub: 'Selenium, RestAssured, Playwright, CI/CD, Test Frameworks' }
              ].map((opt) => (
                <div
                  key={opt.id}
                  className={`quiz-option-card ${targetTrack === opt.id ? 'selected' : ''}`}
                  onClick={() => setTargetTrack(opt.id)}
                >
                  <div className="opt-check-circle">
                    {targetTrack === opt.id && <CheckCircle2 size={18} className="text-cyan" />}
                  </div>
                  <div>
                    <div className="opt-title">{opt.label}</div>
                    <div className="opt-sub">{opt.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="quiz-actions-row">
              <button className="btn btn-secondary" onClick={() => setCurrentStep(1)}>
                <ArrowLeft size={16} /> Previous
              </button>
              <button className="btn btn-primary" onClick={() => setCurrentStep(3)}>
                Next Step <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Weekly Commitment */}
        {currentStep === 3 && (
          <div className="quiz-step-body">
            <h3 className="quiz-question-title">How many hours can you commit each week?</h3>
            <div className="quiz-options-grid">
              {[
                { id: '8', label: '8 - 10 Hours / Week', sub: 'Ideal for working professionals with busy weekday schedules' },
                { id: '12', label: '12 - 15 Hours / Week (Recommended)', sub: 'Fastest progress with dedicated weekend sprint workshops' },
                { id: '20', label: '20+ Hours / Week (Full Immersion)', sub: 'Intensive track for career switchers and full-time learners' }
              ].map((opt) => (
                <div
                  key={opt.id}
                  className={`quiz-option-card ${weeklyHours === opt.id ? 'selected' : ''}`}
                  onClick={() => setWeeklyHours(opt.id)}
                >
                  <div className="opt-check-circle">
                    {weeklyHours === opt.id && <CheckCircle2 size={18} className="text-cyan" />}
                  </div>
                  <div>
                    <div className="opt-title">{opt.label}</div>
                    <div className="opt-sub">{opt.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="quiz-actions-row">
              <button className="btn btn-secondary" onClick={() => setCurrentStep(2)}>
                <ArrowLeft size={16} /> Previous
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleCalculate}
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <>
                    <RefreshCw size={16} className="spin" />
                    <span>Calculating Merit Grant...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Unlock Scholarship Result</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Results Display */}
        {currentStep === 4 && scholarshipResult && (
          <div className="quiz-step-body quiz-result-view">
            <div className="result-award-header">
              <div className="award-badge-icon">
                <Award size={36} className="text-cyan" />
              </div>
              <h3 className="result-title">Congratulations! You Qualify for a Merit Grant</h3>
              <p className="result-subtitle">
                Based on your profile and commitment level, you have been awarded an upfront tuition grant:
              </p>
            </div>

            <div className="result-grant-box">
              <div className="grant-amount-label">TUITION GRANT APPROVED</div>
              <div className="grant-amount-val">{scholarshipResult.grantAmount}</div>
              <div className="coupon-code-row">
                <span>Your Promo Code:</span>
                <span className="code-pill">{scholarshipResult.couponCode}</span>
                <button className="btn-copy-code" onClick={handleCopyCode}>
                  {copiedCode ? <Check size={14} className="text-cyan" /> : <Copy size={14} />}
                  {copiedCode ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="result-highlights-grid">
              <div className="res-highlight-item">
                <span className="lbl">Projected Target CTC</span>
                <span className="val highlight">{scholarshipResult.projectedCtc}</span>
              </div>
              <div className="res-highlight-item">
                <span className="lbl">Recommended Track</span>
                <span className="val">
                  {scholarshipResult.recommendedProgram.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              <div className="res-highlight-item">
                <span className="lbl">Placement Support</span>
                <span className="val">900+ Partner Referrals</span>
              </div>
            </div>

            <div className="quiz-actions-row centered">
              <button 
                className="btn btn-primary btn-hero"
                onClick={() => onApplyWithScholarship && onApplyWithScholarship({
                  couponCode: scholarshipResult.couponCode,
                  grantAmount: scholarshipResult.grantAmount,
                  programId: targetTrack,
                })}
              >
                Claim {scholarshipResult.grantAmount} Scholarship & Apply Now
                <ArrowRight size={16} />
              </button>
              <button className="btn btn-secondary" onClick={() => setCurrentStep(1)}>
                Retake Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
