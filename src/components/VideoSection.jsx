import React, { useState } from "react";
import "../styles/VideoSection.css";
import { FaPlay, FaRegClock, FaShare } from "react-icons/fa";
import ormLogoSmall from "/image/car-ai.png";

const videos = [
  {
    id: 1,
    videoUrl:
      "https://www.youtube.com/embed/cgloJmn3uqE?rel=0&playsinline=1&modestbranding=1&enablejsapi=1",
    title: "Ultimate Off-Road",
    subtitle: "Bumper Test",
    bgImage: "https://img.youtube.com/vi/cgloJmn3uqE/maxresdefault.jpg",
    isGold: true,
  },
  {
    id: 2,
    videoUrl:
      "https://www.youtube.com/embed/-b7nD5FvWGA?rel=0&playsinline=1&modestbranding=1&enablejsapi=1",
    title: "Off-Road Setup",
    subtitle: "Transformation",
    bgImage: "https://img.youtube.com/vi/-b7nD5FvWGA/maxresdefault.jpg",
    isGold: false,
  },
  {
    id: 3,
    videoUrl:
      "https://www.youtube.com/embed/cgloJmn3uqE?rel=0&playsinline=1&modestbranding=1&enablejsapi=1",
    title: "Running Board",
    subtitle: "Strength Challenge",
    bgImage: "https://img.youtube.com/vi/cgloJmn3uqE/maxresdefault.jpg",
    isGold: false,
  },
];

const VideoSection = () => {
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [activeDot, setActiveDot] = useState(0);

  const handlePlay = (id) => setPlayingVideoId(id);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const cardWidth = e.target.firstChild.offsetWidth + 16; // card + gap
    const index = Math.round(scrollLeft / cardWidth);
    setActiveDot(index);
  };

  return (
    <section className="video-section">
      <div className="video-header-container">
        <h2 className="video-section-title">
          The Ultimate Off-<span className="highlight">Road Collection.</span>
        </h2>
        <p className="video-subtext">
          Discover ORM upgrades that deliver bold style, ultimate protection,
          and powerful performance for your Jeep and every off-road adventure.
        </p>
      </div>

      {/* DESKTOP GRID / MOBILE SCROLL */}
      <div className="video-grid" onScroll={handleScroll}>
        {videos.map((video) => (
          <div key={video.id} className="video-card-container">
            {playingVideoId === video.id ? (
              <div className="video-frame-wrapper">
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  playsInline
                  webkit-playsinline="true"
                  className="video-iframe"
                />
              </div>
            ) : (
              <div
                className="video-thumbnail-card"
                style={{ backgroundImage: `url(${video.bgImage})` }}
                onClick={() => handlePlay(video.id)}
              >
                <div className="video-card-overlay"></div>

                <div className="video-top-bar">
                  <div className="video-meta-left">
                    <img src={ormLogoSmall} alt="logo" className="small-logo" />
                    <span className="video-top-text">Watch now...</span>
                  </div>
                  <div className="video-meta-right">
                    <FaRegClock />
                    <FaShare />
                  </div>
                </div>

                <div className="play-button-wrapper">
                  <div className="youtube-play-btn">
                    <FaPlay className="play-icon" />
                  </div>
                </div>

                <div className="video-bottom-info">
                  <h3
                    className={`video-card-title ${
                      video.isGold ? "gold-text" : "white-text"
                    }`}
                  >
                    {video.title}
                    <br />
                    {video.subtitle}
                  </h3>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MOBILE DOTS */}
      <div className="mobile-dots">
        {videos.map((_, i) => (
          <span key={i} className={`dot ${i === activeDot ? "active" : ""}`} />
        ))}
      </div>
    </section>
  );
};

export default VideoSection;
