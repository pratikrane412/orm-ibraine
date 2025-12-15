import React, { useState } from "react";
import "../styles/VideoSection.css";
import { FaPlay, FaRegClock, FaShare } from "react-icons/fa"; 
import ormLogoSmall from "/image/car-ai.png"; // Your logo

const videos = [
  {
    id: 1,
    // PASTE YOUR 1ST YOUTUBE LINK HERE (Ensure it is the /embed/ link)
    videoUrl: "https://www.youtube.com/embed/cgloJmn3uqE", 
    title: "Ultimate Off-Road",
    subtitle: "Bumper Test",
    bgImage: "https://img.youtube.com/vi/cgloJmn3uqE/maxresdefault.jpg", // Auto-fetch thumb
    isGold: true,
  },
  {
    id: 2,
    // PASTE YOUR 2ND YOUTUBE LINK HERE
    videoUrl: "https://www.youtube.com/embed/-b7nD5FvWGA", 
    title: "Off-Road Setup",
    subtitle: "Transformation",
    bgImage: "https://img.youtube.com/vi/-b7nD5FvWGA/maxresdefault.jpg",
    isGold: false,
  },
  {
    id: 3,
    // PASTE YOUR 3RD YOUTUBE LINK HERE
    videoUrl: "https://www.youtube.com/embed/cgloJmn3uqE", 
    title: "Running Board",
    subtitle: "Strength Challenge",
    bgImage: "https://img.youtube.com/vi/cgloJmn3uqE/maxresdefault.jpg",
    isGold: false,
  },
];

const VideoSection = () => {
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const handlePlay = (id) => {
    setPlayingVideoId(id);
  };

  return (
    <section className="video-section">
      <div className="video-header-container">
        <h2 className="video-section-title">
          The Ultimate Off-<span className="highlight">Road Collection.</span>
        </h2>
        <p className="video-subtext">
          Discover ORM upgrades that deliver bold style, ultimate protection, and
          powerful performance for your Jeep and every off-road adventure.
        </p>
      </div>

      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card-container">
            {playingVideoId === video.id ? (
              // --- ACTIVE VIDEO MODE (No Autoplay) ---
              <div className="video-frame-wrapper">
                <iframe
                  src={video.videoUrl} // No '?autoplay=1' here
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-iframe"
                ></iframe>
              </div>
            ) : (
              // --- THUMBNAIL MODE ---
              <div 
                className="video-thumbnail-card"
                style={{ backgroundImage: `url(${video.bgImage})` }}
                onClick={() => handlePlay(video.id)}
              >
                <div className="video-card-overlay"></div>

                {/* TOP BAR */}
                <div className="video-top-bar">
                  <div className="video-meta-left">
                    <img src={ormLogoSmall} alt="logo" className="small-logo" />
                    <span className="video-top-text">Watch now...</span>
                  </div>
                  
                  <div className="video-meta-right">
                    <div className="meta-icon-box">
                      <FaRegClock className="meta-icon" />
                      <span>Watch</span>
                    </div>
                    <div className="meta-icon-box">
                      <FaShare className="meta-icon" />
                      <span>Share</span>
                    </div>
                  </div>
                </div>

                {/* PLAY BUTTON */}
                <div className="play-button-wrapper">
                  <div className="youtube-play-btn">
                    <FaPlay className="play-icon" />
                  </div>
                </div>

                {/* BOTTOM TITLE */}
                <div className="video-bottom-info">
                  <h3 className={`video-card-title ${video.isGold ? "gold-text" : "white-text"}`}>
                    {video.title} <br /> {video.subtitle}
                  </h3>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoSection;