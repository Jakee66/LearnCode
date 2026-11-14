export default function ArtLogin({ className = '' }) {
  return (
    <svg viewBox="0 0 300 230" className={className} role="img" aria-label="A friendly character peeking over a code window">
      <defs>
        <linearGradient id="lg-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A5B4FC" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
      </defs>
      <ellipse cx="150" cy="212" rx="104" ry="13" fill="#4F46E5" opacity="0.1" />
      <circle cx="150" cy="112" r="94" fill="#EEF2FF" />

      <g className="lc-float">
        <rect x="18" y="38" width="58" height="34" rx="11" fill="#FFFFFF" stroke="#E0E7FF" strokeWidth="2" />
        <text x="47" y="60" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="12" fontWeight="700" fill="#4F46E5">
          {'{}'}
        </text>
      </g>
      <g className="lc-float" style={{ animationDelay: '1.5s' }}>
        <rect x="226" y="48" width="58" height="34" rx="11" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="2" />
        <text x="255" y="70" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="12" fontWeight="700" fill="#D97706">
          {'</>'}
        </text>
      </g>

      {/* character */}
      <rect x="128" y="20" width="3.5" height="12" rx="1.75" fill="#4F46E5" />
      <circle cx="129.7" cy="18" r="5.5" fill="#FBBF24" />
      <rect x="104" y="30" width="56" height="46" rx="19" fill="#FFFFFF" stroke="#C7D2FE" strokeWidth="3" />
      <circle cx="122" cy="52" r="4.2" fill="#1B1440" />
      <circle cx="142" cy="52" r="4.2" fill="#1B1440" />
      <circle cx="123.4" cy="50.6" r="1.3" fill="#FFFFFF" />
      <circle cx="143.4" cy="50.6" r="1.3" fill="#FFFFFF" />
      <path d="M124 62q9 6.5 18 0" stroke="#1B1440" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <ellipse cx="112" cy="60" rx="4.5" ry="2.6" fill="#FBBF24" opacity="0.55" />
      <ellipse cx="152" cy="60" rx="4.5" ry="2.6" fill="#FBBF24" opacity="0.55" />
      <rect x="102" y="76" width="60" height="30" rx="15" fill="url(#lg-body)" />

      {/* code window */}
      <rect x="52" y="100" width="196" height="96" rx="18" fill="#141033" stroke="#312A70" strokeWidth="3" />
      <circle cx="70" cy="116" r="4" fill="#F87171" />
      <circle cx="84" cy="116" r="4" fill="#FBBF24" />
      <circle cx="98" cy="116" r="4" fill="#34D399" />
      <rect x="70" y="132" width="46" height="6" rx="3" fill="#FBBF24" />
      <rect x="70" y="147" width="96" height="6" rx="3" fill="#A5B4FC" />
      <rect x="70" y="162" width="70" height="6" rx="3" fill="#34D399" />
      <rect x="152" y="162" width="34" height="6" rx="3" fill="#A5B4FC" opacity="0.6" />
      <rect x="70" y="177" width="52" height="6" rx="3" fill="#A5B4FC" opacity="0.45" />
      <circle cx="214" cy="160" r="18" fill="#FFFBEB" stroke="#FBBF24" strokeWidth="3" />
      <rect x="209" y="157" width="10" height="9" rx="2.5" fill="#F59E0B" />
      <path d="M211 157v-3a3 3 0 0 1 6 0v3" stroke="#F59E0B" strokeWidth="2.2" fill="none" />
    </svg>
  );
}