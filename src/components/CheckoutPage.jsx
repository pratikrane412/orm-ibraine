import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaTruck, FaCreditCard, FaLock, FaArrowRight } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si"; 
import "../styles/CheckoutPage.css";

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart(); // Import clearCart
  const { user, token } = useAuth(); // Import token
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
  });

  // Auto-fill data if user is logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        full_name: `${user.first_name || ""} ${user.last_name || ""}`.trim() || prev.full_name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- PLACE ORDER LOGIC ---
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // 1. Prepare Data for Backend
    const orderPayload = {
      ...formData,
      total_price: cartTotal,
      // Map cart items to send only ID, Quantity, and Price
      cart_items: cartItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    };

    try {
      // 2. Setup Headers (Include Token if logged in)
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Token ${token}`;
      }

      // 3. Send Request
      const response = await fetch("http://127.0.0.1:8000/api/place-order/", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (response.ok) {
        // 4. SUCCESS: Clear Cart & Redirect
        alert(`Order Placed Successfully! Order ID: #${data.order_id}`);
        clearCart(); // Empty the cart
        navigate("/"); // Redirect to Home (or Order History later)
      } else {
        alert("Failed to place order: " + JSON.stringify(data));
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("Server Error. Please try again.");
    }
  };

  if (cartItems.length === 0) {
    return (
        <div className="page-wrapper">
            <Navbar />
            <div className="empty-checkout" style={{textAlign: 'center', padding: '100px', color: 'white'}}>
                <h2>Your Cart is Empty.</h2>
            </div>
            <Footer />
        </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* HERO */}
      <div className="checkout-hero">
        <div className="checkout-overlay"></div>
        <div className="checkout-content">
          <h1>Check<span className="highlight">out</span></h1>
        </div>
      </div>

      <div className="checkout-container">
        <form onSubmit={handlePlaceOrder} className="checkout-layout">
          
          {/* --- LEFT COLUMN: FORMS --- */}
          <div className="checkout-forms">
            
            {/* 1. SHIPPING INFO */}
            <div className="form-section">
              <h3 className="section-title">
                <FaTruck className="icon-gold" /> Shipping Information
              </h3>
              
              <div className="input-group full">
                <label>Full Name*</label>
                <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Enter Full Name" required />
              </div>

              <div className="input-group full">
                <label>Email Address*</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email Address" required />
              </div>

              <div className="input-group full">
                <label>Phone Number*</label>
                <input type="tel" name="phone" onChange={handleChange} placeholder="Enter Phone Number" required />
              </div>

              <div className="input-group full">
                <label>Full Address*</label>
                <input type="text" name="address" onChange={handleChange} placeholder="Enter Your Full Address" required />
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>City</label>
                  <input type="text" name="city" onChange={handleChange} placeholder="Enter City" required />
                </div>
                <div className="input-group">
                  <label>State</label>
                  <input type="text" name="state" onChange={handleChange} placeholder="Enter State" required />
                </div>
                <div className="input-group">
                  <label>Zip Code</label>
                  <input type="text" name="zip_code" onChange={handleChange} placeholder="Enter Zip Code" required />
                </div>
              </div>
            </div>

            {/* 2. PAYMENT METHOD */}
            <div className="form-section">
              <h3 className="section-title">
                <FaCreditCard className="icon-gold" /> Select Payment Method
              </h3>
              
              <div 
                className={`payment-option ${paymentMethod === 'razorpay' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('razorpay')}
              >
                <div className="radio-circle">
                  {paymentMethod === 'razorpay' && <div className="inner-dot"></div>}
                </div>
                <span className="pay-label"><SiRazorpay /> Razorpay / UPI / Netbanking</span>
              </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN: ORDER SUMMARY --- */}
          <div className="checkout-summary">
            <h3>Review Your Cart</h3>
            
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <img src={item.image.startsWith("http") ? item.image : `http://127.0.0.1:8000${item.image}`} alt={item.title} />
                  <div className="sum-details">
                    <p className="sum-title">{item.title}</p>
                    <p className="sum-price">Rs. {Number(item.price).toLocaleString()} x {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="totals-box">
              <div className="total-row">
                <span>Subtotal</span>
                <span>Rs. {cartTotal.toLocaleString()}.00</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span className="free-text">Free Shipping</span>
              </div>
              <div className="total-row final">
                <span>Total</span>
                <span>Rs. {cartTotal.toLocaleString()}.00</span>
              </div>
            </div>

            <button type="submit" className="btn-pay-now">
              Pay Now &rarr;
            </button>

            <p className="secure-text">
              Ensuring your financial and personal details are secure during every transaction.
            </p>
          </div>

        </form>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;