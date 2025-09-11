import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/reels.css";

const ReelsHome = () => {
  const [reelsData, setReelsData] = useState([]);
  const [currentReel, setCurrentReel] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const reelsContainerRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [activeTab, setActiveTab] = useState("feed");
  const [likedIds, setLikedIds] = useState(new Set());
  const [savedIds, setSavedIds] = useState(new Set());
  const [counts, setCounts] = useState({}); 
  const [savingIds, setSavingIds] = useState(new Set()); 
  const videoRefs = useRef([]);
  const navigate = useNavigate();

  const fetchReels = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/food/", {
        withCredentials: true,
      });

      if (res.data.fooditems && Array.isArray(res.data.fooditems)) {
        const items = res.data.fooditems;
        setReelsData(items);

        const nextCounts = {};
        items.forEach((it) => {
          nextCounts[it._id] = {
            likes: it.likeCount ?? 0,
            saves: it.saveCount ?? 0,
          };
        });
        setCounts(nextCounts);
      } else {
          alert('login as user or food partner to view reels');
        console.error("Invalid API response for reels:", res.data);
      }
    } catch (err) {
      console.error("API fetch error (reels):", err);
    }
  }, []);

  const fetchSavedIds = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/food/savedIds", {
        withCredentials: true,
      });
      const ids = Array.isArray(res.data.savedIds) ? res.data.savedIds : [];
      setSavedIds(new Set(ids.map((x) => String(x))));
    } catch (err) {
      setSavedIds(new Set());
    }
  }, []);
  useEffect(() => {
    fetchReels();
    fetchSavedIds();
  }, [fetchReels, fetchSavedIds]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === currentReel) {
        video
          .play()
          .catch((err) => console.log("Autoplay blocked or error:", err));
      } else {
        try {
          video.pause();
          video.currentTime = 0;
        } catch (e) {}
      }
    });
  }, [currentReel]);

  const handleScroll = (e) => {
    const container = reelsContainerRef.current;
    if (!container) return;
    const scrollTop = container.scrollTop;
    const itemHeight = container.clientHeight || 1;
    const newIndex = Math.round(scrollTop / itemHeight);
    if (newIndex !== currentReel && newIndex >= 0 && newIndex < reelsData.length) {
      setCurrentReel(newIndex);
    }
  };

  const scrollToReel = (index) => {
    const container = reelsContainerRef.current;
    if (container) {
      container.scrollTo({
        top: index * container.clientHeight,
        behavior: "smooth",
      });
    }
  };

  const handleInfoClick = () => {
    setShowDescription((s) => !s);
  };

  const handleVisitStore = (id) => {
    navigate(`/food-partner/${id}`);
  };

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;
    if (isUpSwipe && currentReel < reelsData.length - 1) {
      scrollToReel(currentReel + 1);
    }
    if (isDownSwipe && currentReel > 0) {
      scrollToReel(currentReel - 1);
    }
  };

  const feedList = activeTab === "feed" ? reelsData : reelsData.filter((r) => savedIds.has(String(r._id)));
  async function likevideo(id) {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/food/like",
        { foodid: id },
        { withCredentials: true }
      );

      if (res.data && typeof res.data.likeCount === "number") {
        setCounts((c) => ({
          ...c,
          [id]: {
            likes: res.data.likeCount,
            saves: c[id]?.saves ?? 0,
          },
        }));
      }

      if (res.data && typeof res.data.liked === "boolean") {
        if (res.data.liked) setLikedIds((prev) => new Set(prev).add(id));
        else setLikedIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
      }
    } catch (err) {
      console.error("Like error:", err);
    }
  }

  async function savevideo(id) {
    if (savingIds.has(id)) return;
    const currentlySaved = savedIds.has(String(id));
    const prevCount = counts[id]?.saves ?? 0;
    setSavingIds((s) => new Set(s).add(id));
    setCounts((c) => ({
      ...c,
      [id]: {
        likes: c[id]?.likes ?? 0,
        saves: Math.max(0, (c[id]?.saves ?? 0) + (currentlySaved ? -1 : 1)),
      },
    }));
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (currentlySaved) next.delete(String(id));
      else next.add(String(id));
      return next;
    });

    try {
      const res = await axios.post(
        "http://localhost:3000/api/food/save",
        { foodid: id },
        { withCredentials: true }
      );

      if (res.data && typeof res.data.saveCount === "number") {
        setCounts((c) => ({
          ...c,
          [id]: {
            likes: c[id]?.likes ?? 0,
            saves: res.data.saveCount,
          },
        }));
      }

      if (res.data && typeof res.data.saved === "boolean") {
        setSavedIds((prev) => {
          const next = new Set(prev);
          if (res.data.saved) next.add(String(id));
          else next.delete(String(id));
          return next;
        });
      }
    } catch (err) {
      console.error("Error saving video:", err);
      setCounts((c) => ({
        ...c,
        [id]: {
          likes: c[id]?.likes ?? 0,
          saves: prevCount,
        },
      }));
      setSavedIds((prev) => {
        const next = new Set(prev);
        if (currentlySaved) next.add(String(id));
        else next.delete(String(id));
        return next;
      });
    } finally {
      setSavingIds((s) => {
        const next = new Set(s);
        next.delete(id);
        return next;
      });
    }
  }

  return (
    <div
      className="reels-container"
      ref={reelsContainerRef}
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="reels-tabs">
        <button
          className={`tab ${activeTab === "feed" ? "active" : ""}`}
          onClick={() => setActiveTab("feed")}
        >
          Feed
        </button>
        <button
          className={`tab ${activeTab === "saved" ? "active" : ""}`}
          id="saved"
          onClick={() => setActiveTab("saved")}
        >
          Saved
        </button>
      </div>

      {feedList.map((reel, index) => (
        <div
          key={reel._id}
          className={`reel-item ${index === currentReel ? "active" : ""}`}
        >
          <div className="video-container">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="reel-video"
              muted
              loop
              playsInline
              preload="metadata"
              autoPlay
            >
              <source src={reel.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="reel-info-left">
              <div className="store-info">
                <h1 className="food-name">{reel.name}</h1>
              </div>
              <button
                className="visit-store-btn"
                onClick={() => handleVisitStore(reel.foodpartner)}
              >
                Visit Store
              </button>
            </div>

            <div className="reel-actions">
              <button
                className={`circle-btn ${likedIds.has(reel._id) ? "active" : ""}`}
                onClick={() => likevideo(reel._id)}
                aria-label="Like"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>
              <span className="count">{counts[reel._id]?.likes ?? 0}</span>

              <button
                className={`circle-btn ${savedIds.has(String(reel._id)) ? "active" : ""}`}
                onClick={() => savevideo(reel._id)}
                aria-label="Save"
                disabled={savingIds.has(reel._id)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 4h12a2 2 0 0 1 2 2v14l-8-4-8 4V6a2 2 0 0 1 2-2z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>
              <span className="count">{counts[reel._id]?.saves ?? 0}</span>

              <button className="info-icon" onClick={handleInfoClick} aria-label="Show description">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className={`description-sheet ${showDescription ? "show" : ""}`}>
              <div className="description-content">
                <h4>{reel.name}</h4>
                <p>{reel.description}</p>
                <button className="close-description" onClick={() => setShowDescription(false)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="reel-indicators">
        {reelsData.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentReel ? "active" : ""}`}
            onClick={() => scrollToReel(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ReelsHome;
