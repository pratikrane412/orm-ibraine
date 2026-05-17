import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const carData = [
  {
    id: "jimny",
    name: "Suzuki Jimny",
    img: "/image/bg5.png",
    thumb: "/image/bg5.png",
    desc: "The legendary compact 4x4. Engineered for agility and unmatched off-road capability in a lightweight frame.",
    tag: "Agile Terrain Dominator"
  },
  {
    id: "defender",
    name: "Range Rover Defender",
    img: "/image/bg3.png",
    thumb: "/image/bg3.png",
    desc: "Luxury meets raw power. A sophisticated icon redesigned for modern exploration and extreme endurance.",
    tag: "Luxury Off-Road Icon"
  },
  {
    id: "hilux",
    name: "Toyota Hilux",
    img: "/image/bg2.png",
    thumb: "/image/bg2.png",
    desc: "Unstoppable utility. Built for the toughest jobs and the most demanding terrains on the planet.",
    tag: "Unstoppable Utility"
  },
  {
    id: "fortuner",
    name: "Toyota Fortuner",
    img: "/image/bg4.png",
    thumb: "/image/bg4.png",
    desc: "Commanding presence. A powerhouse of comfort and aggression, elevated for superior terrain control.",
    tag: "Aggressive Performance"
  },
  {
    id: "scorpio",
    name: "Mahindra Scorpio-N",
    img: "/image/bg1.png",
    thumb: "/image/bg1.png",
    desc: "The big daddy of SUVs. Engineering excellence designed to dominate the urban jungle and the wild beyond.",
    tag: "Terrain Master"
  },
];

const CarSelector = () => {
  const [activeCar, setActiveCar] = useState(carData[4]);

  return (
    <section className="relative w-full h-[750px] bg-orm-dark overflow-hidden flex flex-col justify-end max-md:h-[600px]">
      {/* Background Image Layer with Smooth Crossfade */}
      {carData.map((car) => (
        <div
          key={car.id}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-[1500ms] ease-in-out ${
            activeCar.id === car.id ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
          style={{ 
            backgroundImage: `url(${car.img})`,
          }}
        >
           {/* Moody Cinematic Overlays */}
           <div className="absolute inset-0 bg-gradient-to-t from-orm-dark via-orm-dark/40 to-transparent z-[1]"></div>
           <div className="absolute inset-0 bg-black/30 z-[1]"></div>
        </div>
      ))}

      {/* Main Content Overlay */}
      <div className="relative z-10 w-[92%] max-w-[1400px] mx-auto mb-[160px] px-6 max-md:mb-[180px]">
        <div key={activeCar.id} className="max-w-[500px] animate-fadeInUp">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4 backdrop-blur-md">
             <div className="w-1.5 h-1.5 bg-orm-gold rounded-full animate-pulse shadow-[0_0_8px_#fbb03b]"></div>
             <span className="text-orm-gold text-[0.55rem] font-black uppercase tracking-[0.2em]">{activeCar.tag}</span>
          </div>

          <h2 className="text-[2.8rem] font-black text-white uppercase tracking-tighter leading-none mb-4 drop-shadow-2xl max-md:text-[2rem]">
            Explore the <span className="text-orm-gold">{activeCar.name}</span>
          </h2>
          
          <p className="text-[0.9rem] leading-relaxed text-white/60 mb-8 font-medium max-md:text-[0.8rem]">
            {activeCar.desc}
          </p>

          <button className="group relative overflow-hidden bg-white text-black px-10 py-3.5 rounded-full font-black text-[0.65rem] uppercase tracking-[0.2em] transition-all duration-500 hover:shadow-[0_15px_40px_rgba(255,255,255,0.1)] hover:-translate-y-1">
             <span className="relative z-10 flex items-center gap-3">
                View Configuration <FaChevronRight size={10} />
             </span>
             <div className="absolute inset-0 bg-orm-gold translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0"></div>
          </button>
        </div>
      </div>

      {/* Structured Selection Bar - No Scroll */}
      <div className="relative z-20 w-full bg-gradient-to-t from-orm-dark via-orm-dark/80 to-transparent pb-8 pt-10 border-t border-white/5">
        <div className="w-[92%] max-w-[1400px] mx-auto flex items-center justify-center gap-4 px-6 max-md:grid max-md:grid-cols-3 max-sm:grid-cols-2">
          {carData.map((car) => (
            <div
              key={car.id}
              className={`group relative w-[180px] cursor-pointer transition-all duration-500 max-md:w-full ${
                activeCar.id === car.id ? "opacity-100" : "opacity-40 hover:opacity-100"
              }`}
              onClick={() => setActiveCar(car)}
            >
              {/* Thumbnail Container */}
              <div className={`relative h-[60px] rounded-xl overflow-hidden border-2 transition-all duration-500 ${
                activeCar.id === car.id ? "border-orm-gold scale-105 shadow-[0_0_20px_rgba(251,176,59,0.2)]" : "border-white/10"
              }`}>
                <img
                  src={car.thumb}
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 transition-opacity ${activeCar.id === car.id ? "bg-transparent" : "bg-black/40 group-hover:bg-transparent"}`}></div>
              </div>
              
              {/* Name Label */}
              <div className="mt-2.5 text-center">
                 <span className={`text-[0.6rem] font-black uppercase tracking-widest transition-colors ${
                   activeCar.id === car.id ? "text-orm-gold" : "text-white/40 group-hover:text-white/80"
                 }`}>
                   {car.name}
                 </span>
              </div>
              
              {/* Active Indicator Line */}
              {activeCar.id === car.id && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-orm-gold rounded-full shadow-[0_0_10px_#fbb03b]"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* High-Tech Blueprint Accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-[5]"></div>
      <div className="absolute top-1/2 left-[4%] h-[150px] w-[1px] bg-gradient-to-b from-transparent via-orm-gold/20 to-transparent z-[5] hidden lg:block"></div>
      <div className="absolute top-1/2 right-[4%] h-[150px] w-[1px] bg-gradient-to-b from-transparent via-orm-gold/20 to-transparent z-[5] hidden lg:block"></div>
    </section>
  );
};

export default CarSelector;
