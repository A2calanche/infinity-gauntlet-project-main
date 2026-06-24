import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";


const ForgotPasswordView = () => {
  const { t } = useLanguage();
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

        try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/v1/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{t('forgot.title')}</h1>

        {status === 'success' ? (
          <p className="forgot-feedback forgot-feedback--success">
            {t('forgot.success')}
          </p>
        ) : (
          <>
            <p className="auth-subtitle">{t('forgot.email')}</p>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder= "Email"
                autoComplete="Email"
                required
                disabled={status === 'loading'}
                className="auth-input"
              />

              {status === 'error' && (
                <p className="forgot-feedback forgot-feedback--error">
                  {t('forgot.error')}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="auth-button"
              >
                {status === 'loading'
                  ? t('forgot.submitting')
                  : t('forgot.submit')}
              </button>
            </form>
          </>
        )}

        <Link to="/login" className="auth-link-button">
          {t('login.login')} 
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordView;
