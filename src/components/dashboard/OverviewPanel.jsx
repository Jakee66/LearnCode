import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import useAnimatedNumber from './useAnimatedNumber';
import StatCards from './StatCards';
import ActivityFeed from './ActivityFeed';
import { formatNumber } from '@/lib/gamify';
import { useLanguage } from '@/lib/LanguageContext';

const CIRC = 2 * Math.PI * 34;
/**
 * @param {{
 *   xp?: number,
 *   level?: number,
 *   streak?: number,
 *   bestStreak?: number,
 *   goalPct?: number,
 *   weekXp?: number[],
 *   streakDays?: unknown[],
 *   activity?: unknown[]
 * }} props
 */
export default function OverviewPanel({
  xp = 0,
  level = 1,
  streak = 0,
  bestStreak = 0,
  goalPct = 0,
  weekXp = [],
  streakDays = [],
  activity = [],
}) {
  const { t } = useLanguage();

  const ringPct = Math.min(100, Math.max(0, Math.round(goalPct)));
  const animatedPct = useAnimatedNumber(ringPct, 1400);
  const animatedXp = useAnimatedNumber(xp, 1400);

  return (
    <section className="lc-panel flex flex-col gap-3.5 p-3.5">
      <header className="flex items-center justify-between px-1.5 pt-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--lc-muted)]">Learning overview</span>
        <span className="rounded-full border border-[var(--lc-hair)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]">
          Lv {level}
        </span>
      </header>

      <div className="lc-glass flex items-center justify-between gap-4 rounded-[26px] px-4 py-4">
        <div className="min-w-0">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-[var(--lc-muted)]">Total XP</span>
          <div className="flex items-baseline gap-1.5 font-mono text-[38px] leading-none tracking-tight">
            {formatNumber(animatedXp)}
          </div>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10.5px] tracking-[0.04em]">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5">
              <Flame className="h-3 w-3" aria-hidden="true" />
              {streak} day streak
            </span>
            <span className="text-[var(--lc-muted)]">best {bestStreak}</span>
          </p>
        </div>

        <div className="relative aspect-square w-[62px] shrink-0" role="img" aria-label={`${ringPct} percent of today's goal`}>
          <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(238,235,251,0.16)" strokeWidth="6" />
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="var(--lc-ink)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC - (CIRC * animatedPct) / 100}
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center font-mono text-[11px]">{ringPct}%</span>
        </div>
      </div>

            <StatCards
        streak={streak}
        streakDays={streakDays}
        bestStreak={bestStreak}
        weekXp={weekXp}
      />

      <ActivityFeed items={activity} />
    </section>
  );
}