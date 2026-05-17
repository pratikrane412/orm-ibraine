import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/client"; 
import {
  FaStar,
  FaHeart,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaRegFileAlt,
  FaShieldAlt,
  FaPlay,
  FaCube,
} from "react-icons/fa";
import ProductVideoSection from "./ProductVideoSection";
import { useCart } from "../context/CartContext";
import ProductSpecsSection from "./ProductSpecsSection";
import RelatedProducts from "./RelatedProducts";

const ProductDetailsPage = () => {
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
      const data = await fetchProductById(slug);
      if (data) {
        setProduct(data);
        const formatUrl = (path) => (!path ? "" : path.toString().startsWith("http") ? path : `${BASE_URL}${path}`);
        const mainImgUrl = formatUrl(data.image);
        let mediaItems = [{ url: mainImgUrl, type: "image" }];
        if (data.model_3d) mediaItems.push({ url: formatUrl(data.model_3d), type: "model_3d", thumbnail: mainImgUrl });
        if (data.video_file) mediaItems.push({ url: formatUrl(data.video_file), type: "video_file", thumbnail: mainImgUrl });
        if (data.images) data.images.forEach((imgObj) => mediaItems.push({ url: formatUrl(imgObj.image), type: "image" }));
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
      alert(`${product.title} added to arsenal!`);
    }
  };

  if (loading) return <div className="min-h-screen bg-orm-dark flex items-center justify-center"><div className="w-8 h-8 border-t-2 border-orm-gold rounded-full animate-spin"></div></div>;
  if (!product) return <div className="min-h-screen bg-orm-dark flex items-center justify-center text-white/20 font-black text-lg uppercase tracking-widest">Product Not Found</div>;

  return (
    <div className="bg-orm-dark text-white min-h-screen">
      <Navbar />
      <div className="h-[220px] bg-[url('/image/banner.jpg')] bg-cover bg-center relative flex items-center justify-center mt-[70px] max-md:h-[150px]">
        <div className="absolute inset-0 bg-gradient-to-b from-orm-dark via-orm-dark/40 to-orm-dark"></div>
        <div className="relative z-[2] text-center px-6">
          <h1 className="text-[2.2rem] text-white font-black uppercase tracking-tight max-md:text-[1.6rem]">Product <span className="text-orm-gold">Details</span></h1>
          <div className="w-16 h-1 bg-orm-gold mx-auto rounded-full mt-3"></div>
        </div>
      </div>

      <div className="w-[92%] max-w-[1300px] mx-auto py-[50px] grid grid-cols-12 gap-10 max-lg:flex max-lg:flex-col">
        {/* Left: Media Gallery */}
        <div className="col-span-7 flex flex-col gap-5">
          <div className="relative aspect-[4/3] bg-white/[0.02] border border-white/5 rounded-[1.5rem] overflow-hidden shadow-xl">
            {activeMedia.type === "model_3d" ? (
              <model-viewer key={activeMedia.url} src={activeMedia.url} camera-controls auto-rotate shadow-intensity="2" exposure="1.5" environment-image="neutral" style={{ width: "100%", height: "100%" }} className="w-full h-full outline-none"></model-viewer>
            ) : activeMedia.type === "video_file" ? (
              <video key={activeMedia.url} className="w-full h-full object-cover" autoPlay muted playsInline loop><source src={activeMedia.url} type="video/mp4" /></video>
            ) : ( <img src={activeMedia.url} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" /> )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {gallery.map((item, idx) => (
              <button key={idx} className={`relative w-20 aspect-square rounded-lg overflow-hidden border transition-all shrink-0 ${activeMedia.url === item.url ? "border-orm-gold scale-95" : "border-white/5 opacity-40 hover:opacity-100"}`} onClick={() => setActiveMedia(item)}>
                <img src={item.thumbnail || item.url} alt="thumb" className="w-full h-full object-cover" />
                {(item.type === "model_3d" || item.type === "video_file") && ( <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-orm-gold">{item.type === "model_3d" ? <FaCube size={14} /> : <FaPlay size={12} />}</div> )}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="col-span-5">
          <div className="sticky top-[90px]">
            <div className="mb-6">
              <span className="text-orm-gold font-bold text-[0.55rem] uppercase tracking-[0.3em] mb-2 block">Authorized Mutant Part</span>
              <h1 className="text-[2.2rem] leading-[1.1] font-black mb-4 tracking-tight max-md:text-[1.8rem]">{product.title}</h1>
              <div className="flex items-center gap-5 mb-6 flex-wrap">
                <div className="flex flex-col"><span className="font-black text-3xl text-white tracking-tighter">Rs. {Number(product.price).toLocaleString()}</span>
                  {product.old_price && <span className="text-sm text-white/20 line-through mt-0.5 tracking-tighter">Rs. {Number(product.old_price).toLocaleString()}</span>}
                </div>
                <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>
                <div className="flex flex-col gap-0.5">
                   <div className="flex gap-0.5 text-orm-gold">{[...Array(5)].map((_, i) => <FaStar key={i} size={9} />)}</div>
                   <span className="text-white/30 text-[0.5rem] font-black uppercase tracking-[0.15em]">Verified Performance</span>
                </div>
              </div>
              <div className="p-6 bg-white/[0.02] backdrop-blur-3xl rounded-[1.5rem] border border-white/5">
                <h4 className="text-[0.55rem] font-black text-white/30 uppercase tracking-[0.2em] mb-3">Intelligence</h4>
                <p className="text-white/60 leading-relaxed text-[0.9rem] italic max-md:text-sm">"{product.description}"</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mb-6">
              {[{ icon: <FaRegFileAlt />, label: "15 Day Return" }, { icon: <FaShieldAlt />, label: "Brand Warranty" }].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/5">
                  <div className="w-8 h-8 bg-orm-gold/10 rounded-lg flex items-center justify-center text-orm-gold shrink-0">{feature.icon}</div>
                  <span className="text-[0.55rem] font-black text-white uppercase tracking-widest">{feature.label}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 items-center mb-6 max-md:flex-col">
              <div className="flex items-center bg-white/[0.03] border border-white/10 rounded-xl h-14 px-6 gap-6 max-md:w-full max-md:justify-between">
                <button onClick={() => handleQuantity("dec")} className="text-white/20 hover:text-white transition-colors p-1"><FaMinus size={10} /></button>
                <span className="font-black text-lg w-5 text-center">{quantity}</span>
                <button onClick={() => handleQuantity("inc")} className="text-white/20 hover:text-white transition-colors p-1"><FaPlus size={10} /></button>
              </div>
              <button className="flex-1 relative overflow-hidden group/btn bg-orm-gold text-black rounded-xl font-black text-[0.65rem] uppercase tracking-[0.15em] h-14 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 active:scale-95 max-md:w-full" onClick={handleAddToCart}>
                <span className="relative z-10 flex items-center justify-center gap-2"><FaShoppingCart size={14} /> Secure Order</span>
                <div className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-500 group-hover/btn:translate-y-0"></div>
              </button>
            </div>
          </div>
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
