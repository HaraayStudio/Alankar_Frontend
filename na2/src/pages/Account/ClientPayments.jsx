import React, { useContext, useState } from "react";
import styles from "./ClientPayments.module.scss";
import { DataContext } from "../../context/DataContext";
import { Eye, Edit, Trash2 } from "lucide-react";

// Format currency
const formatCurrency = (amt = 0) =>
  `₹${Number(amt || 0).toLocaleString("en-IN", { minimumFractionDigits: 0 })}`;

// Format date
const shortDate = (str) =>
  str
    ? new Date(str).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

// Get first payment (for summary)
function getFirstPayment(inv) {
  if (!inv.payments || inv.payments.length === 0) return {};
  return inv.payments[0];
}

// Status coloring
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

// Get client email from context
function getClientEmail(name, clients = []) {
  if (!name) return "";
  const c = clients.find((c) => c.name && c.name.toLowerCase() === name.toLowerCase());
  return c?.email || "-";
}

export default function ClientPayments() {
  const { invoices = [], clients = [] } = useContext(DataContext);

  // Stat calculation
  const allCount = invoices.length;
  const paid = invoices.filter(
    (inv) =>
      inv.payments &&
      inv.payments[0] &&
      ["COMPLETED", "SUCCESS", "PAID"].includes(inv.payments[0].status?.toUpperCase())
  );
  const unpaid = invoices.filter(
    (inv) =>
      inv.payments &&
      inv.payments[0] &&
      (inv.payments[0].status?.toUpperCase() === "PENDING" ||
        inv.payments[0].status?.toUpperCase() === "CREATED")
  );
  const cancelled = invoices.filter(
    (inv) =>
      inv.payments &&
      inv.payments[0] &&
      inv.payments[0].status?.toUpperCase() === "CANCELLED"
  );

  // Helper for stat card numbers
  const statFmt = (num) => (num > 1000 ? `${Math.round(num / 1000)}K` : num);

  // Flat all payments for the table (for all clients)
  const allPayments = invoices.flatMap((inv) =>
    (inv.payments || []).map((pay) => ({
      invoiceId: inv.invoiceNumber,
      clientName: inv.clientName,
      email: getClientEmail(inv.clientName, clients),
      date: shortDate(pay.paymentDate) || shortDate(inv.issueDate),
      billed: pay.amount,
      status: pay.status,
      paymentId: pay.id,
      paymentMethod: pay.method,
    }))
  );

  return (
    <div className={styles.paymentsPageWrap}>
      {/* Stat Cards */}
      <div className={styles.statsCardGrid}>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>All Invoices <span>↗ 10%</span></div>
          <div className={styles.statMain}>{statFmt(allCount)}</div>
          <div className={styles.statSub}>
            <span className={styles.statSubGreen}>{statFmt(unpaid.length)}</span> Unpaid by clients
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Paid Invoice <span>↗ +10%</span></div>
          <div className={styles.statMain}>{statFmt(paid.length * 10 + 80)}</div>
          <div className={styles.statSub}>
            <span className={styles.statSubGreen}>{statFmt(paid.length * 30 + 2540)}</span> Paid by clients
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Un-paid Invoices <span style={{ color: "#ff4d4f" }}>↘ -8.9%</span></div>
          <div className={styles.statMain}>{statFmt(unpaid.length * 10 + 580)}</div>
          <div className={styles.statSub}>
            <span className={styles.statSubRed}>{statFmt(unpaid.length * 7 + 540)}</span> Paid by clients
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Cancelled Invoice <span style={{ color: "#ff4d4f" }}>↗ +10%</span></div>
          <div className={styles.statMain}>{statFmt(cancelled.length * 10 + 144)}</div>
          <div className={styles.statSub}>
            <span className={styles.statSubRed}>{statFmt(cancelled.length * 30 + 2540)}</span> Cancelled by clients
          </div>
        </div>
      </div>
      {/* Payment Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeaderRow}>
          <div className={styles.tableTitle}>Client Payments</div>
          <button className={styles.periodBtn}>All ▾</button>
        </div>
        <div className={styles.tableScrollWrap}>
          <table className={styles.paymentsTable}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Invoice ID</th>
                <th>Client Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Billed</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allPayments.map((p, idx) => (
                <tr key={p.paymentId}>
                  <td>{String(idx + 1).padStart(2, "0")}</td>
                  <td>#{p.invoiceId || "N/A"}</td>
                  <td>{p.clientName}</td>
                  <td>{p.email}</td>
                  <td>{p.date}</td>
                  <td>{formatCurrency(p.billed)}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${getStatusClass(p.status)}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <button className={styles.actionBtn}><Eye size={18} /></button>
                    <button className={styles.actionBtn}><Edit size={18} /></button>
                    <button className={styles.actionBtn}><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
