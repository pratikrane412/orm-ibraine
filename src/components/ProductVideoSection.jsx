import React, { useState } from "react";
import { FaPlay, FaRegClock, FaShare } from "react-icons/fa";
import ormLogoSmall from "/image/car-ai.png"; 

const getYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const ProductVideoSection = ({ videoUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYouTubeId(videoUrl);
  
  if (!videoId) return null;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section className="bg-orm-dark py-[60px] max-md:py-[40px] flex justify-center border-t border-white/5">
      <div className="w-[92%] max-w-[1200px] relative group">
        <div className="absolute -inset-1 bg-gradient-to-b from-orm-gold/20 to-transparent blur-xl opacity-30 group-hover:opacity-50 transition-opacity rounded-[2rem]"></div>
        
        <div className="w-full h-[400px] rounded-[2rem] overflow-hidden relative border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-2xl cursor-pointer max-md:h-[220px] max-md:rounded-[1.5rem]">
          {isPlaying ? (
            <div className="w-full h-full relative">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-none bg-black"
              ></iframe>
            </div>
          ) : (
            <div 
              className="w-full h-full bg-cover bg-center relative transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${thumbnailUrl})` }}
              onClick={() => setIsPlaying(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-orm-dark via-orm-dark/40 to-black/60 transition-opacity duration-500 group-hover:opacity-80"></div>

              <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-[2]">
                <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <img src={ormLogoSmall} alt="logo" className="w-6 h-6 rounded-full grayscale opacity-70" />
                  <span className="font-sans text-[0.6rem] font-black uppercase tracking-[0.2em] text-white/80">Product Intel</span>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex justify-center items-center text-white/50 hover:text-white hover:border-white/30 transition-all">
                    <FaRegClock size={12} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex justify-center items-center text-white/50 hover:text-white hover:border-white/30 transition-all">
                    <FaShare size={12} />
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-12 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl flex items-center justify-center text-white z-[3] transition-all duration-300 shadow-[0_5px_20px_rgba(0,0,0,0.5)] group-hover:bg-orm-gold group-hover:text-black group-hover:border-orm-gold group-hover:scale-110">
                <FaPlay size={16} className="ml-1" />
              </div>

              <div className="absolute bottom-8 left-8 z-[2] transition-transform duration-500 group-hover:translate-x-2 max-w-[80%]">
                <span className="text-orm-gold text-[0.55rem] font-black uppercase tracking-[0.3em] mb-2 block drop-shadow-md">Operational Video</span>
                <h2 className="font-merriweather text-[2rem] leading-tight text-white font-black drop-shadow-lg max-md:text-[1.4rem]">
                  {title}
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductVideoSection;
