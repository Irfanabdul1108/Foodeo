import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import axios from "axios";
import "../styles/create.css";

const CreateFood = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = (name, description, file) => {
    const newErrors = {};
    
    if (!name) {
      newErrors.name = 'Food name is required';
    }
    
    if (!description) {
      newErrors.description = 'Description is required';
    } else if (description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    if (!file) {
      newErrors.video = 'Video file is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const description = e.target.description.value;
    const file = e.target.video.files[0];

    const validationErrors = validateForm(name, description, file);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setToast({ message: 'Please fill all required fields correctly', type: 'error' });
      return;
    }

    setErrors({});

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("video", file);

    try {
      const res = await axios.post("https://foodeo.onrender.com/api/food/", formData, {
        withCredentials: true,
      });
      
      setToast({ message: 'Food reel created successfully!', type: 'success' });
      e.target.reset();
      setFileName("");
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setToast({ 
        message: error.response?.data?.message || "Failed to upload. Please try again.", 
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
      <div className="create-wrap">
        <div className="container">
          <div className="create-card">
            <div className="create-header">
              <h1 className="create-title">Create New Food Reel</h1>
              <p className="create-subtitle">
                Share your best dish with the community
              </p>
            </div>

            <form className="create-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="name" className="label">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  className="input"
                  type="text"
                  placeholder="e.g., Spicy Chicken Biryani"
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="field">
                <label htmlFor="description" className="label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="input textarea"
                  rows="5"
                  placeholder="Write a short, tasty description..."
                />
                {errors.description && <span className="error-text">{errors.description}</span>}
              </div>

              <div className="field">
                <label htmlFor="video" className="label">
                  Video
                </label>
                <div className="file-drop">
                  <input
                    id="video"
                    name="video"
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      setFileName(e.target.files?.[0]?.name || "")
                    }
                  />
                  <div className="file-ui">
                    <div className="file-icon" aria-hidden>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M4 16V8a2 2 0 0 1 2-2h6l4 4v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M14 6v2a2 2 0 0 0 2 2h2"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <div className="file-texts">
                      <p className="file-primary">
                        Click to upload or drag & drop
                      </p>
                      <p className="file-secondary">MP4, MOV up to 100MB</p>
                      {fileName && (
                        <p className="file-selected">Selected: {fileName}</p>
                      )}
                    </div>
                  </div>
                </div>
                {errors.video && <span className="error-text">{errors.video}</span>}
              </div>

              <div className="actions">
                <button className="btn" type="submit">
                  Publish
                </button>
                <button
                  className="btn secondary"
                  type="button"
                  onClick={() => setToast({ message: 'Draft saved locally', type: 'success' })}
                >
                  Save draft
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateFood;