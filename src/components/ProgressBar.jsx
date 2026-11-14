const TONES = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  success: 'bg-success',
  ink: 'bg-foreground',
};

export default function ProgressBar({ value = 0, tone = 'primary', height = 'h-2', className = '', label }) {
  const pct = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-muted ${height} ${className}`}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className={`h-full rounded-full transition-[width] duration-700 ease-out ${TONES[tone] || TONES.primary}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}