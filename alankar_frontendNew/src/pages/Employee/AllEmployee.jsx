import React, { useEffect, useState } from 'react';
import styles from './AllEmployees.module.scss';
import { useData } from '../../context/DataContext';
import { Link, useLocation } from 'react-router-dom';
const links = [
  { to: "/employee/new", label: "Add New Employee" },
  { to: "/employee/list", label: "All Employee" }
];
const protectedEmail = "user@gmail.com";
const AllEmployees = () => {
  const location = useLocation();
  const {
    employees,
    handleGetAllEmployees,
    handleDeleteEmployee,
    handleUpdateEmployee,
    loading
  } = useData();
  const [editMode, setEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({});
  const [showView, setShowView] = useState(false);
  useEffect(() => {
    handleGetAllEmployees();
    // eslint-disable-next-line
  }, []);
  // Edit handlers
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
  // View handler
  const handleView = (emp) => {
    setSelectedEmployee(emp);
    setShowView(true);
  };
  // Delete handlers
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteConfirm(true);
  };
  const confirmDelete = async () => {
    await handleDeleteEmployee(deleteId);
    setDeleteConfirm(false);
    setDeleteId(null);
    handleGetAllEmployees();
    if (showView) setShowView(false);
  };
  return (
    <div className={styles.allEmployeesMainDiv}>
      <div className={styles.headerBox}>
        <div className={styles.buttonDiv}>
          {links.map(link => (
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
      <div className={styles.listDiv}>
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
                  <th>View</th>
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
                      <button
                        className={styles.viewBtn}
                        title="View Details"
                        onClick={() => handleView(emp)}
                        style={{ background: "#f0f4ff", color: "#255ec6", fontWeight: 500 }}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleEdit(emp)}>Edit</button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        disabled={emp.email === protectedEmail}
                        title={emp.email === protectedEmail ? "This user can't be deleted." : "Delete Employee"}
                        style={emp.email === protectedEmail ? {
                          opacity: 0.5,
                          cursor: "not-allowed"
                        } : {}}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Edit Popup */}
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
        {/* View Popup */}
        {showView && selectedEmployee && (
          <div className={styles.viewPopup}>
            <div className={styles.popupContent}>
              <h3>Employee Details</h3>
              <div className={styles.detailsGrid}>
                <div>
                  <span className={styles.label}>First Name:</span>
                  <span>{selectedEmployee.firstName || "--"}</span>
                </div>
                <div>
                  <span className={styles.label}>Last Name:</span>
                  <span>{selectedEmployee.lastName || "--"}</span>
                </div>
                <div>
                  <span className={styles.label}>Email:</span>
                  <span>{selectedEmployee.email || "--"}</span>
                </div>
                <div>
                  <span className={styles.label}>Phone:</span>
                  <span>{selectedEmployee.phone || "--"}</span>
                </div>
                <div>
                  <span className={styles.label}>Role:</span>
                  <span>{selectedEmployee.role || "--"}</span>
                </div>
                <div>
                  <span className={styles.label}>Gender:</span>
                  <span>{selectedEmployee.gender || "--"}</span>
                </div>
                <div>
                  <span className={styles.label}>Birth Date:</span>
                  <span>{selectedEmployee.birthDate || "--"}</span>
                </div>
                <div>
                  <span className={styles.label}>Blood Group:</span>
                  <span>{selectedEmployee.bloodGroup || "--"}</span>
                </div>
                <div>
                  <span className={styles.label}>Join Date:</span>
                  <span>{selectedEmployee.joinDate || "--"}</span>
                </div>
                <div>
                  <span className={styles.label}>Leave Date:</span>
                  <span>{selectedEmployee.leaveDate || "--"}</span>
                </div>
                <div>
                  <span className={styles.label}>PAN Number:</span>
                  <span>{selectedEmployee.panNumber || "--"}</span>
                </div>
                <div>
                  <span className={styles.label}>Aadhar Number:</span>
                  <span>{selectedEmployee.adharNumber || "--"}</span>
                </div>
              </div>
              <div className={styles.popupActions}>
                <button onClick={() => setShowView(false)}>Close</button>
                <button
                  onClick={() => handleDelete(selectedEmployee.id)}
                  disabled={selectedEmployee.email === protectedEmail}
                  title={selectedEmployee.email === protectedEmail ? "This user can't be deleted." : "Delete Employee"}
                  style={selectedEmployee.email === protectedEmail ? {
                    opacity: 0.5,
                    cursor: "not-allowed"
                  } : {}}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Delete Confirm Popup */}
        {deleteConfirm && (
          <div className={styles.deleteAlert}>
            <div className={styles.alertBox}>
              <div className={styles.alertTitle}>Delete Employee?</div>
              <div className={styles.alertText}>
                Are you sure you want to delete this employee? This action cannot be undone.
              </div>
              <div className={styles.alertActions}>
                <button onClick={confirmDelete}>Delete</button>
                <button onClick={() => setDeleteConfirm(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AllEmployees;
