import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PageHeader({ title, subtitle, to, right }) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center gap-3 px-5 pt-6">
      <button
        type="button"
        onClick={() => (to ? navigate(to) : navigate(-1))}
        aria-label="Go back"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border/80 bg-card shadow-soft transition-transform active:scale-95"
      >
        <ArrowLeft className="h-[18px] w-[18px]" aria-hidden="true" />
      </button>
      <div className="min-w-0 flex-1">
        {title && <h1 className="truncate font-display text-[17px] font-extrabold leading-tight">{title}</h1>}
        {subtitle && <p className="truncate text-[11px] text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </header>
  );
}