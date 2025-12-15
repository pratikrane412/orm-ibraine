import { useState } from "react";
import "../styles/OffRoadCollection.css";
// Make sure you have react-icons installed: npm install react-icons
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const cars = [
  {
    id: 1,
    tabLabel: "Scorpio",
    bgName: "SCORPIO",
    img: "/image/scorpio.png", // Ensure this is a transparent PNG
  },
  {
    id: 2,
    tabLabel: "Suzuki Jimny",
    bgName: "JIMNY",
    img: "/image/jimny.png",
  },
  {
    id: 3,
    tabLabel: "Toyota Hilux",
    bgName: "HILUX",
    img: "/image/hilux.png",
  },
  {
    id: 4,
    tabLabel: "Toyota Fortuner",
    bgName: "FORTUNER",
    img: "/image/fortuner.png",
  },
  {
    id: 5,
    tabLabel: "Range Rover Defender",
    bgName: "DEFENDER",
    img: "/image/defender.png",
  },
  {
    id: 6,
    tabLabel: "Mahindra Thar & Roxx",
    bgName: "THAR",
    img: "/image/thar.png",
  },
  {
    id: 7,
    tabLabel: "Jeep Rubicon Wrangler",
    bgName: "WRANGLER",
    img: "/image/jeep.png",
  },
];

const OffRoadCollection = () => {
  // Default to index 4 (Defender) to match screenshot, or 0
  const [index, setIndex] = useState(4);

  const nextCar = () => setIndex((prev) => (prev + 1) % cars.length);
  
  const prevCar = () =>
    setIndex((prev) => (prev - 1 + cars.length) % cars.length);

  return (
    <section className="collection-section">
      <div className="collection-header">
        <h2 className="title-text">
          The Ultimate Off-<span className="highlight">Road Collection.</span>
        </h2>
      </div>

      {/* TABS ROW */}
      <div className="tabs-container">
        {cars.map((car, i) => (
          <button
            key={car.id}
            className={`tab-btn ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          >
            {car.tabLabel}
          </button>
        ))}
      </div>

      {/* MAIN VISUAL AREA */}
      <div className="showcase-area">
        {/* Large Background Text */}
        <h1 className="bg-text">{cars[index].bgName}</h1>

        {/* Side Navigation Arrows (Large Chevrons) */}
        <button className="side-arrow left" onClick={prevCar}>
          <FaChevronLeft />
        </button>
        <button className="side-arrow right" onClick={nextCar}>
          <FaChevronRight />
        </button>

        {/* Car Image & Platform */}
        <div className="car-wrapper">
          <img 
            src={cars[index].img} 
            alt={cars[index].tabLabel} 
            className="car-image"
          />
          
          {/* The Floor Ring */}
          <div className="floor-ring"></div>
          
          {/* 360 Label */}
          <span className="label-360">360<sup style={{ fontSize: '0.6em' }}>o</sup></span>
        </div>
      </div>

      {/* BOTTOM CONTROLS */}
      <div className="bottom-controls">
        {/* Circular Nav Buttons */}
        <div className="circle-nav-wrapper">
          <button className="circle-nav-btn" onClick={prevCar}>
            <FaChevronLeft />
          </button>
          <button className="circle-nav-btn" onClick={nextCar}>
            <FaChevronRight />
          </button>
        </div>

        {/* Shop Now Button */}
        <button className="shop-cta-btn">
          Shop Now &rarr;
        </button>
      </div>
    </section>
  );
};

export default OffRoadCollection;