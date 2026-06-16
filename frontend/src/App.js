import React, { useState, useEffect } from "react";
import "./App.scss";
import Landing from "./components/Landing";
import LogIn from "./components/LogIn";
import SignIn from "./components/SignIn";
import TodoList from "./components/TodoList";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [isDark, setIsDark] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <select
      className="language-selector"
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
    >
      <option value="en">🇺🇸 EN</option>
      <option value="es">🇲🇽 ES</option>
      <option value="pt">🇧🇷 PT</option>
    </select>
  );
};
  const toggleTheme = () => setIsDark((prev) => !prev);

  const ThemeToggle = () => (
    <button className="theme-toggle" onClick={toggleTheme}>
      {isDark
        ? <><span role="img" aria-label="sun">☀️</span></>
        : <><span role="img" aria-label="moon">🌙</span></>
      }
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
            path="/app"
          element={isAuthenticated ? (<div className="todo-app">
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
