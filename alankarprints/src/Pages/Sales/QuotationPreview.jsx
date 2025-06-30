import React from "react";
import styles from "./QuotationPreview.module.scss";
import logo from "../../assets/logo_vertical.png";
import { X } from "lucide-react";

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB");
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
  const validTill = quotation?.quotationOrders?.[0]?.orderEndDateTime
    ? formatDate(quotation.quotationOrders[0].orderEndDateTime)
    : "-";

  const bankDetails = {
    name: "HDFC BANK",
    accNo: "50200025519144",
    ifsc: "HDFC0001811",
    chq: 'ALANKAR IMPRINTS PVT. LTD.'
  };

  // CALCULATE TOTALS FOR ALL ORDERS
  const orders = quotation?.quotationOrders || [];

  // Totals
  let subtotal = 0;
  let totalGST = 0;
  let totalAmountWithGST = 0;

  orders.forEach(order => {
    subtotal += Number(order.totalAmount) || 0;
    totalGST += (Number(order.totalAmountWithGST) || 0) - (Number(order.totalAmount) || 0);
    totalAmountWithGST += Number(order.totalAmountWithGST) || 0;
  });

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
              <b>Valid Till:</b> {validTill}
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
            <div><b>No:</b> {quotation?.quotationNumber || "-"}</div>
          </div>
        </div>
        {/* Orders Table */}
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
            {orders.map((order, idx) => (
              <tr key={order.id || idx}>
                <td>{String(idx + 1).padStart(2, "0")}</td>
                <td>
                  <b>{order.orderType}</b> | {order.printType} | {order.media}
                  <div className={styles.stepsList}>
                    {order.quotationOrderSteps?.map(step => (
                      <span key={step.id} className={styles.stepChip}>
                        {step.stepName}: <span className={styles.stepValue}>{step.stepValue}</span>
                      </span>
                    ))}
                  </div>
                </td>
                <td>{order.qty}/-</td>
                <td>{order.unitPrice}/-</td>
                <td>{order.totalAmount?.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} style={{ textAlign: 'right' }}>Subtotal</td>
              <td>Rs. {subtotal?.toLocaleString()}/-</td>
            </tr>
            <tr>
              <td colSpan={4} style={{ textAlign: 'right' }}>GST</td>
              <td>Rs. {totalGST?.toLocaleString()}/-</td>
            </tr>
            <tr>
              <td colSpan={4} style={{ textAlign: 'right', fontWeight: 700 }}>TOTAL</td>
              <td style={{ fontWeight: 700 }}>Rs. {totalAmountWithGST?.toLocaleString()}/-</td>
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
