import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useGoogleSignInButton } from "../hooks/useGoogleSignInButton";


const LogIn = ({ onLogin }) => {
  const { t, language } = useLanguage();
  const googleButtonRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useGoogleSignInButton(googleButtonRef, language, onLogin, setError);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLogin();

    } catch (error) {
      setError("Connection error, try again later");
    } finally {
      setLoading(false);
    }
  };

 
  return (
  <div className="auth-container">
    <h1 className="auth-title">{t("login.title")}</h1>

    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        className="auth-input"
        type="email"
        placeholder={t("login.email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="auth-input"
        type="password"
        placeholder={t("login.password")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
          <p style={{ color: "var(--danger-a0)", fontSize: "13px", textAlign: "left" }}>
            ⚠️ {error}
          </p>
        )}

      <button
          className="auth-button"
          type="submit"
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? t("login.submitting") : t("login.submit")}
        </button>

      <div className="divider" style={{ margin: "20px 0", textAlign: "center" }}>
        <span style={{ color: "var(--text-secondary)" }}>{t("login.orContinueWith") || "or"}</span>
      </div>

      <div ref={googleButtonRef} style={{ display: "flex", justifyContent: "center" }}></div>
        
      </form>
    <div className="auth-footer">
        <Link to="/forgot-password" className="auth-link-button">
          {t("login.RecoveryPassword")}
        </Link>
      <p>{t("login.noAccount")}{" "}
      <Link to="/signin" className="auth-link-button">
        {t("login.createAccount")}
      </Link>
      </p>
    </div>  
  </div>
);
};

export default LogIn;