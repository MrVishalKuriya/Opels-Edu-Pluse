import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, ShieldCheck, ArrowRight, RefreshCw, Sparkles } from 'lucide-react';
import { learningApi } from '../services/api';

export default function CrioApplyModal({ 
  program, 
  scholarshipData, 
  onClose, 
  onSuccess 
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    programId: program?.id || scholarshipData?.programId || 'fullstack-dev',
    experience: 'working_pro',
    couponCode: scholarshipData?.couponCode || '',
    counselingSlot: 'Tomorrow, 6:00 PM',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg('Please fill in your name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await learningApi.apply(formData);
      if (onSuccess) {
        onSuccess(res);
      }
      onClose();
    } catch (err) {
      setErrorMsg(err?.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content apply-modal-container" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="apply-modal-header">
          <div>
            <span className="apply-badge">OPELS FELLOWSHIP ADMISSIONS</span>
            <h3 className="apply-modal-title">Apply for Fellowship & Free Trial</h3>
            <p className="apply-modal-sub">
              Get an instant profile assessment and book a 1-on-1 technical roadmap session with an industry mentor.
            </p>
          </div>
          <button className="btn-close-circle" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {scholarshipData?.grantAmount && (
          <div className="apply-scholarship-callout">
            <Sparkles size={18} className="text-cyan" />
            <div>
              <strong>{scholarshipData.grantAmount} Merit Grant Applied!</strong>
              <span> Using code <code>{scholarshipData.couponCode}</code></span>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="apply-error-banner">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="apply-form-body">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input 
              type="text" 
              className="input-custom" 
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input 
                type="email" 
                className="input-custom" 
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">WhatsApp / Phone *</label>
              <input 
                type="tel" 
                className="input-custom" 
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Select Fellowship Program</label>
              <select 
                className="select-custom"
                value={formData.programId}
                onChange={(e) => setFormData({ ...formData, programId: e.target.value })}
              >
                <option value="fullstack-dev">Full Stack Web Development with AI (9 Months)</option>
                <option value="backend-dev">Enterprise Backend Engineering (8 Months)</option>
                <option value="data-science-ai">NextGen Data Science & AI (7 Months)</option>
                <option value="qa-automation">QA Automation & SDET with AI (6 Months)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Current Experience Level</label>
              <select 
                className="select-custom"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              >
                <option value="working_pro">Working in IT / Software (1-4 yrs)</option>
                <option value="senior_pro">Senior Professional (4+ yrs)</option>
                <option value="student_cs">College Final Year / Student</option>
                <option value="non_tech">Non-IT Background / Switcher</option>
              </select>
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Coupon / Scholarship Code</label>
              <input 
                type="text" 
                className="input-custom" 
                placeholder="e.g. OPELS_EXP_25K"
                value={formData.couponCode}
                onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">1-on-1 Mentor Counseling Slot</label>
              <select 
                className="select-custom"
                value={formData.counselingSlot}
                onChange={(e) => setFormData({ ...formData, counselingSlot: e.target.value })}
              >
                <option value="Tomorrow, 6:00 PM">Tomorrow, 6:00 PM - 6:30 PM</option>
                <option value="Tomorrow, 8:00 PM">Tomorrow, 8:00 PM - 8:30 PM</option>
                <option value="This Saturday, 11:00 AM">This Saturday, 11:00 AM - 11:30 AM</option>
                <option value="This Sunday, 4:00 PM">This Sunday, 4:00 PM - 4:30 PM</option>
              </select>
            </div>
          </div>

          <div className="apply-trust-bullet">
            <ShieldCheck size={16} className="text-cyan" />
            <span>Zero obligation. 14-day no-questions-asked refund guarantee.</span>
          </div>

          <div className="apply-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <RefreshCw size={16} className="spin" />
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <span>Submit Application & Reserve Slot</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
