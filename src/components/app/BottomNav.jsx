
import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, Terminal, Trophy, User } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const ITEMS = [
  { to: '/', key: 'home', Icon: Home },
  { to: '/learn', key: 'learn', Icon: Layers },
  { to: '/practice', key: 'practice', Icon: Terminal },
  { to: '/leaderboard', key: 'rank', Icon: Trophy },
  { to: '/profile', key: 'profile', Icon: User },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  return (
    <nav className="pointer-events-none fixed bottom-0 left-1/2 z-40 w-full max-w-[440px] -translate-x-1/2 px-4 pb-4 pt-2 lg:pb-6">
      <div className="pointer-events-auto flex items-center justify-between gap-1 rounded-[26px] border border-border/80 bg-card/95 px-2 py-2 shadow-[0_18px_40px_-24px_rgba(28,22,70,0.6)] backdrop-blur-xl">
        {ITEMS.map(({ to, key, Icon }) => {
          const active = to === '/' ? pathname === '/' : pathname.startsWith(to);

          return (
            <Link
              key={to}
              to={to}
              aria-current={active ? 'page' : undefined}
              className={`flex flex-1 flex-col items-center gap-1 rounded-[18px] py-2 transition-colors duration-200 ${
                active ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon
                className="h-[19px] w-[19px]"
                strokeWidth={active ? 2.4 : 1.9}
                aria-hidden="true"
              />
              <span className="text-[9.5px] font-bold uppercase tracking-[0.06em]">
                {t(key)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
