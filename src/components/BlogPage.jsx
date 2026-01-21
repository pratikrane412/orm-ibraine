import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaClock } from "react-icons/fa";
import "../styles/BlogPage.css";

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
    <div className="page-wrapper">
      <Navbar />

      {/* HERO SECTION */}
      <div className="blog-hero">
        <div className="blog-hero-overlay"></div>
        <div className="blog-hero-content">
          <h1>
            Latest <span className="highlight">News</span>
          </h1>
          <p>Updates from the Off-Road World</p>
        </div>
      </div>

      {/* BLOG GRID */}
      <div className="blog-container">
        {loading ? (
          <div className="loading">Loading Articles...</div>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <div
                key={post.id}
                className="blog-card"
                onClick={() => navigate(`/blog/${post.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="blog-img-box">
                  <img src={getImageUrl(post.image)} alt={post.title} />
                  <span className="blog-cat-badge">Off-Road</span>
                </div>
                <div className="blog-content">
                  <h3 className="blog-title">{post.title}</h3>

                  {/* USE stripHtml HERE */}
                  <p className="blog-excerpt">
                    {stripHtml(post.content).substring(0, 120)}...
                  </p>

                  <div className="blog-meta">
                    <div className="meta-item">
                      <FaUser className="icon" /> {post.author_name || "Admin"}
                    </div>
                    <div className="meta-item">
                      <FaClock className="icon" /> {formatDate(post.created_at)}
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
