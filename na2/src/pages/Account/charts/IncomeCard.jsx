import React from 'react';
import styles from '../Dashboard.module.scss';

const IncomeCard = ({ amount, change, extra }) => {
  return (
    <div className={styles.incomeCard}>
      <h3>Income</h3>
      <div className={styles.incomeAmount}>{amount}</div>
      <div className={styles.incomeChange}>{change}</div>
      <div className={styles.incomeExtra}>You made an extra {extra} this month</div>
    </div>
  );
};

export default IncomeCard;