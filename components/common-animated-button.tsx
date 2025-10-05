/* new reusable animated button matching purple palette and loading/disabled states */
"use client"

type CommonAnimatedButtonProps = {
  text: string
  onClick?: () => void
  loading?: boolean
  disabled?: boolean
  className?: string
  type?: "button" | "submit" | "reset"
}

export function CommonAnimatedButton({
  text,
  onClick,
  loading = false,
  disabled = false,
  className = "",
  type = "button",
}: CommonAnimatedButtonProps) {
  return (
    <button
      type={type}
      onClick={!loading && !disabled ? onClick : undefined}
      aria-busy={loading}
      aria-live="polite"
      aria-label={text}
      disabled={loading || disabled}
      className={`animated-button ${className}`}
    >
      {/* Left arrow (slides in on hover) */}
      <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
      </svg>

      <span className="text">{loading ? "Loading…" : text}</span>
      <span className="circle" />

      {/* Right arrow (slides out on hover) */}
      <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
      </svg>

      <style jsx>{`
        /* component-scoped palette variables */
        :global(:root) {
          --btn-bg: #5D2F77;
          --btn-fg: #ffffff;
          --btn-accent: #E45A92;
          --btn-accent-soft: #FFACAC;
          --btn-arrow: #FFACAC;
          --btn-focus: #3E1E68;
        }

        .animated-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 14px 28px;
          border: 4px solid transparent;
          border-radius: 100px;
          font-size: 16px;
          font-weight: 600;
          color: var(--btn-fg);
          background-color: var(--btn-bg);
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0);
          cursor: pointer;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          outline: none;
        }

        .animated-button:focus-visible {
          box-shadow: 0 0 0 4px var(--btn-focus);
        }

        .animated-button[disabled] {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .animated-button svg {
          position: absolute;
          width: 24px;
          fill: var(--btn-arrow);
          z-index: 9;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button .arr-1 {
          right: 16px;
        }
        .animated-button .arr-2 {
          left: -25%;
        }

        .animated-button .circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background-color: var(--btn-accent);
          border-radius: 50%;
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
          filter: drop-shadow(0 0 12px var(--btn-accent-soft));
        }

        .animated-button .text {
          position: relative;
          z-index: 1;
          transform: translateX(-12px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
          letter-spacing: 0.01em;
        }

        .animated-button:hover {
          box-shadow: 0 0 0 12px transparent;
          border-radius: 14px;
          transform: translateY(-1px);
        }

        .animated-button:hover .arr-1 {
          right: -25%;
        }
        .animated-button:hover .arr-2 {
          left: 16px;
        }
        .animated-button:hover .text {
          transform: translateX(12px);
        }
        .animated-button:hover svg {
          fill: var(--btn-arrow);
        }
        .animated-button:active {
          transform: translateY(0);
          box-shadow: 0 0 0 4px var(--btn-accent);
        }
        .animated-button:hover .circle {
          width: 220px;
          height: 220px;
          opacity: 0.22;
        }
      `}</style>
    </button>
  )
}
