import "./styles/App.css";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import HomeHero from "./components/HomeHero";
import OffRoadCollection from "./components/OffRoadCollection";
import HeroInfoSection from "./components/HeroInfoSection";
import VideoSection from "./components/VideoSection";
import Footer from "./components/Footer";
import CarSelector from "./components/CarSelector";
import TechSpecs from "./components/TechSpecs";
import ProductShowcase from "./components/ProductShowcase";
import TharProductsPage from "./components/TharProductsPage";
import ScorpioProductsPage from "./components/ScorpioProductsPage";
import HiluxProductsPage from "./components/HiluxProductsPage";
import FortunerProductsPage from "./components/FortunerProductsPage";
import JimnyProductsPage from "./components/JimnyProductsPage";
import DefenderProductsPage from "./components/DefenderProductsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = () => (
  <>
    <Navbar />
    <HomeHero />
    <HeroSection />
    <OffRoadCollection />
    <CarSelector />
    <TechSpecs />
    <HeroInfoSection />
    <VideoSection />
    <ProductShowcase />
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* Route for Thar Page */}
        <Route path="/products/thar" element={<TharProductsPage />} />

        {/* Route for Scorpio Page */}
        <Route path="/products/scorpio" element={<ScorpioProductsPage />} />

        {/* Route for Hilux Page */}
        <Route path="/products/hilux" element={<HiluxProductsPage />} />

        {/* Route for Fortuner Page */}
        <Route path="/products/fortuner" element={<FortunerProductsPage />} />

        {/* Route for Jimny Page */}
        <Route path="/products/jimny" element={<JimnyProductsPage />} />

        {/* Route for Defender Page */}
        <Route path="/products/defender" element={<DefenderProductsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
