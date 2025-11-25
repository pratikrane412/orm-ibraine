import { useState } from "react";
import "../styles/OffRoadCollection.css";

const cars = [
  { name: "DEFENDER", img: "/image/defender.png" },
  { name: "SCORPIO", img: "/image/scorpio.png" },
  { name: "JIMNY", img: "/image/jimny.png" },
  { name: "HILUX", img: "/image/hilux.png" },
  { name: "THAR", img: "/image/thar.png" },
  { name: "FORTUNER", img: "/image/fortuner.png" },
];

const OffRoadCollection = () => {
  const [index, setIndex] = useState(0);

  const nextCar = () => setIndex((prev) => (prev + 1) % cars.length);

  const prevCar = () =>
    setIndex((prev) => (prev - 1 + cars.length) % cars.length);

  return (
    <section className="car-section">
      <h1 className="collection-title">
        The Ultimate <span>Off-Road Collection.</span>
      </h1>

      {/* CAR TABS */}
      <div className="car-tabs">
        {cars.map((car, i) => (
          <button
            key={car.name}
            className={`car-tab ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          >
            {car.name}
          </button>
        ))}
      </div>

      {/* MAIN DISPLAY */}
      <div className="car-display">
        {/* Background word */}
        <h1 className="car-bg-text">{cars[index].name}</h1>

        {/* Left arrow */}
        <button className="nav-arrow left" onClick={prevCar}>
          ❮
        </button>

        {/* Car image */}
        <div className="car-frame">
          <img src={cars[index].img} alt={cars[index].name} />
        </div>

        {/* Right arrow */}
        <button className="nav-arrow right" onClick={nextCar}>
          ❯
        </button>
      </div>

      {/* Bottom buttons */}
      <div className="car-actions">
        <button className="shop-btn">Shop Now →</button>
        <button className="spec-btn">Specifications →</button>
      </div>
    </section>
  );
};

export default OffRoadCollection;
