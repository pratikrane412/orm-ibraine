import "../styles/HeroSection.css";

const HeroSection = () => {
  return (
    <section className="product-hero">
      <div className="product-hero-container">
        {/* LEFT SIDE - TEXT */}
        <div className="hero-left">
          <h2 className="section-title">
            How We Turn Thar Into a <span className="highlight">Trail Beast</span>
          </h2>

          <p className="hero-desc">
            At <span className="text-gold">Off-Road Mutants (ORM)</span>, we
            believe the Mahindra Thar already holds raw off-road DNA — and our
            ORM 2” Lift Kit unlocks its true mutant potential. This upgrade goes
            beyond height — it’s a transformation of stance, control, and
            confidence.
          </p>

          <p className="hero-desc">
            At Off-Road Mutants (ORM), we believe every vehicle has the potential
            to become a true off-road powerhouse. Our modification process goes
            far beyond adding accessories. Built with precision engineering and
            forged for endurance, the ORM 2” Lift Kit gives your Thar the
            perfect elevation to dominate rocks, mud, and rugged trails.
          </p>

          <p className="hero-desc">
            It improves ground clearance, suspension geometry, and off-road
            capability — without compromising stability or handling. With ORM,
            your Thar isn't just lifted — it's evolved into a powerful off-road
            mutant built to conquer every terrain with confidence.
          </p>

          <button className="hero-btn">Shop Now &rarr;</button>
        </div>

        {/* RIGHT SIDE - 3D MODEL IN CIRCLE */}
        <div className="hero-right">
          <div className="circle-window">
            {/* The 3D Model Viewer */}
            <model-viewer
              src="/model/orm-model.glb" // Ensure this path is correct
              alt="Thar ORM Leveling Kit"
              auto-rotate
              camera-controls
              disable-zoom
              rotation-per-second="25deg"
              shadow-intensity="1"
              camera-orbit="45deg 55deg 105%" 
              style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
            ></model-viewer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;