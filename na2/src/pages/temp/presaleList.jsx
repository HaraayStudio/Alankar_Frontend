// import React, { useState } from "react";
// import styles from "./ClientOrdersPage.module.scss";
// import { X } from "lucide-react";

// // DEMO DATA (paste your real data here)
// const clients = [
//   {
//     srNumber: 1,
//     dateTime: "2025-06-28T10:20:39.705297",
//     client: {
//       clientId: 22,
//       clientName: "Vision Marketing",
//       email: "visionmktg@gmail.com",
//       phone: "9876543210"
//     },
//     clientType: "Credit",
//     personName: "Prajwal",
//     approachedVia: "walk-in",
//     orders: [
//       {
//         orderType: "Standee Printing",
//         printType: "Eco solvent",
//         media: "Star Flex",
//         steps: [
//           { id: 1, orderStepName: "Printing", measurement: "Eco Color", status: "CREATED" },
//           { id: 2, orderStepName: "Mounting", measurement: "Roll-up Standy", status: "CREATED" },
//           { id: 3, orderStepName: "Delivery", measurement: "Express", status: "CREATED" }
//         ],
//         unitPrice: 300,
//         qty: 10,
//         budget: 3200,
//         totalAmount: 3000,
//         gST: 12,
//         totalAmountWithGST: 3360,
//         orderStartDateTime: "2025-06-27T16:00:00",
//         orderEndDateTime: "2025-06-28T11:30:00"
//       },
//       {
//         orderType: "Wide format printing",
//         printType: "Eco solvent",
//         media: "Vinyl",
//         steps: [
//           { id: 1, orderStepName: "Printing", measurement: null, status: "CREATED" },
//           { id: 2, orderStepName: "Lamination", measurement: "Matt", status: "CREATED" },
//           { id: 3, orderStepName: "Mounting", measurement: "3mm sunboard", status: "CREATED" }
//         ],
//         unitPrice: 250,
//         qty: 8,
//         budget: 2000,
//         totalAmount: 2000,
//         gST: 12,
//         totalAmountWithGST: 2240,
//         orderStartDateTime: "2025-06-27T09:30:00",
//         orderEndDateTime: "2025-06-27T18:00:00"
//       },
//       {
//         orderType: "Digital Paper printing",
//         printType: "Laser",
//         media: "Glossy Paper",
//         steps: [
//           { id: 1, orderStepName: "Printing", measurement: "A4", status: "CREATED" }
//         ],
//         unitPrice: 10,
//         qty: 300,
//         budget: 3000,
//         totalAmount: 3000,
//         gST: 5,
//         totalAmountWithGST: 3150,
//         orderStartDateTime: "2025-06-27T10:00:00",
//         orderEndDateTime: "2025-06-27T17:30:00"
//       },
//       {
//         orderType: "Banner Printing",
//         printType: "Solvent",
//         media: "Flex",
//         steps: [
//           { id: 1, orderStepName: "Printing", measurement: "Full Color", status: "CREATED" },
//           { id: 2, orderStepName: "Grommets", measurement: "Every 2 feet", status: "CREATED" }
//         ],
//         unitPrice: 40,
//         qty: 25,
//         budget: 1200,
//         totalAmount: 1000,
//         gST: 12,
//         totalAmountWithGST: 1120,
//         orderStartDateTime: "2025-06-28T11:00:00",
//         orderEndDateTime: "2025-06-28T17:00:00"
//       },
//       {
//         orderType: "Label Printing",
//         printType: "Offset",
//         media: "Sticker Sheet",
//         steps: [
//           { id: 1, orderStepName: "Printing", measurement: "CMYK", status: "CREATED" },
//           { id: 2, orderStepName: "Cutting", measurement: "Custom Shape", status: "CREATED" }
//         ],
//         unitPrice: 2,
//         qty: 1000,
//         budget: 2200,
//         totalAmount: 2000,
//         gST: 18,
//         totalAmountWithGST: 2360,
//         orderStartDateTime: "2025-06-29T09:00:00",
//         orderEndDateTime: "2025-06-30T15:00:00"
//       }
//     ],
//     status: "ONGOING"
//   }
//   // You can add more client objects here if you want
// ];

// // Helper: format date
// const formatDate = (dt) =>
//   dt ? new Date(dt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "-";

// // Main Component
// export default function ClientOrdersPage() {
//   const [openOrdersIdx, setOpenOrdersIdx] = useState(null);

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Clients & Orders</h2>
//       <div className={styles.tableWrap}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Sr</th>
//               <th>Client Name</th>
//               <th>Contact</th>
//               <th>Person</th>
//               <th>Client Type</th>
//               <th>Approached Via</th>
//               <th>Orders</th>
//               <th>Status</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {clients.map((cl, idx) => (
//               <tr key={cl.srNumber}>
//                 <td>{cl.srNumber}</td>
//                 <td>{cl.client.clientName}</td>
//                 <td>
//                   <div className={styles.contact}>
//                     <span>{cl.client.phone}</span>
//                     <br />
//                     <span className={styles.email}>{cl.client.email}</span>
//                   </div>
//                 </td>
//                 <td>{cl.personName}</td>
//                 <td>{cl.clientType}</td>
//                 <td>{cl.approachedVia}</td>
//                 <td>
//                   <button
//                     className={styles.ordersBtn}
//                     onClick={() => setOpenOrdersIdx(idx)}
//                   >
//                     Show Orders
//                   </button>
//                 </td>
//                 <td>
//                   <span
//                     className={`${styles.statusBadge} ${styles[cl.status?.toLowerCase()]}`}
//                   >
//                     {cl.status}
//                   </span>
//                 </td>
//                 <td />
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ORDERS POPUP */}
//       {openOrdersIdx !== null && (
//         <div className={styles.popupOverlay} onClick={() => setOpenOrdersIdx(null)}>
//           <div className={styles.popup} onClick={e => e.stopPropagation()}>
//             <div className={styles.popupHeader}>
//               <div>
//                 <span className={styles.clientTitle}>
//                   {clients[openOrdersIdx].client.clientName}
//                 </span>{" "}
//                 <span className={styles.popupSubTitle}>Orders List</span>
//               </div>
//               <button className={styles.closeBtn} onClick={() => setOpenOrdersIdx(null)}>
//                 <X size={22} />
//               </button>
//             </div>
//             <div className={styles.ordersListWrap}>
//               <table className={styles.ordersTable}>
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Order Type</th>
//                     <th>Print Type</th>
//                     <th>Media</th>
//                     <th>Steps</th>
//                     <th>Qty</th>
//                     <th>Unit Price</th>
//                     <th>GST%</th>
//                     <th>Total (With GST)</th>
//                     <th>Start</th>
//                     <th>End</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {clients[openOrdersIdx].orders.map((ord, i) => (
//                     <tr key={i}>
//                       <td>{i + 1}</td>
//                       <td>{ord.orderType}</td>
//                       <td>{ord.printType}</td>
//                       <td>{ord.media}</td>
//                       <td>
//                         <ul className={styles.stepsList}>
//                           {ord.steps.map(st => (
//                             <li key={st.id}>
//                               <span className={styles.stepName}>{st.orderStepName}</span>
//                               {st.measurement && (
//                                 <span className={styles.measurement}>: {st.measurement}</span>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       </td>
//                       <td>{ord.qty}</td>
//                       <td>₹{ord.unitPrice}</td>
//                       <td>{ord.gST}%</td>
//                       <td>₹{ord.totalAmountWithGST}</td>
//                       <td>{formatDate(ord.orderStartDateTime)}</td>
//                       <td>{formatDate(ord.orderEndDateTime)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState } from "react";
import styles from "./CreatePresalesForm.module.scss";
import axios from "axios";

const initialClient = {
  id: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  // add other client fields if required by your backend
};

const initialPreSalesOrderStep = {
  stepNumber: "",
  stepName: "",
  stepValue: "",
};

const initialPreSalesOrder = {
  orderType: "",
  printType: "",
  media: "",
  unitPrice: "",
  qty: "",
  budget: "",
  totalAmount: "",
  gst: "",
  totalAmountWithGST: "",
  orderStartDateTime: "",
  orderEndDateTime: "",
  preSalesOrderSteps: [ { ...initialPreSalesOrderStep } ]
};

const initialPreSales = {
  clientType: "",
  personName: "",
  approachedVia: "",
  preSalesOrders: [ { ...initialPreSalesOrder } ],
  status: "",
  conclusion: "",
};

const CreatePresalesForm = () => {
  const [existingClient, setExistingClient] = useState(true);
  const [client, setClient] = useState({ ...initialClient });
  const [preSales, setPreSales] = useState({ ...initialPreSales });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // Handle change for PreSales root fields
  const handlePreSalesChange = (e) => {
    setPreSales((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle client fields
  const handleClientChange = (e) => {
    setClient((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle nested PreSalesOrders
  const handleOrderChange = (idx, e) => {
    const updatedOrders = preSales.preSalesOrders.map((order, i) =>
      i === idx ? { ...order, [e.target.name]: e.target.value } : order
    );
    setPreSales((prev) => ({ ...prev, preSalesOrders: updatedOrders }));
  };

  // Handle nested PreSalesOrderSteps
  const handleStepChange = (orderIdx, stepIdx, e) => {
    const updatedOrders = preSales.preSalesOrders.map((order, i) => {
      if (i !== orderIdx) return order;
      const updatedSteps = order.preSalesOrderSteps.map((step, sIdx) =>
        sIdx === stepIdx ? { ...step, [e.target.name]: e.target.value } : step
      );
      return { ...order, preSalesOrderSteps: updatedSteps };
    });
    setPreSales((prev) => ({ ...prev, preSalesOrders: updatedOrders }));
  };

  // Add/Remove orders
  const addOrder = () => {
    setPreSales((prev) => ({
      ...prev,
      preSalesOrders: [ ...prev.preSalesOrders, { ...initialPreSalesOrder } ]
    }));
  };
  const removeOrder = (idx) => {
    setPreSales((prev) => ({
      ...prev,
      preSalesOrders: prev.preSalesOrders.filter((_, i) => i !== idx),
    }));
  };

  // Add/Remove steps in order
  const addStep = (orderIdx) => {
    const updatedOrders = preSales.preSalesOrders.map((order, i) => {
      if (i !== orderIdx) return order;
      return {
        ...order,
        preSalesOrderSteps: [ ...order.preSalesOrderSteps, { ...initialPreSalesOrderStep } ],
      };
    });
    setPreSales((prev) => ({ ...prev, preSalesOrders: updatedOrders }));
  };
  const removeStep = (orderIdx, stepIdx) => {
    const updatedOrders = preSales.preSalesOrders.map((order, i) => {
      if (i !== orderIdx) return order;
      return {
        ...order,
        preSalesOrderSteps: order.preSalesOrderSteps.filter((_, sIdx) => sIdx !== stepIdx),
      };
    });
    setPreSales((prev) => ({ ...prev, preSalesOrders: updatedOrders }));
  };

  // Toggle Existing/New client
  const handleClientTypeToggle = () => {
    setExistingClient((val) => !val);
    setClient({ ...initialClient });
  };

  // FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    // Prepare request body
    const requestBody = {
      ...preSales,
      client: existingClient
        ? { id: client.id }
        : { ...client },
    };
console.log(requestBody)
   try {
  const res = await axios.post(
    `http://localhost:8080/api/presales/createpresales?existingClient=${existingClient}`,
    requestBody,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsInVzZXJJZCI6MSwiaWF0IjoxNzUxMTgxMTQ2LCJleHAiOjE3NTEyNjc1NDZ9.YYbsPtMODgouaEkHdyKVp73DXBVFvXCZfSvdgSKH8qM`, // Replace with your token variable
      }
    }
  );
  setResult({ success: true, data: res.data });
} catch (err) {
  setResult({ success: false, message: err?.response?.data?.message || "Error" });
}
setSubmitting(false);

  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
      <h2 className={styles.heading}>Create PreSales</h2>

      {/* Client Type */}
      <div className={styles.clientTypeToggle}>
        <label>
          <input
            type="radio"
            checked={existingClient}
            onChange={() => setExistingClient(true)}
          />
          Existing Client
        </label>
        <label>
          <input
            type="radio"
            checked={!existingClient}
            onChange={() => setExistingClient(false)}
          />
          New Client
        </label>
      </div>

      {/* Client Fields */}
      <div className={styles.section}>
        <h3>Client Information</h3>
        {existingClient ? (
          <div className={styles.row}>
            <label>
              Client ID<span className={styles.required}>*</span>
              <input
                type="text"
                name="id"
                value={client.id}
                onChange={handleClientChange}
                required
                placeholder="Enter Client ID"
              />
            </label>
          </div>
        ) : (
          <>
            <div className={styles.row}>
              <label>
                Name<span className={styles.required}>*</span>
                <input
                  type="text"
                  name="name"
                  value={client.name}
                  onChange={handleClientChange}
                  required
                  placeholder="Enter Client Name"
                />
              </label>
              <label>
                Company
                <input
                  type="text"
                  name="company"
                  value={client.company}
                  onChange={handleClientChange}
                  placeholder="Company Name"
                />
              </label>
            </div>
            <div className={styles.row}>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={client.email}
                  onChange={handleClientChange}
                  placeholder="Email"
                />
              </label>
              <label>
                Phone
                <input
                  type="text"
                  name="phone"
                  value={client.phone}
                  onChange={handleClientChange}
                  placeholder="Phone"
                />
              </label>
            </div>
            {/* Add more fields as needed */}
          </>
        )}
      </div>

      {/* PreSales Root Fields */}
      <div className={styles.section}>
        <h3>PreSales Details</h3>
        <div className={styles.row}>
          <label>
            Client Type
            <input
              type="text"
              name="clientType"
              value={preSales.clientType}
              onChange={handlePreSalesChange}
              placeholder="e.g. Regular, Walk-in"
            />
          </label>
          <label>
            Person Name
            <input
              type="text"
              name="personName"
              value={preSales.personName}
              onChange={handlePreSalesChange}
              placeholder="Contact Person"
            />
          </label>
          <label>
            Approached Via
            <input
              type="text"
              name="approachedVia"
              value={preSales.approachedVia}
              onChange={handlePreSalesChange}
              placeholder="e.g. Email, Phone, In-Person"
            />
          </label>
        </div>
        <div className={styles.row}>
          <label>
            Status
            <input
              type="text"
              name="status"
              value={preSales.status}
              onChange={handlePreSalesChange}
              placeholder="Onboarded / Not onboarded"
            />
          </label>
          <label>
            Conclusion
            <input
              type="text"
              name="conclusion"
              value={preSales.conclusion}
              onChange={handlePreSalesChange}
              placeholder="Onboarded / Not onboarded reason"
            />
          </label>
        </div>
      </div>

      {/* PreSalesOrders (Dynamic) */}
      <div className={styles.section}>
        <h3>PreSales Orders</h3>
        {preSales.preSalesOrders.map((order, idx) => (
          <div key={idx} className={styles.orderCard}>
            <div className={styles.row}>
              <label>
                Order Type
                <input
                  type="text"
                  name="orderType"
                  value={order.orderType}
                  onChange={e => handleOrderChange(idx, e)}
                  placeholder="e.g. wideformatprinting"
                />
              </label>
              <label>
                Print Type
                <input
                  type="text"
                  name="printType"
                  value={order.printType}
                  onChange={e => handleOrderChange(idx, e)}
                  placeholder="e.g. Ecosolvent"
                />
              </label>
              <label>
                Media
                <input
                  type="text"
                  name="media"
                  value={order.media}
                  onChange={e => handleOrderChange(idx, e)}
                  placeholder="e.g. vinyl"
                />
              </label>
            </div>
            <div className={styles.row}>
              <label>
                Unit Price
                <input
                  type="number"
                  name="unitPrice"
                  value={order.unitPrice}
                  onChange={e => handleOrderChange(idx, e)}
                  step="0.01"
                />
              </label>
              <label>
                Qty
                <input
                  type="number"
                  name="qty"
                  value={order.qty}
                  onChange={e => handleOrderChange(idx, e)}
                />
              </label>
              <label>
                Budget
                <input
                  type="number"
                  name="budget"
                  value={order.budget}
                  onChange={e => handleOrderChange(idx, e)}
                  step="0.01"
                />
              </label>
            </div>
            <div className={styles.row}>
              <label>
                Total Amount
                <input
                  type="number"
                  name="totalAmount"
                  value={order.totalAmount}
                  onChange={e => handleOrderChange(idx, e)}
                  step="0.01"
                />
              </label>
              <label>
                GST
                <input
                  type="number"
                  name="gst"
                  value={order.gst}
                  onChange={e => handleOrderChange(idx, e)}
                  step="0.01"
                />
              </label>
              <label>
                Total Amount (With GST)
                <input
                  type="number"
                  name="totalAmountWithGST"
                  value={order.totalAmountWithGST}
                  onChange={e => handleOrderChange(idx, e)}
                  step="0.01"
                />
              </label>
            </div>
            <div className={styles.row}>
              <label>
                Order Start DateTime
                <input
                  type="datetime-local"
                  name="orderStartDateTime"
                  value={order.orderStartDateTime}
                  onChange={e => handleOrderChange(idx, e)}
                />
              </label>
              <label>
                Order End DateTime
                <input
                  type="datetime-local"
                  name="orderEndDateTime"
                  value={order.orderEndDateTime}
                  onChange={e => handleOrderChange(idx, e)}
                />
              </label>
            </div>
            {/* Steps (dynamic) */}
            <div className={styles.stepsSection}>
              <h4>Order Steps</h4>
              {order.preSalesOrderSteps.map((step, sIdx) => (
                <div key={sIdx} className={styles.row}>
                  <label>
                    Step Number
                    <input
                      type="number"
                      name="stepNumber"
                      value={step.stepNumber}
                      onChange={e => handleStepChange(idx, sIdx, e)}
                    />
                  </label>
                  <label>
                    Step Name
                    <input
                      type="text"
                      name="stepName"
                      value={step.stepName}
                      onChange={e => handleStepChange(idx, sIdx, e)}
                      placeholder="e.g. printing, lamination"
                    />
                  </label>
                  <label>
                    Step Value
                    <input
                      type="text"
                      name="stepValue"
                      value={step.stepValue}
                      onChange={e => handleStepChange(idx, sIdx, e)}
                      placeholder="e.g. matt, gloss"
                    />
                  </label>
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeStep(idx, sIdx)}
                    disabled={order.preSalesOrderSteps.length === 1}
                  >Remove Step</button>
                </div>
              ))}
              <button type="button" className={styles.addBtn} onClick={() => addStep(idx)}>
                + Add Step
              </button>
            </div>
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => removeOrder(idx)}
              disabled={preSales.preSalesOrders.length === 1}
            >
              Remove Order
            </button>
          </div>
        ))}
        <button type="button" className={styles.addBtn} onClick={addOrder}>
          + Add Order
        </button>
      </div>

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
  );
};

export default CreatePresalesForm;
