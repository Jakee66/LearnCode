import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { initialsOf } from '@/lib/gamify';
import useLearner from '@/hooks/useLearner';

export default function EditProfile() {
  const navigate = useNavigate();
  const { loading, profile, saveProfile } = useLearner();
  const [form, setForm] = useState({ display_name: '', username: '', bio: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (profile) {
      setForm({
        display_name: profile.display_name || '',
        username: profile.username || '',
        bio: profile.bio || '',
      });
    }
  }, [profile]);

  const update = (key) => (event) => setForm((f) => ({ ...f, [key]: event.target.value }));

  const handleSave = async () => {
    if (!form.display_name.trim() || !form.username.trim()) {
      setError('A display name and username are both required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await saveProfile({
        display_name: form.display_name.trim(),
        username: form.username.trim().replace(/\s+/g, '').toLowerCase(),
        bio: form.bio.trim(),
      });
      navigate('/profile');
    } catch {
      setError('We could not save your profile. Please try again.');
      setSaving(false);
    }
  };

  if (loading) return <div className="px-5 pt-24 text-center text-[12px] text-muted-foreground">Loading profile…</div>;

  return (
    <div>
      <PageHeader title="Edit profile" subtitle="How you appear on the leaderboard" to="/profile" />

      <div className="flex flex-col items-center px-5 pt-6">
        <span className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-[28px] font-extrabold text-primary-foreground shadow-lift">
          {initialsOf(form.display_name || 'LearnCode')}
        </span>
        <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          Avatar from your initials
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-4 px-5">
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Display name</span>
          <input
            value={form.display_name}
            onChange={update('display_name')}
            placeholder="Your name"
            className="w-full rounded-[16px] border border-border/80 bg-card px-3.5 py-3 text-[13px] font-medium outline-none shadow-soft focus:border-primary"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Username</span>
          <div className="flex items-center rounded-[16px] border border-border/80 bg-card px-3.5 shadow-soft focus-within:border-primary">
            <span className="text-[13px] text-muted-foreground">@</span>
            <input
              value={form.username}
              onChange={update('username')}
              placeholder="username"
              className="w-full bg-transparent px-1 py-3 text-[13px] font-medium outline-none"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Short bio</span>
          <textarea
            value={form.bio}
            onChange={update('bio')}
            rows={4}
            maxLength={140}
            placeholder="Learning Python on my commute."
            className="w-full resize-none rounded-[16px] border border-border/80 bg-card px-3.5 py-3 text-[13px] leading-relaxed outline-none shadow-soft focus:border-primary"
          />
          <span className="mt-1 block text-right font-mono text-[10px] text-muted-foreground">{form.bio.length}/140</span>
        </label>

        {error && <p className="rounded-[14px] bg-destructive/10 px-3.5 py-2.5 text-[11.5px] text-destructive">{error}</p>}

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="mt-1 h-14 rounded-[20px] bg-primary text-[14px] font-bold text-primary-foreground shadow-lift transition-transform active:scale-[0.98] disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  );
}