import React, { useState } from "react";
import styles from "./AddOrder.module.scss";
import PRINT_PRICES from "../../printprices";
import { X, Upload } from "lucide-react";
// Dummy props: pass your actual clients, handleAddPostSale, etc.
export default function AddPostSalesForm({
  clients = [],
  onClose,
  onSubmit,
}) {
  // --- Form State ---
  const [form, setForm] = useState({
    isOldClient: false,
    client: { name: "", email: "", phone: "", address: "", GSTCertificate: "", PAN: "" },
    clientId: "",
    estimatedQuote: "",
    negotiationPrice: "",
    finalAmtWithOutGST: "",
    gstPercentage: "18",
    remark: "",
    postSalesdateTime: new Date().toISOString().slice(0,16),
    order: {
      status: "CREATED",
      priority: "MEDIUM",
      createdAt: new Date().toISOString().slice(0,16),
      startDate: "",
      endDate: "",
      type: "Wide format printing",
      description: "",
      steps: [],
    },
    requirements: "",
    requirementSelections: {},
    selectedPrintType: "",
    imageFiles: [],
    receivedPayments: [],
  });
  // --- Step/Option Helpers ---
  const clientTypes = Object.keys(PRINT_PRICES.clientTypes);
  const printTypes = ["Wide format printing", "Digital format printing"];
  function getOptionGroups(clientType, orderType) {
    return (
      PRINT_PRICES.clientTypes?.[clientType]?.orderTypes?.[orderType]?.printTypes || {}
    );
  }
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
  function buildRequirementsString(selectedPrintType, selections) {
    return Object.entries(selections)
      .filter(([k]) => k !== "qty" && k !== "Media")
      .map(([group, arr]) =>
        arr.map((i) => `${group.toLowerCase()}:${i.name}`).join(" + ")
      )
      .filter(Boolean)
      .join(" + ");
  }
  // --- Option Selection Handlers ---
  const handlePrintTypeOptionSelect = (pt) => {
    setForm((prev) => ({
      ...prev,
      selectedPrintType: pt,
      requirementSelections: {},
      requirements: pt,
      order: { ...prev.order, type: pt },
    }));
  };
  const handleOptionSelect = (group, option) => {
    setForm((prev) => {
      const selections = { ...prev.requirementSelections };
      if (!selections[group]) selections[group] = [];
      const exists = selections[group].find((x) => x.name === option);
      if (exists) {
        selections[group] = selections[group].filter((x) => x.name !== option);
      } else {
        selections[group].push({ name: option });
      }
      // Build description for order
      const description = buildRequirementsString(prev.selectedPrintType, selections);
      return {
        ...prev,
        requirementSelections: selections,
        requirements: description,
        order: { ...prev.order, description },
      };
    });
  };
  // --- Field Change Handler ---
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    // Handle image files
    if (name === "imageFiles") {
      setForm((prev) => ({
        ...prev,
        imageFiles: Array.from(files),
      }));
      return;
    }
    if (name === "isOldClient") {
      setForm((prev) => ({
        ...prev,
        isOldClient: checked,
        client: checked ? { ...prev.client } : { name: "", email: "", phone: "", address: "", GSTCertificate: "", PAN: "" },
        clientId: "",
      }));
      return;
    }
    if (name.startsWith("client.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        client: { ...prev.client, [field]: value },
      }));
      return;
    }
    if (name.startsWith("order.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        order: { ...prev.order, [field]: value },
      }));
      return;
    }
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  // --- Submit Handler ---
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const selectedClient =
      form.isOldClient && form.clientId
        ? clients.find((c) => String(c.id) === String(form.clientId))
        : null;
    const payload = {
      ...form,
      client: form.isOldClient && selectedClient ? selectedClient : form.client,
      order: {
        ...form.order,
        steps: Object.entries(form.requirementSelections)
          .flatMap(([group, arr]) =>
            arr.map((item) => ({
              stepName: group,
              measurement: item.name,
              status: form.order.status,
            }))
          ),
      },
      requirements: form.requirements,
      // You can map imageFiles etc as needed for upload
    };
    // Do actual post request or callback
    onSubmit?.(payload);
    onClose?.();
  };
  // --- Dynamic Options ---
  const printTypesObj = getOptionGroups(clientTypes[0], form.order.type);
  const optionCategories = getOptionCategories(printTypesObj, form.selectedPrintType);
  // --- Render Option Groups ---
  const renderOptionGroup = (group, options) => (
    <div className={styles.optionGroup} key={group}>
      <div className={styles.groupTitle}>{group.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}</div>
      <div className={styles.optionsWrap}>
        {options.map((option) => {
          const selected = (form.requirementSelections[group] || []).some(
            (x) => x.name === option
          );
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
  // --- UI ---
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalBox}>
        <div className={styles.modalHeader}>
          <span>Add New Post-Sale</span>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form className={styles.modalBody} onSubmit={handleFormSubmit} autoComplete="off">
          {/* Old Client toggle */}
          <div className={styles.clientTypeRow}>
            <label>
              <input
                type="checkbox"
                name="isOldClient"
                checked={form.isOldClient}
                onChange={handleInputChange}
              />
              Old Client?
            </label>
          </div>
          {form.isOldClient ? (
            <div className={styles.inputRow}>
              <label>Select Existing Client</label>
              <select name="clientId" value={form.clientId} onChange={handleInputChange}>
                <option value="">Select Client</option>
                {clients.map((c) => (
                  <option value={c.id} key={c.id}>{c.name} ({c.email})</option>
                ))}
              </select>
            </div>
          ) : (
            <>
              <div className={styles.inputRow}>
                <label>Client Name</label>
                <input name="client.name" value={form.client.name} onChange={handleInputChange} required />
              </div>
              <div className={styles.inputRow}>
                <label>Email</label>
                <input type="email" name="client.email" value={form.client.email} onChange={handleInputChange} required />
              </div>
              <div className={styles.inputRow}>
                <label>Phone</label>
                <input name="client.phone" value={form.client.phone} onChange={handleInputChange} required />
              </div>
              <div className={styles.inputRow}>
                <label>Address</label>
                <input name="client.address" value={form.client.address} onChange={handleInputChange} />
              </div>
              <div className={styles.inputRow}>
                <label>GST Certificate</label>
                <input name="client.GSTCertificate" value={form.client.GSTCertificate} onChange={handleInputChange} />
              </div>
              <div className={styles.inputRow}>
                <label>PAN</label>
                <input name="client.PAN" value={form.client.PAN} onChange={handleInputChange} />
              </div>
            </>
          )}
          {/* Order Details */}
          <div className={styles.inputRow}>
            <label>Estimated Quote</label>
            <input type="number" name="estimatedQuote" value={form.estimatedQuote} onChange={handleInputChange} required />
          </div>
          <div className={styles.inputRow}>
            <label>Negotiation Price</label>
            <input type="number" name="negotiationPrice" value={form.negotiationPrice} onChange={handleInputChange} required />
          </div>
          <div className={styles.inputRow}>
            <label>Final Amount (No GST)</label>
            <input type="number" name="finalAmtWithOutGST" value={form.finalAmtWithOutGST} onChange={handleInputChange} required />
          </div>
          <div className={styles.inputRow}>
            <label>GST %</label>
            <input type="number" name="gstPercentage" value={form.gstPercentage} onChange={handleInputChange} min={0} max={28} />
          </div>
          <div className={styles.inputRow}>
            <label>Remark</label>
            <input name="remark" value={form.remark} onChange={handleInputChange} />
          </div>
          {/* Order Date/Status */}
          <div className={styles.inputRow}>
            <label>Status</label>
            <select name="order.status" value={form.order.status} onChange={handleInputChange}>
              <option value="CREATED">Created</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div className={styles.inputRow}>
            <label>Priority</label>
            <select name="order.priority" value={form.order.priority} onChange={handleInputChange}>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
          <div className={styles.inputRow}>
            <label>Order Start Date</label>
            <input type="datetime-local" name="order.startDate" value={form.order.startDate} onChange={handleInputChange} />
          </div>
          <div className={styles.inputRow}>
            <label>Order End Date</label>
            <input type="datetime-local" name="order.endDate" value={form.order.endDate} onChange={handleInputChange} />
          </div>
          {/* --- PRINT TYPE AND REQUIREMENTS --- */}
          <div className={styles.optionsSection}>
            <div className={styles.optionGroup}>
              <div className={styles.groupTitle}>Select Print Type</div>
              <div className={styles.optionsWrap}>
                {Object.keys(printTypesObj).map((pt) => (
                  <button
                    key={pt}
                    type="button"
                    className={`${styles.optionChip} ${form.selectedPrintType === pt ? styles.selected : ""}`}
                    onClick={() => handlePrintTypeOptionSelect(pt)}
                  >
                    {pt}
                  </button>
                ))}
              </div>
            </div>
            {form.selectedPrintType &&
              Object.entries(optionCategories).map(([group, options]) =>
                renderOptionGroup(group, options)
              )}
          </div>
          <div className={styles.inputRow}>
            <label>Requirement (auto-filled)</label>
            <input
              name="requirements"
              value={form.requirements}
              onChange={handleInputChange}
              placeholder="Selected options will appear here"
              readOnly
              style={{ background: "#f5f5fa" }}
            />
          </div>
          {/* Attachments */}
          <div className={styles.inputRow}>
            <label>Attach Images/Files</label>
            <input
              type="file"
              name="imageFiles"
              onChange={handleInputChange}
              multiple
              accept="image/*"
            />
          </div>
          {/* Submit */}
          <div className={styles.modalActions}>
            <button
              type="button"
              onClick={onClose}
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
  );
}
