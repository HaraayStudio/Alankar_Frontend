// import React from "react";
// import styles from "./QuotationPreview.module.scss";
// import { X } from "lucide-react";
// import logo from "../../assets/logo_vertical.png";
// import PRINT_PRICES from "../../printprices";
// // Optional: Alias mapping for Lamination, etc.
// const ALIASES = {
//   "Glossy coat": "Glossy",
//   "Matte coat": "Matt",
// };
// function parseRequirements(reqStr) {
//   return reqStr
//     .split("+")
//     .map((s) => s.trim())
//     .filter(Boolean)
//     .map((s) => ALIASES[s] || s); // Map alias if exists
// }
// function getPriceDetails({
//   requirements,
//   clientType = "Cash",
//   orderType = "Wide format printing",
// }) {
//   // Treat GST as Cash if rates are same (or change to your logic)
//   if (clientType === "GST") clientType = "Cash";
//   const items = parseRequirements(requirements);
//   const printTypesObj =
//     PRINT_PRICES.clientTypes?.[clientType]?.orderTypes?.[orderType]
//       ?.printTypes || {};
//   // Identify the printType from the requirements, then remove it from services
//   let detectedPrintType = null;
//   let services = [];
//   items.forEach((item) => {
//     if (
//       !detectedPrintType &&
//       Object.keys(printTypesObj).some(
//         (pt) => pt.toLowerCase() === item.toLowerCase()
//       )
//     ) {
//       detectedPrintType = Object.keys(printTypesObj).find(
//         (pt) => pt.toLowerCase() === item.toLowerCase()
//       );
//     } else {
//       services.push(item);
//     }
//   });
//   // Fallback: if not detected, default to first available printType
//   if (!detectedPrintType) detectedPrintType = Object.keys(printTypesObj)[0];
//   if (!detectedPrintType) return [];
//   const ptObj = printTypesObj[detectedPrintType];
//   // Try to find each service in the correct category
//   const categories = [
//     "Media",
//     "Lamination",
//     "Mounting",
//     "Installation",
//     "Framing",
//   ];
//   return services.map((service) => {
//     let found = false;
//     let itemObj = {};
//     for (let group of categories) {
//       if (ptObj[group]) {
//         const priceObj = ptObj[group].find(
//           (opt) =>
//             opt.name.replace(/\s+/g, "").toLowerCase() ===
//             service.replace(/\s+/g, "").toLowerCase()
//         );
//         if (priceObj) {
//           let cost =
//             typeof priceObj.cost === "string"
//               ? priceObj.cost
//               : priceObj.cost !== undefined
//               ? priceObj.cost
//               : priceObj.costCMYK !== undefined
//               ? priceObj.costCMYK
//               : priceObj.costCMYKW !== undefined
//               ? priceObj.costCMYKW
//               : 0;
//           itemObj = {
//             category: group,
//             name: priceObj.name,
//             unitPrice: cost,
//             quantity: 1,
//             total: cost,
//           };
//           found = true;
//           break;
//         }
//       }
//     }
//     if (!found) {
//       itemObj = {
//         category: "Other",
//         name: service,
//         unitPrice: 0,
//         quantity: 1,
//         total: 0,
//       };
//     }
//     return itemObj;
//   });
// }
// const QuotationPreview = ({ quotation, presale, onClose }) => {
//   console.log("QuotationPreview props:", { quotation, presale });
//   // Use presale data fields
//   let clientType = presale?.clientType || "Cash";
//   let orderType = presale?.printType || "Wide format printing";
//   let requirements = presale?.requirements || quotation?.details || "";
//   const client = presale?.client || {};
//   const preparedBy = presale?.personName || "-";
//   const dateIssued = quotation.dateTimeIssued
//     ? quotation.dateTimeIssued.slice(0, 10)
//     : "-";
//   const validTill = quotation.validTill || "-";
//   const priceDetails = getPriceDetails({ requirements, clientType, orderType });
//   const subtotal = priceDetails.reduce(
//     (sum, item) =>
//       typeof item.unitPrice === "number"
//         ? sum + item.unitPrice * (item.quantity || 1)
//         : sum,
//     0
//   );
//   // Calculate GST for Online clients
//   const isOnlineClient = clientType === "Online";
//   const gstRate = 0.18; // 18% GST
//   const gstAmount = isOnlineClient ? subtotal * gstRate : 0;
//   // Legacy tax and vat (kept for compatibility)
//   const tax = 0;
//   const vat = 0;
//   const grandTotal =
//     typeof quotation.totalAmount === "number" && quotation.totalAmount > 0
//       ? quotation.totalAmount
//       : subtotal + tax + vat + gstAmount;
//   return (
//     <div
//       className={styles.previewBackdrop}
//       onClick={(e) => e.target === e.currentTarget && onClose()}
//     >
//       <div className={styles.previewBox}>
//         <button className={styles.closeBtn} onClick={onClose}>
//           <X size={20} />
//         </button>
//         <div className={styles.header}>
//           <div className={styles.logo}>
//             <span>
//               <img src={logo} alt="Company Logo" />
//             </span>
//           </div>
//         </div>
//         <div className={styles.title}>QUOTATION</div>
//         <div className={styles.quotationMeta}>
//           <div className={styles.metaLeft}>
//             <div>
//               <b>TO:</b>
//             </div>
//             <div>{client.clientName || "--"}</div>
//             <div>{client.address || "--"}</div>
//             <div>{client.email || "--"}</div>
//             <div>{client.phone || "--"}</div>
//           </div>
//           <div className={styles.metaRight}>
//             <div>
//               QUOTATION NO. : <b>{quotation.quotationNumber || "--"}</b>
//             </div>
//             <div>
//               QUOTATION DATE : <b>{dateIssued}</b>
//             </div>
//             <div>
//               VALID TILL : <b>{validTill}</b>
//             </div>
//             <div>
//               PREPARED BY : <b>{preparedBy}</b>
//             </div>
//           </div>
//         </div>
//         <table className={styles.detailsTable}>
//           <thead>
//             <tr>
//               <th>DETAILS</th>
//               <th>QTY</th>
//               <th>UNIT PRICE</th>
//               <th>PRICE</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               {/* All item names in one cell, comma separated */}
//               <td>{priceDetails.map((item) => item.name).join(", ")}</td>
//               {/* Quantity can be sum, or just show "-" if not needed */}
//               <td>{console.log("sss",quotation)
//               } </td>
//               {/* Sum of unit prices */}
//               <td>
//       {`₹${priceDetails
//         .reduce((acc, item) => acc + (typeof item.unitPrice === "number" ? item.unitPrice : 0), 0)
//         .toLocaleString()}`}
//     </td>
//               {/* Sum of total prices */}
//               <td>
//                 {`₹${priceDetails
//                   .reduce(
//                     (acc, item) =>
//                       acc + (typeof item.total === "number" ? item.total : 0),
//                     0
//                   )
//                   .toLocaleString()}`}
//               </td>
//             </tr>
//           </tbody>
//           <tfoot>
//             <tr>
//               <td colSpan={3} className={styles.rightAlign}>
//                 <b>SUBTOTAL</b>
//               </td>
//               <td>₹{subtotal.toLocaleString()}</td>
//             </tr>
//             {tax > 0 && (
//               <tr>
//                 <td colSpan={3} className={styles.rightAlign}>
//                   TAX
//                 </td>
//                 <td>₹{tax.toLocaleString()}</td>
//               </tr>
//             )}
//             {vat > 0 && (
//               <tr>
//                 <td colSpan={3} className={styles.rightAlign}>
//                   VAT
//                 </td>
//                 <td>₹{vat.toLocaleString()}</td>
//               </tr>
//             )}
//             {isOnlineClient && (
//               <tr>
//                 <td colSpan={3} className={styles.rightAlign}>
//                   GST (18%)
//                 </td>
//                 <td>₹{gstAmount.toLocaleString()}</td>
//               </tr>
//             )}
//             <tr>
//               <td colSpan={3} className={styles.totalDueLabel}>
//                 TOTAL DUE
//               </td>
//               <td className={styles.totalDueAmount}>
//                 ₹{grandTotal.toLocaleString()}
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//         <div className={styles.signNote}>
//           To accept this Quotation, please sign here and return.
//         </div>
//         <div className={styles.termsTitle}>TERMS & CONDITIONS:</div>
//         <div className={styles.termsBody}>
//           Total amount appearing on this invoice shall be paid within 10 days
//           from the receipt therefrom.
//         </div>
//         <div className={styles.footer}>
//           <div>Address: {client.address || "--"}</div>
//           <div>
//             Email: {client.email || "--"} | Phone: {client.phone || "--"}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default QuotationPreview;
// import React from "react";
// import styles from "./QuotationPreview.module.scss";
// import logo from "../../assets/logo_vertical.png"; // Update with your path if needed
// import PRINT_PRICES from "../../printprices";
// import { X } from "lucide-react";
// // ---- Utility functions ----
// function formatDate(dateStr) {
//   if (!dateStr) return "-";
//   const date = new Date(dateStr);
//   return date.toLocaleDateString("en-GB"); // DD/MM/YYYY
// }
// function parseItems(details) {
//   // Replace this with your parser, or if you want static sample items, do so!
//   // For demo, split on "+" for items, else supply an array
//   if (!details) return [];
//   return details.split("+").map((s, i) => ({
//     description: s.trim(),
//     qty: 1,
//     rate: 100,
//     amount: 100,
//     key: i,
//   }));
// }
// const QuotationPreview = ({ quotation, presale, onClose }) => {
//   // Company info
//   const company = {
//     name: "Alankar Imprint Pvt. Ltd.",
//     tagline: "We Ink Your Vision",
//     address: "A/P Manjri Farm, Near Hake Vasti, Beside Mual Tyres, Opp. Govind Hotel, Solapur Road, Manjri, Pune-412307",
//     phone: "7276205777, 8422925096/97",
//     email: "info@alankarsimprint.com",
//     website: "alankarsimprint.com"
//   };
//   // Client info
//   const client = presale?.client || {};
//   const toName = client.clientName || "-";
//   const toAddr = client.address || "";
//   const toEmail = client.email || "";
//   const toPhone = client.phone || "";
//   // Dates
//   const quotationDate = quotation?.dateTimeIssued ? formatDate(quotation.dateTimeIssued) : "-";
//   const validTill = presale?.orderEndDateTime ? formatDate(presale.orderEndDateTime) : "-";
//   // Line Items
//   // Custom sample (from image): If you want to use real data, build items array as per your app logic
//   let items = [
//     {
//       description: "Vinyl with matt lamination & 3mm sunboard with installation 8x2.5ft-2, 8x2ft-2, 4x2ft, 4x2.5ft, 3x2.5ft, 6x2.5ft-2, 6x2ft",
//       qty: 140,
//       rate: 100,
//       amount: 14000,
//     },
//   ];
//   // You can use your parser if you want to auto-generate from details:
//   // items = parseItems(quotation.details);
//   // Totals
//   const subtotal = items.reduce((sum, i) => sum + Number(i.amount), 0);
//   const gstRate = 0.18;
//   const gstAmount = Math.round(subtotal * gstRate);
//   const total = subtotal + gstAmount;
//   // Bank/payment info
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
//             <b>Quotation</b>
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
//             {items.map((i, idx) => (
//               <tr key={idx}>
//                 <td>{(idx+1).toString().padStart(2,"0")}</td>
//                 <td>{i.description}</td>
//                 <td>{i.qty}/-</td>
//                 <td>{i.rate}/-</td>
//                 <td>{i.amount?.toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot>
//             <tr>
//               <td colSpan={4} style={{textAlign:'right'}}>Subtotal</td>
//               <td>Rs. {subtotal?.toLocaleString()}/-</td>
//             </tr>
//             <tr>
//               <td colSpan={4} style={{textAlign:'right'}}>GST 18%</td>
//               <td>Rs. {gstAmount?.toLocaleString()}/-</td>
//             </tr>
//             <tr>
//               <td colSpan={4} style={{textAlign:'right',fontWeight:700}}>TOTAL</td>
//               <td style={{fontWeight:700}}>Rs. {total?.toLocaleString()}/-</td>
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
// export default QuotationPreview;
// // Utility to build a full description and compute price
// function buildDescriptionAndTotals({ material, requirements, qty = 1, clientType, orderType = "Wide format printing" }) {
//   let printType = "";
//   let media = "";
//   if (typeof material === "string" && material.includes("+")) {
//     [printType, media] = material.split("+").map(s => s.trim());
//   }
//   // Compose description
//   let description = [printType, media].filter(Boolean).join(" + ");
//   if (requirements) description += " + " + requirements;
//   // Parse & sum all costs
//   let total = 0;
//   // 1. Material (printType + media)
//   if (printType && media) {
//     const ptObj = PRINT_PRICES.clientTypes?.[clientType]?.orderTypes?.[orderType]?.printTypes?.[printType];
//     const mediaArr = ptObj?.Media || [];
//     const mediaObj = mediaArr.find(item => item.name?.toLowerCase() === media.toLowerCase());
//     if (mediaObj && mediaObj.cost) {
//       total += Number(mediaObj.cost) * qty;
//     }
//   }
//   // 2. Each requirement ("lamination: matt + mounting:3mm Foam sheet")
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
//   return {
//     description,
//     qty,
//     rate: Math.round(total / qty) || total, // Single rate, fallback to total if qty=1
//     amount: total
//   };
// }
import React from "react";
import styles from "./QuotationPreview.module.scss";
import logo from "../../assets/logo_vertical.png";
import PRINT_PRICES from "../../printprices";
import { X } from "lucide-react";
// Format DD/MM/YYYY
function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB");
}
// Main calculation
function buildDescriptionAndTotals({ material, requirements, qty = 1, clientType, orderType = "Wide format printing" }) {
  // Extract printType + media
  let printType = "";
  let media = "";
  if (typeof material === "string" && material.includes("+")) {
    [printType, media] = material.split("+").map(s => s.trim());
  }
  // Full description
  let description = [printType, media].filter(Boolean).join(" + ");
  if (requirements) description += " + " + requirements;
  let total = 0;
  // Material (Media)
  if (printType && media) {
    const ptObj = PRINT_PRICES.clientTypes?.[clientType]?.orderTypes?.[orderType]?.printTypes?.[printType];
    const mediaArr = ptObj?.Media || [];
    const mediaObj = mediaArr.find(item => item.name?.toLowerCase() === media.toLowerCase());
    if (mediaObj && mediaObj.cost) {
      total += Number(mediaObj.cost) * qty;
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
        const ptObj = PRINT_PRICES.clientTypes?.[clientType]?.orderTypes?.[orderType]?.printTypes?.[printType];
        const groupArr = ptObj?.[group] || [];
        const valObj = groupArr.find(item => item.name?.toLowerCase() === value.toLowerCase());
        if (valObj && valObj.cost) {
          total += Number(valObj.cost) * qty;
        }
      }
    });
  }
  // Fallback: if total is 0, fallback to 1 if you want to avoid "0" rates
  const finalTotal = total || 1;
  return {
    description,
    qty,
    rate: Math.round(finalTotal / (qty || 1)),
    amount: finalTotal
  };
}
const QuotationPreview = ({ quotation, presale, onClose }) => {
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
  // Main row build (SINGLE ROW as required)
  const { description, qty, rate, amount } = buildDescriptionAndTotals({
    material: presale?.material,
    requirements: presale?.requirements,
    qty: presale?.qty || 1,
    clientType: presale?.clientType || "Cash",
    orderType: presale?.printType || "Wide format printing"
  });
  const items = [{ description, qty, rate, amount }];
  const subtotal = amount;
  const gstRate = presale?.clientType === "Online" ? 0.18 : 0;
  const gstAmount = Math.round(subtotal * gstRate);
  const total = subtotal + gstAmount;
  const bankDetails = {
    name: "HDFC BANK",
    accNo: "50200025519144",
    ifsc: "HDFC0001811",
    chq: 'ALANKAR IMPRINTS PVT. LTD.'
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
            <b>Quotation</b>
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
            {items.map((i, idx) => (
              <tr key={idx}>
                <td>{(idx+1).toString().padStart(2,"0")}</td>
                <td>{i.description}</td>
                <td>{i.qty}/-</td>
                <td>{i.rate}/-</td>
                <td>{i.amount?.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} style={{textAlign:'right'}}>Subtotal</td>
              <td>Rs. {subtotal?.toLocaleString()}/-</td>
            </tr>
            {gstRate > 0 && (
              <tr>
                <td colSpan={4} style={{textAlign:'right'}}>GST 18%</td>
                <td>Rs. {gstAmount?.toLocaleString()}/-</td>
              </tr>
            )}
            <tr>
              <td colSpan={4} style={{textAlign:'right',fontWeight:700}}>TOTAL</td>
              <td style={{fontWeight:700}}>Rs. {total?.toLocaleString()}/-</td>
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
        <div className={styles.thankYou}>
          THANK YOU!
        </div>
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
export default QuotationPreview;
