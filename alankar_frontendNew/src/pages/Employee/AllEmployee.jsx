// src/pages/Employee/AllEmployees.jsx
import React, { useEffect, useState } from 'react';
import styles from './AllEmployees.module.scss';
import { useData } from '../../context/DataContext';
const AllEmployees = () => {
  const { employees, handleGetAllEmployees, handleDeleteEmployee, handleUpdateEmployee, loading } = useData();
  const [editMode, setEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    handleGetAllEmployees();
  }, []);
  const handleEdit = (emp) => {
    setSelectedEmployee(emp);
    setFormData(emp);
    setEditMode(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSave = async () => {
    await handleUpdateEmployee(formData);
    setEditMode(false);
    handleGetAllEmployees();
  };
  const handleDelete = async (id) => {
    await handleDeleteEmployee(id);
    handleGetAllEmployees();
  };
  return (
    <div className={styles.container}>
      <h2>Employee List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Join Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={emp.id}>
                  <td>{index + 1}</td>
                  <td>{`${emp.firstName} ${emp.lastName}`}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.role}</td>
                  <td>{emp.joinDate}</td>
                  <td>
                    <button onClick={() => handleEdit(emp)}>Edit</button>
                    <button onClick={() => handleDelete(emp.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {editMode && (
        <div className={styles.editPopup}>
          <div className={styles.popupContent}>
            <h3>Edit Employee</h3>
            <div className={styles.formGrid}>
              <input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} placeholder="First Name" />
              <input type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} placeholder="Last Name" />
              <input type="email" name="email" value={formData.email || ''} onChange={handleChange} placeholder="Email" />
              <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} placeholder="Phone" />
              <input type="text" name="role" value={formData.role || ''} onChange={handleChange} placeholder="Role" />
            </div>
            <div className={styles.popupActions}>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AllEmployees;
