import "../styles/HeroInfoSection.css";
import sampleImg from "/image/car.jpg";

const HeroInfoSection = () => {
  return (
    <section className="info-section">
      <div className="info-left">
        <h2 className="info-title">
          How We Turn Machines Into <span>Mutants</span>
        </h2>

        <p className="info-text">
          At <strong>Off-Road Mutants (ORM)</strong>, we believe every vehicle
          has the potential to become a true off-road powerhouse. Our
          modification process goes far beyond adding accessories — it’s a
          transformation of strength, performance, and style. Each build begins
          with precision engineering and a passion for adventure. From
          heavy-duty bumpers and roof racks to running boards and custom
          lighting systems, every product is crafted for durability and tested
          in extreme conditions.
        </p>

        <p className="info-text">
          We focus on enhancing protection, stability, and aesthetics to give
          your ride a bold, commanding look. With ORM, your vehicle isn’t just
          modified — it’s evolved into a beast built to conquer every terrain.
        </p>

        <button className="info-btn">Shop Now →</button>
      </div>

      <div className="info-right">
        <div className="img-frame">
          <img src={sampleImg} alt="Off-road car" />
        </div>
      </div>
    </section>
  );
};

export default HeroInfoSection;
