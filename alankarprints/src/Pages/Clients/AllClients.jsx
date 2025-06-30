import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import { Link, useLocation } from "react-router-dom";
import styles from './ClientsList.module.scss';
const links = [
  // { to: "/clients/new", label: "Add New Client" },
  { to: "/clients/list", label: "All Clients" },
  { to: "/clients/billing", label: "GST Plans & Billing" },
];
export default function ClientsList() {
  const location = useLocation();
  const { clients } = useContext(DataContext);
  const [viewClient, setViewClient] = useState(null);
  return (
    <div className={styles.mainClientsDiv}>
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
      <div className={styles.listDiv}>
        <h2>All Clients</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Client Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>View</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {clients && clients.length > 0 ? (
                clients.map((client, index) => (
                  <tr key={client.id}>
                    <td>{index + 1}</td>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>{client.address}</td>
                    <td>
                      <button
                        className={styles.viewBtn}
                        onClick={() => setViewClient(client)}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button className={styles.editBtn}>Edit</button>
                      <button className={styles.deleteBtn}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className={styles.noData}>No clients found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* View Client Popup */}
      {viewClient && (
        <div className={styles.viewPopup}>
          <div className={styles.popupContent}>
            <div className={styles.popupHeader}>
              <span className={styles.clientName}>{viewClient.name}</span>
              <button className={styles.closeBtn} onClick={() => setViewClient(null)}>×</button>
            </div>
            <div className={styles.clientDetailsCard}>
              <div className={styles.clientAvatar}>
                {viewClient.name?.slice(0,2).toUpperCase()}
              </div>
              <div className={styles.clientMainInfo}>
                <div>
                  <b>Name:</b> {viewClient.name}
                </div>
                <div>
                  <b>Mobile Number:</b> {viewClient.phone}
                </div>
              </div>
              <div className={styles.clientSideInfo}>
                <div>
                  <b>E-mail address:</b> {viewClient.email}
                </div>
                <div>
                  <b>Address:</b> {viewClient.address}
                </div>
              </div>
              <button className={styles.messageBtn}>✉️ Message</button>
            </div>
            <div className={styles.projectsSection}>
              <div className={styles.sectionTitle}>All Projects</div>
              <div className={styles.projectsTableWrapper}>
                <table className={styles.projectsTable}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Category of Work</th>
                      <th>Date</th>
                      <th>Payment</th>
                      <th>E-Mail/Mobile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Replace below with your client.projects array mapping */}
                    {(viewClient.projects || []).map((p, i) => (
                      <tr key={i}>
                        <td>#{p.id}</td>
                        <td>{p.category}</td>
                        <td>{p.date}</td>
                        <td>{p.payment}</td>
                        <td>
                          {p.email}<br />
                          <span className={styles.projectPhone}>{p.phone}</span>
                        </td>
                      </tr>
                    ))}
                    {/* Example fallback */}
                    {(!viewClient.projects || viewClient.projects.length === 0) && (
                      <tr>
                        <td colSpan="5" className={styles.noData}>No projects found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
