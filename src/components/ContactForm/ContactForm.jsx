import React, { useState } from 'react';
import companyConfig from '../../config/company';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Button from '../Button/Button';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Building Construction',
    message: '',
    _gotcha: '' // Honeypot field for spam prevention
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Client-side Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        text: 'Please fill in all required fields (Name, Email, Phone, and Project Scope).'
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', text: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({
          type: 'success',
          text: result.message || 'Message sent successfully. Our engineering desk will review and contact you shortly.'
        });
        // Clear inputs on success
        setFormData({
          name: '',
          phone: '',
          email: '',
          projectType: 'Building Construction',
          message: '',
          _gotcha: ''
        });
      } else {
        setStatus({
          type: 'error',
          text: result.error || "Sorry, we couldn't send your message right now. Please call us directly at " + companyConfig.phone
        });
      }
    } catch (err) {
      // Graceful fallback to mailto if network error occurs
      console.warn('Submission network notice:', err);
      const subject = encodeURIComponent(`Project Inquiry: ${formData.projectType} - ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Phone: ${formData.phone}\n` +
        `Email: ${formData.email}\n` +
        `Project Type: ${formData.projectType}\n\n` +
        `Details:\n${formData.message}`
      );
      window.location.href = `mailto:${companyConfig.email}?subject=${subject}&body=${body}`;
      setStatus({
        type: 'info',
        text: 'Redirecting to your mail client to send directly to ' + companyConfig.email
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate>
      {/* Honeypot field (hidden from real users, catches bots) */}
      <input
        type="text"
        name="_gotcha"
        value={formData._gotcha}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="form-input"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 7006080901"
            className="form-input"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className="form-input"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="projectType" className="form-label">Project Type</label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="form-input form-select"
            disabled={isSubmitting}
          >
            <option value="Building Construction">Building Construction</option>
            <option value="Private & Institutional Building">Private / Institutional Building</option>
            <option value="General Civil & Foundations">General Civil &amp; Foundations</option>
            <option value="Water Supply & PHE Schemes">Water Supply &amp; PHE Schemes</option>
            <option value="Electrical & Power Distribution">Electrical &amp; Power Distribution</option>
            <option value="2D/3D Drafting Support">2D / 3D Drafting Support</option>
            <option value="Other Project">Other Infrastructure Work</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">Project Details *</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Briefly describe your project scope, location, and requirements..."
          className="form-input form-textarea"
          disabled={isSubmitting}
        />
      </div>

      {status.text && (
        <div className={`form-notice notice-${status.type}`}>
          {status.type === 'success' && <CheckCircle2 size={18} className="notice-icon" />}
          {status.type === 'error' && <AlertCircle size={18} className="notice-icon" />}
          <span>{status.text}</span>
        </div>
      )}

      <div className="form-actions">
        <Button
          type="submit"
          variant="primary"
          size="large"
          icon={isSubmitting ? Loader2 : Send}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Enquiry'}
        </Button>
      </div>

      <style>{`
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 640px) {
          .form-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text);
        }

        .form-input {
          width: 100%;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          background-color: var(--surface-secondary);
          color: var(--text);
          font-family: var(--font-body);
          font-size: 0.92rem;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(197, 155, 39, 0.2);
        }

        .form-input:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .form-select {
          cursor: pointer;
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-notice {
          padding: 12px 14px;
          border-radius: var(--radius-sm);
          font-size: 0.88rem;
          display: flex;
          align-items: center;
          gap: 10px;
          line-height: 1.4;
        }

        .notice-icon {
          flex-shrink: 0;
        }

        .notice-info {
          background-color: var(--surface-secondary);
          border: 1px solid var(--border);
          color: var(--text);
        }

        .notice-error {
          background-color: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.35);
          color: #ef4444;
        }

        .notice-success {
          background-color: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.35);
          color: #22c55e;
        }

        .form-actions {
          margin-top: 6px;
        }
      `}</style>
    </form>
  );
}

export default ContactForm;
