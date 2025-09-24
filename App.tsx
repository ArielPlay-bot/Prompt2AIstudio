
import React from 'react';
import { useStore } from './store';
import AuthPage from './pages/AuthPage';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';
import TrendingPage from './pages/TrendingPage';
import ExplorePage from './pages/ExplorePage';
import CreatePromptPage from './pages/CreatePromptPage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import PromptDetailPage from './pages/PromptDetailPage';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
// Fix: Import DonatePage. It is used as a page but located in the components folder.
import DonatePage from './components/Donate';

const pageComponents = {
  dashboard: DashboardPage,
  leaderboard: LeaderboardPage,
  trending: TrendingPage,
  explore: ExplorePage,
  create: CreatePromptPage,
  profile: ProfilePage,
  favorites: FavoritesPage,
  promptDetail: PromptDetailPage,
  // Fix: Add DonatePage to the router map.
  donate: DonatePage,
};

const App: React.FC = () => {
  const { currentUser, currentPage, pageParam } = useStore();
  const CurrentPage = pageComponents[currentPage] || DashboardPage;
  
  // Initialize theme
  useTheme();

  if (!currentUser) {
    return <AuthPage />;
  }

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage + pageParam}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          <CurrentPage />
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default App;
