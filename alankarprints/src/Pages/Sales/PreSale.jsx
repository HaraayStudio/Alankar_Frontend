import React, { useState } from "react";
import styles from "./PreSale.module.scss";
import HeaderLinks from "../../Components/HeaderLinks";
import Table from "../../Components/Table";
import OrdersPopup from "./OrdersPopup";
import QuotationsPopup from "./QuotationsPopup";
import { RefreshCcw, Trash2, X } from "lucide-react";
import { useData } from "../../context/DataContext";

const links = [
  { to: "/sales/presale", label: "Pre-sales" },
  { to: "/sales/postsale", label: "Post sales" },
];

const columns = [
  { key: "srNumber", label: "S.No" },
  { key: "clientName", label: "Client Name" },
  { key: "personName", label: "Person Name" },
  { key: "dateTime", label: "Date" },
  { key: "clientType", label: "Client Type" },
  { key: "status", label: "Status" },
  { key: "orders", label: "Orders" },
  { key: "quotations", label: "Quotations" },
  { key: "actions", label: "Actions" },
];

// --------- UTILITY: Check if any quotation is accepted ---------
function canUpdateStatus(item) {
  if (!item.quotations || item.quotations.length === 0) return false;
  return item.quotations.some(q => q.accepted === true);
}

export default function PreSale() {
  const {
    presales,
    setAddPreSalePopup,
    handleUpdatePresaleStatus,
    handleDeletePresale,
  } = useData();

  // ---- State for modals ----
  const [showOrders, setShowOrders] = useState({ open: false, orders: [], srNumber: null });
  const [showQuotations, setShowQuotations] = useState({ open: false, presale: null });

  // Status update modal state
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [selectedSrNumber, setSelectedSrNumber] = useState(null);
  const [statusToUpdate, setStatusToUpdate] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Delete presale modal state (optional)
  const [deletingSrNumber, setDeletingSrNumber] = useState(null);

  // ---- Action handlers ----

  // Status change handler
  const handleStatusPopupOpen = (srNumber, currentStatus) => {
    setShowStatusPopup(true);
    setSelectedSrNumber(srNumber);
    setStatusToUpdate(currentStatus);
  };

  const handleUpdatePresaleStatusClick = async () => {
    setUpdatingStatus(true);
    try {
      await handleUpdatePresaleStatus(selectedSrNumber, statusToUpdate);
      setShowStatusPopup(false);
    } catch (err) {
      alert("Failed to update status.");
    }
    setUpdatingStatus(false);
  };

  // Delete presale handler
  const handleDeletePresaleClick = async (srNumber) => {
    if (!window.confirm("Are you sure you want to delete this presale?")) return;
    setDeletingSrNumber(srNumber);
    try {
      await handleDeletePresale(srNumber);
    } catch (err) {
      alert("Failed to delete presale.");
    }
    setDeletingSrNumber(null);
  };

  // ---- Table data ----
  const data = (presales || []).map((item) => {
    const canUpdate = canUpdateStatus(item);

    return {
      srNumber: item.srNumber,
      clientName: item.client?.clientName || "-",
      personName: item.personName,
      dateTime: item.dateTime ? new Date(item.dateTime).toLocaleDateString("en-GB") : "-",
      clientType: item.clientType,
      status: (
        <span className={`${styles.status} ${styles[item.status?.toLowerCase()] || ""}`}>
          {item.status}
        </span>
      ),
      orders: (
        <button
          className={styles.actionBtn}
          onClick={() => setShowOrders({ open: true, orders: item.preSalesOrders, srNumber: item.srNumber })}
        >
          View Orders
        </button>
      ),
      quotations: (
        <button
          className={styles.actionBtn}
          onClick={() => setShowQuotations({ open: true, presale: item })}
        >
          View Quotations
        </button>
      ),
      actions: (
        <div className={styles.actionButtons}>
          {/* STATUS UPDATE BUTTON */}
          <button
            className={styles.iconButton}
            title={
              canUpdate
                ? "Change Status"
                : "Allowed only if Quotation Accepted"
            }
            onClick={() =>
              canUpdate && handleStatusPopupOpen(item.srNumber, item.status)
            }
            disabled={!canUpdate}
            style={{
              opacity: canUpdate ? 1 : 0.3,
              cursor: canUpdate ? "pointer" : "not-allowed",
            }}
          >
            <RefreshCcw size={16} />
          </button>
          {/* DELETE BUTTON */}
          <button
            className={styles.iconButton}
            title="Delete"
            onClick={() => handleDeletePresaleClick(item.srNumber)}
            disabled={deletingSrNumber === item.srNumber}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    };
  });

  return (
    <div className={styles.PreSaleMainDiv}>
      <HeaderLinks links={links} />
      <div className={styles.mainContent}>
        <div className={styles.heading}>
          <div className={styles.headtext}>
            <h1>Pre-Sale</h1>
          </div>
          <div className={styles.addButton}>
            <button onClick={() => setAddPreSalePopup(true)}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" fill="none">
                  <path d="M12 4V22M21 13H3" stroke="#030304" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
                </svg>
              </span>
              Add Pre-Sale
            </button>
          </div>
        </div>
        <Table columns={columns} data={data} />
      </div>

      {/* Orders Popup */}
      {showOrders.open && (
        <OrdersPopup
          orders={showOrders.orders}
          srNumber={showOrders.srNumber}
          onClose={() => setShowOrders({ open: false, orders: [], srNumber: null })}
        />
      )}

      {/* Quotations Popup */}
      {showQuotations.open && (
        <QuotationsPopup
          open={showQuotations.open}
          presale={showQuotations.presale}
          onClose={() => setShowQuotations({ open: false, presale: null })}
        />
      )}

      {/* Status Update Modal */}
      {showStatusPopup && (
        <div
          className={styles.modalBackdrop}
          onClick={(e) => e.target === e.currentTarget && setShowStatusPopup(false)}
        >
          <div className={styles.modalBox}>
            <div className={styles.modalHeader}>
              <span>Update Status</span>
              <button
                className={styles.closeButton}
                onClick={() => setShowStatusPopup(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <label>Status</label>
              <select
                value={statusToUpdate}
                onChange={(e) => setStatusToUpdate(e.target.value)}
              >
                <option value="PENDING">Pending</option>
                <option value="ONBOARDED">Onboarded</option>
                <option value="CREATED">Created</option>
              </select>
              <div className={styles.modalActions}>
                <button
                  className={styles.submitBtn}
                  onClick={handleUpdatePresaleStatusClick}
                  disabled={updatingStatus}
                >
                  {updatingStatus ? "Updating..." : "Update Status"}
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setShowStatusPopup(false)}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
