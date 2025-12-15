import "./styles/App.css";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import HomeHero from "./components/HomeHero";
import OffRoadCollection from "./components/OffRoadCollection";
import HeroInfoSection from "./components/HeroInfoSection";
import VideoSection from "./components/VideoSection";
import Footer from "./components/Footer";
import CarSelector from "./components/CarSelector";

function App() {
  return (
    <div className="app">
      <Navbar />
      <HomeHero />
      <HeroSection />
      <OffRoadCollection />
      <CarSelector />
      <HeroInfoSection />
      <VideoSection />
      <Footer />
    </div>
  );
}

export default App;
