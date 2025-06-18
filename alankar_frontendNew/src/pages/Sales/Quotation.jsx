import React, { useState, useEffect } from "react";
import { X, Plus, FileText, Calendar, DollarSign ,Percent } from "lucide-react";
import styles from "./QuotationPopup.module.scss";
import { useData } from "../../context/DataContext";
import QuotationPreview from "./QuotationPreview.jsx";
const GST_OPTIONS = [5, 12, 18];
const QuotationPopup = ({
  open,
  onClose,
  presale,
  onQuotationAdded
}) => {
  const { handleAddQuotation } = useData();
  const quotations = presale?.quotations || [];
  const [showForm, setShowForm] = useState(false);
  const [previewQuotation, setPreviewQuotation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    details: "",
    totalAmount: "",
    sended: false,
    isAccepted: false,
    gstPercent: "",
  });
  // Prefill details when form opens
  useEffect(() => {
    if (showForm && presale) {
      setForm(prevForm => ({
        ...prevForm,
        details: presale.requirements || "",
        totalAmount: "",  gstPercent: "",
        sended: false,
        isAccepted: false,
      }));
    }
  }, [showForm, presale]);
  if (!open) return null;
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.details.trim() || !form.totalAmount) {
      alert("Please enter all required details!");
      return;
    }
    if (Number(form.totalAmount) <= 0) {
      alert("Please enter a valid amount!");
      return;
    }
    setLoading(true);
    try {
      const result = await handleAddQuotation(presale.srNumber, {
        details: form.details.trim(),
        totalAmount: Number(form.totalAmount),
        sended: form.sended,
        isAccepted: form.isAccepted,
      });
      if (result.success) {
        if (onQuotationAdded) onQuotationAdded();
        setForm({ details: "", totalAmount: "", sended: false, isAccepted: false });
        setShowForm(false);
        alert("Quotation added successfully!");
      } else {
        alert(result.error || "Could not add quotation");
      }
    } catch (error) {
      alert("An error occurred while adding quotation");
      console.error("Error adding quotation:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setForm({ details: "", totalAmount: "", sended: false, isAccepted: false });
    setShowForm(false);
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };
  const getStatusBadge = (quotation) => {
    if (quotation.isAccepted) {
      return <span className={styles.statusBadge + ' ' + styles.accepted}>Accepted</span>;
    } else if (quotation.sended) {
      return <span className={styles.statusBadge + ' ' + styles.sent}>Sent</span>;
    } else {
      return <span className={styles.statusBadge + ' ' + styles.draft}>Draft</span>;
    }
  };
  return (
    <div className={styles.modalBackdrop} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modalBox}>
        <div className={styles.modalHeader}>
          <div className={styles.headerContent}>
            <div className={styles.headerTitle}>
              <FileText size={20} className={styles.headerIcon} />
              <span>Quotations Management</span>
            </div>
            <div className={styles.headerSubtitle}>
              <strong>{presale?.personName}</strong> ({presale?.client?.clientName})
              <div className={styles.requirements}>
                <span className={styles.requirementsLabel}>Requirements:</span>
                <span className={styles.requirementsText}>{presale?.requirements}</span>
              </div>
            </div>
          </div>
          <button className={styles.closeButton} onClick={() => { onClose(); handleCancel(); } } 
>
            <X size={20} />
          </button>
        </div>
        <div className={styles.modalBody}>
          {!showForm ? (
            <>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Past Quotations</h3>
                <span className={styles.quotationCount}>
                  {quotations.length} {quotations.length === 1 ? 'quotation' : 'quotations'}
                </span>
              </div>
              {(!quotations || quotations.length === 0) ? (
                <div className={styles.emptyState}>
                  <FileText size={48} className={styles.emptyIcon} />
                  <h4>No quotations found</h4>
                  <p>Start by creating your first quotation for this presale.</p>
                </div>
              ) : (
                <div className={styles.tableContainer}>
                  <table className={styles.quotationTable}>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Quotation No</th>
                        <th>Details</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotations.map((quotation, index) => (
                        <tr key={quotation.id || quotation.quotationId || index}>
                          <td className={styles.serialNumber}>{index + 1}</td>
                          <td className={styles.quotationNumber}>
                            {quotation.quotationNumber || `QT-${String(index + 1).padStart(3, '0')}`}
                          </td>
                          <td className={styles.details}>
                            <div className={styles.detailsText} title={quotation.details}>
                              {quotation.details}
                            </div>
                          </td>
                          <td className={styles.amount}>
                            {formatCurrency(quotation.totalAmount)}
                          </td>
                          <td className={styles.status}>
                            {getStatusBadge(quotation)}
                          </td>
                          <td className={styles.action}>
                            <button
                              type="button"
                              className={styles.viewTemplateBtn}
                              onClick={() => setPreviewQuotation(quotation)}
                              title="View quotation template"
                            >
                              View Template
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className={styles.addQuotationSection}>
                <button 
                  className={styles.addButton} 
                  onClick={() => setShowForm(true)}
                >
                  <Plus size={16} />
                  Add New Quotation
                </button>
              </div>
            </>
          ) : (
            <div className={styles.formContainer}>
              <div className={styles.formHeader}>
                <h3 className={styles.formTitle}>
                  <Plus size={20} className={styles.formIcon} />
                  Create New Quotation
                </h3>
                <p className={styles.formSubtitle}>Fill in the details below to create a new quotation</p>
              </div>
              <form className={styles.quotationForm} onSubmit={handleFormSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <FileText size={16} />
                    Quotation Details
                  </label>
                  <textarea disabled
                    className={styles.detailsTextarea}
                    name="details"
                    value={form.details}
                    onChange={handleFormChange}
                    placeholder="Enter detailed description of products/services..."
                    rows={4}
                    required
                  />
                  <span className={styles.fieldHint}>
                    This field is pre-filled with requirements but you can modify it
                  </span>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <DollarSign size={16} />
                    Total Amount (₹)
                  </label>
                  <div className={styles.amountInputWrapper}>
                    <span className={styles.currencySymbol}>₹</span>
                    <input
                      type="number"
                      className={styles.amountInput}
                      name="totalAmount"
                      value={form.totalAmount}
                      onChange={handleFormChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
          {console.log( presale, "Client Type")
          }
                   {/* GST Only For ONLINE Client */}
      {presale.clientType === "Online" && (
        <div className={styles.gstGroup}>
          <label className={styles.gstLabel}>
            <Percent size={16} style={{ marginRight: 4 }} />
            GST Percentage
          </label>
          <select
            name="gstPercent"
            className={styles.gstSelect}
            value={form.gstPercent || ""}
            onChange={handleFormChange}
            required
          >
            <option value="">Select GST</option>
            {GST_OPTIONS.map(option => (
              <option key={option} value={option}>{option}%</option>
            ))}
          </select>
        </div>
      )}
                </div>
                {/* <div className={styles.checkboxGroup}>
                  <div className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      id="sended"
                      name="sended"
                      checked={form.sended}
                      onChange={handleFormChange}
                      className={styles.checkbox}
                    />
                    <label htmlFor="sended" className={styles.checkboxLabel}>
                      Mark as sent to client
                    </label>
                  </div>
                  <div className={styles.checkboxItem}>
                    <input 
                      type="checkbox"
                      id="isAccepted"
                      name="isAccepted"
                      checked={form.isAccepted}
                      onChange={handleFormChange}
                      className={styles.checkbox}
                    />
                    <label htmlFor="isAccepted" className={styles.checkboxLabel}>
                      Mark as accepted by client
                    </label>
                  </div>
                </div> */}
                <div className={styles.formActions}>
                  <button 
                    type="button" 
                    className={styles.cancelBtn} 
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Quotation"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      {/* Quotation Preview Modal */}
      {previewQuotation && (
        <QuotationPreview
          quotation={previewQuotation}
          presale={presale}
          onClose={() => setPreviewQuotation(null)}
        />
      )}
    </div>
  );
};
export default QuotationPopup;