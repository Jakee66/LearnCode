import { courses } from '@/data/curriculum';
import { achievements } from '@/data/curriculum';
import { todayKey } from '@/lib/gamify';

export const LESSON_XP = 25;

const dayKey = (date) => date.toISOString().slice(0, 10);
const keyOf = (courseSlug, lessonSlug) => `${courseSlug}/${lessonSlug}`;

export const completedSet = (progress = []) => new Set(progress.map((p) => p.lesson_key));

export function courseStats(progress = [], course) {
  const done = completedSet(progress);
  const completed = course.lessons.filter((l) => done.has(keyOf(course.slug, l.slug))).length;
  const nextLesson = course.lessons.find((l) => !done.has(keyOf(course.slug, l.slug))) || course.lessons[0];
  return {
    completed,
    total: course.lessons.length,
    percent: Math.round((completed / Math.max(course.lessons.length, 1)) * 100),
    nextLesson,
    isDone: (lessonSlug) => done.has(keyOf(course.slug, lessonSlug)),
  };
}

export function activityByDay(progress = [], attempts = []) {
  const map = {};
  const add = (date, xp) => {
    if (!date) return;
    map[date] = (map[date] || 0) + xp;
  };
  progress.forEach((p) => add(p.completed_date, LESSON_XP));
  attempts.forEach((a) => add(a.completed_date, a.xp_earned || 0));
  return map;
}

export function computeStats(profile = {}, progress = [], attempts = []) {
  const done = completedSet(progress);
  const days = activityByDay(progress, attempts);
  const today = todayKey();
  const lastDays = (n) => Array.from({ length: n }, (_, i) => dayKey(new Date(Date.now() - (n - 1 - i) * 86400000)));

  const minutesToday = progress
    .filter((p) => p.completed_date === today)
    .reduce((sum, p) => sum + (Number(p.minutes) || 0), 0);
  const goalMinutes = Number(profile.daily_goal_minutes) || 15;

  return {
    xp: Number(profile.xp) || 0,
    streak: Number(profile.streak) || 0,
    lessons: progress.length,
    quizzes: attempts.length,
    perfect: attempts.filter((a) => Number(a.score) === 100).length,
    coursesComplete: courses.filter((c) => c.lessons.every((l) => done.has(keyOf(c.slug, l.slug)))).length,
    languagesStarted: new Set(progress.map((p) => p.course_slug)).size,
    minutesToday,
    goalMinutes,
    goalPct: Math.min(100, Math.round((minutesToday / goalMinutes) * 100)),
    weekXp: lastDays(7).map((d) => days[d] || 0),
    streakDays: lastDays(14).map((d) => (days[d] ? 1 : 0)),
  };
}

const METRIC = {
  lessons: 'lessons',
  quizzes: 'quizzes',
  xp: 'xp',
  streak: 'streak',
  perfect: 'perfect',
  courses: 'coursesComplete',
  languages: 'languagesStarted',
};

export const unlockedFor = (stats) =>
  achievements.filter((a) => (stats[METRIC[a.metric]] || 0) >= a.threshold).map((a) => a.slug);

export function achievementsWithState(stats, unlocked = []) {
  return achievements.map((a) => {
    const value = stats[METRIC[a.metric]] || 0;
    return {
      ...a,
      value,
      unlocked: unlocked.includes(a.slug) || value >= a.threshold,
      percent: Math.min(100, Math.round((value / a.threshold) * 100)),
    };
  });
}