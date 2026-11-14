export const LEVEL_STEP = 250;

const TITLES = [
  'Curious Coder',
  'Loop Learner',
  'Bug Hunter',
  'Code Explorer',
  'Syntax Master',
  'Stack Builder',
  'Algorithm Ace',
  'Ship It',
];

export const levelFromXp = (xp = 0) => Math.floor(Math.max(0, xp) / LEVEL_STEP) + 1;

export const xpIntoLevel = (xp = 0) => Math.max(0, xp) % LEVEL_STEP;

export const levelProgress = (xp = 0) => (xpIntoLevel(xp) / LEVEL_STEP) * 100;

export const levelTitle = (level = 1) => TITLES[Math.min(Math.max(level - 1, 0), TITLES.length - 1)];

export const xpToNextLevel = (xp = 0) => LEVEL_STEP - xpIntoLevel(xp);

export const formatNumber = (n = 0) => Math.round(Number(n) || 0).toLocaleString('en-US');

export const initialsOf = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('') || 'LC';

export const todayKey = () => new Date().toISOString().slice(0, 10);

/** Streak maths: last_active_date is YYYY-MM-DD. */
export const nextStreak = ({ streak = 0, lastActiveDate }) => {
  const today = todayKey();
  if (lastActiveDate === today) return streak || 1;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (lastActiveDate === yesterday) return (streak || 0) + 1;
  return 1;
};

export const relativeTime = (iso) => {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return 'JUST NOW';
  if (mins < 60) return `${mins}M AGO`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}H AGO`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}D AGO`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }).toUpperCase();
};