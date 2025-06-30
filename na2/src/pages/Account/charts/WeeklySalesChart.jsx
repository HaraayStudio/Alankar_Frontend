import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from '../Dashboard.module.scss';

const WeeklySalesChart = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3>Weekly ↔</h3>
        <span>$5,000</span>
      </div>
      <div className={styles.chartDays}>
        {['W', 'T', 'F', 'S'].map(day => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4299e1" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4299e1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="day" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#4299e1"
              fillOpacity={1}
              fill="url(#colorSales)"
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklySalesChart;