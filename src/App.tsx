import { Routes, Route } from "react-router-dom";

import TopBanner from "./components/index/TopBanner";
import Header from "./components/index/Header";
import Footer from "./components/index/Footer";

import IndexPage from "@/pages/index";
import CategoryPage from "@/pages/CategoryPage";
import PostDetailPage from "@/pages/PostDetailPage";
import TagPage from "@/pages/TagPage";
import SearchPage from "@/pages/SearchPage";
import AuthPage from "@/pages/Auth";

import { AuthProvider } from "./contexts/AuthContext";
import { CategoryProvider } from "./contexts/CategoryContext";

function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <TopBanner />
        <Header />

        <Routes>

          <Route path="/" element={<IndexPage />} />
          <Route path="/post/:slug" element={<PostDetailPage />} />
          <Route path="/:categorySlug" element={<CategoryPage />} />

          <Route element={<IndexPage />} path="/" />
          <Route element={<AuthPage />} path="/auth" />
          <Route element={<SearchPage />} path="/search" />
          <Route element={<PostDetailPage />} path="/post/:slug" />
          <Route element={<TagPage />} path="/tag/:slug" />
        </Routes>

        <Footer />
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;
