import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import getTheme from "./theme/useTheme";
import Header from "./components/header/Header";
import ProjectHomePage from "./pages/ProjectHomePage";
import ProductListPage from "./pages/product/ProductListpage";
import ProductAddPage from "./pages/product/ProductAddPage";
import ProductEditPage from "./pages/product/ProductEditPage";
import TaskForm from "./pages/TaskForm";
import { Toaster } from "sonner";

const App = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    document.documentElement.setAttribute("data-theme", newMode);
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <ThemeProvider theme={getTheme(mode)}>
          <CssBaseline />
          <Header mode={mode} toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/login" element={<ProjectHomePage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/new" element={<ProductAddPage />} />
            <Route path="/product/:id/edit" element={<ProductEditPage />} />
            <Route path="/taskform" element={<TaskForm />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
