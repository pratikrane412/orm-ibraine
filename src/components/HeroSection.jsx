import "../styles/HeroSection.css";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products/thar");
    window.scrollTo(0, 0);
  };

  return (
    <section
      className="product-hero"
      // FIX 1: Direct String Path (Ensure file name matches exactly in public/image/)
      style={{
        backgroundImage: "url('/image/productbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="product-hero-container">
        {/* LEFT SIDE - TEXT */}
        <div className="hero-left">
          <h2 className="section-title">
            What is <span className="highlight">ORM?</span>
          </h2>

          <p className="hero-desc">
            <span className="text-gold">Off-Road Mutants</span> is a 4x4 vehicle
            performance and styling platform. ORM is more than a brand; it’s a
            performance-focused automotive accessories platform engineered to
            enhance 4x4 vehicle's driving dynamics, handling, and control for
            drivers who demand confidence on every terrain.
          </p>

          <p className="hero-desc">
            At Off-Road Mutants (ORM), we believe every vehicle has the
            potential to become a true off-road powerhouse. Our modification
            process goes far beyond adding accessories. Built with precision
            engineering and forged for endurance, the ORM 2” Lift Kit gives your
            Thar the perfect elevation to dominate rocks, mud, and rugged
            trails.
          </p>

          {/* <p className="hero-desc">
            It improves ground clearance, suspension geometry, and off-road
            capability — without compromising stability or handling. With ORM,
            your Thar isn't just lifted — it's evolved into a powerful off-road
            mutant built to conquer every terrain with confidence.
          </p> */}

          <button className="hero-btn" onClick={handleShopNow}>
            Shop Now &rarr;
          </button>
        </div>

        {/* RIGHT SIDE - 3D MODEL IN CIRCLE */}
        <div className="hero-right">
          <div className="circle-window">
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
