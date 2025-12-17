import { useState, useEffect } from "react"; // Import useEffect
import "../styles/OffRoadCollection.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const cars = [
  {
    id: 1,
    tabLabel: "Scorpio",
    bgName: "SCORPIO",
    img: "/image/scorpio.png",
    modelSrc: "/model/scorpio-v1.glb",
  },
  {
    id: 2,
    tabLabel: "Suzuki Jimny",
    bgName: "JIMNY",
    img: "/image/jimny.png",
    modelSrc: "/model/jimny-v1.glb",
  },
  {
    id: 3,
    tabLabel: "Toyota Hilux",
    bgName: "HILUX",
    img: "/image/hilux.png",
    modelSrc: "/model/hilux-v1.glb",
  },
  {
    id: 4,
    tabLabel: "Toyota Fortuner",
    bgName: "FORTUNER",
    img: "/image/fortuner.png",
    modelSrc: "/model/fortuner-v1.glb",
  },
  {
    id: "defender", 
    tabLabel: "Range Rover Defender",
    bgName: "DEFENDER",
    img: "/image/defender.png",
    modelSrc: "/model/defender-v1.glb",
  },
  {
    id: 6,
    tabLabel: "Mahindra Thar & Roxx",
    bgName: "THAR",
    img: "/image/thar.png",
    modelSrc: "/model/thar-v1.glb",
  },
  {
    id: 7,
    tabLabel: "Jeep Rubicon Wrangler",
    bgName: "WRANGLER",
    img: "/image/jeep.png",
    modelSrc: "/model/jeep-v1.glb",
  },
];

const OffRoadCollection = () => {
  const [index, setIndex] = useState(4);
  
  // 1. STATE FOR ROTATION (Starts at 45deg)
  const [orbitAngle, setOrbitAngle] = useState(45);

  // Switch Cars (Side Arrows / Tabs)
  const nextCar = () => setIndex((prev) => (prev + 1) % cars.length);
  const prevCar = () => setIndex((prev) => (prev - 1 + cars.length) % cars.length);

  // 2. ROTATION FUNCTIONS (For Bottom Buttons)
  const rotateLeft = () => {
    setOrbitAngle((prev) => prev - 45); // Rotate Left by 45 degrees
  };

  const rotateRight = () => {
    setOrbitAngle((prev) => prev + 45); // Rotate Right by 45 degrees
  };

  // 3. RESET ROTATION WHEN CAR CHANGES
  // This ensures the new car starts at the correct front-facing angle
  useEffect(() => {
    setOrbitAngle(45);
  }, [index]);

  return (
    <section className="collection-section">
      <div className="collection-header">
        <h2 className="title-text">
          The Ultimate Off-<span className="highlight">Road Collection.</span>
        </h2>
      </div>

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

      <div className="showcase-area">
        <h1 className="bg-text">{cars[index].bgName}</h1>

        {/* Side Arrows still change the CAR */}
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
            alt={`3D model of ${cars[index].tabLabel}`}
            
            // --- SETTINGS ---
            camera-controls
            disable-zoom
            disable-pan
            
            // Bounds tight for consistent sizing
            bounds="tight" 

            // 4. DYNAMIC CAMERA ORBIT
            // We inject the 'orbitAngle' state here.
            // 75deg locks vertical. 85% is the zoom level.
            camera-orbit={`${orbitAngle}deg 75deg 85%`}
            
            // Lock vertical movement so they can't look under the car
            min-camera-orbit="auto 75deg auto"
            max-camera-orbit="auto 75deg auto"

            field-of-view="30deg"
            shadow-intensity="1"
            exposure="1"
            
            // Add interpolation for smooth button rotation
            interpolation-decay="200"
            
            className="collection-model-viewer"
          >
            <div slot="poster" className="model-poster-loader">
              Loading {cars[index].tabLabel}...
            </div>
          </model-viewer>

          <div className="floor-ring"></div>
          
          {/* Changed text to reflect new functionality */}
          <span className="label-360">Rotate View</span>
        </div>
      </div>

      <div className="bottom-controls">
        {/* 5. BOTTOM BUTTONS NOW ROTATE THE CAR */}
        <div className="circle-nav-wrapper">
          <button className="circle-nav-btn" onClick={rotateLeft}>
            <FaChevronLeft />
          </button>
          <button className="circle-nav-btn" onClick={rotateRight}>
            <FaChevronRight />
          </button>
        </div>

        <button className="shop-cta-btn">
          Shop Now &rarr;
        </button>
      </div>
    </section>
  );
};

export default OffRoadCollection; 