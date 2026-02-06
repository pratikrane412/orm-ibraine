import React, { useState } from "react";
import "../styles/CarSelector.css";

// DATA: Replace the 'img' and 'thumb' paths with your actual image files.
// For the 'thumb', you can use the same image or a cropped version.
const carData = [
  {
    id: "jimny",
    name: "Suzuki Jimny",
    img: "/image/bg5.png", // The big background image
    thumb: "/image/bg5.png",  // The small circle image
    position: "top-left",
  },
  {
    id: "defender",
    name: "Range Rover Defender",
    img: "/image/bg3.png",
    thumb: "/image/bg3.png",
    position: "top-right",
  },
  {
    id: "hilux",
    name: "Toyota Hilux",
    img: "/image/bg2.png",
    thumb: "/image/bg2.png",
    position: "bottom-left",
  },
  {
    id: "fortuner",
    name: "Toyota Fortuner",
    img: "/image/bg4.png",
    thumb: "/image/bg4.png",
    position: "bottom-right",
  },
  {
    id: "scorpio",
    name: "Scorpio",
    img: "/image/bg1.png",
    thumb: "/image/bg1.png",
    position: "bottom-center",
  },
];

const CarSelector = () => {
  // Default active car is Scorpio (index 4)
  const [activeCar, setActiveCar] = useState(carData[4]);

  return (
    <section className="car-selector-section">
      {/* Background Image Layer */}
      <div
        className="main-bg"
        style={{ backgroundImage: `url(${activeCar.img})` }}
      ></div>

      {/* Dark Overlay to make it moody like the video */}
      <div className="gradient-overlay"></div>

      {/* Thumbnails Container */}
      <div className="thumbnails-container">
        {carData.map((car) => (
          <div
            key={car.id}
            className={`thumb-wrapper ${car.position} ${
              activeCar.id === car.id ? "active" : ""
            }`}
            onClick={() => setActiveCar(car)}
          >
            {/* Tooltip (Only visible if active) */}
            <div className={`tooltip ${activeCar.id === car.id ? "show" : ""}`}>
              {car.name}
            </div>

            {/* Circle Image */}
            <div className="thumb-circle">
              <img src={car.thumb} alt={car.name} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarSelector;