import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useGoogleSignInButton } from "../hooks/useGoogleSignInButton";
import { loginUser, registerUser, googleAuthLogin } from "../services/conection";

const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) errors.push("At least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("At least one uppercase letter");
  if (!/[0-9]/.test(password)) errors.push("At least one number");
  if (!/[@#$%.+\-*/!]/.test(password)) errors.push("At least one special character");
  if (/012|123|234|345|456|567|678|789|890/.test(password)) errors.push("No sequential numbers");
  if (/000|111|222|333|444|555|666|777|888|999/.test(password)) errors.push("No repeated numbers");
  return errors;
};

const AuthForm = ({ mode, onLogin }) => {
  const isSignIn = mode === "signin";
  const { t, language } = useLanguage();
  const googleButtonRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordErrors = isSignIn ? validatePassword(password) : [];
  const passwordValid = !isSignIn || (password.length > 0 && passwordErrors.length === 0);
  const passwordMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordNoMatch = confirmPassword.length > 0 && password !== confirmPassword;
  const canSubmit = isSignIn
    ? passwordValid && passwordMatch && name && email
    : true;

  const handleGoogleSuccess = useCallback(() => {
    onLogin();
    },
    [onLogin]);
  useGoogleSignInButton(googleButtonRef, language, handleGoogleSuccess, setError);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignIn && (passwordErrors.length > 0 || passwordNoMatch)) return;
    setError("");
    setLoading(true);
    try {
      if (isSignIn) {
        await registerUser(name, email, password);
      } else {
        await loginUser(email, password);
      }
      onLogin();
    } catch (err) {
      setError(err.message || "Connection error, try again later");
    } finally {
      setLoading(false);
    }
  };

  const T = isSignIn ? "signin" : "login";

  return (
    <div className="auth-container">
      <h1 className="auth-title">{t(`${T}.title`)}</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        {isSignIn && (
          <input
            className="auth-input"
            type="text"
            placeholder={t("signin.name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          className="auth-input"
          type="email"
          placeholder={t(`${T}.email`)}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder={t(`${T}.password`)}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => isSignIn && setPasswordFocused(true)}
          style={isSignIn ? {
            borderColor: password.length === 0 ? "#5d0cff" : passwordValid ? "#28c840" : "#ff5f57",
          } : undefined}
        />

        {isSignIn && passwordFocused && password.length > 0 && (
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "8px", padding: "10px 14px", textAlign: "left" }}>
            {[
              { rule: password.length >= 8, label: t("signin.passwordRules.minLength") },
              { rule: /[A-Z]/.test(password), label: t("signin.passwordRules.uppercase") },
              { rule: /[0-9]/.test(password), label: t("signin.passwordRules.number") },
              { rule: /[@#$%.+\-*/!]/.test(password), label: t("signin.passwordRules.special") },
              { rule: !/012|123|234|345|456|567|678|789|890/.test(password), label: t("signin.passwordRules.noSequential") },
              { rule: !/000|111|222|333|444|555|666|777|888|999/.test(password), label: t("signin.passwordRules.noRepeated") },
            ].map((item) => (
              <p key={item.label} style={{ fontSize: "12px", color: item.rule ? "#28c840" : "#ff5f57", margin: "3px 0" }}>
                {item.rule ? "✓" : "✗"} {item.label}
              </p>
            ))}
          </div>
        )}

        {isSignIn && (
          <div style={{ position: "relative" }}>
            <input
              className="auth-input"
              type="password"
              placeholder={t("signin.confirmPassword")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                borderColor: confirmPassword.length === 0 ? "#5d0cff" : passwordMatch ? "#28c840" : "#ff5f57",
              }}
            />
            {confirmPassword.length > 0 && (
              <span style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "18px" }}>
                {passwordMatch ? "✅" : "❌"}
              </span>
            )}
          </div>
        )}

        {isSignIn && passwordNoMatch && (
          <p style={{ color: "#ff5f57", fontSize: "12px", textAlign: "left", marginTop: "-8px" }}>
            {t("signin.passwordsNoMatch")}
          </p>
        )}
        {isSignIn && passwordMatch && (
          <p style={{ color: "#28c840", fontSize: "12px", textAlign: "left", marginTop: "-8px" }}>
            {t("signin.passwordsMatch")}
          </p>
        )}

        {error && (
          <p style={{ color: "var(--danger-a0)", fontSize: "13px", textAlign: "left" }}>
            ⚠️ {error}
          </p>
        )}

        <button
          className="auth-button"
          type="submit"
          disabled={!canSubmit || loading}
          style={{ opacity: !canSubmit || loading ? 0.6 : 1 }}
        >
          {loading ? t(`${T}.submitting`) : t(`${T}.submit`)}
        </button>

        <div className="divider" style={{ margin: "20px 0", textAlign: "center" }}>
          <span style={{ color: "var(--text-secondary)" }}>{t("login.orContinueWith") || "or"}</span>
        </div>

        <div ref={googleButtonRef} style={{ display: "flex", justifyContent: "center" }}></div>
      </form>

      <div className="auth-footer">
        {!isSignIn && (
          <Link to="/forgot-password" className="auth-link-button">
            {t("login.RecoveryPassword")}
          </Link>
        )}
        <p>
          {t(`${T}.${isSignIn ? "haveAccount" : "noAccount"}`)}{" "}
          <Link to={isSignIn ? "/login" : "/signin"} className="auth-link-button">
            {t(`${T}.${isSignIn ? "login" : "createAccount"}`)}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;