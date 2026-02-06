import React, { useState } from "react";
import "../styles/TechSpecs.css";
// Ensure you have react-icons installed: npm install react-icons
import { FaChevronRight } from "react-icons/fa";

const carData = {
  "Scorpio": {
    img: "/image/p.png",
    bgText: "SCORPIO"
  },
  "Suzuki Jimny": {
    img: "/image/y.png",
    bgText: "JIMNY"
  },
  "Toyota Hilux": {
    img: "/image/w.png",
    bgText: "HILUX"
  },
  "Toyota Fortuner": {
    img: "/image/t.png",
    bgText: "FORTUNER"
  },
  "Range Rover Defender": {
    img: "/image/e.png",
    bgText: "DEFENDER"
  },
  "Mahindra Thar & Roxx": {
    img: "/image/r.png",
    bgText: "THAR"
  },
  "Jeep Rubicon Wrangler": {
    img: "/image/i.png",
    bgText: "WRANGLER"
  }
};

const hotspots = [
  { id: 1, x: 23, y: 58, title: "LED Headlights", desc: "High-performance LED vision." },
  { id: 2, x: 52, y: 36, title: "Windshield", desc: "Reinforced off-road glass." },
  { id: 3, x: 48, y: 73, title: "All-Terrain Tyres", desc: "Grip for every surface." },
];

const TechSpecs = () => {
  const [activeTab, setActiveTab] = useState("Range Rover Defender");
  const [activeSpot, setActiveSpot] = useState(null); 

  const currentCar = carData[activeTab];

  if (!currentCar) return null;

  return (
    <section className="tech-specs-section">
      {/* --- ADDED TITLE SECTION --- */}
      <h2 className="specs-main-title">
        The Ultimate Off-<span className="highlight">Road Collection.</span>
      </h2>

      {/* TABS CONTAINER */}
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
            key={currentCar.img} 
          />

          {hotspots.map((spot, index) => (
            <div
              key={spot.id}
              className={`hotspot-point ${activeSpot === index ? "active" : ""}`}
              style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
              onClick={() => setActiveSpot(index === activeSpot ? null : index)}
            >
              <div className="hotspot-center"></div>
              <div className="hotspot-ring"></div>
            </div>
          ))}

          {activeSpot !== null && hotspots[activeSpot] && (
            <div
              className="specs-info-card"
              style={{
                top: `${hotspots[activeSpot].y - 15}%`,
                left: `${hotspots[activeSpot].x + 5}%`,
              }}
            >
              <div className="card-text">
                <h3>{hotspots[activeSpot].title}</h3>
                <p>{hotspots[activeSpot].desc}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="specs-footer">
        <a href="#specs" className="view-specs-link">
          View technical Specification <FaChevronRight className="arrow-icon" />
        </a>
      </div>
    </section>
  );
};

export default TechSpecs;