import React, { useState, useEffect } from "react";
import "./App.css";
import LogIn from "./components/LogIn";
import SignIn from "./components/SignIn";
import TodoList from "./components/TodoList";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isDark, setIsDark] = useState(true);

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
          <TodoList />
        ) : showLogin ? (
          <LogIn
            onLogin={() => setIsAuthenticated(true)}
            onShowSignIn={() => setShowLogin(false)}
          />
        ) : (
          <SignIn onShowLogin={() => setShowLogin(true)} />
        )}
      </div>
    </>
  );
}

export default App;