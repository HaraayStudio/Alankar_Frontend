// import React, { useEffect, useMemo, useState } from "react";
// import styles from "./EmployeeDashboard.module.scss";
// import { useData } from "../../context/DataContext";
// import { ChevronDown, ArrowUpRight } from "lucide-react";
// import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";
// import cn from "classnames";
// // Demo function to simulate salary and incentives if not present
// function enrichEmployees(employees) {
//   // Add salaries, incentives, status for UI (you can wire this to real API)
//   return employees.map((emp, i) => ({
//     ...emp,
//     joinDate: emp.joinDate || `2025-05-${String((i % 27) + 1).padStart(2, "0")}`,
//     status: emp.status || (i % 3 === 0 ? "LEAVE" : "ACTIVE"),
//     salary: 5000 + ((i % 5) * 1000), // random salary
//     incentives: i % 4 === 0 ? 1500 : 0,
//     employerContribution: 500 + ((i % 2) * 200),
//   }));
// }
// // Helper: growth calculation for chart
// function buildRecruitmentGrowth(employees) {
//   // Count employees joined per quarter/month
//   const months = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//   ];
//   const countByMonth = Array(12).fill(0);
//   employees.forEach(emp => {
//     if (emp.joinDate) {
//       const d = new Date(emp.joinDate);
//       if (!isNaN(d)) countByMonth[d.getMonth()]++;
//     }
//   });
//   let cumulative = 0;
//   return months.map((m, i) => {
//     cumulative += countByMonth[i];
//     return { name: m, value: cumulative };
//   });
// }
// // Helper: salaries/incentives per month
// function buildSalaryIncentiveStats(employees) {
//   // Returns array by month, each { month, salaries, incentives, employer }
//   const months = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//   ];
//   let data = months.map((m, i) => ({
//     month: m, salaries: 0, incentives: 0, employer: 0
//   }));
//   employees.forEach(emp => {
//     if (emp.joinDate) {
//       const d = new Date(emp.joinDate);
//       if (!isNaN(d)) {
//         data[d.getMonth()].salaries += emp.salary || 0;
//         data[d.getMonth()].incentives += emp.incentives || 0;
//         data[d.getMonth()].employer += emp.employerContribution || 0;
//       }
//     }
//   });
//   return data;
// }
// const StatusChip = ({ status }) => (
//   <span className={cn(styles.statusChip, {
//     [styles.completed]: status === "Completed" || status === "ACTIVE",
//     [styles.pending]: status === "Pending" || status === "LEAVE"
//   })}>
//     {status === "ACTIVE" ? "Completed" : status === "LEAVE" ? "Pending" : status}
//   </span>
// );
// export default function EmployeeDashboard() {
//   const {
//     employees: employeesRaw,
//     handleGetAllEmployees,
//     loading
//   } = useData();
//   // Enhance data with salary, incentives, etc.
//   const employees = useMemo(() => enrichEmployees(employeesRaw || []), [employeesRaw]);
//   // --- Calculations for Dashboard ---
//   const totalEmployees = employees.length;
//   const activeEmployees = employees.filter(e => e.status === "ACTIVE");
//   const leaveEmployees = employees.filter(e => e.status === "LEAVE");
//   const lastMonthEmployees = 500; // You can pull last month's data from API
//   const percentChange = lastMonthEmployees ? Math.round(((totalEmployees - lastMonthEmployees) / lastMonthEmployees) * 100) : 0;
//   // Main stats
//   const totalSalaries = employees.reduce((sum, e) => sum + (e.salary || 0), 0);
//   const totalIncentives = employees.reduce((sum, e) => sum + (e.incentives || 0), 0);
//   const totalEmployer = employees.reduce((sum, e) => sum + (e.employerContribution || 0), 0);
//   // Chart Data
//   const salaryChart = buildSalaryIncentiveStats(employees);
//   const recruitmentGrowth = buildRecruitmentGrowth(employees);
//   // Dropdown State
//   const [selectedTab, setSelectedTab] = useState("Active");
//   useEffect(() => { handleGetAllEmployees && handleGetAllEmployees(); }, []);
//   return (
//     <div className={styles.dashRoot}>
//       {/* TOP CARD: Total Projects */}
//       <div className={styles.topCardWrap}>
//         <div className={styles.topCardMain}>
//           <div>
//             <div className={styles.topCardLabel}>Total Projects</div>
//             <div className={styles.topCardDate}>12 May, 2025</div>
//             <div className={styles.topCardAmt}>₹{(totalSalaries + totalIncentives + totalEmployer).toLocaleString()}</div>
//             <span className={styles.growthTag}>
//               <ArrowUpRight size={16} /> {percentChange >= 0 ? "+" : ""}{percentChange}%
//             </span>
//           </div>
//           <div className={styles.monthDropdown}>
//             Monthly <ChevronDown size={18} />
//           </div>
//         </div>
//         <div className={styles.topCardChartBox}>
//           <ResponsiveContainer width="100%" height={110}>
//             <LineChart data={salaryChart}>
//               <CartesianGrid strokeDasharray="2 7" stroke="#eaf2ff" />
//               <XAxis dataKey="month" tick={{ fontSize: 13 }} axisLine={false} tickLine={false} />
//               <YAxis domain={[0, 'dataMax + 10000']} hide />
//               <Line
//                 type="monotone"
//                 dataKey="salaries"
//                 stroke="#3474f6"
//                 strokeWidth={3}
//                 dot={false}
//                 activeDot={{ r: 7, fill: "#2979ff", stroke: "#fff", strokeWidth: 2 }}
//                 isAnimationActive
//               />
//               <Tooltip
//                 content={({ active, payload, label }) => active && payload?.length ? (
//                   <div className={styles.chartTooltip}>
//                     <div>{`Month: ${label}`}</div>
//                     <div>{`Amount: ₹ ${payload[0].value.toLocaleString()}`}</div>
//                   </div>
//                 ) : null}
//                 wrapperStyle={{ outline: "none" }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//         <div className={styles.topCardStatsRow}>
//           <div className={styles.miniStatCard}>
//             <div>Salaries</div>
//             <div className={styles.statAmt}>₹{totalSalaries.toLocaleString()}</div>
//             <div className={styles.statFoot}><span className={styles.growUp}>0%</span> No change compared to last month</div>
//           </div>
//           <div className={styles.miniStatCard}>
//             <div>Incentives</div>
//             <div className={styles.statAmt}>₹{totalIncentives.toLocaleString()}</div>
//             <div className={styles.statFoot}><span className={styles.growDown}>10%</span> No change compared to last month</div>
//           </div>
//           <div className={styles.miniStatCard}>
//             <div>Employer Contribution</div>
//             <div className={styles.statAmt}>₹{totalEmployer.toLocaleString()}</div>
//             <div className={styles.statFoot}><span className={styles.growUp}>0%</span> No change compared to last month</div>
//           </div>
//         </div>
//       </div>
//       {/* BOTTOM: All Employees + Recruitment */}
//       <div className={styles.bottomGrid}>
//         {/* All Employees */}
//         <div className={styles.allEmployeesCard}>
//           <div className={styles.cardHeader}>
//             <div>All Employees</div>
//             <div className={styles.selectDropdown}>Select <ChevronDown size={17} /></div>
//           </div>
//           <div className={styles.empBigStat}>
//             <span>{totalEmployees}</span>
//             <span className={styles.growthTag}><ArrowUpRight size={13} /> 10%</span>
//           </div>
//           <div className={styles.tabBtns}>
//             <button
//               className={selectedTab === "Active" ? styles.tabBtnActive : ""}
//               onClick={() => setSelectedTab("Active")}
//             >Active</button>
//             <button
//               className={selectedTab === "Leave" ? styles.tabBtnActive : ""}
//               onClick={() => setSelectedTab("Leave")}
//             >Leave</button>
//           </div>
//           <div className={styles.activeEmpList}>
//             {(selectedTab === "Active" ? activeEmployees : leaveEmployees).slice(0, 3).map(emp => (
//               <div key={emp.id} className={styles.empListItem}>
//                 <div className={styles.avatarCircle}>{emp.firstName?.[0]}{emp.lastName?.[0]}</div>
//                 <div>
//                   <div className={styles.empName}>{emp.firstName} {emp.lastName}</div>
//                   <div className={styles.empDate}>{emp.joinDate ? new Date(emp.joinDate).toLocaleDateString('en-GB') : "—"}</div>
//                 </div>
//                 <div className={styles.empAmt}>₹{emp.salary.toLocaleString()}</div>
//                 <StatusChip status={emp.status} />
//               </div>
//             ))}
//           </div>
//           <div className={styles.seeAll}><a href="#">See all</a></div>
//         </div>
//         {/* Recruitment Growth */}
//         <div className={styles.recruitGrowthCard}>
//           <div className={styles.cardHeader}>
//             <div>Employee Recruitment Growth</div>
//             <div className={styles.selectDropdown}>Select <ChevronDown size={17} /></div>
//           </div>
//           <div className={styles.recruitGrowthChartWrap}>
//             <ResponsiveContainer width="100%" height={180}>
//               <LineChart data={recruitmentGrowth}>
//                 <Line
//                   type="monotone"
//                   dataKey="value"
//                   stroke="#3474f6"
//                   strokeWidth={3}
//                   dot={({ cx, cy, value, index }) => (
//                     [2, 5, 8, 11].includes(index) ? (
//                       <g>
//                         <circle cx={cx} cy={cy} r={8} fill="#2979ff" stroke="#fff" strokeWidth={2}/>
//                         <text x={cx} y={cy - 14} fontSize="13" textAnchor="middle" fill="#222">{value}+</text>
//                       </g>
//                     ) : null
//                   )}
//                   isAnimationActive
//                 />
//                 <Tooltip
//                   content={({ active, payload, label }) => active && payload?.length ? (
//                     <div className={styles.chartTooltip}>
//                       <div>{label}</div>
//                       <div>Recruited: {payload[0].value}+</div>
//                     </div>
//                   ) : null}
//                   wrapperStyle={{ outline: "none" }}
//                 />
//                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13 }} />
//                 <YAxis hide />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChevronDown, TrendingUp, TrendingDown, Minus } from "lucide-react";
// Mock data context hook for demo (replace with your actual useData)
const useData = () => {
  return {
    employees: [
      {
        id: 1,
        firstName: "Ajay",
        lastName: "Thakur",
        email: "ajay@company.com",
        phone: 8877445588,
        role: "DEVELOPER",
        status: "ACTIVE",
        joinDate: "2025-05-20T00:00:00Z",
        salary: 35000,
        department: "Engineering"
      },
      {
        id: 2,
        firstName: "Rishikesh",
        lastName: "Thakur",
        email: "rishi@company.com",
        phone: 9988776655,
        role: "DESIGNER",
        status: "ACTIVE",
        joinDate: "2025-05-20T00:00:00Z",
        salary: 35000,
        department: "Design"
      },
      {
        id: 3,
        firstName: "Priya",
        lastName: "Sharma",
        email: "priya@company.com",
        phone: 7766554433,
        role: "MANAGER",
        status: "ACTIVE",
        joinDate: "2025-04-15T00:00:00Z",
        salary: 45000,
        department: "Management"
      },
      {
        id: 4,
        firstName: "Rohit",
        lastName: "Kumar",
        email: "rohit@company.com",
        phone: 6655443322,
        role: "DEVELOPER",
        status: "LEAVE",
        joinDate: "2025-03-10T00:00:00Z",
        salary: 32000,
        department: "Engineering"
      },
      {
        id: 5,
        firstName: "Sneha",
        lastName: "Patel",
        email: "sneha@company.com",
        phone: 5544332211,
        role: "HR",
        status: "ACTIVE",
        joinDate: "2025-01-25T00:00:00Z",
        salary: 28000,
        department: "Human Resources"
      }
    ],
    handleGetAllEmployees: () => {},
    handleDeleteEmployee: () => {},
    handleUpdateEmployee: () => {},
    loading: false
  };
};
// Utility functions
const getMonthlyData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  return months.map((month, index) => {
    let projects = 0;
    if (index <= currentMonth) {
      // Generate realistic project data
      projects = Math.floor(Math.random() * 8) + 2; // 2-10 projects per month
    }
    return { month, projects };
  });
};
const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};
// Custom Tooltips
const CustomAreaTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <div className="tooltip-label">{label}</div>
        <div className="tooltip-value">
          <span>Projects:</span> {payload[0].value}
        </div>
      </div>
    );
  }
  return null;
};
const PieCustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <div className="tooltip-label" style={{ color: payload[0].color }}>
          {payload[0].name}:
        </div>
        <div className="tooltip-value" style={{ fontWeight: 700 }}>
          {payload[0].value}
        </div>
      </div>
    );
  }
  return null;
};
// Status Badge Component
const StatusBadge = ({ status }) => {
  const getStatusInfo = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE':
        return { text: 'Active', className: 'status-active' };
      case 'LEAVE':
        return { text: 'Leave', className: 'status-leave' };
      case 'COMPLETED':
        return { text: 'Completed', className: 'status-completed' };
      case 'PENDING':
        return { text: 'Pending', className: 'status-pending' };
      default:
        return { text: status || 'Unknown', className: 'status-default' };
    }
  };
  const statusInfo = getStatusInfo(status);
  return (
    <span className={`status-badge ${statusInfo.className}`}>
      {statusInfo.text}
    </span>
  );
};
const EmployeeDashboard = () => {
  const { employees = [], loading } = useData();
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [selectedFilter, setSelectedFilter] = useState('Select');
  const [selectedGrowthFilter, setSelectedGrowthFilter] = useState('Select');
  const dashboardData = useMemo(() => {
    // Calculate basic stats
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(emp => emp.status === 'ACTIVE').length;
    const employeesOnLeave = employees.filter(emp => emp.status === 'LEAVE').length;
    // Calculate salary data
    const totalSalary = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
    const averageSalary = totalEmployees > 0 ? Math.round(totalSalary / totalEmployees) : 0;
    // Calculate incentives (example calculation)
    const totalIncentives = Math.round(totalSalary * 0.1); // 10% of total salary as incentives
    // Calculate employee contribution (example calculation)
    const employeeContribution = Math.round(totalSalary * 0.05); // 5% as contribution
    // Calculate percentage changes (mock data for demo)
    const salaryChange = calculatePercentageChange(totalSalary, totalSalary * 0.95);
    const incentiveChange = calculatePercentageChange(totalIncentives, totalIncentives * 0.9);
    const contributionChange = calculatePercentageChange(employeeContribution, employeeContribution * 0.85);
    const employeeChange = calculatePercentageChange(totalEmployees, Math.max(1, totalEmployees - 1));
    // Monthly project data
    const monthlyProjects = getMonthlyData();
    // Employee recruitment growth data
    const recruitmentData = [
      { name: "20+", value: Math.ceil(totalEmployees * 0.4) },
      { name: "30+", value: Math.ceil(totalEmployees * 0.35) },
      { name: "40+", value: Math.ceil(totalEmployees * 0.25) }
    ];
    return {
      totalEmployees,
      activeEmployees,
      employeesOnLeave,
      totalSalary,
      averageSalary,
      totalIncentives,
      employeeContribution,
      salaryChange,
      incentiveChange,
      contributionChange,
      employeeChange,
      monthlyProjects,
      recruitmentData,
      recentEmployees: employees.slice(0, 2)
    };
  }, [employees]);
  const COLORS = ["#4A90E2", "#7ED321", "#F5A623"];
  return (
    <div className="employee-dashboard">
      {/* Top Stats Cards */}
      <div className="top-stats-grid">
        {/* Total Projects Card */}
        <div className="stats-card projects-card">
          <div className="card-header">
            <div className="header-left">
              <h3>Total Projects</h3>
              <p className="date-info">12 May, 2025</p>
            </div>
            <div className="dropdown">
              {selectedPeriod} <ChevronDown size={16} />
            </div>
          </div>
          <div className="main-stat">
            <span className="currency-symbol">₹</span>
            <span className="amount">1,55,000</span>
            <span className="percentage-change positive">
              <TrendingUp size={16} />
              +10%
            </span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={dashboardData.monthlyProjects}>
                <defs>
                  <linearGradient id="projectsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4A90E2" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 11, fill: '#888' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip content={<CustomAreaTooltip />} />
                <Area
                  type="monotone"
                  dataKey="projects"
                  stroke="#4A90E2"
                  strokeWidth={2}
                  fill="url(#projectsGradient)"
                  dot={{ fill: '#4A90E2', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#4A90E2' }}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="chart-labels">
              <div className="label-item">
                <span className="label-dot" style={{backgroundColor: '#4A90E2'}}></span>
                <span>10 Lakh</span>
              </div>
              <div className="label-item">
                <span className="label-dot" style={{backgroundColor: '#7ED321'}}></span>
                <span>5 Lakh</span>
              </div>
              <div className="label-item">
                <span className="label-dot" style={{backgroundColor: '#F5A623'}}></span>
                <span>1 Lakh</span>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Stats Row */}
        <div className="bottom-stats">
          <div className="stat-item">
            <div className="stat-header">
              <span>Salary</span>
              <TrendingUp size={16} className="trend-icon positive" />
            </div>
            <div className="stat-value">{formatCurrency(dashboardData.totalSalary)}</div>
            <div className="stat-change">
              <span className="change-indicator positive">+{dashboardData.salaryChange}%</span>
              <span className="change-text">No change compared to last month</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-header">
              <span>Incentives</span>
              <TrendingUp size={16} className="trend-icon positive" />
            </div>
            <div className="stat-value">{formatCurrency(dashboardData.totalIncentives)}</div>
            <div className="stat-change">
              <span className="change-indicator negative">-{Math.abs(dashboardData.incentiveChange)}%</span>
              <span className="change-text">No change compared to last month</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-header">
              <span>Employee Contribution</span>
              <TrendingUp size={16} className="trend-icon positive" />
            </div>
            <div className="stat-value">{formatCurrency(dashboardData.employeeContribution)}</div>
            <div className="stat-change">
              <span className="change-indicator positive">+{dashboardData.contributionChange}%</span>
              <span className="change-text">No change compared to last month</span>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Grid */}
      <div className="bottom-grid">
        {/* All Employees Card */}
        <div className="employees-card">
          <div className="card-header">
            <h3>All Employees</h3>
            <div className="dropdown">
              {selectedFilter} <ChevronDown size={16} />
            </div>
          </div>
          <div className="employee-count">
            <span className="count">{dashboardData.totalEmployees}</span>
            <span className="percentage-change positive">
              <TrendingUp size={16} />
              +{dashboardData.employeeChange}%
            </span>
          </div>
          <div className="employee-status-tabs">
            <button className="tab-btn active">Active</button>
            <button className="tab-btn">Leave</button>
          </div>
          <div className="employees-list">
            <div className="list-header">
              <span>Active Employees</span>
              <a href="/employees" className="see-all-link">See all →</a>
            </div>
            {dashboardData.recentEmployees.map((employee) => (
              <div key={employee.id} className="employee-item">
                <div className="employee-info">
                  <img
                    src={`https://api.dicebear.com/7.x/person/svg?seed=${encodeURIComponent(employee.firstName + employee.lastName)}`}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    className="employee-avatar"
                  />
                  <div className="employee-details">
                    <h4>{employee.firstName} {employee.lastName}</h4>
                    <p>{new Date(employee.joinDate).toLocaleDateString('en-GB', { 
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}</p>
                  </div>
                </div>
                <div className="employee-salary">
                  <span className="salary">{formatCurrency(employee.salary)}</span>
                  <StatusBadge status={employee.status === 'ACTIVE' ? 'Completed' : 'Pending'} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Employee Recruitment Growth Card */}
        <div className="growth-card">
          <div className="card-header">
            <h3>Employee Recruitment Growth</h3>
            <div className="dropdown">
              {selectedGrowthFilter} <ChevronDown size={16} />
            </div>
          </div>
          <div className="pie-chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={dashboardData.recruitmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dashboardData.recruitmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<PieCustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
// Inline styles for the component (normally would be in a separate .module.scss file)
const styles = `
:root {
  --primary-blue: #4A90E2;
  --success-green: #7ED321;
  --warning-orange: #F5A623;
  --danger-red: #D0021B;
  --bg-gray: #F8F9FA;
  --white: #FFFFFF;
  --text-dark: #2C3E50;
  --text-gray: #7F8C8D;
  --text-light: #BDC3C7;
  --border-light: #E8EAED;
  --shadow-light: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.12);
  --border-radius: 12px;
  --border-radius-large: 16px;
}
.employee-dashboard {
  padding: 24px;
  background: var(--bg-gray);
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.top-stats-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
  margin-bottom: 24px;
}
.stats-card {
  background: var(--white);
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-light);
  padding: 24px;
  grid-row: span 2;
}
.projects-card {
  position: relative;
  overflow: hidden;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}
.header-left h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-dark);
  margin: 0 0 4px 0;
}
.date-info {
  font-size: 14px;
  color: var(--text-gray);
  margin: 0;
}
.dropdown {
  background: #F5F6FA;
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  color: var(--text-dark);
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}
.dropdown:hover {
  background: #EBEDF2;
  border-color: var(--primary-blue);
}
.main-stat {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.currency-symbol {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-dark);
}
.amount {
  font-size: 36px;
  font-weight: 700;
  color: var(--text-dark);
  line-height: 1;
}
.percentage-change {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}
.percentage-change.positive {
  background: #E8F5E8;
  color: var(--success-green);
}
.percentage-change.negative {
  background: #FFF0F0;
  color: var(--danger-red);
}
.chart-container {
  position: relative;
}
.chart-labels {
  display: flex;
  gap: 16px;
  margin-top: 12px;
  flex-wrap: wrap;
}
.label-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-gray);
}
.label-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.bottom-stats {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 16px;
}
.stat-item {
  background: var(--white);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: var(--shadow-light);
}
.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.stat-header span {
  font-size: 14px;
  color: var(--text-gray);
  font-weight: 500;
}
.trend-icon {
  color: var(--success-green);
}
.trend-icon.negative {
  color: var(--danger-red);
}
.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 8px;
  line-height: 1.2;
}
.stat-change {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.change-indicator {
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}
.change-indicator.positive {
  color: var(--success-green);
}
.change-indicator.negative {
  color: var(--danger-red);
}
.change-text {
  font-size: 12px;
  color: var(--text-light);
}
.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.employees-card,
.growth-card {
  background: var(--white);
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-light);
  padding: 24px;
}
.employee-count {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
.count {
  font-size: 48px;
  font-weight: 700;
  color: var(--text-dark);
  line-height: 1;
}
.employee-status-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}
.tab-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #F5F6FA;
  color: var(--text-gray);
}
.tab-btn.active {
  background: var(--primary-blue);
  color: var(--white);
}
.tab-btn:hover:not(.active) {
  background: #EBEDF2;
}
.employees-list {
  border-top: 1px solid var(--border-light);
  padding-top: 20px;
}
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.list-header span {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
}
.see-all-link {
  color: var(--primary-blue);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;
}
.see-all-link:hover {
  color: #357ABD;
}
.employee-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-light);
}
.employee-item:last-child {
  border-bottom: none;
}
.employee-info {
  display: flex;
  align-items: center;
  gap: 12px;
}
.employee-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--border-light);
  object-fit: cover;
}
.employee-details h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
  margin: 0 0 4px 0;
}
.employee-details p {
  font-size: 14px;
  color: var(--text-gray);
  margin: 0;
}
.employee-salary {
  text-align: right;
}
.salary {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 4px;
}
.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
}
.status-completed {
  background: #E8F5E8;
  color: var(--success-green);
}
.status-pending {
  background: #FFF4E6;
  color: var(--warning-orange);
}
.status-active {
  background: #E3F2FD;
  color: var(--primary-blue);
}
.status-leave {
  background: #FFF0F0;
  color: var(--danger-red);
}
.pie-chart-container {
  position: relative;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chart-tooltip {
  background: var(--white);
  border-radius: 8px;
  box-shadow: var(--shadow-medium);
  padding: 12px 16px;
  border: 1px solid var(--border-light);
  font-size: 14px;
}
.tooltip-label {
  font-weight: 500;
  margin-bottom: 4px;
}
.tooltip-value {
  font-weight: 600;
}
.tooltip-value span {
  color: var(--primary-blue);
  font-weight: 500;
}
/* Responsive Design */
@media (max-width: 1200px) {
  .top-stats-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
  .stats-card {
    grid-row: span 1;
  }
  .bottom-stats {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
  }
}
@media (max-width: 768px) {
  .employee-dashboard {
    padding: 16px;
  }
  .bottom-grid {
    grid-template-columns: 1fr;
  }
  .bottom-stats {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
  }
  .main-stat {
    flex-wrap: wrap;
  }
  .amount {
    font-size: 28px;
  }
  .count {
    font-size: 36px;
  }
  .employee-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .employee-salary {
    text-align: left;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
@media (max-width: 480px) {
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .main-stat {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .chart-labels {
    justify-content: center;
  }
  .employee-status-tabs {
    justify-content: center;
  }
}
/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: var(--bg-gray);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb {
  background: var(--border-light);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--text-light);
}
`;
// Add styles to document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
export default EmployeeDashboard;