import React from "react";
import "../styles/page.css";

const PageShell = ({ title, subtitle, children }) => (
  <div className="container main">
    <div className="auth-wrap">
      <div className="hero">
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
      </div>
      <div className="card">{children}</div>
    </div>
  </div>
);

export default PageShell;
