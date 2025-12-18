import React, { useState } from "react";
import "../styles/ProductVideoSection.css";
import { FaPlay, FaRegClock, FaShare } from "react-icons/fa";
import ormLogoSmall from "/image/car-ai.png"; 

// Helper function to get YouTube ID from any YouTube URL
const getYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const ProductVideoSection = ({ videoUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Extract ID from the backend URL
  const videoId = getYouTubeId(videoUrl);
  
  // If no video is provided in backend, don't render this section
  if (!videoId) return null;

  // Auto-generate thumbnail from YouTube ID
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section className="product-video-section">
      <div className="single-video-card">
        {isPlaying ? (
          <div className="pvs-frame-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="pvs-iframe"
            ></iframe>
          </div>
        ) : (
          <div 
            className="pvs-thumbnail"
            style={{ backgroundImage: `url(${thumbnailUrl})` }}
            onClick={() => setIsPlaying(true)}
          >
            {/* Dark Overlay */}
            <div className="pvs-overlay"></div>

            {/* Top Bar */}
            <div className="pvs-top-bar">
              <div className="pvs-meta-left">
                <img src={ormLogoSmall} alt="logo" className="pvs-logo" />
                <span className="pvs-top-text">Watch Product Demo</span>
              </div>
              
              <div className="pvs-meta-right">
                <div className="pvs-icon-box">
                  <FaRegClock /> <span>Watch</span>
                </div>
                <div className="pvs-icon-box">
                  <FaShare /> <span>Share</span>
                </div>
              </div>
            </div>

            {/* Play Button */}
            <div className="pvs-play-btn">
              <FaPlay />
            </div>

            {/* Bottom Title */}
            <div className="pvs-bottom-info">
              <h2 className="pvs-title">
                Performance <br /> <span>Test & Review</span>
              </h2>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductVideoSection;