import { Link } from 'react-router-dom';
import { Clock, HelpCircle, ChevronRight } from 'lucide-react';
import { findCourse } from '@/data/curriculum';

export default function QuizCard({ quiz, best }) {
  const course = findCourse(quiz.courseSlug);

  return (
    <Link
      to={`/practice/quiz/${quiz.slug}`}
      className="block rounded-[22px] border border-border/70 bg-card p-4 shadow-soft transition-transform active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-primary">
            {quiz.type}
          </span>
          <h3 className="mt-1.5 truncate text-[14.5px] font-extrabold">{quiz.title}</h3>
          <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{course ? course.title : 'Mixed practice'}</p>
        </div>
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-[15px] font-mono text-[11px] font-bold"
          style={{ background: course?.soft || '#EEF2FF', color: course?.color || '#4F46E5' }}
          aria-hidden="true"
        >
          {quiz.questions.length}Q
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3.5 text-[10.5px] font-semibold text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" /> {quiz.questions.length} questions
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {quiz.minutes} min
        </span>
        <span className="ml-auto rounded-full bg-accent/20 px-2 py-0.5 font-mono text-[10px] font-bold text-[#9A6B00]">
          +{quiz.xp} XP
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-3">
        <span className="text-[11px] font-semibold text-muted-foreground">
          {best != null ? `Best score ${best}%` : 'Not attempted yet'}
        </span>
        <span className="inline-flex items-center gap-1 text-[11.5px] font-bold text-primary">
          {best != null ? 'Retry' : 'Start quiz'} <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}