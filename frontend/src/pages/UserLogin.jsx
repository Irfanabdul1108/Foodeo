import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import TextField from "../components/TextField";
import "../styles/form.css";
import axios from "axios";

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        { email, password },
        { withCredentials: true }
      );

      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error("User Login failed:", error);
    }
  };

  return (
    <PageShell
      title="User Login"
      subtitle="Access your account to continue ordering."
    >
      <form className="form" onSubmit={handleSubmit}>
        <TextField
          id="user-email"
          label="Email"
          type="email"
          placeholder="you@example.com"
        />
        <TextField
          id="user-password"
          label="Password"
          type="password"
          placeholder="••••••••"
        />
        <button className="btn" type="submit">
          Login
        </button>
        <div className="row">
          <span className="muted">New here?</span>
          <Link to="/user/reg" className="btn secondary">
            Create account
          </Link>
        </div>
      </form>
    </PageShell>
  );
};

export default UserLogin;
