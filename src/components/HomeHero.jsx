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
    img: "/image/car-ai4.png", // Replace with Maruti Jimny image path
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

  // Automatic Slideshow Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // 6 seconds for better reading time
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[90vh] mt-[80px] flex items-center overflow-hidden max-[768px]:h-[70vh] max-[768px]:text-center">
      {/* Background Image Layers */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-[1500ms] ease-in-out scale-105 ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0"}`}
          style={{ backgroundImage: `url(${slide.img})` }}
        ></div>
      ))}

      {/* Overlay - Modern Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-orm-dark via-orm-dark/40 to-transparent max-[768px]:bg-gradient-to-b max-[768px]:from-orm-dark/60 max-[768px]:to-orm-dark/80"></div>

      {/* Content Area */}
      <div className="relative z-[2] pl-[8%] max-w-[1400px] text-white animate-[fadeInUp_1s_ease-out_forwards] max-[768px]:p-0 max-[768px]:px-[6%] max-[768px]:mx-auto" key={currentSlide}>
        <div className="overflow-hidden mb-4">
          <h1 className="font-merriweather text-[4.5rem] font-black uppercase leading-[1] drop-shadow-2xl max-[1200px]:text-[3.5rem] max-[768px]:text-[2.2rem] max-[480px]:text-[1.8rem]">
            {heroSlides[currentSlide].title.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-3 transition-all duration-500 hover:text-orm-gold">
                {word}
              </span>
            ))}
          </h1>
        </div>
        
        <p className="font-sans text-[1.1rem] font-normal mb-[40px] max-w-[580px] text-white/70 leading-relaxed max-[768px]:text-[0.95rem] max-[768px]:mx-auto max-[480px]:text-[0.85rem]">
          {heroSlides[currentSlide].subtext}
        </p>

        <div className="flex items-center gap-6 max-[768px]:justify-center">
          <button 
            className="bg-orm-gold text-black py-[18px] px-[48px] rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:bg-orm-gold-premium hover:shadow-orm-gold-glow hover:-translate-y-1 active:scale-95 flex items-center gap-3 group" 
            onClick={handleShopNow}
          >
            Explore Collection
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </button>
          
          <div className="flex gap-4 items-center">
             <div className="w-12 h-[1px] bg-white/20 hidden min-[1200px]:block"></div>
             <span className="text-white/40 text-xs font-bold uppercase tracking-widest hidden min-[1200px]:block">0{currentSlide + 1} / 0{heroSlides.length}</span>
          </div>
        </div>
      </div>

      {/* Modern Dots Navigation */}
      <div className="absolute bottom-[40px] left-[8%] flex gap-4 max-[768px]:left-1/2 max-[768px]:-translate-x-1/2">
        {heroSlides.map((_, index) => (
          <div
            key={index}
            className="group relative cursor-pointer py-4"
            onClick={() => setCurrentSlide(index)}
          >
            <div className={`h-[3px] transition-all duration-500 rounded-full ${index === currentSlide ? "w-12 bg-orm-gold" : "w-6 bg-white/20 group-hover:bg-white/40"}`}></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeHero;
