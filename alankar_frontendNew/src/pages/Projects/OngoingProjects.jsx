// import React, { useState, useEffect } from 'react';
// import './ongoingProjects.scss';
// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const API_URL = 'http://localhost:8080/api/orders/getallorders';
//   const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsInVzZXJJZCI6MSwiaWF0IjoxNzQ5MTE2OTQ5LCJleHAiOjE3NDkyMDMzNDl9.ml2UeCWBDDvaVfY7FtOxMJhyrvAlA_oSZk7LxMt2kXY';
//   useEffect(() => {
//     fetchOrders();
//   }, []);
// const fetchOrders = async () => {
//   try {
//     setLoading(true);
//     const response = await fetch(API_URL, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${TOKEN}`
//          },
//     });
//     console.log('Response status:', response);
//     const result1 = await response.json();
//     const result =result1.data || [];
//     setOrders(result);
//     console.log('API Response:', result);
//   } catch (error) {
//     console.error('Fetch error:', error.message);
//   } finally {
//     setLoading(false);
//   }
// };
//   const getStatusClass = (status) => {
//     switch (status.toLowerCase()) {
//       case 'created':
//         return 'pending';
//       case 'in_progress':
//         return 'inprogress';
//       case 'completed':
//         return 'completed';
//       case 'cancelled':
//         return 'cancelled';
//       default:
//         return 'pending';
//     }
//   };
//   const getPriorityClass = (priority) => {
//     switch (priority.toLowerCase()) {
//       case 'high':
//         return 'high';
//       case 'medium':
//         return 'medium';
//       case 'low':
//         return 'low';
//       default:
//         return 'medium';
//     }
//   };
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };
//   const formatDateRange = (startDate, endDate) => {
//     const start = new Date(startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
//     const end = new Date(endDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
//     return `${start} - ${end}`;
//   };
//   if (loading) {
//     return (
//       <div className="ordersPage">
//         <div className="loadingContainer">
//           <div className="spinner"></div>
//           <p>Loading orders...</p>
//         </div>
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div className="ordersPage">
//         <div className="errorContainer">
//           <h3>Error Loading Orders</h3>
//           <p>{error}</p>
//           <button onClick={fetchOrders} className="retryBtn">
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="ordersPage">
//       <div className="header">
//         <h2 className="heading">📦 Orders Management</h2>
//         <div className="headerActions">
//           <button onClick={fetchOrders} className="refreshBtn">
//             🔄 Refresh
//           </button>
//           <div className="orderCount">
//             Total Orders: <span>{orders.length}</span>
//           </div>
//         </div>
//       </div>
//       <div className="tableContainer">
//         <table className="orderTable">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Customer</th>
//               <th>Type</th>
//               <th>Description</th>
//               <th>Status</th>
//               <th>Priority</th>
//               <th>Schedule</th>
//               <th>Created</th>
//               <th>Steps</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id} className="orderRow">
//                 <td className="orderId">#{order.id}</td>
//                 <td className="customerInfo">
//                   <div className="customerName">{order.client.name}</div>
//                   <div className="customerContact">
//                     {order.client.email}
//                     <br />
//                     {order.client.phone}
//                   </div>
//                 </td>
//                 <td className="printType">{order.type}</td>
//                 <td className="description" title={order.description}>
//                   {order.description.length > 50
//                     ? `${order.description.substring(0, 50)}...`
//                     : order.description}
//                 </td>
//                 <td>
//                   <span className={`status ${getStatusClass(order.status)}`}>
//                     {order.status}
//                   </span>
//                 </td>
//                 <td>
//                   <span className={`priority ${getPriorityClass(order.priority)}`}>
//                     {order.priority}
//                   </span>
//                 </td>
//                 <td className="schedule">
//                   {formatDateRange(order.startDate, order.endDate)}
//                 </td>
//                 <td className="createdDate">
//                   {formatDate(order.createdAt)}
//                 </td>
//                 <td className="stepsCount">
//                   <span className="stepsBadge">
//                     {order.steps.length} steps
//                   </span>
//                 </td>
//                 <td className="actions">
//                   <button className="actionBtn view" title="View Details">
//                     👁️
//                   </button>
//                   <button className="actionBtn edit" title="Edit Order">
//                     ✏️
//                   </button>
//                   <button className="actionBtn delete" title="Delete Order">
//                     🗑️
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {orders.length === 0 && (
//           <div className="emptyState">
//             <div className="emptyIcon">📭</div>
//             <h3>No Orders Found</h3>
//             <p>There are no orders to display at the moment.</p>
//           </div>
//         )}
//       </div>
//       {/* Order Details Modal/Expandable Section */}
//       <div className="orderSummary">
//         <h3>Summary</h3>
//         <div className="summaryCards">
//           <div className="summaryCard">
//             <div className="cardTitle">Total Orders</div>
//             <div className="cardValue">{orders.length}</div>
//           </div>
//           <div className="summaryCard">
//             <div className="cardTitle">Pending</div>
//             <div className="cardValue">
//               {orders.filter(order => order.status.toLowerCase() === 'created').length}
//             </div>
//           </div>
//           <div className="summaryCard">
//             <div className="cardTitle">High Priority</div>
//             <div className="cardValue">
//               {orders.filter(order => order.priority.toLowerCase() === 'high').length}
//             </div>
//           </div>
//           <div className="summaryCard">
//             <div className="cardTitle">Wide Format</div>
//             <div className="cardValue">
//               {orders.filter(order => order.type === 'Wide format printing').length}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Orders;
import axios from "axios";
import React, { useState, useEffect ,useContext} from "react";
import "./ongoingProjects.scss";
import { DataContext } from '../../context/DataContext';
const Orders = () => {
  const { setAuthToken ,authToken,orders} = useContext(DataContext);
  // const [orders, setOrders] = useState([]);
  console.log("Orders component rendered with orders:", orders);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const API_URL = "http://localhost:8080/api/orders/getallorders";
  const TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsInVzZXJJZCI6MSwiaWF0IjoxNzQ5NDM3NjkyLCJleHAiOjE3NDk1MjQwOTJ9.CI--71ybegIDreWlvYCi7sUnBx47dEZn-4kdZ2BJJHw";
//  const TOKEN = localStorage.getItem("token");
 console.log("Auth Token:", TOKEN);
  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      console.log("Response status:", response);
      const result1 = await response.json();
      const result = result1.data || [];
      // setOrders(result);
      console.log("API Response:", result);
    } catch (error) {
      console.error("Fetch error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "created":
        return "pending";
      case "in_progress":
        return "inprogress";
      case "completed":
        return "completed";
      case "cancelled":
        return "cancelled";
      default:
        return "pending";
    }
  };
  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "high";
      case "medium":
        return "medium";
      case "low":
        return "low";
      default:
        return "medium";
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
const handleSendEmail = async (orderId) => {
  try {
    const token = localStorage.getItem("token"); // get the token correctly
    const response = await axios.post(
      "http://localhost:8080/api/orders/sendordercompletemail",
      null, // No request body
      {
        params: { orderId }, // This is how you send @RequestParam
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    console.log("Mail Sent:", response.data);
    alert(" email sent successfully!");
  } catch (error) {
    console.error("Error sending mail:", error);
    alert("Failed to send email.");  
  }
};
  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    });
    const end = new Date(endDate).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    });
    return `${start} - ${end}`;
  };
  if (loading) {
    return (
      <div className="ordersPage">
        <div className="loadingContainer">
          <div className="spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="ordersPage">
        <div className="errorContainer">
          <h3>Error Loading Orders</h3>
          <p>{error}</p>
          <button onClick={fetchOrders} className="retryBtn">
            Try Again
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="ordersPage">
      <div className="header">
        <h2 className="heading">📦 Orders Management</h2>
        <div className="headerActions">
          <button onClick={fetchOrders} className="refreshBtn"> 
            🔄 Refresh
          </button>
          <div className="orderCount">
            Total Orders: <span>{orders.length}</span>
          </div>
        </div>
      </div>
      <div className="tableContainer">
        <table className="orderTable">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Type</th>
              <th>Description</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Schedule</th>
              <th>Created</th>
              {/* <th>Steps</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="orderRow">
                <td className="orderId">#{order.id}</td>
                <td className="customerInfo">
                  <div className="customerName">{order.client.name}</div>
                  <div className="customerContact">
                    {order.client.email}
                    <br />
                    {order.client.phone}
                  </div>
                </td>
                <td className="printType">{order.type}</td>
                <td className="description" title={order.description}>
                  {order.description.length > 50
                    ? `${order.description.substring(0, 50)}...`
                    : order.description}
                </td>
                <td>
                  <span className={`status ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <span
                    className={`priority ${getPriorityClass(order.priority)}`}
                  >
                    {order.priority}
                  </span>
                </td>
                <td className="schedule">
                  {formatDateRange(order.startDate, order.endDate)}
                </td>
                <td className="createdDate">{formatDate(order.createdAt)}</td>
                {/* <td className="stepsCount">
                  <span className="stepsBadge">
                    {order.steps.length} steps
                  </span>
                </td> */}
                <td className="actions">
                  <button
                    className="actionBtn view"
                    title="View Details"
                    onClick={() => handleViewOrder(order)}
                  >
                    👁️
                  </button>
                  <button className="actionBtn edit" title="Edit Order">
                    ✏️
                  </button>
                  <button className="actionBtn delete" title="Delete Order">
                    🗑️
                  </button>
                  <button
                    className="actionBtn delete"
                    onClick={() => handleSendEmail(order.id)} 
                  >
                    EMAIL
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="emptyState">
            <div className="emptyIcon">📭</div>
            <h3>No Orders Found</h3>
            <p>There are no orders to display at the moment.</p>
          </div>
        )}
      </div>
      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h2>Order Details - #{selectedOrder.id}</h2>
              <button className="closeBtn" onClick={closeModal}>
                ✕
              </button>
            </div>
            <div className="modalBody">
              {/* Basic Order Information */}
              <div className="detailSection">
                <h3>📋 Order Information</h3>
                <div className="detailGrid">
                  <div className="detailItem">
                    <span className="label">Order ID:</span>
                    <span className="value">#{selectedOrder.id}</span>
                  </div>
                  <div className="detailItem">
                    <span className="label">Type:</span>
                    <span className="value">{selectedOrder.type}</span>
                  </div>
                  <div className="detailItem">
                    <span className="label">Status:</span>
                    <span
                      className={`status ${getStatusClass(
                        selectedOrder.status
                      )}`}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="label">Priority:</span>
                    <span
                      className={`priority ${getPriorityClass(
                        selectedOrder.priority
                      )}`}
                    >
                      {selectedOrder.priority}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="label">Created:</span>
                    <span className="value">
                      {formatDate(selectedOrder.createdAt)}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="label">Start Date:</span>
                    <span className="value">
                      {formatDate(selectedOrder.startDate)}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="label">End Date:</span>
                    <span className="value">
                      {formatDate(selectedOrder.endDate)}
                    </span>
                  </div>
                </div>
                <div className="detailItem fullWidth">
                  <span className="label">Description:</span>
                  <span className="value">{selectedOrder.description}</span>
                </div>
              </div>
              {/* Client Information */}
              <div className="detailSection">
                <h3>👤 Client Information</h3>
                <div className="detailGrid">
                  <div className="detailItem">
                    <span className="label">Name:</span>
                    <span className="value">{selectedOrder.client.name}</span>
                  </div>
                  <div className="detailItem">
                    <span className="label">Email:</span>
                    <span className="value">{selectedOrder.client.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="label">Phone:</span>
                    <span className="value">{selectedOrder.client.phone}</span>
                  </div>
                  <div className="detailItem fullWidth">
                    <span className="label">Address:</span>
                    <span className="value">
                      {selectedOrder.client.address}
                    </span>
                  </div>
                </div>
              </div>
              {/* Order Steps */}
              <div className="detailSection">
                <h3>🔧 Order Steps ({selectedOrder.steps.length})</h3>
                <div className="stepsContainer">
                  {selectedOrder.steps
                    .sort((a, b) => a.sequence - b.sequence)
                    .map((step, index) => (
                      <div key={step.id} className="stepItem">
                        <div className="stepHeader">
                          <span className="stepNumber">{step.sequence}</span>
                          <span className="stepName">{step.orderStepName}</span>
                          <span
                            className={`stepStatus ${getStatusClass(
                              step.status
                            )}`}
                          >
                            {step.status}
                          </span>
                        </div>
                        <div className="stepMeasurement">
                          <span className="measurementLabel">Measurement:</span>
                          <span className="measurementValue">
                            {step.measurement}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {/* Images Section */}
              <div className="detailSection">
                <h3>🖼️ Images</h3>
                {selectedOrder.images && selectedOrder.images.length > 0 ? (
                  <div className="imagesContainer">
                    {selectedOrder.images.map((image, index) => (
                      <div key={index} className="imageItem">
                        <img
                          src={image.imageUrl}
                          alt={`Order image ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="noImages">No images attached to this order</p>
                )}
              </div>
            </div>
            <div className="modalFooter">
              <button className="btn secondary" onClick={closeModal}>
                Close
              </button>
              <button className="btn primary">Edit Order</button>
            </div>
          </div>
        </div>
      )}
      {/* Order Summary */}
      <div className="orderSummary">
        <h3>Summary</h3>
        <div className="summaryCards">
          <div className="summaryCard">
            <div className="cardTitle">Total Orders</div>
            <div className="cardValue">{orders.length}</div>
          </div>
          <div className="summaryCard">
            <div className="cardTitle">Pending</div>
            <div className="cardValue">
              {
                orders.filter(
                  (order) => order.status.toLowerCase() === "created"
                ).length
              }
            </div>
          </div>
          <div className="summaryCard">
            <div className="cardTitle">High Priority</div>
            <div className="cardValue">
              {
                orders.filter(
                  (order) => order.priority.toLowerCase() === "high"
                ).length
              }
            </div>
          </div>
          <div className="summaryCard">
            <div className="cardTitle">Wide Format</div>
            <div className="cardValue">
              {
                orders.filter((order) => order.type === "Wide format printing")
                  .length
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Orders;
