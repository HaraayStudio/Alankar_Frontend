import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import styles from './AddClient.module.scss';
import { useData } from '../../context/DataContext';
const links = [
  { to: "/clients/new", label: "Add New Client" },
  { to: "/clients/list", label: "All Clients" },
  { to: "/clients/billing", label: "GST Plans & Billing" },
];
export default function AddClient() {
  const location = useLocation();
  const { handleCreateClient } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await handleCreateClient(formData);
      setMessage('✅ Client created successfully!');
      setFormData({ name: '', email: '', phone: '', address: '' });
    } catch (error) {
      setMessage('❌ Failed to create client.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.mainAddClientDiv}>
      <div className={styles.headerBox}>
        <div className={styles.buttonDiv}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={
                location.pathname === link.to
                  ? `${styles.backButton} ${styles.activeButton}`
                  : styles.backButton
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.formDiv}>
        <h2>Add New Client</h2>
        <form className={styles.formGrid} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.col}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Full Name"
              />
            </div>
            <div className={styles.col}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Phone Number"
              />
            </div>
            <div className={styles.col}>
              <label htmlFor="address">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Address"
                rows={3}
              />
            </div>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Create Client'}
          </button>
        </form>
        {message && (
          <div className={styles.message} style={{ color: message.includes('✅') ? '#14b554' : '#e32a2a' }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
