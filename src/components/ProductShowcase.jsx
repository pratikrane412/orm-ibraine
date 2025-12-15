import React, { useState, useEffect } from "react";
import "../styles/ProductShowcase.css";
// npm install react-icons
import { FaShoppingCart, FaHeart, FaStar, FaStarHalfAlt } from "react-icons/fa";

// --- MOCK API FUNCTION (Simulates a server) ---
const fetchMockProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Thar Roxx - Front Seat Organizer",
          price: 3990.00,
          oldPrice: 5999.00,
          image: "https://cdn.shopify.com/s/files/1/0726/6061/5416/files/Hilux-ORM2-3_LiftDiffDropKit_3.jpg?v=1760416746", // Replace with your images
          rating: 4.5,
          isSale: true,
        },
        {
          id: 2,
          title: "Thar Roxx - Rear Seat Organizer",
          price: 3990.00,
          oldPrice: 5999.00,
          image: "https://cdn.shopify.com/s/files/1/0726/6061/5416/files/HiluxUpperControlArm_1.jpg?v=1760177386",
          rating: 5,
          isSale: false, // Example of no sale tag (optional)
        },
        {
          id: 3,
          title: "Thar Roxx - Fuel Lid Cover",
          price: 1790.00,
          oldPrice: 2500.00,
          image: "https://cdn.shopify.com/s/files/1/0726/6061/5416/files/Hilux-ORMFrontStabilizerLink_4.png?v=1761990432",
          rating: 5,
          isSale: true,
        },
        {
          id: 4,
          title: "Thar Roxx - Passenger Grab Handle",
          price: 3990.00,
          oldPrice: 4500.00,
          image: "https://cdn.shopify.com/s/files/1/0726/6061/5416/files/50mmspacers_2_118dd281-9bc5-4a4a-8d03-8d73077e4e89.png?v=1765366173",
          rating: 4.5,
          isSale: true,
        },
      ]);
    }, 1500); // Simulates 1.5 second loading time
  });
};

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH DATA ON MOUNT ---
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMockProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Helper to render stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="star-icon filled" />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<FaStarHalfAlt key={i} className="star-icon filled" />);
      } else {
        stars.push(<FaStar key={i} className="star-icon empty" />);
      }
    }
    return stars;
  };

  return (
    <section className="product-section">
      <div className="product-container">
        <h2 className="section-title">
          Must-Have Thar <span className="highlight">Wheel Upgrade</span>
        </h2>

        {loading ? (
          <div className="loading-spinner">Loading Products...</div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                
                {/* IMAGE AREA */}
                <div className="product-img-wrapper">
                  <img src={product.image} alt={product.title} />
                  
                  {product.isSale && <span className="sale-badge">Sale</span>}
                  
                  <button className="wishlist-btn">
                    <FaHeart />
                  </button>
                </div>

                {/* INFO AREA */}
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  
                  <div className="price-rating-row">
                    <div className="price-box">
                      <span className="current-price">Rs. {product.price.toLocaleString()}</span>
                      <span className="old-price">Rs. {product.oldPrice.toLocaleString()}</span>
                    </div>
                    <div className="rating-box">
                      {renderStars(product.rating)}
                    </div>
                  </div>

                  {/* ADD TO CART BUTTON */}
                  <button className="add-cart-btn">
                    <FaShoppingCart className="cart-icon" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductShowcase;