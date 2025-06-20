import React, { useState } from "react";
import styles from "./PostSalesPage.module.scss";
import InvoicePreview from "./InvoicePreview.jsx";
import { X, Eye } from "lucide-react";
// MOCK: Replace with API data if available.
const mockInvoices = (postsale) => [
  {
    invoiceNumber: "INV-2024-001",
    date: postsale.order?.startDateTime,
    amount: postsale.finalAmtWithOutGST,
    gst: postsale.gstPercentage,
    total: postsale.totalAmtWithGST,
    items: [{
      description: postsale.order?.description,
      qty: postsale.order?.quantity || 1,
      rate: postsale.finalAmtWithOutGST,
      amount: postsale.finalAmtWithOutGST
    }]
  }
];
const InvoiceListPopup = ({ open, postsale, onClose }) => {
  const [previewInvoice, setPreviewInvoice] = useState(null);
  const invoices = mockInvoices(postsale);
  if (!open) return null;
  return (
    <div className={styles.modalBackdrop} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.invoiceModalBox}>
        <div className={styles.invoiceModalHeader}>
          <span>Invoices List - {postsale.client?.clientName}</span>
          <button className={styles.closeButton} onClick={onClose}><X size={20} /></button>
        </div>
        <div className={styles.invoiceModalBody}>
          {invoices.length === 0 ? (
            <div className={styles.noData}>No Invoices found.</div>
          ) : (
            <table className={styles.invoiceTable}>
              <thead>
                <tr>
                  <th>Invoice No.</th>
                  <th>Date</th>
                  <th>Amount (No GST)</th>
                  <th>GST %</th>
                  <th>Total (With GST)</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, idx) => (
                  <tr key={idx}>
                    <td>{inv.invoiceNumber}</td>
                    <td>{inv.date ? new Date(inv.date).toLocaleDateString("en-GB") : "-"}</td>
                    <td>₹{inv.amount?.toLocaleString()}</td>
                    <td>{inv.gst}%</td>
                    <td>₹{inv.total?.toLocaleString()}</td>
                    <td>
                      <button className={styles.iconBtn} onClick={() => setPreviewInvoice(postsale)}>
                        <Eye size={16} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {previewInvoice && (
          <InvoicePreview
            invoice={previewInvoice}
            postsale={postsale}
            onClose={() => setPreviewInvoice(null)}
          />
        )}
      </div>
    </div>
  );
};
export default InvoiceListPopup;
