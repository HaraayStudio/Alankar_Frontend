import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from '../Dashboard.module.scss';

const InvesteesChart = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3>Investees</h3>
        <div>
          <span>Weekly ↔</span>
          <span>100</span>
          <span>1.10%</span>
        </div>
      </div>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#8884d8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InvesteesChart;