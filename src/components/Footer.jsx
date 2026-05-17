import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const maskImages = ["/image/vehicle-move.jpg", "/image/car-ai.png"];

const Footer = () => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % maskImages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-orm-dark relative text-white pt-[80px] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(251, 176, 59, 0.05), transparent 50%)`
      }}></div>

      <div className="w-[92%] max-w-[1400px] mx-auto relative z-[2]">
        <div className="grid grid-cols-12 gap-8 mb-[60px] max-[1024px]:flex max-[1024px]:flex-col max-[1024px]:items-center max-[1024px]:text-center">
          <div className="col-span-4 max-w-[350px]">
            <img src="/image/gg.png" alt="ORM Logo" className="w-[120px] mb-6" />
            <p className="text-white/40 text-[0.85rem] leading-relaxed mb-6">
              Off-Road Mutants (ORM) is a specialized automotive performance platform. 
              Engineering excellence, tested on the harshest terrains.
            </p>
            <div className="flex gap-3">
              {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.03] border border-white/5 text-white/40 transition-all hover:text-orm-gold hover:border-orm-gold">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-8 grid grid-cols-4 gap-6 max-[1200px]:grid-cols-2 max-[768px]:grid-cols-1 w-full text-left max-[1024px]:text-center">
            {[
              { title: "Discovery", links: ["New Arrivals", "Accessories", "Off-Road Kits", "Performance"] },
              { title: "The Fleet", links: ["Mahindra Thar", "Suzuki Jimny", "Toyota Hilux", "Toyota Fortuner"] },
              { title: "The Movement", links: ["Our Story", "Technical Lab", "Contact Us", "Dealers"] },
              { title: "Legal", links: ["Privacy Policy", "Terms", "Refunds", "Conduct"] },
            ].map((col, i) => (
              <div key={i} className="flex flex-col gap-2.5">
                <h3 className="text-white text-[0.6rem] font-bold tracking-[0.2em] uppercase mb-3">{col.title}</h3>
                {col.links.map((link, j) => (
                  <a key={j} href="#" className="text-white/30 no-underline text-[0.75rem] transition-all hover:text-orm-gold">{link}</a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="h-[1px] bg-white/5 w-full mb-8"></div>

        <div className="flex justify-between items-center pb-10 text-white/20 text-[0.65rem] font-bold uppercase tracking-widest max-[768px]:flex-col max-[768px]:gap-4">
          <p>© 2026 ORM PERFORMANCE LABS</p>
          <p>ENGINEERED BY <a href="#" className="text-orm-gold hover:text-white transition-colors">IBRAINE</a></p>
        </div>
      </div>

      <div className="relative py-12 border-t border-white/5">
        <h1
          className="text-[8vw] font-black text-center uppercase m-0 bg-cover bg-fixed bg-center bg-clip-text text-transparent opacity-10 transition-all duration-1000 select-none"
          style={{ backgroundImage: `url(${maskImages[currentImg]})` }}
        >
          OFF ROAD MUTANTS
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
