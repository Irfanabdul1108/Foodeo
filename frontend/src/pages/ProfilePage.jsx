import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/profile.css";
import axios from "axios";

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.foodpartnerprofile) {
          setProfile(res.data.foodpartnerprofile);
          setReels(res.data.fooditemsbyfoodpartner || []);
        } else {
          console.error("Invalid API response:", res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-error">
        <h2>Profile not found</h2>
        <Link to="/" className="btn secondary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-name">{profile.name}</h1>

        <div className="profile-buttons">
          <button className="btn primary" onClick={() => setShowContact(true)}>
            Contact
          </button>
          <button className="btn secondary" onClick={() => setShowInfo(true)}>
            Info
          </button>
        </div>
      </div>

      <div className="reels-section">
        <h2 className="section-title">Food Videos</h2>
        {reels.length === 0 ? (
          <p>No food videos uploaded yet.</p>
        ) : (
          <div className="reels-grid">
            {reels.map((reel) => (
              <div
                key={reel._id}
                className="reel-card"
                onClick={() => setSelectedVideo(reel.video)}
              >
                <video
                  className="reel-preview"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={reel.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="reel-overlay">
                  <p>{reel.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showContact && (
        <div className="popup-overlay" onClick={() => setShowContact(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3>Contact Food Partner</h3>
            <p>Email: {profile.email || "Not available"}</p>
            <button className="btn close" onClick={() => setShowContact(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {showInfo && (
        <div className="popup-overlay" onClick={() => setShowInfo(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3>Food Partner Info</h3>
            <p>
              Created At: {new Date(profile.createdAt).toLocaleString() || "N/A"}
            </p>
            <button className="btn close" onClick={() => setShowInfo(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {selectedVideo && (
        <div className="popup-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="popup-box video-box" onClick={(e) => e.stopPropagation()}>
            <video controls autoPlay>
              <source src={selectedVideo} type="video/mp4" />
            </video>
            <button className="btn close" onClick={() => setSelectedVideo(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
