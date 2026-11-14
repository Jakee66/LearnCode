import { useEffect, useState } from 'react';
import { Crown, TrendingUp } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { api } from '@/api/client';
import { initialsOf, levelFromXp } from '@/lib/gamify';
import useLearner from '@/hooks/useLearner';

const TABS = ['Weekly', 'All-time'];
const PODIUM = ['h-[64px]', 'h-[92px]', 'h-[52px]'];
const MEDALS = ['#FBBF24', '#CBD5E1', '#F0A97B'];

export default function Leaderboard() {
  const { profile } = useLearner();
  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('All-time');

  useEffect(() => {
    api.entities.LearnerProfile.list('-xp', 100)
      .then(setBoard)
      .catch(() => setBoard([]))
      .finally(() => setLoading(false));
  }, []);

  const metric = tab === 'Weekly' ? 'week_xp' : 'xp';
  const ranked = [...board].sort((a, b) => (Number(b[metric]) || 0) - (Number(a[metric]) || 0));
  const top = ranked.slice(0, 3);
  const rest = ranked.slice(3);
  const myIndex = ranked.findIndex((p) => p.user_id === profile?.user_id);
  const me = myIndex >= 0 ? ranked[myIndex] : null;
  const podiumOrder = [top[1], top[0], top[2]];

  return (
    <div>
      <PageHeader title="Leaderboard" subtitle="Learn more, climb higher" to="/" />

      <div className="mx-5 mt-4 flex rounded-full border border-border/80 bg-card p-1 shadow-soft">
        {TABS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setTab(option)}
            aria-pressed={tab === option}
            className={`flex-1 rounded-full py-2 text-[11.5px] font-bold transition-colors ${
              tab === option ? 'bg-foreground text-background' : 'text-muted-foreground'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="mx-5 mt-6 h-52 animate-pulse rounded-[26px] bg-muted" />
      ) : (
        <>
          <section className="mx-5 mt-6 rounded-[26px] border border-border/70 bg-card px-3 pb-4 pt-6 shadow-soft">
            <div className="grid grid-cols-3 items-end gap-2">
              {podiumOrder.map((player, i) => {
                if (!player) return <div key={`empty-${i}`} />;
                const place = [2, 1, 3][i];
                const isMe = player.user_id === profile?.user_id;
                return (
                  <div key={player.id} className="flex flex-col items-center">
                    {place === 1 && <Crown className="mb-1 h-4 w-4 text-[#F59E0B]" aria-hidden="true" />}
                    <span
                      className="grid h-14 w-14 place-items-center rounded-full text-[14px] font-extrabold text-white shadow-lift"
                      style={{ background: `linear-gradient(145deg, ${MEDALS[place - 1]}, ${MEDALS[place - 1]}B0)` }}
                    >
                      {initialsOf(player.display_name)}
                    </span>
                    <p className="mt-1.5 max-w-full truncate text-[11px] font-extrabold">{player.display_name}</p>
                    <p className="font-mono text-[9.5px] text-muted-foreground">
                      {(Number(player[metric]) || 0).toLocaleString('en-US')} XP
                    </p>
                    <div
                      className={`mt-2 w-full rounded-t-[12px] ${PODIUM[i]} flex items-start justify-center pt-1.5`}
                      style={{ background: `${MEDALS[place - 1]}26`, borderTop: `2px solid ${MEDALS[place - 1]}` }}
                    >
                      <span className="font-display text-[15px] font-extrabold" style={{ color: MEDALS[place - 1] }}>
                        {place}
                      </span>
                    </div>
                    {isMe && <span className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.1em] text-primary">You</span>}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-4 px-5">
            {me && myIndex >= 3 && (
              <div className="mb-2 flex items-center gap-3 rounded-[18px] border border-primary/40 bg-primary/5 p-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-primary font-mono text-[11px] font-bold text-primary-foreground">
                  {myIndex + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-bold">{profile?.display_name} (you)</p>
                  <p className="text-[10px] text-muted-foreground">Level {levelFromXp(profile?.xp)}</p>
                </div>
                <span className="font-mono text-[11px] font-bold text-primary">
                  {(Number(me[metric]) || 0).toLocaleString('en-US')}
                </span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              {rest.map((player, i) => {
                const place = i + 4;
                const isMe = player.user_id === profile?.user_id;
                return (
                  <div
                    key={player.id}
                    className={`flex items-center gap-3 rounded-[16px] border px-3 py-2.5 ${
                      isMe ? 'border-primary/40 bg-primary/5' : 'border-border/70 bg-card'
                    }`}
                  >
                    <span className="w-5 shrink-0 text-center font-mono text-[11px] font-bold text-muted-foreground">{place}</span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-extrabold">
                      {initialsOf(player.display_name)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12px] font-bold">{player.display_name}</p>
                      <p className="text-[10px] text-muted-foreground">
                        Level {levelFromXp(player.xp)} · {player.streak || 0}d streak
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] font-bold">
                      {(Number(player[metric]) || 0).toLocaleString('en-US')}
                    </span>
                  </div>
                );
              })}
            </div>

            {rest.length === 0 && (
              <p className="mt-3 text-center text-[11.5px] text-muted-foreground">
                That is the whole board for now — invite a friend to compete.
              </p>
            )}
          </section>

          <p className="mt-4 flex items-center justify-center gap-1.5 px-5 text-center text-[10.5px] text-muted-foreground">
            <TrendingUp className="h-3 w-3" aria-hidden="true" />
            {tab === 'Weekly' ? 'XP earned in the last 7 days' : 'XP earned since day one'}
          </p>
        </>
      )}
    </div>
  );
}