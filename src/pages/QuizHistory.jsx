import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Sparkles } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { findCourse } from '@/data/curriculum';
import useLearner from '@/hooks/useLearner';

const FILTERS = ['All', 'Passed', 'Needs work'];

export default function QuizHistory() {
  const { attempts, loading } = useLearner();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = attempts.filter((attempt) => {
    const passed = Number(attempt.score) >= 70;
    const matchesFilter = filter === 'All' || (filter === 'Passed' ? passed : !passed);
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || (attempt.quiz_title || '').toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });

  return (
    <div>
      <PageHeader title="Quiz history" subtitle={`${attempts.length} attempts recorded`} to="/practice" />

      <div className="px-5 pt-4">
        <label className="flex items-center gap-2.5 rounded-[16px] border border-border/80 bg-card px-3.5 py-2.5 shadow-soft">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your attempts"
            aria-label="Search quiz attempts"
            className="w-full bg-transparent text-[12.5px] outline-none placeholder:text-muted-foreground/70"
          />
        </label>

        <div className="mt-3 flex gap-2">
          {FILTERS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={filter === option}
              className={`rounded-full px-3.5 py-1.5 text-[11.5px] font-bold transition-colors ${
                filter === option ? 'bg-foreground text-background' : 'border border-border/80 bg-card text-muted-foreground'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2.5 px-5">
        {loading && [0, 1, 2].map((i) => <div key={i} className="h-[76px] animate-pulse rounded-[20px] bg-muted" />)}

        {!loading && filtered.length === 0 && (
          <div className="rounded-[24px] border border-dashed border-border p-8 text-center">
            <Sparkles className="mx-auto h-6 w-6 text-primary" aria-hidden="true" />
            <p className="mt-2 text-[13px] font-bold">No attempts here yet</p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground">
              Finish a quiz and your score, XP and answers land here.
            </p>
            <Link
              to="/practice/quizzes"
              className="mt-4 inline-block rounded-[14px] bg-primary px-4 py-2.5 text-[12px] font-bold text-primary-foreground"
            >
              Browse quizzes
            </Link>
          </div>
        )}

        {filtered.map((attempt) => {
          const passed = Number(attempt.score) >= 70;
          const course = findCourse(attempt.course_slug);
          return (
            <Link
              key={attempt.id}
              to={`/practice/review/${attempt.id}`}
              className="flex items-center gap-3 rounded-[20px] border border-border/70 bg-card p-3.5 shadow-soft"
            >
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-[14px] font-mono text-[12px] font-bold ${
                  passed ? 'bg-success/15 text-success' : 'bg-destructive/10 text-destructive'
                }`}
              >
                {attempt.score}%
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-bold leading-tight">{attempt.quiz_title}</span>
                <span className="mt-0.5 block truncate text-[10.5px] text-muted-foreground">
                  {course ? course.title : 'Practice'} · {attempt.correct}/{attempt.total} correct · +{attempt.xp_earned} XP
                </span>
                <span className="mt-0.5 block text-[9.5px] uppercase tracking-[0.08em] text-muted-foreground/80">
                  {new Date(attempt.created_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60" aria-hidden="true" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}