import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaTruck, FaCreditCard, FaArrowRight, FaPaypal } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";

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
      const response = await fetch("https://orm-backend-gejw.onrender.com/api/verify-coupon/", {
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
        "https://orm-backend-gejw.onrender.com/api/payment/start/",
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
            "https://orm-backend-gejw.onrender.com/api/payment/success/",
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
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <div
          className="text-center p-[100px] text-white"
        >
          <h2 className="font-merriweather text-[2rem]">Your Cart is Empty.</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="relative w-full h-[300px] bg-[url('/image/banner.jpg')] bg-cover bg-center mt-[80px] flex items-center pl-[10%] max-md:h-[200px] max-md:pl-0 max-md:justify-center max-md:text-center max-md:mt-[70px]">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-[2]">
          <h1 className="font-merriweather text-[3rem] text-white uppercase max-md:text-[2rem] max-[420px]:text-[1.7rem]">
            Check<span className="text-orm-gold">out</span>
          </h1>
        </div>
      </div>

      <div className="w-[90%] max-w-[1400px] mx-auto py-[60px] text-white max-md:w-[95%] max-md:py-[40px]">
        <form onSubmit={handlePlaceOrder} className="flex gap-[60px] items-start max-lg:flex-col max-md:gap-[40px]">
          <div className="flex-[2] max-md:w-full">
            {/* SHIPPING INFO */}
            <div className="mb-[40px] max-md:mb-[30px] max-md:p-[20px_16px] max-md:rounded-[12px] max-md:bg-[#0a0a0a]/90 max-md:border max-md:border-[#222]">
              <h3 className="font-merriweather text-[1.5rem] mb-[20px] flex items-center gap-[10px] border-b border-[#333] pb-[10px] text-orm-gold max-md:justify-center max-md:text-center max-md:text-[1.4rem] max-md:mb-[25px] max-[420px]:text-[1.25rem]">
                <FaTruck className="text-orm-gold" /> Shipping Information
              </h3>

              <div className="mb-[20px] max-md:mb-[22px] w-full">
                <label className="block font-lato text-[0.9rem] mb-[8px] text-[#ccc] font-medium max-md:text-[0.85rem] max-md:mb-[6px] max-md:text-[#aaa]">Full Name*</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  required
                  className="w-full p-[14px] bg-[#0a0a0a] border border-[#333] rounded-[6px] text-white outline-none transition-all duration-300 focus:border-orm-gold focus:shadow-[0_0_8px_rgba(251,176,59,0.2)] max-md:p-[14px] max-md:text-[0.95rem] max-md:rounded-[8px] max-[420px]:text-[0.9rem] placeholder:text-[#777] placeholder:text-[0.85rem] appearance-none"
                />
              </div>

              <div className="mb-[20px] max-md:mb-[22px] w-full">
                <label className="block font-lato text-[0.9rem] mb-[8px] text-[#ccc] font-medium max-md:text-[0.85rem] max-md:mb-[6px] max-md:text-[#aaa]">Email Address*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                  required
                  className="w-full p-[14px] bg-[#0a0a0a] border border-[#333] rounded-[6px] text-white outline-none transition-all duration-300 focus:border-orm-gold focus:shadow-[0_0_8px_rgba(251,176,59,0.2)] max-md:p-[14px] max-md:text-[0.95rem] max-md:rounded-[8px] max-[420px]:text-[0.9rem] placeholder:text-[#777] placeholder:text-[0.85rem] appearance-none"
                />
              </div>

              <div className="mb-[20px] max-md:mb-[22px] w-full">
                <label className="block font-lato text-[0.9rem] mb-[8px] text-[#ccc] font-medium max-md:text-[0.85rem] max-md:mb-[6px] max-md:text-[#aaa]">Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  required
                  className="w-full p-[14px] bg-[#0a0a0a] border border-[#333] rounded-[6px] text-white outline-none transition-all duration-300 focus:border-orm-gold focus:shadow-[0_0_8px_rgba(251,176,59,0.2)] max-md:p-[14px] max-md:text-[0.95rem] max-md:rounded-[8px] max-[420px]:text-[0.9rem] placeholder:text-[#777] placeholder:text-[0.85rem] appearance-none"
                />
              </div>

              <div className="mb-[20px] max-md:mb-[22px] w-full">
                <label className="block font-lato text-[0.9rem] mb-[8px] text-[#ccc] font-medium max-md:text-[0.85rem] max-md:mb-[6px] max-md:text-[#aaa]">Full Address*</label>
                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  placeholder="Enter Your Full Address"
                  required
                  className="w-full p-[14px] bg-[#0a0a0a] border border-[#333] rounded-[6px] text-white outline-none transition-all duration-300 focus:border-orm-gold focus:shadow-[0_0_8px_rgba(251,176,59,0.2)] max-md:p-[14px] max-md:text-[0.95rem] max-md:rounded-[8px] max-[420px]:text-[0.9rem] placeholder:text-[#777] placeholder:text-[0.85rem] appearance-none"
                />
              </div>

              <div className="flex gap-[20px] max-md:flex-col max-md:gap-0">
                <div className="flex-1 mb-[20px] max-md:mb-[22px]">
                  <label className="block font-lato text-[0.9rem] mb-[8px] text-[#ccc] font-medium max-md:text-[0.85rem] max-md:mb-[6px] max-md:text-[#aaa]">City</label>
                  <input
                    type="text"
                    name="city"
                    onChange={handleChange}
                    placeholder="Enter City"
                    required
                    className="w-full p-[14px] bg-[#0a0a0a] border border-[#333] rounded-[6px] text-white outline-none transition-all duration-300 focus:border-orm-gold focus:shadow-[0_0_8px_rgba(251,176,59,0.2)] max-md:p-[14px] max-md:text-[0.95rem] max-md:rounded-[8px] max-[420px]:text-[0.9rem] placeholder:text-[#777] placeholder:text-[0.85rem] appearance-none"
                  />
                </div>
                <div className="flex-1 mb-[20px] max-md:mb-[22px]">
                  <label className="block font-lato text-[0.9rem] mb-[8px] text-[#ccc] font-medium max-md:text-[0.85rem] max-md:mb-[6px] max-md:text-[#aaa]">State</label>
                  <input
                    type="text"
                    name="state"
                    onChange={handleChange}
                    placeholder="Enter State"
                    required
                    className="w-full p-[14px] bg-[#0a0a0a] border border-[#333] rounded-[6px] text-white outline-none transition-all duration-300 focus:border-orm-gold focus:shadow-[0_0_8px_rgba(251,176,59,0.2)] max-md:p-[14px] max-md:text-[0.95rem] max-md:rounded-[8px] max-[420px]:text-[0.9rem] placeholder:text-[#777] placeholder:text-[0.85rem] appearance-none"
                  />
                </div>
                <div className="flex-1 mb-[20px] max-md:mb-[22px]">
                  <label className="block font-lato text-[0.9rem] mb-[8px] text-[#ccc] font-medium max-md:text-[0.85rem] max-md:mb-[6px] max-md:text-[#aaa]">Zip Code</label>
                  <input
                    type="text"
                    name="zip_code"
                    onChange={handleChange}
                    placeholder="Enter Zip Code"
                    required
                    className="w-full p-[14px] bg-[#0a0a0a] border border-[#333] rounded-[6px] text-white outline-none transition-all duration-300 focus:border-orm-gold focus:shadow-[0_0_8px_rgba(251,176,59,0.2)] max-md:p-[14px] max-md:text-[0.95rem] max-md:rounded-[8px] max-[420px]:text-[0.9rem] placeholder:text-[#777] placeholder:text-[0.85rem] appearance-none"
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="mb-[40px] max-md:mb-[30px] max-md:p-[20px_16px] max-md:rounded-[12px] max-md:bg-[#0a0a0a]/90 max-md:border max-md:border-[#222]">
              <h3 className="font-merriweather text-[1.5rem] mb-[20px] flex items-center gap-[10px] border-b border-[#333] pb-[10px] text-orm-gold max-md:justify-center max-md:text-center max-md:text-[1.4rem] max-md:mb-[25px] max-[420px]:text-[1.25rem]">
                <FaCreditCard className="text-orm-gold" /> Select Payment Method
              </h3>

              {/* Razorpay Option */}
              <div
                className={`flex items-center gap-[15px] p-[15px] border rounded-[8px] mb-[15px] cursor-pointer bg-[#0a0a0a] transition-all duration-300 max-md:p-[16px] max-md:rounded-[10px] ${
                  paymentMethod === "razorpay" ? "border-orm-gold bg-[#111]" : "border-[#333]"
                }`}
                onClick={() => setPaymentMethod("razorpay")}
              >
                <div className="w-[20px] h-[20px] border-2 border-orm-gold rounded-full flex items-center justify-center min-w-[20px] min-h-[20px]">
                  {paymentMethod === "razorpay" && (
                    <div className="w-[10px] h-[10px] bg-orm-gold rounded-full"></div>
                  )}
                </div>
                <span className="font-lato font-medium flex items-center gap-[10px] max-md:text-[0.9rem]">
                  <SiRazorpay /> Razorpay / UPI / Netbanking
                </span>
              </div>

              {/* PayPal / Card Option (Visual Only for now) */}
              <div
                className={`flex items-center gap-[15px] p-[15px] border rounded-[8px] mb-[15px] cursor-pointer bg-[#0a0a0a] transition-all duration-300 max-md:p-[16px] max-md:rounded-[10px] ${
                  paymentMethod === "paypal" ? "border-orm-gold bg-[#111]" : "border-[#333]"
                }`}
                onClick={() => setPaymentMethod("paypal")}
              >
                <div className="w-[20px] h-[20px] border-2 border-orm-gold rounded-full flex items-center justify-center min-w-[20px] min-h-[20px]">
                  {paymentMethod === "paypal" && (
                    <div className="w-[10px] h-[10px] bg-orm-gold rounded-full"></div>
                  )}
                </div>
                <span className="font-lato font-medium flex items-center gap-[10px] max-md:text-[0.9rem]">
                  <FaPaypal /> PayPal
                </span>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: ORDER SUMMARY --- */}
          <div className="flex-1 bg-[#0a0a0a] border border-[#222] rounded-[12px] p-[30px] max-lg:w-full max-md:p-[24px] max-md:rounded-[10px] max-[420px]:p-[20px]">
            <h3 className="font-merriweather text-[1.8rem] mb-[20px] border-b border-[#333] pb-[15px] max-md:text-[1.5rem]">Review Your Cart</h3>

            <div className="max-h-[300px] overflow-y-auto mb-[20px] max-md:max-h-[220px]">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-[15px] mb-[15px] pb-[15px] border-b border-[#222]">
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `https://orm-backend-gejw.onrender.com${item.image}`
                    }
                    alt={item.title}
                    className="w-[70px] h-[70px] rounded-[8px] object-cover max-md:w-[60px] max-md:h-[60px]"
                  />
                  <div className="sum-details">
                    <p className="text-[0.9rem] font-bold text-white m-[0_0_5px_0] max-md:text-[0.85rem]">{item.title}</p>
                    <p className="text-[0.85rem] text-[#aaa] max-md:text-[0.8rem]">
                      Rs. {Number(item.price).toLocaleString()} x{" "}
                      {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 4. COUPON UI SECTION */}
            <div className="mb-[15px]">
              <div className="flex gap-[10px]">
                <input
                  type="text"
                  placeholder="Discount Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 p-[10px] bg-black border border-[#333] text-white rounded-[5px] max-md:text-[0.9rem] outline-none focus:border-orm-gold"
                />
                <button type="button" onClick={handleApplyCoupon} className="bg-transparent text-orm-gold border border-orm-gold p-[0_20px] rounded-[5px] cursor-pointer transition-all duration-300 hover:bg-orm-gold hover:text-black max-md:p-[0_16px] max-md:text-[0.9rem]">
                  Apply
                </button>
              </div>
              {/* Feedback Message */}
              {couponMsg.text && (
                <p className={`text-[0.85rem] mt-[8px] font-medium ${couponMsg.type === 'success' ? 'text-[#2cff7b]' : couponMsg.type === 'error' ? 'text-[#ff4d4d]' : 'text-[#ccc]'}`}>
                  {couponMsg.text}
                </p>
              )}
            </div>

            <div className="mt-[10px]">
              <div className="flex justify-between mb-[10px] font-lato text-[#ccc] max-md:text-[0.9rem]">
                <span>Subtotal</span>
                <span>Rs. {cartTotal.toLocaleString()}.00</span>
              </div>

              {/* Conditional Discount Row */}
              {discountPercent > 0 && (
                <div className="flex justify-between mb-[10px] font-lato max-md:text-[0.9rem] text-orm-gold font-bold">
                  <span>Discount ({discountPercent}%)</span>
                  <span>- Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between mb-[10px] font-lato text-[#ccc] max-md:text-[0.9rem]">
                <span>Shipping</span>
                <span className="text-orm-gold">Free Shipping</span>
              </div>

              <div className="flex justify-between font-lato max-md:text-[1.1rem] mt-[20px] text-[1.2rem] font-bold text-white border-t border-[#333] pt-[15px]">
                <span>Total</span>
                <span>Rs. {finalTotal.toLocaleString()}.00</span>
              </div>
            </div>

            <button type="submit" className="w-full bg-orm-gold text-black font-bold p-[15px] border-none rounded-[50px] text-[1.1rem] mt-[25px] cursor-pointer transition-all duration-300 hover:bg-[#ffc107] hover:translate-y-[-2px] max-md:p-[14px] max-md:text-[1rem] max-[420px]:text-[0.95rem]">
              Pay Now &rarr;
            </button>

            <p className="text-[0.75rem] text-[#666] text-center mt-[15px] max-md:text-[0.7rem]">
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

