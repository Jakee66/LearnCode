import { useCallback, useEffect, useState } from 'react';
import { api } from '@/api/client';
import { LESSON_XP, computeStats, unlockedFor } from '@/lib/learner';
import { nextStreak, todayKey } from '@/lib/gamify';

const EMPTY = { loading: true, user: null, profile: null, progress: [], attempts: [] };

export default function useLearner() {
  const [state, setState] = useState(EMPTY);

  const load = useCallback(async () => {
    const user = await api.auth.me();
    const [profiles, progress, attempts] = await Promise.all([
      api.entities.LearnerProfile.filter({ user_id: user.id }),
      api.entities.LessonProgress.filter({ user_id: user.id }),
      api.entities.QuizAttempt.filter({ user_id: user.id }),
    ]);

    let profile = profiles[0];
    if (!profile) {
      profile = await api.entities.LearnerProfile.create({
        user_id: user.id,
        display_name: user.full_name || 'New coder',
        username: (user.email || 'coder').split('@')[0],
        bio: '',
        xp: 0,
        streak: 0,
        best_streak: 0,
        last_active_date: '',
        daily_goal_minutes: 15,
        unlocked: [],
        is_demo: false,
      });
    }

    setState({ loading: false, user, profile, progress, attempts });
  }, []);

  useEffect(() => {
    load().catch((error) => {
      setState((s) => ({ ...s, loading: false, error }));
    });
  }, [load]);

  const applyProgress = async (patch, nextProgress, nextAttempts) => {
    await api.entities.LearnerProfile.update(state.profile.id, patch);
    setState((s) => ({ ...s, profile: { ...s.profile, ...patch }, progress: nextProgress, attempts: nextAttempts }));
  };

  const completeLesson = async (course, lesson) => {
    const { user, profile, progress, attempts } = state;
    const lessonKey = `${course.slug}/${lesson.slug}`;
    if (progress.some((p) => p.lesson_key === lessonKey)) return { alreadyDone: true, xpGained: 0 };

    const record = await api.entities.LessonProgress.create({
      user_id: user.id,
      course_slug: course.slug,
      lesson_slug: lesson.slug,
      lesson_key: lessonKey,
      minutes: lesson.minutes,
      completed_date: todayKey(),
    });

    const nextProgress = [...progress, record];
    const streak = nextStreak({ streak: profile.streak, lastActiveDate: profile.last_active_date });
    const xp = (Number(profile.xp) || 0) + LESSON_XP;
    const stats = computeStats({ ...profile, xp, streak }, nextProgress, attempts);

    await applyProgress(
      {
        xp,
        week_xp: stats.weekXp.reduce((sum, day) => sum + day, 0),
        streak,
        best_streak: Math.max(streak, Number(profile.best_streak) || 0),
        last_active_date: todayKey(),
        unlocked: unlockedFor(stats),
      },
      nextProgress,
      attempts
    );

    return { alreadyDone: false, xpGained: LESSON_XP };
  };

  const submitQuiz = async (quiz, answers, correctCount) => {
    const { user, profile, progress, attempts } = state;
    const total = quiz.questions.length;
    const score = Math.round((correctCount / total) * 100);
    const xpEarned = Math.max(10, Math.round((quiz.xp * correctCount) / total));

    const record = await api.entities.QuizAttempt.create({
      user_id: user.id,
      quiz_slug: quiz.slug,
      quiz_title: quiz.title,
      quiz_type: quiz.type,
      course_slug: quiz.courseSlug,
      score,
      correct: correctCount,
      incorrect: total - correctCount,
      total,
      xp_earned: xpEarned,
      answers,
      completed_date: todayKey(),
    });

    const nextAttempts = [record, ...attempts];
    const streak = nextStreak({ streak: profile.streak, lastActiveDate: profile.last_active_date });
    const xp = (Number(profile.xp) || 0) + xpEarned;
    const stats = computeStats({ ...profile, xp, streak }, progress, nextAttempts);

    await applyProgress(
      {
        xp,
        week_xp: stats.weekXp.reduce((sum, day) => sum + day, 0),
        streak,
        best_streak: Math.max(streak, Number(profile.best_streak) || 0),
        last_active_date: todayKey(),
        unlocked: unlockedFor(stats),
      },
      progress,
      nextAttempts
    );

    return { attemptId: record.id, xpEarned, score, unlocked: unlockedFor(stats) };
  };

  const saveProfile = async (patch) => {
    await api.entities.LearnerProfile.update(state.profile.id, patch);
    setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }));
  };

  return {
    ...state,
    stats: state.profile ? computeStats(state.profile, state.progress, state.attempts) : null,
    reload: load,
    completeLesson,
    submitQuiz,
    saveProfile,
  };
}