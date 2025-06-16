import React, { useState, useEffect } from 'react';
import { Plus, Eye, Edit, Trash2, X, Calendar, Clock, User, Building, FileText, DollarSign, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
// CSS Module styles
const styles = {
  container: {
    marginTop: '80px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 0
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(79, 70, 229, 0.3)'
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #e9ecef'
  },
  th: {
    padding: '16px 12px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  td: {
    padding: '16px 12px',
    borderBottom: '1px solid #e9ecef',
    fontSize: '14px',
    color: '#374151'
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  statusOnboarded: {
    backgroundColor: '#d1fae5',
    color: '#065f46'
  },
  statusPending: {
    backgroundColor: '#fef3cd',
    color: '#92400e'
  },
  actionButtons: {
    display: 'flex',
    gap: '8px'
  },
  actionButton: {
    padding: '6px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: '#f3f4f6',
    color: '#6b7280'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '0',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'hidden',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 24px 0',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '16px',
    marginBottom: '24px'
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0
  },
  closeButton: {
    padding: '8px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    transition: 'all 0.2s ease'
  },
  form: {
    padding: '0 24px 24px'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  formGroupFull: {
    gridColumn: '1 / -1'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  input: {
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'border-color 0.2s ease',
    backgroundColor: 'white'
  },
  textarea: {
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    minHeight: '80px',
    resize: 'vertical',
    fontFamily: 'inherit'
  },
  select: {
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'white',
    cursor: 'pointer'
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '20px'
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    color: '#6b7280'
  },
  error: {
    padding: '20px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    color: '#dc2626',
    margin: '20px 0'
  }
};
const PreSalesPage = () => {
  const [presales, setPresales] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    personName: '',
    companyName: '',
    requirements: '',
    approachedVia: 'whatsapp',
    orderStartDateTime: '',
    orderEndDateTime: '',
    budget: '',
    status: 'pending',
    conclusion: '',
    existingClient: false
  });
   const [authToken, setAuthToken] = useState(() => localStorage.getItem('token') || '');
    const BEARER_TOKEN = authToken;
  // Mock Bearer Token - Replace with your actual token
  // const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsInVzZXJJZCI6MSwiaWF0IjoxNzUwMDcwNTQ2LCJleHAiOjE3NTAxNTY5NDZ9.ykRZ8Pn6NrwxWE85APJn70hkjSplXNYDkC0HxOsxxNI';
  const API_BASE_URL = 'http://localhost:8080/api';
  const apiHeaders = {
    'Authorization': `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/json'
  };
  useEffect(() => {
    fetchPresales();
  }, []);
const fetchPresales = async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await fetch(`${API_BASE_URL}/postsales/getallpostsales`, {
      method: 'GET',
      headers: apiHeaders,
    });
    const text = await response.text(); // text first because JSON.parse might fail if response is not JSON
    console.log('Response Text:', response);
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      throw new Error("Invalid JSON response");
    }
    if (response.status === 200 || response.status === 302) {
      const presalesArray =
        Array.isArray(data) ? data :
        data.data && Array.isArray(data.data) ? data.data :
        data.result && Array.isArray(data.result) ? data.result : [];
      setPresales(presalesArray);
    } else {
      throw new Error(`Failed to fetch presales data: ${response.status} ${response.statusText}`);
    }
  } catch (err) {
    setError(err.message);
    console.error('Error fetching presales:', err);
    setPresales([]);
  } finally {
    setLoading(false);
  }
};
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Format the data to match your backend structure
      const presalesData = {
        personName: formData.personName,
        requirements: formData.requirements,
        approachedVia: formData.approachedVia,
        orderStartDateTime: formData.orderStartDateTime,
        orderEndDateTime: formData.orderEndDateTime,
        budget: parseFloat(formData.budget),
        status: formData.status,
        conclusion: formData.conclusion,
        client: {
          companyName: formData.companyName
        }
      };
      const response = await fetch(`${API_BASE_URL}/createpresales?existingClient=${formData.existingClient}`, {
        method: 'POST',
        headers: apiHeaders,
        body: JSON.stringify(presalesData)
      });
      if (!response.ok) {
        throw new Error('Failed to create presale');
      }
      const result = await response.json();
      console.log('Presale created successfully:', result);
      // Reset form and close modal
      setFormData({
        personName: '',
        companyName: '',
        requirements: '',
        approachedVia: 'whatsapp',
        orderStartDateTime: '',
        orderEndDateTime: '',
        budget: '',
        status: 'pending',
        conclusion: '',
        existingClient: false
      });
      setShowModal(false);
      // Refresh the list
      fetchPresales();
    } catch (err) {
      setError(err.message);
      console.error('Error creating presale:', err);
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  const formatTime = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const getStatusBadge = (status) => {
    const isOnboarded = status?.toLowerCase() === 'onboarded';
    return (
      <span style={{
        ...styles.statusBadge,
        ...(isOnboarded ? styles.statusOnboarded : styles.statusPending)
      }}>
        {isOnboarded ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
        {status || 'Pending'}
      </span>
    );
  };
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Post -Sales</h1>
        <button 
          style={styles.addButton}
          onClick={() => setShowModal(true)}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#4338ca';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#4f46e5';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <Plus size={18} />
          Add PostSales
        </button>
      </div>
      {error && (
        <div style={styles.error}>
          <strong>Error:</strong> {error}
        </div>
      )}
      <div style={styles.tableContainer}>
        {loading ? (
          <div style={styles.loading}>
            <div>Loading presales data...</div>
          </div>
        ) : (
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.th}>S No</th>
                <th style={styles.th}>Person Name</th>
                <th style={styles.th}>Company Name</th>
                <th style={styles.th}>Requirement</th>
                <th style={styles.th}>Approached Via</th>
                <th style={styles.th}>Started</th>
                <th style={styles.th}>Ended</th>
                <th style={styles.th}>Budget</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Conclusion</th>
                <th style={styles.th}>Action</th>
                <th style={styles.th}>Mail</th>
              </tr>
            </thead>
            <tbody>
              {presales.map((item, index) => (
                <tr key={item.id || index}>
                  <td style={styles.td}>{String(index + 1).padStart(2, '0')}</td>
                  <td style={styles.td}>{item.personName || '-'}</td>
                  <td style={styles.td}>{item.client?.companyName || '-'}</td>
                  <td style={styles.td}>{item.requirements || '-'}</td>
                  <td style={styles.td}>
                    {item.approachedVia === 'whatsapp' ? '📱 WhatsApp' : 
                     item.approachedVia === 'email' ? '📧 E-mail' : 
                     item.approachedVia || '-'}
                  </td>
                  <td style={styles.td}>
                    <div>{formatDate(item.orderStartDateTime)}</div>
                    <div style={{fontSize: '12px', color: '#6b7280'}}>
                      {formatTime(item.orderStartDateTime)}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div>{formatDate(item.orderEndDateTime)}</div>
                    <div style={{fontSize: '12px', color: '#6b7280'}}>
                      {formatTime(item.orderEndDateTime)}
                    </div>
                  </td>
                  <td style={styles.td}>
                    {item.budget ? `₹${item.budget.toLocaleString()}` : '-'}
                  </td>
                  <td style={styles.td}>
                    {getStatusBadge(item.status)}
                  </td>
                  <td style={styles.td}>{item.conclusion || 'Conclusion will go here'}</td>
                  <td style={styles.td}>
                    <div style={styles.actionButtons}>
                      <button 
                        style={styles.actionButton}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                        title="View"
                      >
                        <Eye size={14} />
                      </button>
                      <button 
                        style={styles.actionButton}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        style={styles.actionButton}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#fee2e2'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                  <td> <button >Send mail</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showModal && (
        <div style={styles.modal} onClick={(e) => {
          if (e.target === e.currentTarget) setShowModal(false);
        }}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Add New Pre-Sale</h2>
              <button 
                style={styles.closeButton}
                onClick={() => setShowModal(false)}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              >
                <X size={20} />
              </button>
            </div>
            <div style={styles.form}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <User size={16} />
                    Person Name *
                  </label>
                  <input
                    style={styles.input}
                    type="text"
                    name="personName"
                    value={formData.personName}
                    onChange={handleInputChange}
                    required
                    onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <Building size={16} />
                    Company Name *
                  </label>
                  <input
                    style={styles.input}
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>
              <div style={{...styles.formGroup, ...styles.formGroupFull}}>
                <label style={styles.label}>
                  <FileText size={16} />
                  Requirements *
                </label>
                <textarea
                  style={styles.textarea}
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  required
                  placeholder="Describe the project requirements..."
                  onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <MessageSquare size={16} />
                    Approached Via
                  </label>
                  <select
                    style={styles.select}
                    name="approachedVia"
                    value={formData.approachedVia}
                    onChange={handleInputChange}
                    onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">E-mail</option>
                    <option value="phone">Phone</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <DollarSign size={16} />
                    Budget *
                  </label>
                  <input
                    style={styles.input}
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter budget amount"
                    onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <Calendar size={16} />
                    Start Date & Time
                  </label>
                  <input
                    style={styles.input}
                    type="datetime-local"
                    name="orderStartDateTime"
                    value={formData.orderStartDateTime}
                    onChange={handleInputChange}
                    onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <Clock size={16} />
                    End Date & Time
                  </label>
                  <input
                    style={styles.input}
                    type="datetime-local"
                    name="orderEndDateTime"
                    value={formData.orderEndDateTime}
                    onChange={handleInputChange}
                    onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Status</label>
                  <select
                    style={styles.select}
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  >
                    <option value="pending">Pending</option>
                    <option value="onboarded">Onboarded</option>
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <input
                      type="checkbox"
                      name="existingClient"
                      checked={formData.existingClient}
                      onChange={handleInputChange}
                      style={{marginRight: '8px'}}
                    />
                    Existing Client
                  </label>
                </div>
              </div>
              <div style={{...styles.formGroup, ...styles.formGroupFull}}>
                <label style={styles.label}>Conclusion</label>
                <textarea
                  style={styles.textarea}
                  name="conclusion"
                  value={formData.conclusion}
                  onChange={handleInputChange}
                  placeholder="Add conclusion notes..."
                  onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
              <button 
                type="button" 
                style={styles.submitButton}
                disabled={loading}
                onClick={handleSubmit}
                onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#4338ca')}
                onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#4f46e5')}
              >
                {loading ? 'Creating...' : 'Create Pre-Sale'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PreSalesPage;