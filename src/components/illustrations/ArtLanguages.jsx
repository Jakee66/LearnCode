const TILES = [
  { x: 22, y: 40, label: 'py', color: '#3B82F6', soft: '#EAF2FF', delay: '0s' },
  { x: 214, y: 32, label: 'js', color: '#D97706', soft: '#FEF7E3', delay: '0.8s' },
  { x: 8, y: 132, label: 'go', color: '#0891B2', soft: '#E4FAFE', delay: '1.6s' },
  { x: 226, y: 140, label: 'php', color: '#7C3AED', soft: '#F4EEFF', delay: '2.2s' },
];

export default function ArtLanguages({ className = '' }) {
  return (
    <svg viewBox="0 0 300 230" className={className} role="img" aria-label="Programming language tiles around a phone">
      <ellipse cx="150" cy="210" rx="104" ry="13" fill="#4F46E5" opacity="0.1" />
      <circle cx="150" cy="106" r="94" fill="#EEF2FF" />

      {TILES.map((t) => (
        <g key={t.label} className="lc-float" style={{ animationDelay: t.delay }}>
          <rect x={t.x} y={t.y} width="62" height="46" rx="15" fill={t.soft} stroke={t.color} strokeOpacity="0.25" strokeWidth="2" />
          <text x={t.x + 31} y={t.y + 29} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="14" fontWeight="700" fill={t.color}>
            {t.label}
          </text>
        </g>
      ))}

      <rect x="110" y="34" width="80" height="156" rx="22" fill="#1B1440" />
      <rect x="115" y="39" width="70" height="146" rx="18" fill="#FFFFFF" />
      <rect x="138" y="44" width="24" height="5" rx="2.5" fill="#E0E7FF" />
      <rect x="123" y="58" width="54" height="30" rx="9" fill="#EEF2FF" />
      <rect x="129" y="66" width="24" height="4" rx="2" fill="#4F46E5" />
      <rect x="129" y="75" width="36" height="4" rx="2" fill="#A5B4FC" />
      {[96, 116, 136, 156].map((y, i) => (
        <g key={y}>
          <rect x="123" y={y} width="54" height="4" rx="2" fill="#E9E7FB" />
          <rect x="123" y={y + 9} width={i % 2 === 0 ? 34 : 44} height="4" rx="2" fill="#F1EFFC" />
        </g>
      ))}
      <rect x="132" y="172" width="36" height="6" rx="3" fill="#4F46E5" opacity="0.25" />
      <circle cx="150" cy="150" r="12" fill="#FBBF24" opacity="0.9" />
      <path d="M146 150l3 3 6-7" stroke="#1B1440" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}