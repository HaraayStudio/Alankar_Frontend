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
  // Format date as YYYY-MM-DD
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-GB") : "-";
  // Handler to create a new invoice (with fields matching your backend)
  const handleCreateInvoice = async () => {
    setLoading(true);
    try {
      const payload = {
        postSales: { srNumber: postsale.srNumber },
        clientName: postsale.client?.clientName || "",
        clientAddress:
          postsale.client?.address ||
          `${postsale.client?.email ?? ""} ${postsale.client?.phone ?? ""}`,
        details: postsale.order?.description ?? "",
        qty: postsale?.qty ,
        unitPrice: postsale.unitPrice ?? 0,
        totalAmount: postsale.finalAmtWithOutGST ?? 0,
        totalAmountWithGST: postsale.totalAmtWithGST ?? 0,
        gST: postsale.gstPercentage ?? 18,
        issueDate: new Date().toISOString().slice(0, 10),
        validTill: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // +1 month
          .toISOString()
          .slice(0, 10),
      };
      console.log("Creating invoice with payload:", payload);
      const result = await handleAddInvoice(payload);
      if (result.success) {
        alert("Invoice created successfully!");
        if (onInvoiceAdded) onInvoiceAdded();
      } else {
        alert(result.error || "Failed to create invoice");
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
