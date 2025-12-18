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
import ProductCategoryPage from "./components/ProductCategoryPage";
import ProductDetailsPage from "./components/ProductDetailsPage";
import { CartProvider } from "./context/CartContext";
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
    <CartProvider>
    <Router>
      <Routes>
        {/* Route for Home Page */}
        <Route path="/" element={<Home />} />

        {/* Generic Product Category Page Route */}
        <Route path="/products/:categoryName" element={<ProductCategoryPage />} />

        {/* Product Details Page Route */}
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
