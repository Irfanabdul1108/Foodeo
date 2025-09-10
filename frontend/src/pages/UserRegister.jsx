import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import TextField from "../components/TextField";
import axios from "axios";
import "../styles/form.css";

const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/reg",
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error("User Registration failed:", error);
    }
  };

  return (
    <PageShell title="User Register" subtitle="Create an account to start ordering.">
      <form className="form" onSubmit={handleSubmit}>
        <TextField id="user-name" label="Name" placeholder="Your name" />
        <TextField
          id="user-email-reg"
          label="Email"
          type="email"
          placeholder="you@example.com"
        />
        <TextField
          id="user-password-reg"
          label="Password"
          type="password"
          placeholder="Create a password"
        />
        <button className="btn" type="submit">
          Create account
        </button>
        <div className="row">
          <span className="muted">Already have an account?</span>
          <Link to="/user/login" className="btn secondary">
            Login
          </Link>
        </div>
      </form>
    </PageShell>
  );
};

export default UserRegister;
