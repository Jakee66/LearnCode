import { Link } from 'react-router-dom';
import { Bell, Play } from 'lucide-react';
import OverviewPanel from '@/components/dashboard/OverviewPanel';
import CourseCard from '@/components/CourseCard';
import AchievementBadge from '@/components/AchievementBadge';
import ProgressBar from '@/components/ProgressBar';
import SectionHeader from '@/components/SectionHeader';
import { courses, findCourse, languages } from '@/data/curriculum';
import { achievementsWithState, courseStats } from '@/lib/learner';
import { levelFromXp, relativeTime } from '@/lib/gamify';
import useLearner from '@/hooks/useLearner';
import { useLanguage } from '@/lib/LanguageContext';

export default function Home() {
  const { loading, profile, stats, progress, attempts } = useLearner();
  const { t, language } = useLanguage();

const todayLabel = new Date()
  .toLocaleDateString(language === 'id' ? 'id-ID' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  })
  .toUpperCase();

  if (loading || !profile || !stats) {
    return (
      <div className="px-4 pt-6">
        <div className="flex items-center gap-3 px-1">
          <div className="h-11 w-11 animate-pulse rounded-full bg-muted" />
          <div className="h-8 w-28 animate-pulse rounded-full bg-muted" />
        </div>
        <div className="mt-5 h-[340px] animate-pulse rounded-[34px] bg-muted" />
        <div className="mt-4 h-24 animate-pulse rounded-[24px] bg-muted" />
      </div>
    );
  }

  const level = levelFromXp(stats.xp);

  const activeCourse =
    courses.find((c) => {
      const s = courseStats(progress, c);
      return s.completed > 0 && s.completed < s.total;
    }) ||
    courses.find((c) => courseStats(progress, c).completed === 0) ||
    courses[0];
  const activeStats = courseStats(progress, activeCourse);

  const feed = [
    ...progress.map((p) => ({
      date: p.created_date,
      item: {
        label: 'LESSON DONE',
        detail: `${findCourse(p.course_slug)?.title || 'Lesson'} · ${p.lesson_slug.replace(/-/g, ' ')}`,
        time: relativeTime(p.created_date),
      },
    })),
    ...attempts.map((a) => ({
      date: a.created_date,
      item: {
        label: Number(a.score) >= 70 ? 'QUIZ PASSED' : 'QUIZ TRIED',
        detail: `${a.quiz_title} · ${a.correct} of ${a.total}`,
        time: relativeTime(a.created_date),
      },
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4)
    .map((entry) => entry.item);

  const activity = feed.length
    ? feed
    : [{ label: 'WELCOME', detail: 'Complete your first lesson to start a streak', time: 'NOW' }];

  const badges = achievementsWithState(stats, profile.unlocked || []);
  const showcase = [...badges].sort((a, b) => Number(b.unlocked) - Number(a.unlocked)).slice(0, 4);
  const recommended = courses.filter((c) => c.slug !== activeCourse.slug).slice(0, 2);

  return (
    <div>
      <header className="flex items-center justify-between gap-3 px-5 pt-6">
        <div className="flex items-center gap-3">
          <Link
            to="/profile"
            aria-label="Open your profile"
            className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-[13px] font-extrabold text-primary-foreground shadow-soft"
          >
            {(profile.display_name || 'LC').slice(0, 1).toUpperCase()}
          </Link>
          <div className="min-w-0">
            <p className="text-[9.5px] font-bold uppercase tracking-[0.15em] text-muted-foreground">{todayLabel}</p>
            <h1 className="truncate font-display text-[20px] font-extrabold leading-tight">
              Hey, {profile.display_name.split(' ')[0]}
            </h1>
          </div>
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border/80 bg-card shadow-soft"
        >
          <Bell className="h-[18px] w-[18px]" aria-hidden="true" />
          <span className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-destructive ring-2 ring-card" />
        </button>
      </header>

      <div className="mt-5 px-4">
        <OverviewPanel
          xp={stats.xp}
          level={level}
          streak={stats.streak}
          bestStreak={Number(profile.best_streak) || 0}
          goalPct={stats.goalPct}
          weekXp={stats.weekXp}
          streakDays={stats.streakDays}
          activity={activity}
        />
        <p className="mt-2 px-2 text-center font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted-foreground">
          Daily goal · {stats.minutesToday} of {stats.goalMinutes} min learned today
        </p>
      </div>

      <section className="mt-4 px-5">
        <Link
          to={`/lesson/${activeCourse.slug}/${activeStats.nextLesson.slug}`}
          className="block rounded-[24px] border border-border/70 bg-card p-4 shadow-soft"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-primary">
                {activeStats.completed > 0 ? 'Continue learning' : 'Start learning'}
              </p>
              <h2 className="mt-1.5 truncate text-[16px] font-extrabold leading-snug">{activeStats.nextLesson.title}</h2>
              <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                {activeCourse.title} · Lesson {activeCourse.lessons.indexOf(activeStats.nextLesson) + 1} of{' '}
                {activeCourse.lessons.length}
              </p>
            </div>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft">
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-3.5 flex items-center gap-2.5">
            <ProgressBar value={activeStats.percent} height="h-1.5" className="flex-1" label="Current course progress" />
            <span className="font-mono text-[10px] font-medium text-muted-foreground">{activeStats.percent}%</span>
          </div>
        </Link>
      </section>

      <section className="mt-7">
        <div className="px-5">
          <SectionHeader title="Popular languages" action="See all" to="/learn" />
        </div>
        <div className="lc-scroll-x flex gap-2.5 overflow-x-auto px-5 pb-1">
          {languages.map((lang) => (
            <Link
              key={lang.slug}
              to={`/course/${lang.slug}`}
              className="w-[80px] shrink-0 rounded-[20px] border border-border/70 bg-card px-2 py-3 text-center shadow-soft"
            >
              <span
                className="mx-auto grid h-9 w-9 place-items-center rounded-[12px] font-mono text-[11px] font-bold"
                style={{ background: lang.soft, color: lang.color }}
                aria-hidden="true"
              >
                {lang.glyph}
              </span>
              <span className="mt-2 block text-[9.5px] font-bold leading-tight text-foreground/80">
                {lang.title.split(' ')[0]}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-7 px-5">
        <SectionHeader title="Recommended for you" action="Browse" to="/learn" />
        <div className="flex flex-col gap-2.5">
          {recommended.map((course) => (
            <CourseCard key={course.slug} course={course} progress={courseStats(progress, course).percent} />
          ))}
        </div>
      </section>

      <section className="mt-7">
        <div className="px-5">
          <SectionHeader title="Recent achievements" action="All badges" to="/achievements" />
        </div>
        <div className="lc-scroll-x flex gap-2.5 overflow-x-auto px-5 pb-2">
          {showcase.map((achievement) => (
            <div
              key={achievement.slug}
              className="w-[112px] shrink-0 rounded-[20px] border border-border/70 bg-card p-3 shadow-soft"
            >
              <AchievementBadge achievement={achievement} unlocked={achievement.unlocked} />
              <p className="mt-2 line-clamp-2 text-[11.5px] font-bold leading-tight">{achievement.title}</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">+{achievement.xp} XP</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}