import { useState, useEffect } from 'react';
import { IconX } from './Icons';
import { useApp } from '../context/AppContext';
import './LoginPrompt.css';

export default function LoginPrompt({ onClose }) {
  const { login, t } = useApp();
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneOrEmail) return;
    setLoading(true);
    try {
      await login({ phoneOrEmail, password });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal-close" onClick={onClose} aria-label={t.details.close}>
          <IconX size={20} />
        </button>

        <div className="login-modal-header">
          <img src="/images/logo.png" alt="Minxo TV" className="login-modal-logo" width="48" height="48" />
          <h2 id="modal-title" className="login-modal-title">{t.auth.profileTitle}</h2>
          <p className="login-modal-subtitle">{t.auth.profileSub}</p>
        </div>

        <form className="login-modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-identity">{t.auth.phoneOrEmail}</label>
            <input
              id="login-identity"
              type="text"
              placeholder="+998 90 123 45 67"
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
              autoFocus
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">{t.auth.password}</label>
            <input
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary login-submit-btn"
            disabled={loading}
          >
            {loading ? t.states.loading : t.auth.login}
          </button>
        </form>

        <div className="login-modal-footer">
          <p className="login-guest-note">{t.auth.guestNote}</p>
          <p style={{ marginTop: 8 }}>
            {t.auth.noAccount}{' '}
            <button type="button" className="login-link-btn" onClick={onClose}>
              {t.auth.register}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
