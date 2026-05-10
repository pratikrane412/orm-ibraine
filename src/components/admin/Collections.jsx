import React, { useState, useEffect } from "react";
import { FaPlus, FaImage } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Get the token using the specific name found in your LocalStorage
    const token = localStorage.getItem("orm_admin_token");

    setLoading(true);

    // 2. Add the Authorization header to the request
    fetch("https://orm-backend-gejw.onrender.com/api/collections/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}` // This is the fix for 401
      }
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Unauthorized: Please log in again.");
        }
        return res.json();
      })
      .then((data) => {
        setCollections(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Collections Error:", err);
        setLoading(false);
      });
  }, []);

  const getImageUrl = (collection) => {
    if (collection.image) {
      return collection.image.startsWith("http")
        ? collection.image
        : `https://orm-backend-gejw.onrender.com${collection.image}`;
    }
    if (collection.first_product_image) {
      return `https://orm-backend-gejw.onrender.com${collection.first_product_image}`;
    }
    return null;
  };

  return (
    <div className="bg-[#ffffff] rounded-[12px] p-[30px] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] border border-[#e5e7eb] w-full min-h-[85vh] font-['Inter',sans-serif] text-[#202223]">
      <div className="flex justify-between items-center mb-[25px] flex-wrap gap-[20px]">
        <div className="header-text">
          <h2 className="font-['Merriweather',serif] text-[2rem] text-[#111] m-0">Collections</h2>
          <p className="text-[#6b7280] text-[0.95rem] mt-[5px]">Manage product groups and categories</p>
        </div>
        <div className="header-actions">
          <Link
            to="/react-admin/products/collections/new"
            className="bg-[#fbb03b] text-black p-[10px_20px] rounded-[8px] no-underline font-[600] text-[0.95rem] flex items-center gap-[8px] transition-all duration-200 shadow-[0_2px_4px_rgba(0,0,0,0.1)] whitespace-nowrap hover:bg-[#f59e0b] hover:translate-y-[-1px]"
          >
            <FaPlus /> Create collection
          </Link>
        </div>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <div className="flex gap-[15px] border-b border-[#e5e7eb] bg-[#f9fafb] p-[0_20px]">
          <button className="bg-transparent border-none p-[12px_0] text-[#111] font-[600] border-b-2 border-[#fbb03b] mb-[-1px] text-[0.9rem] cursor-pointer">All</button>
          <button className="bg-transparent border-none p-[12px] cursor-pointer text-[#6b7280]">+</button>
        </div>

        {loading ? (
          <div className="text-center padding-[50px] text-[#64748b]">Loading...</div>
        ) : (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                <th width="50" className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">
                  <input type="checkbox" />
                </th>
                <th width="80" className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Image</th>
                <th className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Title</th>
                <th align="right" className="p-[14px_20px] text-[0.75rem] uppercase tracking-[0.05em] text-[#64748b] font-[700]">Products</th>
              </tr>
            </thead>
            <tbody>
              {collections.length > 0 ? (
                collections.map((col) => (
                  <tr
                    key={col.id}
                    onClick={() =>
                      navigate(`/react-admin/products/collections/${col.id}`)
                    }
                    className="border-b border-[#f1f5f9] last:border-b-0 hover:bg-[#fffbeb] cursor-pointer"
                  >
                    <td className="p-[14px_20px] align-middle text-[#334155]">
                      <input
                        type="checkbox"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="p-[14px_20px] align-middle text-[#334155]">
                      <div className="w-[50px] h-[50px] rounded-[8px] bg-[#f3f4f6] border border-[#e5e7eb] overflow-hidden flex items-center justify-center">
                        {getImageUrl(col) ? (
                          <img src={getImageUrl(col)} alt={col.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-[#9ca3af] text-[1.2rem]">
                            <FaImage />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-[14px_20px] align-middle text-[#334155]">
                      <span className="font-[600] text-[#202223] text-[0.95rem] cursor-pointer hover:underline hover:text-[#fbb03b]">{col.title}</span>
                    </td>
                    <td align="right" className="p-[14px_20px] align-middle text-[#6b7280]">
                      {col.product_count || 0} products
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center padding-[50px] text-[#64748b]">
                    <div style={{ padding: "40px", textAlign: "center" }}>
                      <p>You haven't created any collections yet.</p>
                      <Link
                        to="/react-admin/products/collections/new"
                        style={{ color: "#fbb03b", fontWeight: "bold" }}
                      >
                        Create one now
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Collections;
