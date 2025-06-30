import React, { useContext, useMemo } from "react";
import styles from "./AccountsDashboard.module.scss";
import { DataContext } from "../../context/DataContext";
import {
  PieChart, Pie, Cell,
} from "recharts";
import { ChevronDown, ChevronRight } from "lucide-react";
import DashboardStatCard from "./StatsCard";

// COLORS
const colorBlue = "#2674e0";
const colorOrange = "#ffb95c";
const colorGreen = "#4caf50";
const colorPurple = "#bc7af9";

// Helper formatting
const formatCurrency = (amt = 0) =>
  `₹${Number(amt || 0).toLocaleString("en-IN", { minimumFractionDigits: 0 })}`;

const shortDate = (str) =>
  str
    ? new Date(str).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "-";

// Payments utility
function getPayments(invoices) {
  const history = [];
  const dues = [];
  invoices.forEach((inv) => {
    (inv.payments || []).forEach((pay) => {
      const item = {
        id: pay.id,
        clientName: inv.clientName,
        date: shortDate(pay.paymentDate) || shortDate(inv.issueDate),
        amount: pay.amount,
        status: pay.status,
      };
      if (
        pay.status === "COMPLETED" ||
        pay.status === "SUCCESS" ||
        pay.status === "PAID"
      ) {
        history.push(item);
      } else {
        dues.push(item);
      }
    });
  });
  return { history, dues };
}

function paymentsBarData(invoices) {
  // Returns daily sums for a week (Mon-Sun)
  const week = ["M", "T", "W", "T", "F", "S", "S"];
  const data = Array(7).fill(0);
  invoices.forEach((inv, idx) => {
    data[idx % 7] += inv.totalAmountWithGST || 0;
  });
  return week.map((label, i) => ({
    day: label,
    value: Math.round(data[i]),
  }));
}

function useChartStats(invoices, orders, clients) {
  const chartInv = invoices.slice(-7);
  const chartOrders = orders.slice(-7);
  return {
    invoiceArea: chartInv.map((inv, idx) => ({
      day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][idx % 7],
      value: inv.totalAmountWithGST || 0,
    })),
    clientArea: chartOrders.map((o, idx) => ({
      month: [
        "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"
      ][idx % 7],
      value: idx + 2,
    })),
    quoteArea: chartInv.map((_, idx) => ({
      day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][idx % 7],
      value: (idx % 2 === 0 ? 200 : 450) + 100 * idx,
    })),
  };
}

const donutColors = [
  colorBlue, colorPurple, colorOrange, "#dadfff",
  "#fdf2e0", "#e8d4ff"
];

const legendLabels = [
  { label: "Total Clients", color: colorBlue },
  { label: "Total Clients", color: "#dadfff" },
  { label: "Active Clients", color: colorOrange },
  { label: "Active Clients", color: colorPurple }
];

// For bottom graph cards
const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const getGraphData = (array, key = "totalAmountWithGST") =>
  weekLabels.map((label, i) => ({
    label,
    value: array[i] ? array[i][key] || (array[i].value || 0) : 250 + 100 * (i % 3),
  }));

function DonutReports({ orders, clients }) {
  // Demo: clients array, orders as active/inactive
  const total = clients.length || 5;
  const actives = orders.filter((o) => o.status !== "COMPLETED").length;
  const pieData = [
    { name: "Total Clients", value: total },
    { name: "Total Clients", value: Math.max(0, 10 - total) },
    { name: "Active Clients", value: actives },
    { name: "Active Clients", value: Math.max(0, 5 - actives) }
  ];
  return (
    <div className={styles.reportsCard}>
      <div className={styles.sectionTitle}>Reports</div>
      <PieChart width={150} height={150}>
        <Pie
          data={pieData}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={45}
          outerRadius={60}
          stroke="none"
          startAngle={90}
          endAngle={-270}
        >
          {pieData.map((_, i) => (
            <Cell key={i} fill={donutColors[i % donutColors.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className={styles.legendList}>
        {legendLabels.map((lg, i) => (
          <span key={i} className={styles.legend}>
            <span
              className={styles.legendDot}
              style={{ background: lg.color }}
            />
            {lg.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AccountsDashboard() {
  // All hooks INSIDE the component!
  const { invoices = [], clients = [], orders = [] } = useContext(DataContext);

  // Stats Cards graph data
  const invoicesData = useMemo(() => getGraphData(invoices, "totalAmountWithGST"), [invoices]);
  const clientsData = useMemo(() => getGraphData(clients, "id"), [clients]);
  const quotationsData = useMemo(() => getGraphData(orders, "id"), [orders]);

  // Payments summary bar chart
  const barData = useMemo(() => paymentsBarData(invoices), [invoices]);
  const barMax = Math.max(...barData.map((d) => d.value), 1); // Prevent div/0
  const totalPayments = barData.reduce((a, b) => a + b.value, 0);

  // Payments change (for now, demo)
  const paymentsGrowth = "+10%";

  // Payment history and dues
  const { history, dues } = useMemo(() => getPayments(invoices), [invoices]);
  const income = history.reduce((sum, item) => sum + (item.amount || 0), 0);
  const expenses = dues.reduce((sum, item) => sum + (item.amount || 0), 0);

  // Area charts data (optional for extra cards)
  const { invoiceArea, clientArea, quoteArea } = useChartStats(
    invoices,
    orders,
    clients
  );

  return (
    <div className={styles.gridWrap}>
      {/* PAYMENTS SUMMARY */}
      <section className={styles.paymentSummaryCard}>
        <div className={styles.sectionTop}>
          <div className={styles.sectionTitle}>Payments summary</div>
          <button className={styles.dropdownBtn}>
            Weekly <ChevronDown size={16} />
          </button>
        </div>
        <div className={styles.paymentTotal}>
          <span>{formatCurrency(totalPayments)}</span>
        </div>
        <div className={styles.paymentSubTxt}>
          This week sales higher than last week
        </div>
        <div className={styles.growthPositive}>
          <span>↑ {paymentsGrowth}</span>
          <span className={styles.labelGreen}>Last 7 days</span>
        </div>
        {/* Graph */}
        <div className={styles.barChartWrap}>
          <div className={styles.barChartGraph}>
            {barData.map((item, idx) => (
              <div
                key={item.day}
                className={`${styles.barCol} ${
                  idx === 3 ? styles.activeBar : ""
                }`}
              >
                <div
                  className={styles.bar}
                  style={{
                    height: `${(item.value / barMax) * 100 || 10}%`,
                  }}
                >
                  {idx === 3 && (
                    <div className={styles.barValuePop}>
                      {formatCurrency(item.value)}
                    </div>
                  )}
                </div>
                <div
                  className={`${styles.barLabel} ${
                    idx === 3 ? styles.activeDay : ""
                  }`}
                >
                  {item.day}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REPORTS DONUT */}
      <DonutReports orders={orders} clients={clients} />

      {/* INCOME */}
      <section className={styles.incomeCard}>
        <div className={styles.sectionTop}>
          <div className={styles.sectionTitle}>Income</div>
          <button className={styles.dropdownBtn}>
            Weekly <ChevronDown size={16} />
          </button>
        </div>
        <div className={styles.paymentTotal}>
          <span>{formatCurrency(income)}</span>
        </div>
        <div className={styles.incomeSubTxt}>
          You made an extra{" "}
          <span className={styles.labelGreen}>{formatCurrency(income / 2)}</span> this month
        </div>
        <div className={styles.paymentHistoryHead}>
          Payment History <span className={styles.seeAll}>See all <ChevronRight size={15} /></span>
        </div>
        <div className={styles.paymentHistoryList}>
          {history.slice(0, 2).map((item) => (
            <div className={styles.paymentHistoryRow} key={item.id}>
              <span className={styles.historyUser}>{item.clientName}</span>
              <span className={styles.historyDate}>{item.date}</span>
              <span className={styles.historyAmt}>{formatCurrency(item.amount)}</span>
              <span className={styles.historyStatus + " " + (item.status === "COMPLETED" ? styles.completed : styles.pending)}>
                {item.status === "COMPLETED" ? "Completed" : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* EXPENSES */}
      <section className={styles.expenseCard}>
        <div className={styles.sectionTop}>
          <div className={styles.sectionTitle}>Expenses</div>
          <button className={styles.dropdownBtn}>
            Weekly <ChevronDown size={16} />
          </button>
        </div>
        <div className={styles.paymentTotal}>
          <span>{formatCurrency(expenses)}</span>
        </div>
        <div className={styles.expenseSubTxt}>
          You made an extra{" "}
          <span className={styles.labelRed}>{formatCurrency(expenses / 2)}</span> this month
        </div>
        <div className={styles.paymentHistoryHead}>
          Payment Dues <span className={styles.seeAll}>See all <ChevronRight size={15} /></span>
        </div>
        <div className={styles.paymentHistoryList}>
          {dues.slice(0, 2).map((item) => (
            <div className={styles.paymentHistoryRow} key={item.id}>
              <span className={styles.historyUser}>{item.clientName}</span>
              <span className={styles.historyDate}>{item.date}</span>
              <span className={styles.historyAmt}>{formatCurrency(item.amount)}</span>
              <span className={styles.historyStatus + " " + (item.status === "COMPLETED" ? styles.completed : styles.pending)}>
                {item.status === "COMPLETED" ? "Completed" : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM GRAPH CARDS */}
      <div style={{ display: "flex", gap: "30px", marginTop: 25 }}>
        <DashboardStatCard
          title="Invoices"
          value={invoices.length}
          data={invoicesData}
          growth="+10%"
          gradientColor="#2674e0"
        />
        <DashboardStatCard
          title="Client"
          value={clients.length.toString().padStart(2, "0")}
          data={clientsData}
          growth="+10%"
          gradientColor="#fbb947"
          accent="#fff3e0"
          periodLabel="Monthly"
        />
        <DashboardStatCard
          title="Quotations"
          value={orders.length * 5}
          data={quotationsData}
          gradientColor="#47e088"
          accent="#d6faea"
          growth="+10%"
        />
      </div>
    </div>
  );
}
