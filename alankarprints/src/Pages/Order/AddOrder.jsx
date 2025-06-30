import React, { useState, useMemo } from "react";
import styles from "./AddProject.module.scss";
import PRINT_PRICES from "../../printprices";
import { useData } from "../../context/DataContext";

// Helper: get step groups from current printType selection
function getStepGroups(clientType, orderType, printType) {
  return (
    PRINT_PRICES.clientTypes?.[clientType]?.orderTypes?.[orderType]?.printTypes?.[printType] || {}
  );
}

// Helper: options for each group
function getOptionCategories(stepGroups) {
  const categories = {};
  Object.entries(stepGroups).forEach(([group, options]) => {
    categories[group] = options.map((opt) => opt.name);
  });
  return categories;
}

function getOptionCost(stepGroups, group, name) {
  const arr = stepGroups[group];
  if (!Array.isArray(arr)) return 0;
  const found = arr.find((o) => o.name === name);
  if (!found) return 0;
  if (typeof found.cost === "number") return found.cost;
  if (typeof found.costCMYK === "number") return found.costCMYK;
  return 0;
}

function buildDescription(printType, selections) {
  let desc = printType;
  if (selections?.Media) desc += " + " + selections.Media;
  let reqArr = [];
  Object.entries(selections)
    .filter(([g]) => g !== "Media" && g !== "qty")
    .forEach(([group, value]) => {
      if (value) reqArr.push(`${group.toLowerCase()}:${value}`);
    });
  if (reqArr.length) desc += " - " + reqArr.join(" + ");
  return desc;
}

function calcAmount(stepGroups, selections, qty, unitPrice) {
  if (unitPrice && Number(unitPrice) > 0) return qty * unitPrice;
  let sum = 0;
  Object.entries(selections).forEach(([group, value]) => {
    if (!value || group === "qty") return;
    sum += getOptionCost(stepGroups, group, value);
  });
  return sum * qty;
}

// Helper: get available print types for selected client and order type
function getAvailablePrintTypes(clientType, orderType) {
  return Object.keys(
    PRINT_PRICES.clientTypes?.[clientType]?.orderTypes?.[orderType]?.printTypes || {}
  );
}

const orderTypes = Object.keys(PRINT_PRICES.clientTypes.Online.orderTypes);
const initialClient = { name: "", email: "", phone: "", address: "", GSTCertificate: "", PAN: "" };

export default function CreatePostSalesForm() {
  const { handleCreatePostSale, postSalesLoading, postSalesError } = useData();
  const [form, setForm] = useState({
    clientType: "Online",
    orderType: orderTypes[0],
    printType: "",
    selections: {},
    qty: 1,
    unitPrice: "",
    gstPercentage: 18,
    client: { ...initialClient },
    remark: "",
    notified: false,
    negotiationPrice: "",
    finalAmtWithOutGST: "",
    totalAmtWithGST: "",
    estimatedQuote: "",
    postSalesdateTime: "",
    order: {
      status: "CREATED",
      priority: "HIGH",
      createdAt: "",
      startDate: "",
      endDate: "",
      description: "",
      steps: [],
    },
  });

  // Memo: stepGroups and categories for the selected print type
  const stepGroups = useMemo(
    () =>
      form.clientType && form.orderType && form.printType
        ? getStepGroups(form.clientType, form.orderType, form.printType)
        : {},
    [form.clientType, form.orderType, form.printType]
  );

  const optionCategories = useMemo(() => getOptionCategories(stepGroups), [stepGroups]);
  const stepGroupNames = Object.keys(optionCategories);

  // Get available print types based on current client and order type
  const availablePrintTypes = useMemo(
    () => getAvailablePrintTypes(form.clientType, form.orderType),
    [form.clientType, form.orderType]
  );

  // Step selection handler
  function handleStepSelect(group, option) {
    setForm((f) => ({
      ...f,
      selections: { ...f.selections, [group]: option },
    }));
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "clientType" || name === "orderType"
        ? { printType: "", selections: {} }
        : {}),
    }));
  }

  function handleQtyChange(e) {
    const v = Math.max(1, Number(e.target.value));
    setForm((f) => ({ ...f, qty: v }));
  }

  // Handle client input changes
  function handleClientChange(e) {
    const { name, value } = e.target;
    const clientField = name.replace('client.', '');
    setForm((f) => ({
      ...f,
      client: { ...f.client, [clientField]: value }
    }));
  }

  // Build description, prices, steps array
  const description = useMemo(
    () =>
      form.printType && Object.keys(form.selections).length
        ? buildDescription(form.printType, form.selections)
        : "",
    [form.printType, form.selections]
  );

  const calculatedUnitPrice = useMemo(
    () =>
      form.printType && Object.keys(form.selections).length
        ? calcAmount(stepGroups, form.selections, 1)
        : 0,
    [stepGroups, form.selections, form.printType]
  );

  const amountWithoutGST = useMemo(() => {
    const amt = form.unitPrice && Number(form.unitPrice) > 0
      ? form.qty * Number(form.unitPrice)
      : form.qty * calculatedUnitPrice;
    return amt || 0;
  }, [form.qty, form.unitPrice, calculatedUnitPrice]);

  const totalAmtWithGST = useMemo(() => {
    const amt = Number(amountWithoutGST) || 0;
    const gst = Number(form.gstPercentage) || 0;
    return Math.round(amt + amt * gst / 100);
  }, [amountWithoutGST, form.gstPercentage]);

  const stepsArr = useMemo(
    () =>
      stepGroupNames
        .filter((group) => !!form.selections[group])
        .map((group) => ({
          stepName: group,
          measurement: form.selections[group],
          status: "CREATED",
        })),
    [stepGroupNames, form.selections]
  );

  // Render option group similar to PreSalesPage
  const renderOptionGroup = (group, options) => (
    <div className={styles.optionGroup} key={group}>
      <div className={styles.groupTitle}>
        {group.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
      </div>
      <div className={styles.optionsWrap}>
        {options.map((option) => {
          const isSelected = form.selections[group] === option;
          const cost = getOptionCost(stepGroups, group, option);
          
          return (
            <button
              key={option}
              type="button"
              className={`${styles.optionChip} ${isSelected ? styles.selected : ""}`}
              onClick={() => handleStepSelect(group, option)}
              title={cost > 0 ? `Cost: ₹${cost}` : ''}
            >
              {option}
              {cost > 0 && <span className={styles.costBadge}>₹{cost}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validation
    if (!form.printType) {
      alert("Please select a print type");
      return;
    }

    if (!form.client.name || !form.client.email || !form.client.phone) {
      alert("Please fill in all required client details");
      return;
    }

    const postSaleObj = {
      ...form,
      unitPrice: form.unitPrice || calculatedUnitPrice,
      estimatedQuote: amountWithoutGST,
      negotiationPrice: amountWithoutGST,
      finalAmtWithOutGST: amountWithoutGST,
      gstPercentage: form.gstPercentage,
      totalAmtWithGST,
      order: {
        ...form.order,
        printType: form.printType,
        description,
        steps: stepsArr,
      },
    };
    
    await handleCreatePostSale(postSaleObj, false);
  }

  return (
    <form className={styles.createForm} onSubmit={handleSubmit}>
      <h2>Create Post Sales (Dynamic Steps)</h2>
      
      {postSalesError && <div className={styles.error}>{postSalesError}</div>}
      
      <div className={styles.grid}>
        <label>
          Client Type
          <select name="clientType" value={form.clientType} onChange={handleChange}>
            {Object.keys(PRINT_PRICES.clientTypes).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        
        <label>
          Order Type
          <select name="orderType" value={form.orderType} onChange={handleChange}>
            {orderTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        
        <label>
          Quantity
          <input
            type="number"
            name="qty"
            min={0}
            value={form.qty}
            onChange={handleQtyChange}
            required
          />
        </label>
      </div>

      {/* Dynamic Print Type and Step Selection */}
      <div className={styles.optionsSection}>
        <div className={styles.optionGroup}>
          <div className={styles.groupTitle}>Select Print Type</div>
          <div className={styles.optionsWrap}>
            {availablePrintTypes.map((pt) => (
              <button
                key={pt}
                type="button"
                className={`${styles.optionChip} ${form.printType === pt ? styles.selected : ""}`}
                onClick={() => setForm(f => ({ ...f, printType: pt, selections: {} }))}
              >
                {pt}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic step options based on selected print type */}
        {form.printType && Object.entries(optionCategories).map(([group, options]) =>
          renderOptionGroup(group, options)
        )}
      </div>

      {/* Pricing Section */}
      <div className={styles.grid}>
        <label>
          Unit Price (Calculated: ₹{calculatedUnitPrice})
          <input
            type="number"
            name="unitPrice"
            value={form.unitPrice}
            onChange={handleChange}
            placeholder={`Auto: ₹${calculatedUnitPrice} or enter custom`}
            min="0"
            step="0.01"
          />
        </label>
        
        <label>
          Amount without GST
          <input
            type="number"
            name="finalAmtWithOutGST"
            value={amountWithoutGST}
            readOnly
            className={styles.readOnly}
          />
        </label>
        
        <label>
          GST %
          <select name="gstPercentage" value={form.gstPercentage} onChange={handleChange}>
            <option value={5}>5%</option>
            <option value={12}>12%</option>
            <option value={18}>18%</option>
            {/* <option value={28}>28%</option> */}
          </select>
        </label>
        
        <label>
          Total With GST
          <input
            type="number"
            name="totalAmtWithGST"
            value={totalAmtWithGST}
            readOnly
            className={styles.readOnly}
          />
        </label>
      </div>

      <label>
        Description (Auto-generated)
        <input 
          type="text" 
          value={description} 
          readOnly 
          className={styles.readOnly}
          placeholder="Will be generated based on selections"
        />
      </label>

      {/* Client Details Section */}
      <div className={styles.section}>
        <h3>Client Details</h3>
        <div className={styles.grid}>
          <label>
            Name *
            <input 
              type="text" 
              name="client.name" 
              value={form.client.name} 
              onChange={handleClientChange}
              required
              placeholder="Full name"
            />
          </label>
          
          <label>
            Email *
            <input 
              type="email" 
              name="client.email" 
              value={form.client.email} 
              onChange={handleClientChange}
              required
              placeholder="email@example.com"
            />
          </label>
          
          <label>
            Phone *
            <input 
              type="tel" 
              name="client.phone" 
              value={form.client.phone} 
              onChange={handleClientChange}
              required
              placeholder="10-digit phone number"
            />
          </label>
          
          <label>
            Address
            <input 
              type="text" 
              name="client.address" 
              value={form.client.address} 
              onChange={handleClientChange}
              placeholder="Complete address"
            />
          </label>
          
          <label>
            GST Certificate
            <input 
              type="text" 
              name="client.GSTCertificate" 
              value={form.client.GSTCertificate} 
              onChange={handleClientChange}
              placeholder="GST certificate number"
            />
          </label>
          
          <label>
            PAN
            <input 
              type="text" 
              name="client.PAN" 
              value={form.client.PAN} 
              onChange={handleClientChange}
              placeholder="PAN number"
            />
          </label>
        </div>
      </div>

      {/* Additional Fields */}
      <div className={styles.grid}>
        <label>
          Remark
          <textarea 
            name="remark" 
            value={form.remark} 
            onChange={handleChange}
            placeholder="Any additional remarks"
            rows="3"
          />
        </label>
        
        <label>
          Post Sales Date & Time
          <input 
            type="datetime-local" 
            name="postSalesdateTime" 
            value={form.postSalesdateTime} 
            onChange={handleChange}
          />
        </label>
      </div>

      {/* Order Details */}
      <div className={styles.section}>
        <h3>Order Details</h3>
        <div className={styles.grid}>
          <label>
            Priority
            <select 
              name="order.priority" 
              value={form.order.priority} 
              onChange={(e) => setForm(f => ({...f, order: {...f.order, priority: e.target.value}}))}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </label>
          
          <label>
            Start Date
            <input 
              type="datetime-local" 
              name="order.startDate" 
              value={form.order.startDate} 
              onChange={(e) => setForm(f => ({...f, order: {...f.order, startDate: e.target.value}}))}
            />
          </label>
          
          <label>
            End Date
            <input 
              type="datetime-local" 
              name="order.endDate" 
              value={form.order.endDate} 
              onChange={(e) => setForm(f => ({...f, order: {...f.order, endDate: e.target.value}}))}
            />
          </label>
        </div>
      </div>

      {/* Steps Preview */}
      {stepsArr.length > 0 && (
        <div className={styles.section}>
          <h3>Steps Preview</h3>
          <div className={styles.stepsPreview}>
            {stepsArr.map((step, index) => (
              <div key={index} className={styles.stepItem}>
                <span className={styles.stepName}>{step.stepName}</span>
                <span className={styles.stepMeasurement}>{step.measurement}</span>
                <span className={styles.stepStatus}>{step.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button type="submit" className={styles.submitBtn} disabled={postSalesLoading}>
        {postSalesLoading ? "Creating..." : "Create Post Sale"}
      </button>
    </form>
  );
}