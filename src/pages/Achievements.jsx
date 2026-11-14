import AchievementBadge from '@/components/AchievementBadge';
import AchievementSummary from '@/components/AchievementSummary';
import ProgressBar from '@/components/ProgressBar';
import PageHeader from '@/components/PageHeader';
import { achievementsWithState } from '@/lib/learner';
import useLearner from '@/hooks/useLearner';

export default function Achievements() {
  const { loading, profile, stats } = useLearner();

  if (loading || !profile || !stats) {
    return <div className="px-5 pt-8"><div className="h-40 animate-pulse rounded-[24px] bg-muted" /></div>;
  }

  const badges = achievementsWithState(stats, profile.unlocked || []);
  const earned = badges.filter((b) => b.unlocked);
  const locked = badges.filter((b) => !b.unlocked);
  const totalXp = earned.reduce((n, b) => n + b.xp, 0);

  return (
    <div>
      <PageHeader title="Achievements" subtitle={`${earned.length} of ${badges.length} unlocked`} to="/profile" />

      <section className="mx-5 mt-5">
        <h2 className="mb-2.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">Progress dashboard</h2>
        <AchievementSummary stats={stats} profile={profile} />
      </section>

      <section className="mx-5 mt-5 overflow-hidden rounded-[26px] bg-gradient-to-br from-primary to-secondary p-4 text-primary-foreground shadow-lift">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] opacity-80">Badge XP earned</p>
            <p className="mt-1.5 font-display text-[26px] font-extrabold leading-none">{totalXp.toLocaleString('en-US')}</p>
            <p className="mt-1 text-[11px] opacity-80">{earned.length} badges collected so far</p>
          </div>
          <div className="flex -space-x-2">
            {earned.slice(0, 3).map((badge) => (
              <span
                key={badge.slug}
                className="grid h-11 w-11 place-items-center rounded-full border-2 border-white/40 bg-white/15 font-mono text-[10px] font-bold"
              >
                {badge.title.slice(0, 2).toUpperCase()}
              </span>
            ))}
          </div>
        </div>
        <ProgressBar value={(earned.length / badges.length) * 100} height="h-1.5" className="mt-4 bg-white/25" tone="accent" label="Badges unlocked" />
      </section>

      <section className="mt-6 px-5">
        <h2 className="mb-3 font-display text-[16px] font-extrabold tracking-tight">Earned</h2>
        {earned.length === 0 ? (
          <div className="rounded-[20px] border border-dashed border-border p-6 text-center">
            <p className="text-[12.5px] font-bold">Your first badge is one lesson away</p>
            <p className="mt-1 text-[11px] text-muted-foreground">Complete any lesson to unlock First Step.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {earned.map((badge) => (
              <article key={badge.slug} className="rounded-[20px] border border-border/70 bg-card p-3.5 shadow-soft">
                <AchievementBadge achievement={badge} unlocked />
                <p className="mt-2.5 text-[12.5px] font-extrabold leading-tight">{badge.title}</p>
                <p className="mt-1 text-[10.5px] leading-snug text-muted-foreground">{badge.desc}</p>
                <p className="mt-1.5 font-mono text-[10px] font-bold text-[#C28700]">+{badge.xp} XP</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mt-6 px-5">
        <h2 className="mb-3 font-display text-[16px] font-extrabold tracking-tight">Still locked</h2>
        <div className="flex flex-col gap-2.5">
          {locked.map((badge) => (
            <article key={badge.slug} className="flex items-center gap-3 rounded-[20px] border border-border/70 bg-card p-3.5 shadow-soft">
              <AchievementBadge achievement={badge} unlocked={false} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] font-bold leading-tight">{badge.title}</p>
                <p className="mt-0.5 text-[10.5px] text-muted-foreground">{badge.requirement}</p>
                <ProgressBar value={badge.percent} height="h-1" className="mt-1.5" label={`${badge.title} progress`} />
              </div>
              <span className="shrink-0 font-mono text-[10px] font-bold text-muted-foreground">+{badge.xp}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}