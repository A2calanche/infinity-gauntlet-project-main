import React, { useState, useEffect } from "react";
import "./App.scss";
import LogIn from "./components/LogIn";
import SignIn from "./components/SignIn";
import TodoList from "./components/TodoList";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState(true);
  const [isDark, setIsDark] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setIsAuthenticated(false);
};

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDark
          ? <><span role="img" aria-label="sun">☀️</span> Light</>
          : <><span role="img" aria-label="moon">🌙</span> Dark</>
        }
      </button>

      <div className="todo-app">
        {isAuthenticated ? (
          <TodoList onLogout={handleLogout}/>
        ) : showLogin ? (
          <LogIn
            onLogin={() => setIsAuthenticated(true)}
            onShowSignIn={() => setShowLogin(false)}
          />
        ) : (
          <SignIn onShowLogin={() => setShowLogin(true)} onLogin={() => setIsAuthenticated(true)} />
        )}
      </div>
    </>
  );
}

export default App;
