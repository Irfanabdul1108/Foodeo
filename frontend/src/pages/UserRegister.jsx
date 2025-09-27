import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import TextField from "../components/TextField";
import Toast from "../components/Toast";
import axios from "axios";
import "../styles/form.css";

const UserRegister = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = (name, email, password) => {
    const newErrors = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const validationErrors = validateForm(name, email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setToast({ message: 'Please fill all required fields correctly', type: 'error' });
      return;
    }

    setErrors({});

    try {
      const response = await axios.post(
        "https://foodeo.onrender.com/api/auth/user/reg",
        { name, email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        setToast({ message: response.data.message, type: 'success' });
        localStorage.setItem('isNewUser', 'true');
        setTimeout(() => {
          navigate("/user/login");
        }, 1500);
      } else {
        setToast({ message: response.data.message, type: 'error' });
      }
    } catch (error) {
      setToast({ 
        message: error.response?.data?.message || "Registration failed. Please try again.", 
        type: 'error' 
      });
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <PageShell title="User Register" subtitle="Create an account to start ordering.">
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <TextField id="user-name" label="Name" placeholder="Your name" />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          <div>
            <TextField
              id="user-email-reg"
              label="Email"
              type="email"
              placeholder="you@example.com"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div>
            <TextField
              id="user-password-reg"
              label="Password"
              type="password"
              placeholder="Create a password"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
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
    </>
  );
};

export default UserRegister;