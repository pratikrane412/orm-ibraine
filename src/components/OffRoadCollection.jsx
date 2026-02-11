import { useState, useEffect } from "react";
import "../styles/OffRoadCollection.css";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const cars = [
  {
    id: 1,
    tabLabel: "Lift Diff Drop Kit",
    bgName: "LIFT DIFF DROP KIT",
    modelSrc: "/model/1.glb",
  },
  {
    id: 2,
    tabLabel: "Front Stabilizer Link",
    bgName: "FRONT STABILIZER LINK",
    modelSrc: "/model/8.glb",
  },
  {
    id: 3,
    tabLabel: "Wheel Spacer",
    bgName: "WHEEL SPACER",
    modelSrc: "/model/3.glb",
  },
  {
    id: 4,
    tabLabel: "Pan Hard Rod",
    bgName: "PAN HARD ROD",
    modelSrc: "/model/4.glb",
  },
  {
    id: 5,
    tabLabel: "Upper Control Arms – Red",
    bgName: "UPPER CONTROL ARMS",
    modelSrc: "/model/5.glb",
  },
  {
    id: 6,
    tabLabel: "Upper Control Arms – White",
    bgName: "UPPER CONTROL ARMS",
    modelSrc: "/model/6.glb",
  },
  {
    id: 7,
    tabLabel: "Upper Control Arms – Black",
    bgName: "UPPER CONTROL ARMS",
    modelSrc: "/model/7.glb",
  },
];

const OffRoadCollection = () => {
  const [index, setIndex] = useState(4);
  const [orbitAngle, setOrbitAngle] = useState(45);
  const navigate = useNavigate();

  const nextCar = () => setIndex((p) => (p + 1) % cars.length);
  const prevCar = () => setIndex((p) => (p - 1 + cars.length) % cars.length);

  const rotateLeft = () => setOrbitAngle((p) => p - 45);
  const rotateRight = () => setOrbitAngle((p) => p + 45);

  useEffect(() => {
    setOrbitAngle(45);
  }, [index]);

  return (
    <section className="collection-section">
      {/* ===== TITLE ===== */}
      <h2 className="title-text">
        The Ultimate Off-<span className="highlight">Road Products.</span>
      </h2>

      {/* ===== SCROLLABLE PRODUCT NAMES ===== */}
      <div className="tabs-container">
        {cars.map((car, i) => (
          <button
            key={car.id}
            className={`tab-btn ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          >
            <span>{car.tabLabel}</span>
          </button>
        ))}
      </div>

      {/* ===== SHOWCASE ===== */}
      <div className="showcase-area">
        <h1 className="bg-text">{cars[index].bgName}</h1>

        <button className="side-arrow left" onClick={prevCar}>
          <FaChevronLeft />
        </button>
        <button className="side-arrow right" onClick={nextCar}>
          <FaChevronRight />
        </button>

        <div className="car-wrapper">
          <model-viewer
            key={cars[index].id}
            src={cars[index].modelSrc}
            poster={cars[index].img}
            camera-controls
            disable-zoom
            interaction-prompt="none"
            camera-orbit={`${orbitAngle}deg 65deg 95%`}
            field-of-view="30deg"
            shadow-intensity="1"
            exposure="1"
            className="collection-model-viewer"
          />

          <div className="floor-ring"></div>
          <span className="label-360">Rotate View</span>
        </div>
      </div>

      {/* ===== CONTROLS ===== */}
      <div className="bottom-controls">
        <div className="circle-nav-wrapper">
          <button className="circle-nav-btn" onClick={rotateLeft}>
            <FaChevronLeft />
          </button>
          <button className="circle-nav-btn" onClick={rotateRight}>
            <FaChevronRight />
          </button>
        </div>

        <button
          className="shop-cta-btn"
          onClick={() => navigate("/collections/thar")}
        >
          Shop Now →
        </button>
      </div>
    </section>
  );
};

export default OffRoadCollection;
