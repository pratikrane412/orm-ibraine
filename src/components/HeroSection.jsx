import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products/thar");
    window.scrollTo(0, 0);
  };

  return (
    <section
      className="relative text-white py-[80px] px-0 flex justify-center items-center overflow-hidden bg-[#0f0f0f] max-[1024px]:py-[60px] max-[768px]:py-[32px] max-[768px]:pb-[56px] max-[480px]:py-[28px] max-[480px]:pb-[48px]"
      style={{
        backgroundImage: "url('/image/productbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.15)] z-[1]"></div>

      <div className="w-[90%] max-w-[1300px] flex items-center justify-between gap-[48px] relative z-[2] max-[1024px]:flex-col max-[1024px]:text-center max-[1024px]:gap-[36px] max-[768px]:gap-[28px]">
        {/* LEFT SIDE - TEXT */}
        <div className="flex-1 max-w-[620px] text-left max-[1024px]:max-w-full max-[1024px]:text-center max-[768px]:max-w-[92%] max-[768px]:mx-auto">
          <h2 className="font-merriweather text-[3.2rem] font-bold leading-[1.15] mb-[22px] drop-shadow-[2px_2px_12px_rgba(0,0,0,0.8)] max-[1024px]:text-[2.6rem] max-[1024px]:max-w-[20ch] max-[1024px]:mx-auto max-[768px]:text-[1.95rem] max-[768px]:mb-[16px] max-[768px]:max-w-[18ch] max-[480px]:text-[1.7rem] max-[480px]:max-w-[16ch]">
            What is <span className="text-orm-gold">ORM?</span>
          </h2>

          <p className="font-lato text-[0.98rem] leading-[1.7] text-[#e2e2e2] mb-[18px] text-justify [text-justify:inter-word] max-[1024px]:max-w-[48ch] max-[1024px]:mx-auto max-[768px]:text-[0.92rem] max-[768px]:leading-[1.6] max-[768px]:max-w-[42ch] max-[480px]:text-[0.9rem] max-[480px]:leading-[1.55] max-[480px]:max-w-[38ch]">
            <span className="text-orm-gold font-semibold">Off-Road Mutants</span> is a 4x4 vehicle
            performance and styling platform. ORM is more than a brand; it’s a
            performance-focused automotive accessories platform engineered to
            enhance 4x4 vehicle's driving dynamics, handling, and control for
            drivers who demand confidence on every terrain.
          </p>

          <p className="font-lato text-[0.98rem] leading-[1.7] text-[#e2e2e2] mb-[18px] text-justify [text-justify:inter-word] max-[1024px]:max-w-[48ch] max-[1024px]:mx-auto max-[768px]:text-[0.92rem] max-[768px]:leading-[1.6] max-[768px]:max-w-[42ch] max-[480px]:text-[0.9rem] max-[480px]:leading-[1.55] max-[480px]:max-w-[38ch]">
            At Off-Road Mutants (ORM), we believe every vehicle has the
            potential to become a true off-road powerhouse. Our modification
            process goes far beyond adding accessories. Built with precision
            engineering and forged for endurance, the ORM 2” Lift Kit gives your
            Thar the perfect elevation to dominate rocks, mud, and rugged
            trails.
          </p>

          <button className="bg-orm-gold text-black font-lato text-[0.95rem] font-bold py-[13px] px-[34px] rounded-[50px] border-none cursor-pointer mt-[14px] inline-flex items-center gap-[8px] transition-all duration-200 hover:bg-orm-yellow hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(251,176,59,0.3)] max-[768px]:py-[12px] max-[768px]:px-[30px]" onClick={handleShopNow}>
            Shop Now &rarr;
          </button>
        </div>

        {/* RIGHT SIDE - 3D MODEL IN CIRCLE */}
        <div className="flex-1 flex justify-center items-center">
          <div className="w-[460px] h-[460px] rounded-full border-[4px] border-orm-gold overflow-hidden relative bg-transparent shadow-[inset_0_0_40px_rgba(0,0,0,0.9),0_0_28px_rgba(0,0,0,0.6)] max-[1024px]:w-[380px] max-[1024px]:h-[380px] max-[768px]:w-[260px] max-[768px]:h-[260px] max-[768px]:border-[3px] max-[480px]:w-[230px] max-[480px]:h-[230px]">
            {/* Vignette */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,transparent_55%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-10"></div>
            <model-viewer
              src="/model/orm-model.glb"
              alt="Thar ORM Leveling Kit"
              auto-rotate
              camera-controls
              disable-zoom
              rotation-per-second="25deg"
              shadow-intensity="1"
              camera-orbit="45deg 55deg 105%"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
              }}
            ></model-viewer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
