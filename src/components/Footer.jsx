import { IconInstagram, IconTelegram, IconYoutube, IconDownload } from './Icons';
import { useApp } from '../context/AppContext';
import './Footer.css';

export default function Footer() {
  const { t } = useApp();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <a href="/" className="footer-logo" aria-label="Minxo TV — Bosh sahifa">
            <img src="/images/logo.png" alt="" className="footer-logo-img" width="48" height="48" />
            <span className="footer-wordmark">minxotv</span>
          </a>
          <p className="footer-desc">
            {t.footer.description}
          </p>
        </div>

        {/* Social + Download */}
        <div className="footer-actions">
          <div className="footer-socials">
            <a
              href="https://instagram.com/Minxo_tv"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-pill"
              aria-label="Instagram — @Minxo_tv"
            >
              <IconInstagram size={18} />
              <span>@Minxo_tv</span>
            </a>
            <a
              href="https://t.me/Minxo_Tv"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-pill"
              aria-label="Telegram — @Minxo_Tv"
            >
              <IconTelegram size={18} />
              <span>@Minxo_Tv</span>
            </a>
            <a
              href="https://youtube.com/@MinxoTV"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-pill"
              aria-label="YouTube — Minxo TV"
            >
              <IconYoutube size={18} />
              <span>YouTube</span>
            </a>
          </div>

          <button className="btn btn-primary footer-download-btn">
            <IconDownload size={18} />
            {t.footer.downloadApp}
          </button>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Minxo TV. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
