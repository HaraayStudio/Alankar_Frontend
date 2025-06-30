import React, { useState } from "react";
import styles from "./postSalesPage.module.scss";
import HeaderLinks from "../../Components/HeaderLinks";
import Table from "../../Components/Table";
import OrdersPopup from "./OrdersPopup"; // (Optional) If you want to pop up order details
import InvoiceListPopup from "./InvoiceListPopup"; // (Optional)
import { Eye, Edit, Trash2, X } from "lucide-react";
import { useData } from "../../context/DataContext";

// Navigation links
const links = [
  { to: "/sales/presale", label: "Pre-sales" },
  { to: "/sales/postsale", label: "Post sales" },
];

// Table columns (modify as per your use)
const columns = [
  { key: "srNumber", label: "S.No" },
  { key: "clientName", label: "Client Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "orders", label: "Orders" },
  { key: "orderStart", label: "Order Start" },
  { key: "orderEnd", label: "Order End" },
  { key: "finalAmt", label: "Final Amt (No GST)" },
  { key: "gst", label: "GST %" },
  { key: "totalWithGst", label: "Total (With GST)" },
  { key: "status", label: "Status" },
  { key: "remark", label: "Remark" },
  { key: "invoices", label: "Invoices" },
  { key: "actions", label: "Actions" },
];

// Utility formatters
const formatDate = (dateString) =>
  dateString
    ? new Date(dateString).toLocaleDateString("en-GB")
    : "-";
const formatTime = (dateString) =>
  dateString
    ? new Date(dateString).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
    : "-";

// Status badge
const StatusBadge = ({ status }) => (
  <span className={`${styles.statusBadge} ${status?.toLowerCase() === "onboarded" ? styles.statusOnboarded : styles.statusPending}`}>
    {status ? status.charAt(0) + status.slice(1).toLowerCase() : "Pending"}
  </span>
);

export default function postSalesPage() {
  const {
    postSales, // from your DataContext!
    setAddPostSalePopup,
    handleDeletePostSale, // You can implement this in context
  } = useData();

  // Popups
  const [showOrders, setShowOrders] = useState({ open: false, orders: [], srNumber: null });
  const [showInvoices, setShowInvoices] = useState(null); // postsale object or null

  // Delete logic
  const [deletingSrNumber, setDeletingSrNumber] = useState(null);

  // Build data for Table component
  const data = (postSales || []).map((item) => {
    // Prepare a single string of order types for this postsale
    const orderList =
      (item.orders && item.orders.length
        ? item.orders
            .map(
              (ord) =>
                `${ord.orderType || "-"} (${ord.printType || ""} ${ord.media || ""})`
            )
            .join(", ")
        : "-");

    const firstOrder = (item.orders && item.orders[0]) || {};

    return {
      srNumber: item.srNumber,
      clientName: item.client?.clientName || "-",
      email: item.client?.email || "-",
      phone: item.client?.phone || "-",
      orders: (
        <button
          className={styles.actionBtn}
          onClick={() => setShowOrders({ open: true, orders: item.orders, srNumber: item.srNumber })}
          disabled={!item.orders || !item.orders.length}
        >
          View Orders
        </button>
      ),
      orderStart: firstOrder.orderStartDateTime
        ? `${formatDate(firstOrder.orderStartDateTime)} ${formatTime(firstOrder.orderStartDateTime)}`
        : "-",
      orderEnd: firstOrder.orderEndDateTime
        ? `${formatDate(firstOrder.orderEndDateTime)} ${formatTime(firstOrder.orderEndDateTime)}`
        : "-",
      finalAmt: firstOrder.totalAmount
        ? `₹${Number(firstOrder.totalAmount).toLocaleString()}`
        : "-",
      gst: firstOrder.gst ? `${firstOrder.gst}%` : "-",
      totalWithGst: firstOrder.totalAmountWithGST
        ? `₹${Number(firstOrder.totalAmountWithGST).toLocaleString()}`
        : "-",
      status: (
        <StatusBadge status={item.status || firstOrder.status} />
      ),
      remark: item.remark || "-",
      invoices: (
        <button
          className={styles.actionBtn}
          onClick={() => setShowInvoices(item)}
        >
          Invoices
        </button>
      ),
      actions: (
        <div className={styles.actionButtons}>
          <button className={styles.iconButton} title="View">
            <Eye size={16} />
          </button>
          <button className={styles.iconButton} title="Edit">
            <Edit size={16} />
          </button>
          <button
            className={styles.iconButton}
            title="Delete"
            onClick={async () => {
              if (!window.confirm("Are you sure you want to delete this post-sale?")) return;
              setDeletingSrNumber(item.srNumber);
              try {
                await handleDeletePostSale(item.srNumber);
              } catch {
                alert("Failed to delete.");
              }
              setDeletingSrNumber(null);
            }}
            disabled={deletingSrNumber === item.srNumber}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    };
  });

  return (
    <div className={styles.PostSaleMainDiv}>
      <HeaderLinks links={links} />
      <div className={styles.mainContent}>
        <div className={styles.heading}>
          <div className={styles.headtext}>
            <h1>Post-Sale</h1>
          </div>
          <div className={styles.addButton}>
            <button onClick={() => setAddPostSalePopup && setAddPostSalePopup(true)}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" fill="none">
                  <path d="M12 4V22M21 13H3" stroke="#030304" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
                </svg>
              </span>
              Add Post-Sale
            </button>
          </div>
        </div>
        <Table columns={columns} data={data} />
      </div>

      {/* Orders Popup */}
      {showOrders.open && (
        <OrdersPopup
          orders={showOrders.orders}
          srNumber={showOrders.srNumber}
          onClose={() => setShowOrders({ open: false, orders: [], srNumber: null })}
        />
      )}

      {/* Invoices Popup */}
      {showInvoices && (
        <InvoiceListPopup
          open={!!showInvoices}
          postsale={showInvoices}
          onClose={() => setShowInvoices(null)}
        />
      )}
    </div>
  );
}
