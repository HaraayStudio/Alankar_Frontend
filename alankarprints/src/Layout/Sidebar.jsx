import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Sidebar.module.scss";
import logo from "../assets/logo_vertical.png";

// Sidebar item definition (your SVGs here)
const sidebarItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    key: "dashboard",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
        <path d="M16.1111 11.8088V5.14209H25V11.8088H16.1111ZM5 16.2532V5.14209H13.8889V16.2532H5ZM16.1111 25.1421V14.031H25V25.1421H16.1111ZM5 25.1421V18.4754H13.8889V25.1421H5ZM7.22222 14.031H11.6667V7.36431H7.22222V14.031ZM18.3333 22.9199H22.7778V16.2532H18.3333V22.9199ZM18.3333 9.58653H22.7778V7.36431H18.3333V9.58653ZM7.22222 22.9199H11.6667V20.6976H7.22222V22.9199Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: "Sales",
    path: "/sales",
    key: "sales",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
        <path d="M12.5925 6.19977C13.2046 5.67888 13.5106 5.41844 13.8296 5.26543C14.1951 5.0907 14.595 5 15 5C15.405 5 15.8049 5.0907 16.1704 5.26543C16.4905 5.41736 16.7965 5.6778 17.4075 6.19977C17.6516 6.40812 17.7732 6.51121 17.9034 6.59803C18.2016 6.79789 18.5365 6.93658 18.8887 7.00605C19.0417 7.03644 19.2013 7.04946 19.5203 7.07551C20.3222 7.13845 20.7227 7.171 21.0569 7.28928C21.4387 7.42401 21.7854 7.64246 22.0718 7.92863C22.3581 8.21479 22.5768 8.56142 22.7118 8.94309C22.8301 9.27841 22.8616 9.67884 22.9256 10.4797C22.9505 10.7987 22.9636 10.9583 22.9939 11.1124C23.0634 11.464 23.2023 11.7993 23.402 12.0966C23.4888 12.2268 23.593 12.3484 23.8002 12.5925C24.3211 13.2046 24.5826 13.5106 24.7357 13.8296C24.9104 14.1951 25.0011 14.595 25.0011 15C25.0011 15.405 24.9104 15.8049 24.7357 16.1704C24.5837 16.4894 24.3222 16.7954 23.8002 17.4075C23.6579 17.5648 23.5249 17.7304 23.402 17.9034C23.2022 18.2013 23.0636 18.5358 22.9939 18.8876C22.9636 19.0417 22.9505 19.2013 22.9256 19.5203C22.8616 20.3212 22.8301 20.7227 22.7118 21.0569C22.5768 21.4386 22.3581 21.7852 22.0718 22.0714C21.7854 22.3575 21.4387 22.576 21.0569 22.7107C20.7227 22.8301 20.3222 22.8616 19.5203 22.9245C19.2013 22.9505 19.0428 22.9636 18.8887 22.9939C18.5365 23.0634 18.2016 23.2021 17.9034 23.402C17.7308 23.525 17.5656 23.6579 17.4085 23.8002C16.7965 24.3211 16.4905 24.5816 16.1714 24.7346C15.806 24.9093 15.4061 25 15.0011 25C14.596 25 14.1961 24.9093 13.8307 24.7346C13.5106 24.5826 13.2046 24.3222 12.5936 23.8002C12.4362 23.6579 12.2707 23.5249 12.0977 23.402C11.7995 23.2021 11.4646 23.0634 11.1124 22.9939C10.9034 22.9585 10.6925 22.9353 10.4808 22.9245C9.67884 22.8616 9.27841 22.829 8.94418 22.7107C8.56242 22.576 8.21565 22.3575 7.92929 22.0714C7.64294 21.7852 7.42426 21.4386 7.28928 21.0569C7.171 20.7227 7.13953 20.3212 7.0755 19.5203C7.06511 19.3083 7.04228 19.097 7.00714 18.8876C6.93753 18.5358 6.79884 18.2013 6.59911 17.9034C6.5123 17.7732 6.40812 17.6516 6.20085 17.4075C5.67997 16.7954 5.41844 16.4894 5.26543 16.1704C5.0907 15.8049 5 15.405 5 15C5 14.595 5.0907 14.1951 5.26543 13.8296C5.41844 13.5106 5.67888 13.2046 6.20085 12.5925C6.40812 12.3484 6.5123 12.2268 6.59911 12.0966C6.79884 11.7987 6.93753 11.4642 7.00714 11.1124C7.03752 10.9583 7.05055 10.7987 7.0755 10.4797C7.13953 9.67884 7.171 9.27841 7.28928 8.94309C7.42437 8.56131 7.64322 8.21461 7.92977 7.92844C8.21632 7.64226 8.5633 7.42387 8.94526 7.28928C9.2795 7.171 9.67993 7.13845 10.4819 7.07551C10.8009 7.04946 10.9593 7.03644 11.1134 7.00605C11.4657 6.93658 11.8006 6.79789 12.0988 6.59803C12.229 6.51121 12.3495 6.40812 12.5925 6.19977Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11.7454 18.2567L18.2564 11.7456" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M17.7129 17.1279C17.8681 17.1279 18.0172 17.1901 18.127 17.2998C18.2365 17.4095 18.2987 17.5579 18.2988 17.7129C18.2988 17.8681 18.2367 18.0172 18.127 18.127C18.0172 18.2367 17.8681 18.2988 17.7129 18.2988C17.5579 18.2987 17.4095 18.2365 17.2998 18.127C17.1901 18.0172 17.1279 17.8681 17.1279 17.7129C17.128 17.5578 17.1901 17.4095 17.2998 17.2998C17.4095 17.1901 17.5578 17.128 17.7129 17.1279ZM12.2871 11.7021C12.4037 11.7021 12.5168 11.737 12.6123 11.8008L12.7012 11.874C12.8107 11.9837 12.872 12.1321 12.8721 12.2871C12.8721 12.4036 12.8381 12.5168 12.7744 12.6123L12.7012 12.7012C12.5914 12.8109 12.4423 12.8721 12.2871 12.8721C12.1709 12.872 12.0582 12.8379 11.9629 12.7744L11.874 12.7012C11.7643 12.5914 11.7021 12.4423 11.7021 12.2871C11.7022 12.132 11.7643 11.9837 11.874 11.874C11.9837 11.7643 12.132 11.7022 12.2871 11.7021Z" fill="currentColor" stroke="currentColor"/>
      </svg>
    ),
    hasSubmenu: true,
    submenu: [
      { name: "Pre-sales", path: "/sales/presale", key: "presale" },
      { name: "Post-sales", path: "/sales/postsale", key: "postsale" },
    ],
  },
  {
    name: "Orders",
    path: "/projects",
    key: "Orders",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
        <path d="M26.67 8.97676V23.1455H4V8.97676H11.0844V7.55989C11.0844 7.36064 11.1213 7.17615 11.1951 7.00642C11.2689 6.83669 11.3685 6.6891 11.4939 6.56365C11.6194 6.43819 11.7707 6.33488 11.9478 6.25371C12.1249 6.17253 12.3094 6.13563 12.5013 6.14301H18.1687C18.368 6.14301 18.5525 6.17991 18.7222 6.25371C18.8919 6.3275 19.0395 6.42713 19.165 6.55258C19.2904 6.67803 19.3938 6.82931 19.4749 7.00642C19.5561 7.18353 19.593 7.36802 19.5856 7.55989V8.97676H26.67ZM12.5013 8.97676H18.1687V7.55989H12.5013V8.97676ZM5.41688 10.3936V12.4415L12.5013 15.9726V14.6443H18.1687V15.9726L25.2531 12.4415V10.3936H5.41688ZM13.9181 16.0611V17.478H16.7519V16.0611H13.9181ZM25.2531 21.7286V14.0133L18.1687 17.5666V18.8949H12.5013V17.5666L5.41688 14.0133V21.7286H25.2531Z" fill="currentColor"/>
      </svg>
    ),
    hasSubmenu: true,
    submenu: [
      // { name: "All Orders", path: "/projects", key: "projects" },
      { name: "Add New Orders", path: "/projects/new", key: "projects-new" },
      { name: "Ongoing Oredes", path: "/projects/ongoing", key: "projects-ongoing" },
      { name: "History & Details", path: "/projects/history", key: "projects-history" },
    ],
  },
  {
    name: "Clients",
    path: "/clients/list",
    key: "clients",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
        <path d="M13.1572 6.38672C12.0964 6.38672 11.0789 6.80815 10.3288 7.55829C9.57865 8.30844 9.15723 9.32585 9.15723 10.3867C9.15723 11.4476 9.57865 12.465 10.3288 13.2151C11.0789 13.9653 12.0964 14.3867 13.1572 14.3867C14.2181 14.3867 15.2355 13.9653 15.9857 13.2151C16.7358 12.465 17.1572 11.4476 17.1572 10.3867C17.1572 9.32585 16.7358 8.30844 15.9857 7.55829C15.2355 6.80815 14.2181 6.38672 13.1572 6.38672ZM10.1572 10.3867C10.1572 9.59107 10.4733 8.82801 11.0359 8.2654C11.5985 7.70279 12.3616 7.38672 13.1572 7.38672C13.9529 7.38672 14.7159 7.70279 15.2785 8.2654C15.8412 8.82801 16.1572 9.59107 16.1572 10.3867C16.1572 11.1824 15.8412 11.9454 15.2785 12.508C14.7159 13.0706 13.9529 13.3867 13.1572 13.3867C12.3616 13.3867 11.5985 13.0706 11.0359 12.508C10.4733 11.9454 10.1572 11.1824 10.1572 10.3867ZM8.16623 15.3867C7.90283 15.3855 7.64179 15.4364 7.3981 15.5364C7.1544 15.6363 6.93286 15.7835 6.74619 15.9693C6.55952 16.1551 6.4114 16.376 6.31032 16.6193C6.20925 16.8625 6.15722 17.1233 6.15723 17.3867C6.15723 19.0777 6.99023 20.3527 8.29223 21.1837C9.57423 22.0007 11.3022 22.3867 13.1572 22.3867H13.2072C13.1738 22.2222 13.1571 22.0546 13.1572 21.8867V21.3867C11.4222 21.3867 9.90023 21.0227 8.83023 20.3397C7.78023 19.6697 7.15723 18.6967 7.15723 17.3867C7.15723 16.8337 7.60523 16.3867 8.16623 16.3867H13.6562C14.0323 15.8852 14.583 15.5433 15.1992 15.4287L15.2072 15.3867H8.16623ZM16.1572 15.8867V16.3867H15.6572C15.2594 16.3867 14.8779 16.5448 14.5966 16.8261C14.3153 17.1074 14.1572 17.4889 14.1572 17.8867V21.8867C14.1572 22.2845 14.3153 22.6661 14.5966 22.9474C14.8779 23.2287 15.2594 23.3867 15.6572 23.3867H21.6572C22.0551 23.3867 22.4366 23.2287 22.7179 22.9474C22.9992 22.6661 23.1572 22.2845 23.1572 21.8867V17.8867C23.1572 17.4889 22.9992 17.1074 22.7179 16.8261C22.4366 16.5448 22.0551 16.3867 21.6572 16.3867H21.1572V15.8867C21.1572 15.4889 20.9992 15.1074 20.7179 14.8261C20.4366 14.5448 20.0551 14.3867 19.6572 14.3867H17.6572C17.2594 14.3867 16.8779 14.5448 16.5966 14.8261C16.3153 15.1074 16.1572 15.4889 16.1572 15.8867ZM17.6572 15.3867H19.6572C19.7898 15.3867 19.917 15.4394 20.0108 15.5332C20.1045 15.6269 20.1572 15.7541 20.1572 15.8867V16.3867H17.1572V15.8867C17.1572 15.7541 17.2099 15.6269 17.3037 15.5332C17.3974 15.4394 17.5246 15.3867 17.6572 15.3867Z" fill="currentColor"/>
      </svg>
    ),
    hasSubmenu: true,
    submenu: [
      // { name: "Add New Client", path: "/clients/new", key: "clients-new" },
      { name: "All Clients List", path: "/clients/list", key: "clients-list" },
      { name: "GST Plans & Billing", path: "clients/billing", key: "clients-gst-billing" },
    ],
  },
  {
    name: "Account",
    path: "/account/invoices",
    key: "account",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
        <path d="M13 15.1421C15.2091 15.1421 17 13.3512 17 11.1421C17 8.93295 15.2091 7.14209 13 7.14209C10.7909 7.14209 9 8.93295 9 11.1421C9 13.3512 10.7909 15.1421 13 15.1421Z" fill="currentColor"/>
        <path d="M13.67 16.1621C13.45 16.1521 13.23 16.1421 13 16.1421C10.58 16.1421 8.32 16.8121 6.39 17.9621C5.51 18.4821 5 19.4621 5 20.4921V23.1421H14.26C13.5534 22.1347 13.1265 20.9579 13.0229 19.7317C12.9192 18.5056 13.1425 17.2738 13.67 16.1621ZM23.75 19.1421C23.75 18.9221 23.72 18.7221 23.69 18.5121L24.83 17.5021L23.83 15.7721L22.38 16.2621C22.06 15.9921 21.7 15.7821 21.3 15.6321L21 14.1421H19L18.7 15.6321C18.3 15.7821 17.94 15.9921 17.62 16.2621L16.17 15.7721L15.17 17.5021L16.31 18.5121C16.28 18.7221 16.25 18.9221 16.25 19.1421C16.25 19.3621 16.28 19.5621 16.31 19.7721L15.17 20.7821L16.17 22.5121L17.62 22.0221C17.94 22.2921 18.3 22.5021 18.7 22.6521L19 24.1421H21L21.3 22.6521C21.7 22.5021 22.06 22.2921 22.38 22.0221L23.83 22.5121L24.83 20.7821L23.69 19.7721C23.72 19.5621 23.75 19.3621 23.75 19.1421ZM20 21.1421C18.9 21.1421 18 20.2421 18 19.1421C18 18.0421 18.9 17.1421 20 17.1421C21.1 17.1421 22 18.0421 22 19.1421C22 20.2421 21.1 21.1421 20 21.1421Z" fill="currentColor"/>
      </svg>
    ),
    hasSubmenu: true,
    submenu: [
      { name: "Sale Invoicing", path: "/account/invoices", key: "account-invoicing" },
      { name: "Client Payments", path: "/account/payments", key: "account-payments" },
      { name: "Expense Management", path: "/account/expenses", key: "account-expenses" },
      { name: "Report", path: "/account/report", key: "account-report" },
      { name: "Quotation", path: "/account/quotation", key: "account-quotation" },
    ],
  },
  {
    name: "Employee",
    path: "/employee",
    key: "employee",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
        <path d="M19.6572 15.3867C21.0372 15.3867 22.1472 14.2667 22.1472 12.8867C22.1472 11.5067 21.0372 10.3867 19.6572 10.3867C18.9942 10.3867 18.3583 10.6501 17.8895 11.119C17.4206 11.5878 17.1572 12.2237 17.1572 12.8867C17.1572 13.5498 17.4206 14.1856 17.8895 14.6545C18.3583 15.1233 18.9942 15.3867 19.6572 15.3867ZM12.1572 14.3867C13.8172 14.3867 15.1472 13.0467 15.1472 11.3867C15.1472 9.72672 13.8172 8.38672 12.1572 8.38672C10.4972 8.38672 9.15723 9.72672 9.15723 11.3867C9.15723 13.0467 10.4972 14.3867 12.1572 14.3867ZM19.6572 17.3867C17.8272 17.3867 14.1572 18.3067 14.1572 20.1367V22.3867H25.1572V20.1367C25.1572 18.3067 21.4872 17.3867 19.6572 17.3867ZM12.1572 16.3867C9.82723 16.3867 5.15723 17.5567 5.15723 19.8867V22.3867H12.1572V20.1367C12.1572 19.2867 12.4872 17.7967 14.5272 16.6667C13.6572 16.4867 12.8172 16.3867 12.1572 16.3867Z" fill="currentColor"/>
      </svg>
    ),
    hasSubmenu: true,
    submenu: [
      { name: "Add New Employee", path: "/employee/new", key: "employee-new" },
      { name: "All Employees", path: "/employee/list", key: "employee-list" },
    ],
  },
];

const submenuVariants = {
  hidden: { height: 0, opacity: 0, transition: { duration: 0.15, ease: "easeOut" } },
  visible: { height: "auto", opacity: 1, transition: { duration: 0.2, ease: "easeIn" } },
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  const handleNavigation = (item) => {
    if (item.hasSubmenu) {
      setExpandedMenus((prev) => ({
        ...prev,
        [item.key]: !prev[item.key],
      }));
    }
    if (item.path) {
      navigate(item.path);
    }
  };

  const handleSubmenuNavigation = (path, parentKey) => {
    navigate(path);
    // Optionally close submenu on mobile
    if (window.innerWidth < 720) {
      setExpandedMenus((prev) => ({ ...prev, [parentKey]: false }));
    }
  };

  const isActive = (path) => location.pathname === path;
  const isParentActive = (item) =>
    item.hasSubmenu && item.submenu.some((subItem) => isActive(subItem.path) || location.pathname.startsWith(subItem.path));

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <img src={logo} alt="Alankar Logo" className={styles.logo} />
      </div>
      <nav className={styles.sidebarNav}>
        {sidebarItems.map((item, idx) => (
          <div key={item.key || idx}>
            <div
              className={`${styles.sidebarItem} ${
                isActive(item.path) || isParentActive(item) ? styles.active : ""
              }`}
              onClick={() => handleNavigation(item)}
            >
              <span className={`${styles.sidebarIcon} ${isActive(item.path) || isParentActive(item) ? styles.iconActive : ""}`}>
                {item.icon}
              </span>
              <span className={styles.sidebarText}>{item.name}</span>
              {item.hasSubmenu && (
                <span
                  className={[
                    styles.submenuArrow,
                    expandedMenus[item.key] ? styles.expanded : "",
                    (isParentActive(item) || isActive(item.path)) ? styles.active : ""
                  ].join(" ")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 30 31" fill="none">
                    <path d="M11.5 22.7031L18.5 15.7031L11.5 8.70312"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </div>
            <AnimatePresence initial={false}>
              {item.hasSubmenu && expandedMenus[item.key] && (
                <motion.div
                  className={styles.sidebarSubmenu}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={submenuVariants}
                >
                  {item.submenu.map((subItem, sIdx) => (
                    <div
                      key={subItem.key}
                      className={`${styles.sidebarItem} ${styles.submenuItem} ${
                        isActive(subItem.path) ? styles.active : ""
                      }`}
                      onClick={() => handleSubmenuNavigation(subItem.path, item.key)}
                    >
                      <span className={styles.submenuLineWrap}>
                        <span className={styles.submenuLine} />
                        <span
                          className={`${styles.submenuDot} ${
                            isActive(subItem.path) ? styles.active : ""
                          }`}
                        />
                      </span>
                      <span className={styles.sidebarText}>{subItem.name}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
