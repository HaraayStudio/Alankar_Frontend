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
                orders.map((o, i) => (
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
      </div>

      <AnimatePresence>
        {popupOrder && (
          <motion.div
            className={styles.popupOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.popupCard}
              initial={{ y: 60, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 50, scale: 0.93, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 22 }}
            >
              <div className={styles.popupHeader}>
                <h2>Order #{popupOrder.id} Details</h2>
                <button onClick={() => setPopupOrder(null)} className={styles.closeBtn}>×</button>
              </div>
              <div className={styles.popupBody}>
                <div className={styles.infoBlock}>
                  <div><b>Status:</b> {getStatusBadge(popupOrder.status)}</div>
                  <div><b>Priority:</b> {getPriorityBadge(popupOrder.priority)}</div>
                  <div><b>Type:</b> {popupOrder.printType}</div>
                </div>
                <div className={styles.infoBlock}>
                  <div><b>Created:</b> {formatDate(popupOrder.createdAtDateTime)}</div>
                  <div><b>Start:</b> {formatDate(popupOrder.startDateTime)}</div>
                  <div><b>End:</b> {formatDate(popupOrder.endDateTime)}</div>
                </div>
                <div className={styles.infoBlock}>
                  <div><b>Description:</b> <br /><span className={styles.longDesc}>{popupOrder.description}</span></div>
                </div>
                <div className={styles.stepsBlock}>
                  <h4>Order Steps:</h4>
                  {popupOrder.steps && popupOrder.steps.length > 0 ? (
                    <ul>
                      {popupOrder.steps.map(step => (
                        <li key={step.id}>
                          <span className={styles.stepTitle}>{step.orderStepName}:</span>
                          <span className={styles.stepValue}>{step.measurement}</span>
                          <span className={styles.stepStatus} style={{
                            color: step.status === "CREATED" ? "#f2a103" : "#27cb7a"
                          }}>
                            {step.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>No steps found</div>
                  )}
                </div>
                {popupOrder.images && popupOrder.images.length > 0 && (
                  <div className={styles.imgBlock}>
                    <h4>Images:</h4>
                    <div className={styles.imgRow}>
                      {popupOrder.images.map((img, idx) => (
                        <img key={idx} src={img.url} alt={`Order Img ${idx+1}`} />
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
