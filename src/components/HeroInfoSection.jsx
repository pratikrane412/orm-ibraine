import bgImage from "/image/productbg.png";
import carImg from "/image/car.jpg";
import { useNavigate } from "react-router-dom";

const HeroInfoSection = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products/thar");
    window.scrollTo(0, 0);
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat bg-scroll bg-black text-white py-[100px] flex justify-center items-center overflow-hidden max-[768px]:py-[70px]"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none z-[1]"></div>

      <div className="w-[90%] max-w-[1400px] flex items-center justify-between gap-[60px] relative z-[2] max-[1024px]:flex-col max-[1024px]:text-left max-[1024px]:gap-[40px]">
        {/* LEFT SIDE - TEXT */}
        <div className="flex-1 max-w-[650px]">
          <h2 className="font-merriweather text-[3.5rem] font-[700] leading-[1.1] mb-[30px] text-white capitalize max-[768px]:text-[2.2rem] max-[768px]:leading-[1.15] max-[768px]:mb-[20px]">
            How We Build Performance-Driven{" "}
            <span className="text-orm-gold">4x4s</span>
          </h2>

          <p className="font-lato text-[1rem] leading-[1.6] text-[#efefef] mb-[20px] max-[768px]:text-[0.92rem] max-[768px]:leading-[1.55] max-[768px]:mb-[16px] max-[768px]:text-justify max-[768px]:[text-justify:inter-word] max-[768px]:[hyphens:auto] max-[768px]:tracking-[-0.02em]">
            We at <span className="text-orm-gold">ORM</span>, begin by
            understanding your 4x4 vehicle and driving needs, then carefully
            recommend the right performance upgrades and expertly install
            them—enhancing handling, durability, and confidence across any
            terrain.
          </p>

          <p className="font-lato text-[1rem] leading-[1.6] text-[#efefef] mb-[20px] max-[768px]:text-[0.92rem] max-[768px]:leading-[1.55] max-[768px]:mb-[16px] max-[768px]:text-justify max-[768px]:[text-justify:inter-word] max-[768px]:[hyphens:auto] max-[768px]:tracking-[-0.02em]">
            We focus on enhancing protection, stability, and aesthetics to give
            your ride a bold, commanding look. With ORM, your vehicle isn’t just
            modified — it’s evolved into a beast built to conquer every terrain.
          </p>

          <button
            className="bg-orm-gold text-black font-lato text-[1rem] font-[700] px-[40px] py-[14px] border-none rounded-[50px] cursor-pointer mt-[20px] transition-all duration-200 ease-in-out inline-flex items-center gap-[10px] hover:bg-orm-yellow hover:-translate-y-[3px] hover:shadow-[0_5px_15px_rgba(251,176,59,0.3)] max-[768px]:text-[0.95rem] max-[768px]:px-[32px] max-[768px]:py-[12px]"
            onClick={handleShopNow}
          >
            Shop Now &rarr;
          </button>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className="flex-1 flex justify-end max-[1024px]:w-full max-[1024px]:justify-center">
          <div className="relative border-[3px] border-orm-gold rounded-[30px] p-[8px] w-full max-w-[600px] bg-black/50">
            <img
              src={carImg}
              alt="Off-road car in forest"
              className="w-full h-auto block rounded-[22px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroInfoSection;
