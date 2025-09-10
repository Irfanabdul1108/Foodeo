import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import TextField from "../components/TextField";
import "../styles/form.css";
import axios from "axios";

const PartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/reg",
        { name, email, password },
        { withCredentials: true }
      );

      console.log(response.data);
      navigate("/create");
    } catch (error) {
      console.error("Food-partner Registration failed:", error);
    }
  };

  return (
    <PageShell
      title="Partner Register"
      subtitle="Join our network of restaurants."
    >
      <form className="form" onSubmit={handleSubmit}>
        <TextField
          id="partner-name"
          label="Restaurant/Partner Name"
          placeholder="Business name"
        />
        <TextField
          id="partner-email-reg"
          label="Email"
          type="email"
          placeholder="partner@example.com"
        />
        <TextField
          id="partner-password-reg"
          label="Password"
          type="password"
          placeholder="Create a password"
        />
        <button className="btn" type="submit">
          Create partner account
        </button>
        <div className="row">
          <span className="muted">Already a partner?</span>
          <Link to="/food-partner/login" className="btn secondary">
            Login
          </Link>
        </div>
      </form>
    </PageShell>
  );
};

export default PartnerRegister;
