import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams, Link } from "react-router-dom";
import parse from "html-react-parser"; // Ensure this package is installed
import {
  FaUser,
  FaComment,
  FaCalendarAlt,
  FaSearch,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch Current Post
    fetch(`https://orm-backend-gejw.onrender.com/api/blog/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    // Fetch Recent Posts
    fetch("https://orm-backend-gejw.onrender.com/api/blog/")
      .then((res) => res.json())
      .then((data) => setRecentPosts(data.slice(0, 5)))
      .catch(console.error);

    window.scrollTo(0, 0);
  }, [id]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/image/placeholder.png";
    return imagePath.startsWith("http")
      ? imagePath
      : `https://orm-backend-gejw.onrender.com${imagePath}`;
  };

  // 1. Better Loading State
  if (loading)
    return (
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <div
          className="min-h-[60vh] flex items-center justify-center text-orm-gold text-[2rem]"
        >
          Loading Article...
        </div>
        <Footer />
      </div>
    );

  // 2. Handle Not Found
  if (!post)
    return (
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <div
          className="min-h-[60vh] flex items-center justify-center text-white"
        >
          <h2 className="text-[2rem]">Article Not Found</h2>
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* HEADER HERO */}
      <div className="w-full h-[350px] bg-[#1a1a1a] bg-[url('/image/banner.jpg')] bg-cover bg-center relative flex flex-col items-center justify-center text-center mt-[80px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black z-[1]"></div>
        <div className="relative z-[10] w-[90%] max-w-[800px]">
          <h1 className="text-[4rem] mb-[10px] text-orm-gold uppercase shadow-[2px_2px_10px_rgba(0,0,0,0.8)] max-md:text-[2.5rem]">{post.title}</h1>
          <p className="text-[1rem] text-white tracking-[2px] uppercase font-medium bg-black/50 p-[5px_15px] rounded-[4px] inline-block">Home / Blog / {post.title}</p>
        </div>
      </div>

      <div className="flex gap-[40px] w-[90%] max-w-[1100px] mx-auto my-[40px] pb-[80px] text-white items-start max-[900px]:flex-col max-[900px]:w-[95%]">
        {/* LEFT: MAIN CONTENT */}
        <div className="flex-[2.5]">
          <div className="w-full h-[350px] rounded-[8px] overflow-hidden mb-[20px] border border-[#333]">
            <img src={getImageUrl(post.image)} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="blog-article">
            <div className="flex gap-[15px] text-orm-gold text-[0.8rem] mb-[10px] font-medium">
              <span className="flex items-center gap-[6px]">
                <FaUser /> {post.author_name || "Admin"}
              </span>
              <span className="flex items-center gap-[6px]">
                <FaComment /> 0 Comments
              </span>
              <span className="flex items-center gap-[6px]">
                <FaCalendarAlt />{" "}
                {post.created_at
                  ? new Date(post.created_at).toLocaleDateString()
                  : "Date N/A"}
              </span>
            </div>

            {/* Title again in body is optional if it's already in Hero */}
            <h2 className="text-[2rem] mb-[20px] text-white leading-[1.2]">{post.title}</h2>

            <div className="text-[1rem] leading-[1.6] text-[#d1d5db] mb-[40px] [&_h1]:text-[1.8rem] [&_h1]:mt-[25px] [&_h1]:mb-[10px] [&_h2]:text-[1.5rem] [&_h2]:mt-[20px] [&_h2]:mb-[10px] [&_p]:mb-[15px]">
              {/* 3. Safe Parsing */}
              {post.content ? (
                parse(post.content)
              ) : (
                <p>No content available.</p>
              )}
            </div>

            <div className="flex items-center gap-[15px] py-[15px] border-y border-[#333] mb-[40px]">
              <span className="text-[1rem] text-white">Share Post:</span>
              <a href="#" className="text-[#888] text-[1rem] transition-colors duration-200 bg-[#1a1a1a] w-[35px] h-[35px] flex items-center justify-center rounded-full hover:text-black hover:bg-orm-gold">
                <FaFacebookF />
              </a>
              <a href="#" className="text-[#888] text-[1rem] transition-colors duration-200 bg-[#1a1a1a] w-[35px] h-[35px] flex items-center justify-center rounded-full hover:text-black hover:bg-orm-gold">
                <FaTwitter />
              </a>
              <a href="#" className="text-[#888] text-[1rem] transition-colors duration-200 bg-[#1a1a1a] w-[35px] h-[35px] flex items-center justify-center rounded-full hover:text-black hover:bg-orm-gold">
                <FaLinkedinIn />
              </a>
              <a href="#" className="text-[#888] text-[1rem] transition-colors duration-200 bg-[#1a1a1a] w-[35px] h-[35px] flex items-center justify-center rounded-full hover:text-black hover:bg-orm-gold">
                <FaPinterestP />
              </a>
            </div>
          </div>

          {/* COMMENT FORM */}
          <div className="bg-[#0a0a0a] p-[30px] border border-[#222] rounded-[8px]">
            <h3 className="mb-[20px] text-[1.5rem] text-white border-l-[3px] border-orm-gold pl-[10px]">Leave a Comment</h3>
            <form className="comment-form">
              <div className="flex gap-[15px] mb-[15px]">
                <input type="text" placeholder="Your Name" className="w-full p-[12px] !bg-[#111] !border-[#333] border !text-white rounded-[4px] outline-none text-[0.9rem] focus:!border-orm-gold" />
                <input type="email" placeholder="Your Email" className="w-full p-[12px] !bg-[#111] !border-[#333] border !text-white rounded-[4px] outline-none text-[0.9rem] focus:!border-orm-gold" />
              </div>
              <textarea rows="5" placeholder="Enter Your Comment" className="w-full p-[12px] !bg-[#111] !border-[#333] border !text-white rounded-[4px] outline-none text-[0.9rem] focus:!border-orm-gold"></textarea>
              <button type="submit" className="bg-orm-gold text-black px-[25px] py-[10px] border-none font-bold cursor-pointer rounded-[4px] text-[0.9rem] mt-[15px]">
                SUBMIT COMMENT
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT: SIDEBAR */}
        <div className="flex-1 max-w-[300px] flex flex-col gap-[25px] sticky top-[100px] max-[900px]:max-w-full max-[900px]:w-full">
          <div className="bg-[#0a0a0a] p-[20px] rounded-[8px] text-white border border-[#222]">
            <h3 className="text-[1.2rem] mb-[15px] border-b border-[#333] pb-[8px] relative after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-[40px] after:h-[2px] after:bg-orm-gold">Search</h3>
            <div className="flex !bg-[#111] !border-[#333] border rounded-[4px] p-0 overflow-hidden">
              <input type="text" placeholder="Search..." className="flex-1 p-[10px] !bg-[#111] !text-white !border-none outline-none text-[0.9rem]" />
              <button className="!bg-orm-gold border-none w-[40px] cursor-pointer text-black flex items-center justify-center">
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="bg-[#0a0a0a] p-[20px] rounded-[8px] text-white border border-[#222]">
            <h3 className="text-[1.2rem] mb-[15px] border-b border-[#333] pb-[8px] relative after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-[40px] after:h-[2px] after:bg-orm-gold">Latest Post</h3>
            <div className="flex flex-col gap-[15px]">
              {recentPosts.length > 0 ? (
                recentPosts.map((p) => (
                  <Link to={`/blog/${p.id}`} key={p.id} className="flex gap-[12px] no-underline text-white items-center">
                    <img src={getImageUrl(p.image)} alt="" className="w-[50px] h-[50px] rounded-[4px] object-cover" />
                    <div>
                      <h4 className="text-[0.85rem] m-[0_0_3px_0] font-medium leading-[1.3]">{p.title}</h4>
                      <span className="text-[0.75rem] text-[#888]">
                        <FaCalendarAlt />{" "}
                        {new Date(p.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-[#666]">No recent posts.</p>
              )}
            </div>
          </div>

          <div className="bg-[#0a0a0a] p-[20px] rounded-[8px] text-white border border-[#222]">
            <h3 className="text-[1.2rem] mb-[15px] border-b border-[#333] pb-[8px] relative after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-[40px] after:h-[2px] after:bg-orm-gold">Categories</h3>
            <ul className="list-none p-0">
              <li className="p-[8px_0] border-b border-dashed border-[#333] cursor-pointer text-[#ccc] text-[0.9rem]">Off-Road Tips</li>
              <li className="p-[8px_0] border-b border-dashed border-[#333] cursor-pointer text-[#ccc] text-[0.9rem]">Car Maintenance</li>
              <li className="p-[8px_0] border-b border-dashed border-[#333] cursor-pointer text-[#ccc] text-[0.9rem]">New Arrivals</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetails;

