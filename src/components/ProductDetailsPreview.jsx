import React, { useState } from "react";
import "../styles/ProductDetailsPreview.css";
import {
    FaStar,
    FaHeart,
    FaRedo,
    FaUndoAlt,
    FaMoneyBillWave,
    FaRegCreditCard,
    FaShieldAlt,
} from "react-icons/fa";
import { BsCart2, BsDash, BsPlus } from "react-icons/bs";

// ------ IMAGE ARRAY --------
const images = [
    "/image/1.jpeg",   // first position
    "/image/2.jpeg",   // after video/model
    "/image/1.jpeg",   // after video/model
];

const ProductDetailsPreview = () => {
    const [selectedMedia, setSelectedMedia] = useState({
        type: "image",
        src: images[0],
    });

    const [count, setCount] = useState(1);

    return (
        <section className="details-section">
            <div className="details-container">

                {/* LEFT SIDE - MAIN DISPLAY */}
                <div className="image-side">

                    {/* main display switching */}
                    {selectedMedia.type === "image" && (
                        <img src={selectedMedia.src} alt="product" className="main-display" />
                    )}

                    {selectedMedia.type === "video" && (
                        <video
                            className="main-display"
                            src="/video/video.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    )}

                    {selectedMedia.type === "model" && (
                        <model-viewer
                            src="/model/orm-model.glb"
                            alt="3D Model"
                            auto-rotate
                            camera-controls
                            disable-zoom
                            exposure="1"
                            interaction-prompt="none"
                            class="main-display"
                        ></model-viewer>
                    )}

                    {/* THUMBNAIL ROW */}
                    <div className="thumbnail-row">

                        {/* 1️⃣ FIRST IMAGE */}
                        <img
                            src={images[0]}
                            className={`thumb ${selectedMedia.type === "image" && selectedMedia.src === images[0]
                                    ? "active"
                                    : ""
                                }`}
                            onClick={() => setSelectedMedia({ type: "image", src: images[0] })}
                        />

                        {/* 2️⃣ MODEL */}
                        <div
                            className={`thumb model-thumb ${selectedMedia.type === "model" ? "active" : ""
                                }`}
                            onClick={() =>
                                setSelectedMedia({
                                    type: "model",
                                    src: "/model/orm-model.glb",
                                })
                            }
                        >
                            <img src="/image/modelthumb.jpg" className="model-thumb-img" alt="3D thumbnail" />
                            <span className="model-badge">3D</span>
                        </div>

                        {/* 3️⃣ VIDEO */}
                        <div
                            className={`thumb video-thumb ${selectedMedia.type === "video" ? "active" : ""
                                }`}
                            onClick={() =>
                                setSelectedMedia({ type: "video", src: "/video/video.mp4" })
                            }
                        >
                            <img src="/image/videothumb.jpg" className="video-thumb-img" alt="video thumbnail" />
                            <span className="play-icon">▶</span>
                        </div>

                        {/* 4️⃣ SECOND IMAGE */}
                        {images[1] && (
                            <img
                                src={images[1]}
                                className={`thumb ${selectedMedia.type === "image" && selectedMedia.src === images[1]
                                        ? "active"
                                        : ""
                                    }`}
                                onClick={() => setSelectedMedia({ type: "image", src: images[1] })}
                            />
                        )}

                        {/* 5️⃣ THIRD IMAGE */}
                        {images[2] && (
                            <img
                                src={images[2]}
                                className={`thumb ${selectedMedia.type === "image" && selectedMedia.src === images[2]
                                        ? "active"
                                        : ""
                                    }`}
                                onClick={() => setSelectedMedia({ type: "image", src: images[2] })}
                            />
                        )}
                    </div>
                </div>

                {/* RIGHT SIDE INFO */}
                <div className="details-info">
                    <h2 className="details-title">
                        Mahindra Thar ORM Wheel Spacers 35mm (Set of 4)
                    </h2>

                    <div className="price-line">
                        <span className="price">₹12,000</span>
                        <span className="cut">₹19,000</span>
                        <span className="discount">-5%</span>
                    </div>

                    <div className="rating-row">
                        <span className="stars">
                            {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                        </span>
                        <span className="reviews">(250+ Reviews)</span>
                    </div>

                    <p className="details-desc">
                        Enhance stance and stability with ORM high-strength alloy wheel spacers.
                        Increased width improves balance, handling & off-road performance.
                    </p>

                    <div className="icon-features">
                        <div className="feature-box"><FaUndoAlt className="feature-icon" /><span>15 Day Return</span></div>
                        <div className="feature-box"><FaMoneyBillWave className="feature-icon" /><span>COD Available</span></div>
                        <div className="feature-box"><FaRegCreditCard className="feature-icon" /><span>EMI Option</span></div>
                        <div className="feature-box"><FaShieldAlt className="feature-icon" /><span>1 Year Warranty</span></div>
                    </div>

                    <div className="cart-controls">
                        <div className="qty-box">
                            <button onClick={() => setCount(count > 1 ? count - 1 : 1)}><BsDash /></button>
                            <span>{count}</span>
                            <button onClick={() => setCount(count + 1)}><BsPlus /></button>
                        </div>

                        <button className="add-btn"><BsCart2 /> Add to Cart</button>
                        <button className="icon-btn"><FaHeart /></button>
                        <button className="icon-btn"><FaRedo /></button>
                    </div>

                    <button className="buy-now">Buy Now</button>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailsPreview;
