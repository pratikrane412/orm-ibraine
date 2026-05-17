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
import WishlistPage from "./components/WishlistPage";
import BlogPage from "./components/BlogPage";
import BlogDetails from "./components/BlogDetails";
import ScrollToTop from "./components/ScrollToTop";

// --- ADMIN IMPORTS ---
import AdminLayout from "./components/admin/AdminLayout";
import AdminLogin from "./components/admin/AdminLogin";
import Dashboard from "./components/admin/Dashboard";
import AddProduct from "./components/admin/AddProduct";
import AllProducts from "./components/admin/AllProducts";
import Collections from "./components/admin/Collections";
import EditCollection from "./components/admin/EditCollection";
import Inventory from "./components/admin/Inventory";
import Orders from "./components/admin/Orders";
import OrderDetails from "./components/admin/OrderDetails";
import Customers from "./components/admin/Customers";
import CustomerSegments from "./components/admin/CustomerSegments";
import Discounts from "./components/admin/Discounts";
import CreateDiscount from "./components/admin/CreateDiscount";
import BlogList from "./components/admin/BlogList";
import EditBlog from "./components/admin/EditBlog";
import BlogCategories from "./components/admin/BlogCategories";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
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
        <WishlistProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* --- CUSTOMER ROUTES (PUBLIC) --- */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/collections/:categoryName" element={<ProductCategoryPage key={window.location.pathname} />} />
            <Route path="/product/:slug" element={<ProductDetailsPage key={window.location.pathname} />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetails />} />

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
                <Route path="dashboard" element={<Dashboard />} />
                {/* Functionality Pages */}
                <Route path="add-product" element={<AddProduct />} />
                {/* Edit Product (Reusing same component) */}
                <Route path="edit-product/:slug" element={<AddProduct />} />
                <Route path="products" element={<AllProducts />} />
                <Route path="products/collections" element={<Collections />} />
                <Route path="products/collections/:id" element={<EditCollection />} />
                <Route path="products/inventory" element={<Inventory />} />
                <Route path="orders" element={<Orders />} />
                <Route path="orders/:id" element={<OrderDetails />} />
                <Route path="customers" element={<Customers />} />
                <Route path="customers/segments" element={<CustomerSegments />} />
                <Route path="discount" element={<Discounts />} />
                <Route path="discounts/new" element={<CreateDiscount />} />
                <Route path="discounts/:id" element={<CreateDiscount />} />
                <Route path="blog" element={<BlogList />} />
                <Route path="blog/categories" element={<BlogCategories />} />
                <Route path="blog/new" element={<EditBlog />} />
                <Route path="blog/edit/:id" element={<EditBlog />} />
              </Route>
            </Route>
          </Routes>
        </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
