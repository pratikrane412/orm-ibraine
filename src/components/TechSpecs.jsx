import React, { useState } from "react";
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
    title: "Lorem Ipsum",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    detailImg: "/image/gg3.png",
  },
  {
    id: 2,
    x: 43,
    y: 21,
    title: "LED Vision",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    detailImg: "/image/gg3.png",
  },
  {
    id: 3,
    x: 56,
    y: 23,
    title: "Roof Rack",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    detailImg: "/image/gg2.png",
  },
  {
    id: 4,
    x: 52,
    y: 66,
    title: "Alloy Wheels",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    detailImg: "/image/gg1.png",
  },
];

const TechSpecs = () => {
  const [activeTab, setActiveTab] = useState("Range Rover Defender");
  const [activeSpot, setActiveSpot] = useState(0); // Default to first hotspot like screenshot

  const currentCar = carData[activeTab];

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
          <img src={currentCar.img} alt={activeTab} className="specs-car-img" />

          {/* DOTS */}
          {hotspots.map((spot, index) => (
            <div
              key={spot.id}
              className={`hotspot-point ${activeSpot === index ? "active" : ""}`}
              style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
              onClick={() => setActiveSpot(index)}
            >
              <div className="hotspot-center"></div>
              <div className="hotspot-ring"></div>
            </div>
          ))}

          {/* THE CREAM POPUP CARD */}
          {activeSpot !== null && (
            <div
              className="specs-info-card"
              style={{
                top: `${hotspots[activeSpot].y}%`,
                left: `${hotspots[activeSpot].x + 2}%`,
              }}
            >
              <div className="card-content-flex">
                <div className="card-text">
                  <h3>{hotspots[activeSpot].title}</h3>
                  <p>{hotspots[activeSpot].desc}</p>
                </div>
                <div className="card-detail-img">
                  <img src={hotspots[activeSpot].detailImg} alt="detail" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="specs-footer">
        <a href="#" className="view-specs-link">
          View technical Specification <FaChevronRight className="arrow-icon" />
        </a>
      </div>
    </section>
  );
};

export default TechSpecs;
