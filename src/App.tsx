import { Route, Routes, useLocation } from "react-router-dom";
import PageLayoutAddPage from "./pages/page-layout/PageLayoutAddPage";
import PageLayoutListPage from "./pages/page-layout/PageLayoutListPage";
import PageLayoutEditPage from "./pages/page-layout/PageLayoutEditPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import PageLayoutsPage from "./pages/page-layout/PageLayoutsPage";
import { Toaster } from "sonner";

const App = () => {
  const location = useLocation();
  const hideHeader = location.pathname === "/";
  return (
    <>
      {!hideHeader && <Header />}
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/page-layouts/add" element={<PageLayoutAddPage />} />
        <Route path="/page-layouts" element={<PageLayoutListPage />} />
        <Route path="/page-layouts/:id" element={<PageLayoutEditPage />} />
        <Route path="/page-layout/:path" element={<PageLayoutsPage />} />
      </Routes>
    </>
  );
};

export default App;
