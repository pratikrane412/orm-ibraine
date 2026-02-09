import React, { useState, useEffect } from "react";
import "../styles/TechSpecs.css";
import { FaChevronRight } from "react-icons/fa";

const carData = {
  Scorpio: { img: "/image/p.png", bgText: "SCORPIO" },
  "Suzuki Jimny": { img: "/image/y.png", bgText: "JIMNY" },
  "Toyota Hilux": { img: "/image/w.png", bgText: "HILUX" },
  "Toyota Fortuner": { img: "/image/t.png", bgText: "FORTUNER" },
  "Range Rover Defender": { img: "/image/e.png", bgText: "DEFENDER" },
  "Mahindra Thar & Roxx": { img: "/image/r.png", bgText: "THAR" },
  "Jeep Rubicon Wrangler": { img: "/image/i.png", bgText: "WRANGLER" },
};

const hotspots = [
  {
    id: 1,
    x: 33,
    y: 47,
    title: "Advanced Suspension",
    desc: "Premium off-road suspension system designed for maximum ground clearance and superior handling on any terrain.",
    detailImg: "/image/gg3.png",
  },
  {
    id: 2,
    x: 43,
    y: 21,
    title: "LED Vision System",
    desc: "High-intensity LED headlights with adaptive beam technology for enhanced visibility in all weather conditions.",
    detailImg: "/image/gg3.png",
  },
  {
    id: 3,
    x: 56,
    y: 23,
    title: "Heavy-Duty Roof Rack",
    desc: "Reinforced aluminum roof rack system with 200kg load capacity, perfect for adventure gear and equipment.",
    detailImg: "/image/gg2.png",
  },
  {
    id: 4,
    x: 52,
    y: 66,
    title: "Performance Alloy Wheels",
    desc: "Lightweight 18-inch forged alloy wheels engineered for durability and improved handling on rough terrain.",
    detailImg: "/image/gg1.png",
  },
];

const TechSpecs = () => {
  const [activeTab, setActiveTab] = useState("Range Rover Defender");
  const [activeSpot, setActiveSpot] = useState(0); // Default to first hotspot
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset active spot when changing tabs
  useEffect(() => {
    setActiveSpot(0);
  }, [activeTab]);

  const currentCar = carData[activeTab];

  const handleSpotClick = (index) => {
    setActiveSpot(index);
  };

  return (
    <section className="tech-specs-section">
      {/* TABS */}
      <div className="specs-tabs-container">
        {Object.keys(carData).map((tab) => (
          <button
            key={tab}
            className={`specs-tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* VISUAL AREA */}
      <div className="specs-visual-area">
        <h1 className="specs-bg-text">{currentCar.bgText}</h1>

        <div className="specs-car-wrapper">
          <img
            src={currentCar.img}
            alt={activeTab}
            className="specs-car-img"
            loading="lazy"
          />

          {/* INTERACTIVE HOTSPOTS */}
          {hotspots.map((spot, index) => (
            <div
              key={spot.id}
              className={`hotspot-point ${activeSpot === index ? "active" : ""}`}
              style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
              onClick={() => handleSpotClick(index)}
              onMouseEnter={() => !isMobile && handleSpotClick(index)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSpotClick(index);
                }
              }}
              aria-label={`View details for ${spot.title}`}
            >
              <div className="hotspot-center"></div>
              <div className="hotspot-ring"></div>
            </div>
          ))}

          {/* INFO CARD */}
          {activeSpot !== null && (
            <div
              className="specs-info-card"
              style={
                !isMobile
                  ? {
                      top: `${hotspots[activeSpot].y}%`,
                      left: `${hotspots[activeSpot].x + 2}%`,
                    }
                  : {} // On mobile, CSS handles positioning
              }
            >
              <div className="card-content-flex">
                <div className="card-text">
                  <h3>{hotspots[activeSpot].title}</h3>
                  <p>{hotspots[activeSpot].desc}</p>
                </div>
                <div className="card-detail-img">
                  <img
                    src={hotspots[activeSpot].detailImg}
                    alt={hotspots[activeSpot].title}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="specs-footer">
        <a href="#specifications" className="view-specs-link">
          View Technical Specification <FaChevronRight className="arrow-icon" />
        </a>
      </div>
    </section>
  );
};

export default TechSpecs;
