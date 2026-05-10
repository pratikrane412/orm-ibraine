import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://orm-backend-gejw.onrender.com/api/blog/")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await fetch(`https://orm-backend-gejw.onrender.com/api/blog/${id}/`, { method: "DELETE" });
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div className="bg-[#ffffff] rounded-[12px] p-[30px] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] border border-[#e5e7eb] w-full min-h-[85vh]">
      <div className="flex justify-between items-center mb-[25px] flex-wrap gap-[20px]">
        <div className="header-text">
          <h2 className="font-['Merriweather',serif] text-[1.8rem] text-[#0f172a] m-0">Blog Posts</h2>
          <p className="text-[#64748b] text-[0.9rem] mt-[4px]">Manage content and articles</p>
        </div>
        <Link to="/react-admin/blog/new" className="bg-[#fbb03b] text-black p-[10px_20px] rounded-[8px] no-underline font-[600] text-[0.95rem] flex items-center gap-[8px] transition-all duration-200 shadow-[0_2px_4px_rgba(0,0,0,0.1)] whitespace-nowrap hover:bg-[#f59e0b] hover:translate-y-[-1px]">
          <FaPlus /> Write Post
        </Link>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
              <th width="80" className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Image</th>
              <th className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Title</th>
              <th className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Author</th>
              <th className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Status</th>
              <th className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Date</th>
              <th align="right" className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-[#f1f5f9] last:border-b-0 hover:bg-[#fffbeb]">
                <td className="p-[14px_20px] align-middle text-[#334155]">
                  <div className="w-[48px] h-[48px] rounded-[6px] overflow-hidden border border-[#e2e8f0] bg-[#f8fafc]">
                    {post.image && <img src={post.image} alt="" className="w-full h-full object-cover" />}
                  </div>
                </td>
                <td className="p-[14px_20px] align-middle text-[#334155]">
                  <span className="font-[600] text-[#0f172a] text-[0.95rem]">{post.title}</span>
                </td>
                <td className="p-[14px_20px] align-middle text-[#334155]">{post.author_name || "Admin"}</td>
                <td className="p-[14px_20px] align-middle text-[#334155]">
                  {post.is_published ? (
                    <span className="inline-flex items-center gap-[6px] p-[4px_10px] rounded-[20px] text-[0.8rem] font-[500] bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">Published</span>
                  ) : (
                    <span className="inline-flex items-center gap-[6px] p-[4px_10px] rounded-[20px] text-[0.8rem] font-[500] bg-[#f8fafc] text-[#64748b] border border-[#e2e8f0]">Draft</span>
                  )}
                </td>
                <td className="p-[14px_20px] align-middle text-[#334155]">{new Date(post.created_at).toLocaleDateString()}</td>
                <td align="right" className="p-[14px_20px] align-middle text-[#334155]">
                  <div className="flex justify-end gap-[8px]">
                    <Link
                      to={`/react-admin/blog/edit/${post.id}`}
                      className="w-[32px] h-[32px] rounded-[6px] border border-transparent bg-transparent flex items-center justify-center cursor-pointer text-[#64748b] transition-all duration-200 hover:bg-white hover:border-[#e2e8f0] hover:shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:text-[#3b82f6]"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      className="w-[32px] h-[32px] rounded-[6px] border border-transparent bg-transparent flex items-center justify-center cursor-pointer text-[#64748b] transition-all duration-200 hover:bg-white hover:border-[#e2e8f0] hover:shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:text-[#ef4444]"
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
