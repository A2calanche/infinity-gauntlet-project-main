import React, { useState } from "react";

const LogIn = ({ onLogin, onShowSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });
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

      <button className="auth-button" type="submit">
        Entrar
      </button>
    </form>

    <div className="auth-footer">
      <p>¿No tienes cuenta?</p>

      <button
        type="button"
        className="auth-link-button"
        onClick={onShowSignIn}
      >
        Crear cuenta
      </button>
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