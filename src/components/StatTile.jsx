export default function StatTile({ label, value, hint, icon: Icon, tone = 'text-primary', soft = 'bg-primary/10' }) {
  return (
    <div className="rounded-[20px] border border-border/70 bg-card p-3.5 shadow-soft">
      <span className={`grid h-8 w-8 place-items-center rounded-[11px] ${soft} ${tone}`}>
        {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
      </span>
      <p className="mt-2.5 font-display text-[19px] font-extrabold leading-none">{value}</p>
      <p className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{label}</p>
      {hint ? <p className="mt-0.5 text-[10px] text-muted-foreground/80">{hint}</p> : null}
    </div>
  );
}