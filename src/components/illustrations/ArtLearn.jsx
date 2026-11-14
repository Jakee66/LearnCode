export default function ArtLearn({ className = '' }) {
  return (
    <svg viewBox="0 0 300 230" className={className} role="img" aria-label="A learner studying with a laptop">
      <defs>
        <linearGradient id="al-shirt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
      </defs>
      <ellipse cx="150" cy="208" rx="112" ry="14" fill="#4F46E5" opacity="0.1" />
      <circle cx="150" cy="104" r="92" fill="#EEF2FF" />
      <circle cx="150" cy="104" r="68" fill="#E0E7FF" opacity="0.7" />

      <g className="lc-float">
        <rect x="10" y="44" width="62" height="36" rx="12" fill="#FFFFFF" stroke="#E0E7FF" strokeWidth="2" />
        <text x="41" y="67" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="12" fontWeight="700" fill="#4F46E5">
          fn()
        </text>
      </g>
      <g className="lc-float" style={{ animationDelay: '1.2s' }}>
        <rect x="228" y="56" width="62" height="34" rx="11" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="2" />
        <text x="259" y="78" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="12" fontWeight="700" fill="#D97706">
          {'</>'}
        </text>
      </g>
      <circle cx="236" cy="122" r="5" fill="#38BDF8" />
      <circle cx="66" cy="132" r="4" fill="#FBBF24" />

      {/* head */}
      <circle cx="150" cy="80" r="27" fill="#FBD9B8" />
      <path d="M123 76a27 27 0 0 1 54 0c0-16-11-24-27-24s-27 8-27 24z" fill="#1B1440" />
      <circle cx="141" cy="82" r="2.8" fill="#1B1440" />
      <circle cx="159" cy="82" r="2.8" fill="#1B1440" />
      <path d="M144 91q6 5 12 0" stroke="#1B1440" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* body */}
      <rect x="118" y="108" width="64" height="58" rx="22" fill="url(#al-shirt)" />
      <rect x="100" y="128" width="24" height="16" rx="8" fill="#6366F1" />
      <rect x="176" y="128" width="24" height="16" rx="8" fill="#6366F1" />
      {/* laptop */}
      <rect x="90" y="132" width="120" height="46" rx="9" fill="#141033" stroke="#4F46E5" strokeWidth="2" />
      <rect x="101" y="142" width="30" height="4" rx="2" fill="#FBBF24" />
      <rect x="101" y="151" width="52" height="4" rx="2" fill="#A5B4FC" />
      <rect x="101" y="160" width="38" height="4" rx="2" fill="#34D399" />
      <rect x="76" y="178" width="148" height="12" rx="6" fill="#312A70" />
      <rect x="126" y="181" width="48" height="3.5" rx="1.75" fill="#1B1440" opacity="0.55" />
    </svg>
  );
}