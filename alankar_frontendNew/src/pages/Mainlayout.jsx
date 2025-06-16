import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import logo from "../assets/logo_vertical.png";
import { FaUserCircle } from "react-icons/fa";
const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});
  const sidebarItems = [
    {
      name: "Dashboard",
      icon: "",
      path: "/dashboard",
      key: "dashboard",
    },
    {
      name: "Sales",
      icon: "",
      path: "/sales",
      key: "sales",
      hasSubmenu: true,
      submenu: [
        { name: "presale", path: "/sales/presale", key: "presale" },
        { name: "postsale", path: "/sales/postsale", key: "projects-history" },
      ],
    },
    {
      name: "Projects",
      icon: "",
      key: "projects",
      hasSubmenu: true,
      submenu: [
        { name: "projects", path: "/projects", key: "projects" },
        { name: "Add New Project", path: "/projects/new", key: "projects-new" },
        {
          name: "Ongoing Projects",
          path: "/projects/ongoing",
          key: "projects-ongoing",
        },
        {
          name: "History & Details",
          path: "/projects/history",
          key: "projects-history",
        },
      ],
    },
    {
      name: "Clients",
      icon: "",
      key: "clients",
      hasSubmenu: true,
      submenu: [
        { name: "Add New Client", path: "/clients/new", key: "clients-new" },
        {
          name: "All Clients List",
          path: "/clients/list",
          key: "clients-list",
        },
        {
          name: "GST Plans & Billing",
          path: "/clients/gst-billing",
          key: "clients-gst-billing",
        },
      ],
    },
    {
      name: "Account",
      icon: "👤",
      key: "account",
      hasSubmenu: true,
      submenu: [
        {
          name: "Sale Invoicing",
          path: "/account/invoicing",
          key: "account-invoicing",
        },
        {
          name: "Client Payments",
          path: "/account/payments",
          key: "account-payments",
        },
        {
          name: "Expense Management",
          path: "/account/expenses",
          key: "account-expenses",
        },
        { name: "Report", path: "/account/report", key: "account-report" },
        {
          name: "Quotation",
          path: "/account/quotation",
          key: "account-quotation",
        },
      ],
    },
    {
      name: "Employee",
      icon: "👷",
      key: "employee",
      hasSubmenu: true,
      submenu: [
        {
          name: "Add New Employee",
          path: "/employee/new",
          key: "employee-new",
        },
        { name: "All Employees", path: "/employee/list", key: "employee-list" },
      ],
    },
  ];
  const handleNavigation = (item) => {
    if (item.hasSubmenu) {
      setExpandedMenus((prev) => ({
        ...prev,
        [item.key]: !prev[item.key],
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
      return item.submenu.some((subItem) => location.pathname === subItem.path);
    }
    return false;
  };
  const renderSidebarItem = (item, index) => (
    <div key={index}>
      <div
        className={`${styles.sidebarItem} ${
          isActive(item.path) || isParentActive(item) ? styles.active : ""
        }`}
        onClick={() => handleNavigation(item)}
      >
        {/* <span className={styles.sidebarIcon}>{item.icon}</span> */}
        <span className={styles.sidebarText}>{item.name}</span>
        {item.hasSubmenu && (
          <span
            className={`${styles.submenuArrow} ${
              expandedMenus[item.key] ? styles.expanded : ""
            }`}
          >
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
                isActive(subItem.path) ? styles.active : ""
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
            <img src={logo} alt="" />
            {/* <span className={styles.logoText}>Alankar </span> */}
          </div>
        </div>
        <nav className={styles.sidebarNav}>
          {sidebarItems.map(renderSidebarItem)}
        </nav>
      </div>
      {/* Main Content Area */}
      <div className={styles.mainContent}>
        <div className={styles.navbar}>
          <h2>Good Morning, User</h2>
          <div className={styles.navbarRight}>
            <div className={styles.navbarItem}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="27"
                viewBox="0 0 23 27"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.3265 4.78967C8.50462 5.01201 7.73701 5.36009 7.20233 5.84183C5.74254 7.15869 5.1483 8.94273 5.1483 12.1588C5.1483 14.451 3.84335 16.6215 2.90369 18.027C2.69987 18.3341 2.63635 18.6266 2.64826 18.8026C2.65355 18.882 2.67208 18.9191 2.68002 18.9323C2.68532 18.9416 2.7012 18.9667 2.76472 19.0011C3.68057 19.4908 5.06227 19.8481 6.6597 20.0745C8.1973 20.2808 9.74709 20.383 11.2985 20.3802C11.6495 20.3802 11.9861 20.5196 12.2343 20.7678C12.4825 21.016 12.6219 21.3526 12.6219 21.7036C12.6219 22.0547 12.4825 22.3913 12.2343 22.6395C11.9861 22.8877 11.6495 23.0271 11.2985 23.0271C9.8056 23.0271 8.01097 22.9411 6.28781 22.6963C4.59112 22.4541 2.84281 22.0438 1.51669 21.3357C0.541291 20.8143 0.0701346 19.9064 0.00793141 18.9813C-0.0529483 18.1091 0.242186 17.2475 0.702754 16.558C1.65168 15.1366 2.50135 13.5683 2.50135 12.1588C2.50135 8.63701 3.1525 5.92918 5.4302 3.87648C6.38971 3.01092 7.5954 2.51727 8.63168 2.23537C9.50064 1.99439 10.3968 1.86541 11.2985 1.85156C11.6495 1.85156 11.9861 1.991 12.2343 2.2392C12.4825 2.4874 12.6219 2.82403 12.6219 3.17503C12.6219 3.52604 12.4825 3.86267 12.2343 4.11087C11.9861 4.35907 11.6495 4.49851 11.2985 4.49851C10.8935 4.49851 10.1391 4.56733 9.3265 4.78967Z"
                  fill="#2B2322"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.2715 4.78967C14.0934 5.01201 14.861 5.36009 15.3957 5.84183C16.8555 7.15869 17.4497 8.94273 17.4497 12.1588C17.4497 14.451 18.7547 16.6215 19.6943 18.027C19.8981 18.3341 19.9617 18.6266 19.9498 18.8026C19.9504 18.8478 19.9395 18.8925 19.918 18.9323C19.9127 18.9416 19.8968 18.9667 19.8333 19.0011C18.9175 19.4908 17.5357 19.8481 15.9383 20.0745C14.4007 20.2808 12.8509 20.383 11.2995 20.3802C10.9485 20.3802 10.6119 20.5196 10.3637 20.7678C10.1155 21.016 9.97607 21.3526 9.97607 21.7036C9.97607 22.0547 10.1155 22.3913 10.3637 22.6395C10.6119 22.8877 10.9485 23.0271 11.2995 23.0271C12.7924 23.0271 14.5857 22.9411 16.3102 22.6963C18.0069 22.4541 19.7552 22.0438 21.0813 21.3357C22.0567 20.8143 22.5279 19.9064 22.5901 18.9813C22.651 18.1091 22.3558 17.2475 21.8953 16.558C20.9463 15.1366 20.0967 13.5683 20.0967 12.1588C20.0967 8.63701 19.4455 5.92918 17.1678 3.87648C16.2083 3.01092 15.0026 2.51727 13.9663 2.23537C13.0974 1.99439 12.2012 1.86541 11.2995 1.85156C10.9485 1.85156 10.6119 1.991 10.3637 2.2392C10.1155 2.4874 9.97607 2.82403 9.97607 3.17503C9.97607 3.52604 10.1155 3.86267 10.3637 4.11087C10.6119 4.35907 10.9485 4.49851 11.2995 4.49851C11.7045 4.49851 12.4589 4.56733 13.2715 4.78967Z"
                  fill="#2B2322"
                />
                <path
                  d="M14.8016 2.75517C14.8016 3.67499 12.954 2.81076 11.4929 2.81076C10.0318 2.81076 8.1842 3.67498 8.1842 2.75385C8.1842 1.83404 9.50768 0.531738 11.4929 0.531738C13.4781 0.531738 14.8016 1.83404 14.8016 2.75517Z"
                  fill="#2B2322"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.65183 21.7041C8.65183 22.4061 8.9307 23.0794 9.4271 23.5758C9.9235 24.0722 10.5968 24.351 11.2988 24.351C12.0008 24.351 12.674 24.0722 13.1704 23.5758C13.6668 23.0794 13.9457 22.4061 13.9457 21.7041H16.5927C16.5927 23.1081 16.0349 24.4546 15.0421 25.4474C14.0493 26.4402 12.7028 26.998 11.2988 26.998C9.89475 26.998 8.54822 26.4402 7.55543 25.4474C6.56263 24.4546 6.00488 23.1081 6.00488 21.7041H8.65183Z"
                  fill="#2B2322"
                />
              </svg>
            </div>
            <div className={styles.navbarItem}>
              <FaUserCircle className={styles.icon} />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default MainLayout;
