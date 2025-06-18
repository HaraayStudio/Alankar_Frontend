// import React, { useState, useEffect } from "react";
// import { Plus, Trash2, X, Edit, RefreshCcw } from "lucide-react";
// import { useData } from "../../context/DataContext";
// import QuotationPopup from "./Quotation";
// import styles from "./PreSalesPage.module.scss";
// // ----- Static options -----
// const printTypes = ["Wide format printing", "Digital Paper printing"];
// const wideFormatOptions = { /* ...as above... */ };
// const digitalPaperOptions = { /* ...as above... */ };
// const clientTypes = ["Cash", "Online", "Printer"];
// const statusColor = {
//   ONBOARDED: styles.statusOnboarded,
//   PENDING: styles.statusPending,
//   CREATED: styles.statusCreated,
// };
// const defaultForm = {
//   clientType: clientTypes[0], clientCategory: "new", printType: printTypes[0],
//   requirementSelections: {}, personName: "", budget: "", requirements: "",
//   approachedVia: "whatsapp", orderStartDateTime: "", orderEndDateTime: "",
//   status: "PENDING", conclusion: "",
//   client: { name: "", email: "", phone: "", address: "", clientId: "" }
// };
// const PreSalesPage = () => {
//   const {
//     presales, presalesLoading, presalesError,
//     handleGetAllPresales, handleCreatePresale, handleUpdatePresaleStatus, handleDeletePresale,
//     clients
//   } = useData();
//   const wideFormatOptions = {}
//   const digitalPaperOptions = {};
//   // ----- State -----
//   const [showModal, setShowModal] = useState(false);
//   const [showStatusPopup, setShowStatusPopup] = useState(false);
//   const [showQuotationModal, setShowQuotationModal] = useState(false);
//   const [selectedSrNumber, setSelectedSrNumber] = useState(null);
//   const [selectedQuotationPresale, setSelectedQuotationPresale] = useState(null);
//   const [statusToUpdate, setStatusToUpdate] = useState("PENDING");
//   const [formData, setFormData] = useState(defaultForm);
//   const [editMode, setEditMode] = useState(false);
//   // ----- Load presales -----
//   useEffect(() => { handleGetAllPresales(); }, []);
//   // ----- Form requirement updates -----
//   useEffect(() => { if (formData.printType) updateRequirements(); }, [formData.requirementSelections, formData.printType]);
//   const getPrintOptions = () => formData.printType === printTypes[0] ? wideFormatOptions : digitalPaperOptions;
//   // ----- Form Handlers -----
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "clientType") { setFormData(prev => ({ ...prev, clientType: value })); return; }
//     if (name === "clientCategory") {
//       setFormData(prev => ({
//         ...prev,
//         clientCategory: value,
//         client: value === "new"
//           ? { name: "", email: "", phone: "", address: "", clientId: "" }
//           : { ...prev.client, name: "", email: "", phone: "", address: "" }
//       })); return;
//     }
//     if (name === "printType") { setFormData(prev => ({ ...prev, printType: value, requirementSelections: {} })); return; }
//     if (name === "clientId") {
//       const selected = clients.find(c => `${c.id}` === value);
//       setFormData(prev => ({
//         ...prev,
//         client: {
//           ...prev.client,
//           clientId: value,
//           name: selected?.name || "",
//           email: selected?.email || "",
//           phone: selected?.phone || "",
//           address: selected?.address || ""
//         }
//       })); return;
//     }
//     if (name.startsWith("client.")) {
//       const key = name.split(".")[1];
//       setFormData(prev => ({ ...prev, client: { ...prev.client, [key]: value } })); return;
//     }
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };
//   const handleOptionSelect = (group, option) => {
//     setFormData(prev => {
//       const selections = { ...prev.requirementSelections };
//       if (selections[group]?.includes(option)) selections[group] = selections[group].filter(o => o !== option);
//       else selections[group] = [...(selections[group] || []), option];
//       return { ...prev, requirementSelections: selections };
//     });
//   };
//   const updateRequirements = () => {
//     const selections = formData.requirementSelections || {};
//     const joined = Object.values(selections).flat().join(" + ");
//     setFormData(prev => ({ ...prev, requirements: joined }));
//   };
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     if (
//       (formData.clientCategory === "new" && (!formData.client.name || !formData.client.email || !formData.client.phone)) ||
//       !formData.personName || !formData.budget || !formData.requirements || !formData.orderStartDateTime || !formData.orderEndDateTime
//     ) {
//       alert("Please fill all required fields!"); return;
//     }
//     let clientPayload = {};
//     if (formData.clientCategory === "existing") {
//       const selectedClient = clients.find(c => `${c.id}` === formData.client.clientId);
//       clientPayload = { clientId: selectedClient?.id, clientName: selectedClient?.name };
//     } else {
//       clientPayload = { name: formData.client.name, email: formData.client.email, phone: formData.client.phone, address: formData.client.address };
//     }
//     const payload = {
//       approachedVia: formData.approachedVia,
//       budget: parseFloat(formData.budget) || 0,
//       client: clientPayload,
//       conclusion: formData.conclusion,
//       orderStartDateTime: formData.orderStartDateTime,
//       orderEndDateTime: formData.orderEndDateTime,
//       personName: formData.personName,
//       requirements: formData.requirements,
//       status: formData.status,
//       clientType: formData.clientType,
//       printType: formData.printType,
//       dateTime: new Date().toISOString()
//     };
//     if (editMode && selectedSrNumber) payload.srNumber = selectedSrNumber;
//     const success = await handleCreatePresale(payload, formData.clientCategory === "existing");
//     if (success) {
//       setFormData(defaultForm); setShowModal(false); setEditMode(false); setSelectedSrNumber(null);
//       handleGetAllPresales();
//     }
//   };
//   // ----- Quotation popup handlers -----
//   const handleOpenQuotationModal = (presale) => {
//     setSelectedQuotationPresale(presale);
//     setShowQuotationModal(true);
//   };
//   // ----- ACTION BUTTONS -----
//   // Edit presale
//   const handleEditPresale = (presale) => {
//     setShowModal(true);
//     setEditMode(true);
//     setSelectedSrNumber(presale.srNumber);
//     setFormData({
//       ...defaultForm,
//       ...presale,
//       client: presale.client || defaultForm.client,
//       requirementSelections: {}, // you might want to reconstruct this if you save it
//     });
//   };
//   // Delete presale
//   const handleDeletePresaleClick = async (srNumber) => {
//     if (window.confirm("Are you sure you want to delete this presale?")) {
//       await handleDeletePresale(srNumber);
//       handleGetAllPresales();
//     }
//   };
//   // Open Status Popup
//   const handleStatusPopupOpen = (srNumber, currentStatus) => {
//     setShowStatusPopup(true);
//     setSelectedSrNumber(srNumber);
//     setStatusToUpdate(currentStatus);
//   };
//   // Status update handler
//   const handleUpdatePresaleStatusClick = async () => {
//     await handleUpdatePresaleStatus(selectedSrNumber, statusToUpdate);
//     setShowStatusPopup(false);
//     handleGetAllPresales();
//   };
//   // ----- UI -----
//   const renderClientTypeChips = () => (
//     <div>
//       <div className={styles.labelStrong}>Client Type</div>
//       <div className={styles.clientTypeChips}>
//         {clientTypes.map((type) => (
//           <button
//             type="button"
//             key={type}
//             name="clientType"
//             className={`${styles.chip} ${formData.clientType === type ? styles.chipSelected : ""}`}
//             onClick={() => setFormData(prev => ({ ...prev, clientType: type }))}
//           >
//             {type}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
//   const renderOptionGroup = (group, options) => (
//     <div className={styles.optionGroup} key={group}>
//       <div className={styles.groupTitle}>
//         {group.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}
//       </div>
//       <div className={styles.optionsWrap}>
//         {options.map(option => (
//           <button
//             type="button"
//             className={`${styles.optionChip} ${(formData.requirementSelections[group] || []).includes(option) ? styles.selected : ""}`}
//             key={option}
//             onClick={() => handleOptionSelect(group, option)}
//           >
//             {option}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
//   const tableHeaders = [
//     "S.No", "Person Name", "Company name", "Requirement", "Approached via",
//     "Started", "Ended", "Estimated Budget", "Quotation", "Status", "Conclusion", "Action"
//   ];
//   return (
//     <div className={styles.container}>
//       {/* Quotation popup */}
//       <QuotationPopup
//         open={showQuotationModal}
//         onClose={() => setShowQuotationModal(false)}
//         presale={selectedQuotationPresale}
//         onQuotationAdded={() => handleGetAllPresales()}
//       />
//       <div className={styles.header}>
//         <span className={styles.pageTitle}>Pre-Sales</span>
//         <button className={styles.addButton} onClick={() => { setShowModal(true); setEditMode(false); setFormData(defaultForm); }}>
//           <Plus size={16} /> Add Pre-sales
//         </button>
//       </div>
//       {presalesError && (
//         <div className={styles.errorMsg}>{presalesError}</div>
//       )}
//       <div className={styles.tableContainer}>
//         {presalesLoading ? (
//           <div className={styles.loading}>Loading...</div>
//         ) : (
//           <table className={styles.table}>
//             <thead>
//               <tr>
//                 {tableHeaders.map((th) => (
//                   <th key={th}>{th}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {(presales && presales.length > 0 ? presales : []).map((item, idx) => (
//                 <tr key={item.srNumber || idx}>
//                   <td>{String(idx + 1).padStart(2, "0")}</td>
//                   <td>{item.personName || "-"}</td>
//                   <td>{item.client?.clientName || "-"}</td>
//                   <td title={item.requirements}>{item.requirements?.slice(0, 28) + (item.requirements?.length > 28 ? "..." : "") || "-"}</td>
//                   <td>{item.approachedVia ? item.approachedVia[0].toUpperCase() + item.approachedVia.slice(1) : "-"}</td>
//                   <td>
//                     {item.orderStartDateTime
//                       ? new Date(item.orderStartDateTime).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
//                       : "-"}
//                   </td>
//                   <td>
//                     {item.orderEndDateTime
//                       ? new Date(item.orderEndDateTime).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
//                       : "-"}
//                   </td>
//                   <td>₹{item.budget ? item.budget.toLocaleString() : "-"}</td>
//                   <td>
//                     <button className={styles.addButtonSmall}
//                       onClick={() => handleOpenQuotationModal(item)}>
//                       Add Quotation
//                     </button>
//                   </td>
//                   <td>
//                     <span className={`${styles.statusTag} ${statusColor[item.status] || ""}`}>
//                       {item.status ? (item.status.charAt(0) + item.status.slice(1).toLowerCase()) : "-"}
//                     </span>
//                   </td>
//                   <td>{item.conclusion || "-"}</td>
//                   <td className={styles.actionsCol}>
//                     <button className={styles.iconButton} title="Update" onClick={() => handleEditPresale(item)}>
//                       <Edit size={16} />
//                     </button>
//                     <button className={styles.iconButton} title="Change Status" onClick={() => handleStatusPopupOpen(item.srNumber, item.status)}>
//                       <RefreshCcw size={16} />
//                     </button>
//                     <button className={styles.iconButton} title="Delete" onClick={() => handleDeletePresaleClick(item.srNumber)}>
//                       <Trash2 size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {(!presales || presales.length === 0) && (
//                 <tr>
//                   <td colSpan={tableHeaders.length} style={{ textAlign: "center", opacity: 0.6 }}>
//                     No data found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//       {/* Add/Update Modal */}
//       {showModal && (
//         <div className={styles.modalBackdrop} onClick={e => e.target === e.currentTarget && setShowModal(false)}>
//           <div className={styles.modalBox}>
//             <div className={styles.modalHeader}>
//               <span>Project Details</span>
//               <button className={styles.closeButton} onClick={() => setShowModal(false)}><X size={20} /></button>
//             </div>
//             <form className={styles.modalBody} onSubmit={handleFormSubmit}>
//               {/* Client category radio */}
//               <div className={styles.clientTypeRow}>
//                 <label>
//                   <input type="radio" name="clientCategory" value="new"
//                     checked={formData.clientCategory === "new"} onChange={handleInputChange} />
//                   New Client
//                 </label>
//                 <label>
//                   <input type="radio" name="clientCategory" value="existing"
//                     checked={formData.clientCategory === "existing"} onChange={handleInputChange} />
//                   Existing Client
//                 </label>
//               </div>
//               {renderClientTypeChips()}
//               {formData.clientCategory === "existing" ? (
//                 <div className={styles.inputRow}>
//                   <label>Choose Client</label>
//                   <select name="clientId" value={formData.client.clientId} onChange={handleInputChange}>
//                     <option value="">Select Client</option>
//                     {clients.map(client => (
//                       <option value={client.id} key={client.id}>{client.name} ({client.email})</option>
//                     ))}
//                   </select>
//                 </div>
//               ) : (
//                 <>
//                   <div className={styles.inputRow}>
//                     <label>Client Name</label>
//                     <input name="client.name" value={formData.client.name} onChange={handleInputChange} />
//                   </div>
//                   <div className={styles.inputRow}>
//                     <label>Email address</label>
//                     <input type="email" name="client.email" value={formData.client.email} onChange={handleInputChange} />
//                   </div>
//                   <div className={styles.inputRow}>
//                     <label>Mobile Number</label>
//                     <input name="client.phone" value={formData.client.phone} onChange={handleInputChange} />
//                   </div>
//                   <div className={styles.inputRow}>
//                     <label>Address</label>
//                     <input name="client.address" value={formData.client.address} onChange={handleInputChange} />
//                   </div>
//                 </>
//               )}
//               <div className={styles.inputRow}>
//                 <label>Person Name</label>
//                 <input name="personName" value={formData.personName} onChange={handleInputChange} />
//               </div>
//               <div className={styles.inputRow}>
//                 <label>Budget</label>
//                 <input type="number" name="budget" value={formData.budget} onChange={handleInputChange} />
//               </div>
//               <div className={styles.inputRow}>
//                 <label>Print Type</label>
//                 <select name="printType" value={formData.printType} onChange={handleInputChange}>
//                   {printTypes.map(pt => (
//                     <option value={pt} key={pt}>{pt}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className={styles.inputRow}>
//                 <label>Approached Via</label>
//                 <select name="approachedVia" value={formData.approachedVia} onChange={handleInputChange}>
//                   <option value="whatsapp">WhatsApp</option>
//                   <option value="email">E-mail</option>
//                   <option value="phone">Phone</option>
//                   <option value="linkedin">LinkedIn</option>
//                 </select>
//               </div>
//               <div className={styles.inputRow}>
//                 <label>Expected Start Date</label>
//                 <input type="datetime-local" name="orderStartDateTime" value={formData.orderStartDateTime} onChange={handleInputChange} />
//               </div>
//               <div className={styles.inputRow}>
//                 <label>Expected End Date</label>
//                 <input type="datetime-local" name="orderEndDateTime" value={formData.orderEndDateTime} onChange={handleInputChange} />
//               </div>
//               <div className={styles.optionsSection}>
//                 {Object.entries(getPrintOptions()).map(([group, options]) =>
//                   renderOptionGroup(group, options)
//                 )}
//               </div>
//               <div className={styles.inputRow}>
//                 <label>Requirement (auto-filled)</label>
//                 <input
//                   name="requirements"
//                   value={formData.requirements}
//                   onChange={handleInputChange}
//                   placeholder="Selected options will appear here"
//                   readOnly
//                   style={{ background: "#f5f5fa" }}
//                 />
//               </div>
//               <div className={styles.modalActions}>
//                 <button type="button" onClick={() => setShowModal(false)} className={styles.cancelBtn}>Cancel</button>
//                 <button type="submit" className={styles.submitBtn}>Save</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//       {console.log(presales)
//       }
//       {/* Status Popup */}
//       {showStatusPopup && (
//         <div className={styles.modalBackdrop} onClick={e => e.target === e.currentTarget && setShowStatusPopup(false)}>
//           <div className={styles.modalBox}>
//             <div className={styles.modalHeader}>
//               <span>Update Status</span>
//               <button className={styles.closeButton} onClick={() => setShowStatusPopup(false)}><X size={20} /></button>
//             </div>
//             <div className={styles.modalBody}>
//               <label>Status</label>
//               <select value={statusToUpdate} onChange={e => setStatusToUpdate(e.target.value)}>
//                 <option value="PENDING">Pending</option>
//                 <option value="ONBOARDED">Onboarded</option>
//                 <option value="CREATED">Created</option>
//               </select>
//               <div className={styles.formActions}>
//                 <button className={styles.submitBtn} onClick={handleUpdatePresaleStatusClick}>Update Status</button>
//               </div>
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
import QuotationPopup from "./Quotation";
import styles from "./PreSalesPage.module.scss";
import PRINT_PRICES from "../../printprices";
const clientTypes = Object.keys(PRINT_PRICES.clientTypes);
const printTypes = [
  "Wide format printing",
  "Digital format printing"
];
const statusColor = {
  ONBOARDED: styles.statusOnboarded,
  PENDING: styles.statusPending,
  CREATED: styles.statusCreated,
};
const defaultForm = {
  clientType: clientTypes[0],
  clientCategory: "new",
  printType: printTypes[0],
  selectedPrintType: "", // for requirement selection
  requirementSelections: {},
  personName: "",
  budget: "",
  requirements: "",
  approachedVia: "whatsapp",
  orderStartDateTime: "",
  orderEndDateTime: "",
  status: "PENDING",
  conclusion: "",
  client: { name: "", email: "", phone: "", address: "", clientId: "" }
};
function getOptionGroups(clientType, orderType) {
  return (
    PRINT_PRICES.clientTypes?.[clientType]?.orderTypes?.[orderType]?.printTypes || {}
  );
}
function getOptionCategories(printTypesObj, selectedPrintType) {
  if (!printTypesObj[selectedPrintType]) return {};
  const categories = {};
  Object.entries(printTypesObj[selectedPrintType]).forEach(([group, options]) => {
    categories[group] = options.map(opt => opt.name);
  });
  return categories;
}
const PreSalesPage = () => {
  const {
    presales, presalesLoading, presalesError,
    handleGetAllPresales, handleCreatePresale, handleUpdatePresaleStatus, handleDeletePresale,
    clients
  } = useData();
  // ----- State -----
  const [showModal, setShowModal] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [selectedSrNumber, setSelectedSrNumber] = useState(null);
  const [selectedQuotationPresale, setSelectedQuotationPresale] = useState(null);
  const [statusToUpdate, setStatusToUpdate] = useState("PENDING");
  const [formData, setFormData] = useState(defaultForm);
  const [editMode, setEditMode] = useState(false);
  // ----- Load presales -----
  useEffect(() => { handleGetAllPresales(); }, []);
  // ----- Form requirement updates -----
  useEffect(() => { if (formData.requirementSelections && formData.selectedPrintType) updateRequirements(); }, [formData.requirementSelections, formData.selectedPrintType]);
  useEffect(() => {
    // Reset selections if printType or clientType changes
    setFormData(prev => ({
      ...prev,
      selectedPrintType: "",
      requirementSelections: {},
      requirements: ""
    }));
  }, [formData.printType, formData.clientType]);
  // ----- Handlers -----
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "clientType") {
      setFormData(prev => ({ ...prev, clientType: value }));
      return;
    }
    if (name === "clientCategory") {
      setFormData(prev => ({
        ...prev,
        clientCategory: value,
        client: value === "new"
          ? { name: "", email: "", phone: "", address: "", clientId: "" }
          : { ...prev.client, name: "", email: "", phone: "", address: "" }
      })); return;
    }
    if (name === "printType") {
      setFormData(prev => ({
        ...prev,
        printType: value,
        selectedPrintType: "",
        requirementSelections: {},
        requirements: ""
      }));
      return;
    }
    if (name === "clientId") {
      const selected = clients.find(c => `${c.id}` === value);
      setFormData(prev => ({
        ...prev,
        client: {
          ...prev.client,
          clientId: value,
          name: selected?.name || "",
          email: selected?.email || "",
          phone: selected?.phone || "",
          address: selected?.address || ""
        }
      })); return;
    }
    if (name.startsWith("client.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({ ...prev, client: { ...prev.client, [key]: value } })); return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  // Requirement chip selection
  const handlePrintTypeOptionSelect = (printTypeOption) => {
    setFormData(prev => ({
      ...prev,
      selectedPrintType: printTypeOption,
      requirementSelections: {}, // reset selections
      requirements: printTypeOption // show print type as first requirement part
    }));
  };
  const handleOptionSelect = (group, option) => {
    setFormData(prev => {
      const selections = { ...prev.requirementSelections };
      if (selections[group]?.includes(option)) selections[group] = selections[group].filter(o => o !== option);
      else selections[group] = [...(selections[group] || []), option];
      return { ...prev, requirementSelections: selections };
    });
  };
  const updateRequirements = () => {
    const selections = formData.requirementSelections || {};
    // Always include the selectedPrintType first
    const joined = [
      formData.selectedPrintType,
      ...Object.values(selections).flat()
    ].filter(Boolean).join(" + ");
    setFormData(prev => ({ ...prev, requirements: joined }));
  };
 const handleFormSubmit = async (e) => {
  e.preventDefault();
  if (
    (formData.clientCategory === "new" && (!formData.client.name || !formData.client.email || !formData.client.phone)) ||
    !formData.personName || !formData.budget || !formData.requirements || !formData.orderStartDateTime || !formData.orderEndDateTime
  ) {
    alert("Please fill all required fields!"); 
    return;
  }
  let payload = {
    approachedVia: formData.approachedVia,
    budget: parseFloat(formData.budget) || 0,
    conclusion: formData.conclusion,
    orderStartDateTime: formData.orderStartDateTime,
    orderEndDateTime: formData.orderEndDateTime,
    personName: formData.personName,
    requirements: formData.requirements,
    status: formData.status,
    clientType: formData.clientType,
    printType: formData.printType,
    dateTime: new Date().toISOString()
  };
  if (formData.clientCategory === "existing") {
    // API expects clientId field for existing client
    const selectedClient = clients.find(c => `${c.id}` === formData.client.clientId);
    payload.clientId = selectedClient?.id;
  } else {
    // API expects client field (object) for new client
    payload.client = {
      name: formData.client.name,
      email: formData.client.email,
      phone: formData.client.phone,
      address: formData.client.address
    };
  }
  // If in edit mode, include srNumber
  if (editMode && selectedSrNumber) payload.srNumber = selectedSrNumber;
  // Clean up: remove client/clientId fields that should not be sent
  if (formData.clientCategory === "existing") {
    delete payload.client;
  } else {
    delete payload.clientId;
  }
  // Debug: show payload
  console.log("Submitting payload:", payload);
  // Now call the API
  const success = await handleCreatePresale(payload, formData.clientCategory === "existing");
  if (success) {
    setFormData(defaultForm); 
    setShowModal(false); 
    setEditMode(false); 
    setSelectedSrNumber(null);
    handleGetAllPresales();
  }
};
  // ----- Quotation popup handlers -----
  const handleOpenQuotationModal = (presale) => {
    setSelectedQuotationPresale(presale);
    setShowQuotationModal(true);
  };
  // ----- ACTION BUTTONS -----
  // Edit presale
  const handleEditPresale = (presale) => {
    setShowModal(true);
    setEditMode(true);
    setSelectedSrNumber(presale.srNumber);
    setFormData({
      ...defaultForm,
      ...presale,
      client: presale.client || defaultForm.client,
      selectedPrintType: "", // or reconstruct if you want to load previous selection
      requirementSelections: {},
    });
  };
  // Delete presale
  const handleDeletePresaleClick = async (srNumber) => {
    if (window.confirm("Are you sure you want to delete this presale?")) {
      await handleDeletePresale(srNumber);
      handleGetAllPresales();
    }
  };
  // Open Status Popup
  const handleStatusPopupOpen = (srNumber, currentStatus) => {
    setShowStatusPopup(true);
    setSelectedSrNumber(srNumber);
    setStatusToUpdate(currentStatus);
  };
  // Status update handler
  const handleUpdatePresaleStatusClick = async () => {
    await handleUpdatePresaleStatus(selectedSrNumber, statusToUpdate);
    setShowStatusPopup(false);
    handleGetAllPresales();
  };
  // Renderers
  const renderClientTypeChips = () => (
    <div>
      <div className={styles.labelStrong}>Client Type</div>
      <div className={styles.clientTypeChips}>
        {clientTypes.map((type) => (
          <button
            type="button"
            key={type}
            name="clientType"
            className={`${styles.chip} ${formData.clientType === type ? styles.chipSelected : ""}`}
            onClick={() => setFormData(prev => ({ ...prev, clientType: type }))}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
  const renderPrintTypeSelection = (printTypesObj) => (
    <div className={styles.optionGroup}>
      <div className={styles.groupTitle}>Select Print Type</div>
      <div className={styles.optionsWrap}>
        {Object.keys(printTypesObj).map(pt => (
          <button
            key={pt}
            type="button"
            className={`${styles.optionChip} ${formData.selectedPrintType === pt ? styles.selected : ""}`}
            onClick={() => handlePrintTypeOptionSelect(pt)}
          >
            {pt}
          </button>
        ))}
      </div>
    </div>
  );
  const renderOptionGroup = (group, options) => (
    <div className={styles.optionGroup} key={group}>
      <div className={styles.groupTitle}>
        {group.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}
      </div>
      <div className={styles.optionsWrap}>
        {options.map(option => (
          <button
            type="button"
            className={`${styles.optionChip} ${(formData.requirementSelections[group] || []).includes(option) ? styles.selected : ""}`}
            key={option}
            onClick={() => handleOptionSelect(group, option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
  const tableHeaders = [
    "S.No", "Person Name", "Company name", "Requirement", "Approached via",
    "Started", "Ended", "Estimated Budget", "Quotation", "Status", "Conclusion", "Action"
  ];
  // Derived
  const printTypesObj = getOptionGroups(formData.clientType, formData.printType);
  const optionCategories = getOptionCategories(printTypesObj, formData.selectedPrintType);
  return (
    <div className={styles.container}>
      {/* Quotation popup */}
      <QuotationPopup
        open={showQuotationModal}
        onClose={() => setShowQuotationModal(false)}
        presale={selectedQuotationPresale}
        onQuotationAdded={() => handleGetAllPresales()}
      />
      <div className={styles.header}>
        <span className={styles.pageTitle}>Pre-Sales</span>
        <button className={styles.addButton} onClick={() => { setShowModal(true); setEditMode(false); setFormData(defaultForm); }}>
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
                  <td>{item.client?.clientName || "-"}</td>
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
                    <button className={styles.addButtonSmall}
                      onClick={() => handleOpenQuotationModal(item)}>
                      Add Quotation
                    </button>
                  </td>
                  <td>
                    <span className={`${styles.statusTag} ${statusColor[item.status] || ""}`}>
                      {item.status ? (item.status.charAt(0) + item.status.slice(1).toLowerCase()) : "-"}
                    </span>
                  </td>
                  <td>{item.conclusion || "-"}</td>
                  <td className={styles.actionsCol}>
                    <button className={styles.iconButton} title="Update" onClick={() => handleEditPresale(item)}>
                      <Edit size={16} />
                    </button>
                    <button className={styles.iconButton} title="Change Status" onClick={() => handleStatusPopupOpen(item.srNumber, item.status)}>
                      <RefreshCcw size={16} />
                    </button>
                    <button className={styles.iconButton} title="Delete" onClick={() => handleDeletePresaleClick(item.srNumber)}>
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
              <span>Project Details</span>
              <button className={styles.closeButton} onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form className={styles.modalBody} onSubmit={handleFormSubmit}>
              {/* Client category radio */}
              <div className={styles.clientTypeRow}>
                <label>
                  <input type="radio" name="clientCategory" value="new"
                    checked={formData.clientCategory === "new"} onChange={handleInputChange} />
                  New Client
                </label>
                <label>
                  <input type="radio" name="clientCategory" value="existing"
                    checked={formData.clientCategory === "existing"} onChange={handleInputChange} />
                  Existing Client
                </label>
              </div>
              {renderClientTypeChips()}
              {formData.clientCategory === "existing" ? (
                <div className={styles.inputRow}>
                  <label>Choose Client</label>
                  <select name="clientId" value={formData.client.clientId} onChange={handleInputChange}>
                    <option value="">Select Client</option>
                    {clients.map(client => (
                      <option value={client.id} key={client.id}>{client.name} ({client.email})</option>
                    ))}
                  </select>
                </div>
              ) : (
                <>
                  <div className={styles.inputRow}>
                    <label>Client Name</label>
                    <input name="client.name" value={formData.client.name} onChange={handleInputChange} />
                  </div>
                  <div className={styles.inputRow}>
                    <label>Email address</label>
                    <input type="email" name="client.email" value={formData.client.email} onChange={handleInputChange} />
                  </div>
                  <div className={styles.inputRow}>
                    <label>Mobile Number</label>
                    <input name="client.phone" value={formData.client.phone} onChange={handleInputChange} />
                  </div>
                  <div className={styles.inputRow}>
                    <label>Address</label>
                    <input name="client.address" value={formData.client.address} onChange={handleInputChange} />
                  </div>
                </>
              )}
              <div className={styles.inputRow}>
                <label>Person Name</label>
                <input name="personName" value={formData.personName} onChange={handleInputChange} />
              </div>
              <div className={styles.inputRow}>
                <label>Budget</label>
                <input type="number" name="budget" value={formData.budget} onChange={handleInputChange} />
              </div>
              <div className={styles.inputRow}>
                <label>Print Type</label>
                <select name="printType" value={formData.printType} onChange={handleInputChange}>
                  {printTypes.map(pt => (
                    <option value={pt} key={pt}>{pt}</option>
                  ))}
                </select>
              </div>
              <div className={styles.inputRow}>
                <label>Approached Via</label>
                <select name="approachedVia" value={formData.approachedVia} onChange={handleInputChange}>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">E-mail</option>
                  <option value="phone">Phone</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>
              <div className={styles.inputRow}>
                <label>Expected Start Date</label>
                <input type="datetime-local" name="orderStartDateTime" value={formData.orderStartDateTime} onChange={handleInputChange} />
              </div>
              <div className={styles.inputRow}>
                <label>Expected End Date</label>
                <input type="datetime-local" name="orderEndDateTime" value={formData.orderEndDateTime} onChange={handleInputChange} />
              </div>
              {/* Dynamic requirement option selection */}
              <div className={styles.optionsSection}>
                {renderPrintTypeSelection(printTypesObj)}
                {formData.selectedPrintType &&
                  Object.entries(optionCategories).map(([group, options]) =>
                    renderOptionGroup(group, options)
                  )}
              </div>
              <div className={styles.inputRow}>
                <label>Requirement (auto-filled)</label>
                <input
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="Selected options will appear here"
                  readOnly
                  style={{ background: "#f5f5fa" }}
                />
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowModal(false)} className={styles.cancelBtn}>Cancel</button>
                <button type="submit" className={styles.submitBtn}>Save</button>
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
                <button className={styles.submitBtn} onClick={handleUpdatePresaleStatusClick}>Update Status</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PreSalesPage;
