import "../styles/HeroInfoSection.css";
// Replace with your actual image path
import carImg from "/image/car.jpg"; 

const HeroInfoSection = () => {
  return (
    <section className="info-section">
      <div className="info-container">
        
        {/* LEFT SIDE - TEXT */}
        <div className="info-left">
          <h2 className="info-title">
            How We Turn Machines Into <span className="highlight-text">Mutants</span>
          </h2>

          <p className="info-desc">
            At <span className="highlight-text">Off-Road Mutants (ORM)</span>, we believe every vehicle
            has the potential to become a true off-road powerhouse. Our
            modification process goes far beyond adding accessories — it’s a
            transformation of strength, performance, and style. Each build begins
            with precision engineering and a passion for adventure. From
            heavy-duty bumpers and roof racks to running boards and custom
            lighting systems, every product is crafted for durability and tested
            in extreme conditions.
          </p>

          <p className="info-desc">
            We focus on enhancing protection, stability, and aesthetics to give
            your ride a bold, commanding look. With ORM, your vehicle isn’t just
            modified — it’s evolved into a beast built to conquer every terrain.
          </p>
          
          <p className="info-desc">
            At Off-Road Mutants (ORM), we believe every vehicle has the potential to become a 
            true off-road powerhouse. Our modification process goes far beyond adding 
            accessories.
          </p>

          <button className="info-btn">Shop Now &rarr;</button>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className="info-right">
          <div className="img-frame">
            <img src={carImg} alt="Off-road car in forest" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroInfoSection;