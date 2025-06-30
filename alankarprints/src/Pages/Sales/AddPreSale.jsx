import React, { useState } from "react";
import styles from "./AddPreSalePopup.module.scss";
import axios from "axios";
import PRINT_PRICES from "../../printprices";

// --- Constants ---
const CLIENT_TYPES = ["Cash", "Online", "Printers"];
const ORDER_STEPS = [
  { key: "Media", label: "Media", stepName: "Printing" },
  { key: "Lamination", label: "Lamination", stepName: "Lamination" },
  { key: "Mounting", label: "Mounting", stepName: "Mounting" },
  { key: "Framing", label: "Framing", stepName: "Framing" },
  { key: "Installation", label: "Installation", stepName: "Installation" }
];
const GST_OPTIONS = [0, 5, 12, 18];

const initialClient = { id: "", name: "", company: "", email: "", phone: "" };
const initialPreSalesOrder = {
  clientType: "",
  orderType: "",
  printType: "",
  media: "",
  qty: 1,
  budget: "",
  gst: 0,
  orderStartDateTime: "",
  orderEndDateTime: "",
  preSalesOrderSteps: []
};
const initialPreSales = {
  clientType: "",
  personName: "",
  approachedVia: "",
  preSalesOrders: [{ ...initialPreSalesOrder }],
  status: "",
  conclusion: ""
};

export default function AddPreSale({ onClose }) {
  const [existingClient, setExistingClient] = useState(true);
  const [client, setClient] = useState({ ...initialClient });
  const [preSales, setPreSales] = useState({ ...initialPreSales });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
const token = localStorage.getItem('token');
  // Update main presale field
  function updatePreSalesField(key, value) {
    setPreSales(ps => ({ ...ps, [key]: value }));
  }

  // Update order field (by index)
  function updateOrderField(idx, key, val) {
    setPreSales(prev => {
      const orders = [...prev.preSalesOrders];
      orders[idx] = { ...orders[idx], [key]: val };
      return { ...prev, preSalesOrders: orders };
    });
  }
  function updateOrderSteps(idx, steps) {
    setPreSales(prev => {
      const orders = [...prev.preSalesOrders];
      orders[idx].preSalesOrderSteps = steps;
      return { ...prev, preSalesOrders: orders };
    });
  }
  function handleAddOrder() {
    setPreSales(ps => ({
      ...ps,
      preSalesOrders: [...ps.preSalesOrders, { ...initialPreSalesOrder, preSalesOrderSteps: [] }]
    }));
  }
  function handleRemoveOrder(idx) {
    setPreSales(ps => {
      const arr = ps.preSalesOrders.slice();
      arr.splice(idx, 1);
      return { ...ps, preSalesOrders: arr.length ? arr : [{ ...initialPreSalesOrder, preSalesOrderSteps: [] }] };
    });
  }

  // ----------- FORM SUBMIT -----------
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    // Calculate order prices before send (to match your structure)
    const ordersToSend = preSales.preSalesOrders.map(order => {
      const { unitPrice, totalAmount, totalAmountWithGST } = calculateOrderAmounts(order);
      return {
        ...order,
        unitPrice,
        totalAmount,
        totalAmountWithGST,
        media: order.media || (order.preSalesOrderSteps.find(s => s.orderStepName === "Printing")?.measurement || ""),
        preSalesOrderSteps: order.preSalesOrderSteps.map((s, i) => ({
          ...s,
          stepNumber: i + 1
        }))
      };
    });

    const requestBody = {
      ...preSales,
      client: existingClient ? { id: client.id } : { ...client },
      preSalesOrders: ordersToSend
    };
    try {
      const res = await axios.post(
        `http://localhost:8080/api/presales/createpresales?existingClient=${existingClient}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,    }
        }
      );
      setResult({ success: true, data: res.data });
    } catch (err) {
      setResult({
        success: false,
        message: err?.response?.data?.message || "Error",
      });
    }
    setSubmitting(false);
  }

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupBox}>
        <button className={styles.closeBtn} onClick={onClose} title="Close">&times;</button>
        <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
          <h2 className={styles.heading}>Add Pre-Sale Entry</h2>
          <p className={styles.subHeading}>Fill in all required fields to register a new pre-sale.</p>
          {/* --- Client Type Toggle --- */}
          <div className={styles.clientTypeToggle}>
            <span>Client Type:</span>
            <label className={existingClient ? styles.selected : ""}>
              <input
                type="radio"
                checked={existingClient}
                onChange={() => setExistingClient(true)}
              /> Existing Client
            </label>
            <label className={!existingClient ? styles.selected : ""}>
              <input
                type="radio"
                checked={!existingClient}
                onChange={() => setExistingClient(false)}
              /> New Client
            </label>
          </div>
          <div className={styles.divider} />
          {/* --- Client Fields --- */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Client Information</h3>
            {existingClient ? (
              <div className={styles.row}>
                <label>
                  <span>Client ID <span className={styles.required}>*</span></span>
                  <input
                    type="text"
                    name="id"
                    value={client.id}
                    onChange={e => setClient(c => ({ ...c, id: e.target.value }))}
                    required
                    placeholder="Enter Client ID"
                  />
                </label>
              </div>
            ) : (
              <>
                <div className={styles.row}>
                  <label>
                    <span>Full Name <span className={styles.required}>*</span></span>
                    <input
                      type="text"
                      name="name"
                      value={client.name}
                      onChange={e => setClient(c => ({ ...c, name: e.target.value }))}
                      required placeholder="Client Name"
                    />
                  </label>
                  <label>
                    <span>Company</span>
                    <input
                      type="text"
                      name="company"
                      value={client.company}
                      onChange={e => setClient(c => ({ ...c, company: e.target.value }))}
                      placeholder="Company Name"
                    />
                  </label>
                </div>
                <div className={styles.row}>
                  <label>
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      value={client.email}
                      onChange={e => setClient(c => ({ ...c, email: e.target.value }))}
                      placeholder="Email"
                    />
                  </label>
                  <label>
                    <span>Phone</span>
                    <input
                      type="text"
                      name="phone"
                      value={client.phone}
                      onChange={e => setClient(c => ({ ...c, phone: e.target.value }))}
                      placeholder="Phone Number"
                    />
                  </label>
                </div>
              </>
            )}
          </div>
          <div className={styles.divider} />
          {/* --- PreSales Root Fields --- */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Pre-Sale Details</h3>
            <div className={styles.row}>
              <label>
                <span>Client Type</span>
                <select
                  value={preSales.clientType}
                  onChange={e => updatePreSalesField("clientType", e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  {CLIENT_TYPES.map(ct => <option key={ct} value={ct}>{ct}</option>)}
                </select>
              </label>
              <label>
                <span>Contact Person</span>
                <input
                  type="text"
                  name="personName"
                  value={preSales.personName}
                  onChange={e => updatePreSalesField("personName", e.target.value)}
                  placeholder="Contact Person"
                />
              </label>
              <label>
                <span>Approached Via</span>
                <input
                  type="text"
                  name="approachedVia"
                  value={preSales.approachedVia}
                  onChange={e => updatePreSalesField("approachedVia", e.target.value)}
                  placeholder="e.g. WhatsApp, Phone"
                />
              </label>
            </div>
            <div className={styles.row}>
              <label>
                <span>Status</span>
                <input
                  type="text"
                  name="status"
                  value={preSales.status}
                  onChange={e => updatePreSalesField("status", e.target.value)}
                  placeholder="Onboarded / Not Onboarded"
                />
              </label>
              <label>
                <span>Conclusion</span>
                <input
                  type="text"
                  name="conclusion"
                  value={preSales.conclusion}
                  onChange={e => updatePreSalesField("conclusion", e.target.value)}
                  placeholder="Conclusion/Reason"
                />
              </label>
            </div>
          </div>
          <div className={styles.divider} />
          {/* --- PreSales Orders (advanced form per order) --- */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Orders</h3>
            {preSales.preSalesOrders.map((order, idx) => (
              <OrderConfigurator
                key={idx}
                index={idx}
                parentClientType={preSales.clientType}
                order={order}
                updateOrderField={(key, val) => updateOrderField(idx, key, val)}
                updateOrderSteps={steps => updateOrderSteps(idx, steps)}
                onRemoveOrder={() => handleRemoveOrder(idx)}
                disableRemove={preSales.preSalesOrders.length === 1}
              />
            ))}
            <button type="button" className={styles.addBtn} onClick={handleAddOrder}>+ Add Order</button>
          </div>
          {/* --- Submit Row --- */}
          <div className={styles.submitRow}>
            <button type="submit" className={styles.submitBtn} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
            {result && (
              <span className={result.success ? styles.successMsg : styles.errorMsg}>
                {result.success ? "Saved Successfully!" : result.message}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// --------------- ORDER CONFIGURATOR COMPONENT -----------------
function OrderConfigurator({
  index, parentClientType, order, updateOrderField, updateOrderSteps, onRemoveOrder, disableRemove
}) {
  const [stepSelections, setStepSelections] = useState({});

  // --- Options ---
  const clientType = order.clientType || parentClientType || "";
  const clientTypesObj = PRINT_PRICES.clientTypes;
  const orderTypesObj = clientType
    ? clientTypesObj[clientType]?.orderTypes || {}
    : {};
  const printTypesObj = order.orderType
    ? orderTypesObj[order.orderType]?.printTypes || {}
    : {};
  const stepOptionLists = order.printType
    ? Object.entries(printTypesObj[order.printType] || {})
        .filter(([group]) => ORDER_STEPS.some(s => s.key === group))
        .reduce((acc, [group, opts]) => {
          acc[group] = opts;
          return acc;
        }, {})
    : {};

  // --- Handlers ---
  function handleClientType(val) {
    updateOrderField("clientType", val);
    updateOrderField("orderType", "");
    updateOrderField("printType", "");
    setStepSelections({});
    updateOrderSteps([]);
  }
  function handleOrderType(val) {
    updateOrderField("orderType", val);
    updateOrderField("printType", "");
    setStepSelections({});
    updateOrderSteps([]);
  }
  function handlePrintType(val) {
    updateOrderField("printType", val);
    setStepSelections({});
    updateOrderSteps([]);
  }
  function handleStepSelect(group, value) {
    const next = { ...stepSelections, [group]: value };
    setStepSelections(next);
    // Build preSalesOrderSteps array
    const steps = ORDER_STEPS
      .map((step, idx) =>
        next[step.key]
          ? {
              stepNumber: idx + 1,
              stepName: step.stepName,
              stepValue: next[step.key],
              status: "CREATED"
            }
          : null
      )
      .filter(Boolean);
    updateOrderSteps(steps);
    // Also update media field for main order
    if (group === "Media") updateOrderField("media", value);
  }

  // --- Calculations for this order ---
  const { unitPrice, totalAmount, totalAmountWithGST } = calculateOrderAmounts({
    ...order,
    preSalesOrderSteps: order.preSalesOrderSteps.length
      ? order.preSalesOrderSteps
      : ORDER_STEPS.map((step, idx) =>
          stepSelections[step.key]
            ? {
                stepNumber: idx + 1,
                stepName: step.stepName,
                stepValue: stepSelections[step.key],
                status: "CREATED"
              }
            : null
        ).filter(Boolean)
  });

  // --- UI ---
  return (
    <div className={styles.orderCard}>
      <div className={styles.row}>
        <label>
          <span>Client Type</span>
          <div className={styles.optionsWrap}>
            {CLIENT_TYPES.map(ct => (
              <button
                type="button"
                key={ct}
                className={`${styles.optionChip} ${clientType === ct ? styles.selected : ""}`}
                onClick={() => handleClientType(ct)}
              >{ct}</button>
            ))}
          </div>
        </label>
        <label>
          <span>Order Type</span>
          <select
            value={order.orderType}
            onChange={e => handleOrderType(e.target.value)}
            required
          >
            <option value="">Select Order Type</option>
            {clientType &&
              Object.keys(clientTypesObj[clientType]?.orderTypes || {}).map(ot => (
                <option key={ot} value={ot}>{ot}</option>
              ))}
          </select>
        </label>
        <label>
          <span>Print Type</span>
          <div className={styles.optionsWrap}>
            {order.orderType &&
              Object.keys(printTypesObj).map(pt => (
                <button
                  key={pt}
                  type="button"
                  className={`${styles.optionChip} ${order.printType === pt ? styles.selected : ""}`}
                  onClick={() => handlePrintType(pt)}
                >{pt}</button>
              ))}
          </div>
        </label>
      </div>
      {/* ---- Step Options ---- */}
      {order.printType && (
        <div className={styles.optionsSection}>
          {ORDER_STEPS.map(step => (
            <div key={step.key} className={styles.optionGroup}>
              <div className={styles.groupTitle}>{step.label}</div>
              <div className={styles.optionsWrap}>
                {(stepOptionLists[step.key] || []).map(opt => (
                  <button
                    key={opt.name}
                    type="button"
                    className={`${styles.optionChip} ${stepSelections[step.key] === opt.name ? styles.selected : ""}`}
                    onClick={() => handleStepSelect(
                      step.key,
                      stepSelections[step.key] === opt.name ? "" : opt.name
                    )}
                  >
                    {opt.name}
                    {typeof opt.cost === "number"
                      ? ` (${opt.cost})`
                      : typeof opt.costCMYK === "number"
                      ? ` (${opt.costCMYK})`
                      : ""}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* ---- Qty, GST, Dates, Price fields ---- */}
      <div className={styles.row}>
        <label>
          <span>Qty</span>
          <input
            type="number"
            value={order.qty || 1}
            min={1}
            onChange={e => updateOrderField("qty", Number(e.target.value))}
          />
        </label>
        <label>
          <span>GST (%)</span>
          <select
            value={order.gst}
            onChange={e => updateOrderField("gst", Number(e.target.value))}
          >
            {GST_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}%</option>
            ))}
          </select>
        </label>
        <label>
          <span>Budget</span>
          <input
            type="number"
            value={order.budget || ""}
            onChange={e => updateOrderField("budget", e.target.value)}
          />
        </label>
      </div>
      <div className={styles.row}>
        <label>
          <span>Order Start</span>
          <input
            type="datetime-local"
            value={order.orderStartDateTime || ""}
            onChange={e => updateOrderField("orderStartDateTime", e.target.value)}
          />
        </label>
        <label>
          <span>Order End</span>
          <input
            type="datetime-local"
            value={order.orderEndDateTime || ""}
            onChange={e => updateOrderField("orderEndDateTime", e.target.value)}
          />
        </label>
      </div>
      {/* --- Calculation summary --- */}
      <div className={styles.calculationRow}>
        <div><strong>Unit Price: </strong>₹{unitPrice}</div>
        <div><strong>Total: </strong>₹{totalAmount}</div>
        <div><strong>Total (GST): </strong>₹{totalAmountWithGST.toFixed(2)}</div>
      </div>
      <button
        type="button"
        className={styles.removeBtn}
        onClick={onRemoveOrder}
        disabled={disableRemove}
      >
        Remove Order
      </button>
    </div>
  );
}

// --- Helper: Calculate prices ---
function calculateOrderAmounts(order) {
  let unitPrice = 0;
  if (order.preSalesOrderSteps && order.preSalesOrderSteps.length) {
    order.preSalesOrderSteps.forEach(step => {
      const stepList = PRINT_PRICES.clientTypes?.[order.clientType]?.orderTypes?.[order.orderType]?.printTypes?.[order.printType]?.[step.stepName === "Printing" ? "Media" : step.stepName] || [];
      const found = stepList.find(opt =>
        opt.name === step.stepValue
      );
      if (found) {
        if (typeof found.cost === "number") unitPrice += found.cost;
        else if (typeof found.costCMYK === "number") unitPrice += found.costCMYK;
      }
    });
  }
  const qty = Number(order.qty) || 1;
  const gst = Number(order.gst) || 0;
  const totalAmount = unitPrice * qty;
  const totalAmountWithGST = totalAmount + (totalAmount * gst) / 100;
  return { unitPrice, totalAmount, totalAmountWithGST };
}
