import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 1. Define Slides with Images, Titles, and Descriptions
const heroSlides = [
  {
    img: "/image/thar-banner.png",
    title: "Built for Extreme Adventures",
    subtext:
      "Upgrade your Mahindra Thar with premium off-road accessories designed for durability, protection, and rugged performance—perfect for conquering mountains.",
    link: "/collections/thar",
  },
  {
    img: "/image/car-ai4.png", 
    title: "Compact Size Mighty Off-Road Power.",
    subtext:
      "Equip your Jimny with high-performance off-roading accessories engineered for tough terrains—enhancing capability, style, and protection while maintaining its lightweight adventure.",
    link: "/collections/jimny",
  },
  {
    img: "/image/hilux-ban.png",
    title: "Dominate Every Terrain",
    subtext:
      "Transform your Toyota Hilux into the ultimate off-road machine with heavy-duty accessories built for strength, utility, and endurance—ready for dunes.",
    link: "/collections/hilux",
  },
];

const HomeHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate(heroSlides[currentSlide].link);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center overflow-hidden bg-orm-dark">
      {/* Background Image Layers */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-[2500ms] ease-out ${index === currentSlide ? "opacity-100 scale-110" : "opacity-0 scale-100"}`}
          style={{ backgroundImage: `url(${slide.img})` }}
        >
          {/* Subtle Overlay to enhance text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-orm-dark via-orm-dark/20 to-transparent"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      ))}

      {/* Content Area */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[6%] text-white">
        <div key={currentSlide} className="max-w-[700px] animate-[fadeInUp_1s_ease-out_forwards]">
          <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase text-orm-gold mb-4 opacity-80">
            Premium Off-Road Performance
          </h2>
          
          <h1 className="text-[3.2rem] leading-[1.15] font-black uppercase mb-6 drop-shadow-2xl max-[1200px]:text-[2.8rem] max-[768px]:text-[2.2rem] max-[480px]:text-[1.8rem]">
            {heroSlides[currentSlide].title}
          </h1>
          
          <p className="text-[1rem] font-light mb-8 max-w-[550px] text-white/70 leading-relaxed max-[768px]:text-[0.9rem]">
            {heroSlides[currentSlide].subtext}
          </p>

          <div className="flex items-center gap-6">
            <button 
              className="relative overflow-hidden group bg-orm-gold text-black py-[14px] px-[36px] rounded-full font-bold uppercase tracking-[0.1em] text-[0.75rem] transition-all duration-500 hover:shadow-[0_10px_30px_rgba(251,176,59,0.3)] active:scale-95 flex items-center gap-3" 
              onClick={handleShopNow}
            >
              <span className="relative z-10">Explore Collection</span>
              <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-2">&rarr;</span>
              <div className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0"></div>
            </button>
            
            <button className="text-[0.75rem] font-bold tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
              View Specs
              <span className="w-6 h-[1px] bg-white/20 transition-all duration-300 group-hover:w-10 group-hover:bg-orm-gold"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Modern Indicators */}
      <div className="absolute bottom-[50px] right-[6%] flex items-center gap-8 z-20">
        <div className="flex flex-col gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className="group flex items-center gap-3 text-left"
              onClick={() => setCurrentSlide(index)}
            >
              <span className={`text-[0.6rem] font-bold tracking-widest transition-all duration-500 ${index === currentSlide ? "text-orm-gold opacity-100" : "text-white opacity-20"}`}>
                0{index + 1}
              </span>
              <div className={`h-[1.5px] transition-all duration-500 rounded-full ${index === currentSlide ? "w-12 bg-orm-gold" : "w-6 bg-white/10 group-hover:bg-white/30"}`}></div>
            </button>
          ))}
        </div>
      </div>

      {/* Side Decorative Text */}
      <div className="absolute top-1/2 -right-[80px] -translate-y-1/2 rotate-90 hidden xl:block">
        <span className="text-[6rem] font-black text-white/[0.03] uppercase select-none pointer-events-none tracking-tighter">
          MUTANTS
        </span>
      </div>
    </section>
  );
};

export default HomeHero;
