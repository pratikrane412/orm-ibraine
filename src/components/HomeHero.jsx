import React, { useState, useEffect } from "react";
import "../styles/HomeHero.css";
import { useNavigate } from "react-router-dom";

// 1. Define Slides with Images, Titles, and Descriptions
const heroSlides = [
  {
    img: "/image/thar-banner.png",
    title: "Built for Extreme Adventures",
    subtext:
      "Upgrade your Mahindra Thar with premium off-road accessories designed for durability, protection, and rugged performance—perfect for conquering mountains.",
    link: "/collections/thar",
  },
  {
    img: "/image/car-ai4.png", // Replace with Maruti Jimny image path
    title: "Compact Size Mighty Off-Road Power.",
    subtext:
      "Equip your Jimny with high-performance off-roading accessories engineered for tough terrains—enhancing capability, style, and protection while maintaining its lightweight adventure.",
    link: "/collections/jimny",
  },
  {
    img: "/image/hilux-ban.png",
    title: "Dominate Every Terrain",
    subtext:
      "Transform your Toyota Hilux into the ultimate off-road machine with heavy-duty accessories built for strength, utility, and endurance—ready for dunes.",
    link: "/collections/hilux",
  },
];

const HomeHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate(heroSlides[currentSlide].link);
    window.scrollTo(0, 0);
  };

  // Automatic Slideshow Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // 6 seconds for better reading time
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="home-hero">
      {/* Background Image Layers */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`hero-bg-layer ${index === currentSlide ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.img})` }}
        ></div>
      ))}

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Content Area - Using Key to trigger animation on slide change */}
      <div className="hero-content" key={currentSlide}>
        <h1 className="hero-title">{heroSlides[currentSlide].title}</h1>
        <p className="hero-subtext">{heroSlides[currentSlide].subtext}</p>
        <button className="hero-btn" onClick={handleShopNow}>
          Shop Now <span>&rarr;</span>
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="hero-dots">
        {heroSlides.map((_, index) => (
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
