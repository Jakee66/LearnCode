import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';

export default function CourseCard({ course, progress = 0 }) {
  return (
    <Link
      to={`/course/${course.slug}`}
      className="flex items-center gap-3.5 rounded-[22px] border border-border/70 bg-card p-3.5 shadow-soft transition-transform duration-200 active:scale-[0.985]"
    >
      <span
        className="grid h-14 w-14 shrink-0 place-items-center rounded-[18px] font-mono text-[14px] font-bold"
        style={{ background: course.soft, color: course.color }}
        aria-hidden="true"
      >
        {course.glyph}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-[14.5px] font-bold leading-tight">{course.title}</h3>
          <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
            {course.level}
          </span>
        </div>
        <p className="mt-0.5 truncate text-[11.5px] text-muted-foreground">
          {course.lessons.length} lessons · {course.hours}h
        </p>
        <div className="mt-2 flex items-center gap-2">
          <ProgressBar value={progress} height="h-1.5" className="flex-1" label={`${course.title} progress`} />
          <span className="font-mono text-[10px] font-medium text-muted-foreground">{progress}%</span>
        </div>
      </div>

      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60" aria-hidden="true" />
    </Link>
  );
}