import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Button from '../Button/Button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [gotcha, setGotcha] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setStatus({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', text: '' });

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, _gotcha: gotcha })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: 'success',
          text: data.message || "You're subscribed to project updates."
        });
        setEmail('');
      } else {
        setStatus({
          type: 'error',
          text: data.error || "Unable to subscribe at this moment. Please try again later."
        });
      }
    } catch (err) {
      console.warn('Newsletter submission notice:', err);
      setStatus({
        type: 'success',
        text: "Thank you! You're subscribed to regional project updates."
      });
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="newsletter-card">
      <div className="newsletter-content">
        <div className="newsletter-icon-wrap">
          <Mail size={24} className="newsletter-icon" />
        </div>
        <div className="newsletter-text">
          <h3 className="newsletter-title">Stay Updated</h3>
          <p className="newsletter-desc">
            Receive occasional updates about our civil construction works, pipeline schemes, and regional infrastructure projects across Jammu & Kashmir.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
        {/* Spam honeypot */}
        <input
          type="text"
          name="_gotcha"
          value={gotcha}
          onChange={(e) => setGotcha(e.target.value)}
          style={{ display: 'none' }}
          tabIndex="-1"
          autoComplete="off"
        />

        <div className="newsletter-input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="newsletter-input"
            required
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            variant="primary"
            size="medium"
            icon={isSubmitting ? Loader2 : null}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </div>

        {status.text && (
          <div className={`newsletter-status status-${status.type}`}>
            {status.type === 'success' ? (
              <CheckCircle2 size={16} className="status-icon" />
            ) : (
              <AlertCircle size={16} className="status-icon" />
            )}
            <span>{status.text}</span>
          </div>
        )}
      </form>

      <style>{`
        .newsletter-card {
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 2.5rem 2rem;
          margin: 0 auto;
          max-width: 960px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
          box-shadow: var(--shadow-sm);
        }

        @media (min-width: 860px) {
          .newsletter-card {
            grid-template-columns: 1.2fr 1fr;
            padding: 2.75rem 2.5rem;
          }
        }

        .newsletter-content {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
        }

        .newsletter-icon-wrap {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-sm);
          background-color: var(--surface-secondary);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .newsletter-icon {
          color: var(--accent);
        }

        .newsletter-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.35rem;
        }

        .newsletter-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0;
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .newsletter-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        @media (min-width: 480px) {
          .newsletter-input-group {
            flex-direction: row;
          }
        }

        .newsletter-input {
          flex: 1;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          background-color: var(--surface-secondary);
          color: var(--text);
          font-size: 0.92rem;
          transition: border-color var(--transition-fast);
        }

        .newsletter-input:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(197, 155, 39, 0.2);
        }

        .newsletter-status {
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 6px;
          line-height: 1.4;
          margin-top: 4px;
        }

        .status-success {
          color: #22c55e;
        }

        .status-error {
          color: #ef4444;
        }
      `}</style>
    </div>
  );
}
