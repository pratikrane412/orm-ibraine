import React, { useState, useEffect } from "react";
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
    <section
      className="relative flex flex-col items-center overflow-hidden min-h-screen bg-orm-dark text-white px-[20px] pt-[100px] pb-[80px] max-[1024px]:pt-[80px] max-[1024px]:pb-[60px] max-[767px]:pt-[30px] max-[767px]:pb-[50px] max-[767px]:min-h-auto max-[480px]:pt-[25px] max-[480px]:pb-[40px] max-[375px]:pt-[20px] max-[375px]:pb-[35px]"
      style={{
        background: `
          radial-gradient(circle at 30% 40%, rgba(251, 176, 59, 0.06) 0%, transparent 50%),
          radial-gradient(circle at 70% 70%, rgba(255, 193, 7, 0.04) 0%, transparent 50%),
          #0a0a0a
        `,
      }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* TABS */}
      <div className="relative z-[2] flex gap-[12px] w-full max-w-[1200px] px-[20px] mb-[60px] overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-orm-gold/30 scrollbar-track-white/5 whitespace-nowrap justify-start -webkit-overflow-scrolling-touch max-[1024px]:mb-[50px] max-[1024px]:gap-[10px] max-[767px]:mb-[20px] max-[767px]:gap-[6px] max-[767px]:px-0 max-[767px]:scrollbar-none max-[480px]:mb-[15px] max-[480px]:gap-[5px] max-[375px]:gap-[4px]">
        {Object.keys(carData).map((tab) => (
          <button
            key={tab}
            className={`shrink-0 backdrop-blur-[10px] px-[20px] py-[10px] rounded-[8px] font-lato text-[0.85rem] font-[500] cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] relative overflow-hidden capitalize max-[1024px]:py-[11px] max-[1024px]:text-[0.88rem] max-[767px]:px-[14px] max-[767px]:py-[8px] max-[767px]:text-[0.7rem] max-[767px]:rounded-[6px] max-[480px]:px-[12px] max-[480px]:py-[7px] max-[480px]:text-[0.68rem] max-[375px]:px-[10px] max-[375px]:py-[6px] max-[375px]:text-[0.65rem] focus-visible:outline focus-visible:outline-3 focus-visible:outline-orm-gold focus-visible:outline-offset-4 ${
              activeTab === tab
                ? "bg-gradient-to-br from-orm-gold to-orm-yellow text-black font-[700] border-transparent shadow-[0_8px_24px_rgba(251,176,59,0.4),0_0_40px_rgba(251,176,59,0.2)] -translate-y-[2px]"
                : "bg-white/3 border border-white/10 text-[#d4d4d4] hover:border-orm-gold/50 hover:text-orm-gold hover:bg-orm-gold/8 hover:-translate-y-[2px] hover:shadow-[0_6px_16px_rgba(251,176,59,0.15)]"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {/* Shine effect */}
            {activeTab !== tab && (
              <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-orm-gold/10 to-transparent transition-[left] duration-600 ease-in-out group-hover:left-full"></span>
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

      {/* VISUAL AREA */}
      <div className="relative z-[2] w-full max-w-[1400px] h-[700px] flex items-center justify-center mb-[50px] [perspective:1500px] max-[1024px]:h-[600px] max-[1024px]:mb-[40px] max-[767px]:h-auto max-[767px]:mb-0 max-[767px]:py-[10px] max-[767px]:flex-col">
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-merriweather text-[clamp(4rem,15vw,15rem)] font-[900] bg-gradient-to-br from-white/3 via-orm-gold/8 to-white/3 bg-clip-text text-transparent pointer-events-none select-none whitespace-nowrap z-[1] tracking-[0.02em] leading-none uppercase animate-pulse-glow max-[1024px]:text-[10rem] max-[767px]:text-[1.5rem] max-[767px]:opacity-[0.15] max-[767px]:tracking-[0.1em] max-[767px]:relative max-[767px]:transform-none max-[767px]:top-auto max-[767px]:left-auto max-[767px]:mb-[10px] max-[480px]:text-[1.3rem] max-[480px]:mb-[8px] max-[375px]:text-[1.2rem]">
          {currentCar.bgText}
        </h1>

        <div className="relative z-[5] w-full max-w-[1000px] animate-fadeInUp max-[1024px]:max-w-[850px] max-[767px]:max-w-full max-[767px]:px-0 max-[767px]:m-0">
          <img
            src={currentCar.img}
            alt={activeTab}
            className="w-full h-auto block drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-400 hover:scale-[1.02] max-[767px]:drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)] max-[767px]:max-h-[250px] max-[767px]:w-auto max-[767px]:mx-auto max-[480px]:max-h-[220px] max-[375px]:max-h-[200px]"
            loading="lazy"
          />

          {/* INTERACTIVE HOTSPOTS */}
          {hotspots.map((spot, index) => (
            <div
              key={spot.id}
              className={`absolute w-[24px] h-[24px] cursor-pointer z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-[1.2] focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-orm-gold focus-visible:outline-offset-4 max-[767px]:w-[32px] max-[767px]:h-[32px] max-[480px]:w-[34px] max-[480px]:h-[34px] ${
                activeSpot === index ? "active" : ""
              }`}
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
              <div
                className={`w-[14px] h-[14px] rounded-full border-[2px] border-black absolute z-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 shadow-[0_0_10px_rgba(251,176,59,0.5)] max-[767px]:w-[20px] max-[767px]:h-[20px] max-[767px]:border-[3px] ${
                  activeSpot === index
                    ? "bg-gradient-to-br from-orm-gold to-orm-yellow shadow-[0_0_20px_rgba(251,176,59,0.8)] scale-[1.2]"
                    : "bg-orm-gold"
                }`}
              />
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20px] h-[20px] border-[2px] border-orm-gold rounded-full animate-pulse-hotspot max-[767px]:w-[28px] max-[767px]:h-[28px] max-[767px]:border-[3px] ${
                  activeSpot === index ? "border-orm-yellow !duration-[1500ms]" : ""
                }`}
              />
            </div>
          ))}

          {/* INFO CARD */}
          {activeSpot !== null && (
            <div
              className="absolute bg-gradient-to-br from-[#fdfae9] to-[#fff9e6] text-[#1a1a1a] w-[380px] p-[20px] rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(251,176,59,0.2)] z-[20] border border-orm-gold/20 before:content-[''] before:absolute before:top-0 before:left-0 before:w-[4px] before:h-full before:bg-gradient-to-b before:from-orm-gold before:to-orm-yellow before:rounded-l-[16px] animate-card-slide-in max-[1024px]:w-[340px] max-[1024px]:p-[18px] max-[767px]:static max-[767px]:transform-none max-[767px]:w-full max-[767px]:max-w-full max-[767px]:p-[10px] max-[767px]:mt-[15px] max-[767px]:rounded-[10px] max-[767px]:before:hidden max-[480px]:p-[8px] max-[480px]:mt-[12px] max-[375px]:p-[8px] max-[375px]:mt-[10px]"
              style={
                !isMobile
                  ? {
                      top: `${hotspots[activeSpot].y}%`,
                      left: `${hotspots[activeSpot].x + 2}%`,
                    }
                  : {} // On mobile, Tailwind handles positioning via 'static'
              }
            >
              <div className="flex items-start gap-[18px] max-[767px]:flex-row max-[767px]:gap-[10px] max-[767px]:items-start">
                <div className="flex-1 pl-[8px] max-[767px]:pl-0">
                  <h3 className="font-merriweather text-[1.2rem] font-[700] m-0 mb-[10px] text-black leading-[1.3] max-[1024px]:text-[1.1rem] max-[767px]:text-[0.9rem] max-[767px]:mb-[4px] max-[480px]:text-[0.85rem] max-[375px]:text-[0.82rem]">
                    {hotspots[activeSpot].title}
                  </h3>
                  <p className="font-lato text-[0.88rem] leading-[1.6] m-0 text-[#444] font-[400] max-[1024px]:text-[0.85rem] max-[767px]:text-[0.72rem] max-[767px]:leading-[1.35] max-[767px]:text-[#333] max-[480px]:text-[0.7rem] max-[375px]:text-[0.68rem] max-[375px]:leading-[1.3]">
                    {hotspots[activeSpot].desc}
                  </p>
                </div>
                <div className="w-[110px] h-[110px] rounded-[12px] overflow-hidden shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border-[2px] border-orm-gold/20 max-[1024px]:w-[100px] max-[1024px]:h-[100px] max-[767px]:w-[85px] max-[767px]:h-[85px] max-[767px]:rounded-[8px] max-[480px]:w-[75px] max-[480px]:h-[75px] max-[375px]:w-[70px] max-[375px]:h-[70px]">
                  <img
                    src={hotspots[activeSpot].detailImg}
                    alt={hotspots[activeSpot].title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-400 hover:scale-110"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-[2] mt-[50px] text-center max-[767px]:mt-[25px] max-[767px]:pb-[10px]">
        <a
          href="#specifications"
          className="group/link relative text-orm-gold no-underline font-lato text-[1.05rem] font-[600] inline-flex items-center gap-[10px] px-[32px] py-[14px] rounded-[50px] bg-orm-gold/8 border border-orm-gold/30 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] uppercase tracking-[0.5px] hover:bg-orm-gold/15 hover:border-orm-gold/60 hover:-translate-y-[3px] hover:shadow-[0_10px_30px_rgba(251,176,59,0.3)] hover:text-orm-yellow max-[767px]:text-[0.85rem] max-[767px]:px-[20px] max-[767px]:py-[10px] max-[767px]:tracking-[0.3px] max-[480px]:text-[0.82rem] max-[480px]:px-[18px] max-[480px]:py-[9px] focus-visible:outline focus-visible:outline-3 focus-visible:outline-orm-gold focus-visible:outline-offset-4"
        >
          View Technical Specification
          <FaChevronRight className="transition-transform duration-400 group-hover/link:translate-x-[5px]" />
        </a>
      </div>
    </section>
  );
};

export default TechSpecs;
