import React, { useContext, useState } from "react";
import styles from "./InvoiceList.module.scss";
import { DataContext } from "../../context/DataContext";
import { Eye, Edit, Trash2, X } from "lucide-react";

// Currency formatter
const formatCurrency = (amt = 0) =>
  `₹${Number(amt || 0).toLocaleString("en-IN", { minimumFractionDigits: 0 })}`;

// Date formatter
const shortDate = (str) =>
  str
    ? new Date(str).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

// Status color
function getStatusClass(status) {
  if (!status) return "";
  if (
    ["COMPLETED", "SUCCESS", "PAID"].includes(status.toUpperCase())
  )
    return styles.statusCompleted;
  if (status.toUpperCase() === "PENDING" || status.toUpperCase() === "CREATED")
    return styles.statusPending;
  return styles.statusDefault;
}

// Take first payment for display
function getFirstPayment(inv) {
  if (!inv.payments || inv.payments.length === 0) return {};
  return inv.payments[0];
}


function InvoiceModal({ invoice, onClose }) {
  if (!invoice) return null;

  const firstPayment = invoice.payments?.[0] || {};
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalCard} onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.modalClose} onClick={onClose}>
          <X size={22} />
        </button>
        {/* Title */}
        <div className={styles.modalTitle}>
          <span>Invoice Details</span>
          <span className={styles.invoiceNum}>#{invoice.invoiceNumber}</span>
        </div>
        {/* Grid Info */}
        <div className={styles.modalDetailsGrid}>
          <div>
            <span className={styles.label}>Client</span>
            <span className={styles.value}>{invoice.clientName}</span>
          </div>
          <div>
            <span className={styles.label}>Created On</span>
            <span className={styles.value}>{shortDate(invoice.issueDate)}</span>
          </div>
          <div>
            <span className={styles.label}>Valid Till</span>
            <span className={styles.value}>{shortDate(invoice.validTill)}</span>
          </div>
          <div>
            <span className={styles.label}>Total Amount</span>
            <span className={styles.value}>{formatCurrency(invoice.totalAmountWithGST)}</span>
          </div>
          <div>
            <span className={styles.label}>Status</span>
            <span className={`${styles.statusBadge} ${getStatusClass(firstPayment.status)}`}>
              {firstPayment.status || "N/A"}
            </span>
          </div>
        </div>
        {/* Details Box */}
        <div className={styles.detailsSection}>
          <span className={styles.label}>Details</span>
          <div className={styles.detailsBox}>
            {invoice.details || <em>No details available.</em>}
          </div>
        </div>
        {/* Payments Table */}
        <div className={styles.modalPaymentsSection}>
          <div className={styles.sectionTitle}>Payments</div>
          {invoice.payments && invoice.payments.length > 0 ? (
            <table className={styles.paymentsTable}>
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {invoice.payments.map((p) => (
                  <tr key={p.id}>
                    <td>{p.method || "N/A"}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${getStatusClass(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>{formatCurrency(p.amount)}</td>
                    <td>{shortDate(p.paymentDate)}</td>
                    <td>
                      {p.paymentLink ? (
                        <a href={p.paymentLink} target="_blank" rel="noopener noreferrer" className={styles.payLink}>
                          Pay Now
                        </a>
                      ) : "--"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.noPayments}>No Payments Data</div>
          )}
        </div>
      </div>
    </div>
  );
}



export default function InvoiceList() {
  const { invoices = [] } = useContext(DataContext);
  const [viewInvoice, setViewInvoice] = useState(null);

  return (
    <div className={styles.invoicePageWrap}>
      <div className={styles.tableCard}>
        <div className={styles.tableHeaderRow}>
          <div className={styles.tableTitle}>Sale Invoice</div>
          <button className={styles.periodBtn}>Monthly ▾</button>
        </div>
        <div className={styles.tableScrollWrap}>
          <table className={styles.invoiceTable}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>ID Invoice</th>
                <th>Customer Name</th>
                <th>Created On</th>
                <th>Amount</th>
                <th>Paid</th>
                <th>Status</th>
                <th>Payment Mode</th>
                <th>Due Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, idx) => {
                const payment = getFirstPayment(inv);
                return (
                  <tr key={inv.id}>
                    <td>{String(idx + 1).padStart(2, "0")}</td>
                    <td>#{inv.invoiceNumber || "N/A"}</td>
                    <td>{inv.clientName}</td>
                    <td>{shortDate(inv.issueDate)}</td>
                    <td>{formatCurrency(inv.totalAmountWithGST)}</td>
                    <td>{formatCurrency(payment.amount)}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${getStatusClass(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td>{payment.method || "N/A"}</td>
                    <td>{shortDate(inv.validTill)}</td>
                    <td>
                      <button className={styles.actionBtn} title="View" onClick={() => setViewInvoice(inv)}>
                        <Eye size={18} />
                      </button>
                      <button className={styles.actionBtn} title="Edit">
                        <Edit size={18} />
                      </button>
                      <button className={styles.actionBtn} title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal for view */}
      {viewInvoice && <InvoiceModal invoice={viewInvoice} onClose={() => setViewInvoice(null)} />}
    </div>
  );
}
