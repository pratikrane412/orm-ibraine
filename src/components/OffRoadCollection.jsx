import { useState, useEffect } from "react";
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
    <section
      className="relative flex flex-col items-center overflow-hidden min-h-screen bg-orm-dark text-white px-6 pt-[120px] pb-[100px] max-[767px]:pt-[80px] max-[767px]:pb-[60px] max-[767px]:min-h-auto"
      style={{
        background: `
          radial-gradient(circle at 50% 0%, rgba(251, 176, 59, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 100% 100%, rgba(251, 176, 59, 0.05) 0%, transparent 40%),
          #0a0a0a
        `,
      }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ===== TITLE ===== */}
      <div className="relative z-[2] text-center mb-[60px] max-[767px]:mb-10">
        <span className="text-orm-gold font-sans font-bold text-xs uppercase tracking-[0.3em] mb-4 block">3D Showcase</span>
        <h2 className="font-merriweather text-[clamp(2.5rem,6vw,4rem)] font-black leading-tight tracking-tight text-white">
          Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-orm-gold to-orm-yellow">Engineering.</span>
        </h2>
      </div>

      {/* ===== MODERN TABS ===== */}
      <div className="relative z-[2] flex gap-3 w-full max-w-[1400px] px-4 pb-6 mx-auto mb-16 overflow-x-auto scrollbar-none snap-x justify-start lg:justify-center">
        {cars.map((car, i) => (
          <button
            key={car.id}
            className={`flex-none px-6 py-3 rounded-xl font-sans text-sm font-semibold transition-all duration-300 snap-center border ${
              i === index
                ? "bg-orm-gold text-black border-orm-gold shadow-orm-gold-glow scale-105"
                : "bg-white/5 border-orm-gray text-white/40 hover:text-white hover:border-white/20 hover:bg-white/10"
            }`}
            onClick={() => setIndex(i)}
          >
            {car.tabLabel}
          </button>
        ))}
      </div>

      {/* ===== SHOWCASE ===== */}
      <div className="relative z-[2] w-full max-w-[1400px] h-[650px] flex items-center justify-center mb-16 [perspective:2000px] max-[1024px]:h-[500px] max-[767px]:h-[400px] max-[480px]:h-[350px]">
        {/* Floating Background Title */}
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-merriweather text-[12vw] font-black text-white/[0.02] pointer-events-none select-none whitespace-nowrap z-0 tracking-tighter leading-none uppercase animate-pulse-glow">
          {cars[index].bgName}
        </h1>

        {/* Navigation Arrows */}
        <button
          className="absolute left-10 top-1/2 -translate-y-1/2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl w-14 h-14 flex items-center justify-center text-white/50 transition-all duration-300 z-10 hover:text-orm-gold hover:bg-white/10 hover:border-orm-gold/30 hover:scale-110 active:scale-95 max-[1024px]:left-4 max-[767px]:w-10 max-[767px]:h-10 max-[767px]:left-2"
          onClick={prevCar}
        >
          <FaChevronLeft />
        </button>
        <button
          className="absolute right-10 top-1/2 -translate-y-1/2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl w-14 h-14 flex items-center justify-center text-white/50 transition-all duration-300 z-10 hover:text-orm-gold hover:bg-white/10 hover:border-orm-gold/30 hover:scale-110 active:scale-95 max-[1024px]:right-4 max-[767px]:w-10 max-[767px]:h-10 max-[767px]:right-2"
          onClick={nextCar}
        >
          <FaChevronRight />
        </button>

        {/* 3D Model Container */}
        <div className="w-full max-w-[1100px] h-full relative z-[5] flex flex-col items-center animate-fadeInUp">
          <model-viewer
            key={cars[index].id}
            src={cars[index].modelSrc}
            camera-controls
            disable-zoom
            interaction-prompt="none"
            camera-orbit={`${orbitAngle}deg 65deg 95%`}
            field-of-view="30deg"
            shadow-intensity="1.5"
            exposure="1.2"
            className="w-full h-full bg-transparent transition-transform duration-500 hover:scale-[1.05]"
          />

          {/* Shadow Ring */}
          <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 w-[60%] h-[10px] bg-black/40 rounded-full blur-[20px] max-[767px]:bottom-10" />
          
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
             <div className="w-1.5 h-1.5 bg-orm-gold rounded-full animate-ping"></div>
             <span className="font-sans text-[0.65rem] font-bold text-white/50 uppercase tracking-[0.2em]">Interactive 360&deg; View</span>
          </div>
        </div>
      </div>

      {/* ===== CONTROLS ===== */}
      <div className="relative z-[2] flex flex-col items-center gap-8 w-full max-w-[500px]">
        <div className="flex gap-4 items-center">
          <button
            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center transition-all hover:bg-white/10 hover:border-orm-gold/50 hover:-rotate-12"
            onClick={rotateLeft}
          >
            <FaChevronLeft className="text-xs" />
          </button>
          <button
            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center transition-all hover:bg-white/10 hover:border-orm-gold/50 hover:rotate-12"
            onClick={rotateRight}
          >
            <FaChevronRight className="text-xs" />
          </button>
        </div>

        <button
          className="bg-white text-black px-12 py-5 rounded-2xl font-sans font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-orm-gold hover:shadow-orm-gold-glow hover:-translate-y-1 active:scale-95"
          onClick={() => navigate("/collections/thar")}
        >
          View Details
        </button>
      </div>
    </section>
  );
};

export default OffRoadCollection;
