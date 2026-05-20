import { Route, Routes } from 'react-router-dom';

import TopBanner from './components/index/TopBanner';
import Header from './components/index/Header';
import Footer from './components/index/Footer';
import AuthPage from './pages/Auth';
import { AuthProvider } from './contexts/AuthContext';

import IndexPage from '@/pages/index';
import PostDetailPage from '@/pages/PostDetailPage';

function App() {
  return (
    <AuthProvider>
      <div>
        <TopBanner />
        <Header />
        <Routes>
          <Route element={<IndexPage />} path="/" />
          <Route element={<AuthPage />} path="/auth" />
          <Route element={<PostDetailPage />} path="/post/:slug" />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
