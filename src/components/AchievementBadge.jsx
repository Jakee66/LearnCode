import { Compass, Flame, Star, Target, Trophy, Zap, Sparkles } from 'lucide-react';

const ICONS = {
  lessons: Sparkles,
  streak: Flame,
  xp: Zap,
  quizzes: Target,
  perfect: Star,
  courses: Trophy,
  languages: Compass,
};

const SIZES = {
  sm: 'h-12 w-12 rounded-[16px]',
  md: 'h-16 w-16 rounded-[20px]',
  lg: 'h-20 w-20 rounded-[24px]',
};

const ICON_SIZES = { sm: 'h-5 w-5', md: 'h-7 w-7', lg: 'h-8 w-8' };

export default function AchievementBadge({ achievement, unlocked = false, size = 'md' }) {
  const Icon = ICONS[achievement.metric] || Trophy;

  return (
    <div
      className={`relative grid shrink-0 place-items-center overflow-hidden ${SIZES[size]}`}
      style={
        unlocked
          ? { background: `linear-gradient(145deg, ${achievement.tone} 0%, ${achievement.tone}CC 100%)`, boxShadow: `0 12px 24px -14px ${achievement.tone}` }
          : { background: 'hsl(var(--muted))' }
      }
    >
      <span className="pointer-events-none absolute inset-[3px] rounded-[inherit] border border-white/25" />
      <Icon className={`${ICON_SIZES[size]} ${unlocked ? 'text-white' : 'text-muted-foreground/50'}`} aria-hidden="true" />
      {!unlocked && (
        <span className="absolute inset-0 grid place-items-center bg-white/45">
          <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Locked</span>
        </span>
      )}
    </div>
  );
}