// import React, { useMemo } from "react";
// import { useData } from "../../context/DataContext";
// import styles from "./ClientsDashboard.module.scss";
// import { Link } from "react-router-dom";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip as ReTooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts";
// import { MessageCircle } from "lucide-react";
// // Chart Colors
// const COLORS = ["#337efc", "#21bb6f", "#ffb300"];
// // Helper to get this week’s day strings
// function getWeekDays() {
//   const today = new Date();
//   const monday = new Date(today.setDate(today.getDate() - today.getDay()));
//   return Array.from({ length: 7 }, (_, i) => {
//     const d = new Date(monday);
//     d.setDate(monday.getDate() + i);
//     return d.toLocaleDateString("en-US", { weekday: "short" });
//   });
// }
// // Helper: Is date in this week?
// function isThisWeek(dateStr) {
//   if (!dateStr) return false;
//   const now = new Date();
//   const date = new Date(dateStr);
//   const first = new Date(now.setDate(now.getDate() - now.getDay()));
//   first.setHours(0, 0, 0, 0);
//   const last = new Date(first);
//   last.setDate(first.getDate() + 6);
//   last.setHours(23, 59, 59, 999);
//   return date >= first && date <= last;
// }
// // Main Dashboard Component
// export default function ClientsDashboard() {
//   const { clients = [] } = useData();
//   // Simulate 'createdAt' for demonstration if missing (you can remove this for real data)
//   const fakeClients = useMemo(() => {
//     return clients.map((cl, i) => ({
//       ...cl,
//       createdAt:
//         cl.createdAt ||
//         new Date(
//           Date.now() -
//             ((Math.random() * 12) | 0) * 24 * 60 * 60 * 1000
//         ).toISOString(),
//       company: cl.company || "BrightWave Innovations",
//       lastProject: cl.lastProject || "Vinyl",
//       lastQuantity: cl.lastQuantity || 500,
//       name: cl.name || cl.clientName || `User ${i + 1}`,
//     }));
//   }, [clients]);
//   // --- Data Analysis ---
//   const weekDays = getWeekDays();
//   // 1. All clients this week
//   const clientsThisWeek = fakeClients.filter(cl => isThisWeek(cl.createdAt));
//   // 2. Active (same as new for now; can expand logic for “active”)
//   const activeClients = clientsThisWeek.length;
//   // 3. New clients this week
//   const newClients = clientsThisWeek.length;
//   // 4. Total
//   const totalClients = fakeClients.length;
//   // 5. Per day line: count clients added each weekday
//   const activePerDay = weekDays.map((day, i) => {
//     const d = new Date();
//     d.setDate(d.getDate() - d.getDay() + i);
//     d.setHours(0, 0, 0, 0);
//     const count = fakeClients.filter(cl => {
//       const created = new Date(cl.createdAt);
//       return (
//         created.getDate() === d.getDate() &&
//         created.getMonth() === d.getMonth() &&
//         created.getFullYear() === d.getFullYear()
//       );
//     }).length;
//     return { day, active: count };
//   });
//   // 6. Pie/Donut data
//   const pieData = [
//     { name: "Total Clients", value: totalClients },
//     { name: "New Clients", value: newClients },
//     { name: "Active Clients", value: activeClients },
//   ];
//   // --- Cards: 3 most recent clients
//   const sortedClients = [...fakeClients].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//   const clientCards = sortedClients.slice(0, 3);
//   // --- Render ---
//   return (
//     <div className={styles.dashboardGrid}>
//       {/* Summary/Line Section */}
//       <div className={styles.summaryCard}>
//         <div className={styles.chartBox}>
//           <ResponsiveContainer width="100%" height={120}>
//             <LineChart data={activePerDay}>
//               <defs>
//                 <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="15%" stopColor="#21bb6f" stopOpacity={0.82}/>
//                   <stop offset="95%" stopColor="#eaf2ff" stopOpacity={0.14}/>
//                 </linearGradient>
//               </defs>
//               <CartesianGrid vertical={false} strokeDasharray="2 7" stroke="#e7f4fa"/>
//               <XAxis dataKey="day" axisLine={false} tickLine={false} />
//               <YAxis hide />
//               <ReTooltip content={<LineCustomTooltip />} />
//               <Line
//                 type="monotone"
//                 dataKey="active"
//                 stroke="#21bb6f"
//                 strokeWidth={3}
//                 dot={false}
//                 activeDot={{ r: 8 }}
//                 isAnimationActive
//                 animationDuration={900}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//           {/* Bottom “glass” summary */}
//           <div className={styles.bottomSummary}>
//             <div>
//               <div className={styles.statNum}>{totalClients}</div>
//               <div className={styles.statLabel}>Total Clients</div>
//             </div>
//             <div className={styles.activeSummary}>
//               <div className={styles.statNumActive}>{activeClients}</div>
//               <div className={styles.statLabel}>Active Clients</div>
//             </div>
//             <div>
//               <div className={styles.statNum}>{newClients}</div>
//               <div className={styles.statLabel}>New Clients</div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Donut/Pie Chart */}
//       <div className={styles.pieCard}>
//         <div className={styles.pieTitleRow}>
//           <span>Clients Summary</span>
//           <div className={styles.pieDropdown}>Weekly <span>▼</span></div>
//         </div>
//         <ResponsiveContainer width="100%" height={140}>
//           <PieChart>
//             <Pie
//               data={pieData}
//               cx="50%" cy="55%" innerRadius={34} outerRadius={52}
//               fill="#8884d8"
//               paddingAngle={2}
//               dataKey="value"
//               isAnimationActive
//               animationDuration={650}
//               startAngle={90} endAngle={-270}
//             >
//               {pieData.map((entry, i) => (
//                 <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
//               ))}
//             </Pie>
//             <ReTooltip content={<PieCustomTooltip />} />
//           </PieChart>
//         </ResponsiveContainer>
//         <div className={styles.pieLegend}>
//           <span><span className={styles.legendDot} style={{background: COLORS[0]}}/> Total Clients</span>
//           <span><span className={styles.legendDot} style={{background: COLORS[1]}}/> New Clients</span>
//           <span><span className={styles.legendDot} style={{background: COLORS[2]}}/> Active Clients</span>
//         </div>
//       </div>
//       {/* Clients Card List */}
//       <div className={styles.allClients}>
//         <div className={styles.allClientsHeader}>
//           <span>All Clients</span>
//           <Link to="/clients" className={styles.seeAllBtn}>See all &gt;</Link>
//         </div>
//         <div className={styles.clientsGrid}>
//           {clientCards.map((client, i) => (
//             <div key={client.id || i} className={styles.clientCard}>
//               <div className={styles.clientCardTop}>
//                 <img
//                   src={client.avatarUrl || `https://api.dicebear.com/7.x/person/svg?seed=${encodeURIComponent(client.name)}`}
//                   alt={client.name}
//                   className={styles.avatar}
//                   width={36}
//                   height={36}
//                 />
//                 <div className={styles.clientName}>{client.name}</div>
//                 <button className={styles.moreBtn} aria-label="more">⋮</button>
//               </div>
//               <div className={styles.clientCardBody}>
//                 <div>
//                   <div className={styles.label}>Project Name</div>
//                   <div className={styles.value}>{client.lastProject}</div>
//                 </div>
//                 <div>
//                   <div className={styles.label}>Quantity</div>
//                   <div className={styles.value}>{client.lastQuantity}</div>
//                 </div>
//                 <div>
//                   <div className={styles.label}>Company Name</div>
//                   <div className={styles.value}>{client.company}</div>
//                 </div>
//                 <div className={styles.messageBtnBox}>
//                   <MessageCircle size={17} />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// // --- Tooltips ---
// function LineCustomTooltip({ active, payload, label }) {
//   if (active && payload && payload.length) {
//     return (
//       <div className={styles.chartTooltip}>
//         <div>{label}</div>
//         <div>
//           <span>Active:</span> {payload[0].value}
//         </div>
//       </div>
//     );
//   }
//   return null;
// }
// function PieCustomTooltip({ active, payload }) {
//   if (active && payload && payload.length) {
//     return (
//       <div className={styles.chartTooltip}>
//         <div style={{ color: payload[0].color }}>{payload[0].name}:</div>
//         <div style={{ fontWeight: 700 }}>{payload[0].value}</div>
//       </div>
//     );
//   }
//   return null;
// }
import React from 'react'
import img from '../../assets/clients.png'
export default function AddProject() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <img src={img} alt="" />
    </div>
  )
}