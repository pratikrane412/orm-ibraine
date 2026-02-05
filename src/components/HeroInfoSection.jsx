import "../styles/HeroInfoSection.css";
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
      className="info-section"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="info-container">
        {/* LEFT SIDE - TEXT (Remains exactly the same) */}
        <div className="info-left">
          <h2 className="info-title">
            How We Turn Machines Into{" "}
            <span className="highlight-text">Mutants</span>
          </h2>

          <p className="info-desc">
            At <span className="highlight-text">Off-Road Mutants (ORM)</span>,
            we believe every vehicle has the potential to become a true off-road
            powerhouse. Our modification process goes far beyond adding
            accessories — it’s a transformation of strength, performance, and
            style. Each build begins with precision engineering and a passion
            for adventure. From heavy-duty bumpers and roof racks to running
            boards and custom lighting systems, every product is crafted for
            durability and tested in extreme conditions.
          </p>

          <p className="info-desc">
            We focus on enhancing protection, stability, and aesthetics to give
            your ride a bold, commanding look. With ORM, your vehicle isn’t just
            modified — it’s evolved into a beast built to conquer every terrain.
          </p>

          <button className="info-btn" onClick={handleShopNow}>
            Shop Now &rarr;
          </button>
        </div>

        {/* RIGHT SIDE - IMAGE (Remains exactly the same) */}
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
