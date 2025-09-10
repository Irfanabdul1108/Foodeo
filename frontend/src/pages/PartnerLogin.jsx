import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import TextField from "../components/TextField";
import "../styles/form.css";
import axios from "axios";

const PartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/login",
        { email, password },
        { withCredentials: true }
      );

      console.log(response.data);
      navigate("/create");
    } catch (error) {
      console.error("Food-partner Login failed:", error);
    }
  };

  return (
    <PageShell title="Partner Login" subtitle="Manage your restaurant and orders.">
      <form className="form" onSubmit={handleSubmit}>
        <TextField
          id="partner-email"
          label="Email"
          type="email"
          placeholder="partner@example.com"
        />
        <TextField
          id="partner-password"
          label="Password"
          type="password"
          placeholder="••••••••"
        />
        <button className="btn" type="submit">
          Login
        </button>
        <div className="row">
          <span className="muted">New partner?</span>
          <Link to="/food-partner/reg" className="btn secondary">
            Register
          </Link>
        </div>
      </form>
    </PageShell>
  );
};

export default PartnerLogin;
