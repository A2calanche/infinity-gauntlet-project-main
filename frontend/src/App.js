import React, { useState, useEffect } from "react";
import "./App.scss";
import Landing from "./components/Landing";
import LogIn from "./components/LogIn";
import SignIn from "./components/SignIn";
import TodoList from "./components/TodoList";
import ForgotPassword from "./components/Recovery";
import RecoveryPassword from "./components/RecoveryPassword";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDark, setIsDark] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);
  const handleLogout = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error(error);
    }
    setIsAuthenticated(false);
  };

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/auth/me`, {
          credentials: "include",
        });
        if (isMounted) {
          setIsAuthenticated(response.ok);
        }
      } catch (error) {
        if (isMounted) {
          setIsAuthenticated(false);
        }
      }
    };

    checkAuth();
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");

    return () => {
      isMounted = false;
    };
  }, [isDark]);

  const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <select
      className="language-selector"
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
    >
      <option value="en">🇺🇸</option>
      <option value="es">🇲🇽</option>
      <option value="pt">🇧🇷</option>
    </select>
  );
};
  const toggleTheme = () => setIsDark((prev) => !prev);

  const ThemeToggle = () => (
    <button className="theme-toggle" onClick={toggleTheme}>
      {isDark? "☀️ ": "🌙" }
    </button>
  );

  return (
      <LanguageProvider>
        <BrowserRouter>
        <ThemeToggle />
        <LanguageSelector />
        <Routes>
          <Route
          path="/"
          element={isAuthenticated ? (<Navigate to="/app" replace />) : <Landing />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? (<Navigate to="/app" replace />) : (
              <div className="todo-app">
                <LogIn onLogin={() => setIsAuthenticated(true)} />
              </div>
            )}
          />
          <Route
            path="/signin"
            element={isAuthenticated ? (<Navigate to="/app" replace />) : (
              <div className="todo-app">
                <SignIn onLogin={() => setIsAuthenticated(true)} />
              </div>
            )}
          />
          <Route
            path="/forgot-password"
            element={isAuthenticated ? (<Navigate to="/app" replace />) : (
              <div className="todo-app">
                <ForgotPassword />
              </div>
            )}
          />
          <Route
            path="/Reset-password/:token"
            element={isAuthenticated ? (<Navigate to="/app" replace />) : (
              <div className="todo-app">
                <RecoveryPassword />
              </div>
            )}
          />
          <Route
            path="/app"
          element={isAuthenticated ? (<div className="todo-app kanban-app">
            <TodoList onLogout={handleLogout} />
              </div>) : (<Navigate to="/login" replace />)
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </BrowserRouter>
    </LanguageProvider>
  );      
}

export default App;
