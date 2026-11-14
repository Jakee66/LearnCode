import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronRight, Globe, LogOut, Moon, Shield, Sun, User } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { api } from '@/api/client';
import { applyTheme, storedTheme } from '@/lib/theme';
import useLearner from '@/hooks/useLearner';
import { useLanguage } from '@/lib/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const THEMES = [
  { key: 'light', label: 'Light', Icon: Sun },
  { key: 'dark', label: 'Dark', Icon: Moon },
  { key: 'system', label: 'System', Icon: Globe },
];

function Toggle({ on, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? 'bg-primary' : 'bg-border'}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? 'left-[22px]' : 'left-0.5'}`}
      />
    </button>
  );
}

export default function Settings() {
  const { t } = useLanguage();
  const { user, profile, loading } = useLearner();
  const [theme, setTheme] = useState(storedTheme());
  const [prefs, setPrefs] = useState(() => ({
    streakReminder: localStorage.getItem('learncode.pref.streak') !== 'off',
    newCourses: localStorage.getItem('learncode.pref.courses') !== 'off',
    badges: localStorage.getItem('learncode.pref.badges') === 'on',
  }));
  const [policy, setPolicy] = useState(null);

  const changeTheme = (key) => {
    setTheme(key);
    applyTheme(key);
  };

  const togglePref = (key, storageKey) => (value) => {
    setPrefs((p) => ({ ...p, [key]: value }));
    localStorage.setItem(storageKey, value ? 'on' : 'off');
  };

  if (loading) {
    return (
      <div className="px-5 pt-8">
        <div className="h-14 animate-pulse rounded-[20px] bg-muted" />
        <div className="mt-4 h-40 animate-pulse rounded-[20px] bg-muted" />
        <div className="mt-4 h-16 animate-pulse rounded-[20px] bg-muted" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
  title={t('settings')}
  subtitle={t('settingsSubtitle')}
  to="/profile"
  right={null}
/>

      <section className="mt-5 px-5">
        <h2 className="mb-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">Account</h2>
        <div className="overflow-hidden rounded-[20px] border border-border/70 bg-card shadow-soft">
          <Link to="/profile/edit" className="flex items-center gap-3 border-b border-border/70 px-3.5 py-3">
            <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-primary/10 text-primary">
              <User className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[12.5px] font-bold">Profile details</span>
              <span className="block truncate text-[10.5px] text-muted-foreground">
                {profile?.display_name} · @{profile?.username}
              </span>
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground/60" aria-hidden="true" />
          </Link>
          <div className="flex items-center gap-3 px-3.5 py-3">
            <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-muted text-muted-foreground">
              <Shield className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[12.5px] font-bold">Signed in as</span>
              <span className="block truncate text-[10.5px] text-muted-foreground">{user?.email || '—'}</span>
            </span>
          </div>
        </div>
      </section>

      <section className="mt-5 px-5">
        <h2 className="mb-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">Notifications</h2>
        <div className="overflow-hidden rounded-[20px] border border-border/70 bg-card shadow-soft">
          {[
            { key: 'streakReminder', storage: 'learncode.pref.streak', label: 'Daily streak reminder', desc: 'A nudge if your streak is about to break' },
            { key: 'newCourses', storage: 'learncode.pref.courses', label: 'New courses', desc: 'When a language or module is added' },
            { key: 'badges', storage: 'learncode.pref.badges', label: 'Badge celebrations', desc: 'Confetti sounds and animations' },
          ].map((row, i) => (
            <div
              key={row.key}
              className={`flex items-center gap-3 px-3.5 py-3 ${i < 2 ? 'border-b border-border/70' : ''}`}
            >
              <Bell className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-bold">{row.label}</span>
                <span className="block text-[10.5px] text-muted-foreground">{row.desc}</span>
              </span>
              <Toggle on={prefs[row.key]} onChange={togglePref(row.key, row.storage)} label={row.label} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 px-5">
        <h2 className="mb-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">Appearance</h2>
        <div className="rounded-[20px] border border-border/70 bg-card p-1.5 shadow-soft">
          <div className="flex gap-1">
            {THEMES.map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => changeTheme(key)}
                aria-pressed={theme === key}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-[15px] py-2.5 text-[11.5px] font-bold transition-colors ${
                  theme === key ? 'bg-foreground text-background' : 'text-muted-foreground'
                }`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" /> {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-5 px-5">
        <h2 className="mb-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">More</h2>
        <div className="overflow-hidden rounded-[20px] border border-border/70 bg-card shadow-soft">
          <div className="flex items-center gap-3 border-b border-border/70 px-3.5 py-3">
  <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />

  <span className="min-w-0 flex-1 text-[12.5px] font-bold">
    Language
  </span>

  <LanguageSwitcher />
</div>
          <button type="button" onClick={() => setPolicy('privacy')} className="flex w-full items-center gap-3 border-b border-border/70 px-3.5 py-3 text-left">
            <span className="min-w-0 flex-1 text-[12.5px] font-bold">Privacy policy</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground/60" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => setPolicy('terms')} className="flex w-full items-center gap-3 px-3.5 py-3 text-left">
            <span className="min-w-0 flex-1 text-[12.5px] font-bold">Terms &amp; conditions</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground/60" aria-hidden="true" />
          </button>
        </div>
      </section>

      <div className="px-5 pt-5">
        <button
          type="button"
          onClick={() => api.auth.logout('/login')}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-[18px] border border-destructive/40 bg-destructive/5 text-[13px] font-bold text-destructive"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" /> Log out
        </button>
      </div>

      {policy && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-[400px] rounded-[26px] bg-card p-5 shadow-lift">
            <h3 className="font-display text-[16px] font-extrabold">
              {policy === 'privacy' ? 'Privacy policy' : 'Terms & conditions'}
            </h3>
            <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
              {policy === 'privacy'
                ? 'Your lesson progress, quiz attempts and XP are stored with your LearnCode account and used only to power your dashboard, streaks and leaderboard position. Display name, username and bio are shown to other learners on the leaderboard.'
                : 'LearnCode is for personal learning. Lesson content may not be resold or redistributed. XP, streaks and badges are learning incentives with no cash value, and attempts you record are your own.'}
            </p>
            <button
              type="button"
              onClick={() => setPolicy(null)}
              className="mt-4 h-12 w-full rounded-[16px] bg-primary text-[13px] font-bold text-primary-foreground"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}