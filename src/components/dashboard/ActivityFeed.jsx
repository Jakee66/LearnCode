/**
 * @param {{
 *   items?: {
 *     label: string,
 *     detail: string,
 *     time: string
 *   }[]
 * }} props
 */
export default function ActivityFeed({ items = [] }) {
  if (!items.length) return null;

  return (
    <ul className="mt-0.5">
      {items.map((item, i) => (
        <li
          key={`${item.label}-${i}`}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 gap-y-0.5 border-t border-[var(--lc-hair)] py-2.5"
        >
          <span className="truncate font-mono text-[10.5px] tracking-[0.12em]">
            {item.label}
          </span>

          <span className="justify-self-end whitespace-nowrap font-mono text-[9.5px] tracking-[0.06em] text-[var(--lc-muted)]">
            {item.time}
          </span>

          <span className="col-span-2 truncate text-[12px] leading-snug text-[var(--lc-muted)]">
            {item.detail}
          </span>
        </li>
      ))}
    </ul>
  );
}