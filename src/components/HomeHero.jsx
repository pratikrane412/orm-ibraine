import "../styles/HomeHero.css";
import bgImg from "/image/car.jpg";

const HomeHero = () => {
  return (
    <section className="home-hero" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="overlay"></div>

      <div className="hero-content">
        <h1 className="hero-title">Unleash the Mutant Within.</h1>

        <p className="hero-subtext">
          Premium off-road accessories built for those who conquer every
          terrain. Rugged. Reliable. Ready for Anything.
        </p>

        <button className="hero-btn">Shop Now →</button>
      </div>
    </section>
  );
};

export default HomeHero;
