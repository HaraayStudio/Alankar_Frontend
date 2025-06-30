import React from 'react';
import styles from '../Dashboard.module.scss';

const ClientsStats = ({ totalClients, activeClients }) => {
  return (
    <div className={styles.clientsCard}>
      <h3>Reports</h3>
      <div className={styles.clientStats}>
        <div>
          <span>Total Clients</span>
          <span>{totalClients}</span>
        </div>
        <div>
          <span>Active Clients</span>
          <span>{activeClients}</span>
        </div>
      </div>
    </div>
  );
};

export default ClientsStats;