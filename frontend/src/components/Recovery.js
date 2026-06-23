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
    <div className="forgot-view">
      <div className="forgot-card">
        <h1>{t('RecoveryPasswordTitle')}</h1>

        {status === 'success' ? (
          <p className="forgot-feedback forgot-feedback--success">
            {t('RecoveryPasswordSuccess')}
          </p>
        ) : (
          <>
            <p className="forgot-subtitle">{t('RecoveryPasswordEmail')}</p>

            <form onSubmit={handleSubmit} noValidate>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                autoComplete="email"
                required
                disabled={status === 'loading'}
                className="forgot-input"
              />

              {status === 'error' && (
                <p className="forgot-feedback forgot-feedback--error">
                  {t('RecoveryPasswordError')}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="forgot-btn"
              >
                {status === 'loading'
                  ? t('RecoveryPasswordSubmitting')
                  : t('RecoveryPasswordSubmit')}
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