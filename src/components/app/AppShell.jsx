import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import { applyTheme, storedTheme } from '@/lib/theme';

export default function AppShell() {
  useEffect(() => {
    applyTheme(storedTheme());
  }, []);

  return (
    <div className="lc-stage flex min-h-screen justify-center">
      <div className="relative w-full max-w-[440px] bg-background pb-28 shadow-[0_40px_90px_-50px_rgba(40,33,97,0.55)] lg:my-5 lg:min-h-[calc(100vh-2.5rem)] lg:rounded-[40px]">
        <Outlet />
        <BottomNav />
      </div>
    </div>
  );
}