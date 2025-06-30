// src/pages/OrderHistoryTable.jsx
import React, { useState, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import styles from "./OrderHistoryTable.module.scss";
import { Calendar, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const formatDate = (dateStr) =>
  dateStr
    ? new Date(dateStr).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "-";

const getStatusBadge = (status) => {
  const map = {
    "CREATED": { txt: "Pending", color: "#ffe9be", text: "#f2a103" },
    "PENDING": { txt: "Pending", color: "#ffe9be", text: "#f2a103" },
    "IN_PROGRESS": { txt: "Ongoing", color: "#d4f9e8", text: "#27cb7a" },
    "ONGOING": { txt: "Ongoing", color: "#d4f9e8", text: "#27cb7a" },
    "COMPLETED": { txt: "Completed", color: "#e7f1fd", text: "#2674e0" }
  };
  const s = map[status] || map["CREATED"];
  return (
    <span
      className={styles.statusBadge}
      style={{ background: s.color, color: s.text }}
    >
      {s.txt}
    </span>
  );
};
const getPriorityBadge = (priority) => {
  const map = {
    "HIGH": { txt: "High", color: "#fde9fc", text: "#ea49dc" },
    "MEDIUM": { txt: "Medium", color: "#ffe7e0", text: "#fc6a41" },
    "LOW": { txt: "Low", color: "#e9fbe6", text: "#21cc55" }
  };
  const p = map[priority?.toUpperCase()] || map["MEDIUM"];
  return (
    <span
      className={styles.priorityBadge}
      style={{ background: p.color, color: p.text }}
    >
      {p.txt}
    </span>
  );
};

export default function OrderHistoryTable() {
  const { orders, clients } = useContext(DataContext);
  const [popupOrder, setPopupOrder] = useState(null);

  // Get customer name for each order (if client info present)
  const getCustomerName = (order) => {
    // If you store clientId in order, you can match with clients
    // For this demo, fallback to ID or show N/A
    let name = order.clientName || "";
    if (!name && clients && Array.isArray(clients)) {
      const found = clients.find(c => c.id === order.clientId || c.id === order.client?.clientId);
      name = found ? found.name : "";
    }
    return name || "N/A";
  };

  return (
    <>
      <div className={styles.historyCard}>
        <div className={styles.headerRow}>
          <span>History & Details</span>
          <button className={styles.sortBtn}>Sort By: Month</button>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Type</th>
                <th>Description</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Schedule</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
             {orders && orders.length > 0 ? (
  orders
    .filter(o => String(o.status).toUpperCase() === "COMPLETED")    // Only COMPLETED orders
    .map((o, i) => (
      <tr key={o.id}>
        <td>{String(o.id).padStart(2, "0")}</td>
        <td>{getCustomerName(o)}</td>
        <td>{o.printType || "N/A"}</td>
        <td className={styles.descCell}>{o.description}</td>
        <td>{getStatusBadge(o.status)}</td>
        <td>{getPriorityBadge(o.priority)}</td>
        <td>
          <span className={styles.calIcon}><Calendar size={16} /></span>
          {formatDate(o.startDateTime)}
        </td>
        <td>
          <button
            className={styles.viewBtn}
            onClick={() => setPopupOrder(o)}
          >
            <Eye size={16} />
            View Order
          </button>
        </td>
      </tr>
    ))
) : (
  <tr><td colSpan={8}>No orders found</td></tr>
)}

            </tbody>
          </table>
        </div>
      </div>{
console.log(popupOrder)}

      <AnimatePresence>
        {popupOrder && (
          <motion.div
            className={styles.popupOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
           
     <motion.div className={styles.popupCard}  
     initial={{ y: 60, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 50, scale: 0.93, opacity: 0 }}

              transition={{ type: "sprng", stiffness: 150, damping: 22 }}> 

  <div className={styles.popupHeader}>
    <h2>
      <span className={styles.popupTitle}>Order</span>
      <span className={styles.orderId}>#{popupOrder.id}</span>
    </h2>
    <button onClick={() => setPopupOrder(null)} className={styles.closeBtn}>×</button>
  </div>
  <div className={styles.popupBody}>
    {/* Status & Priority */}
    <div className={styles.summaryRow}>
      <div className={styles.badgeCol}>
        {getStatusBadge(popupOrder.status)}
        {getPriorityBadge(popupOrder.priority)}
      </div>
      <div className={styles.detailCol}>
        <span className={styles.label}>Type:</span>
        <span>{popupOrder.printType}</span>
      </div>
    </div>
    {/* Dates */}
    <div className={styles.infoGrid}>
      <div>
        <span className={styles.label}>Created</span>
        <span>{formatDate(popupOrder.createdAtDateTime)}</span>
      </div>
      <div>
        <span className={styles.label}>Start</span>
        <span>{formatDate(popupOrder.startDateTime)}</span>
      </div>
      <div>
        <span className={styles.label}>End</span>
        <span>{formatDate(popupOrder.endDateTime)}</span>
      </div>
    </div>
    {/* Description */}
    <div className={styles.descBox}>
      <span className={styles.label}>Description</span>
      <p>{popupOrder.description || <em>No description provided.</em>}</p>
    </div>
    {/* Steps */}
    <div className={styles.stepsSection}>
      <div className={styles.stepsHeader}>
        <span>Order Steps</span>
        <span className={styles.stepsCount}>{popupOrder.steps?.length || 0}</span>
      </div>
      {popupOrder.steps && popupOrder.steps.length > 0 ? (
        <ul className={styles.stepsList}>
          {popupOrder.steps.map((step, idx) => (
            <li className={styles.stepItem} key={step.id || idx}>
              <span className={styles.stepNum}>{idx + 1}</span>
              <span className={styles.stepName}>{step.orderStepName}</span>
              <span className={styles.stepValue}>{step.measurement}</span>
              <span className={styles.stepStatus}
                style={{
                  background: step.status === "COMPLETED"
                    ? "#e7f1fd"
                    : step.status === "IN_PROGRESS" || step.status === "ONGOING"
                    ? "#d4f9e8"
                    : "#ffe9be",
                  color: step.status === "COMPLETED"
                    ? "#2674e0"
                    : step.status === "IN_PROGRESS" || step.status === "ONGOING"
                    ? "#27cb7a"
                    : "#f2a103",
                }}>
                {step.status}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noSteps}>No steps found</div>
      )}
    </div>
    {/* Images */}
    {popupOrder.images && popupOrder.images.length > 0 && (
      <div className={styles.imagesSection}>
        <span className={styles.label}>Images</span>
        <div className={styles.imagesRow}>
          {popupOrder.images.map((img, idx) => (
            <img key={idx} src={img.url} alt={`Order Img ${idx+1}`}
              className={styles.orderImage}
            />
          ))}
        </div>
      </div>
    )}
  </div>
</motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
