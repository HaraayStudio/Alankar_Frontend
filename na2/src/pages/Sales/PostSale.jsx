import React, { useState, useEffect } from "react";
import {
  Plus, Eye, Edit, Trash2, X
} from "lucide-react";
import styles from "./PostSalesPage.module.scss";
import InvoiceListPopup from "./InvoiceListPopup.jsx";
import { Link, useLocation } from "react-router-dom";
const links = [
  { to: "/sales/presale", label: "Pre-sales" },
  { to: "/sales/postsale", label: "Post sales" },
];
// Helper functions
const formatDate = (dateString) =>
  dateString ? new Date(dateString).toLocaleDateString("en-GB") : "-";
const formatTime = (dateString) =>
  dateString ? new Date(dateString).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "-";
// UI for status badge
const StatusBadge = ({ status }) => (
  <span className={`${styles.statusBadge} ${status?.toLowerCase() === "onboarded" ? styles.statusOnboarded : styles.statusPending}`}>
    {status ? status.charAt(0) + status.slice(1).toLowerCase() : "Pending"}
  </span>
);
const API_BASE_URL = 'http://localhost:8080/api'; // your API endpoint
const PostSalesPage = () => {
  const [postsales, setPostsales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showInvoices, setShowInvoices] = useState(null); // postsale object or null
  // Fetch postsale data
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/postsales/getallpostsales`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    })
      .then(res => res.json())
      .then(res => {
        const arr =
          Array.isArray(res) ? res :
          res.data && Array.isArray(res.data) ? res.data :
          res.result && Array.isArray(res.result) ? res.result : [];
        setPostsales(arr);
      })
      .catch(() => setPostsales([]))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className={styles.container}>
         <div className={styles.headerBox}>
        <div className={styles.buttonDiv}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={
                location.pathname === link.to
                  ? `${styles.backButton} ${styles.activeButton}`
                  : styles.backButton
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.postSaleDiv}>
      <div className={styles.header}>
      <span className={styles.pageTitle}>Post-Sales</span>
        <button className={styles.addButton}><Plus size={18} />Add PostSales</button>
      </div>
      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S No</th>
                <th>Client Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Order Description</th>
                <th>Order Start</th>
                <th>Order End</th>
                <th>Estimated Quote</th>
                <th>Negotiation Price</th>
                <th>Final Amt (No GST)</th>
                <th>GST %</th>
                <th>Total Amt (With GST)</th>
                <th>Status</th>
                <th>Remark</th>
                <th>Invoices</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {postsales.map((item, idx) => (
                <tr key={item.srNumber || idx}>
                  <td>{item.srNumber || String(idx + 1).padStart(2, "0")}</td>
                  <td>{item.client?.clientName || '-'}</td>
                  <td>{item.client?.email || '-'}</td>
                  <td>{item.client?.phone || '-'}</td>
                  <td>{item.order?.description || '-'}</td>
                  <td>{item.order?.startDateTime ? `${formatDate(item.order.startDateTime)} ${formatTime(item.order.startDateTime)}` : '-'}</td>
                  <td>{item.order?.endDateTime ? `${formatDate(item.order.endDateTime)} ${formatTime(item.order.endDateTime)}` : '-'}</td>
                  <td>{item.estimatedQuote ? `₹${item.estimatedQuote.toLocaleString()}` : '-'}</td>
                  <td>{item.negotiationPrice ? `₹${item.negotiationPrice.toLocaleString()}` : '-'}</td>
                  <td>{item.finalAmtWithOutGST ? `₹${item.finalAmtWithOutGST.toLocaleString()}` : '-'}</td>
                  <td>{item.gstPercentage ? `${item.gstPercentage}%` : '-'}</td>
                  <td>{item.totalAmtWithGST ? `₹${item.totalAmtWithGST.toLocaleString()}` : '-'}</td>
                  <td><StatusBadge status={item.order?.status} /></td>
                  <td>{item.remark || '-'}</td>
                  <td>
                    <button
                      className={styles.invoiceBtn}
                      onClick={() => setShowInvoices(item)}
                    >
                      Invoices
                    </button>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button className={styles.iconBtn}><Eye size={14} /></button>
                      <button className={styles.iconBtn}><Edit size={14} /></button>
                      <button className={styles.iconBtn}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!postsales.length && <tr><td colSpan={16} className={styles.noData}>No data found</td></tr>}
            </tbody>
          </table>
        )}
      </div>
      </div>
      {/* Invoice List Popup */}
      {showInvoices && (
        <InvoiceListPopup
  open={!!showInvoices}
  postsale={showInvoices}
  onClose={() => setShowInvoices(null)}
/>
      )}
    </div>
  );
};
export default PostSalesPage;
// import React, { useState } from "react";
// import { Plus, Eye, Edit, Trash2 } from "lucide-react";
// import styles from "./PostSalesPage.module.scss";
// import InvoiceListPopup from "./InvoiceListPopup.jsx";
// import { useData } from "../../context/DataContext";
// import { Link, useLocation } from "react-router-dom";
// // Navigation links
// const links = [
//   { to: "/sales/presale", label: "Pre-sales" },
//   { to: "/sales/postsale", label: "Post sales" },
// ];
// // Helper: Date/time formatting
// const formatDate = (dateString) =>
//   dateString ? new Date(dateString).toLocaleDateString("en-GB") : "-";
// const formatTime = (dateString) =>
//   dateString ? new Date(dateString).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "-";
// // Helper: Status badge
// const StatusBadge = ({ status }) => (
//   <span
//     className={`${styles.statusBadge} ${
//       status?.toLowerCase() === "onboarded"
//         ? styles.statusOnboarded
//         : styles.statusPending
//     }`}
//   >
//     {status ? status.charAt(0) + status.slice(1).toLowerCase() : "Pending"}
//   </span>
// );
// const PostSalesPage = () => {
//   const location = useLocation();
//   const { clients } = useData();
//   const [showInvoices, setShowInvoices] = useState(null);
//   // Flatten postsales from clients for display
//   let postsales = [];
//   clients?.forEach((client) => {
//     if (Array.isArray(client.postsales)) {
//       client.postsales.forEach((ps) => {
//         postsales.push({
//           ...ps,
//           client: {
//             clientName: client.name || client.clientName,
//             email: client.email,
//             phone: client.phone,
//           },
//         });
//       });
//     }
//   });
//   // Dummy fallback for no data (remove in production)
//   if (postsales.length === 0) {
//     postsales = [
//       {
//         srNumber: 1,
//         client: { clientName: "Amit Shah", email: "amit@abc.com", phone: "9876543210" },
//         order: { description: "Flex Board Printing", startDateTime: "2024-06-21T09:00:00", endDateTime: "2024-06-22T16:00:00", status: "Onboarded" },
//         estimatedQuote: 5200,
//         negotiationPrice: 4800,
//         finalAmtWithOutGST: 4500,
//         gstPercentage: 18,
//         totalAmtWithGST: 5310,
//         remark: "Payment Pending",
//         invoices: [{ id: 1, url: "#" }]
//       }
//     ];
//   }
//   return (
//     <div className={styles.container}>
//       {/* Header Navigation */}
//       <div className={styles.headerBox}>
//         <div className={styles.buttonDiv}>
//           {links.map((link) => (
//             <Link
//               key={link.to}
//               to={link.to}
//               className={
//                 location.pathname === link.to
//                   ? `${styles.backButton} ${styles.activeButton}`
//                   : styles.backButton
//               }
//             >
//               {link.label}
//             </Link>
//           ))}
//         </div>
//       </div>
//       {/* Page Title */}
//       <div className={styles.header}>
//         <span className={styles.pageTitle}>Post-Sales</span>
//         <button className={styles.addButton}><Plus size={18} /> Add PostSales</button>
//       </div>
//       {/* Data Table */}
//       <div className={styles.tableContainer}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>S No</th>
//               <th>Client Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Order Description</th>
//               <th>Order Start</th>
//               <th>Order End</th>
//               <th>Estimated Quote</th>
//               <th>Negotiation Price</th>
//               <th>Final Amt (No GST)</th>
//               <th>GST %</th>
//               <th>Total Amt (With GST)</th>
//               <th>Status</th>
//               <th>Remark</th>
//               <th>Invoices</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {postsales.map((item, idx) => (
//               <tr key={item.srNumber || idx}>
//                 <td>{item.srNumber || String(idx + 1).padStart(2, "0")}</td>
//                 <td>{item.client?.clientName || '-'}</td>
//                 <td>{item.client?.email || '-'}</td>
//                 <td>{item.client?.phone || '-'}</td>
//                 <td>{item.order?.description || '-'}</td>
//                 <td>
//                   {item.order?.startDateTime
//                     ? `${formatDate(item.order.startDateTime)} ${formatTime(item.order.startDateTime)}`
//                     : '-'}
//                 </td>
//                 <td>
//                   {item.order?.endDateTime
//                     ? `${formatDate(item.order.endDateTime)} ${formatTime(item.order.endDateTime)}`
//                     : '-'}
//                 </td>
//                 <td>{item.estimatedQuote ? `₹${item.estimatedQuote.toLocaleString()}` : '-'}</td>
//                 <td>{item.negotiationPrice ? `₹${item.negotiationPrice.toLocaleString()}` : '-'}</td>
//                 <td>{item.finalAmtWithOutGST ? `₹${item.finalAmtWithOutGST.toLocaleString()}` : '-'}</td>
//                 <td>{item.gstPercentage ? `${item.gstPercentage}%` : '-'}</td>
//                 <td>{item.totalAmtWithGST ? `₹${item.totalAmtWithGST.toLocaleString()}` : '-'}</td>
//                 <td><StatusBadge status={item.order?.status} /></td>
//                 <td>{item.remark || '-'}</td>
//                 <td>
//                   <button
//                     className={styles.invoiceBtn}
//                     onClick={() => setShowInvoices(item)}
//                   >
//                     Invoices
//                   </button>
//                 </td>
//                 <td>
//                   <div className={styles.actionButtons}>
//                     <button className={styles.iconBtn}><Eye size={14} /></button>
//                     <button className={styles.iconBtn}><Edit size={14} /></button>
//                     <button className={styles.iconBtn}><Trash2 size={14} /></button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//             {!postsales.length && (
//               <tr>
//                 <td colSpan={16} className={styles.noData}>No data found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       {/* Invoice List Popup */}
//       {showInvoices && (
//         <InvoiceListPopup
//           open={!!showInvoices}
//           postsale={showInvoices}
//           onClose={() => setShowInvoices(null)}
//         />
//       )}
//     </div>
//   );
// };
// export default PostSalesPage;
