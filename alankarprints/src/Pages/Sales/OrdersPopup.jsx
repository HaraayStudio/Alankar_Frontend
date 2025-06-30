import React, { useState } from "react";
import styles from "./OrdersPopup.module.scss";
import { X, ChevronDown, ChevronUp } from "lucide-react";

const formatDateTime = (dt) => dt ? dt.slice(0, 16).replace("T", " ") : "-";

export default function OrdersPopup({ orders, srNumber, onClose }) {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        <h2 className={styles.heading}>Orders – PreSale #{srNumber}</h2>
        {!orders?.length ? (
          <div className={styles.noData}>No Orders found.</div>
        ) : (
          <div className={styles.list}>
            {orders.map((order, idx) => {
              const expanded = openIdx === idx;
              return (
                <div
                  className={`${styles.orderCard} ${expanded ? styles.expanded : ""}`}
                  key={order.id || idx}
                >
                  {/* Summary Row */}
                  <div
                    className={styles.orderSummary}
                    onClick={() => setOpenIdx(expanded ? null : idx)}
                    tabIndex={0}
                  >
                    <div className={styles.summaryMain}>
                      <span className={styles.orderType}>{order.orderType}</span>
                      {/* <span className={styles.dot}>•</span> */}
                      <span className={styles.printType}>{order.printType}</span>
                      {/* <span className={styles.dot}>•</span> */}
                      <span className={styles.media}>{order.totalAmountWithGST}</span>
                    </div>
                    <div className={styles.summaryMeta}>
                      <span className={styles.qtyLabel}>Qty:</span>
                      <span className={styles.qty}>{order.qty}</span>
                      <span className={styles.chevronIcon}>
                        {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </span>
                    </div>
                  </div>
                  {/* Expanded Details */}
                  {expanded && (
                    <div className={styles.detailsPanel}>
                      <div className={styles.fieldsGrid}>
                        <div>
                          <label>Unit Price</label>
                          <span>₹{order.unitPrice?.toLocaleString()}</span>
                        </div>
                        <div>
                          <label>Budget</label>
                          <span>₹{order.budget?.toLocaleString()}</span>
                        </div>
                        <div>
                          <label>Total</label>
                          <span>₹{order.totalAmount?.toLocaleString()}</span>
                        </div>
                        <div>
                          <label>GST</label>
                          <span>{order.gst}%</span>
                        </div>
                        <div>
                          <label>Total (GST)</label>
                          <span>₹{order.totalAmountWithGST?.toLocaleString()}</span>
                        </div>
                        <div>
                          <label>Start</label>
                          <span>{formatDateTime(order.orderStartDateTime)}</span>
                        </div>
                        <div>
                          <label>End</label>
                          <span>{formatDateTime(order.orderEndDateTime)}</span>
                        </div>
                      </div>
                      {order.preSalesOrderSteps?.length ? (
                        <div className={styles.stepsPanel}>
                          <div className={styles.stepsTitle}>Order Steps</div>
                          <div className={styles.stepsList}>
                            {order.preSalesOrderSteps.map((step) => (
                              <span className={styles.stepChip} key={step.id || step.stepNumber}>
                                <b>{step.stepName}</b>
                                <span className={styles.stepValue}>: {step.stepValue}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
