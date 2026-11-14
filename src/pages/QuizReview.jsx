import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { api } from '@/api/client';
import PageHeader from '@/components/PageHeader';
import CodeBlock from '@/components/CodeBlock';
import { findQuiz } from '@/data/curriculum';

export default function QuizReview() {
  const { attemptId } = useParams();
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    api.entities.QuizAttempt.get(attemptId)
      .then(setAttempt)
      .catch(() => setAttempt(null))
      .finally(() => setLoading(false));
  }, [attemptId]);

  if (loading) return <div className="px-5 pt-24 text-center text-[12px] text-muted-foreground">Loading review…</div>;
  if (!attempt) return <div className="px-5 pt-24 text-center text-[13px] font-bold">That attempt could not be found.</div>;

  const quiz = findQuiz(attempt.quiz_slug);
  if (!quiz) return <div className="px-5 pt-24 text-center text-[13px] font-bold">This quiz is no longer available.</div>;

  const question = quiz.questions[index];
  const selected = attempt.answers?.[index];
  const isCorrect = selected === question.answer;
  const total = quiz.questions.length;

  return (
    <div>
      <PageHeader
        title="Review answers"
        subtitle={`${quiz.title} · ${attempt.correct} of ${attempt.total} correct`}
        to={`/practice/result/${attempt.id}`}
      />

      <div className="lc-scroll-x mt-4 flex gap-1.5 overflow-x-auto px-5 pb-1">
        {quiz.questions.map((q, i) => {
          const right = attempt.answers?.[i] === q.answer;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Question ${i + 1}`}
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-[10px] font-mono text-[11px] font-bold ${
                i === index
                  ? 'bg-foreground text-background'
                  : right
                    ? 'bg-success/15 text-success'
                    : 'bg-destructive/15 text-destructive'
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="mx-5 mt-4 rounded-[22px] border border-border/70 bg-card p-4 shadow-soft">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground">
            Question {index + 1} of {total}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.08em] ${
              isCorrect ? 'bg-success/15 text-success' : 'bg-destructive/15 text-destructive'
            }`}
          >
            {isCorrect ? <Check className="h-3 w-3" aria-hidden="true" /> : <X className="h-3 w-3" aria-hidden="true" />}
            {isCorrect ? 'Correct' : 'Incorrect'}
          </span>
        </div>

        <h1 className="mt-2.5 text-[15px] font-extrabold leading-snug">{question.prompt}</h1>
        {question.code && (
          <div className="mt-3">
            <CodeBlock code={question.code} lang={quiz.courseSlug === 'python' ? 'python' : 'javascript'} numbered={false} />
          </div>
        )}

        <div className="mt-3.5 flex flex-col gap-2">
          <div
            className={`rounded-[14px] border px-3 py-2.5 text-[12px] font-medium ${
              isCorrect ? 'border-success/50 bg-success/10' : 'border-destructive/50 bg-destructive/10'
            }`}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Your answer</p>
            <p className="mt-1 leading-snug">{selected != null ? question.options[selected] : 'Not answered'}</p>
          </div>
          {!isCorrect && (
            <div className="rounded-[14px] border border-success/50 bg-success/10 px-3 py-2.5 text-[12px] font-medium">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Correct answer</p>
              <p className="mt-1 leading-snug">{question.options[question.answer]}</p>
            </div>
          )}
        </div>

        <div className="mt-3.5 rounded-[14px] bg-muted/70 p-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Why</p>
          <p className="mt-1.5 text-[12px] leading-relaxed text-foreground/85">{question.explanation}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-2.5 px-5">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="h-12 flex-1 rounded-[16px] border border-border/80 bg-card text-[12.5px] font-bold shadow-soft disabled:opacity-40"
        >
          Previous
        </button>
        {index < total - 1 ? (
          <button
            type="button"
            onClick={() => setIndex((i) => i + 1)}
            className="h-12 flex-1 rounded-[16px] bg-primary text-[12.5px] font-bold text-primary-foreground shadow-lift"
          >
            Next
          </button>
        ) : (
          <Link
            to="/practice/history"
            className="grid h-12 flex-1 place-items-center rounded-[16px] bg-primary text-[12.5px] font-bold text-primary-foreground shadow-lift"
          >
            Finish review
          </Link>
        )}
      </div>
    </div>
  );
}