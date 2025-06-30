import React, { useState } from "react";
import styles from "./EditPrintPrices.module.scss";
import initialPrices from "../../printprices";
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
const COST_KEYS = ["cost", "costCMYK", "costCMYKW"];
export default function PrintPricesEditor() {
  const [data, setData] = useState(deepClone(initialPrices));
  // Selection state
  const [selClient, setSelClient] = useState("");
  const [selOrder, setSelOrder] = useState("");
  const [selPrint, setSelPrint] = useState("");
  const [selGroup, setSelGroup] = useState("");
  // Add new option
  const [newOption, setNewOption] = useState({ name: "", cost: "" });
  // Available keys at each level
  const clientTypes = Object.keys(data.clientTypes);
  const orderTypes = selClient ? Object.keys(data.clientTypes[selClient]?.orderTypes || {}) : [];
  const printTypes = selClient && selOrder
    ? Object.keys(data.clientTypes[selClient].orderTypes[selOrder]?.printTypes || {})
    : [];
  const groups = selClient && selOrder && selPrint
    ? Object.keys(data.clientTypes[selClient].orderTypes[selOrder].printTypes[selPrint] || {}).filter(k => Array.isArray(data.clientTypes[selClient].orderTypes[selOrder].printTypes[selPrint][k]))
    : [];
  const options = selClient && selOrder && selPrint && selGroup
    ? data.clientTypes[selClient].orderTypes[selOrder].printTypes[selPrint][selGroup]
    : [];
  // Helpers to update option
  const handleOptionChange = (idx, key, value) => {
    setData(prev => {
      const newData = deepClone(prev);
      newData.clientTypes[selClient]
        .orderTypes[selOrder]
        .printTypes[selPrint][selGroup][idx][key] = value;
      return newData;
    });
  };
  // Add option to group
  const handleAddOption = () => {
    if (!newOption.name.trim()) return;
    setData(prev => {
      const newData = deepClone(prev);
      newData.clientTypes[selClient]
        .orderTypes[selOrder]
        .printTypes[selPrint][selGroup].push({
          name: newOption.name.trim(),
          cost: newOption.cost || 0,
        });
      return newData;
    });
    setNewOption({ name: "", cost: "" });
  };
  // Remove option
  const handleRemoveOption = idx => {
    setData(prev => {
      const newData = deepClone(prev);
      newData.clientTypes[selClient]
        .orderTypes[selOrder]
        .printTypes[selPrint][selGroup].splice(idx, 1);
      return newData;
    });
  };
  // Save handler
  const handleSave = () => {
    alert("Saved! Check console for updated structure.");
    console.log("UPDATED PRICES:", data);
  };
  // UI
  return (
    <div className={styles.wrapper}>
      <h2>Print Prices Master Editor</h2>
      <div className={styles.selectBar}>
        <div className={styles.selectItem}>
          <label>Client Type</label>
          <select
            value={selClient}
            onChange={e => {
              setSelClient(e.target.value);
              setSelOrder(""); setSelPrint(""); setSelGroup("");
            }}
          >
            <option value="">Select</option>
            {clientTypes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className={styles.selectItem}>
          <label>Order Type</label>
          <select
            value={selOrder}
            onChange={e => {
              setSelOrder(e.target.value);
              setSelPrint(""); setSelGroup("");
            }}
            disabled={!selClient}
          >
            <option value="">Select</option>
            {orderTypes.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className={styles.selectItem}>
          <label>Print Type</label>
          <select
            value={selPrint}
            onChange={e => {
              setSelPrint(e.target.value);
              setSelGroup("");
            }}
            disabled={!selOrder}
          >
            <option value="">Select</option>
            {printTypes.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className={styles.selectItem}>
          <label>Group</label>
          <select
            value={selGroup}
            onChange={e => setSelGroup(e.target.value)}
            disabled={!selPrint}
          >
            <option value="">Select</option>
            {groups.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>
      {/* Option Editor */}
      {selClient && selOrder && selPrint && selGroup ? (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span>
              <b>{selGroup}</b> Options — 
              <span style={{ color: "#2353ee", marginLeft: 7 }}>{selPrint}</span>
            </span>
            <button className={styles.saveBtn} onClick={handleSave}>Save</button>
          </div>
          <div className={styles.optionsTable}>
            <div className={styles.tableHead}>
              <span>Name</span>
              {/* Dynamic cost fields */}
              {(options[0] ? Object.keys(options[0]).filter(k => k !== "name") : ["cost"]).map(k =>
                <span key={k}>{k}</span>
              )}
              <span>Remove</span>
            </div>
            {/* List options */}
            {options.map((opt, idx) =>
              <div key={idx} className={styles.optionRow}>
                <input
                  className={styles.input}
                  value={opt.name}
                  onChange={e => handleOptionChange(idx, "name", e.target.value)}
                  placeholder="Name"
                />
                {Object.keys(opt).filter(k => k !== "name").map(k =>
                  <input
                    key={k}
                    className={styles.input}
                    type="number"
                    value={opt[k]}
                    onChange={e => handleOptionChange(idx, k, e.target.value)}
                    placeholder={k}
                  />
                )}
                {/* Add cost field if missing */}
                {Object.keys(opt).filter(k => k !== "name").length === 0 && (
                  <input
                    className={styles.input}
                    type="number"
                    value={opt.cost}
                    onChange={e => handleOptionChange(idx, "cost", e.target.value)}
                    placeholder="cost"
                  />
                )}
                <button
                  className={styles.delBtn}
                  onClick={() => handleRemoveOption(idx)}
                  title="Remove"
                >×</button>
              </div>
            )}
            {/* Add new */}
            <div className={styles.optionRow}>
              <input
                className={styles.input}
                value={newOption.name}
                onChange={e => setNewOption(opt => ({ ...opt, name: e.target.value }))}
                placeholder="Add new..."
              />
              <input
                className={styles.input}
                type="number"
                value={newOption.cost}
                onChange={e => setNewOption(opt => ({ ...opt, cost: e.target.value }))}
                placeholder="cost"
              />
              <button
                className={styles.addBtn}
                onClick={handleAddOption}
                title="Add"
              >＋</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.hint}>Select all attributes to edit options.</div>
      )}
    </div>
  );
}
