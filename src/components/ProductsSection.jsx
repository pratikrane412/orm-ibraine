import { FaStar, FaRegHeart } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
// Removed: import "../styles/ProductsSection.css";

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
    <section id="products" className="bg-black px-[2rem] py-[4rem]">
      <div className="max-w-[1250px] mx-auto grid grid-cols-3 gap-[2rem] max-lg:grid-cols-2 max-md:grid-cols-1">
        {products.map((item) => (
          <div className="bg-[#111] rounded-[18px] border-[1.8px] border-[#f5a623] overflow-hidden relative flex flex-col" key={item.id}>
            <span className="bg-[#f5a623] px-[18px] py-[5px] text-[0.85rem] font-bold rounded-br-[12px] absolute top-0 left-0">Sale</span>
            <button className="absolute top-[10px] right-[10px] bg-black/50 border-none rounded-full p-[8px] text-white cursor-pointer hover:bg-black/70 transition-colors">
              <FaRegHeart />
            </button>

            <img src={item.image} className="w-full h-[260px] object-cover" alt={item.title} />

            <div className="bg-black p-[1.1rem]">
              <h3 className="text-[1.05rem] font-bold text-white mb-[0.4rem]">{item.title}</h3>

              <div className="flex gap-[10px] mb-[4px]">
                <span className="text-white font-bold">Rs. {item.price}</span>
                <span className="text-[#888] line-through text-[0.9rem]">Rs. {item.original}</span>
              </div>

              <div className="text-[#ffc107] text-[0.85rem] mb-[0.9rem] flex">
                {[...Array(item.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <button className="w-full bg-white border-none p-[0.9rem] rounded-[12px] text-[1rem] font-semibold flex justify-center gap-[10px] cursor-pointer hover:bg-gray-100 transition-colors">
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
