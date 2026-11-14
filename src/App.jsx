import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import AppShell from '@/components/app/AppShell';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Splash from '@/pages/Splash';
import Onboarding from '@/pages/Onboarding';
import Learn from '@/pages/Learn';
import CourseDetail from '@/pages/CourseDetail';
import Lesson from '@/pages/Lesson';
import Practice from '@/pages/Practice';
import Playground from '@/pages/Playground';
import QuizList from '@/pages/QuizList';
import QuizPlayer from '@/pages/QuizPlayer';
import QuizResult from '@/pages/QuizResult';
import QuizReview from '@/pages/QuizReview';
import QuizHistory from '@/pages/QuizHistory';
import Profile from '@/pages/Profile';
import EditProfile from '@/pages/EditProfile';
import Achievements from '@/pages/Achievements';
import Leaderboard from '@/pages/Leaderboard';
import Settings from '@/pages/Settings';
import { LanguageProvider } from '@/lib/LanguageContext';

const AuthenticatedApp = () => {
  // Render the main app
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route path="/splash" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route element={<AppShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/course/:slug" element={<CourseDetail />} />
          <Route path="/lesson/:courseSlug/:lessonSlug" element={<Lesson />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practice/playground" element={<Playground />} />
          <Route path="/practice/quizzes" element={<QuizList />} />
          <Route path="/practice/quiz/:slug" element={<QuizPlayer />} />
          <Route path="/practice/result/:attemptId" element={<QuizResult />} />
          <Route path="/practice/review/:attemptId" element={<QuizReview />} />
          <Route path="/practice/history" element={<QuizHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};



function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <ScrollToTop />
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
