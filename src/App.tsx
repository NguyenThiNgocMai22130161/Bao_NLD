import { Routes, Route } from 'react-router-dom';

import TopBanner from './components/index/TopBanner';
import Header from './components/index/Header';
import Footer from './components/index/Footer';
import AuthPage from './pages/Auth';
import { AuthProvider } from './contexts/AuthContext';
import IndexPage from './pages/index';
import PostDetailPage from './pages/PostDetailPage';
import SavedPostsPage from './pages/SavedPostsPage';
import { CategoryProvider } from './contexts/CategoryContext';

import HistoryPage from '@/pages/HistoryPage'; // Import trang vừa tạo
import TagPage from '@/pages/TagPage';
import SearchPage from '@/pages/SearchPage';
import CategoryPage from '@/pages/CategoryPage';

function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <TopBanner />
        <Header />

        <Routes>
          <Route element={<IndexPage />} path="/" />
          <Route element={<PostDetailPage />} path="/post/:slug" />
          <Route element={<CategoryPage />} path="/:categorySlug" />

          <Route element={<IndexPage />} path="/" />
          <Route element={<AuthPage />} path="/auth" />
          <Route element={<SearchPage />} path="/search" />
          <Route element={<PostDetailPage />} path="/post/:slug" />
          <Route element={<TagPage />} path="/tag/:slug" />
          <Route element={<SavedPostsPage />} path="/saved-posts" />
          <Route element={<HistoryPage />} path="/history" />
        </Routes>

        <Footer />
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;
