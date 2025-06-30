import React from 'react'
import { useEffect } from "react";
import { useData } from "../../context/DataContext";


 
export default function Dashboard() {
   const { handleGetAllClients, clients ,presales,postSales, authToken} = useData();

  // useEffect(() => {
  //   handleGetAllClients(); // or just dispatch(fetchClients(token)) directly if you want
  // }, []);

  return (
<div>
  dashboard
  <p>authToken {authToken}</p>
  <div>
    {presales.map((item, idx) => (
      <div key={idx} style={{border: '1px solid #ddd', margin: '8px', padding: '8px'}}>
        <strong>Presale {idx+1}</strong><br/>
        approachedVia: {item.approachedVia}<br/>
        client: {item.client.clientName} ({item.client.email}, {item.client.phone})<br/>
        clientType: {item.clientType}<br/>
        conclusion: {item.conclusion}<br/>
        dateTime: {item.dateTime}<br/>
        personName: {item.personName}<br/>
        srNumber: {item.srNumber}<br/>
        status: {item.status}
      </div>
    ))}
  </div>    <div>
        {postSales && postSales.length > 0 ? (
          postSales.map((post, idx) => (
            <div
              key={post.srNumber || idx}
              style={{
                border: "1px solid #ddd",
                margin: "16px 0",
                padding: "16px",
                borderRadius: "8px",
                background: "#fafafa",
              }}
            >
              <strong>PostSale #{post.srNumber}</strong>
              <br />
              <b>Date:</b> {post.postSalesdateTime}
              <br />
              <b>Client:</b> {post.client?.clientName} ({post.client?.email}, {post.client?.phone})
              <br />
              <b>Client Type:</b> {post.clientType}
              <br />
              <b>Status:</b> {post.status}
              <br />
              <b>Remark:</b> {post.remark || "-"}
              <br />
              <b>Notified:</b> {post.notified ? "Yes" : "No"}
              <br />
              <b>Orders:</b>
              <div style={{ marginLeft: "24px", marginTop: "8px" }}>
                {post.orders && post.orders.length > 0 ? (
                  post.orders.map((order, oidx) => (
                    <div
                      key={order.id}
                      style={{
                        border: "1px solid #cce",
                        marginBottom: "10px",
                        padding: "10px",
                        borderRadius: "6px",
                        background: "#fff",
                      }}
                    >
                      <b>Order #{order.id}</b>
                      <br />
                      Status: {order.status}
                      <br />
                      Priority: {order.priority}
                      <br />
                      Type: {order.orderType}
                      <br />
                      Print: {order.printType}
                      <br />
                      Media: {order.media}
                      <br />
                      Qty: {order.qty}
                      <br />
                      Unit Price: {order.unitPrice}
                      <br />
                      GST: {order.gst}%
                      <br />
                      Total: ₹{order.totalAmount}
                      <br />
                      Total (with GST): ₹{order.totalAmountWithGST}
                      <br />
                      <b>Steps:</b>
                      <ul>
                        {order.steps?.map((step) => (
                          <li key={step.id}>
                            {step.orderStepName} ({step.measurement}) — <em>{step.status}</em>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <em>No Orders</em>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No PostSales data found.</div>
        )}
      </div>
</div>

  )
}
