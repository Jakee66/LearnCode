import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Clock, Lightbulb, Terminal } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import ProgressBar from '@/components/ProgressBar';
import { findLesson } from '@/data/curriculum';
import useLearner from '@/hooks/useLearner';

export default function Lesson() {
  const { courseSlug, lessonSlug } = useParams();
  const found = findLesson(courseSlug, lessonSlug);
  const { progress, completeLesson } = useLearner();
  const [saving, setSaving] = useState(false);
  const [justDone, setJustDone] = useState(false);

  if (!found) return <p className="px-5 pt-20 text-center text-[13px]">That lesson could not be found.</p>;

  const { course, lesson, index } = found;
  const key = `${course.slug}/${lesson.slug}`;
  const done = justDone || progress.some((p) => p.lesson_key === key);
  const prev = course.lessons[index - 1];
  const next = course.lessons[index + 1];

  const handleComplete = async () => {
    setSaving(true);
    try {
      await completeLesson(course, lesson);
      setJustDone(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <header className="px-5 pt-6">
        <div className="flex items-center gap-3">
          <Link
            to={`/course/${course.slug}`}
            aria-label="Back to course"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border/80 bg-card shadow-soft"
          >
            <ArrowLeft className="h-[18px] w-[18px]" aria-hidden="true" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {course.title}
            </p>
            <p className="font-mono text-[10.5px] text-muted-foreground">
              Lesson {index + 1} of {course.lessons.length}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-muted px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
            <Clock className="h-3 w-3" aria-hidden="true" /> {lesson.minutes}m
          </span>
        </div>
        <ProgressBar
          value={((index + 1) / course.lessons.length) * 100}
          height="h-1.5"
          className="mt-4"
          label="Lesson position"
        />
      </header>

      <article className="px-5 pt-6">
        <h1 className="font-display text-[24px] font-extrabold leading-[1.2] tracking-tight">{lesson.title}</h1>

        <div className="mt-4 flex flex-col gap-3.5">
          {lesson.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-[13.5px] leading-[1.75] text-foreground/85">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-5">
          <p className="mb-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">Example</p>
          <CodeBlock code={lesson.code} lang={lesson.lang} />
        </div>

        <div className="mt-4 flex gap-2.5 rounded-[18px] border border-accent/40 bg-accent/10 p-3.5">
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
            <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <p className="text-[12px] leading-relaxed text-foreground/85">
            <span className="font-bold">Note · </span>
            {lesson.note}
          </p>
        </div>
      </article>

      <div className="mt-6 flex gap-2.5 px-5">
        {prev ? (
          <Link
            to={`/lesson/${course.slug}/${prev.slug}`}
            className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-[16px] border border-border/80 bg-card text-[12.5px] font-bold text-foreground shadow-soft"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Previous
          </Link>
        ) : (
          <span className="flex h-12 flex-1 items-center justify-center rounded-[16px] border border-dashed border-border text-[12.5px] font-bold text-muted-foreground/60">
            First lesson
          </span>
        )}
        {next ? (
          <Link
            to={`/lesson/${course.slug}/${next.slug}`}
            className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-[16px] border border-border/80 bg-card text-[12.5px] font-bold text-foreground shadow-soft"
          >
            Next <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        ) : (
          <Link
            to={`/course/${course.slug}`}
            className="flex h-12 flex-1 items-center justify-center rounded-[16px] border border-border/80 bg-card text-[12.5px] font-bold shadow-soft"
          >
            Course overview
          </Link>
        )}
      </div>

      <div className="mt-3 px-5">
        <Link
          to="/practice/playground"
          className="flex h-12 items-center justify-center gap-2 rounded-[16px] border border-primary/30 bg-primary/5 text-[12.5px] font-bold text-primary"
        >
          <Terminal className="h-4 w-4" aria-hidden="true" /> Try it in the playground
        </Link>
      </div>

      {done ? (
        <div className="mt-3 px-5">
          <div className="rounded-[20px] border border-success/40 bg-success/10 p-4 text-center">
            <p className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-success">
              <Check className="h-4 w-4" aria-hidden="true" /> Lesson complete · +25 XP
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {next ? 'Keep the streak going with the next lesson.' : 'That is the last lesson in this course.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-3 px-5">
          <button
            type="button"
            onClick={handleComplete}
            disabled={saving}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-[20px] bg-primary text-[14px] font-bold text-primary-foreground shadow-lift transition-transform active:scale-[0.98] disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Complete lesson · +25 XP'}
          </button>
        </div>
      )}
    </div>
  );
}