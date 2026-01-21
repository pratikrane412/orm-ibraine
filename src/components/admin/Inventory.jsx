import React, { useState, useEffect } from "react";
import { FaSearch, FaSave } from "react-icons/fa";
import "../../styles/admin/Inventory.css";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Track changes locally before saving
  const [changes, setChanges] = useState({});

  useEffect(() => {
    fetch("https://orm-backend-gejw.onrender.com/api/products/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/image/placeholder.png";
    return imagePath.startsWith("http")
      ? imagePath
      : `https://orm-backend-gejw.onrender.com${imagePath}`;
  };

  // Handle Input Change (Updates "stock_quantity" which effectively sets "Available")
  const handleStockChange = (id, value) => {
    const newValue = parseInt(value) || 0;

    setChanges((prev) => ({
      ...prev,
      [id]: { stock_quantity: newValue },
    }));

    // Optimistic UI Update
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock_quantity: newValue } : p))
    );
  };

  // Save to Backend
  const saveStock = async (id) => {
    if (!changes[id]) return;

    try {
      const response = await fetch(
        `https://orm-backend-gejw.onrender.com/api/products/${id}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(changes[id]),
        }
      );

      if (response.ok) {
        alert("Inventory Updated!");
        const newChanges = { ...changes };
        delete newChanges[id];
        setChanges(newChanges);
      } else {
        alert("Failed to update.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toString().includes(searchTerm)
  );

  return (
    <div className="admin-page-container inventory-wrapper">
      {/* HEADER */}
      <div className="admin-header-row">
        <div className="header-text">
          <h2>Inventory</h2>
          <p className="subtitle">Manage stock availability</p>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="table-wrapper">
        {/* FILTER BAR */}
        <div className="inventory-filters">
          <div className="tabs-row-inv">
            <button className="tab-btn active">All</button>
            <button className="tab-add">+</button>
          </div>

          <div className="search-box-inv">
            <FaSearch className="icon" />
            <input
              type="text"
              placeholder="Search by product name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE */}
        {loading ? (
          <div className="loading-state">Loading Inventory...</div>
        ) : (
          <table className="modern-table inventory-table">
            <thead>
              <tr>
                <th width="40">
                  <input type="checkbox" />
                </th>
                <th width="60">Image</th>
                <th>Product</th>
                <th>SKU</th>
                {/* Available is now the main editable field */}
                <th align="center">Available</th>
                <th width="80">On Hand</th>
                <th width="50"></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => {
                const stock = changes[p.id]?.stock_quantity ?? p.stock_quantity;

                return (
                  <tr key={p.id}>
                    <td>
                      <input type="checkbox" />
                    </td>

                    {/* Image */}
                    <td>
                      <div className="table-img small">
                        <img src={getImageUrl(p.image)} alt={p.title} />
                      </div>
                    </td>

                    {/* Title */}
                    <td className="product-name-cell">
                      <strong>{p.title}</strong>
                    </td>

                    {/* SKU: Showing Product ID with Prefix */}
                    <td className="sku-text">ORM-{p.id}</td>

                    {/* AVAILABLE (Editable Input) */}
                    <td align="center">
                      <input
                        type="number"
                        className="stock-input"
                        value={stock}
                        onChange={(e) =>
                          handleStockChange(p.id, e.target.value)
                        }
                      />
                    </td>

                    {/* ON HAND (Read Only Reference) */}
                    <td align="center">
                      <span className="read-only-stat">{stock}</span>
                    </td>

                    {/* SAVE BUTTON */}
                    <td>
                      {changes[p.id] && (
                        <button
                          className="save-icon-btn"
                          onClick={() => saveStock(p.id)}
                          title="Save Changes"
                        >
                          <FaSave />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Inventory;
