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
import "../styles/BlogDetails.css";

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
      <div className="page-wrapper">
        <Navbar />
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fbb03b",
            fontSize: "2rem",
          }}
        >
          Loading Article...
        </div>
        <Footer />
      </div>
    );

  // 2. Handle Not Found
  if (!post)
    return (
      <div className="page-wrapper">
        <Navbar />
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <h2>Article Not Found</h2>
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* HEADER HERO */}
      <div className="blog-header-hero">
        <div className="overlay"></div>
        <div className="content">
          <h1>{post.title}</h1>
          <p>Home / Blog / {post.title}</p>
        </div>
      </div>

      <div className="blog-detail-container">
        {/* LEFT: MAIN CONTENT */}
        <div className="blog-main-content">
          <div className="blog-featured-img">
            <img src={getImageUrl(post.image)} alt={post.title} />
          </div>

          <div className="blog-article">
            <div className="article-meta">
              <span>
                <FaUser /> {post.author_name || "Admin"}
              </span>
              <span>
                <FaComment /> 0 Comments
              </span>
              <span>
                <FaCalendarAlt />{" "}
                {post.created_at
                  ? new Date(post.created_at).toLocaleDateString()
                  : "Date N/A"}
              </span>
            </div>

            {/* Title again in body is optional if it's already in Hero */}
            <h2 className="article-title">{post.title}</h2>

            <div className="detail-body">
              {/* 3. Safe Parsing */}
              {post.content ? (
                parse(post.content)
              ) : (
                <p>No content available.</p>
              )}
            </div>

            <div className="share-post">
              <span>Share Post:</span>
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaLinkedinIn />
              </a>
              <a href="#">
                <FaPinterestP />
              </a>
            </div>
          </div>

          {/* COMMENT FORM */}
          <div className="comment-section">
            <h3>Leave a Comment</h3>
            <form className="comment-form">
              <div className="form-row">
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
              </div>
              <textarea rows="5" placeholder="Enter Your Comment"></textarea>
              <button type="submit" className="submit-comment-btn">
                SUBMIT COMMENT
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT: SIDEBAR */}
        <div className="blog-sidebar-right">
          <div className="sidebar-box">
            <h3>Search</h3>
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <button>
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="sidebar-box">
            <h3>Latest Post</h3>
            <div className="latest-posts-list">
              {recentPosts.length > 0 ? (
                recentPosts.map((p) => (
                  <Link to={`/blog/${p.id}`} key={p.id} className="latest-item">
                    <img src={getImageUrl(p.image)} alt="" />
                    <div>
                      <h4>{p.title}</h4>
                      <span>
                        <FaCalendarAlt />{" "}
                        {new Date(p.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <p style={{ color: "#666" }}>No recent posts.</p>
              )}
            </div>
          </div>

          <div className="sidebar-box">
            <h3>Categories</h3>
            <ul className="cat-list-simple">
              <li>Off-Road Tips</li>
              <li>Car Maintenance</li>
              <li>New Arrivals</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetails;
