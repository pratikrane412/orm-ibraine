import HeroSection from "./components/HeroSection";
import ProductsSection from "./components/ProductsSection";
import "./styles/App.css";
import ProductDetailsPreview from "./components/ProductDetailsPreview";
import Navbar from "./components/Navbar";
import HomeHero from "./components/HomeHero";
import OffRoadCollection from "./components/OffRoadCollection";

function App() {
  return (
    <div className="app">
      <Navbar />
      <HomeHero />
      <HeroSection />
      <OffRoadCollection />
      <ProductsSection />
      <ProductDetailsPreview />
    </div>
  );
}

export default App;
