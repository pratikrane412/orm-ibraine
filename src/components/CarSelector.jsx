import React, { useState } from "react";

const carData = [
  {
    id: "jimny",
    name: "Suzuki Jimny",
    img: "/image/bg5.png",
    thumb: "/image/bg5.png",
    position: "top-[20%] left-[15%] max-[1024px]:top-[18%] max-[1024px]:left-[10%] max-[768px]:top-[14%] max-[768px]:left-[6%] max-[480px]:top-[10%] max-[480px]:left-[5%]",
  },
  {
    id: "defender",
    name: "Range Rover Defender",
    img: "/image/bg3.png",
    thumb: "/image/bg3.png",
    position: "top-[25%] right-[15%] max-[1024px]:top-[18%] max-[1024px]:right-[10%] max-[768px]:top-[14%] max-[768px]:right-[6%] max-[480px]:top-[10%] max-[480px]:right-[5%]",
  },
  {
    id: "hilux",
    name: "Toyota Hilux",
    img: "/image/bg2.png",
    thumb: "/image/bg2.png",
    position: "bottom-[25%] left-[18%] max-[1024px]:bottom-[15%] max-[1024px]:left-[12%] max-[768px]:bottom-[20%] max-[768px]:left-[6%] max-[480px]:bottom-[18%] max-[480px]:left-[5%]",
  },
  {
    id: "fortuner",
    name: "Toyota Fortuner",
    img: "/image/bg4.png",
    thumb: "/image/bg4.png",
    position: "bottom-[25%] right-[18%] max-[1024px]:bottom-[15%] max-[1024px]:right-[12%] max-[768px]:bottom-[20%] max-[768px]:right-[6%] max-[480px]:bottom-[18%] max-[480px]:right-[5%]",
  },
  {
    id: "scorpio",
    name: "Scorpio",
    img: "/image/bg1.png",
    thumb: "/image/bg1.png",
    position: "bottom-[10%] left-1/2 -translate-x-1/2 hover:-translate-x-1/2 max-[768px]:bottom-[6%] max-[480px]:bottom-[5%]",
  },
];

const CarSelector = () => {
  const [activeCar, setActiveCar] = useState(carData[4]);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden max-[768px]:h-[52dvh] max-[768px]:min-h-[340px] max-[768px]:max-h-[440px] max-[480px]:h-[48dvh] max-[480px]:min-h-[300px]">
      {/* Background Image Layer */}
      <div
        className="w-full h-full bg-cover bg-center transition-[background-image] duration-500 ease-in-out max-[768px]:bg-[center_55%] max-[480px]:bg-[center_60%]"
        style={{ backgroundImage: `url(${activeCar.img})` }}
      ></div>

      {/* Dark Overlay to make it moody like the video */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none"></div>

      {/* Thumbnails Container */}
      <div className="absolute inset-0 pointer-events-none">
        {carData.map((car) => (
          <div
            key={car.id}
            className={`absolute pointer-events-auto cursor-pointer flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-110 hover:z-10 ${
              car.position
            } ${activeCar.id === car.id ? "z-[5]" : ""}`}
            onClick={() => setActiveCar(car)}
          >
            {/* Tooltip (Only visible if active) */}
            <div
              className={`bg-orm-gold text-black font-lato font-[700] text-[0.9rem] px-[16px] py-[6px] rounded-[4px] mb-[12px] transition-all duration-300 ease-in-out pointer-events-none whitespace-nowrap relative max-[768px]:text-[0.75rem] max-[768px]:px-[12px] max-[768px]:py-[4px] max-[768px]:mb-[8px] after:content-[''] after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:border-l-[6px] after:border-l-transparent after:border-r-[6px] after:border-r-transparent after:border-t-[6px] after:border-t-orm-gold ${
                activeCar.id === car.id
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-[10px]"
              }`}
            >
              {car.name}
            </div>

            {/* Circle Image */}
            <div
              className={`rounded-full overflow-hidden bg-black border-[3px] shadow-[0_6px_18px_rgba(0,0,0,0.6)] transition-all duration-300 ease-in-out max-[768px]:border-[2px] ${
                activeCar.id === car.id
                  ? "w-[85px] h-[85px] border-orm-gold max-[768px]:w-[65px] max-[768px]:h-[65px] max-[480px]:w-[56px] max-[480px]:h-[56px]"
                  : "w-[70px] h-[70px] border-white/30 max-[768px]:w-[55px] max-[768px]:h-[55px] max-[480px]:w-[48px] max-[480px]:h-[48px]"
              }`}
            >
              <img
                src={car.thumb}
                alt={car.name}
                className={`w-full h-full object-cover transition-opacity duration-300 ease-in-out ${
                  activeCar.id === car.id ? "opacity-100" : "opacity-70"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarSelector;
