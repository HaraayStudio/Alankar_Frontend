// import React, { useState, useEffect } from "react";
// import { Plus, Trash2, X, Edit, RefreshCcw } from "lucide-react";
// import { useData } from "../../context/DataContext";
// import QuotationPopup from "./Quotation";
// import styles from "./PreSalesPage.module.scss";
// import PRINT_PRICES from "../../printprices";
// // Utility to get the cost of an option for the given group & type
// function getOptionCost(clientType, orderType, selectedPrintType, group, optionName) {
//   try {
//     const groupData = PRINT_PRICES.clientTypes[clientType]?.orderTypes?.[orderType]?.printTypes?.[selectedPrintType];
//     if (!groupData) return 0;
//     const groupKey = Object.keys(groupData).find(k => k.toLowerCase() === group.toLowerCase());
//     if (!groupKey) return 0;
//     const arr = groupData[groupKey];
//     if (!Array.isArray(arr)) return 0;
//     const found = arr.find(i => i.name.toLowerCase() === optionName.toLowerCase());
//     if (found) {
//       if (typeof found.cost === "number") return found.cost;
//       if (typeof found.costCMYK === "number") return found.costCMYK;
//       if (typeof found.costCMYKW === "number") return found.costCMYKW;
//     }
//   } catch (err) { return 0; }
//   return 0;
// }
// const clientTypes = Object.keys(PRINT_PRICES.clientTypes);
// const printTypes = ["Wide format printing", "Digital format printing"];
// const statusColor = {
//   ONBOARDED: styles.statusOnboarded,
//   PENDING: styles.statusPending,
//   CREATED: styles.statusCreated,
// };
// const defaultForm = {
//   clientType: clientTypes[0],
//   clientCategory: "new",
//   selectedPrintType: "",
//   requirementSelections: {},
//   personName: "",
//   budget: "",
//   requirementsSteps: {},
//     qty: 1,
//     printType: printType[0],
//   material: "",
//   requirements: "",
//   approachedVia: "whatsapp",
//   orderStartDateTime: "",
//   orderEndDateTime: "",
//   status: "PENDING",
//   conclusion: "",
//   client: { name: "", email: "", phone: "", address: "", clientId: "" },
// };
// // Utility: get all print type option groups
// function getOptionGroups(clientType, orderType) {
//   return (
//     PRINT_PRICES.clientTypes?.[clientType]?.orderTypes?.[orderType]?.printTypes || {}
//   );
// }
// // Utility: group options as {group: [name, ...]}
// function getOptionCategories(printTypesObj, selectedPrintType) {
//   if (!printTypesObj[selectedPrintType]) return {};
//   const categories = {};
//   Object.entries(printTypesObj[selectedPrintType]).forEach(
//     ([group, options]) => {
//       categories[group] = options.map((opt) => opt.name);
//     }
//   );
//   return categories;
// }
// // Build requirements string from current selections (for display)
// function buildRequirementsString(selectedPrintType, selections) {
//   // Only collect names (skip qty)
//   const selectedGroups = Object.entries(selections)
//     .filter(([k]) => k !== "qty")
//     .flatMap(([group, arr]) => (arr || []).map(i => i.name));
//   // Example: "Eco solvent + Vinyl + No lamination + 3mm Foam sheet + Drilling on wall"
//   return [
//     selectedPrintType,
//     ...selectedGroups
//   ].filter(Boolean).join(" + ");
// }
// // Build requirementsSteps object for API
// function buildRequirementsSteps(selectedPrintType, selections) {
//   // Format: { PrintType: [{name, cost}], Media: [...], ... }
//   const steps = {};
//   if (selectedPrintType) {
//     steps["PrintType"] = [{ name: selectedPrintType, cost: getOptionCostFromPrintType(selectedPrintType, selections) }];
//   }
//   Object.entries(selections).forEach(([group, arr]) => {
//     if (group === "qty") return;
//     steps[group] = arr.map(i => ({ name: i.name, cost: i.cost }));
//   });
//   return steps;
// }
// // (Optional) If you want to attach a cost to the selectedPrintType group
// function getOptionCostFromPrintType(selectedPrintType, selections) {
//   // Look for PrintType cost (in most cases, this is found in the array of selections)
//   for (const arr of Object.values(selections)) {
//     if (Array.isArray(arr)) {
//       const found = arr.find(i => i.name === selectedPrintType && typeof i.cost === "number");
//       if (found) return found.cost;
//     }
//   }
//   return 0;
// }
// const PreSalesPage = () => {
//   const {
//     presales,
//     presalesLoading,
//     presalesError,
//     handleGetAllPresales,
//     handleCreatePresale,
//     handleUpdatePresaleStatus,
//     handleDeletePresale,
//     clients,
//   } = useData();
//   // ----- State -----
//   const [showModal, setShowModal] = useState(false);
//   const [showStatusPopup, setShowStatusPopup] = useState(false);
//   const [showQuotationModal, setShowQuotationModal] = useState(false);
//   const [selectedSrNumber, setSelectedSrNumber] = useState(null);
//   const [selectedQuotationPresale, setSelectedQuotationPresale] = useState(null);
//   const [statusToUpdate, setStatusToUpdate] = useState("PENDING");
//   const [formData, setFormData] = useState(defaultForm);
//   const [editMode, setEditMode] = useState(false);
//   useEffect(() => { handleGetAllPresales(); }, []);
//   // Reset on printType/clientType change
//   useEffect(() => {
//     setFormData((prev) => ({
//       ...prev,
//       selectedPrintType: "",
//       requirementSelections: {},
//       requirements: "",
//       requirementsSteps: {},
//       qty: 1
//     }));
//   }, [formData.printType, formData.clientType]);
//   // ----------- Option selection handlers -----------
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "clientType") {
//       setFormData((prev) => ({ ...prev, clientType: value }));
//       return;
//     }
//     if (name === "clientCategory") {
//       setFormData((prev) => ({
//         ...prev,
//         clientCategory: value,
//         client:
//           value === "new"
//             ? { name: "", email: "", phone: "", address: "", clientId: "" }
//             : { ...prev.client, name: "", email: "", phone: "", address: "" },
//       }));
//       return;
//     }
//     if (name === "printType") {
//       setFormData((prev) => ({
//         ...prev,
//         printType: value,
//         selectedPrintType: "",
//         requirementSelections: {},
//         requirements: "",
//         requirementsSteps: {},
//         qty: 1,
//       }));
//       return;
//     }
//     if (name === "clientId") {
//       const selected = clients.find((c) => `${c.id}` === value);
//       setFormData((prev) => ({
//         ...prev,
//         client: {
//           ...prev.client,
//           clientId: value,
//           name: selected?.name || "",
//           email: selected?.email || "",
//           phone: selected?.phone || "",
//           address: selected?.address || "",
//         },
//       }));
//       return;
//     }
//     if (name.startsWith("client.")) {
//       const key = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         client: { ...prev.client, [key]: value },
//       }));
//       return;
//     }
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
//   // Print type main selection (reset others)
//   const handlePrintTypeOptionSelect = (printTypeOption) => {
//     setFormData((prev) => ({
//       ...prev,
//       selectedPrintType: printTypeOption,
//       requirementSelections: {},
//       requirements: printTypeOption,
//       requirementsSteps: {},
//       qty: 1,
//     }));
//   };
//   // Option group item select/deselect
//   const handleOptionSelect = (group, option) => {
//     setFormData((prev) => {
//       const selections = { ...prev.requirementSelections };
//       const cost = getOptionCost(
//         prev.clientType,
//         prev.printType,
//         prev.selectedPrintType,
//         group,
//         option
//       );
//       if (!selections[group]) selections[group] = [];
//       const exists = selections[group].find(x => x.name === option);
//       if (exists) {
//         selections[group] = selections[group].filter(x => x.name !== option);
//       } else {
//         selections[group].push({ name: option, cost });
//       }
//       // Always update requirements string and steps after option changes
//       return {
//         ...prev,
//         requirementSelections: { ...selections, qty: prev.qty },
//         requirements: buildRequirementsString(prev.selectedPrintType, selections),
//         requirementsSteps: buildRequirementsSteps(prev.selectedPrintType, selections)
//       };
//     });
//   };
//   // Quantity input
//   const handleQtyChange = (e) => {
//     const value = Math.max(1, Number(e.target.value));
//     setFormData(prev => {
//       const selections = { ...prev.requirementSelections, qty: value };
//       return {
//         ...prev,
//         qty: value,
//         requirementSelections: selections,
//         requirements: buildRequirementsString(prev.selectedPrintType, selections),
//         requirementsSteps: buildRequirementsSteps(prev.selectedPrintType, selections)
//       };
//     });
//   };
//   // ----------- FORM SUBMIT -----------
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     if (
//       (formData.clientCategory === "new" &&
//         (!formData.client.name || !formData.client.email || !formData.client.phone)) ||
//       !formData.personName ||
//       !formData.budget ||
//       !formData.requirements ||
//       !formData.orderStartDateTime ||
//       !formData.orderEndDateTime
//     ) {
//       alert("Please fill all required fields!");
//       return;
//     }
//     let payload = {
//       approachedVia: formData.approachedVia,
//       budget: parseFloat(formData.budget) || 0,
//       conclusion: formData.conclusion,
//       orderStartDateTime: formData.orderStartDateTime,
//       orderEndDateTime: formData.orderEndDateTime,
//       personName: formData.personName,
//       requirements: formData.requirements,
//       requirementsSteps: formData.requirementsSteps,
//       status: formData.status,
//       qty: formData.qty,
//       clientType: formData.clientType,
//       printType: formData.printType,
//       dateTime: new Date().toISOString(),
//     };
//     if (formData.clientCategory === "existing") {
//       const selectedClient = clients.find((c) => `${c.id}` === formData.client.clientId);
//       payload.clientId = selectedClient?.id;
//     } else {
//       payload.client = {
//         name: formData.client.name,
//         email: formData.client.email,
//         phone: formData.client.phone,
//         address: formData.client.address,
//       };
//     }
//     if (editMode && selectedSrNumber) payload.srNumber = selectedSrNumber;
//     if (formData.clientCategory === "existing") {
//       delete payload.client;
//     } else {
//       delete payload.clientId;
//     }
//     // Debug: show payload
//     console.log("Submitting payload:", payload);
//     const success = await handleCreatePresale(
//       payload,
//       formData.clientCategory === "existing"
//     );
//     if (success) {
//       setFormData(defaultForm);
//       setShowModal(false);
//       setEditMode(false);
//       setSelectedSrNumber(null);
//       handleGetAllPresales();
//     }
//   };
//   // ----------- QUOTATION MODAL HANDLERS -----------
//   const handleOpenQuotationModal = (presale) => {
//     setSelectedQuotationPresale(presale);
//     setShowQuotationModal(true);
//   };
//   // ----------- EDIT/DELETE STATUS HANDLERS -----------
//   const handleEditPresale = (presale) => {
//     setShowModal(true);
//     setEditMode(true);
//     setSelectedSrNumber(presale.srNumber);
//     setFormData({
//       ...defaultForm,
//       ...presale,
//       client: presale.client || defaultForm.client,
//       selectedPrintType: "", // If you want to reconstruct, you can add logic here
//       requirementSelections: {},
//       requirementsSteps: {},
//     });
//   };
//   const handleDeletePresaleClick = async (srNumber) => {
//     if (window.confirm("Are you sure you want to delete this presale?")) {
//       await handleDeletePresale(srNumber);
//       handleGetAllPresales();
//     }
//   };
//   const handleStatusPopupOpen = (srNumber, currentStatus) => {
//     setShowStatusPopup(true);
//     setSelectedSrNumber(srNumber);
//     setStatusToUpdate(currentStatus);
//   };
//   const handleUpdatePresaleStatusClick = async () => {
//     await handleUpdatePresaleStatus(selectedSrNumber, statusToUpdate);
//     setShowStatusPopup(false);
//     handleGetAllPresales();
//   };
//   // ----------- RENDERERS -----------
//   const renderOptionGroup = (group, options) => (
//     <div className={styles.optionGroup} key={group}>
//       <div className={styles.groupTitle}>
//         {group.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
//       </div>
//       <div className={styles.optionsWrap}>
//         {options.map((option) => {
//           const selected = (formData.requirementSelections[group] || []).some(x => x.name === option);
//           return (
//             <button
//               type="button"
//               className={`${styles.optionChip} ${selected ? styles.selected : ""}`}
//               key={option}
//               onClick={() => handleOptionSelect(group, option)}
//             >
//               {option}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
//   const tableHeaders = [
//     "S.No",
//     "Person Name",
//     "Company name",
//     "Requirement",
//     "Approached via",
//     "Started",
//     "Ended",
//     "clientType",
//     "Estimated Budget",
//     "Quotation",
//     "Status",
//     "Conclusion",
//     "Action",
//   ];
//   // Derived
//   const printTypesObj = getOptionGroups(formData.clientType, formData.printType);
//   const optionCategories = getOptionCategories(printTypesObj, formData.selectedPrintType);
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
//         <button
//           className={styles.addButton}
//           onClick={() => {
//             setShowModal(true);
//             setEditMode(false);
//             setFormData(defaultForm);
//           }}
//         >
//           <Plus size={16} /> Add Pre-sales
//         </button>
//       </div>
//       {presalesError && <div className={styles.errorMsg}>{presalesError}</div>}
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
//               {(presales && presales.length > 0 ? presales : []).map(
//                 (item, idx) => (
//                   <tr key={item.srNumber || idx}>
//                     <td>{String(idx + 1).padStart(2, "0")}</td>
//                     <td>{item.personName || "-"}</td>
//                     <td>{item.client?.clientName || "-"}</td>
//                     <td title={item.requirements}>
//                       {item.requirements?.slice(0, 28) +
//                         (item.requirements?.length > 28 ? "..." : "") || "-"}
//                     </td>
//                     <td>
//                       {item.approachedVia
//                         ? item.approachedVia[0].toUpperCase() +
//                           item.approachedVia.slice(1)
//                         : "-"}
//                     </td>
//                     <td>
//                       {item.orderStartDateTime
//                         ? new Date(item.orderStartDateTime).toLocaleString(
//                             "en-GB",
//                             {
//                               day: "2-digit",
//                               month: "short",
//                               year: "numeric",
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             }
//                           )
//                         : "-"}
//                     </td>
//                     <td>
//                       {item.orderEndDateTime
//                         ? new Date(item.orderEndDateTime).toLocaleString(
//                             "en-GB",
//                             {
//                               day: "2-digit",
//                               month: "short",
//                               year: "numeric",
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             }
//                           )
//                         : "-"}
//                     </td>
//                     <td>{item.clientType}</td>
//                     <td>₹{item.budget ? item.budget.toLocaleString() : "-"}</td>
//                     <td>
//                       <button
//                         className={styles.addButtonSmall}
//                         onClick={() => handleOpenQuotationModal(item)}
//                       >
//                         Add Quotation
//                       </button>
//                     </td>
//                     <td>
//                       <span
//                         className={`${styles.statusTag} ${statusColor[item.status] || ""}`}
//                       >
//                         {item.status
//                           ? item.status.charAt(0) +
//                             item.status.slice(1).toLowerCase()
//                           : "-"}
//                       </span>
//                     </td>
//                     <td>{item.conclusion || "-"}</td>
//                     <td className={styles.actionsCol}>
//                       <button
//                         className={styles.iconButton}
//                         title="Update"
//                         onClick={() => handleEditPresale(item)}
//                       >
//                         <Edit size={16} />
//                       </button>
//                       <button
//                         className={styles.iconButton}
//                         title="Change Status"
//                         onClick={() => handleStatusPopupOpen(item.srNumber, item.status)}
//                       >
//                         <RefreshCcw size={16} />
//                       </button>
//                       <button
//                         className={styles.iconButton}
//                         title="Delete"
//                         onClick={() => handleDeletePresaleClick(item.srNumber)}
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </td>
//                   </tr>
//                 )
//               )}
//               {(!presales || presales.length === 0) && (
//                 <tr>
//                   <td
//                     colSpan={tableHeaders.length}
//                     style={{ textAlign: "center", opacity: 0.6 }}
//                   >
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
//         <div
//           className={styles.modalBackdrop}
//           onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
//         >
//           <div className={styles.modalBox}>
//             <div className={styles.modalHeader}>
//               <span>Project Details</span>
//               <button
//                 className={styles.closeButton}
//                 onClick={() => setShowModal(false)}
//               >
//                 <X size={20} />
//               </button>
//             </div>
//             <form className={styles.modalBody} onSubmit={handleFormSubmit}>
//               {/* Client category radio */}
//               <div className={styles.clientTypeRow}>
//                 <label>
//                   <input
//                     type="radio"
//                     name="clientCategory"
//                     value="new"
//                     checked={formData.clientCategory === "new"}
//                     onChange={handleInputChange}
//                   />
//                   New Client
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="clientCategory"
//                     value="existing"
//                     checked={formData.clientCategory === "existing"}
//                     onChange={handleInputChange}
//                   />
//                   Existing Client
//                 </label>
//               </div>
//               <div>
//                 <div className={styles.labelStrong}>Client Type</div>
//                 <div className={styles.clientTypeChips}>
//                   {clientTypes.map((type) => (
//                     <button
//                       type="button"
//                       key={type}
//                       name="clientType"
//                       className={`${styles.chip} ${formData.clientType === type ? styles.chipSelected : ""}`}
//                       onClick={() =>
//                         setFormData((prev) => ({ ...prev, clientType: type }))
//                       }
//                     >
//                       {type}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               {formData.clientCategory === "existing" ? (
//                 <div className={styles.inputRow}>
//                   <label>Choose Client</label>
//                   <select
//                     name="clientId"
//                     value={formData.client.clientId}
//                     onChange={handleInputChange}
//                   >
//                     <option value="">Select Client</option>
//                     {clients.map((client) => (
//                       <option value={client.id} key={client.id}>
//                         {client.name} ({client.email})
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               ) : (
//                 <>
//                   <div className={styles.inputRow}>
//                     <label>Client Name</label>
//                     <input
//                       name="client.name"
//                       value={formData.client.name}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className={styles.inputRow}>
//                     <label>Email address</label>
//                     <input
//                       type="email"
//                       name="client.email"
//                       value={formData.client.email}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className={styles.inputRow}>
//                     <label>Mobile Number</label>
//                     <input
//                       name="client.phone"
//                       value={formData.client.phone}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className={styles.inputRow}>
//                     <label>Address</label>
//                     <input
//                       name="client.address"
//                       value={formData.client.address}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </>
//               )}
//               <div className={styles.inputRow}>
//                 <label>Person Name</label>
//                 <input
//                   name="personName"
//                   value={formData.personName}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className={styles.inputRow}>
//                 <label>Budget</label>
//                 <input
//                   type="number"
//                   name="budget"
//                   value={formData.budget}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className={styles.inputRow}>
//                 <label>Print Type</label>
//                 <select
//                   name="printType"
//                   value={formData.printType}
//                   onChange={handleInputChange}
//                 >
//                   {printTypes.map((pt) => (
//                     <option value={pt} key={pt}>
//                       {pt}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className={styles.inputRow}>
//                 <label>Approached Via</label>
//                 <select
//                   name="approachedVia"
//                   value={formData.approachedVia}
//                   onChange={handleInputChange}
//                 >
//                   <option value="whatsapp">WhatsApp</option>
//                   <option value="email">E-mail</option>
//                   <option value="phone">Phone</option>
//                   <option value="linkedin">LinkedIn</option>
//                 </select>
//               </div>
//               <div className={styles.inputRow}>
//                 <label>Expected Start Date</label>
//                 <input
//                   type="datetime-local"
//                   name="orderStartDateTime"
//                   value={formData.orderStartDateTime}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className={styles.inputRow}>
//                 <label>Expected End Date</label>
//                 <input
//                   type="datetime-local"
//                   name="orderEndDateTime"
//                   value={formData.orderEndDateTime}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className={styles.inputRow}>
//                 <label>Quantity</label>
//                 <input
//                   type="number"
//                   name="qty"
//                   min={1}
//                   value={formData.qty}
//                   onChange={handleQtyChange}
//                   style={{ width: "100px" }}
//                 />
//               </div>
//               <div className={styles.optionsSection}>
//                 <div className={styles.optionGroup}>
//                   <div className={styles.groupTitle}>Select Print Type</div>
//                   <div className={styles.optionsWrap}>
//                     {Object.keys(printTypesObj).map((pt) => (
//                       <button
//                         key={pt}
//                         type="button"
//                         className={`${styles.optionChip} ${
//                           formData.selectedPrintType === pt ? styles.selected : ""
//                         }`}
//                         onClick={() => handlePrintTypeOptionSelect(pt)}
//                       >
//                         {pt}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//                 {formData.selectedPrintType &&
//                   Object.entries(optionCategories).map(([group, options]) =>
//                     renderOptionGroup(group, options)
//                   )}
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
//               {/* <div className={styles.inputRow}>
//                 <label>Requirements Steps </label>
//                 <pre style={{ fontSize: "11px", background: "#f7f8fa", padding: "6px 10px" }}>
//                   {JSON.stringify(formData.requirementsSteps, null, 2)}
//                 </pre>
//               </div> */}
//               <div className={styles.modalActions}>
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className={styles.cancelBtn}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className={styles.submitBtn}>
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//       {/* Status Popup */}
//       {showStatusPopup && (
//         <div
//           className={styles.modalBackdrop}
//           onClick={(e) =>
//             e.target === e.currentTarget && setShowStatusPopup(false)
//           }
//         >
//           <div className={styles.modalBox}>
//             <div className={styles.modalHeader}>
//               <span>Update Status</span>
//               <button
//                 className={styles.closeButton}
//                 onClick={() => setShowStatusPopup(false)}
//               >
//                 <X size={20} />
//               </button>
//             </div>
//             <div className={styles.modalBody}>
//               <label>Status</label>
//               <select
//                 value={statusToUpdate}
//                 onChange={(e) => setStatusToUpdate(e.target.value)}
//               >
//                 <option value="PENDING">Pending</option>
//                 <option value="ONBOARDED">Onboarded</option>
//                 <option value="CREATED">Created</option>
//               </select>
//               <div className={styles.formActions}>
//                 <button
//                   className={styles.submitBtn}
//                   onClick={handleUpdatePresaleStatusClick}
//                 >
//                   Update Status
//                 </button>
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
// Utility: Get cost of an option for the given group & type
function getOptionCost(clientType, orderType, selectedPrintType, group, optionName) {
  try {
    const groupData = PRINT_PRICES.clientTypes[clientType]?.orderTypes?.[orderType]?.printTypes?.[selectedPrintType];
    if (!groupData) return 0;
    const groupKey = Object.keys(groupData).find(k => k.toLowerCase() === group.toLowerCase());
    if (!groupKey) return 0;
    const arr = groupData[groupKey];
    if (!Array.isArray(arr)) return 0;
    const found = arr.find(i => i.name.toLowerCase() === optionName.toLowerCase());
    if (found) {
      if (typeof found.cost === "number") return found.cost;
      if (typeof found.costCMYK === "number") return found.costCMYK;
      if (typeof found.costCMYKW === "number") return found.costCMYKW;
    }
  } catch (err) { return 0; }
  return 0;
}
// Utility: get all print type option groups
function getOptionGroups(clientType, orderType) {
  return (
    PRINT_PRICES.clientTypes?.[clientType]?.orderTypes?.[orderType]?.printTypes || {}
  );
}
// Utility: group options as {group: [name, ...]}
function getOptionCategories(printTypesObj, selectedPrintType) {
  if (!printTypesObj[selectedPrintType]) return {};
  const categories = {};
  Object.entries(printTypesObj[selectedPrintType]).forEach(
    ([group, options]) => {
      categories[group] = options.map((opt) => opt.name);
    }
  );
  return categories;
}
// Build requirements string from current selections (for display)
// function buildRequirementsString(selectedPrintType, selections) {
//   // Only collect names EXCEPT "Media"
//   const selectedGroups = Object.entries(selections)
//     .filter(([k]) => k !== "qty" && k !== "Media")
//     .flatMap(([group, arr]) => (arr || []).map(i => i.name));
//   // Example: "No lamination + 3mm Foam sheet + Drilling on wall"
//   return selectedGroups.filter(Boolean).join(" + ");
// }
function buildRequirementsString(selectedPrintType, selections) {
  return Object.entries(selections)
    .filter(([k]) => k !== "qty" && k !== "Media")
    .map(([group, arr]) =>
      arr.map(i => `${group.toLowerCase()}:${i.name}`).join(" + ")
    )
    .filter(Boolean)
    .join(" + ");
}
// Build requirementsSteps object for API
function buildRequirementsSteps(selectedPrintType, selections) {
  const steps = {};
  if (selectedPrintType) {
    steps["PrintType"] = [{ name: selectedPrintType, cost: getOptionCostFromPrintType(selectedPrintType, selections) }];
  }
  Object.entries(selections).forEach(([group, arr]) => {
    if (group === "qty") return;
    steps[group] = arr.map(i => ({ name: i.name, cost: i.cost }));
  });
  return steps;
}
// (Optional) Attach cost to selectedPrintType group
function getOptionCostFromPrintType(selectedPrintType, selections) {
  for (const arr of Object.values(selections)) {
    if (Array.isArray(arr)) {
      const found = arr.find(i => i.name === selectedPrintType && typeof i.cost === "number");
      if (found) return found.cost;
    }
  }
  return 0;
}
// Build material object (main point)
function buildMaterialObject(selectedPrintType, selections) {
  if (
    selectedPrintType &&
    selections.Media &&
    Array.isArray(selections.Media) &&
    selections.Media.length > 0
  ) {
    return selectedPrintType + " + " + selections.Media[0].name;
  }
  return "";
}
const clientTypes = Object.keys(PRINT_PRICES.clientTypes);
const printTypes = ["Wide format printing", "Digital format printing"];
const statusColor = {
  ONBOARDED: styles.statusOnboarded,
  PENDING: styles.statusPending,
  CREATED: styles.statusCreated,
};
const defaultForm = {
  clientType: clientTypes[0],
  clientCategory: "new",
  selectedPrintType: "",
  requirementSelections: {},
  personName: "",
  budget: "",
  requirementsSteps: {},
  qty: 1,
  printType: printTypes[0],
  material: {},
  requirements: "",
  approachedVia: "whatsapp",
  orderStartDateTime: "",
  orderEndDateTime: "",
  status: "PENDING",
  conclusion: "",
  amount: 0,
  client: { name: "", email: "", phone: "", address: "", clientId: "" },
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
    clients,
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
  useEffect(() => { handleGetAllPresales(); }, []);
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      selectedPrintType: "",
      requirementSelections: {},
      requirements: "",
      requirementsSteps: {},
      material: {},
      qty: 1
    }));
  }, [formData.printType, formData.clientType]);
  // ----------- Option selection handlers -----------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "clientType") {
      setFormData((prev) => ({ ...prev, clientType: value }));
      return;
    }
    if (name === "clientCategory") {
      setFormData((prev) => ({
        ...prev,
        clientCategory: value,
        client:
          value === "new"
            ? { name: "", email: "", phone: "", address: "", clientId: "" }
            : { ...prev.client, name: "", email: "", phone: "", address: "" },
      }));
      return;
    }
    if (name === "printType") {
      setFormData((prev) => ({
        ...prev,
        printType: value,
        selectedPrintType: "",
        requirementSelections: {},
        requirements: "",
        requirementsSteps: {},
        material: {},
        qty: 1,
      }));
      return;
    }
    if (name === "clientId") {
      const selected = clients.find((c) => `${c.id}` === value);
      setFormData((prev) => ({
        ...prev,
        client: {
          ...prev.client,
          clientId: value,
          name: selected?.name || "",
          email: selected?.email || "",
          phone: selected?.phone || "",
          address: selected?.address || "",
        },
      }));
      return;
    }
    if (name.startsWith("client.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        client: { ...prev.client, [key]: value },
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // Print type main selection (reset others)
  const handlePrintTypeOptionSelect = (printTypeOption) => {
    setFormData((prev) => ({
      ...prev,
      selectedPrintType: printTypeOption,
      requirementSelections: {},
      requirements: printTypeOption,
      requirementsSteps: {},
      qty: 1,
      material: buildMaterialObject(printTypeOption, {}),
    }));
  };
  // Option group item select/deselect
  const handleOptionSelect = (group, option) => {
    setFormData((prev) => {
      const selections = { ...prev.requirementSelections };
      const cost = getOptionCost(
        prev.clientType,
        prev.printType,
        prev.selectedPrintType,
        group,
        option
      );
      if (!selections[group]) selections[group] = [];
      const exists = selections[group].find(x => x.name === option);
      if (exists) {
        selections[group] = selections[group].filter(x => x.name !== option);
      } else {
        selections[group].push({ name: option, cost });
      }
      return {
        ...prev,
        requirementSelections: { ...selections, qty: prev.qty },
        requirements: buildRequirementsString(prev.selectedPrintType, selections),
        requirementsSteps: buildRequirementsSteps(prev.selectedPrintType, selections),
        material: buildMaterialObject(prev.selectedPrintType, selections),
      };
    });
  };
  // Quantity input
  const handleQtyChange = (e) => {
    const value = Math.max(1, Number(e.target.value));
    setFormData(prev => {
      const selections = { ...prev.requirementSelections, qty: value };
      return {
        ...prev,
        qty: value,
        requirementSelections: selections,
        requirements: buildRequirementsString(prev.selectedPrintType, selections),
        requirementsSteps: buildRequirementsSteps(prev.selectedPrintType, selections),
        material: buildMaterialObject(prev.selectedPrintType, selections),
      };
    });
  };
  // ----------- FORM SUBMIT -----------
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      (formData.clientCategory === "new" &&
        (!formData.client.name || !formData.client.email || !formData.client.phone)) ||
      !formData.personName ||
      !formData.budget ||
      !formData.requirements ||
      !formData.orderStartDateTime ||
      !formData.orderEndDateTime
    ) {
      alert("Please fill all required fields!");
      return;
    }
    let payload = {
      clientType: formData.clientType,
      // clientCategory: formData.clientCategory,
      // selectedPrintType: formData.selectedPrintType,
      // requirementSelections: formData.requirementSelections,
      personName: formData.personName,
      budget: parseFloat(formData.budget) || 0,
      // requirementsSteps: formData.requirementsSteps,
      qty: formData.qty,
      printType: formData.printType,
      // material: formData.material,
      material: formData.material,
      requirements: formData.requirements,
      approachedVia: formData.approachedVia,
      orderStartDateTime: formData.orderStartDateTime,
      orderEndDateTime: formData.orderEndDateTime,
      status: formData.status,
      conclusion: formData.conclusion,
      client: undefined, // will be set below
      clientId: undefined // will be set below
      , amount: 0, // Assuming this is not used in the form
    };
    if (formData.clientCategory === "existing") {
      const selectedClient = clients.find((c) => `${c.id}` === formData.client.clientId);
      payload.clientId = selectedClient?.id;
    } else {
      payload.client = {
        name: formData.client.name,
        email: formData.client.email,
        phone: formData.client.phone,
        address: formData.client.address,
      };
    }
    if (editMode && selectedSrNumber) payload.srNumber = selectedSrNumber;
    if (formData.clientCategory === "existing") {
      delete payload.client;
    } else {
      delete payload.clientId;
    }
    // Debug
    console.log("Submitting payload:", payload);
    const success = await handleCreatePresale(
      payload,
      formData.clientCategory === "existing"
    );
    if (success) {
      setFormData(defaultForm);
      setShowModal(false);
      setEditMode(false);
      setSelectedSrNumber(null);
      handleGetAllPresales();
    }
  };
  // ----------- QUOTATION MODAL HANDLERS -----------
  const handleOpenQuotationModal = (presale) => {
    setSelectedQuotationPresale(presale);
    setShowQuotationModal(true);
  };
  // ----------- EDIT/DELETE STATUS HANDLERS -----------
  const handleEditPresale = (presale) => {
    setShowModal(true);
    setEditMode(true);
    setSelectedSrNumber(presale.srNumber);
    setFormData({
      ...defaultForm,
      ...presale,
      client: presale.client || defaultForm.client,
      selectedPrintType: "", // To reconstruct selections if needed
      requirementSelections: {},
      requirementsSteps: {},
      material: {},
    });
  };
  const handleDeletePresaleClick = async (srNumber) => {
    if (window.confirm("Are you sure you want to delete this presale?")) {
      await handleDeletePresale(srNumber);
      handleGetAllPresales();
    }
  };
  const handleStatusPopupOpen = (srNumber, currentStatus) => {
    setShowStatusPopup(true);
    setSelectedSrNumber(srNumber);
    setStatusToUpdate(currentStatus);
  };
  const handleUpdatePresaleStatusClick = async () => {
    await handleUpdatePresaleStatus(selectedSrNumber, statusToUpdate);
    setShowStatusPopup(false);
    handleGetAllPresales();
  };
  // ----------- RENDERERS -----------
  const renderOptionGroup = (group, options) => (
    <div className={styles.optionGroup} key={group}>
      <div className={styles.groupTitle}>
        {group.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
      </div>
      <div className={styles.optionsWrap}>
        {options.map((option) => {
          const selected = (formData.requirementSelections[group] || []).some(x => x.name === option);
          return (
            <button
              type="button"
              className={`${styles.optionChip} ${selected ? styles.selected : ""}`}
              key={option}
              onClick={() => handleOptionSelect(group, option)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
  const tableHeaders = [
    "S.No",
    "Person Name",
    "Company name",
    "Requirement",
    "Approached via",
    "Started",
    "Ended",
    "clientType",
    "Estimated Budget",
    "Quotation",
    "Status",
    "Conclusion",
    "Action",
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
        <button
          className={styles.addButton}
          onClick={() => {
            setShowModal(true);
            setEditMode(false);
            setFormData(defaultForm);
          }}
        >
          <Plus size={16} /> Add Pre-sales
        </button>
      </div>
      {presalesError && <div className={styles.errorMsg}>{presalesError}</div>}
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
              {(presales && presales.length > 0 ? presales : []).map(
                (item, idx) => (
                  <tr key={item.srNumber || idx}>
                    <td>{String(idx + 1).padStart(2, "0")}</td>
                    <td>{item.personName || "-"}</td>
                    <td>{item.client?.clientName || "-"}</td>
                    <td title={item.requirements}>
                      {item.requirements?.slice(0, 28) +
                        (item.requirements?.length > 28 ? "..." : "") || "-"}
                    </td>
                    <td>
                      {item.approachedVia
                        ? item.approachedVia[0].toUpperCase() +
                          item.approachedVia.slice(1)
                        : "-"}
                    </td>
                    <td>
                      {item.orderStartDateTime
                        ? new Date(item.orderStartDateTime).toLocaleString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "-"}
                    </td>
                    <td>
                      {item.orderEndDateTime
                        ? new Date(item.orderEndDateTime).toLocaleString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "-"}
                    </td>
                    <td>{item.clientType}</td>
                    <td>₹{item.budget ? item.budget.toLocaleString() : "-"}</td>
                    <td>
                      <button
                        className={styles.addButtonSmall}
                        onClick={() => handleOpenQuotationModal(item)}
                      >
                        Add Quotation
                      </button>
                    </td>
                    <td>
                      <span
                        className={`${styles.statusTag} ${statusColor[item.status] || ""}`}
                      >
                        {item.status
                          ? item.status.charAt(0) +
                            item.status.slice(1).toLowerCase()
                          : "-"}
                      </span>
                    </td>
                    <td>{item.conclusion || "-"}</td>
                    <td className={styles.actionsCol}>
                      <button
                        className={styles.iconButton}
                        title="Update"
                        onClick={() => handleEditPresale(item)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className={styles.iconButton}
                        title="Change Status"
                        onClick={() => handleStatusPopupOpen(item.srNumber, item.status)}
                      >
                        <RefreshCcw size={16} />
                      </button>
                      <button
                        className={styles.iconButton}
                        title="Delete"
                        onClick={() => handleDeletePresaleClick(item.srNumber)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                )
              )}
              {(!presales || presales.length === 0) && (
                <tr>
                  <td
                    colSpan={tableHeaders.length}
                    style={{ textAlign: "center", opacity: 0.6 }}
                  >
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
        <div
          className={styles.modalBackdrop}
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className={styles.modalBox}>
            <div className={styles.modalHeader}>
              <span>Project Details</span>
              <button
                className={styles.closeButton}
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form className={styles.modalBody} onSubmit={handleFormSubmit}>
              {/* Client category radio */}
              <div className={styles.clientTypeRow}>
                <label>
                  <input
                    type="radio"
                    name="clientCategory"
                    value="new"
                    checked={formData.clientCategory === "new"}
                    onChange={handleInputChange}
                  />
                  New Client
                </label>
                <label>
                  <input
                    type="radio"
                    name="clientCategory"
                    value="existing"
                    checked={formData.clientCategory === "existing"}
                    onChange={handleInputChange}
                  />
                  Existing Client
                </label>
              </div>
              <div>
                <div className={styles.labelStrong}>Client Type</div>
                <div className={styles.clientTypeChips}>
                  {clientTypes.map((type) => (
                    <button
                      type="button"
                      key={type}
                      name="clientType"
                      className={`${styles.chip} ${formData.clientType === type ? styles.chipSelected : ""}`}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, clientType: type }))
                      }
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              {formData.clientCategory === "existing" ? (
                <div className={styles.inputRow}>
                  <label>Choose Client</label>
                  <select
                    name="clientId"
                    value={formData.client.clientId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Client</option>
                    {clients.map((client) => (
                      <option value={client.id} key={client.id}>
                        {client.name} ({client.email})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <>
                  <div className={styles.inputRow}>
                    <label>Client Name</label>
                    <input
                      name="client.name"
                      value={formData.client.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.inputRow}>
                    <label>Email address</label>
                    <input
                      type="email"
                      name="client.email"
                      value={formData.client.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.inputRow}>
                    <label>Mobile Number</label>
                    <input
                      name="client.phone"
                      value={formData.client.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.inputRow}>
                    <label>Address</label>
                    <input
                      name="client.address"
                      value={formData.client.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
              <div className={styles.inputRow}>
                <label>Person Name</label>
                <input
                  name="personName"
                  value={formData.personName}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.inputRow}>
                <label>Budget</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.inputRow}>
                <label>Print Type</label>
                <select
                  name="printType"
                  value={formData.printType}
                  onChange={handleInputChange}
                >
                  {printTypes.map((pt) => (
                    <option value={pt} key={pt}>
                      {pt}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.inputRow}>
                <label>Approached Via</label>
                <select
                  name="approachedVia"
                  value={formData.approachedVia}
                  onChange={handleInputChange}
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">E-mail</option>
                  <option value="phone">Phone</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>
              <div className={styles.inputRow}>
                <label>Expected Start Date</label>
                <input
                  type="datetime-local"
                  name="orderStartDateTime"
                  value={formData.orderStartDateTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.inputRow}>
                <label>Expected End Date</label>
                <input
                  type="datetime-local"
                  name="orderEndDateTime"
                  value={formData.orderEndDateTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.inputRow}>
                <label>Quantity</label>
                <input
                  type="number"
                  name="qty"
                  min={1}
                  value={formData.qty}
                  onChange={handleQtyChange}
                  style={{ width: "100px" }}
                />
              </div>
              <div className={styles.optionsSection}>
                <div className={styles.optionGroup}>
                  <div className={styles.groupTitle}>Select Print Type</div>
                  <div className={styles.optionsWrap}>
                    {Object.keys(printTypesObj).map((pt) => (
                      <button
                        key={pt}
                        type="button"
                        className={`${styles.optionChip} ${
                          formData.selectedPrintType === pt ? styles.selected : ""
                        }`}
                        onClick={() => handlePrintTypeOptionSelect(pt)}
                      >
                        {pt}
                      </button>
                    ))}
                  </div>
                </div>
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
              {/* Show material object (for debug or info) */}
              <div className={styles.inputRow}>
                <label>Material (auto-generated)</label>
                <pre style={{ fontSize: "11px", background: "#f7f8fa", padding: "6px 10px" }}>
                  {JSON.stringify(formData.material, null, 2)}
                </pre>
              </div>
              <div className={styles.inputRow}>
                <label>Conclusion</label>
                <input
                  name="conclusion"
                  value={formData.conclusion}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.inputRow}>
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="PENDING">Pending</option>
                  <option value="ONBOARDED">Onboarded</option>
                  <option value="CREATED">Created</option>
                </select>
              </div>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Status Popup */}
      {showStatusPopup && (
        <div
          className={styles.modalBackdrop}
          onClick={(e) =>
            e.target === e.currentTarget && setShowStatusPopup(false)
          }
        >
          <div className={styles.modalBox}>
            <div className={styles.modalHeader}>
              <span>Update Status</span>
              <button
                className={styles.closeButton}
                onClick={() => setShowStatusPopup(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <label>Status</label>
              <select
                value={statusToUpdate}
                onChange={(e) => setStatusToUpdate(e.target.value)}
              >
                <option value="PENDING">Pending</option>
                <option value="ONBOARDED">Onboarded</option>
                <option value="CREATED">Created</option>
              </select>
              <div className={styles.formActions}>
                <button
                  className={styles.submitBtn}
                  onClick={handleUpdatePresaleStatusClick}
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PreSalesPage;
