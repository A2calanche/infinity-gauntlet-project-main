import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const LogIn = ({ onLogin }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [googleError, setGoogleError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const googleButtonRef = useRef(null);

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

  const handleGoogleResponse = async (response) => {
    if (!response?.credential) {
      setGoogleError("Google authentication failed");
      return;
    }

    try {
      const backendResponse = await fetch(`${process.env.REACT_APP_API_URL}/v1/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await backendResponse.json();
      if (!backendResponse.ok) {
        setGoogleError(data.message || "Google login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLogin();
    } catch (error) {
      setGoogleError("Connection error, try again later");
    }
  };

  useEffect(() => {
    const renderGoogleButton = () => {
      if (!window.google?.accounts?.id || !googleButtonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        ux_mode: "popup",
      });

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "rectangular",
      });

      setGoogleLoaded(true);
    };

    if (window.google?.accounts?.id) {
      renderGoogleButton();
      return;
    }

    if (document.getElementById("google-client-script")) {
      const waitForGoogle = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(waitForGoogle);
          renderGoogleButton();
        }
      }, 100);
      return () => clearInterval(waitForGoogle);
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.id = "google-client-script";
    script.async = true;
    script.defer = true;
    script.onload = renderGoogleButton;
    document.body.appendChild(script);
  }, []);

  const handleGoogleSignIn = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      setGoogleError("Google sign-in is not ready yet");
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
        
      </form>

    <div className="auth-footer">
      <p>{t("login.noAccount")}</p>

      <Link to="/signin" className="auth-link-button">
        {t("login.createAccount")}
      </Link>
    </div>

    <div className="social-login">
      <p>{t("login.orContinueWith")}</p>
      <div ref={googleButtonRef} className="google-button-container"></div>
      <button
        type="button"
        className="google-button"
        onClick={handleGoogleSignIn}
        disabled={!googleLoaded}
        style={{ opacity: googleLoaded ? 1 : 0.6, cursor: googleLoaded ? "pointer" : "not-allowed" }}
      >
        {t("login.google")}
      </button>
      {googleError && (
        <p style={{ color: "var(--danger-a0)", fontSize: "13px", textAlign: "left" }}>
          ⚠️ {googleError}
        </p>
      )}
    </div>
  </div>
);
};

export default LogIn;