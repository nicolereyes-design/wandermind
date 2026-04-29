export function Logo() {
  return (
    <div className="flex items-center gap-3" style={{ lineHeight: 1 }}>
      {/* Compass reticle mark — thin stroke, navigation-inspired */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <circle cx="12" cy="12" r="10" stroke="#2d39f7" strokeWidth="1.25" />
        {/* N tick */}
        <line x1="12" y1="2" x2="12" y2="5.5" stroke="#2d39f7" strokeWidth="1.25" strokeLinecap="round" />
        {/* S tick */}
        <line x1="12" y1="18.5" x2="12" y2="22" stroke="#2d39f7" strokeWidth="1.25" strokeLinecap="round" />
        {/* W tick */}
        <line x1="2" y1="12" x2="5.5" y2="12" stroke="#2d39f7" strokeWidth="1.25" strokeLinecap="round" />
        {/* E tick */}
        <line x1="18.5" y1="12" x2="22" y2="12" stroke="#2d39f7" strokeWidth="1.25" strokeLinecap="round" />
        {/* Center dot */}
        <circle cx="12" cy="12" r="1.75" fill="#2d39f7" />
      </svg>

      {/* Wordmark */}
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
          fontSize: '14.5px',
          letterSpacing: '0.04em',
          color: 'var(--color-ink)',
        }}
      >
        Wander
        <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Mind</span>
      </span>
    </div>
  )
}
