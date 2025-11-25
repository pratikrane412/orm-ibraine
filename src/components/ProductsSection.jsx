import React from "react";
import "../styles/ProductsSection.css";
import { FaStar, FaRegHeart } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";

const products = [
  {
    id: 1,
    title: "Thar Roxx - Front Seat Organizer",
    price: "3,990.00",
    original: "9,900.00",
    rating: 4,
    image: "/image/1.jpeg",
  },
  {
    id: 2,
    title: "Thar Roxx - Rear Seat Organizer",
    price: "3,990.00",
    original: "9,900.00",
    rating: 5,
    image: "/image/2.jpeg",
  },
  {
    id: 3,
    title: "Thar Roxx - Fuel Lid Cover",
    price: "1,790.00",
    original: "9,900.00",
    rating: 5,
    image: "/image/1.jpeg",
  },
];

const ProductsSection = () => {
  return (
    <section id="products" className="products-section">
      <div className="products-container">
        {products.map((item) => (
          <div className="product-card" key={item.id}>
            <span className="tag">Sale</span>
            <button className="wishlist-btn">
              <FaRegHeart />
            </button>

            <img src={item.image} className="product-img" alt={item.title} />

            <div className="product-info">
              <h3 className="product-title">{item.title}</h3>

              <div className="price-row">
                <span className="price">Rs. {item.price}</span>
                <span className="cut-price">Rs. {item.original}</span>
              </div>

              <div className="stars">
                {[...Array(item.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <button className="cart-btn">
                <BsCart2 /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
