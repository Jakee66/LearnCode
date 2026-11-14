import { Check, X } from 'lucide-react';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export default function AnswerOption({ index, text, selected, state = 'idle', onSelect, disabled }) {
  const styles = {
    idle: 'border-border/80 bg-card text-foreground',
    selected: 'border-primary bg-primary/5 text-foreground ring-1 ring-primary/30',
    correct: 'border-success bg-success/10 text-foreground',
    wrong: 'border-destructive bg-destructive/10 text-foreground',
  };

  const badge = {
    idle: 'bg-muted text-muted-foreground',
    selected: 'bg-primary text-primary-foreground',
    correct: 'bg-success text-white',
    wrong: 'bg-destructive text-white',
  };

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      className={`flex w-full items-center gap-3 rounded-[18px] border px-3.5 py-3 text-left transition-all duration-200 active:scale-[0.99] ${styles[state]}`}
    >
      <span
        className={`grid h-7 w-7 shrink-0 place-items-center rounded-[10px] font-mono text-[11px] font-bold ${badge[state]}`}
        aria-hidden="true"
      >
        {state === 'correct' ? <Check className="h-3.5 w-3.5" /> : state === 'wrong' ? <X className="h-3.5 w-3.5" /> : LETTERS[index]}
      </span>
      <span className="flex-1 text-[13px] font-medium leading-snug">{text}</span>
    </button>
  );
}