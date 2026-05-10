import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaSearch,
  FaTimes,
  FaLayerGroup,
  FaBoxOpen,
} from "react-icons/fa";

const EditCollection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isCreateMode = id === "new";

  const [collection, setCollection] = useState({ title: "", description: "" });
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");

  // Get the token from local storage
  const token = localStorage.getItem("orm_admin_token");

  useEffect(() => {
    // 1. Fetch Collection Details
    if (!isCreateMode) {
      fetch(`https://orm-backend-gejw.onrender.com/api/collections/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setCollection(data))
        .catch((err) => console.error(err));
    }

    // 2. Fetch all products to populate search
    fetch("https://orm-backend-gejw.onrender.com/api/products/")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        if (!isCreateMode) {
          // Note: collection ID is still numeric
          const inCollection = data.filter(
            (p) => p.collection === parseInt(id),
          );
          setProducts(inCollection);
        }
      });
  }, [id, isCreateMode, token]);

  const handleSave = async () => {
    try {
      let url = isCreateMode
        ? "https://orm-backend-gejw.onrender.com/api/collections/"
        : `https://orm-backend-gejw.onrender.com/api/collections/${id}/`;
      let method = isCreateMode ? "POST" : "PATCH";

      // SAVE COLLECTION
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`, // ADDED AUTH
        },
        body: JSON.stringify(collection),
      });

      if (response.ok) {
        const savedCol = await response.json();

        // If creating, we need to link products now
        if (isCreateMode && products.length > 0) {
          for (const p of products) {
            // FIX: Use p.slug instead of p.id because of backend changes
            await fetch(
              `https://orm-backend-gejw.onrender.com/api/products/${p.slug}/`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${token}`, // ADDED AUTH
                },
                body: JSON.stringify({ collection: savedCol.id }),
              },
            );
          }
        }
        alert("Collection Saved!");
        navigate("/react-admin/products/collections");
      } else {
        alert("Failed to save collection. Check permissions.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addToCollection = async (productObj) => {
    if (!isCreateMode) {
      // FIX: Use slug in URL
      await fetch(
        `https://orm-backend-gejw.onrender.com/api/products/${productObj.slug}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`, // ADDED AUTH
          },
          body: JSON.stringify({ collection: id }),
        },
      );
    }
    setProducts([...products, productObj]);
    setSearch("");
  };

  const removeFromCollection = async (productObj) => {
    if (!isCreateMode) {
      // FIX: Use slug in URL
      await fetch(
        `https://orm-backend-gejw.onrender.com/api/products/${productObj.slug}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`, // ADDED AUTH
          },
          body: JSON.stringify({ collection: null }),
        },
      );
    }
    setProducts(products.filter((p) => p.id !== productObj.id));
  };

  const searchResults = allProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      !products.find((existing) => existing.id === p.id),
  );

  return (
    <div className="font-['Inter',sans-serif] text-[#111827] w-full max-w-full pb-[80px] bg-transparent shadow-none">
      <div className="flex justify-between items-center mb-[25px] pt-[10px]">
        <div className="flex items-center gap-[15px]">
          <Link
            to="/react-admin/products/collections"
            className="w-[40px] h-[40px] rounded-full border border-[#d1d5db] flex items-center justify-center text-[#6b7280] bg-white transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:text-[#111] hover:translate-x-[-3px]"
          >
            <FaArrowLeft />
          </Link>
          <div className="header-text">
            <h2 className="font-['Merriweather',serif] text-[24px] font-[700] m-0 text-[#111]">{isCreateMode ? "Create collection" : collection.title}</h2>
            <p className="text-[#6b7280] text-[13px] mt-[2px]">Manage product grouping</p>
          </div>
        </div>
        <div className="flex gap-[12px]">
          <button className="bg-white border border-[#d1d5db] text-[#374151] p-[10px_20px] rounded-[8px] font-[600] text-[14px] cursor-pointer transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#f9fafb] hover:border-[#9ca3af]" onClick={() => navigate(-1)}>
            Discard
          </button>
          <button className="bg-[#fbb03b] text-black border-none p-[10px_24px] rounded-[8px] font-[600] text-[14px] cursor-pointer transition-all duration-200 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-[#f59e0b] hover:translate-y-[-1px]" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-[20px] w-full">
        <div className="bg-white rounded-[12px] border border-[#e5e7eb] shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden w-full">
          <div className="p-[16px_24px] border-b border-[#f3f4f6] flex justify-between items-center bg-[#fcfcfc]">
            <h3 className="text-[15px] font-[600] m-0 text-[#202223]">Details</h3>
            <span className="text-[#9ca3af] text-[1.1rem]">
              <FaLayerGroup />
            </span>
          </div>
          <div className="p-[24px]">
            <div className="mb-[20px]">
              <label className="block text-[13px] font-[600] text-[#374151] mb-[8px]">Title</label>
              <input
                type="text"
                value={collection.title}
                onChange={(e) =>
                  setCollection({ ...collection, title: e.target.value })
                }
                className="w-full p-[10px_12px] border border-[#d1d5db] rounded-[8px] text-[14px] text-[#111] outline-none bg-white transition-all duration-200 font-['Inter',sans-serif] focus:border-[#fbb03b] focus:shadow-[0_0_0_3px_rgba(251,176,59,0.1)]"
                placeholder="e.g. Summer Sale"
              />
            </div>
            <div className="mb-[20px]">
              <label className="block text-[13px] font-[600] text-[#374151] mb-[8px]">Description</label>
              <textarea
                rows="4"
                value={collection.description}
                onChange={(e) =>
                  setCollection({ ...collection, description: e.target.value })
                }
                className="w-full p-[10px_12px] border border-[#d1d5db] rounded-[8px] text-[14px] text-[#111] outline-none bg-white transition-all duration-200 font-['Inter',sans-serif] focus:border-[#fbb03b] focus:shadow-[0_0_0_3px_rgba(251,176,59,0.1)]"
                placeholder="Add a description..."
              ></textarea>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[12px] border border-[#e5e7eb] shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden w-full">
          <div className="p-[16px_24px] border-b border-[#f3f4f6] flex justify-between items-center bg-[#fcfcfc]">
            <h3 className="text-[15px] font-[600] m-0 text-[#202223]">Products</h3>
            <span className="text-[#9ca3af] text-[1.1rem]">
              <FaBoxOpen />
            </span>
          </div>
          <div className="p-[24px]">
            <div className="relative flex items-center border border-[#d1d5db] rounded-[8px] p-[10px_12px] mb-[15px] focus-within:border-[#fbb03b]">
              <FaSearch className="text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-none outline-none w-full ml-[10px] text-[14px]"
              />
              {search && (
                <div className="absolute top-full left-0 w-full bg-white border border-[#e5e7eb] rounded-[8px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] z-10 max-h-[250px] overflow-y-auto mt-[5px]">
                  {searchResults.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-[10px] p-[10px_15px] cursor-pointer border-b border-[#f3f4f6] transition-all duration-200 hover:bg-[#f9fafb]"
                      onClick={() => addToCollection(p)}
                    >
                      <img
                        src={
                          p.image.startsWith("http")
                            ? p.image
                            : `https://orm-backend-gejw.onrender.com${p.image}`
                        }
                        alt=""
                        className="w-[32px] h-[32px] rounded-[4px] object-cover"
                      />
                      <span>{p.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              {products.map((p) => (
                <div key={p.id} className="flex items-center gap-[15px] p-[12px_0] border-b border-[#f3f4f6] last:border-b-0">
                  <div className="w-[40px] h-[40px] rounded-[6px] overflow-hidden border border-[#e5e7eb]">
                    <img
                      src={
                        p.image.startsWith("http")
                          ? p.image
                          : `https://orm-backend-gejw.onrender.com${p.image}`
                      }
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="flex-1 font-[500] text-[14px] text-[#1f2937]">{p.title}</span>
                  <button
                    className="bg-none border-none cursor-pointer text-[#9ca3af] text-[14px] transition-all duration-200 hover:text-[#ef4444]"
                    onClick={() => removeFromCollection(p)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              {products.length === 0 && (
                <div className="text-center text-[#9ca3af] p-[20px] italic text-[13px]">
                  No products in this collection.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCollection;
