import { useState } from "react";
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
  "/image/1.jpeg", // first position
  "/image/2.jpeg", // after video/model
  "/image/1.jpeg", // after video/model
];

const ProductDetailsPreview = () => {
  const [selectedMedia, setSelectedMedia] = useState({
    type: "image",
    src: images[0],
  });

  const [count, setCount] = useState(1);

  return (
    <section className="py-[5rem] px-[2rem] bg-black text-white">
      <div className="max-w-[1300px] mx-auto grid grid-cols-[1.2fr_1fr] gap-[3rem] max-lg:grid-cols-1">
        {/* LEFT SIDE - MAIN DISPLAY */}
        <div className="w-full">
          {/* main display switching */}
          {selectedMedia.type === "image" && (
            <img
              src={selectedMedia.src}
              alt="product"
              className="w-full h-[450px] object-cover border-[3px] border-[#f5a623] rounded-[14px] bg-black"
            />
          )}

          {selectedMedia.type === "video" && (
            <video
              className="w-full h-[450px] object-cover border-[3px] border-[#f5a623] rounded-[14px] bg-black"
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
              class="w-full h-[450px] border-[3px] border-[#f5a623] rounded-[14px] [background:radial-gradient(circle_at_center,_#222_0%,_#000_55%,_#000_100%)]"
            ></model-viewer>
          )}

          {/* THUMBNAIL ROW */}
          <div className="flex gap-[1rem] mt-[1rem] flex-wrap max-sm:gap-[0.5rem]">
            {/* 1️⃣ FIRST IMAGE */}
            <div
              className={`w-[120px] h-[80px] rounded-[10px] cursor-pointer overflow-hidden border-2 transition-all max-sm:w-[90px] max-sm:h-[60px] ${
                selectedMedia.type === "image" &&
                selectedMedia.src === images[0]
                  ? "border-[#f5a623] opacity-100"
                  : "border-transparent opacity-70 hover:opacity-[0.95]"
              }`}
              onClick={() =>
                setSelectedMedia({ type: "image", src: images[0] })
              }
            >
              <img src={images[0]} className="w-full h-full object-cover" alt="thumbnail 1" />
            </div>

            {/* 2️⃣ MODEL */}
            <div
              className={`w-[120px] h-[80px] rounded-[10px] cursor-pointer overflow-hidden border-2 relative transition-all max-sm:w-[90px] max-sm:h-[60px] ${
                selectedMedia.type === "model" 
                  ? "border-[#f5a623] opacity-100" 
                  : "border-transparent opacity-70 hover:opacity-[0.95]"
              }`}
              onClick={() =>
                setSelectedMedia({
                  type: "model",
                  src: "/model/orm-model.glb",
                })
              }
            >
              <img
                src="/image/modelthumb.jpg"
                className="w-full h-full object-cover"
                alt="3D thumbnail"
              />
              <span className="absolute bottom-[6px] right-[8px] bg-[#f5a623] text-black text-[0.7rem] font-[800] px-[6px] py-[2px] rounded-full">3D</span>
            </div>

            {/* 3️⃣ VIDEO */}
            <div
              className={`w-[120px] h-[80px] rounded-[10px] cursor-pointer overflow-hidden border-2 relative transition-all max-sm:w-[90px] max-sm:h-[60px] ${
                selectedMedia.type === "video" 
                  ? "border-[#f5a623] opacity-100" 
                  : "border-transparent opacity-70 hover:opacity-[0.95]"
              }`}
              onClick={() =>
                setSelectedMedia({ type: "video", src: "/video/video.mp4" })
              }
            >
              <img
                src="/image/videothumb.jpg"
                className="w-full h-full object-cover"
                alt="video thumbnail"
              />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[1.7rem] font-[900] text-white [text-shadow:0_0_10px_black]">▶</span>
            </div>

            {/* 4️⃣ SECOND IMAGE */}
            {images[1] && (
              <div
                className={`w-[120px] h-[80px] rounded-[10px] cursor-pointer overflow-hidden border-2 transition-all max-sm:w-[90px] max-sm:h-[60px] ${
                  selectedMedia.type === "image" &&
                  selectedMedia.src === images[1]
                    ? "border-[#f5a623] opacity-100"
                    : "border-transparent opacity-70 hover:opacity-[0.95]"
                }`}
                onClick={() =>
                  setSelectedMedia({ type: "image", src: images[1] })
                }
              >
                <img src={images[1]} className="w-full h-full object-cover" alt="thumbnail 2" />
              </div>
            )}

            {/* 5️⃣ THIRD IMAGE */}
            {images[2] && (
              <div
                className={`w-[120px] h-[80px] rounded-[10px] cursor-pointer overflow-hidden border-2 transition-all max-sm:w-[90px] max-sm:h-[60px] ${
                  selectedMedia.type === "image" &&
                  selectedMedia.src === images[2]
                    ? "border-[#f5a623] opacity-100"
                    : "border-transparent opacity-70 hover:opacity-[0.95]"
                }`}
                onClick={() =>
                  setSelectedMedia({ type: "image", src: images[2] })
                }
              >
                <img src={images[2]} className="w-full h-full object-cover" alt="thumbnail 3" />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE INFO */}
        <div className="flex flex-col">
          <h2 className="text-[2.2rem] font-bold mb-[1rem] max-sm:text-[1.7rem]">
            Mahindra Thar ORM Wheel Spacers 35mm (Set of 4)
          </h2>

          <div className="flex items-center gap-[12px]">
            <span className="text-[1.7rem] font-[800] text-white">₹12,000</span>
            <span className="line-through opacity-[0.6]">₹19,000</span>
            <span className="bg-[#f5a623] px-[10px] py-[3px] rounded-[8px] text-black font-bold">-5%</span>
          </div>

          <div className="flex items-center gap-[12px] my-[10px]">
            <span className="text-[#ffc107] text-[1rem] flex">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </span>
            <span className="opacity-[0.8]">(250+ Reviews)</span>
          </div>

          <p className="my-[10px] mb-[20px] opacity-[0.9] text-[0.95rem] leading-[1.6]">
            Enhance stance and stability with ORM high-strength alloy wheel
            spacers. Increased width improves balance, handling & off-road
            performance.
          </p>

          <div className="flex justify-between my-[1.5rem] mb-[2rem] gap-[1rem] max-lg:flex-wrap">
            <div className="bg-[#111] p-[1rem_0.8rem] rounded-[12px] border border-[#222] w-[22%] text-center flex flex-col items-center gap-[6px] text-white max-lg:w-[calc(50%-0.5rem)]">
              <FaUndoAlt className="text-[1.5rem] text-[#f5a623]" />
              <span className="text-[0.85rem] font-semibold text-[#e2e2e2]">15 Day Return</span>
            </div>
            <div className="bg-[#111] p-[1rem_0.8rem] rounded-[12px] border border-[#222] w-[22%] text-center flex flex-col items-center gap-[6px] text-white max-lg:w-[calc(50%-0.5rem)]">
              <FaMoneyBillWave className="text-[1.5rem] text-[#f5a623]" />
              <span className="text-[0.85rem] font-semibold text-[#e2e2e2]">COD Available</span>
            </div>
            <div className="bg-[#111] p-[1rem_0.8rem] rounded-[12px] border border-[#222] w-[22%] text-center flex flex-col items-center gap-[6px] text-white max-lg:w-[calc(50%-0.5rem)]">
              <FaRegCreditCard className="text-[1.5rem] text-[#f5a623]" />
              <span className="text-[0.85rem] font-semibold text-[#e2e2e2]">EMI Option</span>
            </div>
            <div className="bg-[#111] p-[1rem_0.8rem] rounded-[12px] border border-[#222] w-[22%] text-center flex flex-col items-center gap-[6px] text-white max-lg:w-[calc(50%-0.5rem)]">
              <FaShieldAlt className="text-[1.5rem] text-[#f5a623]" />
              <span className="text-[0.85rem] font-semibold text-[#e2e2e2]">1 Year Warranty</span>
            </div>
          </div>

          <div className="flex items-center gap-[1rem]">
            <div className="flex items-center gap-[10px] bg-[#141414] p-[0.6rem_1rem] rounded-[8px]">
              <button onClick={() => setCount(count > 1 ? count - 1 : 1)} className="bg-transparent border-none text-white cursor-pointer hover:text-[#f5a623]">
                <BsDash />
              </button>
              <span className="min-w-[20px] text-center">{count}</span>
              <button onClick={() => setCount(count + 1)} className="bg-transparent border-none text-white cursor-pointer hover:text-[#f5a623]">
                <BsPlus />
              </button>
            </div>

            <button className="flex-1 bg-[#f5a623] text-black p-[0.9rem] font-bold rounded-[10px] flex justify-center gap-[10px] border-none cursor-pointer hover:bg-[#e09a1f] transition-colors">
              <BsCart2 /> Add to Cart
            </button>
            <button className="bg-[#141414] p-[0.6rem] rounded-full border border-[#333] cursor-pointer hover:bg-[#222] transition-colors flex items-center justify-center">
              <FaHeart />
            </button>
            <button className="bg-[#141414] p-[0.6rem] rounded-full border border-[#333] cursor-pointer hover:bg-[#222] transition-colors flex items-center justify-center">
              <FaRedo />
            </button>
          </div>

          <button className="mt-[20px] w-full p-[1rem] rounded-[12px] bg-transparent border-2 border-[#f5a623] text-[#f5a623] font-bold text-[1.1rem] cursor-pointer hover:bg-[#f5a623] hover:text-black transition-all">Buy Now</button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPreview;
