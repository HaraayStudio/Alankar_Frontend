// import React from "react";
// import styles from "./InvoicePreview.module.scss";
// import logo from "../../assets/logo_vertical.png";
// import { X } from "lucide-react";
// function formatDate(dateStr) {
//   if (!dateStr) return "-";
//   const date = new Date(dateStr);
//   return date.toLocaleDateString("en-GB");
// }
// const company = {
//   name: "Alankar Imprint Pvt. Ltd.",
//   tagline: "We Ink Your Vision",
//   address: "A/P Manjri Farm, Near Hake Vasti, Beside Mual Tyres, Opp. Govind Hotel, Solapur Road, Manjri, Pune-412307",
//   phone: "7276205777, 8422925096/97",
//   email: "info@alankarsimprint.com",
//   website: "alankarsimprint.com"
// };
// const bankDetails = {
//   name: "HDFC BANK",
//   accNo: "50200025519144",
//   ifsc: "HDFC0001811",
//   chq: 'ALANKAR IMPRINTS PVT. LTD.'
// };
// export default function InvoicePreview({ postsale, onClose }) {
//   if (!postsale) return null;
//   const client = postsale.client || {};
//   const order = postsale.order || {};
//   const gstPerc = Number(postsale.gstPercentage || 0);
//   const subtotal = Number(postsale.finalAmtWithOutGST || 0);
//   const gstAmount = Math.round((subtotal * gstPerc) / 100);
//   const total = postsale.totalAmtWithGST ? Number(postsale.totalAmtWithGST) : subtotal + gstAmount;
//   // Parse description into "Material" and "Requirements"
//   let material = "", requirements = "";
//   if (order.description && order.description.includes("-")) {
//     [material, requirements] = order.description.split("-").map(s => s.trim());
//   } else {
//     material = order.description || "";
//   }
//   return (
//     <div className={styles.previewBackdrop} onClick={e => e.target === e.currentTarget && onClose()}>
//       <div className={styles.previewBox}>
//         <button className={styles.closeBtn} onClick={onClose}><X size={22} /></button>
//         {/* Header */}
//         <div className={styles.headerRow}>
//           <div className={styles.company}>
//             <img src={logo} alt="logo" className={styles.logo} />
//             <div>
//               <div className={styles.compName}>{company.name}</div>
//               <div className={styles.compTagline}>{company.tagline}</div>
//               <div className={styles.compAddr}>{company.address}</div>
//             </div>
//           </div>
//           <div className={styles.metaRight}>
//             <div><b>Date:</b> {formatDate(order.startDateTime)}</div>
//             <div><b>Invoice #:</b> INV-{postsale.srNumber?.toString().padStart(3, "0")}</div>
//             <div><b>Status:</b> {order.status}</div>
//           </div>
//         </div>
//         {/* To */}
//         <div className={styles.clientRow}>
//           <div>
//             <b>To:</b><br />
//             {client.clientName}<br />
//             {client.email}<br />
//             {client.phone}
//           </div>
//           <div>
//             <b>Order Period:</b><br />
//             {formatDate(order.startDateTime)} to {formatDate(order.endDateTime)}
//           </div>
//         </div>
//         {/* Table */}
//         <table className={styles.detailsTable}>
//           <thead>
//             <tr>
//               <th>Sr.</th>
//               <th>Description</th>
//               <th>Qty.</th>
//               <th>Rate</th>
//               <th>Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>01</td>
//               <td>
//                 <div className={styles.descTitle}>{material}</div>
//                 <div className={styles.descSub}>{requirements}</div>
//               </td>
//               <td>1</td>
//               <td>{subtotal.toLocaleString()}</td>
//               <td>{subtotal.toLocaleString()}</td>
//             </tr>
//           </tbody>
//           <tfoot>
//             <tr>
//               <td colSpan={4} className={styles.rightAlign}>Subtotal</td>
//               <td>{subtotal.toLocaleString()}</td>
//             </tr>
//             <tr>
//               <td colSpan={4} className={styles.rightAlign}>GST ({gstPerc}%)</td>
//               <td>{gstAmount.toLocaleString()}</td>
//             </tr>
//             <tr>
//               <td colSpan={4} className={styles.rightAlign + " " + styles.bold}>TOTAL</td>
//               <td className={styles.bold}>{total.toLocaleString()}</td>
//             </tr>
//           </tfoot>
//         </table>
//         {/* Payments */}
//         <div className={styles.bottomRow}>
//           <div className={styles.bankDetails}>
//             <div className={styles.sectionTitle}>PAYMENT DETAILS</div>
//             <div>BANK NAME: {bankDetails.name}</div>
//             <div>ACCOUNT NO: {bankDetails.accNo}</div>
//             <div>IFSC CODE: {bankDetails.ifsc}</div>
//             <div>Cheque/DD in name: <b>{bankDetails.chq}</b></div>
//           </div>
//           <div className={styles.tncDetails}>
//             <div className={styles.sectionTitle}>TERMS & CONDITIONS</div>
//             <div>1. Payment 50% advance & remaining on delivery.</div>
//             <div>2. This invoice is valid for 15 days.</div>
//             <div>3. Transportation extra if applicable.</div>
//             <div>4. Qty. may vary by 2-3%.</div>
//           </div>
//         </div>
//         {/* Footer */}
//         <div className={styles.thankYou}>THANK YOU!</div>
//         <div className={styles.footerRow}>
//           <div>For queries, contact us:</div>
//           <div>
//             <b>{company.phone}</b> | {company.email} | {company.website}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useRef } from "react";
import styles from "./InvoicePreview.module.scss";
import logo from "../../assets/logo_vertical.png";
import { X,Share2 ,Printer, FileDown } from "lucide-react";
import html2pdf from "html2pdf.js";
import { useData } from "../../context/DataContext";
// Date formatter
function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB");
}
// Main InvoicePreview component
export default function InvoicePreview({ postsale, onClose }) {
  const invoiceRef = useRef();
  // Print handler
  const { handleSendPostSaleMail } = useData();
  const handlePrint = () => {
    const printContents = invoiceRef.current.innerHTML;
    const win = window.open('', '', 'width=900,height=900');
    win.document.write(`<html><head><title>Invoice</title>`);
    win.document.write(`<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:400,600,800&display=swap">`);
    win.document.write(`<style>
      body{font-family:'Inter',Arial,sans-serif;padding:30px}
      table{width:100%;border-collapse:collapse;}
      th,td{border:1px solid #eaeaea;padding:7px 10px;}
      th{background:#f5f5f5;}
      h1{font-size:2rem;}
      .inv-label{color:#1291d0;font-weight:600;}
      .footer{margin-top:18px;font-size:0.96rem;}
      .bankDetails,.tncDetails{background:#f6faff;padding:10px 14px;border-radius:8px;margin-top:12px;}
    </style>`);
    win.document.write(`</head><body>`);
    win.document.write(printContents);
    win.document.write('</body></html>');
    win.document.close();
    setTimeout(() => {
      win.focus();
      win.print();
      win.close();
    }, 400);
  };
  // PDF handler
  const handleDownloadPDF = () => {
    html2pdf().set({
      margin: 5,
      filename: `Invoice_${postsale?.srNumber || "INV"}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    })
    .from(invoiceRef.current)
    .save();
  };
  // Company & bank info
  const company = {
    name: "Alankar Imprint Pvt. Ltd.",
    tagline: "We Ink Your Vision",
    address: "A/P Manjri Farm, Near Hake Vasti, Beside Mual Tyres, Opp. Govind Hotel, Solapur Road, Manjri, Pune-412307",
    phone: "7276205777, 8422925096/97",
    email: "info@alankarsimprint.com",
    website: "alankarsimprint.com"
  };
  const bankDetails = {
    name: "HDFC BANK",
    accNo: "50200025519144",
    ifsc: "HDFC0001811",
    chq: 'ALANKAR IMPRINTS PVT. LTD.'
  };
  // Client info
  const client = postsale?.client || {};
  const toName = client.clientName || "-";
  const toEmail = client.email || "";
  const invoiceNumber = postsale?.invoice?.invoiceNumber
  const toPhone = client.phone || "";
  const invoiceNo = postsale?.srNumber ? `INV-${String(postsale.srNumber).padStart(3,"0")}` : "Invoice";
  const invoiceDate = postsale?.order?.createdAtDateTime ? formatDate(postsale.order.createdAtDateTime) : "-";
  const dueDate = postsale?.order?.endDateTime ? formatDate(postsale.order.endDateTime) : "-";
  // Order Details
  const orderDesc = postsale?.order?.description || "-";
  const qty = postsale?.qty || 1;
  // Price details
  const estimatedQuote = Number(postsale?.estimatedQuote || 0);
  const negotiationPrice = Number(postsale?.negotiationPrice || 0);
  const unitPrice = Number(postsale?.unitPrice || 0);
  const baseAmount = Number(postsale?.finalAmtWithOutGST || 0);
  const gstPercent = Number(postsale?.gstPercentage || 0);
  const gstAmount = Math.round(baseAmount * gstPercent / 100);
  const totalAmt = Number(postsale?.totalAmtWithGST || (baseAmount + gstAmount));
  const remark = postsale?.remark || "-";
  // Received payments (if any)
  const payments = postsale?.receivedPayments || [];
  return (
    <div className={styles.previewBackdrop} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.previewBox}>
        <button className={styles.closeBtn} onClick={onClose}><X size={22} /></button>
        {/* Print & PDF Buttons */}
        <div className={styles.actionBar}>
          {/* <button onClick={handlePrint} className={styles.actionBtn} title="Print Invoice">
            <Printer size={18} /> Print
          </button> */}
          <button onClick={handleDownloadPDF} className={styles.actionBtn} title="Download PDF">
            <FileDown size={18} /> PDF
          </button>{
          console.log(invoiceNumber)}
         <button
  onClick={() => handleSendPostSaleMail(invoiceNumber)}
  className={styles.actionBtn}
  title="Download PDF"
>
  <Share2 size={18} /> Send Via Mail
</button>
        </div>
        {/* Printable content */}
        <div ref={invoiceRef}>
          {/* Header */}
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
                <b>Invoice No:</b> {invoiceNo}<br />
                <b>Date:</b> {invoiceDate}<br />
                <b>Due:</b> {dueDate}
              </div>
            </div>
          </div>
          {/* Client Row */}
          <div className={styles.clientRow}>
            <div>
              <b>To,</b><br />
              {toName}<br />
              {toEmail && <>{toEmail}<br /></>}
              {toPhone && <>{toPhone}<br /></>}
            </div>
            <div>
              <b>Invoice</b>
            </div>
          </div>
          {/* Invoice Table */}
          <table className={styles.detailsTable}>
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Base Amt</th>
                <th>GST %</th>
                <th>GST Amt</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01</td>
                <td>
                  {orderDesc}
                  <br/>
                  {negotiationPrice > 0 && (
                    <span className={styles.invLabel}>Negotiated: ₹{negotiationPrice.toLocaleString()}</span>
                  )}
                  {estimatedQuote > 0 && (
                    <span className={styles.invLabel}> &nbsp;Estimate: ₹{estimatedQuote.toLocaleString()}</span>
                  )}
                </td>
                <td>{qty}</td>
                <td>{unitPrice}</td>
                <td>₹{baseAmount.toLocaleString()}</td>
                <td>{gstPercent}%</td>
                <td>₹{gstAmount.toLocaleString()}</td>
                <td><b>₹{totalAmt.toLocaleString()}</b></td>
              </tr>
            </tbody>
          </table>
          {/* Payments Row */}
          {payments.length > 0 && (
            <div className={styles.paymentSection}>
              <b>Payments Received:</b>
              <ul>
                {payments.map((p, idx) => (
                  <li key={idx}>
                    {formatDate(p.date)} - ₹{Number(p.amount).toLocaleString()} ({p.mode || "N/A"})
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Remarks */}
        <div className={styles.remarksRow}  style={{ display: 'flex', alignItems: 'center' , justifyContent: 'space-between' }}>
  <b>Scan to Pay:</b>
 <a href={remark}>{remark}</a>
  <img 
    src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(remark)}`} 
    alt="QR Code for Remarks" 
    style={{ marginLeft: '10px', height: '100px' }} 
  />
</div>
          {/* Bank & TnC Row */}
          <div className={styles.bottomRow}>
            <div className={styles.bankDetails}>
              <div className={styles.sectionTitle}>PAYMENT DETAILS</div>
              <div>BANK NAME: {bankDetails.name}</div>
              <div>ACCOUNT NO: {bankDetails.accNo}</div>
              <div>IFSC CODE: {bankDetails.ifsc}</div>
              <div>Cheque/DD in name: <b>{bankDetails.chq}</b></div>
            </div>
            <div className={styles.tncDetails}>
              <div className={styles.sectionTitle}>TERMS & CONDITIONS</div>
              <div>1. Payment to be made 50% advance & balance on delivery.</div>
              <div>2. Transportation extra as applicable.</div>
              <div>3. Invoice valid for 15 days.</div>
              <div>4. Actual qty may vary by 2-3%.</div>
            </div>
          </div>
          <div className={styles.thankYou}>THANK YOU!</div>
          <div className={styles.footerRow}>
            <div>WE HOPE EVERYTHING IS CRYSTAL CLEAR. CONTACT US FOR ANY QUERY.</div>
            <div>
              <b>{company.phone}</b> | {company.email} | {company.website}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
