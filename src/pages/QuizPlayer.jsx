import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ProgressBar from '@/components/ProgressBar';
import AnswerOption from '@/components/AnswerOption';
import CodeBlock from '@/components/CodeBlock';
import { findQuiz } from '@/data/curriculum';
import useLearner from '@/hooks/useLearner';

export default function QuizPlayer() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const quiz = findQuiz(slug);
  const { profile, submitQuiz } = useLearner();

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!quiz) return <p className="px-5 pt-20 text-center text-[13px]">That quiz could not be found.</p>;

  const question = quiz.questions[index];
  const total = quiz.questions.length;
  const answeredCount = answers.filter((a) => a != null).length;
  const clock = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  const select = (optionIndex) => {
    const nextAnswers = [...answers];
    nextAnswers[index] = optionIndex;
    setAnswers(nextAnswers);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    const correct = quiz.questions.reduce((n, q, i) => n + (answers[i] === q.answer ? 1 : 0), 0);
    const previouslyUnlocked = profile?.unlocked || [];
    try {
      const result = await submitQuiz(quiz, answers, correct);
      navigate(`/practice/result/${result.attemptId}`, {
        state: { gained: result.unlocked.filter((badge) => !previouslyUnlocked.includes(badge)), quizSlug: quiz.slug },
      });
    } catch {
      setError('We could not save that attempt. Check your connection and try again.');
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title={quiz.title}
        subtitle={`${quiz.type} · ${quiz.level}`}
        to="/practice/quizzes"
        right={
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-muted px-2.5 py-1 font-mono text-[10.5px] text-muted-foreground">
            <Clock className="h-3 w-3" aria-hidden="true" /> {clock}
          </span>
        }
      />

      <div className="px-5 pt-4">
        <div className="flex items-center justify-between text-[11px] font-bold">
          <span>
            Question {index + 1} of {total}
          </span>
          <span className="text-muted-foreground">{answeredCount} answered</span>
        </div>
        <ProgressBar value={((index + 1) / total) * 100} height="h-1.5" className="mt-2" label="Quiz progress" />
      </div>

      <div className="px-5 pt-5">
        <h1 className="text-[16px] font-extrabold leading-snug">{question.prompt}</h1>
        {question.code && (
          <div className="mt-3">
            <CodeBlock code={question.code} lang={quiz.courseSlug === 'python' ? 'python' : 'javascript'} numbered={false} />
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2">
          {question.options.map((option, i) => (
            <AnswerOption
              key={option}
              index={i}
              text={option}
              selected={answers[index] === i}
              state={answers[index] === i ? 'selected' : 'idle'}
              onSelect={() => select(i)}
            />
          ))}
        </div>
      </div>

      {error && (
        <p className="mx-5 mt-3 rounded-[14px] bg-destructive/10 px-3.5 py-2.5 text-[11.5px] text-destructive">{error}</p>
      )}

      <div className="mt-5 flex gap-2.5 px-5">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="flex h-12 flex-1 items-center justify-center rounded-[16px] border border-border/80 bg-card text-[12.5px] font-bold shadow-soft disabled:opacity-40"
        >
          Previous
        </button>
        {index < total - 1 ? (
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
            className="flex h-12 flex-[1.4] items-center justify-center rounded-[16px] bg-primary text-[12.5px] font-bold text-primary-foreground shadow-lift active:scale-[0.98]"
          >
            Next question
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={answeredCount < total || submitting}
            className="flex h-12 flex-[1.4] items-center justify-center rounded-[16px] bg-primary text-[12.5px] font-bold text-primary-foreground shadow-lift active:scale-[0.98] disabled:opacity-50"
          >
            {submitting ? 'Scoring…' : 'Submit quiz'}
          </button>
        )}
      </div>

      <div className="mt-3 flex justify-center gap-1.5 px-5 pb-2">
        {quiz.questions.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to question ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-primary' : answers[i] != null ? 'w-1.5 bg-primary/50' : 'w-1.5 bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  );
}