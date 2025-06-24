// src/pages/OrderDashboard.jsx
import React, { useContext, useMemo } from "react";
import { DataContext } from "../../context/DataContext";
import styles from "./OrderDashboard.module.scss";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { motion } from "framer-motion";
import { ChevronRight, CheckCircle, Clock, User, TrendingUp } from "lucide-react";

// --- Helpers ---
const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "-";
const formatStat = (num) => (num || 0).toLocaleString();

const COLORS = ["#27cb7a", "#23b8ff", "#ffe371"];
const STATUS_COLORS = { Ongoing: "#27cb7a", Completed: "#23b8ff", Assigned: "#ffe371" };

// Example demo data for chart, can connect to your real data as required:
const ordersByDay = [
  { day: "Monday", orders: 340 },
  { day: "Tuesday", orders: 270 },
  { day: "Wednesday", orders: 220 },
  { day: "Thursday", orders: 400 },
  { day: "Friday", orders: 290 },
  { day: "Saturday", orders: 240 },
  { day: "Sunday", orders: 260 }
];

const goalStats = [
  { name: "Active", value: 18 },
  { name: "Completed", value: 54 },
  { name: "Assigned", value: 18 }
];

const getStatusDot = (status) => (
  <span
    className={styles.statusDot}
    style={{ background: STATUS_COLORS[status] || "#bbb" }}
  />
);

export default function OrderDashboard() {
  const { orders, clients } = useContext(DataContext);

  // --- Calculate stats from real data ---
  const now = new Date();
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === "COMPLETED").length;
  const ongoingOrders = orders.filter(o => o.status === "IN_PROGRESS" || o.status === "ONGOING").length;
  const pendingOrders = orders.filter(o => o.status === "PENDING").length;

  // --- Weekly change percentage (demo, make dynamic) ---
  const weekChange = "+10%";

  // --- Demo history (replace with real) ---
  const historyList = Array(3).fill().map((_, i) => ({
    name: "Wall poster designing",
    status: "Ongoing",
    date: "20 June, 2025"
  }));

  // --- Calculate pie stats ---
  const pieStats = [
    { name: "Active", value: ongoingOrders },
    { name: "Completed", value: completedOrders },
    { name: "Assigned", value: Math.max(0, totalOrders - ongoingOrders - completedOrders) }
  ];

  // --- Animations ---
  const spring = { type: "spring", stiffness: 120, damping: 16 };

  return (
    <div className={styles.dashboardMain}>
      {/* Top Card + Graph */}
      <motion.div
        className={styles.topCard}
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
      >
        <div className={styles.topLeft}>
          <div className={styles.ordersTitle}>Total Orders</div>
          <div className={styles.date}>{formatDate(now)}</div>
          <div className={styles.ordersCount}>
            <span>{formatStat(totalOrders)}</span>
            <span className={styles.upStat}>{weekChange} <TrendingUp size={16} /></span>
          </div>
        </div>
        <div className={styles.topRight}>
          <ResponsiveContainer width="100%" height={110}>
            <AreaChart data={ordersByDay} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2974e5" stopOpacity={0.23} />
                  <stop offset="80%" stopColor="#2974e5" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={13} />
              <YAxis hide domain={[100, 400]} />
              <Tooltip
                contentStyle={{ background: "#fff", borderRadius: 8, border: "none", boxShadow: "0 3px 15px #aac5e433" }}
                labelStyle={{ color: "#344050", fontWeight: 700 }}
                formatter={(val) => <b style={{ color: "#2974e5" }}>{val}</b>}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#2974e5"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorOrders)"
                activeDot={{ r: 7, style: { fill: "#2974e5" } }}
              />
            </AreaChart>
          </ResponsiveContainer>
          <button className={styles.filterBtn}>
            Weekly <ChevronRight size={17} />
          </button>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <motion.div className={styles.cardsRow} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <div className={styles.statCard}>
          <div className={styles.cardTitle}>Active Projects</div>
          <div className={styles.statValue}>{formatStat(ongoingOrders)}</div>
          <div className={styles.cardSubRow}>
            <span className={styles.statSub}>This Week</span>
            <span className={styles.statBadge}>↑ 10%</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.cardTitle}>Ongoing Projects</div>
          <div className={styles.statValue}>{formatStat(ongoingOrders)}</div>
          <div className={styles.cardSubRow}>
            <span className={styles.statSub}>This Week</span>
            <div className={styles.progressBarOuter}>
              <div className={styles.progressBarInner} style={{ width: "70%" }} />
              <span className={styles.progressLabel}>3rd step</span>
            </div>
            <span className={styles.progressPct}>70%</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.cardTitle}>Pending Projects</div>
          <div className={styles.statValue}>{formatStat(pendingOrders)}</div>
          <div className={styles.cardSubRow}>
            <span className={styles.statSub}>This Week</span>
            <span className={styles.statBadge}>↑ 10%</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom: Pie Chart + History */}
      <div className={styles.bottomSection}>
        <motion.div className={styles.goalCard} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <div className={styles.goalTitle}>You've almost reached your goal</div>
          <div className={styles.goalSub}>
            75% of your goals are completed just complete 25% of remaining goals to achieve your target.
          </div>
          <div className={styles.pieWrap}>
            <ResponsiveContainer width="98%" height={120}>
              <PieChart>
                <Pie
                  data={pieStats}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={32}
                  outerRadius={53}
                  labelLine={false}
                  paddingAngle={3}
                  isAnimationActive
                >
                  {pieStats.map((entry, idx) => (
                    <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Legend iconType="circle" verticalAlign="bottom" align="center"
                  wrapperStyle={{ fontSize: "13px", marginTop: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className={styles.pieLabels}>
              {pieStats.map((d, i) => (
                <div key={d.name} style={{ color: COLORS[i], fontWeight: 600, fontSize: "13px", marginRight: 16 }}>
                  {d.name}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div className={styles.historyCard} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
          <div className={styles.historyHeader}>
            <div>History & Details</div>
            <button className={styles.seeAllBtn}>See all</button>
          </div>
          <div className={styles.historyList}>
            {historyList.map((h, idx) => (
              <div className={styles.historyRow} key={idx}>
                <div>
                  <div className={styles.taskName}>{h.name}</div>
                  <div className={styles.historyDate}>{h.date}</div>
                </div>
                <div className={styles.statusRight}>
                  {getStatusDot(h.status)}
                  <span className={styles.statusTxt}>{h.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
