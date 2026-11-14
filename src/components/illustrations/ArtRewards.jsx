export default function ArtRewards({ className = '' }) {
  return (
    <svg viewBox="0 0 300 230" className={className} role="img" aria-label="A trophy surrounded by achievement badges">
      <ellipse cx="150" cy="212" rx="98" ry="13" fill="#4F46E5" opacity="0.1" />
      <circle cx="150" cy="110" r="96" fill="#FFFBEB" />
      <circle cx="150" cy="110" r="72" fill="#FEF3C7" opacity="0.7" />

      {[
        [46, 52, '#4F46E5'],
        [238, 62, '#F97316'],
        [34, 148, '#14B8A6'],
        [246, 152, '#8B5CF6'],
      ].map(([cx, cy, color], i) => (
        <g key={`${cx}-${cy}`} className="lc-float" style={{ animationDelay: `${i * 0.7}s` }}>
          <circle cx={cx} cy={cy} r="17" fill="#FFFFFF" stroke={color} strokeWidth="2.5" />
          <circle cx={cx} cy={cy} r="8" fill={color} opacity="0.85" />
        </g>
      ))}

      <g className="lc-pop">
        <path d="M118 56h64v28a32 32 0 0 1-64 0z" fill="#FBBF24" />
        <path d="M118 60h-10a14 14 0 0 0 14 22" fill="none" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
        <path d="M182 60h10a14 14 0 0 1-14 22" fill="none" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
        <rect x="144" y="112" width="12" height="26" rx="4" fill="#F59E0B" />
        <rect x="124" y="138" width="52" height="14" rx="6" fill="#4F46E5" />
        <rect x="136" y="92" width="28" height="10" rx="4" fill="#FEF3C7" opacity="0.85" />
        <path d="M150 66l4.6 9.6 10.4 1.5-7.6 7.3 1.9 10.3-9.3-5-9.3 5 1.9-10.3-7.6-7.3 10.4-1.5z" fill="#FFFFFF" opacity="0.92" />
      </g>

      <path d="M84 44l4 8 9 1-6.5 6.4 1.6 9-8-4.4-8 4.4 1.6-9L71 53l9-1z" fill="#FBBF24" opacity="0.8" />
      <path d="M222 106l3.4 6.8 7.6.9-5.5 5.4 1.4 7.6-6.9-3.7-6.9 3.7 1.4-7.6-5.5-5.4 7.6-.9z" fill="#6366F1" opacity="0.7" />
      <circle cx="74" cy="104" r="4" fill="#F472B6" />
      <circle cx="214" cy="40" r="4.5" fill="#38BDF8" />
    </svg>
  );
}