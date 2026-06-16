import React, { useState } from "react";
import { Link } from "react-router-dom";

const LogIn = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <h1 className="auth-title">Iniciar Sesión</h1>

    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        className="auth-input"
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="auth-input"
        type="password"
        placeholder="Contraseña"
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
          {loading ? "Entrando..." : "Entrar"}
        </button>
        
      </form>

    <div className="auth-footer">
      <p>¿No tienes cuenta?</p>

      <Link to="/signin" className="auth-link-button">
        Crear cuenta
      </Link>
    </div>

    <div className="social-login">
      <p>También puedes iniciar sesión con</p>

      <button
        type="button"
        className="google-button"
      >
        Google
      </button>
    </div>
  </div>
);
};

export default LogIn;