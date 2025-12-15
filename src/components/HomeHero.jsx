import React, { useState, useEffect } from "react";
import "../styles/HomeHero.css";

// 1. Define your 3 background images here
const heroImages = [
  "/image/car-ai.png",        // Image 1 (Current)
  "/image/car-ai2.png",     // Image 2 (Replace with your path)
  "/image/car-ai3.png"      // Image 3 (Replace with your path)
];

const HomeHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 2. Automatic Slideshow Logic (Change every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <section className="home-hero">
      
      {/* 3. Background Image Layers (For smooth fading) */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`hero-bg-layer ${index === currentSlide ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      ))}

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Content */}
      <div className="hero-content">
        <h1 className="hero-title">Unleash the Mutant Within.</h1>
        <p className="hero-subtext">
          Premium off-road accessories built for those who conquer every
          terrain. Rugged. Reliable. Ready for Anything.
        </p>
        <button className="hero-btn">
          Shop Now <span>&rarr;</span>
        </button>
      </div>

      {/* 4. The 3 Dots Navigation */}
      <div className="hero-dots">
        {heroImages.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default HomeHero;