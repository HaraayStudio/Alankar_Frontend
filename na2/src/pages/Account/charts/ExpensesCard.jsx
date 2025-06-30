import React from 'react';
import styles from '../Dashboard.module.scss';

const ExpensesCard = ({ amount, change, extra }) => {
  return (
    <div className={styles.expensesCard}>
      <h3>Expenses</h3>
      <div className={styles.expensesAmount}>{amount}</div>
      <div className={styles.expensesChange}>{change}</div>
      <div className={styles.expensesExtra}>You made an extra {extra} this month</div>
    </div>
  );
};

export default ExpensesCard;