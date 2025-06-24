import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import styles from "./Dashboard.module.scss";
import Profile from "../../components/Profile";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function Dashboard() {
  // Get data from context with safe fallbacks
  const { orders, invoices } = useContext(DataContext);
  const safeOrders = Array.isArray(orders) ? orders : [];
  const safeInvoices = Array.isArray(invoices) ? invoices : [];

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [payType, setPayType] = useState("Payment Dues");
  const [payTab, setPayTab] = useState("Completed");
  const [payStatus, setPayStatus] = useState("Pending");

  // Helper functions
  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "-";

  const showValue = (val, fallback = "-") => {
    if (val === null || val === undefined || val === "" || Number.isNaN(val)) return fallback;
    return val;
  };

  const formatCurrency = (amount) => {
    const numAmount = Number(amount) || 0;
    return `₹${numAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Payment calculation helpers - Fixed to handle different payment statuses properly
  const getTotalReceived = (invoices) => {
    return invoices.reduce((sum, inv) => {
      if (!Array.isArray(inv.payments)) return sum;
      return sum + inv.payments
        .filter(p => p.status === "COMPLETED" || p.status === "SUCCESS" || p.status === "PAID")
        .reduce((pSum, p) => pSum + (Number(p.amount) || 0), 0);
    }, 0);
  };

  const getTotalPending = (invoices) => {
    return invoices.reduce((sum, inv) => {
      if (!Array.isArray(inv.payments)) return sum;
      return sum + inv.payments
        .filter(p => p.status === "PENDING" || p.status === "CREATED" || p.status === "AWAITING")
        .reduce((pSum, p) => pSum + (Number(p.amount) || 0), 0);
    }, 0);
  };

  const getTotalInvoicesAmountWithGST = (invoices) => {
    return invoices.reduce((sum, inv) => sum + (Number(inv.totalAmountWithGST) || 0), 0);
  };

  const getTotalInvoicesAmountWithoutGST = (invoices) => {
    return invoices.reduce((sum, inv) => sum + (Number(inv.totalAmount) || 0), 0);
  };

  // Get invoices with pending/due payments
  const getDuesInvoices = (invoices) => {
    return invoices.filter(inv => 
      (inv.payments || []).some(p => 
        p.status === "PENDING" || 
        p.status === "CREATED" || 
        p.status === "AWAITING" ||
        p.status === "FAILED"
      )
    );
  };

  // Status and priority color helpers
  const getStatusColor = (status) => {
    switch (status) {
      case "CREATED":
        return "#ffa500";
      case "IN_PROGRESS":
        return "#007bff";
      case "COMPLETED":
      case "SUCCESS":
      case "PAID":
        return "#28a745";
      case "PENDING":
      case "AWAITING":
        return "#6c757d";
      case "FAILED":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "#dc3545";
      case "MEDIUM":
        return "#ffc107";
      case "LOW":
        return "#28a745";
      default:
        return "#6c757d";
    }
  };

  // Calculate all totals using helper functions
  const totalPending = getTotalPending(safeInvoices);
  const totalReceived = getTotalReceived(safeInvoices);
  const totalAmountWithGST = getTotalInvoicesAmountWithGST(safeInvoices);
  const totalAmountWithoutGST = getTotalInvoicesAmountWithoutGST(safeInvoices);
  const duesInvoices = getDuesInvoices(safeInvoices);

  // Graph data for order summary
  const graphData = [
    { month: "Jan", percent: 60, growth: 16 },
    { month: "Feb", percent: 90, growth: 8 },
    { month: "Mar", percent: 75, growth: 15 },
    { month: "Apr", percent: 65, growth: 10 },
    { month: "May", percent: 100 },
    { month: "Jun", percent: 40 },
    { month: "Jul", percent: 0 },
    { month: "Aug", percent: 0 },
    { month: "Sep", percent: 0 },
    { month: "Oct", percent: 0 },
    { month: "Nov", percent: 0 },
    { month: "Dec", percent: 0 },
  ];

  // Order totals
  const getTotalOrders = () => safeOrders.length;
  const getCompletedOrders = () =>
    safeOrders.filter((order) => order.status === "COMPLETED").length;

  // Bank info
  const latestBank = "SBI";
  const latestAcc = "XXXXXXXX-9852";

  // Invoice groups for display
  const invoiceGroups = [
    safeInvoices.slice(0, 3),
    safeInvoices.slice(3, 6),
  ];

  return (
    <div className={styles.dashboardMain}>
      {/* Header section */}
      <div className={styles.sec1}>
        <div className={styles.leftCard}>
          <div className={styles.cardHeader}>
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="33"
              viewBox="0 0 32 33"
              fill="none"
            >
              <rect y="0.5" width="32" height="32" rx="16" fill="#B8D3FF" />
              <path
                d="M24.0005 13.0005V23H8.00049V13.0005H13.0005V12.0006C13.0005 11.86 13.0265 11.7298 13.0786 11.61C13.1307 11.4902 13.201 11.386 13.2896 11.2975C13.3781 11.209 13.4849 11.1361 13.6099 11.0788C13.7349 11.0215 13.8651 10.9954 14.0005 11.0007H18.0005C18.1411 11.0007 18.2713 11.0267 18.3911 11.0788C18.5109 11.1309 18.6151 11.2012 18.7036 11.2897C18.7922 11.3782 18.8651 11.485 18.9224 11.61C18.9797 11.735 19.0057 11.8652 19.0005 12.0006V13.0005H24.0005ZM14.0005 13.0005H18.0005V12.0006H14.0005V13.0005ZM9.00049 14.0005V15.4457L14.0005 17.9378V17.0003H18.0005V17.9378L23.0005 15.4457V14.0005H9.00049ZM15.0005 18.0003V19.0002H17.0005V18.0003H15.0005ZM23.0005 22.0001V16.555L18.0005 19.0627V20.0002H14.0005V19.0627L9.00049 16.555V22.0001H23.0005Z"
                fill="#1D5B86"
              />
            </svg>
            <h2>Total Orders</h2>
          </div>
          <div className={styles.content}>
            <div>
              <h5>{getTotalOrders()}</h5>
            </div>
            <div>
              <p>Orders this month</p>
            </div>
            <div>
              <Profile users={[]} />
            </div>
          </div>
        </div>

        {/* Bar Graph Card */}
        <div className={styles.rightCard}>
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <h3>Order Summary</h3>
            </div>
            <div className={styles.chart}>
              {graphData.map((item, idx) => (
                <div key={idx} className={styles.barWrapper}>
                  <div
                    className={`${styles.bar} ${
                      item.percent === 100 ? styles.active : ""
                    }`}
                    style={{ height: `${item.percent}%` }}
                  >
                    {item.percent === 100 && (
                      <div className={styles.label}>100%</div>
                    )}
                  </div>
                  <span className={styles.month}>{item.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className={styles.sec2}>
        <div className={styles.ordersContainer}>
          <div className={styles.ordersHeader}>
            <h2>All Ongoing Projects</h2>
            <div className={styles.ordersStats}>
              <span className={styles.statItem}>
                Total: {getTotalOrders()}
              </span>
              <span className={styles.statItem}>
                Completed: {getCompletedOrders()}
              </span>
            </div>
          </div>
          <div className={styles.ordersContent}>
            {/* Orders Sidebar */}
            <div className={styles.clientsSidebar}>
              {safeOrders.length > 0 ? (
                safeOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`${styles.clientItem} ${
                      selectedOrder?.id === order.id ? styles.active : ""
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className={styles.clientName}>
                      #{order.id} {showValue(order.printType, "N/A")}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 42 42"
                        fill="none"
                      >
                        <rect width="42" height="42" rx="21" fill="#104264" />
                        <path
                          d="M26.0069 16.4812L26.0069 16.0487L26.4387 16.0493L26.4394 16.4812L26.0069 16.4812ZM17.1501 25.9488C17.0691 26.0298 16.9592 26.0753 16.8447 26.0753C16.7301 26.0753 16.6202 26.0298 16.5392 25.9488C16.4582 25.8678 16.4127 25.758 16.4127 25.6434C16.4127 25.5289 16.4582 25.419 16.5392 25.338L17.1501 25.9488ZM18.6771 16.0487L26.0069 16.0487L26.0069 16.9136L18.6771 16.9136L18.6771 16.0487ZM26.4394 16.4812L26.4394 23.811L25.5744 23.811L25.5744 16.4812L26.4394 16.4812ZM26.3123 16.7866L17.1501 25.9488L16.5392 25.338L25.7015 16.1758L26.3123 16.7866Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noSelection}>
                  <h3>No orders found</h3>
                </div>
              )}
            </div>

            {/* Order Details */}
            <div className={styles.ordersMain}>
              {selectedOrder ? (
                <div className={styles.orderDetails}>
                  <div className={styles.orderDetailsHeader}>
                    <h4>Order #{selectedOrder.id} Details</h4>
                    <button
                      className={styles.closeDetails}
                      onClick={() => setSelectedOrder(null)}
                    >
                      ×
                    </button>
                  </div>
                  <div className={styles.orderInfo}>
                    <div className={styles.infoRow}>
                      <label>Print Type</label>
                      <span>{showValue(selectedOrder.printType)}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <label>Status</label>
                      <span
                        className={styles.statusBadge}
                        style={{
                          backgroundColor: getStatusColor(selectedOrder.status),
                        }}
                      >
                        {showValue(selectedOrder.status, "N/A").replace("_", " ")}
                      </span>
                    </div>
                    <div className={styles.infoRow}>
                      <label>Priority</label>
                      <span
                        className={styles.priorityBadge}
                        style={{
                          color: getPriorityColor(selectedOrder.priority),
                        }}
                      >
                        {showValue(selectedOrder.priority, "N/A")}
                      </span>
                    </div>
                    <div className={styles.infoRow}>
                      <label>Created At</label>
                      <span>
                        {showValue(formatDate(selectedOrder.createdAtDateTime))}
                      </span>
                    </div>
                    <div className={styles.infoRow}>
                      <label>Start Date</label>
                      <span>{showValue(formatDate(selectedOrder.startDateTime))}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <label>End Date</label>
                      <span>{showValue(formatDate(selectedOrder.endDateTime))}</span>
                    </div>
                  </div>
                  <div className={styles.orderDescriptionFull}>
                    <label>Description</label>
                    <p>{showValue(selectedOrder.description)}</p>
                  </div>
                  <div className={styles.orderSteps}>
                    <label>Progress Steps</label>
                    <div className={styles.stepsList}>
                      {selectedOrder.steps && selectedOrder.steps.length > 0 ? (
                        selectedOrder.steps.map((step, index) => (
                          <div key={step.id} className={styles.stepItem}>
                            <div className={styles.stepNumber}>
                              {index + 1}
                            </div>
                            <div className={styles.stepContent}>
                              <div className={styles.stepName}>
                                {showValue(step.orderStepName)}
                              </div>
                              <div className={styles.stepMeasurement}>
                                {showValue(step.measurement)}
                              </div>
                              <div
                                className={styles.stepStatus}
                                style={{
                                  color: getStatusColor(step.status),
                                }}
                              >
                                {showValue(step.status, "N/A").replace("_", " ")}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className={styles.noSteps}>No steps found</div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.noSelection}>
                  <h3>Select an order to view details</h3>
                  <p>Choose an order from the sidebar to see its details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payments + Invoices Section */}
      <div className={styles.sec3}>
        <div className={styles.paymentsInvoicesSection}>
          {/* Payments Card */}
          <div className={styles.paymentsCard}>
            <div className={styles.payHeader}>
              <div>
                <div className={styles.payTitle}>Payments</div>
                <div className={styles.payAmount}>
                  {formatCurrency(totalPending)}
                </div>
                <span className={styles.payGrowth}>
                  <span>Received: {formatCurrency(totalReceived)}</span>
                </span>
                <span className={styles.payGrowth}>
                  Total (with GST): {formatCurrency(totalAmountWithGST)}
                </span>
                <span className={styles.payGrowth}>
                  Total (without GST): {formatCurrency(totalAmountWithoutGST)}
                </span>
              </div>
            </div>
            <div className={styles.payTabs}>
              <div className={styles.dropdown}>
                <button>
                  {payType} <ChevronDown size={16} />
                </button>
              </div>
              <div className={styles.dropdown}>
                <button>
                  {payTab} <ChevronDown size={16} />
                </button>
              </div>
              <div className={styles.dropdown}>
                <button>
                  {payStatus} <ChevronDown size={16} />
                </button>
              </div>
            </div>
            <div className={styles.payDuesHeader}>
              Payment Dues{" "}
              <span className={styles.seeAll}>
                See all <ChevronRight size={16} />
              </span>
            </div>
            <div className={styles.duesList}>
              {duesInvoices.length > 0 ? (
                duesInvoices.slice(0, 3).map((inv) => (
                  <div className={styles.dueCard} key={inv.id}>
                    <div className={styles.dueCardHeader}>
                      <div className={styles.invNumber}>
                        #{showValue(inv.invoiceNumber, "N/A")}
                      </div>
                      <div className={styles.invAmt}>
                        {formatCurrency(inv.totalAmountWithGST)}
                      </div>
                    </div>
                    <div className={styles.dueCardInfo}>
                      <div className={styles.clientName}>
                        {showValue(inv.clientName, "N/A")}
                      </div>
                      <div className={styles.invDate}>
                        {showValue(formatDate(inv.issueDate))}
                      </div>
                    </div>
                    {Array.isArray(inv.payments) && inv.payments.length > 0 ? (
                      <div className={styles.paymentsDetail}>
                        <div className={styles.paymentHeader}>Payment Details:</div>
                        {inv.payments.map((p) => (
                          <div key={p.id} className={styles.paymentRow}>
                            <div className={styles.paymentMethod}>
                              <span className={styles.label}>Method:</span>
                              <span className={styles.value}>{showValue(p.method, "N/A")}</span>
                            </div>
                            <div className={styles.paymentStatus}>
                              <span className={styles.label}>Status:</span>
                              <span 
                                className={styles.statusBadge}
                                style={{ backgroundColor: getStatusColor(p.status) }}
                              >
                                {showValue(p.status, "N/A")}
                              </span>
                            </div>
                            <div className={styles.paymentAmount}>
                              <span className={styles.label}>Amount:</span>
                              <span className={styles.value}>{formatCurrency(p.amount)}</span>
                            </div>
                            {p.paymentDate && (
                              <div className={styles.paymentDate}>
                                <span className={styles.label}>Date:</span>
                                <span className={styles.value}>{formatDate(p.paymentDate)}</span>
                              </div>
                            )}
                            {p.paymentLink && (
                              <div className={styles.paymentLink}>
                                <span className={styles.label}>Link:</span>
                                <a href={p.paymentLink} target="_blank" rel="noopener noreferrer">
                                  Pay Now
                                </a>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={styles.noPaymentInfo}>No payment info</div>
                    )}
                  </div>
                ))
              ) : (
                <div className={styles.noSelection}>No dues found</div>
              )}
            </div>
          </div>

          {/* Invoices Card */}
          <div className={styles.invoicesCard}>
            <div className={styles.invHeader}>
              <div className={styles.invTitle}>Invoices</div>
              <div className={styles.invSelectBtn}>
                Select <ChevronDown size={16} />
              </div>
            </div>
            <div className={styles.bankBlock}>
              <div className={styles.bankIcon}></div>
              <div>
                <div className={styles.bankName}>{latestBank}</div>
                <div className={styles.bankAcc}>{latestAcc}</div>
              </div>
              <button className={styles.viewMoreBtn}>View more</button>
            </div>
            <div className={styles.invListBlock}>
              {invoiceGroups.map((group, colIdx) => (
                <div className={styles.invListCol} key={colIdx}>
                  {group.length > 0 ? (
                    group.map((inv) => (
                      <div className={styles.invClientRow} key={inv.id}>
                        <div className={styles.invClientInfo}>
                          <div className={styles.clientName}>
                            {showValue(inv.clientName, "N/A")}
                          </div>
                          <div className={styles.invNumber}>
                            #{showValue(inv.invoiceNumber, "N/A")}
                          </div>
                        </div>
                        <div className={styles.invDetails}>
                          <div className={styles.invAmount}>
                            {formatCurrency(inv.totalAmountWithGST)}
                          </div>
                          <div className={styles.invDate}>
                            {showValue(formatDate(inv.issueDate))}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.noSelection}>No invoices</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}