import HeroSection from "./components/HeroSection";
import ProductsSection from "./components/ProductsSection";
import "./styles/App.css";
import ProductDetailsPreview from "./components/ProductDetailsPreview";
import Navbar from "./components/Navbar";
import HomeHero from "./components/HomeHero";
import OffRoadCollection from "./components/OffRoadCollection";
import HeroInfoSection from "./components/HeroInfoSection";
import VideoSection from "./components/VideoSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Navbar />
      <HomeHero />
      <HeroSection />
      <OffRoadCollection />
      <ProductsSection />
      <ProductDetailsPreview />
      <HeroInfoSection />
      <VideoSection />
      <Footer />
    </div>
  );
}

export default App;
