import React, { useState, useEffect } from "react";
import { Plus, Trash2, X, Edit, RefreshCcw } from "lucide-react";
import { useData } from "../../context/DataContext";
import styles from "./PreSalesPage.module.scss";
const printTypes = ["Wide format printing", "Digital Paper printing"];
const wideFormatOptions = {
  media: [
    "Vinyl", "Cast Vinyl", "Clear vinyl", "One way vision", "Frosted Film",
    "Translite Film", "Fabric cloth", "Backlit fabric", "Destructible Vinyl",
    "2 year Vinyl", "Canvas", "Eco Texture Vinyl", "Wallpaper", "PP vinyl",
    "canon Canvas 12 colour", "Radium", "Retro Chinese Retro", "3M Night Glow",
    "Printing Signs", "Star flex eco", "Star flex solvent", "Flex regular solvent",
    "ACP", "Acrylic", "MDF", "Curtain", "Glass"
  ],
  printType: ["Eco solvent", "Solvent", "UV Print"],
  lamination: [
    "No lamination", "Matt", "Glossy", "Sparkle", "Two year outdoor",
    "Both side gumming", "Glossy coat", "Matt coat", "Floor Lamination"
  ],
  mountingSheet: [
    "Sunpack", "3mm foam sheet", "5mm foam sheet", "8mm foam sheet",
    "10mm foam sheet", "ACP sheet", "3mm acrylic", "5mm acrylic",
    "Poly carbonate clear sheet", "Poly carbonate white sheet",
    "Bubbleguard sheet 600gsm", "Bubbleguard sheet 900gsm", "Metal frame",
    "Clip on frame", "Fabric frame", "Acrylic stands", "Promotional table",
    "Rollup standy", "Luxury rollup standy"
  ],
  framing: ["No frame", "Half inch frame", "1inch frame", "2inch Frame"],
  installation: ["Drilling on wall", "Pasting on site", "Rolled prints only"]
};
const digitalPaperOptions = {
  paperTypes: [
    "Sunshine 100gsm", "Bond Paper 100gsm", "Art paper 130gsm", "Art paper 170gsm",
    "Art paper 250gsm", "Art paper 300gsm", "Art paper 350gsm", "Regular sticker",
    "NT sticker", "NT Transperent Sticker", "Gold Matt sticker", "Silver Matt sticker",
    "Holographic sticker", "NT paper", "Texture paper 007", "Texture paper 008",
    "Texture paper 009", "Texture paper 010", "Texture paper 012", "Texture paper 021",
    "Texture paper 022"
  ],
  printType: [
    "Digital", "Offset", "Screen", "Pigment", "Dekstop A4 Laser", "Dekstop A4 B/W"
  ],
  lamination: [
    "Gloss lamination", "Matt Lamination", "Texture Matt lamination",
    "Sparkle Lamination", "Spot UV", "Spot UV + Gold", "Spot UV + Silver"
  ],
  finishing: [
    "No cut", "Full cut to size", "Die Half cutting", "Visiting card cutting",
    "Metal Badge", "Keychain", "Metal Badge Hole punch", "Table top A4 standy",
    "Table top A3 standy"
  ],
  framing: ["No frame", "Half inch frame", "1inch frame", "2inch Frame"]
};
// Chip style client types
const clientTypes = ["Cash", "GST", "Printer"];
const statusColor = {
  ONBOARDED: styles.statusOnboarded,
  PENDING: styles.statusPending,
  CREATED: styles.statusCreated,
};
const defaultForm = {
  clientType: clientTypes[0], // Default to "Cash"
  clientCategory: "new", // new/existing client
  printType: printTypes[0],
  requirementSelections: {},
  personName: "",
  budget: "",
  requirements: "",
  approachedVia: "whatsapp",
  orderStartDateTime: "",
  orderEndDateTime: "",
  status: "PENDING",
  conclusion: "",
  client: {
    name: "",
    email: "",
    phone: "",
    address: "",
    clientId: "",
  },
};
const PreSalesPage = () => {
  const {
    presales, presalesLoading, presalesError,
    handleGetAllPresales, handleCreatePresale, handleUpdatePresaleStatus, handleDeletePresale,
    clients
  } = useData();
  const [showModal, setShowModal] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [selectedSrNumber, setSelectedSrNumber] = useState(null);
  const [statusToUpdate, setStatusToUpdate] = useState("PENDING");
  const [formData, setFormData] = useState(defaultForm);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => { handleGetAllPresales(); }, []);
  useEffect(() => {
    if (formData.printType) updateRequirements();
    // eslint-disable-next-line
  }, [formData.requirementSelections, formData.printType]);
  // Print Option Groups
  const getPrintOptions = () =>
    formData.printType === printTypes[0] ? wideFormatOptions : digitalPaperOptions;
  // --- Form Input Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Client chip type (Cash/GST/Printer)
    if (name === "clientType") {
      setFormData((prev) => ({ ...prev, clientType: value }));
      return;
    }
    // Client category (new/existing)
    if (name === "clientCategory") {
      setFormData(prev => ({
        ...prev,
        clientCategory: value,
        client: value === "new"
          ? { name: "", email: "", phone: "", address: "", clientId: "" }
          : { ...prev.client, name: "", email: "", phone: "", address: "" }
      }));
      return;
    }
    // Print type change
    if (name === "printType") {
      setFormData(prev => ({
        ...prev,
        printType: value,
        requirementSelections: {},
      }));
      return;
    }
    // Existing client select
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
      }));
      return;
    }
    // For new client info fields
    if (name.startsWith("client.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        client: { ...prev.client, [key]: value }
      }));
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  // Multi-option chip select handler
  const handleOptionSelect = (group, option) => {
    setFormData(prev => {
      const selections = { ...prev.requirementSelections };
      if (selections[group]?.includes(option)) {
        selections[group] = selections[group].filter(o => o !== option);
      } else {
        selections[group] = [...(selections[group] || []), option];
      }
      return { ...prev, requirementSelections: selections };
    });
  };
  // Compose requirements string from options
  const updateRequirements = () => {
    const selections = formData.requirementSelections || {};
    const joined = Object.values(selections).flat().join(" + ");
    setFormData(prev => ({ ...prev, requirements: joined }));
  };
  // --- Form Submission ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      (formData.clientCategory === "new" && (!formData.client.name || !formData.client.email || !formData.client.phone)) ||
      !formData.personName || !formData.budget || !formData.requirements || !formData.orderStartDateTime || !formData.orderEndDateTime
    ) {
      alert("Please fill all required fields!");
      return;
    }
    const payload = {
      ...formData,
      budget: parseFloat(formData.budget) || 0,
      client: formData.clientCategory === "existing"
        ? { clientId: formData.client.clientId }
        : {
          name: formData.client.name,
          email: formData.client.email,
          phone: formData.client.phone,
          address: formData.client.address
        }
    };
    const success = await handleCreatePresale(payload, formData.clientCategory === "existing");
    if (success) {
      setFormData(defaultForm);
      setShowModal(false);
    }
  };
  // Render chip selector for client type (Cash/GST/Printer)
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
  // Render chips for print/media options
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
  // --- Modal and List ---
  const tableHeaders = [
    "S.No", "Person Name", "Company name", "Requirement", "Approached via",
    "Started", "Ended", "Estimated Budget", "Status", "Conclusion", "Action"
  ];
  return (
    <div className={styles.container}>
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
                    <button className={styles.iconButton} title="Update">
                      <Edit size={16} />
                    </button>
                    <button className={styles.iconButton} title="Change Status">
                      <RefreshCcw size={16} />
                    </button>
                    <button className={styles.iconButton} title="Delete">
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
              {/* Client Type Chips */}
              {renderClientTypeChips()}
              {/* If existing client, show dropdown */}
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
              {/* Dynamic Option Groups */}
              <div className={styles.optionsSection}>
                {Object.entries(getPrintOptions()).map(([group, options]) =>
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
      {/* Status Popup unchanged */}
    </div>
  );
};
export default PreSalesPage;
