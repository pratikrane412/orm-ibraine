import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaSearch,
  FaTimes,
  FaLayerGroup,
  FaBoxOpen,
  FaTrash,
  FaMicrochip,
} from "react-icons/fa";

const EditCollection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isCreateMode = id === "new";

  const [collection, setCollection] = useState({ title: "", description: "" });
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("orm_admin_token");

  useEffect(() => {
    if (!isCreateMode) {
      fetch(`https://orm-backend-gejw.onrender.com/api/collections/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setCollection(data))
        .catch((err) => console.error(err));
    }

    fetch("https://orm-backend-gejw.onrender.com/api/products/")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        if (!isCreateMode) {
          const inCollection = data.filter((p) => p.collection === parseInt(id));
          setProducts(inCollection);
        }
      });
  }, [id, isCreateMode, token]);

  const handleSave = async () => {
    setLoading(true);
    try {
      let url = isCreateMode
        ? "https://orm-backend-gejw.onrender.com/api/collections/"
        : `https://orm-backend-gejw.onrender.com/api/collections/${id}/`;
      let method = isCreateMode ? "POST" : "PATCH";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(collection),
      });

      if (response.ok) {
        const savedCol = await response.json();
        if (isCreateMode && products.length > 0) {
          for (const p of products) {
            await fetch(`https://orm-backend-gejw.onrender.com/api/products/${p.slug}/`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
              },
              body: JSON.stringify({ collection: savedCol.id }),
            });
          }
        }
        alert("Sector Configuration Synchronized");
        navigate("/react-admin/products/collections");
      } else {
        alert("Sector Protocol Error");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCollection = async (productObj) => {
    if (!isCreateMode) {
      await fetch(`https://orm-backend-gejw.onrender.com/api/products/${productObj.slug}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ collection: id }),
      });
    }
    setProducts([...products, productObj]);
    setSearch("");
  };

  const removeFromCollection = async (productObj) => {
    if (!isCreateMode) {
      await fetch(`https://orm-backend-gejw.onrender.com/api/products/${productObj.slug}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ collection: null }),
      });
    }
    setProducts(products.filter((p) => p.id !== productObj.id));
  };

  const searchResults = allProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      !products.find((existing) => existing.id === p.id),
  );

  return (
    <div className="space-y-10 animate-fadeInUp pb-20">
      {/* HEADER BAR */}
      <div className="flex justify-between items-center bg-orm-surface/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[2rem] sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link
            to="/react-admin/products/collections"
            className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/40 transition-all hover:text-white hover:border-white/20 active:scale-90"
          >
            <FaArrowLeft />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
               <div className="w-2 h-2 bg-orm-gold rounded-full animate-pulse shadow-[0_0_10px_#fbb03b]"></div>
               <span className="text-[0.55rem] font-black uppercase tracking-[0.4em] text-orm-gold/60">{isCreateMode ? "New Collection" : "Edit Collection"}</span>
            </div>
            <h2 className="text-[1.8rem] font-black text-white uppercase tracking-tighter leading-none">
              {isCreateMode ? "Create" : "Update"} <span className="text-orm-gold">Collection</span>
            </h2>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            className="px-8 py-4 rounded-xl font-black text-[0.65rem] uppercase tracking-[0.2em] border border-white/10 text-white/40 transition-all hover:bg-white/5 hover:text-white"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="group relative overflow-hidden bg-orm-gold text-black px-10 py-4 rounded-xl font-black text-[0.65rem] uppercase tracking-[0.2em] transition-all flex items-center gap-3 hover:shadow-[0_10px_30px_rgba(251,176,59,0.3)] hover:-translate-y-1 active:scale-95 disabled:opacity-50"
            onClick={handleSave}
            disabled={loading}
          >
            <span className="relative z-10 flex items-center gap-3">{loading ? "Saving..." : "Save Collection"} <FaSave /></span>
            <div className="absolute inset-0 bg-white translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0"></div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: CORE DEFINITION */}
        <div className="col-span-7 flex flex-col gap-8 max-lg:col-span-12">
          <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] space-y-8">
            <div className="flex items-center gap-4 mb-2">
               <FaLayerGroup className="text-orm-gold" />
               <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em]">Collection Details</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Title</label>
                <input
                  type="text"
                  value={collection.title}
                  onChange={(e) => setCollection({ ...collection, title: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white text-sm font-bold tracking-tight outline-none focus:border-orm-gold/50 transition-all"
                  placeholder="e.g. Summer Collection"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Description</label>
                <textarea
                  name="description"
                  rows="6"
                  value={collection.description}
                  onChange={(e) => setCollection({ ...collection, description: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white text-sm font-medium leading-relaxed outline-none focus:border-orm-gold/50 transition-all no-scrollbar"
                  placeholder="Enter collection description..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: UNIT ASSIGNMENT */}
        <div className="col-span-5 flex flex-col gap-8 max-lg:col-span-12">
          <div className="bg-orm-surface/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] space-y-8">
            <div className="flex items-center gap-4 mb-2">
               <FaBoxOpen className="text-orm-gold" />
               <h3 className="text-[0.8rem] font-black text-white uppercase tracking-[0.2em]">Products in Collection</h3>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <div className="flex items-center bg-white/[0.03] border border-white/10 px-4 py-3 rounded-xl focus-within:border-orm-gold/50 transition-all">
                  <FaSearch className="text-white/20" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent border-none outline-none ml-3 w-full text-[0.75rem] font-bold text-white placeholder:text-white/10 tracking-tight"
                  />
                </div>
                
                {search && (
                  <div className="absolute top-[120%] left-0 w-full bg-orm-surface/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl z-50 max-h-[300px] overflow-y-auto p-2 no-scrollbar animate-fadeInUp">
                    {searchResults.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center gap-4 p-3 rounded-xl cursor-pointer hover:bg-white/5 group transition-all"
                        onClick={() => addToCollection(p)}
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/5 bg-orm-dark">
                          <img src={p.image.startsWith("http") ? p.image : `https://orm-backend-gejw.onrender.com${p.image}`} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[0.7rem] font-bold text-white/60 group-hover:text-orm-gold transition-colors">{p.title}</span>
                      </div>
                    ))}
                    {searchResults.length === 0 && <div className="p-4 text-center text-[0.6rem] font-black uppercase text-white/20">No products found</div>}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-[0.55rem] font-black text-white/40 uppercase tracking-[0.3em] ml-1">Assigned Products ({products.length})</label>
                <div className="space-y-2 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
                  {products.map((p) => (
                    <div key={p.id} className="flex items-center gap-4 p-3 bg-white/[0.03] border border-white/5 rounded-xl group hover:border-orm-gold/20 transition-all">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/5 bg-orm-dark">
                        <img src={p.image.startsWith("http") ? p.image : `https://orm-backend-gejw.onrender.com${p.image}`} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <span className="block text-[0.7rem] font-bold text-white uppercase tracking-tight truncate">{p.title}</span>
                         <span className="text-[0.5rem] font-black text-white/10 uppercase tracking-widest">ID: {p.id}</span>
                      </div>
                      <button
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:bg-red-500/10 hover:text-red-500 transition-all active:scale-90"
                        onClick={() => removeFromCollection(p)}
                      >
                        <FaTimes size={10} />
                      </button>
                    </div>
                  ))}
                  {products.length === 0 && (
                    <div className="py-12 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl opacity-20">
                       <FaLayerGroup size={24} className="mb-3" />
                       <span className="text-[0.55rem] font-black uppercase tracking-widest">No products</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCollection;
