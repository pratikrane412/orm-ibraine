import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import "../../styles/admin/AllProducts.css"; // Reuse table styles

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/blog/")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await fetch(`http://127.0.0.1:8000/api/blog/${id}/`, { method: "DELETE" });
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div className="admin-page-container">
      <div className="admin-header-row">
        <div className="header-text">
          <h2>Blog Posts</h2>
          <p className="subtitle">Manage content and articles</p>
        </div>
        <Link to="/react-admin/blog/new" className="admin-btn-primary">
          <FaPlus /> Write Post
        </Link>
      </div>

      <div className="table-wrapper">
        <table className="modern-table">
          <thead>
            <tr>
              <th width="80">Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Date</th>
              <th align="right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>
                  <div className="product-thumbnail">
                    {post.image && <img src={post.image} alt="" />}
                  </div>
                </td>
                <td>
                  <span className="product-title">{post.title}</span>
                </td>
                <td>{post.author_name || "Admin"}</td>
                <td>
                  {post.is_published ? (
                    <span className="status-badge sale">Published</span>
                  ) : (
                    <span className="status-badge regular">Draft</span>
                  )}
                </td>
                <td>{new Date(post.created_at).toLocaleDateString()}</td>
                <td align="right">
                  <div className="actions-cell">
                    <Link
                      to={`/react-admin/blog/edit/${post.id}`}
                      className="action-btn edit"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(post.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;
