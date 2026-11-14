import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
/**
 * @param {number[]} values
 */
function chartPath(values = []) {
  const pts = values.length ? values : [0];
  const max = Math.max(...pts);
  const min = Math.min(...pts);
  const span = max - min || 1;
  const flat = max === min;
  return pts
    .map((v, i) => {
      const x = 8 + (i * 184) / Math.max(pts.length - 1, 1);
      const y = flat ? 52 : 74 - ((v - min) / span) * 52;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

/**
 * @param {{
 *   values: number[],
 *   index: number,
 *   r?: number
 * }} props
 */
function Dot({ values, index, r = 2.8 }) {
  const pts = values.length ? values : [0];
  const max = Math.max(...pts);
  const min = Math.min(...pts);
  const span = max - min || 1;
  const x = 8 + (index * 184) / Math.max(pts.length - 1, 1);
  const y = max === min ? 52 : 74 - ((pts[index] - min) / span) * 52;
  return <circle cx={x.toFixed(1)} cy={y.toFixed(1)} r={r} fill="#1B1440" stroke="#EEF0FF" strokeWidth="2.5" />;
}

/**
 * @param {{
 *   streak?: number,
 *   streakDays?: number[],
 *   bestStreak?: number,
 *   weekXp?: number[]
 * }} props
 */
export default function StatCards({ streak = 0, streakDays = [], bestStreak = 0, weekXp = [] }) {
  const { t } = useLanguage();
  const days = streakDays.slice(-14);
  const max = Math.max(...days, 1);
  const week = weekXp.slice(-7);
  const startXp = week[0] || 0;
  const nowXp = week[week.length - 1] || 0;
  const change = startXp ? Math.round(((nowXp - startXp) / startXp) * 100) : 0;

  return (
    <div className="grid gap-3.5">
      <article className="lc-glass rounded-[26px] p-4">
        <div className="flex items-baseline justify-between">
          <h3 className="font-mono text-[12px] tracking-[0.14em]">STREAK</h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--lc-muted)]">Last 14 days</span>
        </div>
        <svg viewBox="0 0 150 64" preserveAspectRatio="none" className="mt-3 h-[52px] w-full" aria-hidden="true">
          {days.map((d, i) => {
            const h = d ? Math.max(8, (d / max) * 64) : 6;
            return (
              <rect
                key={i}
                className="lc-bar"
                x={i * 11}
                y={64 - h}
                width="6"
                height={h}
                rx="1"
                fill={d ? '#EEF0FF' : 'rgba(238,235,251,0.28)'}
                style={{ animationDelay: `${i * 35}ms` }}
              />
            );
          })}
        </svg>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--lc-muted)]">Current</span>
            <span className="block font-mono text-[20px] leading-tight">{streak}d</span>
          </div>
          <div>
            <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--lc-muted)]">Today</span>
            <span className="block font-mono text-[20px] leading-tight">{days[days.length - 1] ? 'Done' : 'Open'}</span>
          </div>
          <div className="text-right">
            <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--lc-muted)]">Best</span>
            <span className="block font-mono text-[20px] leading-tight">{bestStreak}d</span>
          </div>
        </div>
      </article>

      <article className="lc-glass rounded-[26px] p-4">
        <div className="flex items-baseline justify-between">
          <h3 className="font-mono text-[12px] tracking-[0.14em]">XP THIS WEEK</h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--lc-muted)]">Last 7 days</span>
        </div>
        <svg viewBox="0 0 200 96" className="mt-3 w-full overflow-visible" aria-hidden="true">
          {[14, 44, 74].map((y) => (
            <line key={y} x1="4" y1={y} x2="196" y2={y} stroke="var(--lc-hair)" strokeWidth="1" />
          ))}
          <motion.path
            d={chartPath(week)}
            fill="none"
            stroke="#EEF0FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          <Dot values={week} index={0} />
          <Dot values={week} index={Math.max(week.length - 1, 0)} r={3.4} />
          <text x="6" y="92" fontSize="9" fill="var(--lc-muted)" fontFamily="inherit" letterSpacing="0.04em">MON</text>
          <text x="176" y="92" fontSize="9" fill="var(--lc-muted)" fontFamily="inherit" letterSpacing="0.04em">SUN</text>
        </svg>
        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--lc-muted)]">Now</span>
            <span className="block font-mono text-[20px] leading-tight">{nowXp}</span>
          </div>
          <div>
            <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--lc-muted)]">Start</span>
            <span className="block font-mono text-[20px] leading-tight">{startXp}</span>
          </div>
          <div className="text-right">
            <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--lc-muted)]">Change</span>
            <span className="block font-mono text-[20px] leading-tight">{change >= 0 ? '+' : ''}{change}%</span>
          </div>
        </div>
      </article>
    </div>
  );
}