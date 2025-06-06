import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './MainLayout.module.scss';
const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});
  const sidebarItems = [
  { 
    name: 'Dashboard', 
    icon: '📊', 
    path: '/dashboard',
    key: 'dashboard'
  },
  { 
    name: 'Projects', 
    icon: '📁', 
    key: 'projects',
    hasSubmenu: true,
    submenu: [
      { name: 'Add New Project', path: '/projects/new', key: 'projects-new' },
      { name: 'Ongoing Projects', path: '/projects/ongoing', key: 'projects-ongoing' },
      { name: 'History & Details', path: '/projects/history', key: 'projects-history' }
    ]
  },
  { 
    name: 'Clients', 
    icon: '👥', 
    key: 'clients',
    hasSubmenu: true,
    submenu: [
      { name: 'Add New Client', path: '/clients/new', key: 'clients-new' },
      { name: 'All Clients List', path: '/clients/list', key: 'clients-list' },
      { name: 'GST Plans & Billing', path: '/clients/gst-billing', key: 'clients-gst-billing' }
    ]
  },
  { 
    name: 'Account', 
    icon: '👤', 
    key: 'account',
    hasSubmenu: true,
    submenu: [
      { name: 'Sale Invoicing', path: '/account/invoicing', key: 'account-invoicing' },
      { name: 'Client Payments', path: '/account/payments', key: 'account-payments' },
      { name: 'Expense Management', path: '/account/expenses', key: 'account-expenses' },
      { name: 'Report', path: '/account/report', key: 'account-report' },
      { name: 'Quotation', path: '/account/quotation', key: 'account-quotation' }
    ]
  },
  { 
    name: 'Employee', 
    icon: '👷', 
    key: 'employee',
    hasSubmenu: true,
    submenu: [
      { name: 'Add New Employee', path: '/employee/new', key: 'employee-new' },
      { name: 'All Employees', path: '/employee/list', key: 'employee-list' }
    ]
  }
];
  const handleNavigation = (item) => {
    if (item.hasSubmenu) {
      setExpandedMenus(prev => ({
        ...prev,
        [item.key]: !prev[item.key]
      }));
    } else {
      navigate(item.path);
    }
  };
  const handleSubmenuNavigation = (path) => {
    navigate(path);
  };
  const isActive = (path) => {
    return location.pathname === path;
  };
  const isParentActive = (item) => {
    if (item.hasSubmenu) {
      return item.submenu.some(subItem => location.pathname === subItem.path);
    }
    return false;
  };
  const renderSidebarItem = (item, index) => (
    <div key={index}>
      <div
        className={`${styles.sidebarItem} ${
          isActive(item.path) || isParentActive(item) ? styles.active : ''
        }`}
        onClick={() => handleNavigation(item)}
      >
        <span className={styles.sidebarIcon}>{item.icon}</span>
        <span className={styles.sidebarText}>{item.name}</span>
        {item.hasSubmenu && (
          <span className={`${styles.submenuArrow} ${expandedMenus[item.key] ? styles.expanded : ''}`}>
            ›
          </span>
        )}
      </div>
      {item.hasSubmenu && expandedMenus[item.key] && (
        <div className={styles.sidebarSubmenu}>
          {item.submenu.map((subItem, subIndex) => (
            <div
              key={subIndex}
              className={`${styles.sidebarItem} ${styles.submenuItem} ${
                isActive(subItem.path) ? styles.active : ''
              }`}
              onClick={() => handleSubmenuNavigation(subItem.path)}
            >
              <span className={styles.sidebarText}>{subItem.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  return (
    <div className={styles.layoutContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <span className={styles.logoText}>Alankar </span>
          </div>
        </div>
        <nav className={styles.sidebarNav}>
          {sidebarItems.map(renderSidebarItem)}
        </nav>
      </div>
      {/* Main Content Area */}
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};
export default MainLayout;