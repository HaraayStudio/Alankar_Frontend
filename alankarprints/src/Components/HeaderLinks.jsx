// src/components/HeaderLinks/HeaderLinks.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./HeaderLinks.module.scss";

const HeaderLinks = ({ links }) => {
  const location = useLocation();

  return (
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
      </div>
    </div>
  );
};

export default HeaderLinks;
