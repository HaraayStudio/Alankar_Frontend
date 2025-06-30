import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from '../Dashboard.module.scss';

const ClientActivityChart = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3>Client</h3>
        <div>
          <span>05</span>
        </div>
      </div>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="clients" 
              stroke="#ff7300" 
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClientActivityChart;