import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaPenNib,
  FaGlobe,
  FaFileAlt,
} from "react-icons/fa";

const BlogList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://orm-backend-gejw.onrender.com/api/blog/")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this field report permanently?")) return;
    await fetch(`https://orm-backend-gejw.onrender.com/api/blog/${id}/`, { method: "DELETE" });
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-8 animate-fadeInUp pb-20">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end gap-6 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-orm-gold rounded-full animate-pulse shadow-[0_0_10px_#fbb03b]"></div>
            <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-orm-gold/60">Content Management</span>
          </div>
          <h2 className="text-[2.2rem] font-black text-white uppercase tracking-tighter leading-none">Blog <span className="text-orm-gold">Posts</span></h2>
          <p className="text-[0.7rem] font-bold text-white/20 uppercase tracking-widest mt-2">Managing Website Articles and Updates</p>
        </div>

        <Link to="/react-admin/blog/new" className="group relative overflow-hidden bg-orm-gold text-black px-8 py-3 rounded-xl font-black text-[0.7rem] uppercase tracking-[0.2em] transition-all flex items-center gap-2 hover:shadow-[0_10px_30px_rgba(251,176,59,0.3)] hover:-translate-y-1">
          <span className="relative z-10 flex items-center gap-2"><FaPlus size={10} /> Add Post</span>
          <div className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0"></div>
        </Link>
      </div>

      {/* TABLE BOX */}
      <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-40 flex flex-col items-center justify-center">
               <div className="w-10 h-10 border-t-2 border-orm-gold rounded-full animate-spin mb-4"></div>
               <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-white/20">Loading Posts...</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.01]">
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Image</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Post Title</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Author</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Status</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20">Date</th>
                  <th className="p-6 text-[0.55rem] font-black uppercase tracking-[0.4em] text-white/20 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {posts.map((post) => (
                  <tr key={post.id} className="group transition-all hover:bg-white/[0.02]">
                    <td className="p-6">
                      <div className="w-16 h-12 rounded-lg overflow-hidden border border-white/5 bg-orm-dark group-hover:border-orm-gold/30 transition-all duration-500">
                        {post.image ? (
                          <img src={post.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/10"><FaGlobe /></div>
                        )}
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="font-bold text-white text-[0.85rem] uppercase tracking-tight group-hover:text-orm-gold transition-colors block truncate max-w-[300px]">{post.title}</span>
                      <span className="text-[0.5rem] font-black text-white/10 uppercase tracking-[0.2em] mt-1">ID: {post.id}</span>
                    </td>
                    <td className="p-6">
                      <span className="text-[0.7rem] font-bold text-white/60 uppercase tracking-widest">{post.author_name || "Admin"}</span>
                    </td>
                    <td className="p-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${post.is_published ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-white/5 border-white/10 text-white/20"}`}>
                         <div className={`w-1 h-1 rounded-full ${post.is_published ? "bg-green-500 animate-pulse" : "bg-white/40"}`}></div>
                         <span className="text-[0.55rem] font-black uppercase tracking-widest">{post.is_published ? "Published" : "Draft"}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="text-[0.65rem] font-bold text-white/40 uppercase tracking-widest">{new Date(post.created_at).toLocaleDateString()}</span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/react-admin/blog/edit/${post.id}`}
                          className="w-10 h-10 rounded-xl bg-white/5 text-white/20 flex items-center justify-center transition-all hover:bg-orm-gold hover:text-black active:scale-90"
                        >
                          <FaEdit size={14} />
                        </Link>
                        <button
                          className="w-10 h-10 rounded-xl bg-white/5 text-white/20 flex items-center justify-center transition-all hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 active:scale-90"
                          onClick={() => handleDelete(post.id)}
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
