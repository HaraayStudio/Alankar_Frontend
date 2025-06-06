import React, { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import styles from './ClientsList.module.scss';
export default function ClientsList() {
  const { clients } = useContext(DataContext);
  console.log('ClientsList component rendered with clients:', clients.data);
  const data = clients.data || [];
  return (
    <div className={styles.container}>
      <h2>All Clients</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Client Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((client, index) => (
              <tr key={client.id}>
                <td>{index + 1}</td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.address}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className={styles.noData}>No clients found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
