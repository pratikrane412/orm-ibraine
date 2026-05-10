import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaPrint,
  FaEllipsisH,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFilePdf,
  FaReceipt,
} from "react-icons/fa";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPrintMenu, setShowPrintMenu] = useState(false); // Dropdown State

  useEffect(() => {
    const token = localStorage.getItem("orm_admin_token");
    fetch(`https://orm-backend-gejw.onrender.com/api/orders/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Invoice Download Handler
  const handleDownloadInvoice = () => {
    window.open(`https://orm-backend-gejw.onrender.com/api/invoice/${id}/`, "_blank");
    setShowPrintMenu(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString([], {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/image/placeholder.png";
    return imagePath.startsWith("http")
      ? imagePath
      : `https://orm-backend-gejw.onrender.com${imagePath}`;
  };

  if (loading)
    return <div className="text-center padding-[60px] text-[#9ca3af]">Loading Order Details...</div>;
  if (!order) return <div className="text-center padding-[60px] text-[#9ca3af]">Order not found</div>;

  return (
    <div className="bg-[#ffffff] rounded-[12px] p-[30px] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] border border-[#e5e7eb] w-full min-h-[85vh] font-['Inter',sans-serif] text-[#202223] pb-[80px]">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-[25px]">
        <div className="flex flex-col">
          <Link to="/react-admin/orders" className="text-[#5c5f62] no-underline text-[0.9rem] flex items-center gap-[5px] mb-[10px] hover:text-[#202223]">
            <FaArrowLeft /> Orders
          </Link>
          <div className="flex items-center gap-[15px]">
            <h1 className="font-['Merriweather',serif] text-[2rem] m-0 text-[#202223]">#{order.id + 1000}</h1>
            <span
              className={`inline-flex items-center gap-[6px] p-[2px_10px] rounded-[12px] text-[0.8rem] font-[600] capitalize ${order.is_paid ? "bg-[#e4e8cc] text-[#4a5c38]" : "bg-[#ffea8a] text-[#8a6116]"}`}
            >
              <span className="w-[8px] h-[8px] rounded-full bg-current"></span>{" "}
              {order.is_paid ? "Paid" : "Payment Pending"}
            </span>
            <span className="inline-flex items-center gap-[6px] p-[2px_10px] rounded-[12px] text-[0.8rem] font-[600] capitalize bg-[#ffea8a] text-[#8a6116]">
              <span className="w-[8px] h-[8px] rounded-full bg-current"></span> Unfulfilled
            </span>
          </div>
          <p className="text-[#6d7175] text-[0.9rem] mt-[5px]">
            {formatDate(order.created_at)} from Online Store
          </p>
        </div>

        <div className="flex gap-[10px]">
          <button className="bg-white border border-[#babfc3] p-[8px_14px] rounded-[6px] font-[600] text-[0.9rem] cursor-pointer flex items-center gap-[6px] hover:bg-[#f6f6f7]">Restock</button>

          {/* PRINT DROPDOWN */}
          <div className="relative inline-block">
            <button
              className="bg-white border border-[#babfc3] p-[8px_14px] rounded-[6px] font-[600] text-[0.9rem] cursor-pointer flex items-center gap-[6px] hover:bg-[#f6f6f7]"
              onClick={() => setShowPrintMenu(!showPrintMenu)}
            >
              <FaPrint /> Print ▼
            </button>

            {showPrintMenu && (
              <div className="absolute top-[110%] right-0 w-[200px] bg-white border border-[#e1e3e5] rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-[100] p-[5px_0]">
                <div className="flex items-center gap-[12px] p-[10px_15px] cursor-pointer text-[0.9rem] text-[#202223] transition-all duration-200 hover:bg-[#f3f4f6]" onClick={handleDownloadInvoice}>
                  <FaFilePdf className="text-[#007ace] text-[1.1rem]" />
                  <span>Invoice Hero PDF</span>
                </div>
                <div className="flex items-center gap-[12px] p-[10px_15px] cursor-pointer text-[0.9rem] text-[#202223] transition-all duration-200 hover:bg-[#f3f4f6]" onClick={() => window.print()}>
                  <FaReceipt className="text-[#f59e0b] text-[1.1rem]" />
                  <span>Order Printer</span>
                </div>
              </div>
            )}
          </div>

          <button className="bg-white border border-[#babfc3] p-[8px_14px] rounded-[6px] font-[600] text-[0.9rem] cursor-pointer flex items-center gap-[6px] hover:bg-[#f6f6f7]">
            More actions <FaEllipsisH />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-[20px] max-lg:grid-cols-1">
        {/* LEFT COLUMN */}
        <div className="flex flex-col">
          {/* ITEMS */}
          <div className="bg-white border border-[#e1e3e5] rounded-[8px] shadow-[0_2px_4px_rgba(0,0,0,0.05)] mb-[20px] overflow-hidden">
            <div className="p-[15px_20px] flex justify-between items-center border-b border-[#e1e3e5]">
              <h3 className="text-[1rem] font-[700] m-0">Unfulfilled ({order.items.length})</h3>
              <span className="text-[0.85rem] text-[#6d7175]">Location: Warehouse A</span>
            </div>
            <div className="p-0">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center p-[15px_20px] border-b border-[#f1f2f3] gap-[15px]">
                  <div className="w-[60px] !important h-[60px] !important min-w-[60px] !important border border-[#e5e7eb] rounded-[8px] overflow-hidden bg-white flex items-center justify-center">
                    <img
                      src={getImageUrl(item.product.image)}
                      alt={item.product.title}
                      className="max-w-full !important max-h-full !important w-auto !important h-auto !important object-contain !important block"
                    />
                  </div>
                  <div className="flex-[2] min-w-0">
                    <p className="font-[600] text-[0.95rem] text-[#0f172a] m-[0_0_4px_0] whitespace-nowrap overflow-hidden text-ellipsis">{item.product.title}</p>
                    <p className="text-[0.8rem] text-[#64748b] m-0 font-mono">SKU: {item.product.id}</p>
                  </div>
                  <div className="text-[0.9rem] text-[#334155] whitespace-nowrap">
                    Rs. {Number(item.price).toLocaleString()} × {item.quantity}
                  </div>
                  <div className="font-[700] text-[0.95rem] text-[#111] text-right min-w-[80px]">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-[15px_20px] bg-[#fbfbfb] border-t border-[#e1e3e5] text-right">
              <button className="bg-[#008060] text-white border border-[#008060] p-[8px_16px] rounded-[6px] font-[600] cursor-pointer hover:bg-[#006e52]">Mark as fulfilled</button>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="bg-white border border-[#e1e3e5] rounded-[8px] shadow-[0_2px_4px_rgba(0,0,0,0.05)] mb-[20px] overflow-hidden">
            <div className="p-[15px_20px] flex justify-between items-center border-b border-[#e1e3e5]">
              <h3 className="text-[1rem] font-[700] m-0">
                Payment{" "}
                <span
                  className={`p-[2px_6px] rounded-[4px] text-[0.8rem] ${order.is_paid ? "text-[#047857] bg-[#ecfdf5]" : "text-[#b46b08] bg-[#fffae5]"}`}
                >
                  {order.is_paid ? "Paid" : "Pending"}
                </span>
              </h3>
            </div>
            <div className="p-[20px]">
              <div className="flex justify-between mb-[10px] text-[0.9rem] text-[#5c5f62]">
                <span>Subtotal</span>
                <span>{order.items.length} items</span>
                <span>Rs. {Number(order.total_price).toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-[10px] text-[0.9rem] text-[#5c5f62]">
                <span>Shipping</span>
                <span>Standard</span>
                <span>Rs. 0.00</span>
              </div>
              <div className="flex justify-between mb-[10px] text-[0.9rem] text-[#5c5f62]">
                <span>Tax</span>
                <span>VAT 0%</span>
                <span>Rs. 0.00</span>
              </div>
              <div className="flex justify-between font-[700] text-[#202223] text-[1rem] mt-[15px] pt-[15px] border-t border-[#e1e3e5]">
                <span>Total</span>
                <span>Rs. {Number(order.total_price).toLocaleString()}</span>
              </div>
            </div>
            <div className="p-[15px_20px] border-t border-[#e1e3e5] flex justify-between items-center">
              <div className="text-[0.9rem] font-[500] flex gap-[20px]">
                <span>Paid by customer</span>
                <span>
                  Rs.{" "}
                  {order.is_paid
                    ? Number(order.total_price).toLocaleString()
                    : "0.00"}
                </span>
              </div>
              {!order.is_paid && (
                <button className="bg-white border border-[#babfc3] p-[8px_14px] rounded-[6px] font-[600] text-[0.9rem] cursor-pointer flex items-center gap-[6px] hover:bg-[#f6f6f7]">Mark as Paid</button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col">
          <div className="bg-white border border-[#e1e3e5] rounded-[8px] shadow-[0_2px_4px_rgba(0,0,0,0.05)] mb-[20px] overflow-hidden">
            <div className="p-[15px_20px] flex justify-between items-center border-b border-[#e1e3e5]">
              <h3 className="text-[1rem] font-[700] m-0">Notes</h3>
              <button className="text-[#007ace] bg-none border-none cursor-pointer text-[0.85rem]">Edit</button>
            </div>
            <p className="p-[20px] text-[#6d7175] text-[0.9rem] italic">No notes from customer</p>
          </div>

          <div className="bg-white border border-[#e1e3e5] rounded-[8px] shadow-[0_2px_4px_rgba(0,0,0,0.05)] mb-[20px] overflow-hidden">
            <div className="p-[15px_20px] flex justify-between items-center border-b border-[#e1e3e5]">
              <h3 className="text-[1rem] font-[700] m-0">Customer</h3>
            </div>
            <div className="p-[20px] text-[0.9rem] leading-[1.5]">
              <p className="text-[#007ace] font-[600] cursor-pointer m-0">{order.full_name}</p>
              <p className="text-[#6d7175] m-[2px_0_0]">1 order</p>
            </div>
            <div className="h-[1px] bg-[#e1e3e5] w-full"></div>
            <div className="p-[20px] text-[0.9rem] leading-[1.5]">
              <h4 className="font-[600] mb-[8px]">Contact information</h4>
              <p className="flex items-center gap-[10px] m-0">
                <FaEnvelope />{" "}
                <a href={`mailto:${order.email}`} className="text-[#007ace] no-underline">{order.email}</a>
              </p>
              <p className="flex items-center gap-[10px] m-0">
                <FaPhone /> {order.phone}
              </p>
            </div>
            <div className="h-[1px] bg-[#e1e3e5] w-full"></div>
            <div className="p-[20px] text-[0.9rem] leading-[1.5]">
              <h4 className="font-[600] mb-[8px]">Shipping Address</h4>
              <p>{order.full_name}</p>
              <p>{order.address}</p>
              <p>
                {order.city}, {order.state} {order.zip_code}
              </p>
              <p className="mt-[5px] text-[#6d7175]">India</p>
              <a href="#" className="block mt-[10px] text-[#007ace] text-[0.85rem] no-underline">
                View map
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
