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
import CartPage from "./components/CartPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ProfilePage from "./components/ProfilePage";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
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
    <AuthProvider>
    <CartProvider>
    <Router>
      <Routes>
        {/* Route for Home Page */}
        <Route path="/" element={<Home />} />

        {/* Login Page Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Signup Page Route */}
        <Route path="/signup" element={<SignupPage />} />

        {/* Profile Page Route */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Generic Product Category Page Route */}
        <Route path="/products/:categoryName" element={<ProductCategoryPage />} />

        {/* Product Details Page Route */}
        <Route path="/product/:id" element={<ProductDetailsPage />} />

        {/* Cart Page Route */}
        <Route path="/cart" element={<CartPage />} /> 
      </Routes>
    </Router>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
