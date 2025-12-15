import React, { useState } from "react";
import "../styles/CarSelector.css";

// DATA: Replace the 'img' and 'thumb' paths with your actual image files.
// For the 'thumb', you can use the same image or a cropped version.
const carData = [
  {
    id: "jimny",
    name: "Suzuki Jimny",
    img: "/image/jimny-bg.jpg", // The big background image
    thumb: "/image/jimny-bg.jpg",  // The small circle image
    position: "top-left",
  },
  {
    id: "defender",
    name: "Range Rover Defender",
    img: "/image/defender-bg.webp",
    thumb: "/image/defender-bg.webp",
    position: "top-right",
  },
  {
    id: "hilux",
    name: "Toyota Hilux",
    img: "/image/hilux-bg.png",
    thumb: "/image/hilux-bg.png",
    position: "bottom-left",
  },
  {
    id: "fortuner",
    name: "Toyota Fortuner",
    img: "/image/fortuner-bg.webp",
    thumb: "/image/fortuner-bg.webp",
    position: "bottom-right",
  },
  {
    id: "scorpio",
    name: "Scorpio",
    img: "/image/scorpio-bg.jpg",
    thumb: "/image/scorpio-bg.jpg",
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