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

import productVideo from "/video/video.mp4";        // your MP4
import videoThumb from "/image/videothumb.jpg";   // video thumbnail image
import modelThumb from "/image/modelthumb.jpg"; // 3D model thumbnail image

// Example image URLs – replace with your own
const images = [
    "/image/1.jpeg",
    "/image/2.jpeg",
    "/image/1.jpeg",
];

const ProductDetailsPreview = () => {
    const [selectedMedia, setSelectedMedia] = useState({
        type: "image", // "image" | "video" | "model"
        src: images[0],
    });

    const [count, setCount] = useState(1);

    return (
        <section className="details-section">
            <div className="details-container">
                {/* LEFT: MEDIA AREA */}
                <div className="image-side">
                    {/* Main display */}
                    {selectedMedia.type === "image" && (
                        <img
                            src={selectedMedia.src}
                            alt="product"
                            className="main-display"
                        />
                    )}

                    {selectedMedia.type === "video" && (
                        <video
                            className="main-display"
                            src={selectedMedia.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    )}

                    {selectedMedia.type === "model" && (
                        <model-viewer
                            src="/model/orm-model.glb" // your GLB path in public folder
                            alt="ORM Leveling Kit 3D Model"
                            class="main-display"
                            auto-rotate
                            camera-controls
                            disable-zoom="false"
                            interaction-prompt="none"
                            shadow-intensity="1"
                            exposure="1"
                        ></model-viewer>
                    )}

                    {/* Thumbnails row */}
                    <div className="thumbnail-row">
                        {images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                className={`thumb ${selectedMedia.type === "image" && selectedMedia.src === img
                                    ? "active"
                                    : ""
                                    }`}
                                onClick={() =>
                                    setSelectedMedia({
                                        type: "image",
                                        src: img,
                                    })
                                }
                                alt="thumbnail"
                            />
                        ))}

                        {/* Video thumbnail */}
                        <div
                            className={`thumb video-thumb ${selectedMedia.type === "video" ? "active" : ""
                                }`}
                            onClick={() =>
                                setSelectedMedia({ type: "video", src: productVideo })
                            }
                        >
                            <img
                                src={videoThumb}
                                className="video-thumb-img"
                                alt="Video thumbnail"
                            />
                            <span className="play-icon">▶</span>
                        </div>

                        {/* 3D model thumbnail */}
                        <div
                            className={`thumb model-thumb ${selectedMedia.type === "model" ? "active" : ""
                                }`}
                            onClick={() =>
                                setSelectedMedia({ type: "model", src: "/models/orm-leveling-kit.glb" })
                            }
                        >
                            <img
                                src={modelThumb}
                                className="model-thumb-img"
                                alt="3D thumbnail"
                            />
                            <span className="model-badge">3D</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT: DETAILS INFO */}
                <div className="details-info">
                    <h2 className="details-title">
                        Mahindra Thar - ORM Wheel Spacers 35mm (Set of 4)
                    </h2>

                    {/* Price line */}
                    <div className="price-line">
                        <span className="price">Rs. 12,000.00</span>
                        <span className="cut">Rs. 19,000.00</span>
                        <span className="discount">-5%</span>
                    </div>

                    {/* Rating */}
                    <div className="rating-row">
                        <span className="stars">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} />
                            ))}
                        </span>
                        <span className="reviews">(250+ Reviews)</span>
                    </div>

                    {/* Description */}
                    <p className="details-desc">
                        Enhance the stance and stability of your Mahindra Thar with ORM
                        35mm Wheel Spacers (Set of 4). Crafted from high-strength alloy,
                        these spacers push your wheels outward for improved balance,
                        enhanced off-road performance and better road presence.
                    </p>

                    {/* Feature icons */}
                    <div className="icon-features">
                        <div className="feature-box">
                            <FaUndoAlt className="feature-icon" />
                            <span>15 Day Return</span>
                        </div>
                        <div className="feature-box">
                            <FaMoneyBillWave className="feature-icon" />
                            <span>COD Available</span>
                        </div>
                        <div className="feature-box">
                            <FaRegCreditCard className="feature-icon" />
                            <span>EMI Option</span>
                        </div>
                        <div className="feature-box">
                            <FaShieldAlt className="feature-icon" />
                            <span>1 Year Warranty</span>
                        </div>
                    </div>

                    {/* Quantity + Cart row */}
                    <div className="cart-controls">
                        <div className="qty-box">
                            <button
                                onClick={() => setCount((prev) => (prev > 1 ? prev - 1 : 1))}
                            >
                                <BsDash />
                            </button>
                            <span>{count}</span>
                            <button onClick={() => setCount((prev) => prev + 1)}>
                                <BsPlus />
                            </button>
                        </div>

                        <button className="add-btn">
                            <BsCart2 /> Add to Cart
                        </button>

                        <button className="icon-btn">
                            <FaHeart />
                        </button>
                        <button className="icon-btn">
                            <FaRedo />
                        </button>
                    </div>

                    <button className="buy-now">Buy Now</button>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailsPreview;
