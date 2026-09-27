import React, { useState } from 'react';
import companyConfig from '../../config/company.js';
import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  const cleanNumber = (companyConfig.whatsapp || "917006080901").replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(
    companyConfig.whatsappMessage || "Hello, I would like to enquire about a construction project."
  );
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
  const telUrl = `tel:${companyConfig.phone || "+917006080901"}`;

  return (
    <div className="floating-contact-container">
      {/* Mobile-only Quick Call Button */}
      <a
        href={telUrl}
        className="floating-btn floating-call-btn"
        aria-label={`Call ${companyConfig.companyName} at ${companyConfig.phone}`}
      >
        <Phone size={20} />
      </a>

      {/* Floating WhatsApp Action */}
      <div
        className="floating-wa-wrap"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {showTooltip && (
          <div className="wa-tooltip" role="tooltip">
            Chat with us on WhatsApp
          </div>
        )}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn floating-wa-btn"
          aria-label="Chat with our engineering team on WhatsApp"
        >
          {/* Official WhatsApp SVG Icon */}
          <svg
            className="wa-icon"
            viewBox="0 0 24 24"
            width="26"
            height="26"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.36 7.34 9.09 7.41 8.86 7.66C8.63 7.91 7.98 8.52 7.98 9.77C7.98 11.02 8.89 12.22 9.02 12.39C9.14 12.56 10.8 15.12 13.34 16.22C13.95 16.48 14.42 16.64 14.79 16.76C15.4 16.95 15.96 16.92 16.4 16.86C16.89 16.79 17.9 16.25 18.11 15.66C18.32 15.07 18.32 14.56 18.26 14.46C18.2 14.36 18.04 14.3 17.79 14.18C17.54 14.05 16.31 13.44 16.08 13.36C15.85 13.28 15.69 13.24 15.52 13.49C15.35 13.74 14.88 14.3 14.73 14.46C14.59 14.63 14.44 14.65 14.19 14.53C13.94 14.4 12.9 14.06 11.66 12.96C10.7 12.11 10.06 11.06 9.93 10.81C9.81 10.56 9.92 10.43 10.04 10.31C10.16 10.19 10.3 10.01 10.43 9.86C10.56 9.71 10.6 9.61 10.68 9.44C10.76 9.27 10.72 9.13 10.66 9.01C10.6 8.89 10.1 7.66 9.89 7.15C9.69 6.66 9.48 6.72 9.33 6.72L8.85 6.71L9.53 7.34Z" />
          </svg>
        </a>
      </div>

      <style>{`
        .floating-contact-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          z-index: 990;
        }

        .floating-btn {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.28);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
          text-decoration: none;
        }

        .floating-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.38);
        }

        .floating-wa-btn {
          background-color: #25d366;
          color: #ffffff;
        }

        .floating-call-btn {
          background-color: var(--accent);
          color: #0f2537;
          display: none;
        }

        .floating-wa-wrap {
          position: relative;
        }

        .wa-tooltip {
          position: absolute;
          right: 64px;
          top: 50%;
          transform: translateY(-50%);
          background-color: #0f2537;
          color: #ffffff;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          white-space: nowrap;
          box-shadow: var(--shadow-md);
          border: 1px solid rgba(255, 255, 255, 0.15);
          pointer-events: none;
          animation: tooltipFadeIn 0.2s ease-out;
        }

        @keyframes tooltipFadeIn {
          from { opacity: 0; transform: translateY(-50%) translateX(6px); }
          to { opacity: 1; transform: translateY(-50%) translateX(0); }
        }

        @media (max-width: 640px) {
          .floating-contact-container {
            bottom: 20px;
            right: 18px;
            gap: 10px;
          }
          .floating-btn {
            width: 48px;
            height: 48px;
          }
          .floating-call-btn {
            display: flex;
          }
          .wa-tooltip {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
