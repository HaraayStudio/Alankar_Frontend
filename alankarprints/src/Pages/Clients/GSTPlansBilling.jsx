import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./GSTPlansBilling.module.scss";
import { Eye, Edit, Trash2 } from "lucide-react"; // Use your icon library
const links = [
  // { to: "/clients/new", label: "Add new client" },
  { to: "/clients/list", label: "All Clients" },
  { to: "/clients/billing", label: "GST Plans & Billing" },
];
const DUMMY_LIST = [
  {
    gstNo: "#INNV05505",
    customerName: "David Andrews",
    createdOn: "22 Feb, 2025",
    amount: "₹15,000",
    paid: "₹5,000",
    status: "Completed",
    paymentMode: "Cash",
    dueDate: "22 Dec, 2025",
  },
  {
    gstNo: "#INNV05505",
    customerName: "David Andrews",
    createdOn: "22 Feb, 2025",
    amount: "₹15,000",
    paid: "₹5,000",
    status: "Pending",
    paymentMode: "Cash",
    dueDate: "22 Dec, 2025",
  },
  // ...repeat or vary more rows as you need
];
export default function GSTPlansBilling() {
  const location = useLocation();
  return (
    <div className={styles.mainBillingDiv}>
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
      <div className={styles.billingListDiv}>
        <h2>GST Plans & Billing</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>GST NO.</th>
                <th>Customer Name</th>
                <th>Created On</th>
                <th>Amount</th>
                <th>Paid</th>
                <th>Status</th>
                <th>Payment Mode</th>
                <th>Due Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {DUMMY_LIST.map((item, idx) => (
                <tr key={idx}>
                  <td>{String(idx + 1).padStart(2, "0")}</td>
                  <td>{item.gstNo}</td>
                  <td>{item.customerName}</td>
                  <td>{item.createdOn}</td>
                  <td>{item.amount}</td>
                  <td>{item.paid}</td>
                  <td>
                    <span
                      className={
                        item.status === "Completed"
                          ? styles.statusCompleted
                          : styles.statusPending
                      }
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.paymentMode}</td>
                  <td>{item.dueDate}</td>
                  <td>
                    <button className={styles.actionBtn} title="View">
                      <Eye size={18} />
                    </button>
                    <button className={styles.actionBtn} title="Edit">
                      <Edit size={18} />
                    </button>
                    <button className={styles.actionBtn} title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
