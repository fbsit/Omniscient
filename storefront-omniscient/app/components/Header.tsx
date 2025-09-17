"use client";
export default function Header() {
  return (
    <header className="header">
      <div className="brand">
        <span aria-label="Omniscient logo" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <svg width="28" height="28" viewBox="0 0 48 48" role="img">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00C6FF" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="18" fill="none" stroke="url(#logoGradient)" strokeWidth="8" strokeLinecap="round" />
            <circle cx="24" cy="24" r="10" fill="#ffffff" />
          </svg>
        </span>
        <span className="brand-title">Omniscient</span>
      </div>
    </header>
  );
}


