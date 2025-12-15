import "../styles/HomeHero.css";
// Make sure this path is correct based on your folder structure
import bgImg from "/image/car-ai.png"; 

const HomeHero = () => {
  return (
    <section className="home-hero" style={{ backgroundImage: `url(${bgImg})` }}>
      {/* Overlay div handles the darkening of the background */}
      <div className="overlay"></div>

      <div className="hero-content">
        <h1 className="hero-title">Unleash the Mutant Within.</h1>

        <p className="hero-subtext">
          Premium off-road accessories built for those who conquer every
          terrain. Rugged. Reliable. Ready for Anything.
        </p>

        <button className="hero-btn">
          Shop Now <span>&rarr;</span>
        </button>
      </div>
    </section>
  );
};

export default HomeHero;  