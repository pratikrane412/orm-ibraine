import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaTruck, FaCreditCard, FaArrowRight, FaPaypal } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";
import "../styles/CheckoutPage.css";

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  // --- 1. COUPON STATE ---
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState({ text: "", type: "" });

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
  });

  // --- 2. CALCULATE DISCOUNT ---
  const discountAmount = (cartTotal * discountPercent) / 100;
  const finalTotal = cartTotal - discountAmount;

  // Auto-fill data if user is logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        full_name:
          `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
          prev.full_name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- 3. COUPON HANDLER FUNCTION ---
  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setCouponMsg({ text: "Verifying...", type: "neutral" });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/verify-coupon/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: couponCode,
          cart_total: cartTotal,
        }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        setDiscountPercent(data.discount_percentage);
        setCouponMsg({
          text: `Success! ${data.discount_percentage}% Off applied.`,
          type: "success",
        });
      } else {
        setDiscountPercent(0);
        setCouponMsg({ text: data.message || "Invalid Coupon", type: "error" });
      }
    } catch (error) {
      setCouponMsg({ text: "Server Error", type: "error" });
    }
  };

  // --- 4. PLACE ORDER LOGIC (CORRECTED RAZORPAY FLOW) ---
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // A. Load Script
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // B. Start Payment (Get Order ID from Backend)
    try {
      const initiateRes = await fetch(
        "http://127.0.0.1:8000/api/payment/start/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: finalTotal }), // Send Final Discounted Price
        },
      );

      const orderData = await initiateRes.json();

      if (!orderData.order_id) {
        alert("Error creating payment order. Check backend console.");
        return;
      }

      // C. Open Razorpay Popup
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: "INR",
        name: "Off-Road Mutants",
        description: "Car Accessories Purchase",
        image: "/image/orm1.png", // Your Logo Path
        order_id: orderData.order_id,

        // D. On Success Handler
        handler: async function (response) {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,

            // Send Cart & User Data to Save Order
            cart_items: cartItems.map((item) => ({
              id: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
            form_data: formData,
            amount: finalTotal,
            discount_amount: discountAmount, // Send discount info for Invoice
          };

          // E. Verify & Save to DB
          const headers = { "Content-Type": "application/json" };
          if (token) headers["Authorization"] = `Token ${token}`;

          const verifyRes = await fetch(
            "http://127.0.0.1:8000/api/payment/success/",
            {
              method: "POST",
              headers: headers,
              body: JSON.stringify(paymentData),
            },
          );

          const verifyData = await verifyRes.json();

          if (verifyData.message === "Payment Successful") {
            alert(
              `Order Placed Successfully! Order ID: #${verifyData.order_id}`,
            );
            clearCart();
            navigate("/");
          } else {
            alert("Payment Verification Failed");
          }
        },
        prefill: {
          name: formData.full_name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#fbb03b",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert("Payment process failed.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div
          className="empty-checkout"
          style={{ textAlign: "center", padding: "100px", color: "white" }}
        >
          <h2>Your Cart is Empty.</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="checkout-hero">
        <div className="checkout-overlay"></div>
        <div className="checkout-content">
          <h1>
            Check<span className="highlight">out</span>
          </h1>
        </div>
      </div>

      <div className="checkout-container">
        <form onSubmit={handlePlaceOrder} className="checkout-layout">
          <div className="checkout-forms">
            {/* SHIPPING INFO */}
            <div className="form-section">
              <h3 className="section-title">
                <FaTruck className="icon-gold" /> Shipping Information
              </h3>

              <div className="input-group full">
                <label>Full Name*</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  required
                />
              </div>

              <div className="input-group full">
                <label>Email Address*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                  required
                />
              </div>

              <div className="input-group full">
                <label>Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  required
                />
              </div>

              <div className="input-group full">
                <label>Full Address*</label>
                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  placeholder="Enter Your Full Address"
                  required
                />
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    onChange={handleChange}
                    placeholder="Enter City"
                    required
                  />
                </div>
                <div className="input-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    onChange={handleChange}
                    placeholder="Enter State"
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Zip Code</label>
                  <input
                    type="text"
                    name="zip_code"
                    onChange={handleChange}
                    placeholder="Enter Zip Code"
                    required
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="form-section">
              <h3 className="section-title">
                <FaCreditCard className="icon-gold" /> Select Payment Method
              </h3>

              {/* Razorpay Option */}
              <div
                className={`payment-option ${
                  paymentMethod === "razorpay" ? "active" : ""
                }`}
                onClick={() => setPaymentMethod("razorpay")}
              >
                <div className="radio-circle">
                  {paymentMethod === "razorpay" && (
                    <div className="inner-dot"></div>
                  )}
                </div>
                <span className="pay-label">
                  <SiRazorpay /> Razorpay / UPI / Netbanking
                </span>
              </div>

              {/* PayPal / Card Option (Visual Only for now) */}
              <div
                className={`payment-option ${
                  paymentMethod === "paypal" ? "active" : ""
                }`}
                onClick={() => setPaymentMethod("paypal")}
              >
                <div className="radio-circle">
                  {paymentMethod === "paypal" && (
                    <div className="inner-dot"></div>
                  )}
                </div>
                <span className="pay-label">
                  <FaPaypal /> PayPal
                </span>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: ORDER SUMMARY --- */}
          <div className="checkout-summary">
            <h3>Review Your Cart</h3>

            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `http://127.0.0.1:8000${item.image}`
                    }
                    alt={item.title}
                  />
                  <div className="sum-details">
                    <p className="sum-title">{item.title}</p>
                    <p className="sum-price">
                      Rs. {Number(item.price).toLocaleString()} x{" "}
                      {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 4. COUPON UI SECTION */}
            <div className="discount-wrapper">
              <div className="discount-box">
                <input
                  type="text"
                  placeholder="Discount Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button type="button" onClick={handleApplyCoupon}>
                  Apply
                </button>
              </div>
              {/* Feedback Message */}
              {couponMsg.text && (
                <p className={`coupon-feedback ${couponMsg.type}`}>
                  {couponMsg.text}
                </p>
              )}
            </div>

            <div className="totals-box">
              <div className="total-row">
                <span>Subtotal</span>
                <span>Rs. {cartTotal.toLocaleString()}.00</span>
              </div>

              {/* Conditional Discount Row */}
              {discountPercent > 0 && (
                <div className="total-row discount-row">
                  <span>Discount ({discountPercent}%)</span>
                  <span>- Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="total-row">
                <span>Shipping</span>
                <span className="free-text">Free Shipping</span>
              </div>

              <div className="total-row final">
                <span>Total</span>
                <span>Rs. {finalTotal.toLocaleString()}.00</span>
              </div>
            </div>

            <button type="submit" className="btn-pay-now">
              Pay Now &rarr;
            </button>

            <p className="secure-text">
              Ensuring your financial and personal details are secure during
              every transaction.
            </p>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
