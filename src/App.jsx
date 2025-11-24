import React from "react";
import HeroSection from "./components/HeroSection";
import ProductsSection from "./components/ProductsSection";
import "./styles/App.css";
import ProductDetailsPreview from "./components/ProductDetailsPreview";

function App() {
  return (
    <div className="app">
      <HeroSection />
      <ProductsSection />
      <ProductDetailsPreview />
    </div>
  );
}

export default App;
