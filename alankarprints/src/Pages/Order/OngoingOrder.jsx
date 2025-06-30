// OngoingOrders.jsx
import React, { useContext, useState } from "react";
import styles from "./OngoingOrders.module.scss"; // <-- Correct import
import { DataContext } from "../../context/DataContext";
const Orders = () => {
  const { orders } = useContext(DataContext); // Make sure orders is in your context!
  const [loading, setLoading] = useState(!orders || orders.length === 0);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // Helper functions
  const getStatusClass = (status = "") => {
    switch (status.toLowerCase()) {
      case "created":
        return styles.pending;
      case "in_progress":
        return styles.inprogress;
      case "completed":
        return styles.completed;
      case "cancelled":
        return styles.cancelled;
      default:
        return styles.pending;
    }
  };
  const getPriorityClass = (priority = "") => {
    switch (priority.toLowerCase()) {
      case "high":
        return styles.high;
      case "medium":
        return styles.medium;
      case "low":
        return styles.low;
      default:
        return styles.medium;
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const formatDateRange = (start, end) => {
    if (!start || !end) return "-";
    const startStr = new Date(start).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    const endStr = new Date(end).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    return `${startStr} - ${endStr}`;
  };
  // Modal handlers
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };
  if (loading) {
    return (
      <div className={styles.ordersPage}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className={styles.ordersPage}>
        <div className={styles.errorContainer}>
          <h3>Error Loading Orders</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className={styles.retryBtn}>
            Try Again
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.ordersPage}>
      <div className={styles.header}>
        <h2 className={styles.heading}>📦 Ongoing Orders</h2>
        <div className={styles.headerActions}>
          <div className={styles.orderCount}>
            Total Orders: <span>{orders.length}</span>
          </div>
        </div>
      </div><div className={styles.orderSummary}>
        <h3>Summary</h3>
        <div className={styles.summaryCards}>
          <div className={styles.summaryCard}>
            <div className={styles.cardTitle}>Total Orders</div>
            <div className={styles.cardValue}>{orders.length}</div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.cardTitle}>Pending</div>
            <div className={styles.cardValue}>
              {orders.filter((order) => (order.status || "").toLowerCase() === "created").length}
            </div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.cardTitle}>High Priority</div>
            <div className={styles.cardValue}>
              {orders.filter((order) => (order.priority || "").toLowerCase() === "high").length}
            </div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.cardTitle}>Wide Format</div>
            <div className={styles.cardValue}>
              {orders.filter((order) => order.printType === "Wide format printing").length}
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className={styles.tableContainer}>
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Client Name</th>
    <th>Created</th>
              <th>Type</th>
              <th>Description</th>
              <th>Status</th>
              <th>Priority</th>
              {/* <th>Schedule</th> */}
          
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className={styles.orderRow}>
                <td className={styles.orderId}>#{order.id}</td>
                <td className={styles.orderId}> -</td>
              <td className={styles.createdDate}>
                  {formatDate(order.createdAtDateTime)}
                </td>
                <td className={styles.printType}>{order.printType || "-"}</td>
                <td className={styles.description} title={order.description}>
                  {(order.description || "").length > 50
                    ? `${order.description.substring(0, 50)}...`
                    : order.description}
                </td>
                <td>
                  <span className={`${styles.status} ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <span className={`${styles.priority} ${getPriorityClass(order.priority)}`}>
                    {order.priority}
                  </span>
                </td>
                <td className={styles.schedule}>
                  {formatDateRange(order.startDateTime, order.endDateTime)}
                </td>
                
                <td className={styles.actions}>
                  <button
                    className={`${styles.actionBtn} ${styles.view}`}
                    title="View Details"
                    onClick={() => handleViewOrder(order)}
                  >
                    👁️
                  </button>
                  {/* Add other actions as needed */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📭</div>
            <h3>No Orders Found</h3>
            <p>There are no orders to display at the moment.</p>
          </div>
        )}
      </div>
      {/* MODAL */}
      {showModal && selectedOrder && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Order Details - #{selectedOrder.id}</h2>
              <button className={styles.closeBtn} onClick={closeModal}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.detailSection}>
                <h3>📋 Order Information</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Order ID:</span>
                    <span className={styles.whitetxt} >#{selectedOrder.id}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Type:</span>
                    <span className={styles.value}>{selectedOrder.printType}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Status:</span>
                    <span className={`${styles.status} ${getStatusClass(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Priority:</span>
                    <span className={`${styles.priority} ${getPriorityClass(selectedOrder.priority)}`}>
                      {selectedOrder.priority}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Created:</span>
                    <span className={styles.value}>{formatDate(selectedOrder.createdAtDateTime)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Start Date:</span>
                    <span className={styles.value}>{formatDate(selectedOrder.startDateTime)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>End Date:</span>
                    <span className={styles.value}>{formatDate(selectedOrder.endDateTime)}</span>
                  </div>
                </div>
                <br />
                <div className={`${styles.detailItem} ${styles.fullWidth}`}>
                  <span className={styles.label}>Description:</span>
                  <span className={styles.value}>{selectedOrder.description}</span>
                </div>
              </div>
              <div className={styles.detailSection}>
                <h3>🔧 Order Steps ({selectedOrder.steps.length})</h3>
                <div className={styles.stepsContainer}>
                  {selectedOrder.steps.map((step, index) => (
                    <div key={step.id} className={styles.stepItem}>
                      <div className={styles.stepHeader}>
                        <span className={styles.stepNumber}>{index + 1}</span>
                        <span className={styles.stepName}>{step.orderStepName}</span>
                       <select
  className={styles.stepStatusSelect}
  value={step.status}
  onChange={e => handleStepStatusChange(step, e.target.value)}
>
  <option value="CREATED">Created</option>
  <option value="ONGOING">Ongoing</option>
  <option value="COMPLETED">Completed</option>
</select>
                      </div>
                      <div className={styles.stepMeasurement}>
                        <span className={styles.measurementLabel}>Measurement:</span>
                        <span className={styles.measurementValue}>{step.measurement}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Images section */}
              <div className={styles.detailSection}>
                <h3>🖼️ Images</h3>
                {selectedOrder.images && selectedOrder.images.length > 0 ? (
                  <div className={styles.imagesContainer}>
                    {selectedOrder.images.map((image, index) => (
                      <div key={index} className={styles.imageItem}>
                        <img src={image.imageUrl} alt={`Order image ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={styles.noImages}>No images attached to this order</p>
                )}
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={`${styles.btn} ${styles.secondary}`} onClick={closeModal}>Close</button>
              {/* <button className={`${styles.btn} ${styles.primary}`}>Edit Order</button> */}
            </div>
          </div>
        </div>
      )}
      {/* SUMMARY */}
      
    </div>
  );
};
export default Orders;
