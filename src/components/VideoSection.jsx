import React from "react";
import "../styles/VideoSection.css";

const videos = [
  {
    id: 1,
    title: "Ultimate Off-Road Bumper Test",
    src: "https://www.youtube.com/embed/cgloJmn3uqE",
  },
  {
    id: 2,
    title: "Off-Road Setup Transformation",
    src: "https://www.youtube.com/embed/-b7nD5FvWGA",
  },
  {
    id: 3,
    title: "Running Board Strength Challenge",
    src: "https://www.youtube.com/embed/AUSiU-FeM8M",
  },
];

const VideoSection = () => {
  return (
    <section className="video-section">
      <h2 className="video-title">
        The Ultimate <span>Off-Road Collection.</span>
      </h2>
      <p className="video-subtext">
        Discover ORM upgrades that deliver bold style, ultimate protection, and
        powerful performance for your Jeep and every off-road adventure.
      </p>

      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <div className="video-frame-wrapper">
              <iframe
                src={video.src}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <div className="video-overlay">
                <h3>{video.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoSection;
