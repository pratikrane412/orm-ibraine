import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaClock } from "react-icons/fa";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://orm-backend-gejw.onrender.com/api/blog/")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/image/placeholder.png";
    return imagePath.startsWith("http")
      ? imagePath
      : `https://orm-backend-gejw.onrender.com${imagePath}`;
  };

  // --- NEW HELPER: Remove HTML tags for clean excerpt ---
  const stripHtml = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative w-full h-[300px] bg-[url('/image/banner.jpg')] bg-cover bg-center mt-[80px] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-[2] text-white">
          <h1 className="font-merriweather text-[3.5rem] m-0 uppercase max-md:text-[2.5rem]">
            Latest <span className="text-orm-gold">News</span>
          </h1>
          <p>Updates from the Off-Road World</p>
        </div>
      </div>

      {/* BLOG GRID */}
      <div className="w-[90%] max-w-[1200px] mx-auto py-[60px] text-white">
        {loading ? (
          <div className="text-center text-white">Loading Articles...</div>
        ) : (
          <div className="grid grid-cols-3 gap-[30px] max-lg:grid-cols-2 max-[600px]:grid-cols-1">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-[#0a0a0a] border border-[#222] rounded-[12px] overflow-hidden transition-transform duration-300 hover:translate-y-[-5px] hover:border-orm-gold cursor-pointer"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                <div className="w-full h-[200px] relative">
                  <img src={getImageUrl(post.image)} alt={post.title} className="w-full h-full object-cover" />
                  <span className="absolute top-[15px] left-[15px] bg-orm-gold text-black px-[10px] py-[4px] text-[0.8rem] font-bold rounded-[4px]">Off-Road</span>
                </div>
                <div className="p-[20px]">
                  <h3 className="font-merriweather text-[1.4rem] mb-[10px] leading-[1.3]">{post.title}</h3>

                  {/* USE stripHtml HERE */}
                  <p className="font-lato text-[0.95rem] text-[#ccc] mb-[20px] leading-[1.6]">
                    {stripHtml(post.content).substring(0, 120)}...
                  </p>

                  <div className="flex justify-between border-t border-[#333] pt-[15px] text-[#888] text-[0.85rem]">
                    <div className="flex items-center gap-[6px]">
                      <FaUser className="text-orm-gold" /> {post.author_name || "Admin"}
                    </div>
                    <div className="flex items-center gap-[6px]">
                      <FaClock className="text-orm-gold" /> {formatDate(post.created_at)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;

