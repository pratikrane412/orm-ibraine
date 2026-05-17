import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/collections/thar");
    window.scrollTo(0, 0);
  };

  return (
    <section
      className="relative text-white py-[120px] px-0 flex justify-center items-center overflow-hidden bg-orm-dark max-md:py-[80px]"
      style={{
        backgroundImage: "url('/image/productbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Premium Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-orm-dark via-orm-dark/85 to-orm-dark z-[1]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,176,59,0.05)_0%,transparent_50%)] z-[1]"></div>

      <div className="w-[92%] max-w-[1400px] flex items-center justify-between gap-[60px] relative z-[2] max-[1024px]:flex-col max-[1024px]:text-center">
        {/* LEFT SIDE - TEXT CONTENT */}
        <div className="flex-1 max-w-[620px] text-left max-[1024px]:max-w-full max-[1024px]:text-center animate-fadeInUp">
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/[0.03] border border-white/10 rounded-full mb-6 backdrop-blur-md">
            <div className="w-1.5 h-1.5 bg-orm-gold rounded-full animate-pulse shadow-[0_0_8px_#fbb03b]"></div>
            <span className="text-orm-gold text-[0.6rem] font-black uppercase tracking-[0.3em]">Engineering Excellence</span>
          </div>

          <h2 className="text-[2.8rem] font-black leading-[1.1] mb-[28px] tracking-tight max-md:text-[2.2rem] max-sm:text-[1.8rem]">
            What is <span className="text-orm-gold">ORM?</span>
          </h2>

          <div className="space-y-5">
            <p className="text-[0.95rem] leading-[1.8] text-white/70 font-medium max-md:text-[0.9rem]">
              <span className="text-white font-black border-b border-orm-gold/30">Off-Road Mutants</span> is a specialized 
              vehicle performance and styling platform. ORM is more than a brand; it’s a 
              performance-focused automotive collective engineered to enhance 4x4 driving 
              dynamics, handling, and control for those who demand absolute confidence 
              on every terrain.
            </p>

            <p className="text-[0.95rem] leading-[1.8] text-white/70 font-medium max-md:text-[0.9rem]">
              At <span className="text-white font-black border-b border-orm-gold/30">ORM</span>, we believe every vehicle 
              possesses the potential to become a masterpiece of engineering. Our modification 
              process blends precision manufacturing with aesthetic aggression, giving your 
              vehicle the perfect elevation to dominate any landscape.
            </p>
          </div>

          <div className="mt-10">
            <button 
              className="group relative overflow-hidden bg-orm-gold text-black font-black py-4 px-10 rounded-full uppercase tracking-[0.2em] transition-all duration-500 hover:shadow-[0_15px_40px_rgba(251,176,59,0.3)] hover:-translate-y-1 active:scale-95" 
              onClick={handleShopNow}
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Configuration <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </span>
              <div className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0"></div>
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - TECHNICAL 3D VISUAL */}
        <div className="flex-1 flex justify-center items-center relative">
          {/* Technical Halo Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orm-gold/5 blur-[100px] rounded-full pointer-events-none animate-pulse-glow"></div>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-orm-gold/40 via-transparent to-white/20 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="w-[380px] h-[380px] rounded-full border border-white/10 overflow-hidden relative bg-white/[0.02] backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] max-[1024px]:w-[320px] max-[1024px]:h-[320px] max-sm:w-[260px] max-sm:h-[260px] transition-transform duration-700 group-hover:scale-[1.02]">
              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.4)_100%)] z-10 pointer-events-none"></div>
              
              <model-viewer
                src="/model/orm-model.glb"
                alt="Thar ORM Leveling Kit"
                auto-rotate
                camera-controls
                disable-zoom
                rotation-per-second="25deg"
                shadow-intensity="2"
                exposure="1.2"
                environment-image="neutral"
                camera-orbit="45deg 75deg 105%"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              ></model-viewer>
            </div>
            
            {/* Haptic Status Indicator */}
            <div className="absolute -bottom-4 -right-4 bg-white/[0.05] backdrop-blur-2xl border border-white/10 px-6 py-3 rounded-2xl shadow-2xl transition-all duration-500 hover:bg-white/[0.08] hidden md:block">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                  <span className="text-[0.6rem] font-black text-white/40 uppercase tracking-[0.2em]">3D Render Active</span>
               </div>
               <p className="font-bold text-[0.75rem] text-white mt-1 uppercase tracking-wider">SKU: ORM-LEVEL-01</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
