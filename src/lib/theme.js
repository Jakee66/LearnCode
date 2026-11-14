export const THEME_KEY = 'learncode.theme';

const prefersDark = () => window.matchMedia?.('(prefers-color-scheme: dark)').matches;

export const storedTheme = () => localStorage.getItem(THEME_KEY) || 'light';

export function applyTheme(mode) {
  const dark = mode === 'dark' || (mode === 'system' && prefersDark());
  document.documentElement.classList.toggle('dark', dark);
  localStorage.setItem(THEME_KEY, mode);
}