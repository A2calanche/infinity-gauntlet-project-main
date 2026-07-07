import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
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


const RecoveryPassword = () => {
  const { t } = useLanguage();
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword]       = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [status, setStatus]           = useState('idle');
  const [error, setError]             = useState('');

  const passwordErrors  = validatePassword(password);
  const passwordValid   = password.length > 0 && passwordErrors.length === 0;
  const passwordMatch   = confirmPassword.length > 0 && password === confirmPassword;
  const passwordNoMatch = confirmPassword.length > 0 && password !== confirmPassword;
  const canSubmit       = passwordValid && passwordMatch;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError('');
    setStatus('loading');

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/v1/auth/reset-password/${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.status === 400 || res.status === 410) {
        setError(t('recovery.expired'));
        setStatus('error');
        return;
      }
      if (!res.ok) {
        setError(t('recovery.generic'));
        setStatus('error');
        return;
      }
      setStatus('success');
    } catch (err) {
      setError(t('recovery.generic'));
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="auth-container">
        <h1 className="auth-title">{t('recovery.title')}</h1>
        <p style={{ color: 'var(--success-a0)', marginBottom: '20px' }}>
          {t('recovery.success')}
        </p>
        <button className="auth-button" onClick={() => navigate('/login')}>
          {t('recovery.login')}
        </button>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h1 className="auth-title">{t('recovery.title')}</h1>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <input
          className="auth-input"
          type="password"
          placeholder={t('recovery.passwordLabel')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setPasswordFocused(true)}
          disabled={status === 'loading'}
          style={{
            borderColor: password.length === 0
              ? '#5d0cff'
              : passwordValid ? '#28c840' : '#ff5f57',
          }}
        />{(passwordFocused && password.length > 0) && (
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '8px',
            padding: '10px 14px',
            textAlign: 'left',
          }}>
            {[
              { rule: password.length >= 8,                                               label: t('signin.passwordRules.minLength') },
              { rule: /[A-Z]/.test(password),                                             label: t('signin.passwordRules.uppercase') },
              { rule: /[0-9]/.test(password),                                             label: t('signin.passwordRules.number') },
              { rule: /[@#$%.+\-*/!]/.test(password),                                    label: t('signin.passwordRules.special') },
              { rule: !/012|123|234|345|456|567|678|789|890/.test(password),             label: t('signin.passwordRules.noSequential') },
              { rule: !/000|111|222|333|444|555|666|777|888|999/.test(password),         label: t('signin.passwordRules.noRepeated') },
            ].map((item) => (
              <p key={item.label} style={{
                fontSize: '12px',
                color: item.rule ? '#28c840' : '#ff5f57',
                margin: '3px 0',
              }}>
                {item.rule ? '✓' : '✗'} {item.label}
              </p>
            ))} </div>

        )}
        <input
          className="auth-input"
          type="password"
          placeholder={t('recovery.confirmLabel')}
          value={confirmPassword}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={status === 'loading'}
            style={{
              borderColor: confirmPassword.length === 0
                ? '#5d0cff'
                : passwordMatch ? '#28c840' : '#ff5f57',
            }}
          />
          {confirmPassword.length > 0 && (
            <span style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '18px',
            }}>
            </span>
          )}

        {passwordNoMatch && (
          <p style={{ color: '#ff5f57', fontSize: '12px', textAlign: 'left', marginTop: '-8px' }}>
            {t('signin.passwordsNoMatch')}
          </p>
        )}
        {passwordMatch && (
          <p style={{ color: '#28c840', fontSize: '12px', textAlign: 'left', marginTop: '-8px' }}>
            {t('signin.passwordsMatch')}
          </p>
        )}

        {error && (
          <p style={{ color: 'var(--danger-a0)', fontSize: '13px', textAlign: 'left' }}>
            ⚠️ {error}
          </p>
        )}

        <button className="auth-button" type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? t('recovery.submitting') : t('recovery.submit')}
        </button>
      </form>

      <div className="auth-footer">
        <Link to="/login" className="auth-link-button">
          {t('recovery.login')}
        </Link>
      </div>
    </div>
  );
};

export default RecoveryPassword;