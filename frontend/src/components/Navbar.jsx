import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = ({ onToggle, theme }) => {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="brand">
          <span className="brand-badge" />
          <Link
            to="/"
            className="nav-link"
            id='head'
            style={{ border: "none", padding: 0 }}
          >
            Foodeo
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/user/login" className="nav-link">
            User Login
          </Link>
          <Link to="/user/reg" className="nav-link">
            User Register
          </Link>
          <Link to="/food-partner/login" className="nav-link">
            Partner Login
          </Link>
          <Link to="/food-partner/reg" className="nav-link">
            Partner Register
          </Link>
          <button
            className="theme-toggle"
            onClick={onToggle}
            aria-label="Toggle theme"
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "var(--primary)",
              }}
            />
            {theme === "dark" ? "Dark" : "Light"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
