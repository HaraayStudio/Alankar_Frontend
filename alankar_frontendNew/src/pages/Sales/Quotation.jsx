// import React, { useState } from "react";
// import { X, Plus } from "lucide-react";
// import styles from "./PreSalesPage.module.scss";
// import { useData } from "../../context/DataContext";
// // open, onClose, presale, onQuotationAdded (callback)
// const QuotationPopup = ({
//   open,
//   onClose,
//   presale,
//   onQuotationAdded
// }) => {
//   const { handleAddQuotation } = useData();
//   const quotations = presale?.quotations || [];
//   const [showForm, setShowForm] = useState(false);
//   const [form, setForm] = useState({
//     details: "",
//     totalAmount: "",
//     sended: false,
//     isAccepted: false,
//   });
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
//     if (!form.details || !form.totalAmount) {
//       alert("Enter all details!");
//       return;
//     }
//     const result = await handleAddQuotation(presale.srNumber, {
//       details: form.details,
//       totalAmount: Number(form.totalAmount),
//       sended: form.sended,
//       isAccepted: form.isAccepted,
//     });
//     if (result.success) {
//       // Tell parent to reload presale (so it gets new quotations)
//       if (onQuotationAdded) onQuotationAdded();
//       setForm({ details: "", totalAmount: "", sended: false, isAccepted: false });
//       setShowForm(false);
//     } else {
//       alert(result.error || "Could not add quotation");
//     }
//   };
//   return (
//     <div className={styles.modalBackdrop} onClick={e => e.target === e.currentTarget && onClose()}>
//       <div className={styles.modalBox} style={{ maxWidth: 570 }}>
//         <div className={styles.modalHeader}>
//           <span>
//             Quotations for: <b>{presale?.personName}</b> ({presale?.client?.clientName})<br />
//             <small style={{ fontWeight: 400 }}>Requirements: {presale?.requirements}</small>
//           </span>
//           <button className={styles.closeButton} onClick={onClose}><X size={20} /></button>
//         </div>
//         <div className={styles.modalBody}>
//           <b>Past Quotations</b>
//           {(!quotations || quotations.length === 0) ? (
//             <div style={{ margin: "10px 0", color: "#888" }}>No quotations found.</div>
//           ) : (
//             <table className={styles.table} style={{ fontSize: "14px", margin: "10px 0" }}>
//               <thead>
//                 <tr>
//                   <th>S.No</th>
//                   <th>quotationNumber</th>
//                   <th>details</th>
//                   <th>Total Amount</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {quotations.map((q, i) => (
//                   <tr key={q.quotationId || i}>
//                     <td>{i + 1}</td>
//                     <td>{q.quotationNumber}</td>
//                     <td>{q.details}</td>
//                     <td>₹{q.totalAmount}</td>
//                     <td><button>view in template</button></td>
//                     <td></td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//           {!showForm ? (
//             <button className={styles.addButton} style={{ marginTop: 8 }} onClick={() => setShowForm(true)}>
//               <Plus size={16} /> Add New Quotation
//             </button>
//           ) : (
//             <form className={styles.modalBody} onSubmit={handleFormSubmit}>
//               <div className={styles.inputRow}>
//                 <label>Details</label>
//                 <input
//                   name="details"
//                   value={form.details}
//                   onChange={handleFormChange}
//                   required
//                 />
//               </div>
//               <div className={styles.inputRow}>
//                 <label>Total Amount</label>
//                 <input
//                   type="number"
//                   name="totalAmount"
//                   value={form.totalAmount}
//                   onChange={handleFormChange}
//                   required
//                 />
//               </div>
//               <div className={styles.inputRow}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     name="sended"
//                     checked={form.sended}
//                     onChange={handleFormChange}
//                   />{" "}
//                   Sended
//                 </label>
//                 <label>
//                   <input
//                     type="checkbox"
//                     name="isAccepted"
//                     checked={form.isAccepted}
//                     onChange={handleFormChange}
//                   />{" "}
//                   Accepted
//                 </label>
//               </div>
//               <div className={styles.modalActions}>
//                 <button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}>Cancel</button>
//                 <button type="submit" className={styles.submitBtn}>Save Quotation</button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default QuotationPopup;
import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import styles from "./PreSalesPage.module.scss";
import { useData } from "../../context/DataContext";
import QuotationPreview from "./QuotationPreview.jsx"; // Import the new preview component
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
  const [form, setForm] = useState({
    details: "",
    totalAmount: "",
    sended: false,
    isAccepted: false,
  });
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
    if (!form.details || !form.totalAmount) {
      alert("Enter all details!");
      return;
    }
    const result = await handleAddQuotation(presale.srNumber, {
      details: form.details,
      totalAmount: Number(form.totalAmount),
      sended: form.sended,
      isAccepted: form.isAccepted,
    });
    if (result.success) {
      if (onQuotationAdded) onQuotationAdded();
      setForm({ details: "", totalAmount: "", sended: false, isAccepted: false });
      setShowForm(false);
    } else {
      alert(result.error || "Could not add quotation");
    }
  };
  return (
    <div className={styles.modalBackdrop} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modalBox} style={{ maxWidth: 650 }}>
        <div className={styles.modalHeader}>
          <span>
            Quotations for: <b>{presale?.personName}</b> ({presale?.client?.clientName})<br />
            <small style={{ fontWeight: 400 }}>Requirements: {presale?.requirements}</small>
          </span>
          <button className={styles.closeButton} onClick={onClose}><X size={20} /></button>
        </div>
        <div className={styles.modalBody}>
          <b>Past Quotations</b>
          {(!quotations || quotations.length === 0) ? (
            <div style={{ margin: "10px 0", color: "#888" }}>No quotations found.</div>
          ) : (
            <table className={styles.table} style={{ fontSize: "14px", margin: "10px 0" }}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Quotation No</th>
                  <th>Details</th>
                  <th>Total Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {quotations.map((q, i) => (
                  <tr key={q.id || q.quotationId || i}>
                    <td>{i + 1}</td>
                    <td>{q.quotationNumber || "--"}</td>
                    <td>{q.details}</td>
                    <td>₹{q.totalAmount}</td>
                    <td>
                      <button
                        type="button"
                        className={styles.viewTemplateBtn}
                        onClick={() => setPreviewQuotation(q)}
                      >
                        View in Template
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!showForm ? (
            <button className={styles.addButton} style={{ marginTop: 8 }} onClick={() => setShowForm(true)}>
              <Plus size={16} /> Add New Quotation
            </button>
          ) : (
            <form className={styles.modalBody} onSubmit={handleFormSubmit}>
              <div className={styles.inputRow}>
                <label>Details</label>
                <input
                  name="details"
                  value={form.details}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className={styles.inputRow}>
                <label>Total Amount</label>
                <input
                  type="number"
                  name="totalAmount"
                  value={form.totalAmount}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className={styles.inputRow}>
                <label>
                  <input
                    type="checkbox"
                    name="sended"
                    checked={form.sended}
                    onChange={handleFormChange}
                  />{" "}
                  Sended
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="isAccepted"
                    checked={form.isAccepted}
                    onChange={handleFormChange}
                  />{" "}
                  Accepted
                </label>
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className={styles.submitBtn}>Save Quotation</button>
              </div>
            </form>
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
