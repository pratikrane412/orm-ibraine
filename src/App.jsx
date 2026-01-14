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
import CheckoutPage from "./components/CheckoutPage";

// --- ADMIN IMPORTS ---
import AdminLayout from "./components/admin/AdminLayout";
import AddProduct from "./components/admin/AddProduct";
import AdminLogin from "./components/admin/AdminLogin";
import AllProducts from "./components/admin/AllProducts";
import Orders from "./components/admin/Orders";
import OrderDetails from "./components/admin/OrderDetails";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

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
            {/* --- CUSTOMER ROUTES (PUBLIC) --- */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/products/:categoryName"
              element={<ProductCategoryPage />}
            />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* --- ADMIN LOGIN ROUTE (PUBLIC) --- */}
            <Route path="/admin" element={<AdminLogin />} />

            {/* --- PROTECTED ADMIN DASHBOARD ROUTES (PRIVATE) --- */}
            <Route element={<AdminProtectedRoute />}>
              <Route path="/react-admin" element={<AdminLayout />}>
                {/* Dashboard Home */}
                <Route
                  index
                  element={<h2>Welcome to ORM Admin Dashboard</h2>}
                />
                <Route
                  path="dashboard"
                  element={<h2>Dashboard Stats Coming Soon</h2>}
                />

                {/* Functionality Pages */}
                <Route path="add-product" element={<AddProduct />} />
                {/* Edit Product (Reusing same component) */}
                <Route path="edit-product/:id" element={<AddProduct />} />
                <Route path="products" element={<AllProducts />} />
                <Route path="orders" element={<Orders />} />
                <Route path="orders/:id" element={<OrderDetails />} />
                <Route path="coupons" element={<h2>Coupon Management</h2>} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
