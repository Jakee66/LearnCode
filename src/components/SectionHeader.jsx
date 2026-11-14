import { Link } from 'react-router-dom';

export default function SectionHeader({ title, action, to }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <h2 className="font-display text-[17px] font-extrabold tracking-tight">{title}</h2>
      {action && to && (
        <Link to={to} className="shrink-0 text-[11.5px] font-bold text-primary">
          {action}
        </Link>
      )}
    </div>
  );
}