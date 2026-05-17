import { Route, Routes } from "react-router-dom";

import TopBanner from "./components/TopBanner";
import Header from "./components/Header";
import Footer from "./components/Footer";

import IndexPage from "@/pages/index";
function App() {
  return (
    <div>
      <TopBanner />
      <Header />
      <Routes>
        <Route element={<IndexPage />} path="/" />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
