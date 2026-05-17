import bgImage from "/image/productbg.png";
import carImg from "/image/car.jpg";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const HeroInfoSection = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/collections/thar");
    window.scrollTo(0, 0);
  };

  return (
    <section
      className="relative bg-orm-dark py-[120px] flex justify-center items-center overflow-hidden max-md:py-[80px]"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Premium Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-orm-dark via-orm-dark/80 to-orm-dark z-[1]"></div>

      <div className="w-[92%] max-w-[1400px] mx-auto flex items-center justify-between gap-[40px] relative z-[2] max-[1024px]:flex-col">
        {/* LEFT SIDE - TEXT */}
        <div className="flex-1 max-w-[600px] text-left max-[1024px]:max-w-full max-[1024px]:text-center">
          <h2 className="text-[2.2rem] font-black leading-[1.2] mb-[20px] text-white capitalize max-md:text-[1.8rem] max-sm:text-[1.6rem]">
            How We Build Performance-Driven <span className="text-orm-gold">4x4s</span>
          </h2>

          <div className="space-y-4">
            <p className="text-[0.9rem] leading-[1.6] text-white/80 max-md:text-[0.85rem]">
              We at <span className="text-orm-gold font-bold">ORM</span>, begin by
              understanding your 4x4 vehicle and driving needs, then carefully
              recommend the right performance upgrades and expertly install
              them—enhancing handling, durability, and confidence across any
              terrain.
            </p>

            <p className="text-[0.9rem] leading-[1.6] text-white/80 max-md:text-[0.85rem]">
              We focus on enhancing protection, stability, and aesthetics to give
              your ride a bold, commanding look. With ORM, your vehicle isn’t just
              modified — it’s evolved into a beast built to conquer every terrain.
            </p>
          </div>

          <div className="mt-8">
            <button
              className="bg-orm-gold text-black text-[0.75rem] font-bold px-[28px] py-[12px] border-none rounded-full cursor-pointer transition-all duration-200 inline-flex items-center gap-[10px] hover:bg-white hover:-translate-y-[3px] hover:shadow-[0_8px_25px_rgba(251,176,59,0.3)]"
              onClick={handleShopNow}
            >
              Shop Now &rarr;
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative border-[2px] border-orm-gold rounded-[24px] p-[6px] w-full max-w-[480px] bg-white/[0.03] backdrop-blur-sm shadow-2xl">
            <img
              src={carImg}
              alt="Off-road car in forest"
              className="w-full h-auto block rounded-[18px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroInfoSection;
