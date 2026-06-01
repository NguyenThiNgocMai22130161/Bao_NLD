import { Route, Routes, useLocation } from 'react-router-dom';

import { HeaderTop, MainNav } from './components/index/Header';
import TopBanner from './components/index/TopBanner';
import Footer from './components/index/Footer';
import TopUtilityBar from './components/index/TopUtilityBar';

import AuthPage from './pages/Auth';
import IndexPage from './pages/index';
import PostDetailPage from './pages/PostDetailPage';
import SavedPostsPage from './pages/SavedPostsPage';
import HistoryPage from './pages/HistoryPage';
import UserCommentsPage from './pages/UserCommentsPage';
import TagPage from './pages/TagPage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import ProfilePage from './pages/ProfilePage';

import { AuthProvider } from './contexts/AuthContext';
import { CategoryProvider } from './contexts/CategoryContext';

function AppLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      {isHome && <TopBanner />}
      {isHome && <TopUtilityBar />}

      <HeaderTop />
      <MainNav />

      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/post/:slug" element={<PostDetailPage />} />
        <Route path="/tag/:slug" element={<TagPage />} />

        <Route path="/saved-posts" element={<SavedPostsPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/my-comments" element={<UserCommentsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/:categorySlug" element={<CategoryPage />} />
        <Route path="/:categorySlug/:childSlug" element={<CategoryPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <AppLayout />
      </CategoryProvider>
    </AuthProvider>
  );
}
