import React, { useState } from "react";
import axios from "axios";

// Initial client and order objects for new client/order
const initialClient = {
  name: "",
  email: "",
  phone: "",
  address: "",
  GSTCertificate: "",
  PAN: ""
};

const initialOrderStep = {
  stepName: "",
  measurement: "",
  status: ""
};

const initialOrder = {
  status: "",
  priority: "",
  createdAt: "",
  startDate: "",
  endDate: "",
  description: "",
  type: "",
  steps: [initialOrderStep] // Start with one step
};

export default function PostSalesForm({  onSubmitSuccess }) {
  const [token, setAuthToken] = useState(localStorage.getItem('token') || '');
  console.log(token);
  
  const [isOldClient, setIsOldClient] = useState(true);
  const [clientId, setClientId] = useState("");
  const [client, setClient] = useState(initialClient);

  const [order, setOrder] = useState(initialOrder);
  const [imageFiles, setImageFiles] = useState([]);

  const [form, setForm] = useState({
    postSalesdateTime: new Date().toISOString().slice(0, 16),
    clientType: "",
    unitPrice: "",
    qty: "",
    estimatedQuote: "",
    negotiationPrice: "",
    finalAmtWithOutGST: "",
    gstPercentage: 18,
    totalAmtWithGST: "",
    remark: "",
    notified: false,
  });

  // Update totalAmtWithGST live
  React.useEffect(() => {
    const finalAmt = parseFloat(form.finalAmtWithOutGST) || 0;
    const gst = parseFloat(form.gstPercentage) || 0;
    setForm(f => ({
      ...f,
      totalAmtWithGST: (finalAmt + (finalAmt * gst / 100)).toFixed(2)
    }));
  }, [form.finalAmtWithOutGST, form.gstPercentage]);

  // Handlers
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClient(c => ({
      ...c,
      [name]: value
    }));
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrder(o => ({
      ...o,
      [name]: value
    }));
  };

  const handleStepChange = (idx, e) => {
    const { name, value } = e.target;
    setOrder(o => ({
      ...o,
      steps: o.steps.map((s, i) =>
        i === idx ? { ...s, [name]: value } : s
      )
    }));
  };

  const addStep = () => {
    setOrder(o => ({
      ...o,
      steps: [...o.steps, { ...initialOrderStep }]
    }));
  };

  const removeStep = (idx) => {
    setOrder(o => ({
      ...o,
      steps: o.steps.filter((_, i) => i !== idx)
    }));
  };

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  // Main submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.clientType || !form.unitPrice || !form.qty || !order.type || !order.status) {
      alert("Please fill all required fields!");
      return;
    }
    if (isOldClient && !clientId) {
      alert("Please enter Client ID for old client.");
      return;
    }

    // Compose postSales object as per backend
    const postSales = {
      postSalesdateTime: form.postSalesdateTime,
      client: isOldClient ? { id: clientId } : { ...client },
      clientType: form.clientType,
      unitPrice: parseFloat(form.unitPrice),
      qty: parseInt(form.qty),
      estimatedQuote: parseFloat(form.estimatedQuote),
      negotiationPrice: parseFloat(form.negotiationPrice),
      finalAmtWithOutGST: parseFloat(form.finalAmtWithOutGST),
      gstPercentage: parseFloat(form.gstPercentage),
      totalAmtWithGST: parseFloat(form.totalAmtWithGST),
      remark: form.remark,
      notified: form.notified,
      order: {
        ...order,
        steps: order.steps.map(s => ({ ...s }))
      }
      // Invoice, receivedPayments: optional, backend will handle if needed
    };

    // Prepare FormData for multipart
    const formData = new FormData();
    formData.append("postSales", new Blob([JSON.stringify(postSales)], { type: "application/json" }));
    formData.append("isOldClient", isOldClient);

    imageFiles.forEach(file => {
      formData.append("imageFiles", file);
    });
    
    try {
      console.log(formData);
      await axios.post(
        "http://localhost:8080/api/postsales/createpostsales",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      alert("PostSales created!");
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      alert("Failed: " + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 700, margin: "0 auto", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 0 16px #ddd" }}>
      <h2 style={{ textAlign: "center" }}>Create Post Sales</h2>
      <div style={{ marginBottom: 16 }}>
        <label>
          Old Client?{" "}
          <input type="checkbox" checked={isOldClient} onChange={() => setIsOldClient(v => !v)} />
        </label>
      </div>
      {isOldClient ? (
        <div style={{ marginBottom: 16 }}>
          <label>
            Client ID <span style={{ color: "red" }}>*</span>
            <input
              name="clientId"
              type="text"
              value={clientId}
              onChange={e => setClientId(e.target.value)}
              required
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
      ) : (
        <fieldset style={{ marginBottom: 16, border: "1px solid #eee", padding: 16 }}>
          <legend>New Client Details</legend>
          {Object.keys(initialClient).map(key => (
            <div key={key} style={{ marginBottom: 8 }}>
              <label>
                {key} <span style={{ color: key === "name" ? "red" : "#888" }}>{key === "name" && "*"}</span>
                <input
                  name={key}
                  type="text"
                  value={client[key]}
                  onChange={handleClientChange}
                  required={key === "name"}
                  style={{ marginLeft: 8 }}
                />
              </label>
            </div>
          ))}
        </fieldset>
      )}

      <div style={{ marginBottom: 16 }}>
        <label>
          Date & Time
          <input
            type="datetime-local"
            name="postSalesdateTime"
            value={form.postSalesdateTime}
            onChange={handleFormChange}
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>
          Client Type <span style={{ color: "red" }}>*</span>
          <input
            name="clientType"
            type="text"
            value={form.clientType}
            onChange={handleFormChange}
            required
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>
          Unit Price <span style={{ color: "red" }}>*</span>
          <input
            name="unitPrice"
            type="number"
            value={form.unitPrice}
            onChange={handleFormChange}
            required
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>
          Quantity <span style={{ color: "red" }}>*</span>
          <input
            name="qty"
            type="number"
            value={form.qty}
            onChange={handleFormChange}
            required
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>
          Estimated Quote
          <input
            name="estimatedQuote"
            type="number"
            value={form.estimatedQuote}
            onChange={handleFormChange}
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>
          Negotiation Price
          <input
            name="negotiationPrice"
            type="number"
            value={form.negotiationPrice}
            onChange={handleFormChange}
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>
          Final Amount (Without GST)
          <input
            name="finalAmtWithOutGST"
            type="number"
            value={form.finalAmtWithOutGST}
            onChange={handleFormChange}
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>
          GST Percentage
          <input
            name="gstPercentage"
            type="number"
            value={form.gstPercentage}
            onChange={handleFormChange}
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>
          <b>Total Amt (With GST): {form.totalAmtWithGST}</b>
        </label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>
          Remark
          <input
            name="remark"
            value={form.remark}
            onChange={handleFormChange}
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>
          Notified{" "}
          <input
            type="checkbox"
            name="notified"
            checked={form.notified}
            onChange={handleFormChange}
          />
        </label>
      </div>

      <fieldset style={{ border: "1px solid #eee", padding: 16, marginBottom: 16 }}>
        <legend>Order Details</legend>
        <div style={{ marginBottom: 8 }}>
          <label>
            Order Type <span style={{ color: "red" }}>*</span>
            <input
              name="type"
              value={order.type}
              onChange={handleOrderChange}
              required
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>
            Status <span style={{ color: "red" }}>*</span>
            <input
              name="status"
              value={order.status}
              onChange={handleOrderChange}
              required
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>
            Priority
            <input
              name="priority"
              value={order.priority}
              onChange={handleOrderChange}
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>
            Created At
            <input
              type="datetime-local"
              name="createdAt"
              value={order.createdAt}
              onChange={handleOrderChange}
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>
            Start Date
            <input
              type="datetime-local"
              name="startDate"
              value={order.startDate}
              onChange={handleOrderChange}
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>
            End Date
            <input
              type="datetime-local"
              name="endDate"
              value={order.endDate}
              onChange={handleOrderChange}
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>
            Description
            <input
              name="description"
              value={order.description}
              onChange={handleOrderChange}
              style={{ marginLeft: 8, width: 300 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <b>Order Steps:</b>
          {order.steps.map((step, idx) => (
            <div key={idx} style={{ margin: "8px 0", background: "#f7f8fa", padding: 8, borderRadius: 8 }}>
              <input
                name="stepName"
                placeholder="Step Name"
                value={step.stepName}
                onChange={e => handleStepChange(idx, e)}
                style={{ marginRight: 8 }}
              />
              <input
                name="measurement"
                placeholder="Measurement"
                value={step.measurement}
                onChange={e => handleStepChange(idx, e)}
                style={{ marginRight: 8 }}
              />
              <input
                name="status"
                placeholder="Status"
                value={step.status}
                onChange={e => handleStepChange(idx, e)}
                style={{ marginRight: 8 }}
              />
              <button type="button" onClick={() => removeStep(idx)} disabled={order.steps.length === 1}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addStep}>+ Add Step</button>
        </div>
      </fieldset>

      <div style={{ marginBottom: 16 }}>
        <label>
          Attach Image(s)
          <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ marginLeft: 8 }} />
        </label>
      </div>

      <button type="submit" style={{ padding: "10px 40px", fontWeight: "bold" }}>Submit</button>
    </form>
  );
}
