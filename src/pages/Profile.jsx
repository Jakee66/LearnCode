import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Flame, Pencil, Settings as SettingsIcon, Trophy, Zap } from 'lucide-react';
import AchievementBadge from '@/components/AchievementBadge';
import AchievementSummary from '@/components/AchievementSummary';
import ProgressBar from '@/components/ProgressBar';
import { api } from '@/api/client';
import { courses } from '@/data/curriculum';
import { achievementsWithState, courseStats } from '@/lib/learner';
import { initialsOf, levelFromXp, levelTitle } from '@/lib/gamify';
import useLearner from '@/hooks/useLearner';

export default function Profile() {
  const { loading, profile, stats, progress } = useLearner();
  const [rank, setRank] = useState(null);

  useEffect(() => {
    if (!profile) return;
    api.entities.LearnerProfile.list('-xp', 100)
      .then((list) => {
        const sorted = [...list].sort((a, b) => (b.xp || 0) - (a.xp || 0));
        const position = sorted.findIndex((p) => p.user_id === profile.user_id);
        setRank(position >= 0 ? position + 1 : null);
      })
      .catch(() => setRank(null));
  }, [profile]);

  if (loading || !profile || !stats) {
    return (
      <div className="px-5 pt-8">
        <div className="h-24 animate-pulse rounded-[24px] bg-muted" />
        <div className="mt-3 h-28 animate-pulse rounded-[24px] bg-muted" />
      </div>
    );
  }

  const level = levelFromXp(stats.xp);
  const badges = achievementsWithState(stats, profile.unlocked || []);
  const earned = badges.filter((b) => b.unlocked);

  return (
    <div>
      <header className="flex items-start justify-between gap-3 px-5 pt-6">
        <div className="flex items-center gap-3.5">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-[19px] font-extrabold text-primary-foreground shadow-lift">
            {initialsOf(profile.display_name)}
          </span>
          <div className="min-w-0">
            <h1 className="truncate font-display text-[19px] font-extrabold leading-tight">{profile.display_name}</h1>
            <p className="truncate text-[11.5px] text-muted-foreground">@{profile.username}</p>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.08em] text-primary">
              Level {level} · {levelTitle(level)}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link
            to="/profile/edit"
            aria-label="Edit profile"
            className="grid h-9 w-9 place-items-center rounded-full border border-border/80 bg-card shadow-soft"
          >
            <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            to="/settings"
            aria-label="Settings"
            className="grid h-9 w-9 place-items-center rounded-full border border-border/80 bg-card shadow-soft"
          >
            <SettingsIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </header>

      {profile.bio ? <p className="mt-3 px-5 text-[12px] leading-relaxed text-muted-foreground">{profile.bio}</p> : null}

      <section className="mt-5 grid grid-cols-2 gap-2.5 px-5">
        {[
          { Icon: Zap, label: 'Total XP', value: stats.xp.toLocaleString('en-US'), tone: 'text-primary', soft: 'bg-primary/10' },
          { Icon: Flame, label: 'Day streak', value: `${stats.streak}d`, tone: 'text-[#C28700]', soft: 'bg-accent/25' },
          { Icon: BookOpen, label: 'Lessons done', value: stats.lessons, tone: 'text-secondary', soft: 'bg-secondary/10' },
          { Icon: Trophy, label: 'Quizzes done', value: stats.quizzes, tone: 'text-success', soft: 'bg-success/10' },
        ].map(({ Icon, label, value, tone, soft }) => (
          <div key={label} className="rounded-[20px] border border-border/70 bg-card p-3.5 shadow-soft">
            <span className={`grid h-8 w-8 place-items-center rounded-[11px] ${soft} ${tone}`}>
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <p className="mt-2.5 text-[17px] font-extrabold leading-none">{value}</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{label}</p>
          </div>
        ))}
      </section>

      <section className="mx-5 mt-2.5">
        <h2 className="mb-2.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">Achievement summary</h2>
        <AchievementSummary stats={stats} profile={profile} compact linkTo="/achievements" />
      </section>

      <section className="mx-5 mt-2.5 flex items-center gap-3 rounded-[20px] border border-border/70 bg-card p-3.5 shadow-soft">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-accent/25 text-[#8A5F00]">
          <Trophy className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[12.5px] font-bold">{rank ? `Ranked #${rank} this season` : 'Unranked so far'}</p>
          <p className="text-[10.5px] text-muted-foreground">Keep earning XP to climb the board</p>
        </div>
        <Link to="/leaderboard" className="shrink-0 text-[11px] font-bold text-primary">
          View
        </Link>
      </section>

      <section className="mt-6 px-5">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-display text-[16px] font-extrabold tracking-tight">Achievements</h2>
          <Link to="/achievements" className="text-[11.5px] font-bold text-primary">
            {earned.length} of {badges.length}
          </Link>
        </div>
        {earned.length === 0 ? (
          <div className="rounded-[20px] border border-dashed border-border p-5 text-center">
            <p className="text-[12.5px] font-bold">No badges yet</p>
            <p className="mt-1 text-[11px] text-muted-foreground">Finish a lesson to unlock your first one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2.5">
            {badges.slice(0, 4).map((badge) => (
              <div key={badge.slug} className="flex flex-col items-center">
                <AchievementBadge achievement={badge} unlocked={badge.unlocked} size="sm" />
                <p className="mt-1.5 line-clamp-2 text-center text-[9.5px] font-bold leading-tight">{badge.title}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-6 px-5">
        <h2 className="mb-3 font-display text-[16px] font-extrabold tracking-tight">Language progress</h2>
        <div className="flex flex-col gap-2">
          {courses.map((course) => {
            const cs = courseStats(progress, course);
            return (
              <Link
                key={course.slug}
                to={`/course/${course.slug}`}
                className="flex items-center gap-3 rounded-[16px] border border-border/70 bg-card px-3 py-2.5 shadow-soft"
              >
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] font-mono text-[10px] font-bold"
                  style={{ background: course.soft, color: course.color }}
                  aria-hidden="true"
                >
                  {course.glyph}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-[12px] font-bold">{course.title}</span>
                    <span className="shrink-0 font-mono text-[10px] text-muted-foreground">{cs.percent}%</span>
                  </span>
                  <ProgressBar value={cs.percent} height="h-1" className="mt-1.5" label={`${course.title} progress`} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}