import React from "react";
import styles from "./PostSalesPage.module.scss";
import logo from "../../assets/logo_vertical.png"; // Use your logo path
import { X } from "lucide-react";
const InvoicePreview = ({ invoice, postsale, onClose }) => {
  const company = {
    name: "Alankar Imprint Pvt. Ltd.",
    tagline: "We Ink Your Vision",
    address: "A/P Manjri Farm, Near Hake Vasti, Beside Mual Tyres, Opp. Govind Hotel, Solapur Road, Manjri, Pune-412307",
    phone: "7276205777, 8422925096/97",
    email: "info@alankarsimprint.com",
    website: "alankarsimprint.com"
  };
  const client = postsale?.client || {};
  const toName = client.clientName || "-";
  const toAddr = client.address || "";
  const toEmail = client.email || "";
  const toPhone = client.phone || "";
  return (
    <div className={styles.modalBackdrop} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.invoicePreviewBox}>
        <button className={styles.closeButton} onClick={onClose}><X size={22} /></button>
        <div className={styles.previewHeader}>
          <img src={logo} alt="logo" className={styles.logo} />
          <div>
            <div className={styles.companyName}>{company.name}</div>
            <div className={styles.companyTagline}>{company.tagline}</div>
            <div className={styles.companyAddr}>{company.address}</div>
          </div>
        </div>
        <div className={styles.previewMeta}>
          <div><b>Invoice:</b> {invoice.invoiceNumber}</div>
          <div><b>Date:</b> {invoice.date ? new Date(invoice.date).toLocaleDateString("en-GB") : "-"}</div>
          <div><b>To:</b> {toName} {toAddr && (<><br/>{toAddr}</>)} {toEmail && (<><br/>{toEmail}</>)} {toPhone && (<><br/>{toPhone}</>)}</div>
        </div>
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
            {invoice.items.map((i, idx) => (
              <tr key={idx}>
                <td>{(idx+1).toString().padStart(2,"0")}</td>
                <td>{i.description}</td>
                <td>{i.qty}</td>
                <td>{i.rate}</td>
                <td>{i.amount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} style={{textAlign:'right'}}>Subtotal</td>
              <td>₹{invoice.amount?.toLocaleString()}</td>
            </tr>
            <tr>
              <td colSpan={4} style={{textAlign:'right'}}>GST {invoice.gst}%</td>
              <td>₹{Math.round((invoice.amount || 0) * (invoice.gst/100)).toLocaleString()}</td>
            </tr>
            <tr>
              <td colSpan={4} style={{textAlign:'right',fontWeight:700}}>TOTAL</td>
              <td style={{fontWeight:700}}>₹{invoice.total?.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
        <div className={styles.previewFooter}>
          <div>THANK YOU!</div>
          <div>
            <b>{company.phone}</b> | {company.email} | {company.website}
          </div>
        </div>
      </div>
    </div>
  );
};
export default InvoicePreview;
