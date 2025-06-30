// Table.jsx
import React from "react";
import styles from "./Table.module.scss";

const Table = ({ columns, data }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                No data found
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {/* Render cell value as-is, allowing React elements (buttons) */}
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
