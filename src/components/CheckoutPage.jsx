import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaTruck, FaCreditCard, FaArrowRight, FaPaypal, FaShieldAlt } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState({ text: "", type: "" });
  const [formData, setFormData] = useState({ full_name: "", email: "", phone: "", address: "", city: "", state: "", zip_code: "" });
  const discountAmount = (cartTotal * discountPercent) / 100;
  const finalTotal = cartTotal - discountAmount;

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...prev, full_name: `${user.first_name || ""} ${user.last_name || ""}`.trim() || prev.full_name, email: user.email || prev.email }));
    }
  }, [user]);

  const loadRazorpayScript = () => new Promise((resolve) => {
    const script = document.createElement("script"); script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true); script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setCouponMsg({ text: "Verifying...", type: "neutral" });
    try {
      const response = await fetch("https://orm-backend-gejw.onrender.com/api/verify-coupon/", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode, cart_total: cartTotal }),
      });
      const data = await response.json();
      if (response.ok && data.valid) { setDiscountPercent(data.discount_percentage); setCouponMsg({ text: `Success! ${data.discount_percentage}% Off.`, type: "success" }); }
      else { setDiscountPercent(0); setCouponMsg({ text: data.message || "Invalid Coupon", type: "error" }); }
    } catch (error) { setCouponMsg({ text: "Server Error", type: "error" }); }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault(); if (cartItems.length === 0) return;
    const res = await loadRazorpayScript(); if (!res) { alert("Razorpay SDK failed."); return; }
    try {
      const initiateRes = await fetch("https://orm-backend-gejw.onrender.com/api/payment/start/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ amount: finalTotal }), });
      const orderData = await initiateRes.json();
      if (!orderData.order_id) return;
      const options = {
        key: orderData.key, amount: orderData.amount, currency: "INR", name: "Off-Road Mutants", description: "Car Accessories Purchase", image: "/image/orm1.png", order_id: orderData.order_id,
        handler: async function (response) {
          const paymentData = { razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature, cart_items: cartItems.map((item) => ({ id: item.id, quantity: item.quantity, price: item.price })), form_data: formData, amount: finalTotal, discount_amount: discountAmount };
          const headers = { "Content-Type": "application/json" }; if (token) headers["Authorization"] = `Token ${token}`;
          const verifyRes = await fetch("https://orm-backend-gejw.onrender.com/api/payment/success/", { method: "POST", headers: headers, body: JSON.stringify(paymentData) });
          const verifyData = await verifyRes.json();
          if (verifyData.message === "Payment Successful") { clearCart(); navigate("/"); }
        },
        prefill: { name: formData.full_name, email: formData.email, contact: formData.phone }, theme: { color: "#fbb03b" }
      };
      const paymentObject = new window.Razorpay(options); paymentObject.open();
    } catch (err) { console.error(err); }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-orm-dark text-white min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
           <h2 className="text-[1.8rem] opacity-20 font-black uppercase">Arsenal Empty</h2>
           <button onClick={() => navigate("/collections/thar")} className="mt-6 text-orm-gold font-bold uppercase tracking-widest text-[0.6rem]">&larr; Return to Base</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-orm-dark text-white min-h-screen">
      <Navbar />
      <div className="h-[220px] bg-[url('/image/banner.jpg')] bg-cover bg-center relative flex items-center justify-center text-center mt-[70px] max-md:h-[150px]">
        <div className="absolute inset-0 bg-gradient-to-b from-orm-dark via-orm-dark/40 to-orm-dark"></div>
        <div className="relative z-[2] px-6">
          <h1 className="text-[2.2rem] text-white font-black uppercase tracking-tight max-md:text-[1.6rem]">Final <span className="text-orm-gold">Validation</span></h1>
          <div className="w-16 h-1 bg-orm-gold mx-auto rounded-full mt-3"></div>
        </div>
      </div>

      <div className="w-[92%] max-w-[1300px] mx-auto py-[60px] max-md:py-[40px]">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-12 gap-10 max-lg:flex max-lg:flex-col">
          <div className="col-span-7 flex flex-col gap-8">
            <div className="bg-white/[0.02] backdrop-blur-3xl p-8 rounded-[2rem] border border-white/5">
              <h3 className="text-xl font-black mb-8 flex items-center gap-4 text-white/90 uppercase"><FaTruck className="text-orm-gold" size={20} /> Logistics Destination</h3>
              <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                <div className="col-span-2"><label className="block text-[0.55rem] font-bold text-white/30 uppercase tracking-[0.15em] mb-2 ml-2">Commander Name</label>
                  <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Full Name" required className="w-full h-12 px-6 bg-white/[0.05] border border-white/10 rounded-xl text-white outline-none focus:border-orm-gold/50 text-[0.85rem]" /></div>
                <div className="max-md:col-span-2"><label className="block text-[0.55rem] font-bold text-white/30 uppercase tracking-[0.15em] mb-2 ml-2">Secure Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full h-12 px-6 bg-white/[0.05] border border-white/10 rounded-xl text-white outline-none focus:border-orm-gold/50 text-[0.85rem]" /></div>
                <div className="max-md:col-span-2"><label className="block text-[0.55rem] font-bold text-white/30 uppercase tracking-[0.15em] mb-2 ml-2">Contact</label>
                  <input type="tel" name="phone" onChange={handleChange} placeholder="Phone Number" required className="w-full h-12 px-6 bg-white/[0.05] border border-white/10 rounded-xl text-white outline-none focus:border-orm-gold/50 text-[0.85rem]" /></div>
                <div className="col-span-2"><label className="block text-[0.55rem] font-bold text-white/30 uppercase tracking-[0.15em] mb-2 ml-2">Strategic Address</label>
                  <input type="text" name="address" onChange={handleChange} placeholder="Street, District" required className="w-full h-12 px-6 bg-white/[0.05] border border-white/10 rounded-xl text-white outline-none focus:border-orm-gold/50 text-[0.85rem]" /></div>
                <div className="max-md:col-span-2"><label className="block text-[0.55rem] font-bold text-white/30 uppercase tracking-[0.15em] mb-2 ml-2">City/Zone</label>
                  <input type="text" name="city" onChange={handleChange} placeholder="City" required className="w-full h-12 px-6 bg-white/[0.05] border border-white/10 rounded-xl text-white outline-none focus:border-orm-gold/50 text-[0.85rem]" /></div>
                <div className="max-md:col-span-2 flex gap-3"><div className="flex-1"><label className="block text-[0.55rem] font-bold text-white/30 uppercase tracking-[0.15em] mb-2 ml-2">State</label>
                    <input type="text" name="state" onChange={handleChange} placeholder="State" required className="w-full h-12 px-6 bg-white/[0.05] border border-white/10 rounded-xl text-white outline-none focus:border-orm-gold/50 text-[0.85rem]" /></div>
                  <div className="flex-1"><label className="block text-[0.55rem] font-bold text-white/30 uppercase tracking-[0.15em] mb-2 ml-2">Zip</label>
                    <input type="text" name="zip_code" onChange={handleChange} placeholder="Zip" required className="w-full h-12 px-6 bg-white/[0.05] border border-white/10 rounded-xl text-white outline-none focus:border-orm-gold/50 text-[0.85rem]" /></div></div>
              </div>
            </div>

            <div className="bg-white/[0.02] backdrop-blur-3xl p-8 rounded-[2rem] border border-white/5">
              <h3 className="text-xl font-black mb-8 flex items-center gap-4 text-white/90 uppercase"><FaCreditCard className="text-orm-gold" size={20} /> Payment Protocol</h3>
              <div className="flex flex-col gap-3">
                {[ { id: "razorpay", label: "Razorpay / UPI / Netbanking", icon: <SiRazorpay size={18} /> }, { id: "paypal", label: "Global PayPal Terminal", icon: <FaPaypal size={18} /> } ].map((method) => (
                  <div key={method.id} className={`flex items-center justify-between p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === method.id ? "border-orm-gold bg-orm-gold/10" : "border-white/5 hover:border-white/10"}`} onClick={() => setPaymentMethod(method.id)}>
                    <div className="flex items-center gap-4"><div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? "border-orm-gold" : "border-white/10"}`}>{paymentMethod === method.id && <div className="w-2 h-2 bg-orm-gold rounded-full"></div>}</div>
                      <span className="font-bold text-[0.75rem] uppercase tracking-widest">{method.label}</span></div>
                    <div className={paymentMethod === method.id ? "text-orm-gold" : "text-white/10"}>{method.icon}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-5">
            <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 sticky top-[90px]">
              <h3 className="text-xl font-black border-b border-white/5 pb-6 mb-6">Order Review</h3>
              <div className="flex flex-col gap-5 mb-8 max-h-[300px] overflow-y-auto no-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-5">
                    <div className="w-16 aspect-square rounded-xl overflow-hidden border border-white/5 bg-orm-dark shrink-0"><img src={item.image.startsWith("http") ? item.image : `https://orm-backend-gejw.onrender.com${item.image}`} alt={item.title} className="w-full h-full object-cover" /></div>
                    <div className="flex flex-col justify-center"><p className="text-[0.75rem] font-bold text-white line-clamp-1">{item.title}</p><p className="text-[0.65rem] text-white/30 font-black uppercase tracking-widest">Rs. {Number(item.price).toLocaleString()} × {item.quantity}</p></div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mb-8">
                <input type="text" placeholder="Voucher" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="flex-1 bg-white/[0.05] px-4 py-3 text-white text-[0.7rem] font-bold uppercase rounded-xl border border-white/10 outline-none focus:border-orm-gold/50" />
                <button type="button" onClick={handleApplyCoupon} className="bg-white text-black px-6 py-3 rounded-xl font-black text-[0.65rem] uppercase hover:bg-orm-gold transition-all">Apply</button>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-white/30 font-bold text-[0.65rem] uppercase tracking-widest px-1"><span>Subtotal</span><span className="text-white">Rs. {cartTotal.toLocaleString()}</span></div>
                {discountPercent > 0 && <div className="flex justify-between text-orm-gold font-black text-[0.65rem] uppercase px-2 bg-orm-gold/10 py-2 rounded-lg border border-orm-gold/20"><span>Discount ({discountPercent}%)</span><span>- Rs. {discountAmount.toLocaleString()}</span></div>}
                <div className="flex justify-between text-white/30 font-bold text-[0.65rem] uppercase tracking-widest px-1"><span>Logistics</span><span className="text-orm-gold italic">Complementary</span></div>
                <div className="h-[1px] bg-white/5 pt-2"></div>
                <div className="flex justify-between items-end px-1"><span className="text-base font-black">Total</span><span className="font-black text-2xl text-white tracking-tighter">Rs. {finalTotal.toLocaleString()}</span></div>
              </div>
              <button type="submit" className="w-full relative overflow-hidden group/btn bg-orm-gold text-black rounded-xl font-black text-[0.7rem] uppercase tracking-[0.2em] h-14 transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95">
                <span className="relative z-10 flex items-center justify-center gap-2">Authorize Payment <FaArrowRight size={12} /></span>
                <div className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-500 group-hover/btn:translate-y-0"></div>
              </button>
              <div className="mt-6 flex items-center justify-center gap-3 opacity-20"><FaShieldAlt size={12} /><span className="text-[0.55rem] font-bold uppercase tracking-[0.2em]">Encrypted Channel</span></div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
