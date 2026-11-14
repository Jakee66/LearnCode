import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Check, RotateCcw, Sparkles, X } from 'lucide-react';
import { api } from '@/api/client';
import ArtRewards from '@/components/illustrations/ArtRewards';
import { achievements, findQuiz } from '@/data/curriculum';

const CIRC = 2 * Math.PI * 40;

export default function QuizResult() {
  const { attemptId } = useParams();
  const location = useLocation();
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.entities.QuizAttempt.get(attemptId)
      .then((record) => setAttempt(record))
      .catch(() => setAttempt(null))
      .finally(() => setLoading(false));
  }, [attemptId]);

  if (loading) {
    return <div className="px-5 pt-24 text-center text-[12px] text-muted-foreground">Loading your result…</div>;
  }

  if (!attempt) {
    return (
      <div className="px-5 pt-24 text-center">
        <p className="text-[13px] font-bold">That result is no longer available.</p>
        <Link to="/practice/quizzes" className="mt-3 inline-block text-[12px] font-bold text-primary">
          Back to quizzes
        </Link>
      </div>
    );
  }

  const score = Number(attempt.score) || 0;
  const passed = score >= 70;
  const gained = (location.state?.gained || []).map((slug) => achievements.find((a) => a.slug === slug)).filter(Boolean);
  const quiz = findQuiz(attempt.quiz_slug);

  return (
    <div className="px-5 pb-4 pt-6">
      <div className="overflow-hidden rounded-[30px] bg-gradient-to-b from-muted/70 to-card">
        <ArtRewards className="h-[190px] w-full" />
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div className="relative h-[92px] w-[92px] shrink-0" role="img" aria-label={`Score ${score} percent`}>
          <svg viewBox="0 0 92 92" className="h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="46" cy="46" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="7" />
            <circle
              cx="46"
              cy="46"
              r="40"
              fill="none"
              stroke={passed ? 'hsl(var(--success))' : 'hsl(var(--primary))'}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC - (CIRC * score) / 100}
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center font-display text-[20px] font-extrabold">{score}%</span>
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">
            {passed ? 'Quiz passed' : 'Nearly there'}
          </p>
          <h1 className="mt-1 font-display text-[21px] font-extrabold leading-tight">
            {passed ? 'Nice work!' : 'Keep practising'}
          </h1>
          <p className="mt-1 text-[11.5px] leading-snug text-muted-foreground">{attempt.quiz_title}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2.5">
        <div className="rounded-[18px] border border-border/70 bg-card p-3 text-center shadow-soft">
          <Check className="mx-auto h-4 w-4 text-success" aria-hidden="true" />
          <p className="mt-1.5 text-[16px] font-extrabold leading-none">{attempt.correct}</p>
          <p className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">Correct</p>
        </div>
        <div className="rounded-[18px] border border-border/70 bg-card p-3 text-center shadow-soft">
          <X className="mx-auto h-4 w-4 text-destructive" aria-hidden="true" />
          <p className="mt-1.5 text-[16px] font-extrabold leading-none">{attempt.incorrect}</p>
          <p className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">Incorrect</p>
        </div>
        <div className="rounded-[18px] border border-border/70 bg-card p-3 text-center shadow-soft">
          <Sparkles className="mx-auto h-4 w-4 text-[#C28700]" aria-hidden="true" />
          <p className="mt-1.5 text-[16px] font-extrabold leading-none">+{attempt.xp_earned}</p>
          <p className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">XP earned</p>
        </div>
      </div>

      {gained.length > 0 && (
        <div className="mt-3 rounded-[18px] border border-accent/50 bg-accent/10 p-3.5">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#8A5F00]">Achievement unlocked</p>
          <ul className="mt-1.5 flex flex-col gap-1">
            {gained.map((badge) => (
              <li key={badge.slug} className="text-[12.5px] font-bold">
                {badge.title} · +{badge.xp} XP
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-2.5">
        <Link
          to={`/practice/review/${attempt.id}`}
          className="flex h-14 items-center justify-center rounded-[18px] bg-primary px-4 text-[13.5px] font-bold text-primary-foreground shadow-lift"
        >
          Review answers
        </Link>
        <Link
          to={`/practice/quiz/${attempt.quiz_slug}`}
          className="flex items-center justify-center gap-2 rounded-[18px] border border-border/80 bg-card py-3.5 text-[13px] font-bold shadow-soft"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Retry quiz
        </Link>
        <Link to={quiz ? `/course/${quiz.courseSlug}` : '/learn'} className="py-1 text-center text-[12px] font-bold text-muted-foreground">
          Back to learning
        </Link>
      </div>
    </div>
  );
}