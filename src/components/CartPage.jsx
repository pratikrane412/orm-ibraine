import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaMinus, FaPlus, FaArrowRight } from "react-icons/fa";
import "../styles/CartPage.css";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* 1. HERO SECTION */}
      <div className="cart-hero">
        <div className="cart-hero-overlay"></div>
        <div className="cart-hero-content">
          <h1>
            Shopping <span className="highlight">Cart</span>
          </h1>
        </div>
      </div>

      <div className="cart-container">
        {/* Header Row */}
        <div className="cart-header-row">
          <h2>Shopping Cart</h2>
          <Link to="/products/thar" className="continue-shopping">
            Go Back Shopping <FaArrowRight />
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart-msg">
            <h3>Your Cart is Empty.</h3>
            <Link to="/products/thar" className="btn-shop-now">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* 2. LEFT SIDE: CART ITEMS LIST */}
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-row">
                  {/* Image */}
                  <div className="cart-item-img">
                    <img
                      src={
                        item.image.startsWith("http")
                          ? item.image
                          : `http://127.0.0.1:8000${item.image}`
                      }
                      alt={item.title}
                    />
                  </div>

                  {/* Details */}
                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                  </div>

                  {/* Quantity Control */}
                  <div className="cart-item-qty">
                    <div className="qty-pill">
                      <button onClick={() => updateQuantity(item.id, "dec")}>
                        <FaMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, "inc")}>
                        <FaPlus />
                      </button>
                    </div>
                    {/* Delete Button */}
                    <button
                      className="delete-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="cart-item-price">
                    Rs. {Number(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* 3. RIGHT SIDE: ORDER SUMMARY */}
            <div className="cart-summary">
              <h3>Cart Total</h3>
              <div className="summary-row">
                <span>Estimated total</span>
                <span className="summary-price">
                  Rs. {cartTotal.toLocaleString()}.00
                </span>
              </div>

              <Link
                to="/checkout"
                className="btn-checkout-gold"
                style={{ textDecoration: "none" }}
              >
                Process To Checkout <FaArrowRight />
              </Link>

              <p className="checkout-note">
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
