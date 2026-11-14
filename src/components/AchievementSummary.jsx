import { Link } from 'react-router-dom';
import { Flame, TrendingUp, Trophy, Zap } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';
import { levelFromXp, levelProgress, levelTitle, xpToNextLevel } from '@/lib/gamify';

function LevelRing({ level, percent, size = 92, stroke = 9 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, percent)) / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1)' }}
      />
      <text x="50%" y="46%" textAnchor="middle" className="fill-current font-mono text-[20px] font-bold">
        {level}
      </text>
      <text x="50%" y="62%" textAnchor="middle" className="fill-current font-mono text-[8px] uppercase tracking-[0.16em]" opacity="0.7">
        Level
      </text>
    </svg>
  );
}

function MiniBars({ week = [] }) {
  const max = Math.max(...week, 1);
  return (
    <div className="flex items-end gap-1.5" aria-label="XP earned in the last 7 days">
      {week.map((v, i) => (
        <span
          key={i}
          className="w-full rounded-t-[3px] bg-primary/80"
          style={{ height: `${Math.max(10, (v / max) * 100)}%`, opacity: v ? 1 : 0.25 }}
        />
      ))}
    </div>
  );
}

function Tile({ Icon, label, value, tone, soft }) {
  return (
    <div className="rounded-[16px] border border-border/70 bg-card p-3 shadow-soft">
      <span className={`grid h-7 w-7 place-items-center rounded-[10px] ${soft} ${tone}`}>
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
      <p className="mt-2 text-[16px] font-extrabold leading-none">{value}</p>
      <p className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{label}</p>
    </div>
  );
}

export default function AchievementSummary({ stats, profile, compact = false, linkTo }) {
  if (!stats) return null;

  const level = levelFromXp(stats.xp);
  const pct = levelProgress(stats.xp);
  const toNext = xpToNextLevel(stats.xp);
  const week = stats.weekXp || [];
  const weekTotal = week.reduce((n, d) => n + d, 0);

  const inner = (
    <div className="overflow-hidden rounded-[26px] border border-border/70 bg-card p-5 shadow-soft">
      <div className="flex items-center gap-4">
        <span className="text-primary">
          <LevelRing level={level} percent={pct} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">Level {level} · {levelTitle(level)}</p>
          <p className="mt-1 font-display text-[24px] font-extrabold leading-none">{stats.xp.toLocaleString('en-US')}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">total XP · {toNext} XP to level {level + 1}</p>
          <ProgressBar value={pct} height="h-1.5" className="mt-2.5" label={`Progress to level ${level + 1}`} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        <Tile Icon={Flame} label="Current streak" value={`${stats.streak}d`} tone="text-[#8A5F00]" soft="bg-accent/25" />
        <Tile Icon={Trophy} label="Best streak" value={`${Number(profile?.best_streak) || 0}d`} tone="text-primary" soft="bg-primary/10" />
        <Tile Icon={Zap} label="XP this week" value={weekTotal.toLocaleString('en-US')} tone="text-secondary" soft="bg-secondary/10" />
      </div>

      {!compact && (
        <div className="mt-4 rounded-[18px] border border-border/70 bg-muted/50 p-3.5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" /> Last 7 days
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">{weekTotal} XP</span>
          </div>
          <div className="mt-3 h-14">
            <MiniBars week={week} />
          </div>
        </div>
      )}
    </div>
  );

  if (compact && linkTo) {
    return (
      <Link to={linkTo} className="block" aria-label="Open achievement dashboard">
        {inner}
      </Link>
    );
  }

  return inner;
}