import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const Landing = () => {
  const { t } = useLanguage();

  return (
    <div className="landing">
      <nav className="landing-nav">
        <span className="landing-logo">{t("landing.title")}</span>
        <div className="landing-nav-actions">
          <Link to="/login" className="landing-nav-link">
            {t("landing.signIn")}
          </Link>
          <Link to="/login" className="landing-button-primary landing-button-sm">
            {t("landing.getStarted")}
          </Link>
        </div>
      </nav>

      <section className="landing-hero">
        <span className="landing-eyebrow">Open source · MERN stack</span>
        <h1 className="landing-title">{t("landing.title")}</h1>
        <p className="landing-subtitle">{t("landing.subtitle")}</p>
        <div className="landing-cta">
          <Link to="/login" className="landing-button-primary">
            {t("landing.getStarted")}
          </Link>
          <Link to="/login" className="landing-button-secondary">
            {t("landing.signIn")}
          </Link>
        </div>
      </section>

      <section className="landing-preview">
        <div className="landing-preview-card">
          <div className="landing-preview-header">
            <span className="landing-dot"></span>
            <span className="landing-dot"></span>
            <span className="landing-dot"></span>
            <span className="landing-preview-header-title">{t("landing.previewTitle")}</span>
          </div>
          <div className="landing-preview-board">
            <div className="landing-preview-col">
              <span className="landing-preview-col-label">Pending</span>
              <div className="landing-preview-card-item">{t("landing.previewTask1")}</div>
            </div>
            <div className="landing-preview-col">
              <span className="landing-preview-col-label">Doing</span>
              <div className="landing-preview-card-item">{t("landing.previewTask2")}</div>
            </div>
            <div className="landing-preview-col">
              <span className="landing-preview-col-label">Done</span>
              <div className="landing-preview-card-item landing-preview-card-item--done">
                ✓ {t("landing.previewTask3")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-features">
        <h2 className="landing-section-title">{t("landing.featuresTitle")}</h2>
        <div className="landing-features-grid">
          {t("landing.features").map((feature) => (
            <div className="landing-feature-card" key={feature.title}>
              <div className="landing-feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-footer-cta">
        <h2>{t("landing.footerCtaTitle")}</h2>
        <Link to="/signin" className="landing-button-primary">
          {t("landing.footerCtaButton")}
        </Link>
      </section>
    </div>
  );
};

export default Landing;