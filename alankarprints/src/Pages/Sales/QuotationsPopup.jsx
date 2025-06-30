import React, { useState } from "react";
import styles from "./QuotationsPopup.module.scss";
import { X, Plus, FileText } from "lucide-react";
import { useData } from "../../context/DataContext";
import QuotationPreview from "./QuotationPreview.jsx"; // (your preview component)
import { format } from "date-fns"; // install date-fns if not present

const QuotationsPopup = ({ open, presale, onClose }) => {
  if (!open || !presale) return null;
  const { handleAddQuotation, handleUpdateQuotationStatus } = useData();

  const quotations = presale.quotations || [];
  const [loading, setLoading] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState("");
  const [previewQuotation, setPreviewQuotation] = useState(null);

  // New: Direct Add Quotation (no form)
  const handleCreateQuotation = async () => {
    setLoading(true);
    try {
      await handleAddQuotation(presale.srNumber); // You might need to pass presale or order details as per your API
    } catch (err) {
      alert("Could not create quotation.");
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (quotation) => {
    setStatusUpdating(quotation.quotationNumber);
    try {
      await handleUpdateQuotationStatus(quotation.quotationNumber, !quotation.accepted);
    } catch (error) {
      alert("Could not update status");
    } finally {
      setStatusUpdating("");
    }
  };

  const formatCurrency = (amt) =>
    `₹${Number(amt || 0).toLocaleString("en-IN", { minimumFractionDigits: 0 })}`;

  // Table Columns: No, Date, Orders (Order Type + Steps), Unit Price, Qty, GST, Amount, Amount (With GST), Status, Actions
  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.popup}>
        <button className={styles.closeBtn} onClick={onClose}><X size={24} /></button>
        <div className={styles.header}>
          <FileText size={22} className={styles.headerIcon} />
          <div>
            <div className={styles.headerTitle}>
              Quotations - <b>{presale.personName}</b> ({presale.client?.clientName})
            </div>
            <div className={styles.headerSub}>Type: <b>{presale.clientType}</b></div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.quotationsHeader}>
            <span>Quotations</span>
            <button className={styles.addBtn} onClick={handleCreateQuotation} disabled={loading}>
              <Plus size={16} /> {loading ? "Creating..." : "Create Quotation"}
            </button>
          </div>
          {quotations.length === 0 ? (
            <div className={styles.emptyState}>
              <FileText size={38} className={styles.emptyIcon} />
              <div>No quotations found.</div>
            </div>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>No</th>
                    <th>Date</th>
                    <th>Orders</th>
                    <th>Unit Price</th>
                    <th>Qty</th>
                    <th>GST (%)</th>
                    <th>Total</th>
                    <th>Total (GST)</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {quotations.map((q, idx) => {
                    // Sum orders for main row
                    const totalUnitPrice = q.quotationOrders.reduce((acc, o) => acc + Number(o.unitPrice || 0), 0);
                    const totalQty = q.quotationOrders.reduce((acc, o) => acc + Number(o.qty || 0), 0);
                    const gst = q.quotationOrders[0]?.gst || 0;
                    const totalAmount = q.quotationOrders.reduce((acc, o) => acc + Number(o.totalAmount || 0), 0);
                    const totalAmountWithGST = q.quotationOrders.reduce((acc, o) => acc + Number(o.totalAmountWithGST || 0), 0);

                    return (
                      <tr key={q.quotationNumber || idx}>
                        <td>{idx + 1}</td>
                        <td>{q.quotationNumber}</td>
                        <td>
                          {q.dateTimeIssued
                            ? format(new Date(q.dateTimeIssued), "dd-MM-yyyy")
                            : "-"}
                        </td>
                      <td>
  {q.quotationOrders.length}
</td>

                        <td>
                          {q.quotationOrders.map(order => (
                            <div key={order.id}>{formatCurrency(order.unitPrice)}</div>
                          ))}
                        </td>
                        <td>
                          {q.quotationOrders.map(order => (
                            <div key={order.id}>{order.qty}</div>
                          ))}
                        </td>
                        <td>{gst}%</td>
                        <td>
                          {q.quotationOrders.map(order => (
                            <div key={order.id}>{formatCurrency(order.totalAmount)}</div>
                          ))}
                        </td>
                        <td>
                          {q.quotationOrders.map(order => (
                            <div key={order.id}>{formatCurrency(order.totalAmountWithGST)}</div>
                          ))}
                        </td>
                        <td>
                          <span className={q.accepted ? styles.accepted : styles.notAccepted}>
                            {q.accepted ? "Accepted" : "Not Accepted"}
                          </span>
                        </td>
                        <td style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <button
                            className={`${styles.statusBtn} ${q.accepted ? styles.accepted : ""}`}
                            onClick={() => handleStatusUpdate(q)}
                            disabled={statusUpdating === q.quotationNumber}
                          >
                            {statusUpdating === q.quotationNumber
                              ? "Updating..."
                              : q.accepted
                              ? "Mark Unaccepted"
                              : "Mark Accepted"}
                          </button>
                          <button
                            type="button"
                            className={styles.viewTemplateBtn}
                            onClick={() => setPreviewQuotation(q)}
                            title="View quotation template"
                          >
                            View Template
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {/* Quotation Preview Modal */}
         {previewQuotation && (
  <QuotationPreview
    quotation={previewQuotation}
    presale={presale}
    onClose={() => setPreviewQuotation(null)}
  />
)}

        </div>
      </div>
    </div>
  );
};

export default QuotationsPopup;
