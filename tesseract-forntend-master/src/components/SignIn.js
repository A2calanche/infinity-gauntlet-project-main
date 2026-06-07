import React, { useState } from "react";
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const validatePassword = (password) => {
  const errors = [];

  if (password.length < 8)
    errors.push("At least 8 characters");
  if (!/[A-Z]/.test(password))
    errors.push("At least one uppercase letter");
  if (!/[0-9]/.test(password))
    errors.push("At least one number");
  if (!/[@#$%.+\-*/!]/.test(password))
    errors.push("At least one special character (@#$%.+-*/!)");
  if (/012|123|234|345|456|567|678|789|890/.test(password))
    errors.push("No sequential numbers (123, 234...)");
  if (/000|111|222|333|444|555|666|777|888|999/.test(password))
    errors.push("No repeated numbers (111, 222...)");

  return errors;
};

const SignIn = ({ onShowLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);

  const passwordErrors = validatePassword(password);
  const passwordValid = password.length > 0 && passwordErrors.length === 0;
  const passwordMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordNoMatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (passwordErrors.length > 0 || passwordNoMatch) return;
  setError("");
  setLoading(true);

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Registration failed");
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

  const canSubmit = passwordValid && passwordMatch && name && email;

  return (
    <div className="auth-container">
      <h1 className="auth-title">Crear Cuenta</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="auth-input"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="auth-input"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* CONTRASEÑA */}
        <input
          className="auth-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setPasswordFocused(true)}
          style={{
            borderColor: password.length === 0
              ? "#5d0cff"
              : passwordValid
              ? "#28c840"
              : "#ff5f57",
          }}
        />

        {/* CHECKLIST DE REQUISITOS */}
        {(passwordFocused && password.length > 0) && (
          <div style={{
            background: "rgba(255,255,255,0.05)",
            borderRadius: "8px",
            padding: "10px 14px",
            textAlign: "left",
          }}>
            {[
              { rule: password.length >= 8, label: "At least 8 characters" },
              { rule: /[A-Z]/.test(password), label: "At least one uppercase letter" },
              { rule: /[0-9]/.test(password), label: "At least one number" },
              { rule: /[@#$%.+\-*/!]/.test(password), label: "At least one special character (@#$%.+-*/!)" },
              { rule: !/012|123|234|345|456|567|678|789|890/.test(password), label: "No sequential numbers (123, 234...)" },
              { rule: !/000|111|222|333|444|555|666|777|888|999/.test(password), label: "No repeated numbers (111, 222...)" },
            ].map((item, i) => (
              <p key={i} style={{
                fontSize: "12px",
                color: item.rule ? "#28c840" : "#ff5f57",
                margin: "3px 0",
              }}>
                {item.rule ? "✓" : "✗"} {item.label}
              </p>
            ))}
          </div>
        )}

        {/* CONFIRMAR CONTRASEÑA */}
        <div style={{ position: "relative" }}>
          <input
            className="auth-input"
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              borderColor: confirmPassword.length === 0
                ? "#5d0cff"
                : passwordMatch
                ? "#28c840"
                : "#ff5f57",
            }}
          />
          {confirmPassword.length > 0 && (
            <span style={{
              position: "absolute",
              right: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "18px",
            }}>
              {passwordMatch ? "✅" : "❌"}
            </span>
          )}
        </div>

        {passwordNoMatch && (
          <p style={{ color: "#ff5f57", fontSize: "12px", textAlign: "left", marginTop: "-8px" }}>
            Las contraseñas no coinciden
          </p>
        )}
        {passwordMatch && (
          <p style={{ color: "#28c840", fontSize: "12px", textAlign: "left", marginTop: "-8px" }}>
            Las contraseñas coinciden ✓
          </p>
        )}

        <button
          className="auth-button"
          type="submit"
          disabled={!canSubmit}
          style={{
            opacity: !canSubmit ? 0.5 : 1,
            cursor: !canSubmit ? "not-allowed" : "pointer",
          }}
        >
          Registrarse
        </button>
      </form>

      <div className="auth-footer">
        <p>¿Ya tienes cuenta?</p>
        <button type="button" className="auth-link-button" onClick={onShowLogin}>
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};

export default SignIn;