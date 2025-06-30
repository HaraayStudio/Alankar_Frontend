// src/components/MainLayout/MainLayout.jsx
import React from "react";
import styles from "./MainLayout.module.scss";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <div className={styles.root}>
    <Sidebar />
    <div className={styles.mainArea}>
      <Navbar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  </div>
);

export default MainLayout;
