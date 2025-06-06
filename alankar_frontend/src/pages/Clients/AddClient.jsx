import React, { useState } from 'react';
export default function AddClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsInVzZXJJZCI6MSwiaWF0IjoxNzQ5MTE2OTQ5LCJleHAiOjE3NDkyMDMzNDl9.ml2UeCWBDDvaVfY7FtOxMJhyrvAlA_oSZk7LxMt2kXY';
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
      const response = await fetch('http://localhost:8080/api/clients/createclient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('✅ Client created successfully!');
        setFormData({ name: '', email: '', phone: '', address: '' });
      } else {
        setMessage(`❌ Failed: ${data.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Error while creating client.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem', background: '#fff', borderRadius: '8px' }}>
      <h2>Add New Client</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone:</label><br />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <label>Address:</label><br />
          <textarea name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
          {loading ? 'Submitting...' : 'Create Client'}
        </button>
      </form>
      {message && <p style={{ marginTop: '1rem', color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
}
