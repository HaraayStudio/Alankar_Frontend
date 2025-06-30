import React from 'react';
import styles from './Chart1.module.scss';

const ReportsPieChart = () => {
  // Data for the chart - adjusted to match the visual proportions
  const data = [
    { label: 'Total Clients', value: 45, color: '#3B82F6' }, // Blue
    { label: 'Active Clients', value: 25, color: '#F59E0B' }, // Orange
    { label: 'Active Clients', value: 20, color: '#C084FC' }, // Purple
    { label: 'Total Clients', value: 10, color: '#E5E7EB' }, // Light gray
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate angles for each segment
  let cumulativeAngle = 0;
  const segments = data.map(item => {
    const angle = (item.value / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle += angle;
    
    return {
      ...item,
      startAngle,
      endAngle,
      angle
    };
  });

  // Create SVG path for donut segment
  const createPath = (startAngle, endAngle, innerRadius, outerRadius) => {
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    const x1 = Math.cos(startAngleRad);
    const y1 = Math.sin(startAngleRad);
    const x2 = Math.cos(endAngleRad);
    const y2 = Math.sin(endAngleRad);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    const outerX1 = x1 * outerRadius;
    const outerY1 = y1 * outerRadius;
    const outerX2 = x2 * outerRadius;
    const outerY2 = y2 * outerRadius;
    
    const innerX1 = x1 * innerRadius;
    const innerY1 = y1 * innerRadius;
    const innerX2 = x2 * innerRadius;
    const innerY2 = y2 * innerRadius;
    
    return [
      "M", outerX1, outerY1,
      "A", outerRadius, outerRadius, 0, largeArcFlag, 1, outerX2, outerY2,
      "L", innerX2, innerY2,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 0, innerX1, innerY1,
      "Z"
    ].join(" ");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reports</h2>
      
      <div className={styles.chartContainer}>
        <svg width="240" height="240" viewBox="-120 -120 240 240" className={styles.chart}>
          {segments.map((segment, index) => (
            <path
              key={index}
              d={createPath(segment.startAngle - 90, segment.endAngle - 90, 60, 100)}
              fill={segment.color}
              className={styles.segment}
            />
          ))}
        </svg>
      </div>
      
      <div className={styles.legend}>
        <div className={styles.legendColumn}>
          <div className={styles.legendItem}>
            <div 
              className={styles.legendDot} 
              style={{ backgroundColor: '#3B82F6' }}
            ></div>
            <span className={styles.legendText}>Total Clients</span>
          </div>
          <div className={styles.legendItem}>
            <div 
              className={styles.legendDot} 
              style={{ backgroundColor: '#F59E0B' }}
            ></div>
            <span className={styles.legendText}>Active Clients</span>
          </div>
        </div>
        
        <div className={styles.legendColumn}>
          <div className={styles.legendItem}>
            <span className={styles.legendText}>Total Clients</span>
          </div>
          <div className={styles.legendItem}>
            <div 
              className={styles.legendDot} 
              style={{ backgroundColor: '#C084FC' }}
            ></div>
            <span className={styles.legendText}>Active Clients</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPieChart;