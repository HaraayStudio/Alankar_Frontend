import React, { useContext, useState } from "react";
import styles from "./QuotationList.module.scss";
import { DataContext } from "../../context/DataContext";
import { Eye } from "lucide-react";
import QuotationPreview from "../Sales/QuotationPreview"; // Modal component

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);

const shortDate = (str) =>
  str
    ? new Date(str).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

function getStatusBadge(quotation) {
  if (!quotation) return null;
  if (quotation.accepted) {
    return <span className={styles.statusBadge + " " + styles.accepted}>Accepted</span>;
  } else if (quotation.sended) {
    return <span className={styles.statusBadge + " " + styles.sent}>Sent</span>;
  } else {
    return <span className={styles.statusBadge + " " + styles.draft}>Draft</span>;
  }
}

export default function QuotationList() {
  const { presales = [] } = useContext(DataContext);
  const [previewQuotation, setPreviewQuotation] = useState(null);
  const [previewPresale, setPreviewPresale] = useState(null);

  // Flat list of presales with their latest quotation (if any)
  const rows = presales
    .map((ps) => ({
      srNumber: ps.srNumber,
      clientName: ps.client?.clientName || "",
      clientEmail: ps.client?.email || "",
      personName: ps.personName || "",
      printType: ps.printType,
      material: ps.material,
      requirements: ps.requirements,
      qty: ps.qty,
      status: ps.status,
      quotation: ps.quotations?.length ? ps.quotations[ps.quotations.length - 1] : null,
      presale: ps,
    }))
    .filter((row) => row.quotation); // Only those with at least one quotation

  return (
    <div className={styles.quotationListWrap}>
      <div className={styles.tableCard}>
        <div className={styles.tableHeaderRow}>
          <div className={styles.tableTitle}>Quotations</div>
        </div>
        <div className={styles.tableScrollWrap}>
          <table className={styles.quotationTable}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Quotation No</th>
                <th>Date</th>
                <th>Client</th>
                <th>Person</th>
                <th>Material</th>
                <th>Requirements</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>GST</th>
                <th>Total With GST</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.srNumber}>
                  <td>{String(idx + 1).padStart(2, "0")}</td>
                  <td>{row.quotation.quotationNumber}</td>
                  <td>{shortDate(row.quotation.dateTimeIssued)}</td>
                  <td>{row.clientName}</td>
                  <td>{row.personName}</td>
                  <td>{row.material}</td>
                  <td>
                    <div className={styles.ellipsis} title={row.requirements}>
                      {row.requirements}
                    </div>
                  </td>
                  <td>{row.quotation.qty}</td>
                  <td>{formatCurrency(row.quotation.totalAmount)}</td>
                  <td>{row.quotation.gST ? `${row.quotation.gST}%` : "-"}</td>
                  <td>{formatCurrency(row.quotation.totalAmountWithGST)}</td>
                  <td>{getStatusBadge(row.quotation)}</td>
                  <td>
                    <button
                      className={styles.actionBtn}
                      title="View"
                      onClick={() => {
                        setPreviewQuotation(row.quotation);
                        setPreviewPresale(row.presale);
                      }}
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={13}>
                    <div className={styles.emptyText}>No quotations found.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quotation Preview Modal */}
      {previewQuotation && (
        <QuotationPreview
          quotation={previewQuotation}
          presale={previewPresale}
          onClose={() => setPreviewQuotation(null)}
        />
      )}
    </div>
  );
}
