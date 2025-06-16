// src/pages/Employee/AddEmployee.jsx
import React, { useState } from 'react';
import styles from './AddEmployee.module.scss';
import { useData } from '../../context/DataContext';
const AddEmployee = () => {
  const { handleCreateEmployee, loading } = useData();
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    gender: '',
    birthDate: '',
    bloodGroup: '',
    joinDate: '',
    leaveDate: '',
    adharNumber: '',
    panNumber: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreateEmployee({ ...formData, phone: Number(formData.phone), adharNumber: Number(formData.adharNumber) });
  };
  return (
    <div className={styles.container}>
      <h2>Add New Employee</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="secondName" placeholder="Second Name" value={formData.secondName} onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="text" name="role" placeholder="Role (UI/UX, Frontend...)" value={formData.role} onChange={handleChange} required />
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input type="date" name="birthDate" placeholder="Birth Date" value={formData.birthDate} onChange={handleChange} />
          <input type="text" name="bloodGroup" placeholder="Blood Group" value={formData.bloodGroup} onChange={handleChange} />
          <input type="date" name="joinDate" placeholder="Join Date" value={formData.joinDate} onChange={handleChange} required />
          <input type="date" name="leaveDate" placeholder="Leave Date" value={formData.leaveDate} onChange={handleChange} />
          <input type="text" name="panNumber" placeholder="PAN Number" value={formData.panNumber} onChange={handleChange} />
          <input type="text" name="adharNumber" placeholder="Aadhar Number" value={formData.adharNumber} onChange={handleChange} />
        </div>
        <button type="submit" disabled={loading}>{loading ? "Saving..." : "Add Employee"}</button>
      </form>
    </div>
  );
};
export default AddEmployee;
