import React, { useState, useEffect } from "react";
import { FaChevronRight, FaCrosshairs } from "react-icons/fa";

const carData = {
  Scorpio: { img: "/image/p.png", bgText: "SCORPIO" },
  "Suzuki Jimny": { img: "/image/y.png", bgText: "JIMNY" },
  "Mahindra Thar & Roxx": { img: "/image/r.png", bgText: "THAR" },
  "Toyota Hilux": { img: "/image/hilux.png", bgText: "HILUX" },
  "Toyota Fortuner": { img: "/image/fortuner.png", bgText: "FORTUNER" },
  "Range Rover Defender": { img: "/image/defender.png", bgText: "DEFENDER" },
  "Jeep Rubicon Wrangler": { img: "/image/i.png", bgText: "WRANGLER" },
};

const hotspots = [
  { id: 1, x: 33, y: 47, title: "Advanced Suspension", desc: "Premium off-road suspension system designed for maximum ground clearance and superior handling.", detailImg: "/image/gg3.png" },
  { id: 2, x: 43, y: 21, title: "LED Vision System", desc: "High-intensity LED headlights with adaptive beam technology for enhanced visibility.", detailImg: "/image/gg3.png" },
  { id: 3, x: 56, y: 23, title: "Heavy-Duty Roof Rack", desc: "Reinforced aluminum roof rack system with 200kg load capacity, perfect for adventure gear.", detailImg: "/image/gg2.png" },
  { id: 4, x: 52, y: 66, title: "Performance Alloy Wheels", desc: "Lightweight 18-inch forged alloy wheels engineered for durability and improved handling.", detailImg: "/image/gg1.png" },
];

const TechSpecs = () => {
  const [activeTab, setActiveTab] = useState("Mahindra Thar & Roxx");
  const [activeSpot, setActiveSpot] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => { setIsMobile(window.innerWidth <= 1024); };
    checkMobile(); window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => { setActiveSpot(0); }, [activeTab]);

  const currentCar = carData[activeTab];
  const handleSpotClick = (index) => { setActiveSpot(index); };

  return (
    <section className="relative bg-orm-dark text-white py-[70px] pb-[80px] flex flex-col items-center overflow-hidden max-md:py-[50px]">
      {/* Technical Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10" style={{ 
        backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`, 
        backgroundSize: "24px 24px" 
      }} />

      <div className="w-[92%] max-w-[1400px] relative z-[2]">
        {/* Title Section */}
        <div className="text-center mb-[40px] animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/10 rounded-full mb-3 backdrop-blur-md">
             <div className="w-1 h-1 bg-orm-gold rounded-full"></div>
             <span className="text-orm-gold text-[0.55rem] font-bold uppercase tracking-[0.2em]">Technical Lab</span>
          </div>
          <h2 className="text-[2.2rem] font-black uppercase tracking-tighter leading-tight max-md:text-[1.8rem]">
            High-Performance <span className="text-orm-gold">Specifications</span>
          </h2>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 no-scrollbar">
          {Object.keys(carData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-[0.65rem] font-black uppercase tracking-widest transition-all duration-300 border ${
                activeTab === tab 
                  ? "bg-white text-black border-white shadow-lg scale-105" 
                  : "bg-white/[0.03] border-white/5 text-white/30 hover:text-white hover:border-white/20"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Display Area */}
        <div className="flex gap-8 items-center max-lg:flex-col">
          {/* Visual Container */}
          <div className="flex-1 relative min-h-[400px] flex items-center justify-center max-md:min-h-[260px] w-full">
             {/* Background Large Text */}
             <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] font-black text-white/[0.02] uppercase pointer-events-none select-none tracking-tighter leading-none whitespace-nowrap">
                {currentCar.bgText}
             </h1>

             <div className="relative w-full max-w-[700px]">
                <img 
                  src={currentCar.img} 
                  alt={activeTab} 
                  className="w-full h-auto drop-shadow-2xl transition-all duration-700 hover:scale-[1.01]" 
                />

                {/* Hotspots */}
                {hotspots.map((spot, index) => (
                  <div
                    key={spot.id}
                    className="absolute w-7 h-7 cursor-pointer z-10 -translate-x-1/2 -translate-y-1/2 group"
                    style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                    onClick={() => handleSpotClick(index)}
                    onMouseEnter={() => !isMobile && handleSpotClick(index)}
                  >
                    <div className={`absolute inset-0 bg-orm-gold/20 rounded-full animate-ping ${activeSpot === index ? 'block' : 'hidden'}`}></div>
                    <div className={`w-full h-full rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-500 ${activeSpot === index ? 'bg-orm-gold border-orm-gold scale-110 shadow-lg' : 'bg-white/10 group-hover:bg-white/20'}`}>
                       <FaCrosshairs size={12} className={activeSpot === index ? 'text-black' : 'text-white/40'} />
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Detailed Info Panel */}
          <div className="w-[340px] max-lg:w-full animate-fadeInUp">
             <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[1.5rem] p-6 shadow-2xl">
                <div className="flex justify-between items-start mb-5">
                   <div className="flex flex-col gap-1">
                      <span className="text-orm-gold text-[0.55rem] font-black uppercase tracking-[0.3em]">Component Intel</span>
                      <span className="text-white/30 text-[0.5rem] font-bold uppercase tracking-widest">Part ID: #ORM-TS-{hotspots[activeSpot].id}</span>
                   </div>
                   <div className="w-8 h-8 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-orm-gold">
                      <FaChevronRight size={12} />
                   </div>
                </div>

                <h3 className="text-xl font-black text-white mb-3 tracking-tight leading-tight">
                  {hotspots[activeSpot].title}
                </h3>
                
                <p className="text-[0.8rem] leading-relaxed text-white/50 mb-6 font-medium">
                  {hotspots[activeSpot].desc}
                </p>

                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group/img">
                   <img 
                      src={hotspots[activeSpot].detailImg} 
                      alt={hotspots[activeSpot].title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-orm-dark/60 to-transparent"></div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                   <div className="flex flex-col">
                      <span className="text-[0.5rem] font-bold text-white/20 uppercase tracking-widest mb-1">Status</span>
                      <span className="text-[0.65rem] font-black text-green-500 uppercase tracking-widest flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> Verified
                      </span>
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="text-[0.5rem] font-bold text-white/20 uppercase tracking-widest mb-1">Sector</span>
                      <span className="text-[0.65rem] font-black text-white/80 uppercase tracking-widest">A-0{hotspots[activeSpot].id}</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Global Action */}
        <div className="mt-10 text-center">
          <button className="group relative overflow-hidden bg-white/[0.03] border border-white/10 text-white px-8 py-3.5 rounded-full font-black text-[0.6rem] uppercase tracking-[0.2em] transition-all hover:text-black hover:border-orm-gold">
            <span className="relative z-10 flex items-center gap-2.5">
               Download Technical Blueprint <FaChevronRight size={9} />
            </span>
            <div className="absolute inset-0 bg-orm-gold translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TechSpecs;
