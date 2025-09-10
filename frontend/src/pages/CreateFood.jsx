import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/create.css";

const CreateFood = () => {
    const navigate = useNavigate();
  const [fileName, setFileName] = useState("");

 // A function used for creating food
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("description", e.target.description.value);
    formData.append("video", e.target.video.files[0]);

    try {
      const res = await axios.post("http://localhost:3000/api/food/", formData, {
        withCredentials: true,
      });
      console.log(res.data);
      alert("Food reel created successfully!");
      e.target.reset();
      setFileName(""); 
      navigate('/')
    } catch (error) {
      console.error("Error uploading food reel:", error);
      alert("Failed to upload. Please try again.");
    }
  };

  return (
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
                required
              />
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
                required
              />
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
                  required
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
            </div>

            <div className="actions">
              <button className="btn" type="submit">
                Publish
              </button>
              <button
                className="btn secondary"
                type="button"
                onClick={() => alert("Draft saved locally (not implemented).")}
              >
                Save draft
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFood;
