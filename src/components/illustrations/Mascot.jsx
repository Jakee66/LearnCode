export default function Mascot({ className = '' }) {
  return (
    <svg viewBox="0 0 260 210" className={className} role="img" aria-label="Codey, the LearnCode mascot, coding on a laptop">
      <defs>
        <radialGradient id="lc-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lc-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A5B4FC" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
      </defs>

      <circle cx="130" cy="104" r="92" fill="url(#lc-glow)" />

      {/* floating code chips */}
      <g className="lc-float">
        <rect x="8" y="40" width="50" height="32" rx="11" fill="#FFFFFF" stroke="#E0E7FF" strokeWidth="2" />
        <text x="33" y="61" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="13" fontWeight="700" fill="#4F46E5">
          {'</>'}
        </text>
      </g>
      <g className="lc-float" style={{ animationDelay: '1.4s' }}>
        <rect x="204" y="26" width="48" height="32" rx="11" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="2" />
        <text x="228" y="47" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="13" fontWeight="700" fill="#D97706">
          {'{}'}
        </text>
      </g>
      <circle cx="206" cy="98" r="5" fill="#FBBF24" opacity="0.85" />
      <circle cx="42" cy="112" r="4" fill="#38BDF8" opacity="0.8" />

      {/* character */}
      <g>
        <rect x="131" y="10" width="3.5" height="12" rx="1.75" fill="#4F46E5" />
        <circle cx="132.7" cy="8" r="5.5" fill="#FBBF24" />
        <rect x="103" y="20" width="60" height="50" rx="21" fill="#FFFFFF" stroke="#C7D2FE" strokeWidth="3" />
        <circle cx="122" cy="45" r="4.6" fill="#1B1440" />
        <circle cx="144" cy="45" r="4.6" fill="#1B1440" />
        <circle cx="123.6" cy="43.4" r="1.5" fill="#FFFFFF" />
        <circle cx="145.6" cy="43.4" r="1.5" fill="#FFFFFF" />
        <path d="M124 55 q9 7.5 18 0" fill="none" stroke="#1B1440" strokeWidth="2.6" strokeLinecap="round" />
        <ellipse cx="112" cy="53" rx="5" ry="3" fill="#FBBF24" opacity="0.5" />
        <ellipse cx="154" cy="53" rx="5" ry="3" fill="#FBBF24" opacity="0.5" />

        <rect x="101" y="68" width="64" height="46" rx="21" fill="url(#lc-body)" />
        <rect x="80" y="85" width="24" height="14" rx="7" fill="#6366F1" />
        <rect x="162" y="85" width="24" height="14" rx="7" fill="#6366F1" />

        {/* laptop */}
        <rect x="74" y="96" width="112" height="44" rx="9" fill="#141033" stroke="#4F46E5" strokeWidth="2" />
        <rect x="85" y="106" width="26" height="4" rx="2" fill="#FBBF24" />
        <rect x="85" y="115" width="44" height="4" rx="2" fill="#A5B4FC" />
        <rect x="85" y="124" width="32" height="4" rx="2" fill="#34D399" />
        <rect x="120" y="124" width="3.5" height="4" rx="1" fill="#FFFFFF" opacity="0.9" />
        <rect x="60" y="140" width="140" height="11" rx="5.5" fill="#312A70" />
        <rect x="112" y="142.5" width="36" height="3" rx="1.5" fill="#1B1440" opacity="0.6" />
        <ellipse cx="130" cy="164" rx="66" ry="7" fill="#4F46E5" opacity="0.12" />
      </g>
    </svg>
  );
}