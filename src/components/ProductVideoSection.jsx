import React, { useState } from "react";
import { FaPlay, FaRegClock, FaShare } from "react-icons/fa";
import ormLogoSmall from "/image/car-ai.png"; 

// Helper function to get YouTube ID from any YouTube URL
const getYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const ProductVideoSection = ({ videoUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Extract ID from the backend URL
  const videoId = getYouTubeId(videoUrl);
  
  // If no video is provided in backend, don't render this section
  if (!videoId) return null;

  // Auto-generate thumbnail from YouTube ID
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section className="w-[90%] max-w-[1400px] mx-auto mb-[80px] relative">
      <div className="w-full h-[500px] rounded-[20px] overflow-hidden relative border border-[#333] shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer max-md:h-[260px] max-md:rounded-[14px] group">
        {isPlaying ? (
          <div className="w-full h-full relative overflow-hidden pb-[56.25%] h-0">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-none bg-black"
            ></iframe>
          </div>
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center relative transition-transform duration-300 group-hover:scale-[1.01]"
            style={{ backgroundImage: `url(${thumbnailUrl})` }}
            onClick={() => setIsPlaying(true)}
          >
            {/* Dark Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 via-black/10 to-black/80"></div>

            {/* Top Bar */}
            <div className="absolute top-[30px] left-[30px] right-[30px] flex justify-between items-center z-[2] text-white max-md:top-[15px] max-md:left-[15px] max-md:right-[15px]">
              <div className="flex items-center gap-[15px]">
                <img src={ormLogoSmall} alt="logo" className="w-[40px] h-[40px] rounded-full bg-black max-md:w-[32px] max-md:h-[32px]" />
                <span className="font-['Lato',_sans-serif] text-[1rem] font-medium [text-shadow:1px_1px_2px_black]">Watch Product Demo</span>
              </div>
              
              <div className="flex gap-[20px]">
                <div className="flex flex-col items-center text-[0.9rem] cursor-pointer [text-shadow:1px_1px_2px_black]">
                  <FaRegClock /> <span className="text-[0.7rem] mt-[4px]">Watch</span>
                </div>
                <div className="flex flex-col items-center text-[0.9rem] cursor-pointer [text-shadow:1px_1px_2px_black]">
                  <FaShare /> <span className="text-[0.7rem] mt-[4px]">Share</span>
                </div>
              </div>
            </div>

            {/* Play Button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] h-[60px] bg-[#ff0000] rounded-[12px] flex items-center justify-center text-white text-[1.5rem] z-[3] transition-transform duration-200 shadow-[0_5px_15px_rgba(0,0,0,0.5)] group-hover:bg-[#cc0000] group-hover:scale-[1.1] max-md:w-[55px] max-md:h-[38px] max-md:text-[1rem]">
              <FaPlay />
            </div>

            {/* Bottom Title */}
            <div className="absolute bottom-[40px] left-[40px] z-[2]">
              <h2 className="font-['Merriweather',_sans-serif] text-[3.5rem] leading-[1] text-[#fbb03b] uppercase [text-shadow:2px_2px_10px_rgba(0,0,0,0.8)] font-bold max-md:text-[1.6rem]">
                Performance <br /> <span>Test & Review</span>
              </h2>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductVideoSection;