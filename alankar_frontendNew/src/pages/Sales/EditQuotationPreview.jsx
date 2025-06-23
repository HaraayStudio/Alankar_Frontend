// import React, { useState } from "react";
// import styles from "./QuotationPreview.module.scss";
// import logo from "../../assets/logo_vertical.png";
// import PRINT_PRICES from "../../printprices";
// import { X, Edit, Check } from "lucide-react";
// // Utility for formatting date
// function formatDate(dateStr) {
//   if (!dateStr) return "-";
//   const date = new Date(dateStr);
//   return date.toLocaleDateString("en-GB");
// }
// function buildDescriptionAndTotals({ material, requirements, qty = 1, clientType, orderType = "Wide format printing" }) {
//   let printType = "";
//   let media = "";
//   if (typeof material === "string" && material.includes("+")) {
//     [printType, media] = material.split("+").map(s => s.trim());
//   }
//   let description = [printType, media].filter(Boolean).join(" + ");
//   if (requirements) description += " + " + requirements;
//   let total = 0;
//   if (printType && media) {
//     const ptObj = PRINT_PRICES.clientTypes?.[clientType]?.orderTypes?.[orderType]?.printTypes?.[printType];
//     const mediaArr = ptObj?.Media || [];
//     const mediaObj = mediaArr.find(item => item.name?.toLowerCase() === media.toLowerCase());
//     if (mediaObj && mediaObj.cost) {
//       total += Number(mediaObj.cost) * qty;
//     }
//   }
//   if (requirements) {
//     requirements.split("+").map(s => s.trim()).forEach(groupStr => {
//       if (!groupStr) return;
//       const [groupRaw, valueRaw] = groupStr.split(":").map(s => s.trim());
//       if (!groupRaw || !valueRaw) return;
//       const group = groupRaw.charAt(0).toUpperCase() + groupRaw.slice(1).toLowerCase();
//       const value = valueRaw;
//       if (printType && group && value) {
//         const ptObj = PRINT_PRICES.clientTypes?.[clientType]?.orderTypes?.[orderType]?.printTypes?.[printType];
//         const groupArr = ptObj?.[group] || [];
//         const valObj = groupArr.find(item => item.name?.toLowerCase() === value.toLowerCase());
//         if (valObj && valObj.cost) {
//           total += Number(valObj.cost) * qty;
//         }
//       }
//     });
//   }
//   const finalTotal = total || 1;
//   return {
//     description,
//     qty,
//     rate: Math.round(finalTotal / (qty || 1)),
//     amount: finalTotal
//   };
// }
// const QuotationEditPreview = ({ quotation, presale, onClose, onSubmit }) => {
//   // Company info
//   const company = {
//     name: "Alankar Imprint Pvt. Ltd.",
//     tagline: "We Ink Your Vision",
//     address: "A/P Manjri Farm, Near Hake Vasti, Beside Mual Tyres, Opp. Govind Hotel, Solapur Road, Manjri, Pune-412307",
//     phone: "7276205777, 8422925096/97",
//     email: "info@alankarsimprint.com",
//     website: "alankarsimprint.com"
//   };
//   // Extract & compute values
//   const client = presale?.client || {};
//   const toName = client.clientName || "-";
//   const toAddr = client.address || "";
//   const toEmail = client.email || "";
//   const toPhone = client.phone || "";
//   const quotationDate = quotation?.dateTimeIssued ? formatDate(quotation.dateTimeIssued) : "-";
//   const validTill = presale?.orderEndDateTime ? formatDate(presale.orderEndDateTime) : "-";
//   // --- EDIT STATE ---
//   const initialRow = buildDescriptionAndTotals({
//     material: presale?.material,
//     requirements: presale?.requirements,
//     qty: presale?.qty || 1,
//     clientType: presale?.clientType || "Cash",
//     orderType: presale?.printType || "Wide format printing"
//   });
//   // Editable state for row
//   const [editMode, setEditMode] = useState(false);
//   const [row, setRow] = useState(initialRow);
//   // When edit is submitted (calls parent or just closes modal)
//   const handleSubmitEdit = () => {
//     // Call parent if provided, else just close and console.log the new values
//     if (onSubmit) onSubmit(row);
//     setEditMode(false);
//   };
//   // GST logic
//   const gstRate = presale?.clientType === "Online" ? 0.18 : 0;
//   const subtotal = row.amount;
//   const gstAmount = Math.round(subtotal * gstRate);
//   const total = subtotal + gstAmount;
//   const bankDetails = {
//     name: "HDFC BANK",
//     accNo: "50200025519144",
//     ifsc: "HDFC0001811",
//     chq: 'ALANKAR IMPRINTS PVT. LTD.'
//   };
//   return (
//     <div className={styles.previewBackdrop} onClick={e => e.target === e.currentTarget && onClose()}>
//       <div className={styles.previewBox}>
//         <button className={styles.closeBtn} onClick={onClose}><X size={22} /></button>
//         <div className={styles.headerRow}>
//           <div className={styles.company}>
//             <img src={logo} alt="logo" className={styles.logo} />
//             <div>
//               <div className={styles.compName}>{company.name}</div>
//               <div className={styles.compTagline}>{company.tagline}</div>
//               <div className={styles.compAddr}>{company.address}</div>
//             </div>
//           </div>
//           <div className={styles.qmeta}>
//             <div>
//               <b>Date:</b> {quotationDate}<br />
//               <b>To:</b> {validTill}
//             </div>
//           </div>
//         </div>
//         <div className={styles.hiQuoteRow}>
//           <div className={styles.hiText}>HI! THIS IS YOUR QUOTE</div>
//         </div>
//         <div className={styles.clientRow}>
//           <div>
//             <b>To,</b> <br />
//             {toName}<br />
//             {toAddr && <>{toAddr}<br /></>}
//             {toEmail && <>{toEmail}<br /></>}
//             {toPhone && <>{toPhone}<br /></>}
//           </div>
//           <div>
//             <b>EDIT Quotation</b>
//             {!editMode && (
//               <button
//                 className={styles.editBtn}
//                 onClick={() => setEditMode(true)}
//                 style={{
//                   marginLeft: 10,
//                   background: "#f5f7fa",
//                   border: "1px solid #c5c5c5",
//                   borderRadius: 6,
//                   padding: "3px 12px",
//                   cursor: "pointer",
//                   color: "#333",
//                 }}
//               >
//                 <Edit size={16} /> Edit
//               </button>
//             )}
//           </div>
//         </div>
//         {/* Table */}
//         <table className={styles.detailsTable}>
//           <thead>
//             <tr>
//               <th>Sr.</th>
//               <th>Description</th>
//               <th>Qty.</th>
//               <th>Rate Per</th>
//               <th>Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>01</td>
//               <td>
//                 {row.description}
//               </td>
//               <td>
//                 {editMode ? (
//                   <input
//                     type="number"
//                     value={row.qty}
//                     min={1}
//                     className={styles.editInput}
//                     onChange={e => {
//                       const qty = parseInt(e.target.value, 10) || 1;
//                       setRow(prev => ({
//                         ...prev,
//                         qty,
//                         amount: qty * prev.rate
//                       }));
//                     }}
//                   />
//                 ) : (
//                   <>{row.qty}/-</>
//                 )}
//               </td>
//               <td>
//                 {editMode ? (
//                   <input
//                     type="number"
//                     value={row.rate}
//                     min={1}
//                     className={styles.editInput}
//                     onChange={e => {
//                       const rate = parseInt(e.target.value, 10) || 1;
//                       setRow(prev => ({
//                         ...prev,
//                         rate,
//                         amount: rate * prev.qty
//                       }));
//                     }}
//                   />
//                 ) : (
//                   <>{row.rate}/-</>
//                 )}
//               </td>
//               <td>
//                 {editMode ? (
//                   <input
//                     type="number"
//                     value={row.amount}
//                     min={1}
//                     className={styles.editInput}
//                     onChange={e => {
//                       const amount = parseInt(e.target.value, 10) || 1;
//                       setRow(prev => ({
//                         ...prev,
//                         amount,
//                         // keep qty/rate in sync if needed (optional, here it's manual)
//                       }));
//                     }}
//                   />
//                 ) : (
//                   <>{row.amount?.toLocaleString()}</>
//                 )}
//               </td>
//             </tr>
//           </tbody>
//           <tfoot>
//             <tr>
//               <td colSpan={4} style={{ textAlign: 'right' }}>Subtotal</td>
//               <td>Rs. {row.amount?.toLocaleString()}/-</td>
//             </tr>
//             {gstRate > 0 && (
//               <tr>
//                 <td colSpan={4} style={{ textAlign: 'right' }}>GST 18%</td>
//                 <td>Rs. {gstAmount?.toLocaleString()}/-</td>
//               </tr>
//             )}
//             <tr>
//               <td colSpan={4} style={{ textAlign: 'right', fontWeight: 700 }}>TOTAL</td>
//               <td style={{ fontWeight: 700 }}>Rs. {total?.toLocaleString()}/-</td>
//             </tr>
//           </tfoot>
//         </table>
//         {/* Payment + TnC row */}
//         <div className={styles.bottomRow}>
//           <div className={styles.bankDetails}>
//             <div className={styles.sectionTitle}>PAYMENT DETAILS</div>
//             <div>BANK NAME: {bankDetails.name}</div>
//             <div>ACCOUNT NO: {bankDetails.accNo}</div>
//             <div>IFSC CODE: {bankDetails.ifsc}</div>
//             <div>
//               Cheque or DD in name: <b>{bankDetails.chq}</b>
//             </div>
//           </div>
//           <div className={styles.tncDetails}>
//             <div className={styles.sectionTitle}>TERMS & CONDITIONS</div>
//             <div>1. The above quote is valid for 15 days.</div>
//             <div>2. Transportation charges extra as applicable.</div>
//             <div>3. Payment to be done 50 percent advance & remaining against delivery.</div>
//             <div>4. Actual qty may vary by 2 to 3 percent.</div>
//           </div>
//         </div>
//         {editMode && (
//           <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}>
//             <button
//               className={styles.submitBtn}
//               onClick={handleSubmitEdit}
//               style={{
//                 background: "#21a366",
//                 color: "white",
//                 border: "none",
//                 borderRadius: 8,
//                 padding: "10px 32px",
//                 fontWeight: 700,
//                 fontSize: "1rem",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 7
//               }}
//             >
//               <Check size={18} /> Submit
//             </button>
//             <button
//               className={styles.cancelBtn}
//               onClick={() => setEditMode(false)}
//               style={{
//                 marginLeft: 10,
//                 background: "#fff",
//                 color: "#333",
//                 border: "1.3px solid #ccc",
//                 borderRadius: 8,
//                 padding: "10px 22px",
//                 fontWeight: 600,
//                 fontSize: "1rem",
//                 cursor: "pointer"
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         )}
//         <div className={styles.thankYou}>
//           THANK YOU!
//         </div>
//         <div className={styles.footerRow}>
//           <div>WE HOPE EVERYTHING IS CRYSTAL CLEAR TO YOU. PLEASE CONTACT US IF #YOU HAVE ANY QUERY</div>
//           <div>
//             <b>{company.phone}</b> | {company.email} | {company.website}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default QuotationEditPreview;
import React, { useState } from "react";
import styles from "./QuotationPreview.module.scss";
import logo from "../../assets/logo_vertical.png";
import { X, Edit, Check } from "lucide-react";
import { useData } from "../../context/DataContext";
function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB");
}
const QuotationEditPreview = ({ quotation, presale, onClose, onSubmit }) => {
  const { handleUpdateQuotation } = useData();
  // Company info, etc.
  const company = {
    name: "Alankar Imprint Pvt. Ltd.",
    tagline: "We Ink Your Vision",
    address: "A/P Manjri Farm, Near Hake Vasti, Beside Mual Tyres, Opp. Govind Hotel, Solapur Road, Manjri, Pune-412307",
    phone: "7276205777, 8422925096/97",
    email: "info@alankarsimprint.com",
    website: "alankarsimprint.com"
  };
  const client = presale?.client || {};
  const toName = client.clientName || "-";
  const toAddr = client.address || "";
  const toEmail = client.email || "";
  const toPhone = client.phone || "";
  const quotationDate = quotation?.dateTimeIssued ? formatDate(quotation.dateTimeIssued) : "-";
  const validTill = presale?.orderEndDateTime ? formatDate(presale.orderEndDateTime) : "-";
  const bankDetails = {
    name: "HDFC BANK",
    accNo: "50200025519144",
    ifsc: "HDFC0001811",
    chq: 'ALANKAR IMPRINTS PVT. LTD.'
  };
  // Editable row state
  const initialRow = {
    description: quotation?.details || [presale?.material, presale?.requirements].filter(Boolean).join(" + "),
    qty: quotation?.qty || presale?.qty || 1,
    rate: quotation?.unitPrice || 1,
    amount: quotation?.totalAmount || 1,
  };
  const [editMode, setEditMode] = useState(false);
  const [row, setRow] = useState(initialRow);
  const [saving, setSaving] = useState(false);
  // GST percentage from quotation
  const gstPercent = quotation?.gST || 0;
  const subtotal = row.amount;
  const gstAmount = Math.round((subtotal * gstPercent) / 100);
  const total = subtotal + gstAmount;
  // Ensure calculations always sync
  const handleQtyChange = e => {
    const qty = parseInt(e.target.value, 10) || 1;
    setRow(prev => ({
      ...prev,
      qty,
      amount: qty * prev.rate
    }));
  };
  const handleRateChange = e => {
    const rate = parseInt(e.target.value, 10) || 1;
    setRow(prev => ({
      ...prev,
      rate,
      amount: rate * prev.qty
    }));
  };
  const handleAmountChange = e => {
    const amount = parseInt(e.target.value, 10) || 1;
    setRow(prev => ({
      ...prev,
      amount
      // Optionally update rate if needed, here we keep manual for user control
    }));
  };
  const handleSubmitEdit = async () => {
    setSaving(true);
    // Construct the updated quotation object:
    const updatedQuotation = {
      ...quotation,
      details: row.description,
      unitPrice: Number(row.rate),
      qty: Number(row.qty),
      totalAmount: Number(row.amount),
      totalAmountWithGST: Number(total),
      gST: gstPercent
    };
    try {
      const res = await handleUpdateQuotation(updatedQuotation, quotation.quotationNumber);
      if (res.success) {
        if (onSubmit) onSubmit(res.data);
        setEditMode(false);
        onClose();
      } else {
        alert(res.error || "Failed to update quotation");
      }
    } catch (err) {
      alert("Error updating quotation!");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className={styles.previewBackdrop} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.previewBox}>
        <button className={styles.closeBtn} onClick={onClose}><X size={22} /></button>
        <div className={styles.headerRow}>
          <div className={styles.company}>
            <img src={logo} alt="logo" className={styles.logo} />
            <div>
              <div className={styles.compName}>{company.name}</div>
              <div className={styles.compTagline}>{company.tagline}</div>
              <div className={styles.compAddr}>{company.address}</div>
            </div>
          </div>
          <div className={styles.qmeta}>
            <div>
              <b>Date:</b> {quotationDate}<br />
              <b>To:</b> {validTill}
            </div>
          </div>
        </div>
        <div className={styles.hiQuoteRow}>
          <div className={styles.hiText}>HI! THIS IS YOUR QUOTE</div>
        </div>
        <div className={styles.clientRow}>
          <div>
            <b>To,</b> <br />
            {toName}<br />
            {toAddr && <>{toAddr}<br /></>}
            {toEmail && <>{toEmail}<br /></>}
            {toPhone && <>{toPhone}<br /></>}
          </div>
          <div>
            <b>EDIT Quotation</b>
            {!editMode && (
              <button
                className={styles.editBtn}
                onClick={() => setEditMode(true)}
                style={{
                  marginLeft: 10,
                  background: "#f5f7fa",
                  border: "1px solid #c5c5c5",
                  borderRadius: 6,
                  padding: "3px 12px",
                  cursor: "pointer",
                  color: "#333",
                }}
              >
                <Edit size={16} /> Edit
              </button>
            )}
          </div>
        </div>
        {/* Table */}
        <table className={styles.detailsTable}>
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Description</th>
              <th>Qty.</th>
              <th>Rate Per</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>
                {editMode ? (
                  <input
                    type="text"
                    value={row.description}
                    className={styles.editInput}
                    onChange={e =>
                      setRow(prev => ({ ...prev, description: e.target.value }))
                    }
                  />
                ) : (
                  row.description
                )}
              </td>
              <td>
                {editMode ? (
                  <input
                    type="number"
                    value={row.qty}
                    min={1}
                    className={styles.editInput}
                    onChange={handleQtyChange}
                  />
                ) : (
                  <>{row.qty}/-</>
                )}
              </td>
              <td>
                {editMode ? (
                  <input
                    type="number"
                    value={row.rate}
                    min={1}
                    className={styles.editInput}
                    onChange={handleRateChange}
                  />
                ) : (
                  <>{row.rate}/-</>
                )}
              </td>
              <td>
                {editMode ? (
                  <input
                    type="number"
                    value={row.amount}
                    min={1}
                    className={styles.editInput}
                    onChange={handleAmountChange}
                  />
                ) : (
                  <>{row.amount?.toLocaleString()}</>
                )}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} style={{ textAlign: 'right' }}>Subtotal</td>
              <td>Rs. {row.amount?.toLocaleString()}/-</td>
            </tr>
            {gstPercent > 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: 'right' }}>
                  GST {gstPercent}%</td>
                <td>Rs. {gstAmount?.toLocaleString()}/-</td>
              </tr>
            )}
            <tr>
              <td colSpan={4} style={{ textAlign: 'right', fontWeight: 700 }}>TOTAL</td>
              <td style={{ fontWeight: 700 }}>Rs. {total?.toLocaleString()}/-</td>
            </tr>
          </tfoot>
        </table>
        {/* Payment + TnC row */}
        <div className={styles.bottomRow}>
          <div className={styles.bankDetails}>
            <div className={styles.sectionTitle}>PAYMENT DETAILS</div>
            <div>BANK NAME: {bankDetails.name}</div>
            <div>ACCOUNT NO: {bankDetails.accNo}</div>
            <div>IFSC CODE: {bankDetails.ifsc}</div>
            <div>
              Cheque or DD in name: <b>{bankDetails.chq}</b>
            </div>
          </div>
          <div className={styles.tncDetails}>
            <div className={styles.sectionTitle}>TERMS & CONDITIONS</div>
            <div>1. The above quote is valid for 15 days.</div>
            <div>2. Transportation charges extra as applicable.</div>
            <div>3. Payment to be done 50 percent advance & remaining against delivery.</div>
            <div>4. Actual qty may vary by 2 to 3 percent.</div>
          </div>
        </div>
        {editMode && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}>
            <button
              className={styles.submitBtn}
              onClick={handleSubmitEdit}
              disabled={saving}
              style={{
                background: "#21a366",
                color: "white",
                border: "none",
                borderRadius: 8,
                padding: "10px 32px",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 7
              }}
            >
              <Check size={18} /> {saving ? "Saving..." : "Submit"}
            </button>
            <button
              className={styles.cancelBtn}
              onClick={() => setEditMode(false)}
              style={{
                marginLeft: 10,
                background: "#fff",
                color: "#333",
                border: "1.3px solid #ccc",
                borderRadius: 8,
                padding: "10px 22px",
                fontWeight: 600,
                fontSize: "1rem",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
          </div>
        )}
        <div className={styles.thankYou}>THANK YOU!</div>
        <div className={styles.footerRow}>
          <div>WE HOPE EVERYTHING IS CRYSTAL CLEAR TO YOU. PLEASE CONTACT US IF #YOU HAVE ANY QUERY</div>
          <div>
            <b>{company.phone}</b> | {company.email} | {company.website}
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuotationEditPreview;
