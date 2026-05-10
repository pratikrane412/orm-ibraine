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
    const cardWidth = e.target.firstChild.offsetWidth + 16; // card + gap
    const index = Math.round(scrollLeft / cardWidth);
    setActiveDot(index);
  };

  return (
    <section className="bg-black py-[80px] text-white flex flex-col items-center">
      <div className="text-center max-w-[800px] mb-[50px] px-[20px]">
        <h2 className="font-merriweather text-[2.8rem] mb-[15px] max-[768px]:text-[2rem]">
          The Ultimate Off-<span className="text-orm-gold">Road Collection.</span>
        </h2>
        <p className="font-lato text-[#ccc] text-[1rem] leading-[1.5]">
          Discover ORM upgrades that deliver bold style, ultimate protection,
          and powerful performance for your Jeep and every off-road adventure.
        </p>
      </div>

      {/* DESKTOP GRID / MOBILE SCROLL */}
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-[25px] w-[90%] max-w-[1400px] scrollbar-none max-[768px]:flex max-[768px]:overflow-x-auto max-[768px]:gap-[16px] max-[768px]:px-[12px] max-[768px]:[scroll-snap-type:x_mandatory] max-[768px]:scroll-smooth"
        onScroll={handleScroll}
      >
        {videos.map((video) => (
          <div
            key={video.id}
            className="h-[280px] w-full rounded-[15px] overflow-hidden relative bg-black shadow-[0_4px_15px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-in-out hover:-translate-y-[5px] max-[768px]:min-w-[85%] max-[768px]:h-[240px] max-[768px]:[scroll-snap-align:center] max-[768px]:hover:transform-none"
          >
            {playingVideoId === video.id ? (
              <div className="w-full h-full border-none">
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  playsInline
                  webkit-playsinline="true"
                  className="w-full h-full border-none"
                />
              </div>
            ) : (
              <div
                className="w-full h-full bg-cover bg-center relative cursor-pointer"
                style={{ backgroundImage: `url(${video.bgImage})` }}
                onClick={() => handlePlay(video.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/85"></div>

                <div className="absolute top-[15px] left-[15px] right-[15px] flex justify-between z-[2]">
                  <div className="flex items-center gap-[10px]">
                    <img
                      src={ormLogoSmall}
                      alt="logo"
                      className="w-[30px] h-[30px] rounded-full bg-black"
                    />
                    <span className="font-lato text-[0.9rem]">Watch now...</span>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <FaRegClock />
                    <FaShare />
                  </div>
                </div>

                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="w-[60px] h-[40px] bg-[#ff0000] rounded-[10px] flex justify-center items-center">
                    <FaPlay className="text-white text-[1rem]" />
                  </div>
                </div>

                <div className="absolute bottom-[20px] left-[20px] z-[2]">
                  <h3
                    className={`font-merriweather text-[1.8rem] leading-[1.1] max-[768px]:text-[1.4rem] ${
                      video.isGold ? "text-orm-gold" : "text-white"
                    }`}
                  >
                    {video.title}
                    <br />
                    {video.subtitle}
                  </h3>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MOBILE DOTS */}
      <div className="hidden max-[768px]:flex justify-center gap-[8px] mt-[16px]">
        {videos.map((_, i) => (
          <span
            key={i}
            className={`w-[8px] h-[8px] rounded-full transition-colors duration-300 ${
              i === activeDot ? "bg-orm-gold" : "bg-[#555]"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default VideoSection;
