import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/onboarding'), 2400);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#1B1440] px-8 text-center text-white">
      <div className="pointer-events-none absolute inset-x-0 -bottom-24 h-72 bg-[radial-gradient(50%_60%_at_50%_100%,rgba(245,158,11,0.55),rgba(245,158,11,0))]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.55),rgba(129,140,248,0))]" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="lc-pop grid h-20 w-20 place-items-center rounded-[26px] border border-white/20 bg-white/10 backdrop-blur">
          <span className="font-mono text-[22px] font-bold tracking-tight">{'</>'}</span>
        </div>
        <h1 className="mt-6 font-display text-[34px] font-extrabold leading-none tracking-tight">LearnCode</h1>
        <p className="mt-2.5 font-mono text-[10.5px] uppercase tracking-[0.24em] text-[#B8AFE6]">Code · Play · Level up</p>

        <div className="mt-12 h-1 w-40 overflow-hidden rounded-full bg-white/15">
          <div className="h-full w-1/2 animate-[lc-grow_1.4s_ease-in-out_infinite] rounded-full bg-accent" />
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8E85BF]">Loading your lessons…</p>
      </div>

      <button
        type="button"
        onClick={() => navigate('/')}
        className="absolute bottom-8 z-10 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8E85BF]"
      >
        Skip intro
      </button>
    </div>
  );
}