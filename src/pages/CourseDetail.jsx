import { Link, useParams } from 'react-router-dom';
import { Check, ChevronRight, Clock, Layers, Play, Target } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ProgressBar from '@/components/ProgressBar';
import { findCourse } from '@/data/curriculum';
import { courseStats } from '@/lib/learner';
import useLearner from '@/hooks/useLearner';

export default function CourseDetail() {
  const { slug } = useParams();
  const course = findCourse(slug);
  const { loading, progress } = useLearner();

  if (!course) return <p className="px-5 pt-20 text-center text-[13px]">That course could not be found.</p>;

  const stats = courseStats(progress, course);
  const next = stats.nextLesson || course.lessons[0];

  return (
    <div>
      <PageHeader title={course.title} subtitle={course.tagline} to="/learn" />

      <section className="mx-5 mt-5 overflow-hidden rounded-[28px] border border-border/70 bg-card p-5 shadow-soft">
        <div className="flex items-center gap-4">
          <span
            className="grid h-16 w-16 shrink-0 place-items-center rounded-[22px] font-mono text-[17px] font-bold"
            style={{ background: course.soft, color: course.color }}
            aria-hidden="true"
          >
            {course.glyph}
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-muted px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                {course.level}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">{course.hours}h total</span>
            </div>
            <h1 className="mt-1.5 font-display text-[20px] font-extrabold leading-tight">{course.title}</h1>
          </div>
        </div>

        <p className="mt-4 text-[12.5px] leading-relaxed text-muted-foreground">{course.description}</p>

        <div className="mt-4 flex items-center gap-2.5">
          <ProgressBar value={stats.percent} height="h-2" label={`${course.title} progress`} />
          <span className="font-mono text-[10.5px] font-medium text-muted-foreground">{stats.percent}%</span>
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          {stats.completed} of {stats.total} lessons complete
        </p>
      </section>

      <section className="mx-5 mt-4 grid grid-cols-3 gap-2.5">
        {[
          { Icon: Layers, label: 'Modules', value: course.lessons.length },
          { Icon: Clock, label: 'Minutes', value: course.lessons.reduce((n, l) => n + l.minutes, 0) },
          { Icon: Target, label: 'Level', value: course.level },
        ].map(({ Icon, label, value }) => (
          <div key={label} className="rounded-[18px] border border-border/70 bg-card p-3 text-center shadow-soft">
            <Icon className="mx-auto h-4 w-4 text-primary" aria-hidden="true" />
            <p
              className={`mt-1.5 font-extrabold leading-none ${
                String(value).length > 4 ? 'text-[11px]' : 'text-[14px]'
              }`}
            >
              {value}
            </p>
            <p className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">{label}</p>
          </div>
        ))}
      </section>

      <section className="mx-5 mt-6">
        <h2 className="font-display text-[16px] font-extrabold tracking-tight">What you will learn</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {course.objectives.map((objective) => (
            <li key={objective} className="flex items-start gap-2.5 text-[12.5px] leading-snug">
              <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-success/15 text-success">
                <Check className="h-3 w-3" aria-hidden="true" />
              </span>
              {objective}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-5 mt-6">
        <h2 className="font-display text-[16px] font-extrabold tracking-tight">Lessons</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {course.lessons.map((lesson, i) => {
            const done = stats.isDone(lesson.slug);
            return (
              <li key={lesson.slug}>
                <Link
                  to={`/lesson/${course.slug}/${lesson.slug}`}
                  className="flex items-center gap-3 rounded-[18px] border border-border/70 bg-card p-3 shadow-soft"
                >
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-[11px] font-mono text-[11px] font-bold ${
                      done ? 'bg-success/15 text-success' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-bold leading-tight">{lesson.title}</span>
                    <span className="text-[10.5px] text-muted-foreground">{lesson.minutes} min read</span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60" aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="px-5 pt-6">
        {loading ? (
          <div className="h-14 animate-pulse rounded-[20px] bg-muted" />
        ) : (
          <Link
            to={`/lesson/${course.slug}/${next.slug}`}
            className="flex h-14 items-center justify-center gap-2 rounded-[20px] bg-primary text-[14px] font-bold text-primary-foreground shadow-lift transition-transform active:scale-[0.98]"
          >
            <Play className="h-4 w-4 fill-current" aria-hidden="true" />
            {stats.completed === 0 ? 'Start learning' : stats.completed >= stats.total ? 'Review lessons' : 'Continue learning'}
          </Link>
        )}
      </div>
    </div>
  );
}