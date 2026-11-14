import { useState } from 'react';
import QuizCard from '@/components/QuizCard';
import PageHeader from '@/components/PageHeader';
import { quizzes } from '@/data/curriculum';
import useLearner from '@/hooks/useLearner';

const TYPES = ['All', 'Multiple Choice', 'Predict the Output', 'Complete the Syntax', 'Logic Challenge'];

export default function QuizList() {
  const { attempts } = useLearner();
  const [type, setType] = useState('All');

  const bestByQuiz = attempts.reduce((map, attempt) => {
    const previous = map[attempt.quiz_slug];
    map[attempt.quiz_slug] = previous == null ? attempt.score : Math.max(previous, attempt.score);
    return map;
  }, {});

  const filtered = quizzes.filter((quiz) => type === 'All' || quiz.type === type);

  return (
    <div>
      <PageHeader title="Quizzes" subtitle={`${quizzes.length} quizzes available`} to="/practice" />

      <div className="lc-scroll-x mt-4 flex gap-2 overflow-x-auto px-5 pb-1">
        {TYPES.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setType(option)}
            aria-pressed={type === option}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11.5px] font-bold transition-colors ${
              type === option ? 'bg-foreground text-background' : 'border border-border/80 bg-card text-muted-foreground'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2.5 px-5">
        {filtered.map((quiz) => (
          <QuizCard key={quiz.slug} quiz={quiz} best={bestByQuiz[quiz.slug]} />
        ))}
      </div>

      <p className="px-5 pt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
        You keep 100% of the XP you earn, even on a retry.
      </p>
    </div>
  );
}