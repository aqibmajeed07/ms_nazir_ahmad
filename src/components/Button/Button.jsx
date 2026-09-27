import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'default',
  href,
  onClick,
  className = '',
  type = 'button',
  icon: Icon,
  disabled = false,
  ...props
}) {
  const Component = href ? 'a' : 'button';

  return (
    <Component
      {...(href ? { href } : { type, onClick, disabled })}
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon size={16} className="btn-icon" />}
      <style>{`
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-weight: 700;
          letter-spacing: 0.3px;
          border-radius: var(--radius-sm);
          text-decoration: none;
          cursor: pointer;
          transition: all var(--transition-fast);
          border: 1px solid transparent;
          white-space: nowrap;
        }
        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Sizes */
        .btn-small {
          padding: 6px 14px;
          font-size: 0.8rem;
        }
        .btn-default {
          padding: 10px 22px;
          font-size: 0.92rem;
        }
        .btn-large {
          padding: 14px 28px;
          font-size: 1.02rem;
        }

        /* Variants */
        .btn-primary {
          background-color: var(--accent);
          color: #0F2537;
          border-color: var(--accent);
          box-shadow: var(--shadow-sm);
        }
        .btn-primary:hover:not(:disabled) {
          background-color: var(--accent-hover);
          border-color: var(--accent-hover);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        .btn-secondary {
          background-color: var(--surface);
          color: var(--text);
          border-color: var(--border);
        }
        .btn-secondary:hover:not(:disabled) {
          background-color: var(--surface-secondary);
          border-color: var(--text-muted);
          transform: translateY(-1px);
        }

        .btn-outline {
          background-color: transparent;
          color: var(--text);
          border-color: var(--border);
        }
        .btn-outline:hover:not(:disabled) {
          background-color: var(--accent-light);
          border-color: var(--accent);
          color: var(--accent);
        }

        .btn-outline-white {
          background-color: transparent;
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.4);
        }
        .btn-outline-white:hover:not(:disabled) {
          background-color: rgba(255, 255, 255, 0.15);
          border-color: #FFFFFF;
        }

        .btn-icon {
          transition: transform var(--transition-fast);
        }
        .btn:hover .btn-icon {
          transform: translateX(2px);
        }
      `}</style>
    </Component>
  );
}

export default Button;
