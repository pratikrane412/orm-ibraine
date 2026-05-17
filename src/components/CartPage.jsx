import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaMinus, FaPlus, FaArrowRight } from "react-icons/fa";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="bg-orm-dark text-white min-h-screen">
      <Navbar />
      <div className="h-[220px] bg-[url('/image/banner.jpg')] bg-cover bg-center relative flex items-center justify-center text-center mt-[70px] max-md:h-[150px]">
        <div className="absolute inset-0 bg-gradient-to-b from-orm-dark via-orm-dark/40 to-orm-dark"></div>
        <div className="relative z-[2] px-6">
          <h1 className="text-[2.2rem] text-white font-black uppercase tracking-tight max-md:text-[1.8rem]">Shopping <span className="text-orm-gold">Cart</span></h1>
          <div className="w-16 h-1 bg-orm-gold mx-auto rounded-full mt-3"></div>
        </div>
      </div>

      <div className="w-[92%] max-w-[1300px] mx-auto py-[60px] min-h-[50vh]">
        <div className="flex justify-between items-end mb-[40px] max-md:flex-col max-md:items-center max-md:gap-4">
          <div>
            <h2 className="text-[1.8rem] font-black leading-tight max-md:text-[1.5rem]">Review Selection</h2>
            <p className="text-white/40 text-xs tracking-widest uppercase mt-1">{cartItems.length} Mutant components ready</p>
          </div>
          <Link to="/collections/thar" className="group flex items-center gap-3 text-orm-gold font-bold uppercase tracking-[0.15em] text-[0.65rem] transition-all hover:text-white">
            <FaArrowRight className="rotate-180" size={10} /> Continue Exploration
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] rounded-[2rem] border border-white/5">
            <h3 className="mb-8 text-[1.8rem] font-black opacity-20">Arsenal is empty</h3>
            <Link to="/collections/thar" className="bg-orm-gold text-black px-10 py-4 rounded-full font-black uppercase tracking-[0.15em] text-[0.65rem] shadow-xl transition-all hover:bg-white hover:-translate-y-0.5">Equip Your Vehicle</Link>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-10 max-lg:flex max-lg:flex-col">
            <div className="col-span-8 flex flex-col gap-5">
              {cartItems.map((item) => (
                <div key={item.id} className="group relative flex items-center bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[1.5rem] p-6 transition-all hover:bg-white/[0.04] max-md:flex-col">
                  <div className="w-[140px] aspect-[4/3] rounded-xl overflow-hidden mr-8 bg-orm-dark max-md:w-full max-md:mr-0 max-md:mb-6">
                    <img src={item.image.startsWith("http") ? item.image : `https://orm-backend-gejw.onrender.com${item.image}`} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="flex-[2]">
                    <span className="text-orm-gold text-[0.5rem] font-black uppercase tracking-[0.15em] mb-1.5 block opacity-60">Verified Component</span>
                    <h3 className="text-lg font-black text-white mb-1.5 leading-tight group-hover:text-orm-gold transition-colors">{item.title}</h3>
                    <p className="text-white/20 text-[0.65rem] font-bold uppercase tracking-widest">SKU: {item.id}</p>
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-6 max-md:w-full max-md:my-6">
                    <div className="flex items-center bg-white/[0.05] border border-white/10 rounded-xl h-10 px-5 gap-5 text-white font-bold text-sm">
                      <button onClick={() => updateQuantity(item.id, "dec")} className="text-white/20 hover:text-white transition-colors"><FaMinus size={10} /></button>
                      <span className="w-3 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, "inc")} className="text-white/20 hover:text-white transition-colors"><FaPlus size={10} /></button>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-end gap-3 max-md:items-center max-md:w-full">
                    <span className="font-black text-xl text-white tracking-tighter">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                    <button className="text-white/20 hover:text-red-500 transition-colors flex items-center gap-2 font-bold uppercase text-[0.55rem] tracking-widest" onClick={() => removeFromCart(item.id)}><FaTrashAlt size={10} /> Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-4">
              <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-[2rem] p-8 h-fit sticky top-[90px]">
                <h3 className="text-xl font-black border-b border-white/5 pb-6 mb-6">Arsenal Summary</h3>
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex justify-between items-center text-white/40 font-bold text-[0.65rem] uppercase tracking-widest"><span>Subtotal</span><span className="text-white">Rs. {cartTotal.toLocaleString()}</span></div>
                  <div className="flex justify-between items-center text-white/40 font-bold text-[0.65rem] uppercase tracking-widest"><span>Logistics</span><span className="text-orm-gold">Complementary</span></div>
                  <div className="h-[1px] bg-white/5 my-1"></div>
                  <div className="flex justify-between items-end"><span className="text-base font-bold">Estimated total</span><span className="font-black text-2xl text-orm-gold tracking-tighter">Rs. {cartTotal.toLocaleString()}</span></div>
                </div>
                <Link to="/checkout" className="w-full relative overflow-hidden group/btn bg-white text-black py-4 rounded-xl font-black text-[0.7rem] uppercase tracking-[0.15em] flex items-center justify-center gap-3 transition-all hover:shadow-lg hover:-translate-y-0.5">
                  <span className="relative z-10">Proceed to Checkout</span>
                  <FaArrowRight className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1.5" size={10} />
                  <div className="absolute inset-0 bg-orm-gold translate-y-[100%] transition-transform duration-500 group-hover/btn:translate-y-0"></div>
                </Link>
                <p className="text-[0.55rem] text-white/20 font-bold text-center mt-6 uppercase tracking-[0.15em] leading-relaxed">Taxes and Duties finalized at procurement</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
