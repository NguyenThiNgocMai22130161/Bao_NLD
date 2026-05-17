import { Route, Routes } from "react-router-dom";

import TopBanner from "./components/TopBanner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthPage from "./pages/Auth";
import { AuthProvider } from "./contexts/AuthContext";

import IndexPage from "@/pages/index";
function App() {
  return (
    <AuthProvider>
      <div>
        <TopBanner />
        <Header />
        <Routes>
          <Route element={<IndexPage />} path="/" />
          <Route element={<AuthPage />} path="/auth" />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
