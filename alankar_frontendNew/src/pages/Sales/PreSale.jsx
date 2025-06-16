// // PreSalesPage with full add, delete, and status update popup
// import React, { useState, useEffect } from 'react';
// import {
//   Plus, Trash2, X, Edit
// } from 'lucide-react';
// import styles from './PreSalesPage.module.scss';
// const PreSalesPage = () => {
//   const [presales, setPresales] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [showStatusPopup, setShowStatusPopup] = useState(false);
//   const [selectedSrNumber, setSelectedSrNumber] = useState(null);
//   const [statusToUpdate, setStatusToUpdate] = useState('PENDING');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     personName: '', requirements: '', approachedVia: 'whatsapp',
//     orderStartDateTime: '', orderEndDateTime: '', budget: '',
//     status: 'PENDING', conclusion: '', existingClient: false,
//     clientId: '', client: { name: '', email: '', phone: '', address: '' }
//   });
//   const [authToken, setAuthToken] = useState(() => localStorage.getItem('token') || '');
//   // const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsInVzZXJJZCI6MSwiaWF0IjoxNzUwMDcwNTQ2LCJleHAiOjE3NTAxNTY5NDZ9.ykRZ8Pn6NrwxWE85APJn70hkjSplXNYDkC0HxOsxxNI';
//  const BEARER_TOKEN = authToken;
//   const API_BASE_URL = 'http://localhost:8080/api';
//   const apiHeaders = {
//     'Authorization': `Bearer ${BEARER_TOKEN}`,
//     'Content-Type': 'application/json'
//   };
//   useEffect(() => { fetchPresales(); }, []);
//   const fetchPresales = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}/presales/getallpresales`, { headers: apiHeaders });
//       const data = await res.json();
//       setPresales(data.data || []);
//     } catch (err) {
//       setError('Failed to fetch presales');
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleDelete = async (srNumber) => {
//     if (!window.confirm('Are you sure you want to delete this presale?')) return;
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}/presales/deletepresale?srNumber=${srNumber}`, {
//         method: 'PUT', headers: apiHeaders
//       });
//       if (!res.ok) throw new Error('Delete failed');
//       await fetchPresales();
//     } catch (err) {
//       setError('Error deleting presale');
//     } finally {
//       setLoading(false);
//     }
//   };
//   const openStatusPopup = (srNumber) => {
//     setSelectedSrNumber(srNumber);
//     setShowStatusPopup(true);
//   };
//   const handleStatusUpdate = async () => {
//     if (!selectedSrNumber) return;
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}/presales/updatepresalestatus?srNumber=${selectedSrNumber}&status=${statusToUpdate}`, {
//         method: 'PUT', headers: apiHeaders
//       });
//       if (!res.ok) throw new Error('Update status failed');
//       await fetchPresales();
//       setShowStatusPopup(false);
//     } catch (err) {
//       setError('Failed to update status');
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name.startsWith('client.')) {
//       const field = name.split('.')[1];
//       setFormData(prev => ({
//         ...prev,
//         client: {
//           ...prev.client,
//           [field]: value
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//   };
//   const handleSubmit = async () => {
//     setLoading(true);
//     const endpoint = `${API_BASE_URL}/presales/createpresales?existingClient=${formData.existingClient}`;
//     const payload = {
//       personName: formData.personName,
//       requirements: formData.requirements,
//       approachedVia: formData.approachedVia,
//       orderStartDateTime: formData.orderStartDateTime,
//       orderEndDateTime: formData.orderEndDateTime,
//       budget: parseFloat(formData.budget),
//       status: formData.status,
//       conclusion: formData.conclusion,
//       client: formData.existingClient ? { id: formData.clientId } : formData.client
//     };
//     try {
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: apiHeaders,
//         body: JSON.stringify(payload)
//       });
//       if (!response.ok) throw new Error('Failed to create presale');
//       await fetchPresales();
//       setShowModal(false);
//       setFormData({
//         personName: '', requirements: '', approachedVia: 'whatsapp',
//         orderStartDateTime: '', orderEndDateTime: '', budget: '',
//         status: 'PENDING', conclusion: '', existingClient: false,
//         clientId: '', client: { name: '', email: '', phone: '', address: '' }
//       });
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1 className={styles.title}>Pre-Sales</h1>
//         <button className={styles.addButton} onClick={() => setShowModal(true)}>
//           <Plus size={18} /> Add PreSales
//         </button>
//       </div>
//       {error && <div className={styles.error}><strong>Error:</strong> {error}</div>}
//       <div className={styles.tableContainer}>
//         {loading ? (
//           <div className={styles.loading}>Loading...</div>
//         ) : (
//           <table className={styles.table}>
//             <thead className={styles.tableHeader}>
//               <tr>
//                 <th className={styles.th}>S No</th>
//                 <th className={styles.th}>Person</th>
//                 <th className={styles.th}>Company</th>
//                 <th className={styles.th}>Requirements</th>
//                 <th className={styles.th}>Status</th>
//                 <th className={styles.th}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {presales.map((item, i) => (
//                 <tr key={i}>
//                   <td className={styles.td}>{i + 1}</td>
//                   <td className={styles.td}>{item.personName}</td>
//                   <td className={styles.td}>{item.client?.name}</td>
//                   <td className={styles.td}>{item.requirements}</td>
//                   <td className={styles.td}>{item.status}</td>
//                   <td className={styles.td}>
//                     <div className={styles.actionButtons}>
//                       <button className={`${styles.actionButton} ${styles.editButton}`} onClick={() => openStatusPopup(item.srNumber)} title="Update Status"><Edit size={14} /></button>
//                       <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={() => handleDelete(item.srNumber)} title="Delete"><Trash2 size={14} /></button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//       {showModal && (
//         <div className={styles.modalBackdrop} onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
//           <div className={styles.modalBox}>
//             <div className={styles.modalHeader}>
//               <h2>Add New PreSale</h2>
//               <button onClick={() => setShowModal(false)} className={styles.closeButton}><X size={18} /></button>
//             </div>
//             <div className={styles.modalBody}>
//               <label>Person Name</label>
//               <input type="text" name="personName" value={formData.personName} onChange={handleInputChange} />
//               <label>Requirements</label>
//               <textarea name="requirements" value={formData.requirements} onChange={handleInputChange}></textarea>
//               <label>Approached Via</label>
//               <select name="approachedVia" value={formData.approachedVia} onChange={handleInputChange}>
//                 <option value="whatsapp">WhatsApp</option>
//                 <option value="email">Email</option>
//                 <option value="phone">Phone</option>
//                 <option value="linkedin">LinkedIn</option>
//               </select>
//               <label>Budget</label>
//               <input type="number" name="budget" value={formData.budget} onChange={handleInputChange} />
//               <label>Start Date & Time</label>
//               <input type="datetime-local" name="orderStartDateTime" value={formData.orderStartDateTime} onChange={handleInputChange} />
//               <label>End Date & Time</label>
//               <input type="datetime-local" name="orderEndDateTime" value={formData.orderEndDateTime} onChange={handleInputChange} />
//               <label>Status</label>
//               <select name="status" value={formData.status} onChange={handleInputChange}>
//                 <option value="PENDING">Pending</option>
//                 <option value="CREATED">Created</option>
//                 <option value="ONBOARDED">Onboarded</option>
//               </select>
//               <label>Conclusion</label>
//               <textarea name="conclusion" value={formData.conclusion} onChange={handleInputChange}></textarea>
//               <label>
//                 <input type="checkbox" name="existingClient" checked={formData.existingClient} onChange={handleInputChange} /> Existing Client
//               </label>
//               {formData.existingClient ? (
//                 <input type="text" name="clientId" placeholder="Client ID" value={formData.clientId} onChange={handleInputChange} />
//               ) : (
//                 <>
//                   <label>Client Name</label>
//                   <input type="text" name="client.name" value={formData.client.name} onChange={handleInputChange} />
//                   <label>Client Email</label>
//                   <input type="email" name="client.email" value={formData.client.email} onChange={handleInputChange} />
//                   <label>Client Phone</label>
//                   <input type="text" name="client.phone" value={formData.client.phone} onChange={handleInputChange} />
//                   <label>Client Address</label>
//                   <input type="text" name="client.address" value={formData.client.address} onChange={handleInputChange} />
//                 </>
//               )}
//               <button className={styles.submitButton} onClick={handleSubmit} disabled={loading}>
//                 {loading ? 'Submitting...' : 'Submit'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {showStatusPopup && (
//         <div className={styles.modalBackdrop} onClick={(e) => e.target === e.currentTarget && setShowStatusPopup(false)}>
//           <div className={styles.modalBox}>
//             <div className={styles.modalHeader}>
//               <h2>Update Status</h2>
//               <button onClick={() => setShowStatusPopup(false)} className={styles.closeButton}><X size={18} /></button>
//             </div>
//             <div className={styles.modalBody}>
//               <label>Status</label>
//               <select value={statusToUpdate} onChange={(e) => setStatusToUpdate(e.target.value)}>
//                 <option value="CREATED">CREATED</option>
//                 <option value="PENDING">PENDING</option>
//                 <option value="ONBOARDED">ONBOARDED</option>
//               </select>
//               <button className={styles.submitButton} onClick={handleStatusUpdate} disabled={loading}>
//                 {loading ? 'Updating...' : 'Update Status'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default PreSalesPage;
import React, { useState, useEffect } from "react";
import { Plus, Trash2, X, Edit, RefreshCcw } from "lucide-react";
import { useData } from "../../context/DataContext";
import styles from "./PreSalesPage.module.scss";
const defaultForm = {
  personName: "",
  requirements: "",
  approachedVia: "",
  orderStartDateTime: "",
  orderEndDateTime: "",
  budget: "",
  status: "",
  conclusion: "",
  client: {
    name: "",
    email: "",
    phone: "",
    address: ""
  }
};
const statusColor = {
  "ONBOARDED": styles.statusOnboarded,
  "PENDING": styles.statusPending,
  "CREATED": styles.statusCreated,
};
const PreSalesPage = () => {
  const {
    presales,
    presalesLoading,
    presalesError,
    handleGetAllPresales,
    handleCreatePresale,
    handleUpdatePresaleStatus,
    handleDeletePresale,
  } = useData();
  const [showModal, setShowModal] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [selectedSrNumber, setSelectedSrNumber] = useState(null);
  const [statusToUpdate, setStatusToUpdate] = useState("PENDING");
  const [formData, setFormData] = useState(defaultForm);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    handleGetAllPresales();
    // eslint-disable-next-line
  }, []);
  // Open edit modal
  const openEditModal = (item) => {
    setEditMode(true);
    setFormData({
      personName: item.personName || "",
      requirements: item.requirements || "",
      approachedVia: item.approachedVia || "",
      orderStartDateTime: item.orderStartDateTime ? item.orderStartDateTime.slice(0,16) : "",
      orderEndDateTime: item.orderEndDateTime ? item.orderEndDateTime.slice(0,16) : "",
      budget: item.budget || "",
      status: item.status || "",
      conclusion: item.conclusion || "",
      client: {
        name: item.client?.name || "",
        email: item.client?.email || "",
        phone: item.client?.phone || "",
        address: item.client?.address || "",
      }
    });
    setSelectedSrNumber(item.srNumber);
    setShowModal(true);
  };
  // Open add modal
  const openAddModal = () => {
    setEditMode(false);
    setFormData(defaultForm);
    setSelectedSrNumber(null);
    setShowModal(true);
  };
  // Handle add/update form change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("client.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        client: { ...prev.client, [key]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  // Add or update submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.personName ||
      !formData.client.name ||
      !formData.requirements ||
      !formData.approachedVia ||
      !formData.orderStartDateTime ||
      !formData.orderEndDateTime ||
      !formData.budget ||
      !formData.status ||
      !formData.conclusion
    ) {
      alert("Please fill all required fields!");
      return;
    }
    const payload = {
      ...formData,
      budget: parseFloat(formData.budget) || 0,
    };
    let success = false;
    if (editMode && selectedSrNumber) {
      // For update: reuse createPresale API, but with srNumber in payload (if API supports updating)
      // If you have a dedicated updatePresale API, use that instead
      payload.srNumber = selectedSrNumber;
      success = await handleCreatePresale(payload, false);
    } else {
      success = await handleCreatePresale(payload, false);
    }
    if (success) {
      setFormData(defaultForm);
      setShowModal(false);
      setEditMode(false);
      setSelectedSrNumber(null);
    }
  };
  // For status update popup
  const openStatusPopup = (srNumber, currentStatus) => {
    setSelectedSrNumber(srNumber);
    setStatusToUpdate(currentStatus || "PENDING");
    setShowStatusPopup(true);
  };
  const handleStatusUpdateClick = async () => {
    if (!selectedSrNumber || !statusToUpdate) return;
    const success = await handleUpdatePresaleStatus(selectedSrNumber, statusToUpdate);
    if (success) setShowStatusPopup(false);
  };
  // Delete
  const handleDelete = async (srNumber) => {
    if (window.confirm("Are you sure you want to delete this presale?")) {
      await handleDeletePresale(srNumber);
    }
  };
  // Table headers
  const tableHeaders = [
    "S.No", "Person Name", "Company name", "Requirement", "Approached via",
    "Started", "Ended", "Estimated Budget", "Status", "Conclusion", "Action"
  ];
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.pageTitle}>Pre-Sales</span>
        <button className={styles.addButton} onClick={openAddModal}>
          <Plus size={16} /> Add Pre-sales
        </button>
      </div>
      {presalesError && (
        <div className={styles.errorMsg}>{presalesError}</div>
      )}
      <div className={styles.tableContainer}>
        {presalesLoading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                {tableHeaders.map((th) => (
                  <th key={th}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(presales && presales.length > 0 ? presales : []).map((item, idx) => (
                <tr key={item.srNumber || idx}>
                  <td>{String(idx + 1).padStart(2, "0")}</td>
                  <td>{item.personName || "-"}</td>
                  <td>{item.client?.name || "-"}</td>
                  <td title={item.requirements}>{item.requirements?.slice(0, 28) + (item.requirements?.length > 28 ? "..." : "") || "-"}</td>
                  <td>{item.approachedVia ? item.approachedVia[0].toUpperCase() + item.approachedVia.slice(1) : "-"}</td>
                  <td>
                    {item.orderStartDateTime
                      ? new Date(item.orderStartDateTime).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
                      : "-"}
                  </td>
                  <td>
                    {item.orderEndDateTime
                      ? new Date(item.orderEndDateTime).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
                      : "-"}
                  </td>
                  <td>₹{item.budget ? item.budget.toLocaleString() : "-"}</td>
                  <td>
                    <span className={`${styles.statusTag} ${statusColor[item.status] || ""}`}>
                      {item.status ? (item.status.charAt(0) + item.status.slice(1).toLowerCase()) : "-"}
                    </span>
                  </td>
                  <td>{item.conclusion || "-"}</td>
                  <td className={styles.actionsCol}>
                    <button
                      className={styles.iconButton}
                      onClick={() => openEditModal(item)}
                      title="Update"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className={styles.iconButton}
                      onClick={() => openStatusPopup(item.srNumber, item.status)}
                      title="Change Status"
                    >
                      <RefreshCcw size={16} />
                    </button>
                    <button
                      className={styles.iconButton}
                      onClick={() => handleDelete(item.srNumber)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {(!presales || presales.length === 0) && (
                <tr>
                  <td colSpan={tableHeaders.length} style={{ textAlign: "center", opacity: 0.6 }}>
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {/* Add/Update Modal */}
      {showModal && (
        <div className={styles.modalBackdrop} onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className={styles.modalBox}>
            <div className={styles.modalHeader}>
              <span>Project Name</span>
              <button className={styles.closeButton} onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form className={styles.modalBody} onSubmit={handleFormSubmit}>
              <div className={styles.inputRow}>
                <div>
                  <label>Person Name *</label>
                  <input type="text" name="personName" value={formData.personName} onChange={handleInputChange} required />
                </div>
                <div>
                  <label>Company Name *</label>
                  <input type="text" name="client.name" value={formData.client.name} onChange={handleInputChange} required />
                </div>
              </div>
              <div className={styles.inputRow}>
                <div>
                  <label>Requirement *</label>
                  <input type="text" name="requirements" value={formData.requirements} onChange={handleInputChange} required />
                </div>
                <div>
                  <label>Approached via *</label>
                  <select name="approachedVia" value={formData.approachedVia} onChange={handleInputChange} required>
                    <option value="">Select</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">E-mail</option>
                    <option value="phone">Phone</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                </div>
              </div>
              <div className={styles.inputRow}>
                <div>
                  <label>Starting Date *</label>
                  <input type="datetime-local" name="orderStartDateTime" value={formData.orderStartDateTime} onChange={handleInputChange} required />
                </div>
                <div>
                  <label>Ending Date *</label>
                  <input type="datetime-local" name="orderEndDateTime" value={formData.orderEndDateTime} onChange={handleInputChange} required />
                </div>
              </div>
              <div className={styles.inputRow}>
                <div>
                  <label>Budget *</label>
                  <input type="number" name="budget" value={formData.budget} onChange={handleInputChange} required />
                </div>
                <div>
                  <label>Status *</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} required>
                    <option value="">Select</option>
                    <option value="PENDING">Pending</option>
                    <option value="ONBOARDED">Onboarded</option>
                    <option value="CREATED">Created</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Conclusion *</label>
                <input type="text" name="conclusion" value={formData.conclusion} onChange={handleInputChange} required />
              </div>
              <div className={styles.formActions}>
                <button type="button" onClick={() => setShowModal(false)} className={styles.cancelBtn}>Cancel</button>
                <button type="submit" className={styles.submitBtn}>
                  {editMode ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Status Popup */}
      {showStatusPopup && (
        <div className={styles.modalBackdrop} onClick={e => e.target === e.currentTarget && setShowStatusPopup(false)}>
          <div className={styles.modalBox}>
            <div className={styles.modalHeader}>
              <span>Update Status</span>
              <button className={styles.closeButton} onClick={() => setShowStatusPopup(false)}><X size={20} /></button>
            </div>
            <div className={styles.modalBody}>
              <label>Status</label>
              <select value={statusToUpdate} onChange={e => setStatusToUpdate(e.target.value)}>
                <option value="PENDING">Pending</option>
                <option value="ONBOARDED">Onboarded</option>
                <option value="CREATED">Created</option>
              </select>
              <div className={styles.formActions}>
                <button className={styles.submitBtn} onClick={handleStatusUpdateClick}>Update Status</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PreSalesPage;
