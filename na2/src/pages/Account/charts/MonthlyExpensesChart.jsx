import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from '../Dashboard.module.scss';

const MonthlyExpensesChart = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3>Expenses</h3>
        <div>
          <span>Weekly ↔</span>
        </div>
      </div>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="clients" fill="#82ca9d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyExpensesChart;