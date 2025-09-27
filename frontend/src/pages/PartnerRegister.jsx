import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import TextField from "../components/TextField";
import Toast from "../components/Toast";
import "../styles/form.css";
import axios from "axios";

const PartnerRegister = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = (name, email, password) => {
    const newErrors = {};
    
    if (!name) {
      newErrors.name = 'Restaurant name is required';
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
        "https://foodeo.onrender.com/api/auth/food-partner/reg",
        { name, email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        setToast({ message: response.data.message, type: 'success' });
        localStorage.setItem('isNewPartner', 'true');
        setTimeout(() => {
          navigate("/food-partner/login");
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
      <PageShell
        title="Partner Register"
        subtitle="Join our network of restaurants."
      >
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <TextField
              id="partner-name"
              label="Restaurant/Partner Name"
              placeholder="Business name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          <div>
            <TextField
              id="partner-email-reg"
              label="Email"
              type="email"
              placeholder="partner@example.com"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div>
            <TextField
              id="partner-password-reg"
              label="Password"
              type="password"
              placeholder="Create a password"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
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
    </>
  );
};

export default PartnerRegister;