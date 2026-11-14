import { Link } from 'react-router-dom';
import { ChevronRight, History, Sparkles, Terminal, Trophy } from 'lucide-react';
import QuizCard from '@/components/QuizCard';
import { quizzes } from '@/data/curriculum';
import useLearner from '@/hooks/useLearner';

export default function Practice() {
  const { attempts } = useLearner();
  const bestByQuiz = attempts.reduce((map, attempt) => {
    const previous = map[attempt.quiz_slug];
    map[attempt.quiz_slug] = previous == null ? attempt.score : Math.max(previous, attempt.score);
    return map;
  }, {});

  return (
    <div>
      <header className="px-5 pt-6">
        <h1 className="font-display text-[24px] font-extrabold tracking-tight">Practice</h1>
        <p className="mt-1 text-[12px] text-muted-foreground">Write code, then test what you know.</p>
      </header>

      <section className="px-5 pt-5">
        <Link
          to="/practice/playground"
          className="lc-panel block p-5 transition-transform active:scale-[0.99]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-[var(--lc-muted)]">Code playground</p>
              <h2 className="mt-2 font-display text-[19px] font-extrabold leading-tight">
                Write it yourself,
                <br /> run it instantly
              </h2>
              <p className="mt-2 max-w-[190px] text-[11.5px] leading-relaxed text-[var(--lc-muted)]">
                A real editor with output console. No setup, straight from your phone.
              </p>
            </div>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[16px] border border-[var(--lc-hair)] bg-white/10">
              <Terminal className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[var(--lc-ink)] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em]">
            Open playground <ChevronRight className="h-3 w-3" aria-hidden="true" />
          </span>
        </Link>
      </section>

      <section className="mt-6 px-5">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-display text-[17px] font-extrabold tracking-tight">Quizzes</h2>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            {attempts.length} taken
          </span>
        </div>
        <div className="flex flex-col gap-2.5">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.slug} quiz={quiz} best={bestByQuiz[quiz.slug]} />
          ))}
        </div>
      </section>

      <section className="mt-4 px-5">
        <Link
          to="/practice/history"
          className="flex items-center gap-3 rounded-[20px] border border-border/70 bg-card p-3.5 shadow-soft"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-secondary/10 text-secondary">
            <History className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] font-bold">Quiz history</span>
            <span className="text-[10.5px] text-muted-foreground">Every attempt, score and XP earned</span>
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground/60" aria-hidden="true" />
        </Link>
      </section>

      <section className="mt-3 grid grid-cols-2 gap-2.5 px-5">
        <div className="rounded-[20px] border border-border/70 bg-card p-3.5 shadow-soft">
          <span className="grid h-8 w-8 place-items-center rounded-[11px] bg-primary/10 text-primary">
            <Trophy className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="mt-2.5 text-[15px] font-extrabold leading-none">
            {attempts.length ? `${Math.max(...attempts.map((a) => a.score))}%` : '—'}
          </p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Best score</p>
        </div>
        <div className="rounded-[20px] border border-border/70 bg-card p-3.5 shadow-soft">
          <span className="grid h-8 w-8 place-items-center rounded-[11px] bg-accent/20 text-[#8A5F00]">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="mt-2.5 text-[15px] font-extrabold leading-none">
            {attempts.reduce((n, a) => n + (a.xp_earned || 0), 0)}
          </p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">XP from quizzes</p>
        </div>
      </section>
    </div>
  );
}