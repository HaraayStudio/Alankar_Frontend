// src/pages/Employee/AddEmployee.jsx
import React, { useState } from "react";
import styles from "./AddEmployee.module.scss";
import { useData } from "../../context/DataContext";
import { Link, useLocation } from "react-router-dom";
const links = [
  { to: "/employee/new", label: "Add New Employee" },
  { to: "/employee/list", label: "All Employee" },
];
const AddEmployee = () => {
  const location = useLocation();
  const { handleCreateEmployee, loading } = useData();
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    gender: "",
    birthDate: "",
    bloodGroup: "",
    joinDate: "",
    leaveDate: "",
    adharNumber: "",
    panNumber: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreateEmployee({
      ...formData,
      phone: Number(formData.phone),
      adharNumber: Number(formData.adharNumber),
    });
  };
  return (
    <div className={styles.MainAddEmployeeDiv}>
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
        </div>{" "}
      </div>
      <div className={styles.formDiv}>
        <h2>Add New Employee</h2>
       <form className={styles.grid} onSubmit={handleSubmit}>
  {/* Row 1: Names */}
  <div className={styles.row}>
    <div className={styles.col}>
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
    </div>
    <div className={styles.col}>
      <label htmlFor="secondName">Second Name</label>
      <input
        type="text"
        name="secondName"
        placeholder="Second Name"
        value={formData.secondName}
        onChange={handleChange}
      />
    </div>
    <div className={styles.col}>
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
    </div>
  </div>
  {/* Row 2: Email & Phone */}
  <div className={styles.row}>
    <div className={styles.col}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div>
    <div className={styles.col}>
      <label htmlFor="phone">Phone Number</label>
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />
    </div>
  </div>
  {/* Row 3: Password & Role */}
  <div className={styles.row}>
    <div className={styles.col}>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
    </div>
    <div className={styles.col}>
     <label htmlFor="role">Role</label>
<select
  name="role"
  value={formData.role}
  onChange={handleChange}
  required
>
  <option value="">Select Role</option>
  <option value="ADMIN">Admin</option>
  <option value="MANAGER">Manager</option>
  <option value="EMPLOYEE">Employee</option>
</select>
    </div>
  </div>
  {/* Row 4: Gender & Birth Date */}
  <div className={styles.row}>
    <div className={styles.col}>
      <label htmlFor="gender">Gender</label>
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
    </div>
    <div className={styles.col}>
      <label htmlFor="birthDate">Birth Date</label>
      <input
        type="date"
        name="birthDate"
        placeholder="Birth Date"
        value={formData.birthDate}
        onChange={handleChange}
      />
    </div>
  </div>
  {/* Row 5: Blood Group & PAN */}
  <div className={styles.row}>
    <div className={styles.col}>
      <label htmlFor="bloodGroup">Blood Group</label>
      <input
        type="text"
        name="bloodGroup"
        placeholder="Blood Group"
        value={formData.bloodGroup}
        onChange={handleChange}
      />
    </div>
    <div className={styles.col}>
      <label htmlFor="panNumber">PAN Number</label>
      <input
        type="text"
        name="panNumber"
        placeholder="PAN Number"
        value={formData.panNumber}
        onChange={handleChange}
      />
    </div>
  </div>
  {/* Row 6: Aadhar */}
  <div className={styles.row}>
    <div className={styles.col}>
      <label htmlFor="adharNumber">Aadhar Number</label>
      <input
        type="text"
        name="adharNumber"
        placeholder="Aadhar Number"
        value={formData.adharNumber}
        onChange={handleChange}
      />
    </div>
  </div>
  {/* Row 7: Join & Leave Date */}
  <div className={styles.row}>
    <div className={styles.col}>
      <label htmlFor="joinDate">Join Date</label>
      <input
        type="date"
        name="joinDate"
        placeholder="Join Date"
        value={formData.joinDate}
        onChange={handleChange}
        required
      />
    </div>
    <div className={styles.col}>
      <label htmlFor="leaveDate">Leave Date</label>
      <input
        type="date"
        name="leaveDate"
        placeholder="Leave Date"
        value={formData.leaveDate}
        onChange={handleChange}
      />
    </div>
  </div>
  {/* Button */}
  <div className={styles.row}>
    <button type="submit" disabled={loading}>
      {loading ? "Saving..." : "Add Employee"}
    </button>
  </div>
</form>
      </div>
    </div>
  );
};
export default AddEmployee;
