import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const Landing = () => {
  const { t } = useLanguage();
  return (
    <div className="landing">
      <section className="landing-hero">
        <h1 className="landing-title">{t("landing.title")}</h1>
        <p className="landing-subtitle">{t("landing.subtitle")}</p>
        <div className="landing-cta">
          <Link to="/login" className="auth-button landing-button-primary">
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
            <span className="landing-dot" style={{ background: "#ff5f57" }}></span>
            <span className="landing-dot" style={{ background: "#febc2e" }}></span>
            <span className="landing-dot" style={{ background: "#28c840" }}></span>
          </div>
          <div className="landing-preview-body">
            <h3>{t("landing.previewTitle")}</h3>
            <div className="landing-preview-row" style={{ background: "linear-gradient(90deg, var(--primary-a0) 0%, var(--primary-a20) 100%)" }}>
              {t("landing.previewTask1")}
            </div>
            <div className="landing-preview-row" style={{ background: "linear-gradient(90deg, var(--primary-a10) 0%, var(--primary-a30) 100%)" }}>
              {t("landing.previewTask2")}
            </div>
            <div className="landing-preview-row landing-preview-done" style={{ background: "linear-gradient(90deg, var(--info-a0) 0%, var(--info-a10) 100%)" }}>
              ✓ {t("landing.previewTask3")}
            </div>
          </div>
        </div>
      </section>

      <section className="landing-features">
        <h2 className="landing-section-title">{t("landing.featuresTitle")}</h2>
        <div className="landing-features-grid">
          {t("landing.features").map((feature, i) => (
            <div className="landing-feature-card" key={i}>
              <div className="landing-feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-footer-cta">
        <h2>{t("landing.footerCtaTitle")}</h2>
        <Link to="/signin" className="auth-button landing-button-primary">
          {t("landing.footerCtaButton")}
        </Link>
      </section>
    </div>
  );
};


export default Landing;