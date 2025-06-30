import React from 'react';
import styles from '../Dashboard.module.scss';

const PaymentDues = ({ invoices }) => {
  return (
    <div className={styles.paymentDuesCard}>
      <div className={styles.header}>
        <h3>Payment Dues</h3>
        <button className={styles.seeAll}>See all</button>
      </div>
      <div className={styles.paymentList}>
        {invoices.map(invoice => (
          <div key={invoice.id} className={styles.paymentItem}>
            <div className={styles.clientInfo}>
              <div className={styles.clientName}>{invoice.clientName}</div>
              <div className={styles.paymentDate}>{invoice.issueDate}</div>
            </div>
            <div className={styles.paymentStatus}>
              <span className={styles.amount}>${invoice.totalAmountWithGST}</span>
              <span className={styles.status}>{invoice.payments[0].status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentDues;