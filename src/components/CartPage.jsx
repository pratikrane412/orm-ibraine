import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaMinus, FaPlus, FaArrowRight } from "react-icons/fa";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* 1. HERO SECTION */}
      <div className="relative w-full h-[300px] bg-[url('/image/banner.jpg')] bg-cover bg-center mt-[80px] flex items-center pl-[10%] max-md:h-[200px] max-md:pl-0 max-md:justify-center max-md:text-center max-md:mt-[70px]">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-[2]">
          <h1 className="font-merriweather text-[3.5rem] text-white capitalize max-md:text-[2rem] max-[420px]:text-[1.7rem]">
            Shopping <span className="text-orm-gold">Cart</span>
          </h1>
        </div>
      </div>

      <div className="w-[90%] max-w-[1400px] mx-auto py-[60px] text-white min-h-[50vh] max-md:w-[95%] max-md:py-[40px]">
        {/* Header Row */}
        <div className="flex justify-between items-center border-b border-[#333] pb-[20px] mb-[40px] max-md:flex-col max-md:gap-[10px] max-md:text-center max-md:mb-[30px]">
          <h2 className="font-merriweather text-[2rem] max-md:text-[1.6rem]">Shopping Cart</h2>
          <Link to="/products/thar" className="text-orm-gold font-lato font-medium flex items-center gap-[8px] transition-all duration-300 hover:text-[#ffc107] hover:gap-[12px] max-md:text-[0.9rem]">
            Go Back Shopping <FaArrowRight />
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center p-[50px] max-md:p-[40px_20px]">
            <h3 className="font-merriweather mb-[20px] text-[2rem] max-md:text-[1.5rem]">Your Cart is Empty.</h3>
            <Link to="/products/thar" className="bg-orm-gold text-black p-[10px_20px] no-underline rounded-[5px] font-bold max-md:p-[10px_24px] max-md:text-[0.9rem]">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex gap-[40px] lg:flex-row flex-col max-md:gap-[30px]">
            {/* 2. LEFT SIDE: CART ITEMS LIST */}
            <div className="flex-[3] flex flex-col gap-0">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center bg-[#0a0a0a] border border-[#222] rounded-[10px] p-[15px_25px] mb-[20px] max-md:flex-col max-md:text-center max-md:gap-[15px] max-md:p-[15px]">
                  {/* Image */}
                  <div className="w-[120px] h-[80px] rounded-[8px] overflow-hidden mr-[20px] max-md:w-full max-md:h-[180px] max-md:mr-0 max-[420px]:h-[160px]">
                    <img
                      src={
                        item.image.startsWith("http")
                          ? item.image
                          : `https://orm-backend-gejw.onrender.com${item.image}`
                      }
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-[2]">
                    <h3 className="font-merriweather text-[1.1rem] m-0 leading-[1.4] max-md:text-[1rem]">{item.title}</h3>
                  </div>

                  {/* Quantity Control */}
                  <div className="flex-1 flex items-center gap-[20px] max-md:justify-center max-md:w-full max-md:gap-[15px]">
                    <div className="flex items-center bg-[#fff8e7] rounded-[30px] p-[5px_10px] gap-[15px] text-black font-bold max-md:p-[6px_12px] max-md:gap-[12px]">
                      <button onClick={() => updateQuantity(item.id, "dec")} className="bg-none border-none cursor-pointer text-[0.8rem] flex items-center max-md:text-[0.75rem]">
                        <FaMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, "inc")} className="bg-none border-none cursor-pointer text-[0.8rem] flex items-center max-md:text-[0.75rem]">
                        <FaPlus />
                      </button>
                    </div>
                    {/* Delete Button */}
                    <button
                      className="bg-none border-none text-orm-gold cursor-pointer text-[1.1rem] transition-colors duration-300 hover:text-red-600 max-md:text-[1rem]"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="flex-1 text-right font-merriweather text-[1.2rem] text-white max-md:text-center max-md:w-full max-md:text-[1.1rem]">
                    Rs. {Number(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* 3. RIGHT SIDE: ORDER SUMMARY */}
            <div className="flex-1 bg-[#0a0a0a] border border-[#333] rounded-[10px] p-[25px] h-fit lg:w-auto w-full max-md:p-[20px] max-[420px]:p-[18px]">
              <h3 className="font-merriweather text-[1.5rem] border-b border-[#333] pb-[15px] mb-[20px] max-md:text-[1.4rem]">Cart Total</h3>
              <div className="flex justify-between mb-[30px] font-lato font-medium max-md:text-[0.9rem]">
                <span>Estimated total</span>
                <span className="text-[#ccc]">
                  Rs. {cartTotal.toLocaleString()}.00
                </span>
              </div>

              <Link
                to="/checkout"
                className="w-full !bg-orm-gold !text-black border-none p-[16px] rounded-[50px] font-lato font-bold text-[1.1rem] cursor-pointer flex items-center justify-center gap-[10px] transition-all duration-300 !no-underline shadow-[0_4px_15px_rgba(251,176,59,0.3)] hover:!bg-[#ffc107] hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(251,176,59,0.5)] max-md:p-[14px] max-md:text-[1rem] max-[420px]:text-[0.95rem]"
              >
                Process To Checkout <FaArrowRight />
              </Link>

              <p className="text-[0.8rem] text-[#888] mt-[15px] leading-[1.4] max-md:text-[0.75rem] max-md:text-center">
                Taxes, Discounts and shipping calculated at checkout
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;

