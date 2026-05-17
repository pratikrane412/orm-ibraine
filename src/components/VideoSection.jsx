import React, { useState } from "react";
import { FaPlay, FaRegClock, FaShare } from "react-icons/fa";
import ormLogoSmall from "/image/car-ai.png";

const videos = [
  {
    id: 1,
    videoUrl:
      "https://www.youtube.com/embed/cgloJmn3uqE?rel=0&playsinline=1&modestbranding=1&enablejsapi=1",
    title: "Ultimate Off-Road",
    subtitle: "Bumper Test",
    bgImage: "https://img.youtube.com/vi/cgloJmn3uqE/maxresdefault.jpg",
    isGold: true,
  },
  {
    id: 2,
    videoUrl:
      "https://www.youtube.com/embed/-b7nD5FvWGA?rel=0&playsinline=1&modestbranding=1&enablejsapi=1",
    title: "Off-Road Setup",
    subtitle: "Transformation",
    bgImage: "https://img.youtube.com/vi/-b7nD5FvWGA/maxresdefault.jpg",
    isGold: false,
  },
  {
    id: 3,
    videoUrl:
      "https://www.youtube.com/embed/cgloJmn3uqE?rel=0&playsinline=1&modestbranding=1&enablejsapi=1",
    title: "Running Board",
    subtitle: "Strength Challenge",
    bgImage: "https://img.youtube.com/vi/cgloJmn3uqE/maxresdefault.jpg",
    isGold: false,
  },
];

const VideoSection = () => {
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [activeDot, setActiveDot] = useState(0);

  const handlePlay = (id) => setPlayingVideoId(id);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const cardWidth = e.target.firstChild.offsetWidth + 16;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveDot(index);
  };

  return (
    <section className="bg-orm-dark py-[140px] text-white flex flex-col items-center overflow-hidden">
      <div className="text-center max-w-[900px] mb-[80px] px-6 relative">
        <div className="inline-block px-4 py-1 bg-white/[0.03] border border-white/10 rounded-full mb-8 backdrop-blur-md">
           <span className="text-orm-gold text-[0.7rem] font-bold tracking-[0.4em] uppercase">Field Reports</span>
        </div>
        <h2 className="font-merriweather text-[4.5rem] font-black leading-[1.1] mb-8 tracking-tighter uppercase max-md:text-[2.5rem]">
          The <span className="text-orm-gold">Operational</span> Archive
        </h2>
        <p className="font-sans text-white/40 text-lg leading-relaxed max-w-2xl mx-auto uppercase tracking-widest text-xs font-bold">
          Witness ORM engineering in extreme environments. Bold style, ultimate protection, and undisputed performance.
        </p>
      </div>

      {/* DESKTOP GRID / MOBILE SCROLL */}
      <div
        className="grid grid-cols-3 gap-8 w-[94%] max-w-[1600px] max-lg:grid-cols-2 max-md:flex max-md:overflow-x-auto max-md:pb-10 no-scrollbar"
        onScroll={handleScroll}
      >
        {videos.map((video) => (
          <div
            key={video.id}
            className="group relative h-[450px] rounded-[3rem] overflow-hidden bg-white/[0.02] border border-white/5 shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:border-orm-gold/30 max-md:min-w-[85%] max-md:h-[350px]"
          >
            {playingVideoId === video.id ? (
              <div className="w-full h-full">
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-none"
                />
              </div>
            ) : (
              <div
                className="w-full h-full bg-cover bg-center relative cursor-pointer overflow-hidden"
                style={{ backgroundImage: `url(${video.bgImage})` }}
                onClick={() => handlePlay(video.id)}
              >
                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-orm-dark via-orm-dark/40 to-transparent transition-opacity duration-700 group-hover:opacity-60"></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700"></div>

                <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-[2]">
                  <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
                    <img
                      src={ormLogoSmall}
                      alt="logo"
                      className="w-6 h-6 rounded-full grayscale opacity-60"
                    />
                    <span className="font-sans text-[0.6rem] font-black uppercase tracking-[0.2em] text-white/60">Field Intel</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/40">
                    <FaRegClock size={14} className="hover:text-white transition-colors" />
                    <FaShare size={14} className="hover:text-white transition-colors" />
                  </div>
                </div>

                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 flex justify-center items-center transition-all duration-500 group-hover:scale-110 group-hover:bg-orm-gold group-hover:border-orm-gold group-hover:shadow-[0_0_50px_rgba(251,176,59,0.5)]">
                    <FaPlay className="text-white group-hover:text-black transition-colors ml-1" size={20} />
                  </div>
                </div>

                <div className="absolute bottom-10 left-10 z-[2] transition-transform duration-700 group-hover:translate-x-2">
                  <h3
                    className={`font-merriweather text-[2.5rem] leading-[1] font-black uppercase tracking-tighter ${
                      video.isGold ? "text-orm-gold" : "text-white"
                    } max-md:text-[1.8rem]`}
                  >
                    {video.title}
                    <br />
                    <span className="opacity-40">{video.subtitle}</span>
                  </h3>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MOBILE DOTS */}
      <div className="hidden max-md:flex justify-center gap-4 mt-8">
        {videos.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === activeDot ? "w-8 bg-orm-gold" : "w-3 bg-white/10"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default VideoSection;
