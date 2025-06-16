// PreSalesPage with full add, delete, and status update popup
import React, { useState, useEffect } from 'react';
import {
  Plus, Trash2, X, Edit
} from 'lucide-react';
import styles from './PreSalesPage.module.scss';
const PreSalesPage = () => {
  const [presales, setPresales] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [selectedSrNumber, setSelectedSrNumber] = useState(null);
  const [statusToUpdate, setStatusToUpdate] = useState('PENDING');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    personName: '', requirements: '', approachedVia: 'whatsapp',
    orderStartDateTime: '', orderEndDateTime: '', budget: '',
    status: 'PENDING', conclusion: '', existingClient: false,
    clientId: '', client: { name: '', email: '', phone: '', address: '' }
  });
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('token') || '');
  // const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsInVzZXJJZCI6MSwiaWF0IjoxNzUwMDcwNTQ2LCJleHAiOjE3NTAxNTY5NDZ9.ykRZ8Pn6NrwxWE85APJn70hkjSplXNYDkC0HxOsxxNI';
 const BEARER_TOKEN = authToken;
  const API_BASE_URL = 'http://localhost:8080/api';
  const apiHeaders = {
    'Authorization': `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/json'
  };
  useEffect(() => { fetchPresales(); }, []);
  const fetchPresales = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/presales/getallpresales`, { headers: apiHeaders });
      const data = await res.json();
      setPresales(data.data || []);
    } catch (err) {
      setError('Failed to fetch presales');
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (srNumber) => {
    if (!window.confirm('Are you sure you want to delete this presale?')) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/presales/deletepresale?srNumber=${srNumber}`, {
        method: 'PUT', headers: apiHeaders
      });
      if (!res.ok) throw new Error('Delete failed');
      await fetchPresales();
    } catch (err) {
      setError('Error deleting presale');
    } finally {
      setLoading(false);
    }
  };
  const openStatusPopup = (srNumber) => {
    setSelectedSrNumber(srNumber);
    setShowStatusPopup(true);
  };
  const handleStatusUpdate = async () => {
    if (!selectedSrNumber) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/presales/updatepresalestatus?srNumber=${selectedSrNumber}&status=${statusToUpdate}`, {
        method: 'PUT', headers: apiHeaders
      });
      if (!res.ok) throw new Error('Update status failed');
      await fetchPresales();
      setShowStatusPopup(false);
    } catch (err) {
      setError('Failed to update status');
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('client.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        client: {
          ...prev.client,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    const endpoint = `${API_BASE_URL}/presales/createpresales?existingClient=${formData.existingClient}`;
    const payload = {
      personName: formData.personName,
      requirements: formData.requirements,
      approachedVia: formData.approachedVia,
      orderStartDateTime: formData.orderStartDateTime,
      orderEndDateTime: formData.orderEndDateTime,
      budget: parseFloat(formData.budget),
      status: formData.status,
      conclusion: formData.conclusion,
      client: formData.existingClient ? { id: formData.clientId } : formData.client
    };
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: apiHeaders,
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Failed to create presale');
      await fetchPresales();
      setShowModal(false);
      setFormData({
        personName: '', requirements: '', approachedVia: 'whatsapp',
        orderStartDateTime: '', orderEndDateTime: '', budget: '',
        status: 'PENDING', conclusion: '', existingClient: false,
        clientId: '', client: { name: '', email: '', phone: '', address: '' }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Pre-Sales</h1>
        <button className={styles.addButton} onClick={() => setShowModal(true)}>
          <Plus size={18} /> Add PreSales
        </button>
      </div>
      {error && <div className={styles.error}><strong>Error:</strong> {error}</div>}
      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.th}>S No</th>
                <th className={styles.th}>Person</th>
                <th className={styles.th}>Company</th>
                <th className={styles.th}>Requirements</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {presales.map((item, i) => (
                <tr key={i}>
                  <td className={styles.td}>{i + 1}</td>
                  <td className={styles.td}>{item.personName}</td>
                  <td className={styles.td}>{item.client?.name}</td>
                  <td className={styles.td}>{item.requirements}</td>
                  <td className={styles.td}>{item.status}</td>
                  <td className={styles.td}>
                    <div className={styles.actionButtons}>
                      <button className={`${styles.actionButton} ${styles.editButton}`} onClick={() => openStatusPopup(item.srNumber)} title="Update Status"><Edit size={14} /></button>
                      <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={() => handleDelete(item.srNumber)} title="Delete"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showModal && (
        <div className={styles.modalBackdrop} onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className={styles.modalBox}>
            <div className={styles.modalHeader}>
              <h2>Add New PreSale</h2>
              <button onClick={() => setShowModal(false)} className={styles.closeButton}><X size={18} /></button>
            </div>
            <div className={styles.modalBody}>
              <label>Person Name</label>
              <input type="text" name="personName" value={formData.personName} onChange={handleInputChange} />
              <label>Requirements</label>
              <textarea name="requirements" value={formData.requirements} onChange={handleInputChange}></textarea>
              <label>Approached Via</label>
              <select name="approachedVia" value={formData.approachedVia} onChange={handleInputChange}>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="linkedin">LinkedIn</option>
              </select>
              <label>Budget</label>
              <input type="number" name="budget" value={formData.budget} onChange={handleInputChange} />
              <label>Start Date & Time</label>
              <input type="datetime-local" name="orderStartDateTime" value={formData.orderStartDateTime} onChange={handleInputChange} />
              <label>End Date & Time</label>
              <input type="datetime-local" name="orderEndDateTime" value={formData.orderEndDateTime} onChange={handleInputChange} />
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange}>
                <option value="PENDING">Pending</option>
                <option value="CREATED">Created</option>
                <option value="ONBOARDED">Onboarded</option>
              </select>
              <label>Conclusion</label>
              <textarea name="conclusion" value={formData.conclusion} onChange={handleInputChange}></textarea>
              <label>
                <input type="checkbox" name="existingClient" checked={formData.existingClient} onChange={handleInputChange} /> Existing Client
              </label>
              {formData.existingClient ? (
                <input type="text" name="clientId" placeholder="Client ID" value={formData.clientId} onChange={handleInputChange} />
              ) : (
                <>
                  <label>Client Name</label>
                  <input type="text" name="client.name" value={formData.client.name} onChange={handleInputChange} />
                  <label>Client Email</label>
                  <input type="email" name="client.email" value={formData.client.email} onChange={handleInputChange} />
                  <label>Client Phone</label>
                  <input type="text" name="client.phone" value={formData.client.phone} onChange={handleInputChange} />
                  <label>Client Address</label>
                  <input type="text" name="client.address" value={formData.client.address} onChange={handleInputChange} />
                </>
              )}
              <button className={styles.submitButton} onClick={handleSubmit} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
      {showStatusPopup && (
        <div className={styles.modalBackdrop} onClick={(e) => e.target === e.currentTarget && setShowStatusPopup(false)}>
          <div className={styles.modalBox}>
            <div className={styles.modalHeader}>
              <h2>Update Status</h2>
              <button onClick={() => setShowStatusPopup(false)} className={styles.closeButton}><X size={18} /></button>
            </div>
            <div className={styles.modalBody}>
              <label>Status</label>
              <select value={statusToUpdate} onChange={(e) => setStatusToUpdate(e.target.value)}>
                <option value="CREATED">CREATED</option>
                <option value="PENDING">PENDING</option>
                <option value="ONBOARDED">ONBOARDED</option>
              </select>
              <button className={styles.submitButton} onClick={handleStatusUpdate} disabled={loading}>
                {loading ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PreSalesPage;
