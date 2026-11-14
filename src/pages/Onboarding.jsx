import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ArtLearn from '@/components/illustrations/ArtLearn';
import ArtLanguages from '@/components/illustrations/ArtLanguages';
import ArtRewards from '@/components/illustrations/ArtRewards';

const SLIDES = [
  {
    Art: ArtLearn,
    eyebrow: 'Welcome to LearnCode',
    title: 'Learn by writing real code',
    body: 'Bite-sized lessons put working code in your hands from the first minute — no setup, no theory dumps.',
  },
  {
    Art: ArtLanguages,
    eyebrow: 'Interactive learning',
    title: 'Seven languages, one path',
    body: 'Start with HTML and Python, then grow into JavaScript, PHP, Go, Flutter and Dart at your own pace.',
  },
  {
    Art: ArtRewards,
    eyebrow: 'Progress that sticks',
    title: 'Earn XP, badges & streaks',
    body: 'Every lesson and quiz moves your level forward. Keep the streak alive and watch the badges stack up.',
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const last = index === SLIDES.length - 1;
  const Art = slide.Art;

  return (
    <div className="flex min-h-screen flex-col px-6 pb-10 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-primary font-mono text-[11px] font-bold text-primary-foreground">
            {'</>'}
          </span>
          <span className="font-display text-[14px] font-extrabold tracking-tight">LearnCode</span>
        </div>
        {!last && (
          <button type="button" onClick={() => navigate('/')} className="text-[12px] font-bold text-muted-foreground">
            Skip
          </button>
        )}
      </div>

      <div className="mt-6 flex-1">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="overflow-hidden rounded-[34px] bg-gradient-to-b from-muted/80 to-card">
            <Art className="h-[240px] w-full" />
          </div>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{slide.eyebrow}</p>
          <h1 className="mt-3 font-display text-[26px] font-extrabold leading-[1.15] tracking-tight">{slide.title}</h1>
          <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">{slide.body}</p>
        </motion.div>
      </div>

      <div className="mt-8 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-7 bg-primary' : 'w-1.5 bg-border'}`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => (last ? navigate('/') : setIndex(i => i + 1))}
        className="mt-6 flex h-14 items-center justify-center gap-2 rounded-[20px] bg-primary text-[14px] font-bold text-primary-foreground shadow-lift transition-transform active:scale-[0.98]"
      >
        {last ? 'Get started' : 'Next'}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}