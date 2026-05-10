import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

// IMAGES: These will appear INSIDE the big text "OFF ROAD MUTANTS"
const maskImages = ["/image/vehicle-move.jpg", "/image/car-ai.png"];

const Footer = () => {
  const [currentImg, setCurrentImg] = useState(0);

  // Cycle images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % maskImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-gradient-to-b from-orm-dark to-black relative text-white pt-[80px] overflow-hidden font-lato">
      {/* Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(251, 176, 59, 0.03), transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(251, 176, 59, 0.02), transparent 50%),
          repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.01) 2px, rgba(255, 255, 255, 0.01) 4px)
        `
      }}></div>

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(251,176,59,0.4)] to-transparent z-[1]"></div>

      <div className="w-[90%] max-w-[1400px] mx-auto relative z-[2]">
        {/* --- TOP SECTION --- */}
        <div className="flex justify-between gap-[60px] mb-[50px] flex-wrap max-[768px]:flex-col max-[768px]:items-center max-[768px]:text-center">
          {/* LOGO & DESC */}
          <div className="max-w-[380px] max-[768px]:mb-[40px]">
            <img
              src="/image/gg.png"
              alt="ORM Logo"
              className="w-[170px] mb-[20px] drop-shadow-[0_0_10px_rgba(251,176,59,0.3)]"
            />
            <p className="text-[#ccc] text-[0.95rem] leading-[1.7]">
              Off-Road Mutants (ORM) isn't just a brand — it's a movement. Tough
              gear, tested on the harshest terrains, built for those who never
              stop exploring.
            </p>
          </div>

          {/* LINKS GRID */}
          <div className="flex gap-[50px] flex-wrap max-[1024px]:grid max-[1024px]:grid-cols-2 max-[1024px]:gap-[32px] max-[768px]:w-full max-[480px]:gap-[24px]">
            {/* Col 1 */}
            <div className="flex flex-col gap-[10px] min-w-[160px] max-[768px]:items-center max-[768px]:text-center">
              <h3 className="font-merriweather text-orm-gold text-[1.05rem] mb-[6px] max-[768px]:text-[1rem] max-[768px]:mb-[12px]">Discover</h3>
              <a href="#" className="text-[#ccc] no-underline text-[0.9rem] transition-colors duration-[0.25s] hover:text-orm-gold max-[768px]:leading-[1.6]">New Arrivals</a>
              <a href="#" className="text-[#ccc] no-underline text-[0.9rem] transition-colors duration-[0.25s] hover:text-orm-gold max-[768px]:leading-[1.6]">Accessories</a>
              <a href="#" className="text-[#ccc] no-underline text-[0.9rem] transition-colors duration-[0.25s] hover:text-orm-gold max-[768px]:leading-[1.6]">Off-Road Kits</a>
              <a href="#" className="text-[#ccc] no-underline text-[0.9rem] transition-colors duration-[0.25s] hover:text-orm-gold max-[768px]:leading-[1.6]">Contact Us</a>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col gap-[10px] min-w-[160px] max-[768px]:items-center max-[768px]:text-center">
              <h3 className="font-merriweather text-orm-gold text-[1.05rem] mb-[6px] max-[768px]:text-[1rem] max-[768px]:mb-[12px]">Car Option</h3>
              <a href="#" className="text-[#ccc] no-underline text-[0.9rem] transition-colors duration-[0.25s] hover:text-orm-gold max-[768px]:leading-[1.6]">BYD</a>
              <a href="#" className="text-[#ccc] no-underline text-[0.9rem] transition-colors duration-[0.25s] hover:text-orm-gold max-[768px]:leading-[1.6]">Scorpio</a>
              <a href="#" className="text-[#ccc] no-underline text-[0.9rem] transition-colors duration-[0.25s] hover:text-orm-gold max-[768px]:leading-[1.6]">Suzuki Jimny</a>
              <a href="#" className="text-[#ccc] no-underline text-[0.9rem] transition-colors duration-[0.25s] hover:text-orm-gold max-[768px]:leading-[1.6]">Toyota Hilux</a>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col gap-[10px] min-w-[160px] max-[768px]:items-center max-[768px]:text-center">
              <h3 className="font-merriweather text-orm-gold text-[1.05rem] mb-[6px] max-[768px]:text-[1rem] max-[768px]:mb-[12px]">Car Option</h3>
              <a href="#" className="text-[#ccc] no-underline text-[0.9rem] transition-colors duration-[0.25s] hover:text-orm-gold max-[768px]:leading-[1.6]">Toyota Fortuner</a>
              <a href="#" className="text-[#ccc] no-underline text-[0.9rem] transition-colors duration-[0.25s] hover:text-orm-gold max-[768px]:leading-[1.6]">Range Rover Defender</a>
              <a href="#" className="text-[#ccc] no-underline text-[0.9rem] transition-colors duration-[0.25s] hover:text-orm-gold max-[768px]:leading-[1.6]">Mahindra Thar & Roxx</a>
              <a href="#" className="text-[#ccc] no-underline text-[0.9rem] transition-colors duration-[0.25s] hover:text-orm-gold max-[768px]:leading-[1.6]">Jeep Rubicon Wrangler</a>
            </div>

            {/* Col 4 */}
            <div className="flex flex-col gap-[10px] min-w-[160px] max-[768px]:items-center max-[768px]:text-center">
              <h3 className="font-merriweather text-orm-gold text-[1.05rem] mb-[6px] max-[768px]:text-[1rem] max-[768px]:mb-[12px]">Our Policies</h3>
              <a href="#" className="text-[#ccc] no-underline text-[0.9rem] transition-colors duration-[0.25s] hover:text-orm-gold max-[768px]:leading-[1.6]">Privacy Policy</a>
              <a href="#" className="text-[#ccc] no-underline text-[0.9rem] transition-colors duration-[0.25s] hover:text-orm-gold max-[768px]:leading-[1.6]">Terms of Service</a>
              <a href="#" className="text-[#ccc] no-underline text-[0.9rem] transition-colors duration-[0.25s] hover:text-orm-gold max-[768px]:leading-[1.6]">Refund Policy</a>
              <a href="#" className="text-[#ccc] no-underline text-[0.9rem] transition-colors duration-[0.25s] hover:text-orm-gold max-[768px]:leading-[1.6]">Code of Conduct</a>
            </div>
          </div>
        </div>

        <hr className="border-none h-[1px] bg-gradient-to-r from-transparent via-[rgba(251,176,59,0.4)] to-transparent my-[40px]" />

        {/* --- BOTTOM SECTION --- */}
        <div className="flex justify-between items-center gap-[20px] flex-wrap pb-[40px] text-[#888] text-[0.9rem] max-[768px]:flex-col max-[768px]:text-center max-[768px]:gap-[24px]">
          <p className="">© 2026, ORM. All Rights Reserved</p>

          <div className="flex gap-[16px]">
            <a href="#" aria-label="Facebook" className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.05)] border border-[rgba(251,176,59,0.3)] text-white transition-all duration-300 hover:text-orm-gold hover:border-orm-gold hover:shadow-[0_0_12px_rgba(251,176,59,0.5)]">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram" className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.05)] border border-[rgba(251,176,59,0.3)] text-white transition-all duration-300 hover:text-orm-gold hover:border-orm-gold hover:shadow-[0_0_12px_rgba(251,176,59,0.5)]">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter" className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.05)] border border-[rgba(251,176,59,0.3)] text-white transition-all duration-300 hover:text-orm-gold hover:border-orm-gold hover:shadow-[0_0_12px_rgba(251,176,59,0.5)]">
              <FaTwitter />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.05)] border border-[rgba(251,176,59,0.3)] text-white transition-all duration-300 hover:text-orm-gold hover:border-orm-gold hover:shadow-[0_0_12px_rgba(251,176,59,0.5)]">
              <FaLinkedin />
            </a>
          </div>

          <p className="">
            Design & Developed by <a href="#" className="text-orm-gold no-underline">ibraine</a>
          </p>
        </div>
      </div>

      {/* --- GIANT MASKED TEXT --- */}
      <div className="py-[60px] px-0 pb-[40px] border-t border-[rgba(251,176,59,0.3)] relative overflow-hidden">
        <h1
          className="font-merriweather text-[9vw] font-bold text-center uppercase m-0 bg-cover bg-center bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(251,176,59,0.15)] max-[480px]:text-[14vw]"
          style={{ backgroundImage: `url(${maskImages[currentImg]})` }}
        >
          OFF ROAD MUTANTS
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
