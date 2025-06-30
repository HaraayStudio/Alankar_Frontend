import React, { useState } from "react";
import styles from "./InvoiceList.module.scss";
import InvoicePreview from "./InvoicePreview.jsx";
import { X, Eye } from "lucide-react";
import { useData } from "../../context/DataContext";

const InvoiceListPopup = ({ open, postsale, onClose, onInvoiceAdded }) => {
  const [previewInvoice, setPreviewInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const { handleAddInvoice } = useData();

  // Normalize invoice(s) to an array
  let invoicesRaw = postsale?.invoices || postsale?.invoice || [];
  let invoices = [];
  if (Array.isArray(invoicesRaw)) {
    invoices = invoicesRaw;
  } else if (invoicesRaw && typeof invoicesRaw === "object") {
    invoices = [invoicesRaw];
  }

  // Format date as DD/MM/YYYY
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-GB") : "-";

  // Handler to create a new invoice
  const handleCreateInvoice = async () => {
    setLoading(true);
    try {
      const postSaleSrNumber = postsale.srNumber;
      // Call context function: only srNumber needed
      const result = await handleAddInvoice(postSaleSrNumber);

      // Redux-thunk returns the action, so check type
      if (result && result.type && result.type.endsWith("/fulfilled")) {
        alert("Invoice created successfully!");
        if (onInvoiceAdded) onInvoiceAdded();
      } else {
        alert("Failed to create invoice");
      }
    } catch (error) {
      alert("Error creating invoice");
      console.error("Add invoice error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className={styles.modalBackdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.invoiceModalBox}>
        <div className={styles.invoiceModalHeader}>
          <span>
            Invoices List - {postsale.client?.clientName || "No Client"}
          </span>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
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
                  <th>Client</th>
                  <th>Amount (No GST)</th>
                  <th>GST %</th>
                  <th>Total (With GST)</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, idx) => (
                  <tr key={inv.invoiceNumber || idx}>
                    <td>{inv.invoiceNumber || `INV-${idx + 1}`}</td>
                    <td>
                      {inv.issueDate
                        ? formatDate(inv.issueDate)
                        : "-"}
                    </td>
                    <td>{inv.clientName || "-"}</td>
                    <td>
                      ₹
                      {typeof inv.totalAmount === "number"
                        ? inv.totalAmount.toLocaleString()
                        : "-"}
                    </td>
                    <td>{inv.gST ?? "-"}</td>
                    <td>
                      ₹
                      {typeof inv.totalAmountWithGST === "number"
                        ? inv.totalAmountWithGST.toLocaleString()
                        : "-"}
                    </td>
                    <td>
                      <button
                        className={styles.viewBtn}
                        onClick={() => setPreviewInvoice(inv)}
                        title="View Invoice"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <button
          className={styles.createInvoiceBtn}
          onClick={handleCreateInvoice}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Invoice"}
        </button>
        {/* Invoice Preview Modal */}
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
