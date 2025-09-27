import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import TextField from "../components/TextField";
import Toast from "../components/Toast";
import "../styles/form.css";
import axios from "axios";

const PartnerLogin = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const isNewPartner = localStorage.getItem('isNewPartner');
    if (isNewPartner === 'true') {
      setToast({ message: 'Please login to continue', type: 'success' });
      localStorage.removeItem('isNewPartner');
    }
  }, []);

  const validateForm = (email, password) => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    const validationErrors = validateForm(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setToast({ message: 'Please fill all required fields correctly', type: 'error' });
      return;
    }

    setErrors({});

    try {
      const response = await axios.post(
        "https://foodeo.onrender.com/api/auth/food-partner/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        setToast({ message: response.data.message, type: 'success' });
        setTimeout(() => {
          navigate("/create");
        }, 1500);
      } else {
        setToast({ message: response.data.message, type: 'error' });
      }
    } catch (error) {
      setToast({ 
        message: error.response?.data?.message || "Login failed. Please try again.", 
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
      <PageShell title="Partner Login" subtitle="Manage your restaurant and orders.">
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <TextField
              id="partner-email"
              label="Email"
              type="email"
              placeholder="partner@example.com"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div>
            <TextField
              id="partner-password"
              label="Password"
              type="password"
              placeholder="••••••••"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
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
    </>
  );
};

export default PartnerLogin;