import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/client"; // This now works again
import {
  FaStar,
  FaHeart,
  FaSyncAlt,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaRegFileAlt,
  FaMoneyBillWave,
  FaRegCreditCard,
  FaShieldAlt,
  FaPlay,
  FaCube,
} from "react-icons/fa";
import ProductVideoSection from "./ProductVideoSection";
import { useCart } from "../context/CartContext";
import ProductSpecsSection from "./ProductSpecsSection";
import RelatedProducts from "./RelatedProducts";

const ProductDetailsPage = () => {
  // Extract slug from URL (e.g. /product/thar-front-bumper)
  const { slug } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const [activeMedia, setActiveMedia] = useState({ url: "", type: "image" });
  const [gallery, setGallery] = useState([]);

  const BASE_URL = "https://orm-backend-gejw.onrender.com";

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProductData = async () => {
      setLoading(true);

      // Call the function using the slug string
      const data = await fetchProductById(slug);

      if (data) {
        setProduct(data);

        const formatUrl = (path) => {
          if (!path) return "";
          return path.toString().startsWith("http")
            ? path
            : `${BASE_URL}${path}`;
        };

        const mainImgUrl = formatUrl(data.image);
        let mediaItems = [];

        mediaItems.push({ url: mainImgUrl, type: "image" });

        if (data.model_3d) {
          mediaItems.push({
            url: formatUrl(data.model_3d),
            type: "model_3d",
            thumbnail: mainImgUrl,
          });
        }

        if (data.video_file) {
          mediaItems.push({
            url: formatUrl(data.video_file),
            type: "video_file",
            thumbnail: mainImgUrl,
          });
        }

        if (data.images && data.images.length > 0) {
          data.images.forEach((imgObj) => {
            mediaItems.push({ url: formatUrl(imgObj.image), type: "image" });
          });
        }

        setGallery(mediaItems);
        setActiveMedia(mediaItems[0]);
      }
      setLoading(false);
    };
    loadProductData();
  }, [slug]);

  const handleQuantity = (type) => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    else if (type === "inc") setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`${product.title} added to cart!`);
    }
  };

  if (loading) return <div className="p-[50px] text-center text-white text-[1.5rem]">Loading...</div>;
  if (!product) return <div className="p-[50px] text-center text-white text-[1.5rem]">Product Not Found.</div>;

  return (
    <div className="bg-orm-dark text-white min-h-screen font-sans">
      <Navbar />

      <div className="h-[250px] bg-[url('/image/banner.jpg')] bg-cover bg-center relative flex items-center justify-center mt-[80px] max-md:h-[180px]">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-[2] text-center">
          <h1 className="font-merriweather text-[3.5rem] text-white font-black uppercase tracking-tight max-md:text-[2rem]">
            Product <span className="text-orm-gold">Details</span>
          </h1>
          <div className="w-20 h-1 bg-orm-gold mx-auto rounded-full mt-4"></div>
        </div>
      </div>

      <div className="flex flex-wrap w-[92%] max-w-[1400px] mx-auto pt-[80px] pb-[100px] gap-[80px] max-lg:flex-col max-md:w-[95%] max-md:pt-10 max-md:pb-[80px] max-md:gap-12">
        <div className="flex-1 min-w-[400px] max-md:min-w-full">
          <div className="w-full bg-orm-surface border border-orm-gray rounded-3xl overflow-hidden mb-6 h-[600px] flex items-center justify-center shadow-orm-premium max-md:h-[350px] max-md:rounded-2xl">
            {activeMedia.type === "model_3d" ? (
              <model-viewer
                key={activeMedia.url}
                src={activeMedia.url}
                camera-controls
                auto-rotate
                ar
                shadow-intensity="1.5"
                exposure="1.2"
                style={{ width: "100%", height: "100%", background: "transparent" }}
                className="w-full h-full outline-none"
              ></model-viewer>
            ) : activeMedia.type === "video_file" ? (
              <video
                key={activeMedia.url}
                className="w-full h-full block object-contain bg-black"
                autoPlay
                muted
                playsInline
                loop
              >
                <source src={activeMedia.url} type="video/mp4" />
              </video>
            ) : (
              <img
                src={activeMedia.url}
                alt={product.title}
                className="w-full h-full block object-contain transition-transform duration-500 hover:scale-105"
              />
            )}
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
            {gallery.map((item, idx) => (
              <div
                key={idx}
                className={`w-[100px] h-[80px] rounded-xl overflow-hidden border transition-all duration-300 flex-shrink-0 snap-start cursor-pointer ${activeMedia.url === item.url ? "border-orm-gold ring-4 ring-orm-gold/10" : "border-orm-gray opacity-50 hover:opacity-100 hover:border-white/20"}`}
                onClick={() => setActiveMedia(item)}
              >
                {item.type === "model_3d" || item.type === "video_file" ? (
                  <div className="relative w-full h-full bg-orm-darker">
                    <img
                      src={item.thumbnail}
                      alt="thumb"
                      className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-orm-gold">
                      {item.type === "model_3d" ? (
                        <FaCube size={24} />
                      ) : (
                        <FaPlay size={20} />
                      )}
                    </div>
                  </div>
                ) : (
                  <img src={item.url} alt="thumbnail" className="w-full h-full object-cover" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-[400px] max-md:min-w-full">
          <div className="mb-8">
            <span className="text-orm-gold font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Premium Component</span>
            <h1 className="font-merriweather text-[3.2rem] leading-tight font-black mb-6 tracking-tight max-md:text-3xl">{product.title}</h1>
            
            <div className="flex items-center gap-6 mb-8 flex-wrap">
              <div className="flex flex-col">
                <span className="font-sans font-bold text-4xl text-white">
                  Rs. {Number(product.price).toLocaleString()}
                </span>
                {product.old_price && (
                  <span className="text-sm text-white/30 line-through mt-1">
                    Rs. {Number(product.old_price).toLocaleString()}
                  </span>
                )}
              </div>
              <div className="h-10 w-[1px] bg-orm-gray hidden sm:block"></div>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-orm-gold text-xs" />
                  ))}
                </div>
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                  (4.8 / 5.0)
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 bg-orm-surface rounded-3xl border border-orm-gray mb-10">
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Overview</h4>
            <p className="font-sans text-white/70 leading-relaxed text-sm lg:text-base">{product.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-12 lg:grid-cols-4">
            {[
              { icon: <FaRegFileAlt />, label: "15 Day Return" },
              { icon: <FaMoneyBillWave />, label: "Cash on Delivery" },
              { icon: <FaRegCreditCard />, label: "EMI Available" },
              { icon: <FaShieldAlt />, label: "Brand Warranty" }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center p-4 bg-orm-surface rounded-2xl border border-orm-gray/50 text-center">
                <div className="w-10 h-10 bg-orm-gold/10 rounded-full flex items-center justify-center text-orm-gold mb-3">
                  {feature.icon}
                </div>
                <span className="text-[0.65rem] font-bold text-white/60 uppercase tracking-widest">{feature.label}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-6 items-center mb-6 max-md:flex-col">
            <div className="flex items-center bg-orm-surface border border-orm-gray rounded-2xl h-16 px-6 gap-8 max-md:w-full max-md:justify-between">
              <button 
                onClick={() => handleQuantity("dec")} 
                className="text-white/40 hover:text-orm-gold transition-colors text-lg"
              >
                <FaMinus />
              </button>
              <span className="font-bold text-xl w-8 text-center">{quantity}</span>
              <button 
                onClick={() => handleQuantity("inc")} 
                className="text-white/40 hover:text-orm-gold transition-colors text-lg"
              >
                <FaPlus />
              </button>
            </div>
            
            <button 
              className="flex-1 bg-orm-gold text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] h-16 px-10 transition-all duration-300 hover:bg-orm-gold-premium hover:shadow-orm-gold-glow hover:-translate-y-1 active:scale-95 flex justify-center items-center gap-3 max-md:w-full" 
              onClick={handleAddToCart}
            >
              <FaShoppingCart size={18} /> Add to Cart
            </button>
          </div>
          
          <button 
            className="w-full bg-white/5 border border-orm-gray text-white rounded-2xl h-16 font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black hover:border-white max-md:mb-10" 
            onClick={handleAddToCart}
          >
            Express Checkout
          </button>
        </div>
      </div>

      <ProductVideoSection videoUrl={product.video_url} title={product.title} />
      <ProductSpecsSection product={product} />
      <RelatedProducts currentProduct={product} />
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
