import { useState } from 'react';
import { Search, Flame } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import { courses } from '@/data/curriculum';
import { courseStats } from '@/lib/learner';
import useLearner from '@/hooks/useLearner';

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function Learn() {
  const { loading, progress, profile } = useLearner();
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('All');

  const filtered = courses.filter((course) => {
    const matchesLevel = level === 'All' || course.level === level;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      course.title.toLowerCase().includes(q) ||
      course.tagline.toLowerCase().includes(q) ||
      course.lessons.some(
        (lesson) =>
          lesson.title.toLowerCase().includes(q) ||
          (lesson.lang || '').toLowerCase().includes(q)
      );
    return matchesLevel && matchesQuery;
  });

  return (
    <div>
      <header className="flex items-start justify-between gap-3 px-5 pt-6">
        <div>
          <h1 className="font-display text-[24px] font-extrabold tracking-tight">Learn</h1>
          <p className="mt-1 text-[12px] text-muted-foreground">
            {courses.length} languages · {courses.reduce((n, c) => n + c.lessons.length, 0)} lessons
          </p>
        </div>
        {profile && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1.5 font-mono text-[11px] font-bold text-[#8A5F00]">
            <Flame className="h-3.5 w-3.5" aria-hidden="true" /> {profile.streak || 0}
          </span>
        )}
      </header>

      <div className="mt-5 px-5">
        <label className="flex items-center gap-2.5 rounded-[18px] border border-border/80 bg-card px-3.5 py-3 shadow-soft">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a language or topic"
            aria-label="Search courses"
            className="w-full bg-transparent text-[13px] outline-none placeholder:text-muted-foreground/70"
          />
        </label>

        <div className="lc-scroll-x mt-3 flex gap-2 overflow-x-auto pb-1">
          {LEVELS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setLevel(option)}
              aria-pressed={level === option}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11.5px] font-bold transition-colors ${
                level === option ? 'bg-foreground text-background' : 'border border-border/80 bg-card text-muted-foreground'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2.5 px-5">
        {loading
          ? [0, 1, 2, 3].map((i) => <div key={i} className="h-[86px] animate-pulse rounded-[22px] bg-muted" />)
          : filtered.map((course) => (
              <CourseCard key={course.slug} course={course} progress={courseStats(progress, course).percent} />
            ))}

        {!loading && filtered.length === 0 && (
          <div className="rounded-[22px] border border-dashed border-border p-8 text-center">
            <p className="text-[13px] font-bold">No course matches “{query}”</p>
            <p className="mt-1 text-[11.5px] text-muted-foreground">Try another language or clear the filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}