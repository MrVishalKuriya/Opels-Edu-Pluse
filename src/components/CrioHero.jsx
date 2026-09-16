import React from 'react';
import { 
  Code2, Terminal, Award, Users, ArrowRight, 
  Sparkles, CheckCircle2, ShieldCheck, Play, Briefcase, Zap 
} from 'lucide-react';

export default function CrioHero({ onExplorePrograms, onOpenSandbox, onOpenScholarship, onOpenApply }) {
  return (
    <section className="crio-hero-wrapper">
      {/* Top Announcement Bar */}
      <div className="crio-announcement">
        <div className="announcement-pill">
          <span className="badge-pulse"></span>
          <span className="pill-bold">OPELS Tech Fellowship 2026</span>
          <span className="pill-divider">•</span>
          <span>Hands-on Project Based Learning like Crio.do</span>
        </div>
        <button className="announcement-link" onClick={onOpenScholarship}>
          Check Eligibility & Scholarship Grant <ArrowRight size={14} />
        </button>
      </div>

      {/* Main Hero Grid */}
      <div className="crio-hero-content">
        <div className="hero-text-col">
          <div className="brand-flag">
            <img src="/logo.png" alt="Opels Logo" className="hero-opels-logo" />
            <span className="brand-flag-text">OPELS APPLIED ENGINEERING ECOSYSTEM</span>
          </div>

          <h1 className="crio-hero-title">
            Learn Tech by <span className="highlight-blue">Doing Real Work.</span><br />
            Not by Watching Videos.
          </h1>

          <p className="crio-hero-desc">
            Build production-grade applications in an environment that mirrors high-growth tech companies.
            Work with live micro-experiences, debug microservices, write clean test suites, and master system design
            guided by principal engineers.
          </p>

          <div className="crio-hero-actions">
            <button className="btn btn-primary btn-hero" onClick={onExplorePrograms}>
              <Briefcase size={18} />
              Explore Fellowships
            </button>
            <button className="btn btn-secondary btn-hero-alt" onClick={onOpenSandbox}>
              <Terminal size={18} />
              Try Live Dev Sandbox
            </button>
            <button className="btn btn-ghost" onClick={onOpenScholarship}>
              <Award size={18} />
              Get Scholarship
            </button>
          </div>

          <div className="hero-trust-row">
            <div className="trust-item">
              <CheckCircle2 size={16} className="text-cyan" />
              <span>Real Git Workflows</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={16} className="text-cyan" />
              <span>100% Code Verified</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={16} className="text-cyan" />
              <span>Assured Referrals</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Terminal & Project Card Preview */}
        <div className="hero-preview-col">
          <div className="hero-ide-window">
            <div className="ide-window-header">
              <div className="window-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="ide-title-bar">
                <Terminal size={14} className="text-blue" />
                <span>opels-sandbox ~ qkart-microservices</span>
              </div>
              <span className="ide-live-badge">LIVE DEV DOCKER</span>
            </div>

            <div className="ide-code-snippet">
              <div className="ide-line"><span className="line-no">01</span><span className="syn-keyword">import</span> &#123; createDebounce &#125; <span className="syn-keyword">from</span> <span className="syn-str">'@opels/core'</span>;</div>
              <div className="ide-line"><span className="line-no">02</span><span className="syn-keyword">import</span> &#123; syncCartWithRedis &#125; <span className="syn-keyword">from</span> <span className="syn-str">'./cartEngine'</span>;</div>
              <div className="ide-line"><span className="line-no">03</span></div>
              <div className="ide-line"><span className="line-no">04</span><span className="syn-comment">// Milestone 2: Atomic Checkout & Concurrency Lock</span></div>
              <div className="ide-line"><span className="line-no">05</span><span className="syn-keyword">export async function</span> <span className="syn-func">processHighConcurrencyOrder</span>(order) &#123;</div>
              <div className="ide-line"><span className="line-no">06</span>  <span className="syn-keyword">const</span> lock = <span className="syn-keyword">await</span> redis.acquireLock(<span className="syn-str">\`stock:&#36;&#123;order.sku&#125;\`</span>);</div>
              <div className="ide-line"><span className="line-no">07</span>  <span className="syn-keyword">if</span> (!lock.acquired) <span className="syn-keyword">throw new</span> <span className="syn-func">RateLimitExceeded</span>();</div>
              <div className="ide-line"><span className="line-no">08</span>  <span className="syn-keyword">return</span> <span className="syn-keyword">await</span> executeAtomicTransaction(order);</div>
              <div className="ide-line"><span className="line-no">09</span>&#125;</div>
            </div>

            <div className="ide-terminal-strip">
              <div className="term-prompt">
                <span className="term-user">developer@opels:</span><span className="term-path">~/qkart</span>$ jest --runInBand --coverage
              </div>
              <div className="term-output success">
                ✓ PASS src/__tests__/inventoryCheckout.test.js (1.42s)
              </div>
              <div className="term-output">
                Tests: 14 passed, 14 total | Coverage: 98.4% Stmts
              </div>
            </div>

            <div className="ide-action-row">
              <span className="text-muted" style={{ fontSize: '0.8rem' }}>Ready to write code like this?</span>
              <button className="btn btn-sm btn-primary" onClick={onOpenSandbox}>
                Launch Playground <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Metrics Strip */}
      <div className="crio-stats-strip">
        <div className="crio-stat-box">
          <div className="crio-stat-num">94.2%</div>
          <div className="crio-stat-label">Placement Success Rate</div>
          <div className="crio-stat-sub">Across 900+ tech hiring partners</div>
        </div>
        <div className="stat-v-divider"></div>
        <div className="crio-stat-box">
          <div className="crio-stat-num">12.8 <span className="unit">LPA</span></div>
          <div className="crio-stat-label">Average CTC Offered</div>
          <div className="crio-stat-sub">Highest package up to 43.0 LPA</div>
        </div>
        <div className="stat-v-divider"></div>
        <div className="crio-stat-box">
          <div className="crio-stat-num">165%</div>
          <div className="crio-stat-label">Average Salary Hike</div>
          <div className="crio-stat-sub">From service to product companies</div>
        </div>
        <div className="stat-v-divider"></div>
        <div className="crio-stat-box">
          <div className="crio-stat-num">100%</div>
          <div className="crio-stat-label">Project-Based Learning</div>
          <div className="crio-stat-sub">Zero passive lectures, only real work</div>
        </div>
      </div>

      {/* Hiring Partners Marquee */}
      <div className="crio-partners-marquee">
        <div className="marquee-label">HIRING PARTNERS WHO HIRE OPELS & CRIO FELLOWS:</div>
        <div className="marquee-badges">
          {['Amazon', 'Microsoft', 'Google', 'Flipkart', 'Swiggy', 'CRED', 'Razorpay', 'PhonePe', 'Walmart Global', 'Atlassian', 'Jio', 'Capgemini', 'Societe Generale'].map((company, i) => (
            <span key={i} className="partner-chip">
              <span className="partner-dot"></span>
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
