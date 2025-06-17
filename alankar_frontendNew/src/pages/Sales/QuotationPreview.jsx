import React from "react";
import styles from "./QuotationPreview.module.scss";
import { X } from "lucide-react";
import logo from "../../assets/logo_vertical.png"; // adjust path as needed
import PRINT_PRICES from "../../printprices"; // adjust path as needed
function parseRequirements(reqStr) {
  // Split by + and trim spaces
  return reqStr
    .split("+")
    .map(s => s.trim())
    .filter(Boolean);
}
function getPriceDetails({ requirements, clientType = "Cash" }) {
  const items = parseRequirements(requirements);
  // Pick up printType, then rest as services
  let printType = null;
  let services = [];
  // Detect print type: match with PRINT_PRICES[clientType].printTypes keys
  const printTypesObj = PRINT_PRICES.clientTypes[clientType]?.printTypes || {};
  items.forEach(item => {
    if (!printType && Object.keys(printTypesObj).some(pt => pt.toLowerCase() === item.toLowerCase())) {
      printType = Object.keys(printTypesObj).find(pt => pt.toLowerCase() === item.toLowerCase());
    } else {
      services.push(item);
    }
  });
  // Now for each service, detect if it's Media, Lamination, Mounting, Installation, Framing, etc.
  const priceItems = [];
  if (!printType) {
    // fallback: show all as unknown
    return items.map((item, i) => ({
      category: "Other",
      name: item,
      unitPrice: 0,
      quantity: 1,
      total: 0
    }));
  }
  const ptObj = printTypesObj[printType];
  // Loop each group
  services.forEach(service => {
    let found = false;
    for (let group of ["Media", "Lamination", "Mounting", "Installation", "Framing"]) {
      if (ptObj[group]) {
        const priceObj = ptObj[group].find(opt =>
          opt.name.replace(/\s+/g, "").toLowerCase() === service.replace(/\s+/g, "").toLowerCase()
        );
        if (priceObj) {
          let cost = typeof priceObj.cost === "string" ? priceObj.cost : priceObj.cost || priceObj.costCMYK || 0;
          priceItems.push({
            category: group,
            name: service,
            unitPrice: cost,
            quantity: 1,
            total: cost,
          });
          found = true;
          break;
        }
      }
    }
    if (!found) {
      // Not found, push as unknown
      priceItems.push({
        category: "Other",
        name: service,
        unitPrice: 0,
        quantity: 1,
        total: 0,
      });
    }
  });
  // Also add print type as row, usually it's not charged, but if you have print type cost, add here
  // If you want, you can add:
  // priceItems.unshift({ category: "PrintType", name: printType, unitPrice: 0, quantity: 1, total: 0 });
  return priceItems;
}
const QuotationPreview = ({ quotation, presale, onClose }) => {
  const client = presale?.client || {};
  const requirements = presale?.requirements || quotation?.details || "";
  const preparedBy = presale?.personName || "-";
  const dateIssued = quotation.dateTimeIssued ? quotation.dateTimeIssued.slice(0, 10) : "-";
  const validTill = quotation.validTill || "-";
  const clientType = presale?.clientType || "Cash";
  const priceDetails = getPriceDetails({ requirements, clientType });
  // Subtotal for all numeric line items
  const subtotal = priceDetails.reduce(
    (sum, item) =>
      typeof item.unitPrice === "number" ? sum + (item.unitPrice * (item.quantity || 1)) : sum,
    0
  );
  // Use tax/vat if you want, for now hardcoded
  const tax = 0;
  const vat = 0;
  const grandTotal =
    typeof quotation.totalAmount === "number" && quotation.totalAmount > 0
      ? quotation.totalAmount
      : subtotal + tax + vat;
  return (
    <div className={styles.previewBackdrop} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.previewBox}>
        <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        <div className={styles.header}>
          <div className={styles.logo}>
            <span ><img src={logo} alt="" /></span>
          </div>
        </div>
        <div className={styles.title}>QUOTATION</div>
        <div className={styles.quotationMeta}>
          <div className={styles.metaLeft}>
            <div><b>TO:</b></div>
            <div>{client.clientName || "--"}</div>
            <div>{client.address || "--"}</div>
            <div>{client.email || "--"}</div>
            <div>{client.phone || "--"}</div>
          </div>
          <div className={styles.metaRight}>
            <div>QUOTATION NO. : <b>{quotation.quotationNumber || "--"}</b></div>
            <div>QUOTATION DATE : <b>{dateIssued}</b></div>
            <div>VALID TILL : <b>{validTill}</b></div>
            <div>PREPARED BY : <b>{preparedBy}</b></div>
          </div>
        </div>
        <table className={styles.detailsTable}>
          <thead>
            <tr>
              <th>DETAILS</th>
              <th>QTY</th>
              <th>UNIT PRICE</th>
              <th>PRICE</th>
            </tr>
          </thead>
          <tbody>
            {priceDetails.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.quantity || 1}</td>
                <td>
                  {typeof item.unitPrice === "string"
                    ? item.unitPrice
                    : `₹${item.unitPrice?.toLocaleString()}`}
                </td>
                <td>
                  {typeof item.total === "string"
                    ? item.total
                    : `₹${item.total?.toLocaleString()}`}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} style={{ textAlign: "right" }}><b>SUBTOTAL</b></td>
              <td>₹{subtotal.toLocaleString()}</td>
            </tr>
            <tr>
              <td colSpan={3} style={{ textAlign: "right" }}>TAX</td>
              <td>₹{tax}</td>
            </tr>
            <tr>
              <td colSpan={3} style={{ textAlign: "right" }}>VAT</td>
              <td>₹{vat}</td>
            </tr>
            <tr>
              <td colSpan={3} style={{ textAlign: "right", fontWeight: "bold", color: "#f4a835" }}>TOTAL DUE</td>
              <td style={{ fontWeight: "bold", color: "#f4a835" }}>₹{grandTotal.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
        <div className={styles.signNote}>
          To accept this Quotation, please sign here and return.
        </div>
        <div className={styles.termsTitle}>TERMS & CONDITIONS:</div>
        <div className={styles.termsBody}>
          Total amount appearing on this invoice shall be paid within 10 days from the receipt therefrom.
        </div>
        <div className={styles.footer}>
          <div>Address: {client.address || "--"}</div>
          <div>Email: {client.email || "--"} | Phone: {client.phone || "--"}</div>
        </div>
      </div>
    </div>
  );
};
export default QuotationPreview;
