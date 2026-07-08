import { Route, Routes, useLocation } from 'react-router-dom';

import { HeaderTop, MainNav } from './components/index/Header';
import TopBanner from './components/index/TopBanner';
import Footer from './components/index/Footer';
import TopUtilityBar from './components/index/TopUtilityBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

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
import AdminPage from './pages/AdminPage';

import { AuthProvider } from './contexts/AuthContext';
import { CategoryProvider } from './contexts/CategoryContext';
import { ThemeProvider } from './contexts/ThemeContext';

function AppLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && isHome && <TopBanner />}
      {!isAdminPage && isHome && <TopUtilityBar />}

      {!isAdminPage && <HeaderTop />}
      {!isAdminPage && <MainNav />}

      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/post/:slug" element={<PostDetailPage />} />
        <Route path="/tag/:slug" element={<TagPage />} />

        <Route
          path="/saved-posts"
          element={
            <ProtectedRoute>
              <SavedPostsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-comments"
          element={
            <ProtectedRoute>
              <UserCommentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />

        <Route path="/:categorySlug" element={<CategoryPage />} />
        <Route path="/:categorySlug/:childSlug" element={<CategoryPage />} />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CategoryProvider>
          <AppLayout />
        </CategoryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
