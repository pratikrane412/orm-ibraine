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
            How We Build Performance-Driven{" "}
            <span className="highlight-text">4x4s</span>
          </h2>

          <p className="info-desc">
            We at <span className="highlight-text">ORM</span>, begin by
            understanding your 4x4 vehicle and driving needs, then carefully
            recommend the right performance upgrades and expertly install
            them—enhancing handling, durability, and confidence across any
            terrain.
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
