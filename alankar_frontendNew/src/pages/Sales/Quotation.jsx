// import React, { useState, useEffect } from "react";
// import { X, Plus, FileText, DollarSign, Percent } from "lucide-react";
// import styles from "./QuotationPopup.module.scss";
// import { useData } from "../../context/DataContext";
// import QuotationPreview from "./QuotationPreview.jsx";
// import EditQuotationPreview from "./EditQuotationPreview.jsx";
// import { getQuotationTotalV2 } from "./getQuotationTotal2.js";
// import PRINT_PRICES from "../../printprices";
// const GST_OPTIONS = [5, 12, 18];
// const QuotationPopup = ({ open, onClose, presale, onQuotationAdded }) => {
//   const { handleAddQuotation, handleUpdateQuotationStatus } = useData();
//   const quotations = presale?.quotations || [];
//   const [showForm, setShowForm] = useState(false);
//   const [previewQuotation, setPreviewQuotation] = useState(null);
//   const [editpreviewQuotation, setEditPreviewQuotation] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [statusUpdating, setStatusUpdating] = useState(""); // quotationNumber being updated
//   const [form, setForm] = useState({
//     details: "",
//     totalAmount: "",
//     sended: false,
//     isAccepted: false,
//     gstPercent: "",
//   });
//   // Prefill details when form opens
//   useEffect(() => {
//     if (showForm && presale) {
//       // Calculate total from material and requirements
//       const autoTotal = getQuotationTotalV2(
//         presale.material,
//         presale.requirements,
//         PRINT_PRICES,
//         presale.clientType,
//         presale.orderType || "Wide format printing"
//       );
//       setForm({
//         details:
//           presale.material +
//           (presale.requirements ? " + " + presale.requirements : ""),
//         totalAmount: autoTotal ? autoTotal.toString() : "",
//         gstPercent: "",
//         sended: false,
//         isAccepted: false,
//       });
//     }
//   }, [showForm, presale]);
//   //  useEffect(() => {
//   //   if (showForm && presale) {
//   //     const clientType = presale.clientType || "Cash";
//   //     const orderType = presale.orderType || "Wide format printing";
//   //     const printType = presale.printType || "Eco solvent";
//   //     const autoTotal = getQuotationTotal(
//   //       presale.requirements,
//   //       PRINT_PRICES,
//   //       clientType,
//   //       orderType,
//   //       printType
//   //     );
//   //     setForm({
//   //       details: presale.requirements || "",
//   //       totalAmount: autoTotal ? autoTotal.toString() : "",
//   //       gstPercent: "",
//   //       sended: false,
//   //       isAccepted: false,
//   //     });
//   //   }
//   // }, [showForm, presale]);
//   if (!open) return null;
//   const handleFormChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.details.trim() || !form.totalAmount) {
//       alert("Please enter all required details!");
//       return;
//     }
//     if (Number(form.totalAmount) <= 0) {
//       alert("Please enter a valid amount!");
//       return;
//     }
//     if (
//       presale.clientType === "Online" &&
//       (!form.gstPercent || !GST_OPTIONS.includes(Number(form.gstPercent)))
//     ) {
//       alert("Please select a valid GST percentage.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const result = await handleAddQuotation(presale.srNumber, {
//         details: form.details.trim(),
//         totalAmount: Number(form.totalAmount),
//         sended: form.sended,
//         isAccepted: form.isAccepted,
//         gST:
//           presale.clientType === "Online" ? Number(form.gstPercent) : undefined,
//       });
//       if (result.success) {
//         if (onQuotationAdded) onQuotationAdded();
//         setForm({
//           details: "",
//           totalAmount: "",
//           sended: false,
//           isAccepted: false,
//           gST: "",
//         });
//         setShowForm(false);
//         alert("Quotation added successfully!");
//       } else {
//         alert(result.error || "Could not add quotation");
//       }
//     } catch (error) {
//       alert("An error occurred while adding quotation");
//       console.error("Error adding quotation:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleCancel = () => {
//     setForm({
//       details: "",
//       totalAmount: "",
//       sended: false,
//       isAccepted: false,
//       gstPercent: "",
//     });
//     setShowForm(false);
//   };
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };
//   const getStatusBadge = (quotation) => {
//     if (quotation.isAccepted) {
//       return (
//         <span className={styles.statusBadge + " " + styles.accepted}>
//           Accepted
//         </span>
//       );
//     } else if (quotation.sended) {
//       return (
//         <span className={styles.statusBadge + " " + styles.sent}>Sent</span>
//       );
//     } else {
//       return (
//         <span className={styles.statusBadge + " " + styles.draft}>Draft</span>
//       );
//     }
//   };
//   // --- Status Update Handler ---
//   const handleStatusUpdate = async (quotation) => {
//     if (!quotation.quotationNumber) {
//       alert("Quotation Number not found!");
//       return;
//     }
//     setStatusUpdating(quotation.quotationNumber);
//     try {
//       const newStatus = !quotation.isAccepted;
//       const result = await handleUpdateQuotationStatus(
//         quotation.quotationNumber,
//         newStatus
//       );
//       if (result.success) {
//         if (onQuotationAdded) onQuotationAdded(); // refresh parent if needed
//       } else {
//         alert(result.error || "Could not update status");
//       }
//     } catch (error) {
//       alert("An error occurred while updating status");
//       console.error("Status update error:", error);
//     } finally {
//       setStatusUpdating("");
//     }
//   };
//   return (
//     <div
//       className={styles.modalBackdrop}
//       onClick={(e) => e.target === e.currentTarget && onClose()}
//     >
//       <div className={styles.modalBox}>
//         <div className={styles.modalHeader}>
//           <div className={styles.headerContent}>
//             <div className={styles.headerTitle}>
//               <FileText size={20} className={styles.headerIcon} />
//               <span>Quotations Management</span>
//             </div>
//             <div className={styles.headerSubtitle}>
//               <strong>{presale?.personName}</strong> (
//               {presale?.client?.clientName})
//               <div className={styles.requirements}>
//                 <span className={styles.requirementsLabel}>Requirements:</span>
//                 <span className={styles.requirementsText}>
//                   {presale?.requirements}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <button
//             className={styles.closeButton}
//             onClick={() => {
//               onClose();
//               handleCancel();
//             }}
//           >
//             <X size={20} />
//           </button>
//         </div>
//         <div className={styles.modalBody}>
//           {!showForm ? (
//             <>
//               <div className={styles.sectionHeader}>
//                 <h3 className={styles.sectionTitle}>Past Quotations</h3>
//                 <span className={styles.quotationCount}>
//                   {quotations.length}{" "}
//                   {quotations.length === 1 ? "quotation" : "quotations"}
//                 </span>
//               </div>
//               {!quotations || quotations.length === 0 ? (
//                 <div className={styles.emptyState}>
//                   <FileText size={48} className={styles.emptyIcon} />
//                   <h4>No quotations found</h4>
//                   <p>
//                     Start by creating your first quotation for this presale.
//                   </p>
//                 </div>
//               ) : (
//                 <div className={styles.tableContainer}>
//                   <table className={styles.quotationTable}>
//                     <thead>
//                       <tr>
//                         <th>S.No</th>
//                         <th>Quotation No</th>
//                         <th>Details</th>
//                         <th>Amount</th>
//                         <th>Status</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {quotations.map((quotation, index) => (
//                         <tr
//                           key={quotation.id || quotation.quotationId || index}
//                         >
//                           <td className={styles.serialNumber}>{index + 1}</td>
//                           <td className={styles.quotationNumber}>
//                             {quotation.quotationNumber ||
//                               `QT-${String(index + 1).padStart(3, "0")}`}
//                           </td>
//                           <td className={styles.details}>
//                             <div
//                               className={styles.detailsText}
//                               title={quotation.details}
//                             >
//                               {quotation.details}
//                             </div>
//                           </td>
//                           <td className={styles.amount}>
//                             {formatCurrency(quotation.totalAmount)}
//                           </td>
//                           <td className={styles.status}>
//                             {getStatusBadge(quotation)}
//                           </td>
//                           <td className={styles.action}>
//                             <button
//                               className={styles.statusBtn}
//                               onClick={() => handleStatusUpdate(quotation)}
//                               disabled={
//                                 statusUpdating === quotation.quotationNumber
//                               }
//                             >
//                               {statusUpdating === quotation.quotationNumber
//                                 ? "Updating..."
//                                 : quotation.isAccepted
//                                 ? "Mark as Not Accepted"
//                                 : "Mark as Accepted"}
//                             </button>
//                            <button
//                               type="button"
//                               className={styles.viewTemplateBtn}
//                               onClick={() => setEditPreviewQuotation(quotation)}
//                               title="View quotation template"
//                             >Edit Quotation</button>
//                             <button
//                               type="button"
//                               className={styles.viewTemplateBtn}
//                               onClick={() => setPreviewQuotation(quotation)}
//                               title="View quotation template"
//                             >
//                               View Template
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//               <div className={styles.addQuotationSection}>
//                 <button
//                   className={styles.addButton}
//                   onClick={() => setShowForm(true)}
//                 >
//                   <Plus size={16} />
//                   Add New Quotation
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className={styles.formContainer}>
//               <div className={styles.formHeader}>
//                 <h3 className={styles.formTitle}>
//                   <Plus size={20} className={styles.formIcon} />
//                   Create New Quotation
//                 </h3>
//                 <p className={styles.formSubtitle}>
//                   Fill in the details below to create a new quotation
//                 </p>
//               </div>
//               <form
//                 className={styles.quotationForm}
//                 onSubmit={handleFormSubmit}
//               >
//                 <div className={styles.formGroup}>
//                   <label className={styles.formLabel}>
//                     <FileText size={16} />
//                     Quotation Details
//                   </label>
//                   <textarea
//                     className={styles.detailsTextarea}
//                     name="details"
//                     value={form.details}
//                     disabled // You wanted details to be prefilled and read-only
//                     onChange={handleFormChange}
//                     placeholder="Enter detailed description of products/services..."
//                     rows={4}
//                     required
//                   />
//                   <span className={styles.fieldHint}>
//                     This field is pre-filled with requirements but you can
//                     modify it
//                   </span>
//                 </div>
//                 <div className={styles.formGroup}>
//                   <label className={styles.formLabel}>
//                     <DollarSign size={16} />
//                     Total Amount (₹)
//                   </label>
//                   <div className={styles.amountInputWrapper}>
//                     <span className={styles.currencySymbol}>₹</span>
//                     <input
//                       type="number"
//                       className={styles.amountInput}
//                       name="totalAmount"
//                       value={form.totalAmount}
//                       onChange={handleFormChange}
//                       placeholder="0.00"
//                       min="0"
//                       step="0.01"
//                       required
//                     />
//                   </div>
//                   {/* GST Only For ONLINE Client */}
//                   {presale.clientType === "Online" && (
//                     <div className={styles.gstGroup}>
//                       <label className={styles.gstLabel}>
//                         <Percent size={16} style={{ marginRight: 4 }} />
//                         GST Percentage
//                       </label>
//                       <select
//                         name="gstPercent"
//                         className={styles.gstSelect}
//                         value={form.gstPercent || ""}
//                         onChange={handleFormChange}
//                         required
//                       >
//                         <option value="">Select GST</option>
//                         {GST_OPTIONS.map((option) => (
//                           <option key={option} value={option}>
//                             {option}%
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   )}
//                   {/* Show auto-calculated GST and grand total */}
//                   {presale.clientType === "Online" && form.gstPercent && (
//                     <div className={styles.gstResult}>
//                       <span>
//                         GST ({form.gstPercent}%):{" "}
//                         <b>
//                           ₹
//                           {Math.round(
//                             (Number(form.totalAmount || 0) *
//                               Number(form.gstPercent)) /
//                               100
//                           ).toLocaleString()}
//                         </b>
//                       </span>
//                       <span>
//                         <b>
//                           Total (incl. GST): ₹
//                           {Math.round(
//                             Number(form.totalAmount || 0) +
//                               (Number(form.totalAmount || 0) *
//                                 Number(form.gstPercent)) /
//                                 100
//                           ).toLocaleString()}
//                         </b>
//                       </span>
//                     </div>
//                   )}
//                 </div>
//                 <div className={styles.formActions}>
//                   <button
//                     type="button"
//                     className={styles.cancelBtn}
//                     onClick={handleCancel}
//                     disabled={loading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className={styles.submitBtn}
//                     disabled={loading}
//                   >
//                     {loading ? "Saving..." : "Save Quotation"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}
//         </div>
//       </div>
//       {/* Quotation Preview Modal */}
//       {previewQuotation && (
//         <QuotationPreview
//           quotation={previewQuotation}
//           presale={presale}
//           onClose={() => setPreviewQuotation(null)}
//         />
//       )}
//       {editpreviewQuotation && (
//         <EditQuotationPreview
//           quotation={previewQuotation}
//           presale={presale}
//           onClose={() => setEditPreviewQuotation(null)}
//         />
//       )}
//     </div>
//   );
// };
// export default QuotationPopup;
import React, { useState, useEffect } from "react";
import { X, Plus, FileText, Percent } from "lucide-react";
import styles from "./QuotationPopup.module.scss";
import { useData } from "../../context/DataContext";
import QuotationPreview from "./QuotationPreview.jsx";
import EditQuotationPreview from "./EditQuotationPreview.jsx";
import PRINT_PRICES from "../../printprices";
// Utility: Get unit price from printprices
function getAutoUnitPrice({ material, requirements, printPrices, clientType, orderType = "Wide format printing" }) {
  let printType = "";
  let media = "";
  if (typeof material === "string" && material.includes("+")) {
    [printType, media] = material.split("+").map(s => s.trim());
  }
  let unitPrice = 0;
  // Material (Media)
  if (printType && media) {
    const ptObj = printPrices.clientTypes?.[clientType]?.orderTypes?.[orderType]?.printTypes?.[printType];
    const mediaArr = ptObj?.Media || [];
    const mediaObj = mediaArr.find(item => item.name?.toLowerCase() === media.toLowerCase());
    if (mediaObj && mediaObj.cost) {
      unitPrice += Number(mediaObj.cost);
    }
  }
  // Requirements
  if (requirements) {
    requirements.split("+").map(s => s.trim()).forEach(groupStr => {
      if (!groupStr) return;
      const [groupRaw, valueRaw] = groupStr.split(":").map(s => s.trim());
      if (!groupRaw || !valueRaw) return;
      const group = groupRaw.charAt(0).toUpperCase() + groupRaw.slice(1).toLowerCase();
      const value = valueRaw;
      if (printType && group && value) {
        const ptObj = printPrices.clientTypes?.[clientType]?.orderTypes?.[orderType]?.printTypes?.[printType];
        const groupArr = ptObj?.[group] || [];
        const valObj = groupArr.find(item => item.name?.toLowerCase() === value.toLowerCase());
        if (valObj && valObj.cost) {
          unitPrice += Number(valObj.cost);
        }
      }
    });
  }
  return unitPrice || 1;
}
const GST_OPTIONS = [5, 12, 18];
const QuotationPopup = ({ open, onClose, presale, onQuotationAdded }) => {
  const { handleAddQuotation, handleUpdateQuotationStatus } = useData();
  const quotations = presale?.quotations || [];
  const [showForm, setShowForm] = useState(false);
  const [previewQuotation, setPreviewQuotation] = useState(null);
  const [editPreviewQuotation, setEditPreviewQuotation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState("");
  // Editable states
  const details = (presale?.material || "") + (presale?.requirements ? " + " + presale.requirements : "");
  const defaultUnitPrice = getAutoUnitPrice({
    material: presale?.material,
    requirements: presale?.requirements,
    printPrices: PRINT_PRICES,
    clientType: presale?.clientType || "Cash",
    orderType: presale?.printType || "Wide format printing",
  });
  const defaultQty = presale?.qty || 1;
  // All editable fields in state
  const [unitPrice, setUnitPrice] = useState(defaultUnitPrice);
  const [qty, setQty] = useState(defaultQty);
  const [gstPercent, setGstPercent] = useState("");
  // Calculated fields
  const totalAmount = Number(unitPrice) * Number(qty);
  const gstAmount = presale?.clientType === "Online" && gstPercent
    ? (totalAmount * Number(gstPercent)) / 100
    : 0;
  const totalAmountWithGST = totalAmount + gstAmount;
  // Reset on open
  useEffect(() => {
    if (showForm) {
      setUnitPrice(defaultUnitPrice);
      setQty(defaultQty);
      setGstPercent("");
    }
  // eslint-disable-next-line
  }, [showForm, presale]);
  if (!open) return null;
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!details.trim()) {
      alert("Details missing!");
      return;
    }
    if (unitPrice <= 0 || qty <= 0) {
      alert("Unit price or quantity invalid!");
      return;
    }
    if (
      presale.clientType === "Online" &&
      (!gstPercent || !GST_OPTIONS.includes(Number(gstPercent)))
    ) {
      alert("Please select a valid GST percentage.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        details: details.trim(),
        unitPrice: Number(unitPrice),
        qty: Number(qty),
        totalAmount,
        totalAmountWithGST,
        gST: presale.clientType === "Online" ? Number(gstPercent) : undefined,
        sended: false,
        isAccepted: false,
      };
      console.log("Adding quotation with payload:", payload);
      const result = await handleAddQuotation(presale.srNumber, payload);
      if (result.success) {
        if (onQuotationAdded) onQuotationAdded();
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
    setShowForm(false);
  };
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  const getStatusBadge = (quotation) => {
    if (quotation.isAccepted) {
      return (
        <span className={styles.statusBadge + " " + styles.accepted}>
          Accepted
        </span>
      );
    } else if (quotation.sended) {
      return (
        <span className={styles.statusBadge + " " + styles.sent}>Sent</span>
      );
    } else {
      return (
        <span className={styles.statusBadge + " " + styles.draft}>Draft</span>
      );
    }
  };
  const handleStatusUpdate = async (quotation) => {
    if (!quotation.quotationNumber) {
      alert("Quotation Number not found!");
      return;
    }
    setStatusUpdating(quotation.quotationNumber);
    try {
      const newStatus = !quotation.accepted; // <<== must use "accepted"
      const result = await handleUpdateQuotationStatus(
        quotation.quotationNumber,
        newStatus
      );
      if (result.success) {
        if (onQuotationAdded) onQuotationAdded();
      } else {
        alert(result.error || "Could not update status");
      }
    } catch (error) {
      alert("An error occurred while updating status");
      console.error("Status update error:", error);
    } finally {
      setStatusUpdating("");
    }
  };
  return (
    <div
      className={styles.modalBackdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
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
                <span className={styles.requirementsText}>
                  {presale?.requirements}
                </span>
              </div>
            </div>
          </div>
          <button
            className={styles.closeButton}
            onClick={() => {
              onClose();
              handleCancel();
            }}
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
                  {quotations.length}{" "}
                  {quotations.length === 1 ? "quotation" : "quotations"}
                </span>
              </div>
              {!quotations || quotations.length === 0 ? (
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
                        <th>Unit Price</th>
                        <th>Qty</th>
                        <th>Amount</th>
                        <th>Amount With GST</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotations.map((quotation, index) => (
                        <tr
                          key={quotation.id || quotation.quotationId || index}
                        >
                          <td className={styles.serialNumber}>{index + 1}</td>
                          <td className={styles.quotationNumber}>
                            {quotation.quotationNumber ||
                              `QT-${String(index + 1).padStart(3, "0")}`}
                          </td>
                          <td className={styles.details}>
                            <div
                              className={styles.detailsText}
                              title={quotation.details}
                            >
                              {quotation.details}
                            </div>
                          </td>
                          <td className={styles.unitPrice}>
                            {formatCurrency(quotation.unitPrice)}
                          </td>
                          <td className={styles.qty}>
                            {quotation.qty}
                          </td>
                          <td className={styles.amount}>
                            {formatCurrency(quotation.totalAmount)}
                          </td>
                          <td className={styles.amountWithGST}>
                            {formatCurrency(quotation.totalAmountWithGST)}
                          </td>
                          <td className={styles.status}>
                            {getStatusBadge(quotation)}
                          </td>
                          <td className={styles.action}>
                            <button
                              className={styles.statusBtn}
                              onClick={() => handleStatusUpdate(quotation)}
                              disabled={statusUpdating === quotation.quotationNumber}
                            >
                              {statusUpdating === quotation.quotationNumber
                                ? "Updating..."
                                : quotation.accepted === true
                                ? "Mark as Unaccepted"
                                : "Mark as Accepted"}
                            </button>
                            <button
                              type="button"
                              className={styles.viewTemplateBtn}
                              onClick={() => setEditPreviewQuotation(quotation)}
                              title="Edit quotation"
                            >Edit Quotation</button>
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
                <p className={styles.formSubtitle}>
                  Fill in the details below to create a new quotation
                </p>
              </div>
              <form
                className={styles.quotationForm}
                onSubmit={handleFormSubmit}
              >
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <FileText size={16} />
                    Quotation Details
                  </label>
                  <textarea
                    className={styles.detailsTextarea}
                    name="details"
                    value={details}
                    readOnly
                    rows={3}
                  />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Unit Price (₹)
                    </label>
                    <input
                      type="number"
                      className={styles.amountInput}
                      name="unitPrice"
                      value={unitPrice}
                      min={0}
                      onChange={e => setUnitPrice(e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Quantity
                    </label>
                    <input
                      type="number"
                      className={styles.amountInput}
                      name="qty"
                      value={qty}
                      min={1}
                      onChange={e => setQty(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Amount
                    </label>
                    <input
                      type="number"
                      className={styles.amountInput}
                      name="totalAmount"
                      value={totalAmount}
                      readOnly
                    />
                  </div>
                  {presale.clientType === "Online" && (
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        <Percent size={16} style={{ marginRight: 4 }} />
                        GST Percentage
                      </label>
                      <select
                        name="gstPercent"
                        className={styles.gstSelect}
                        value={gstPercent}
                        onChange={e => setGstPercent(e.target.value)}
                        required
                      >
                        <option value="">Select GST</option>
                        {GST_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}%
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                {presale.clientType === "Online" && gstPercent && (
                  <div className={styles.gstResult}>
                    <span>
                      GST ({gstPercent}%):{" "}
                      <b>
                        ₹
                        {Math.round(
                          (Number(totalAmount) * Number(gstPercent)) / 100
                        ).toLocaleString()}
                      </b>
                    </span>
                    <span>
                      <b>
                        Total (incl. GST): ₹
                        {Math.round(totalAmountWithGST).toLocaleString()}
                      </b>
                    </span>
                  </div>
                )}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Amount With GST
                    </label>
                    <input
                      type="number"
                      className={styles.amountInput}
                      name="totalAmountWithGST"
                      value={totalAmountWithGST}
                      readOnly
                    />
                  </div>
                </div>
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
      {editPreviewQuotation && (
        <EditQuotationPreview
          quotation={editPreviewQuotation}
          presale={presale}
          onClose={() => setEditPreviewQuotation(null)}
        />
      )}
    </div>
  );
};
export default QuotationPopup;
