import React, { useState, useEffect } from "react";
import "../styles/HomeHero.css";
import { useNavigate } from "react-router-dom";

const heroImages = [
  "/image/car-ai.png",
  "/image/car-ai4.png",
  "/image/car-ai6.png",
];

const HomeHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products/thar");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="home-hero">
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`hero-bg-layer ${index === currentSlide ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      ))}
      <div className="overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">Unleash the Mutant Within.</h1>
        <p className="hero-subtext">
          Premium off-road accessories built for those who conquer every
          terrain. Rugged. Reliable. Ready for Anything.
        </p>
        <button className="hero-btn" onClick={handleShopNow}>
          Shop Now <span>&rarr;</span>
        </button>
      </div>
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
