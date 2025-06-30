// import React, { useMemo } from "react";
// import styles from "./SalesDashboard.module.scss";
// import { useData } from "../../context/DataContext";
// import {
//   LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Legend,
// } from "recharts";
// import { format, parseISO } from "date-fns";
// import { FiArrowUpRight } from "react-icons/fi";
// const monthsArr = [
//   "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
// ];
// // Helpers
// function getMonth(date) {
//   if (!date) return "";
//   const d = typeof date === "string" ? parseISO(date) : date;
//   return monthsArr[d.getMonth()];
// }
// // Calculate stats
// function getStats(presales, postsales) {
//   let preTotal = 0, postTotal = 0;
//   let preCount = 0, postCount = 0;
//   presales.forEach(p => {
//     preTotal += Number(p.budget || 0);
//     preCount++;
//   });
//   postsales.forEach(p => {
//     postTotal += Number(p.totalAmtWithGST || p.finalAmtWithOutGST || 0);
//     postCount++;
//   });
//   return {
//     total: preTotal + postTotal,
//     preTotal, postTotal,
//     preCount, postCount,
//   }
// }
// // Sales by month
// function getSalesByMonth(presales, postsales) {
//   const sales = {};
//   presales.forEach(p => {
//     const m = getMonth(p.orderStartDateTime);
//     if (!sales[m]) sales[m] = { month: m, pre: 0, post: 0 };
//     sales[m].pre += Number(p.budget || 0);
//   });
//   postsales.forEach(p => {
//     const m = getMonth(p.order?.startDateTime || p.orderStartDateTime);
//     if (!sales[m]) sales[m] = { month: m, pre: 0, post: 0 };
//     sales[m].post += Number(p.totalAmtWithGST || p.finalAmtWithOutGST || 0);
//   });
//   // Return array in correct month order
//   return monthsArr.map(m => sales[m] ? sales[m] : { month: m, pre: 0, post: 0 });
// }
// export default function SalesDashboard() {
//   const { presales = [], postsales = [] } = useData();
//   // Prepare data
//   const stats = useMemo(() => getStats(presales, postsales), [presales, postsales]);
//   const summaryData = useMemo(() => getSalesByMonth(presales, postsales), [presales, postsales]);
//   const prePerc = stats.preCount + stats.postCount === 0 ? 0 : Math.round(stats.preCount/(stats.preCount+stats.postCount)*100);
//   const postPerc = 100-prePerc;
//   const maxPostSale = postsales.reduce((max, p) => (p.totalAmtWithGST > max ? p.totalAmtWithGST : max), 0);
//   // For recent sales table (top 3-5 items)
//   const recentSales = [...presales].sort((a,b) => (new Date(b.orderStartDateTime)-new Date(a.orderStartDateTime))).slice(0,3);
//   return (
//     <div className={styles.salesDashboardMain}>
//       <div className={styles.grid}>
//         {/* Total Sales */}
//         <div className={styles.totalSalesCard}>
//           <div className={styles.salesTitle}>Total Sales</div>
//           <div className={styles.salesAmount}>₹{stats.total.toLocaleString()}</div>
//           <div className={styles.progressBarGroup}>
//             <div className={styles.progressBarLabel}>
//               <span>Pre-Sales</span>
//               <span>{stats.preCount}</span>
//             </div>
//             <div className={styles.progressBarTrack}>
//               <div
//                 className={styles.progressBarPre}
//                 style={{ width: `${prePerc}%` }}
//               />
//             </div>
//             <div className={styles.progressBarLabel}>
//               <span>Post-Sales</span>
//               <span>{stats.postCount}</span>
//             </div>
//             <div className={styles.progressBarTrack}>
//               <div
//                 className={styles.progressBarPost}
//                 style={{ width: `${postPerc}%` }}
//               />
//             </div>
//           </div>
//           <div className={styles.timeFilter}>Month</div>
//         </div>
//         {/* Highest Sales Record */}
//         <div className={styles.highestSalesCard}>
//           <div className={styles.highestTitle}>Highest Sales Record</div>
//           <ResponsiveContainer width="100%" height={80}>
//             <LineChart data={[
//               {name: "Mon", value: 2000},
//               {name: "Tue", value: 10000},
//               {name: "Wed", value: 4000},
//             ]}>
//               <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} dot={false} />
//               {/* You can improve this with real daily data */}
//             </LineChart>
//           </ResponsiveContainer>
//           <div className={styles.highestLabel}>
//             <span>₹{maxPostSale ? maxPostSale.toLocaleString() : "10,000"}/day</span>
//             <span className={styles.highestUp}><FiArrowUpRight/> 2.1%</span>
//           </div>
//           <div className={styles.highestTime}>Weekly</div>
//         </div>
//         {/* Sales Summary Line Chart */}
//         <div className={styles.salesSummaryCard}>
//           <div className={styles.sectionTitle}>Sales Summary</div>
//           <ResponsiveContainer width="100%" height={140}>
//             <LineChart data={summaryData}>
//               <XAxis dataKey="month" tick={{fontSize: 13}} />
//               <YAxis tick={{fontSize: 13}} />
//               <Tooltip
//                 formatter={(value, name) =>
//                   [`₹${value.toLocaleString()}`, name === "pre" ? "Pre-Sales" : "Post-Sales"]
//                 }
//               />
//               <Line type="monotone" dataKey="pre" stroke="#2979ff" strokeWidth={2} dot={true} name="Pre-Sales" />
//               <Line type="monotone" dataKey="post" stroke="#0e253d" strokeWidth={2} dot={true} name="Post-Sales" />
//             </LineChart>
//           </ResponsiveContainer>
//           <div className={styles.timeFilter2}>Month</div>
//         </div>
//         {/* Active Sales Bar/Column Chart */}
//         <div className={styles.activeSalesCard}>
//           <div className={styles.sectionTitle}>Active Sales</div>
//           <ResponsiveContainer width="100%" height={90}>
//             <BarChart data={[
//               {name:"Pre-sales", value: prePerc},
//               {name:"Post-sales", value: postPerc}
//             ]}>
//               <XAxis dataKey="name" />
//               <YAxis domain={[0, 100]} hide />
//               <Bar dataKey="value" radius={8} fill="#2979ff" />
//             </BarChart>
//           </ResponsiveContainer>
//           <div className={styles.activeSalesLegend}>
//             <span className={styles.legendPre} /> Pre-sales
//             <span className={styles.legendPost} /> Post-sales
//           </div>
//           <div className={styles.activeSalesPercents}>
//             <span>{prePerc}%</span>
//             <span>{postPerc}%</span>
//           </div>
//           <div className={styles.timeFilter3}>Month</div>
//         </div>
//         {/* Recent Sales Table */}
//         <div className={styles.recentSalesCard}>
//           <div className={styles.sectionTitle}>Recent sales</div>
//           <table className={styles.salesTable}>
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Person Name</th>
//                 <th>Company name</th>
//                 <th>Requirement</th>
//                 <th>Approached via</th>
//                 <th>Started</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentSales.map((item, idx) => (
//                 <tr key={item.srNumber || idx}>
//                   <td>{String(idx+1).padStart(2, "0")}</td>
//                   <td>{item.personName}</td>
//                   <td>{item.client?.clientName}</td>
//                   <td>
//                     {item.requirements?.length > 38
//                       ? item.requirements.slice(0,38) + "..."
//                       : item.requirements}
//                   </td>
//                   <td>
//                     <span className={styles.channelIcon}>
//                       {item.approachedVia === "whatsapp" ? "🟢 Whatsapp" :
//                        item.approachedVia === "email" ? "✉️ E-mail" :
//                        item.approachedVia === "phone" ? "📞 Phone" :
//                        item.approachedVia === "linkedin" ? "💼 LinkedIn" :
//                        item.approachedVia}
//                     </span>
//                   </td>
//                   <td>
//                     {item.orderStartDateTime
//                       ? new Date(item.orderStartDateTime).toLocaleString("en-GB", {
//                           day: "2-digit", month: "short", year: "numeric",
//                           hour: "2-digit", minute: "2-digit"
//                         })
//                       : "-"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className={styles.salesTableFilter}>
//             <span className={styles.salesTableTag}>Pre-sales</span>
//             <span className={styles.salesTableMonth}>Month</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/pages/SalesDashboard.jsx
import React, { useMemo } from "react";
import styles from "./SalesDashboard.module.scss";
import { useData } from "../../context/DataContext";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Legend, ReferenceLine
} from "recharts";
import { format, parseISO } from "date-fns";
import { FiArrowUpRight } from "react-icons/fi";
import { IoLogoWhatsapp, IoMailOutline, IoCallOutline, IoLogoLinkedin } from "react-icons/io5";
// --- Helpers ---
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const getMonth = dateStr => {
  if (!dateStr) return "";
  const date = typeof dateStr === "string" ? parseISO(dateStr) : dateStr;
  return MONTHS[date.getMonth()];
};
const getMonthIndex = m => MONTHS.indexOf(m);
// --- Stats calculations ---
function getStats(presales, postsales) {
  let preTotal = 0, postTotal = 0;
  let preCount = presales.length, postCount = postsales.length;
  presales.forEach(p => { preTotal += Number(p.budget || 0); });
  postsales.forEach(p => { postTotal += Number(p.totalAmtWithGST || p.finalAmtWithOutGST || 0); });
  return {
    total: preTotal + postTotal,
    preTotal, postTotal,
    preCount, postCount
  };
}
// --- Highest Sales Record calculation ---
function getHighestDay(posts) {
  let dayMap = {};
  posts.forEach(p => {
    let d = (p.order?.startDateTime || p.orderStartDateTime);
    if (d) {
      let dateStr = format(parseISO(d), "yyyy-MM-dd");
      dayMap[dateStr] = (dayMap[dateStr] || 0) + Number(p.totalAmtWithGST || p.finalAmtWithOutGST || 0);
    }
  });
  let maxVal = 0, maxDate = "";
  Object.entries(dayMap).forEach(([d,v]) => {
    if (v > maxVal) { maxVal = v; maxDate = d; }
  });
  return { maxVal, maxDate };
}
// --- Month wise graph data ---
function getSalesSummary(presales, postsales) {
  let summary = {};
  MONTHS.forEach(m => summary[m] = { month: m, presale: 0, postsale: 0 });
  presales.forEach(p => {
    const m = getMonth(p.orderStartDateTime);
    if (m) summary[m].presale += Number(p.budget || 0);
  });
  postsales.forEach(p => {
    const m = getMonth(p.order?.startDateTime || p.orderStartDateTime);
    if (m) summary[m].postsale += Number(p.totalAmtWithGST || p.finalAmtWithOutGST || 0);
  });
  return Object.values(summary);
}
// --- Active Sales percentage ---
function getActivePerc(pre, post) {
  let total = pre+post;
  let prePerc = total === 0 ? 0 : Math.round((pre/total)*100);
  let postPerc = total === 0 ? 0 : 100-prePerc;
  return { prePerc, postPerc };
}
// --- Recent sales list, sorted by date ---
function getRecentSales(presales, count = 5) {
  return [...presales]
    .sort((a,b) => (new Date(b.orderStartDateTime)-new Date(a.orderStartDateTime)))
    .slice(0, count);
}
const ApproachedIcon = ({via}) => {
  switch(via){
    case "whatsapp": return <IoLogoWhatsapp style={{color:"#25d366", fontSize:19, verticalAlign:"middle"}} />;
    case "email": return <IoMailOutline style={{color:"#0090ff", fontSize:18, verticalAlign:"middle"}} />;
    case "phone": return <IoCallOutline style={{color:"#30b37a", fontSize:18, verticalAlign:"middle"}} />;
    case "linkedin": return <IoLogoLinkedin style={{color:"#3270e6", fontSize:18, verticalAlign:"middle"}} />;
    default: return via;
  }
};
export default function SalesDashboard() {
  const { presales = [], postsales = [] } = useData();
  // Stats & data
  const stats = useMemo(() => getStats(presales, postsales), [presales, postsales]);
  const { prePerc, postPerc } = useMemo(() => getActivePerc(stats.preCount, stats.postCount), [stats]);
  const highest = useMemo(() => getHighestDay(postsales), [postsales]);
  const summary = useMemo(() => getSalesSummary(presales, postsales), [presales, postsales]);
  const recent = useMemo(() => getRecentSales(presales), [presales]);
  // For line chart dots and tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    let pre = payload.find(d=>d.dataKey==="presale");
    let post = payload.find(d=>d.dataKey==="postsale");
    return (
      <div className={styles.chartTooltip}>
        <div>{label}</div>
        <div>Post-Sales: <span>₹{post?.value?.toLocaleString()||"0"}</span></div>
        <div>Pre-Sales: <span>₹{pre?.value?.toLocaleString()||"0"}</span></div>
      </div>
    );
  };
  return (
    <div className={styles.dashboard}>
      <div className={styles.grid}>
        {/* Total Sales Card */}
        <div className={styles.card + " " + styles.totalSales}>
          <div className={styles.cardHead}>
            <div>Total Sales</div>
            <div className={styles.timeTag}>Month</div>
          </div>
          <div className={styles.amount}>₹{stats.total.toLocaleString()}</div>
          <div className={styles.barLabels}>
            <div>Pre-Sales</div>
            <div>Post-Sales</div>
          </div>
          <div className={styles.barWrap}>
            <div className={styles.progressBarBg}>
              <div className={styles.progressBarPre} style={{width: `${prePerc}%`}}>
                <span>{stats.preCount}</span>
              </div>
            </div>
            <div className={styles.progressBarBg}>
              <div className={styles.progressBarPost} style={{width: `${postPerc}%`}}>
                <span>{stats.postCount}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Highest Sales Record */}
        <div className={styles.card + " " + styles.highestSales}>
          <div className={styles.cardHeadDark}>
            <div>Highest Sales Record</div>
            <div className={styles.timeTagDark}>Weekly</div>
          </div>
          <ResponsiveContainer width="99%" height={75}>
            <LineChart data={[
              // Use actual best 7-day rolling average for production, here a demo
              {name:"Mon", val:3000},{name:"Tue",val:highest.maxVal||10000},{name:"Wed",val:4000}
            ]}>
              <Line type="monotone" dataKey="val" stroke="#66b3ff" strokeWidth={2.3} dot={{r:4, fill:"#fff", stroke:"#66b3ff", strokeWidth:2}} isAnimationActive animationDuration={950}/>
            </LineChart>
          </ResponsiveContainer>
          <div className={styles.highestStats}>
            <div>₹{highest.maxVal?highest.maxVal.toLocaleString():"10,000"}/day</div>
            <div className={styles.upTag}><FiArrowUpRight/> <span>2.1%</span></div>
          </div>
        </div>
        {/* Sales Summary */}
        <div className={styles.card + " " + styles.salesSummary}>
          <div className={styles.cardHead}>
            <div>Sales Summary</div>
            <div className={styles.timeTag}>Month</div>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={summary}>
              <CartesianGrid vertical={false} strokeDasharray="3 6" />
              <XAxis dataKey="month" tick={{fontSize:13, fill:"#8ba0c7"}} axisLine={false} />
              <YAxis tick={{fontSize:12, fill:"#b4bfd3"}} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="postsale" name="Post-Sales" stroke="#191b24" strokeWidth={2.5}
                    dot={{r:4, fill:"#fff", stroke:"#222A33", strokeWidth:2.5}}
                    activeDot={{r:6, fill:"#295cff", stroke:"#fff", strokeWidth:2}}
                    isAnimationActive animationDuration={900} />
              <Line type="monotone" dataKey="presale" name="Pre-Sales" stroke="#2979ff" strokeWidth={2.2}
                    dot={{r:4, fill:"#fff", stroke:"#2979ff", strokeWidth:2}}
                    activeDot={{r:6, fill:"#fff", stroke:"#2979ff", strokeWidth:2}}
                    isAnimationActive animationDuration={800} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Active Sales */}
        <div className={styles.card + " " + styles.activeSales}>
          <div className={styles.cardHead}>
            <div>Active Sales</div>
            <div className={styles.timeTag}>Month</div>
          </div>
          <ResponsiveContainer width="100%" height={85}>
            <BarChart data={[
              {name: "Pre-sales", value: prePerc},
              {name: "Post-sales", value: postPerc}
            ]} barSize={30}>
              <CartesianGrid strokeDasharray="3 4" vertical={false} />
              <XAxis dataKey="name" tick={{fontSize:13, fill:"#7a91b5"}} axisLine={false} />
              <YAxis hide domain={[0,100]} />
              <Tooltip formatter={v=>`${v}%`} />
              <Bar dataKey="value" radius={9}
                   fill="#2979ff"
                   animationDuration={800}
                   label={{ position:"top", fill:"#2979ff", fontWeight:700, fontSize:15 }}/>
              <ReferenceLine y={50} stroke="#e4eafd" strokeDasharray="3 3" />
            </BarChart>
          </ResponsiveContainer>
          <div className={styles.legendRow}>
            <span><span className={styles.legendDot} style={{background:"#191b24"}}/> Post-sales</span>
            <span><span className={styles.legendDot} style={{background:"#2979ff"}}/> Pre-sales</span>
            <span className={styles.percentTag}>{prePerc}%</span>
            <span className={styles.percentTag2}>{postPerc}%</span>
          </div>
        </div>
        {/* Recent Sales */}
        <div className={styles.card + " " + styles.recentSales}>
          <div className={styles.cardHead}>
            <div>Recent sales</div>
            <div className={styles.filtersRow}>
              <span className={styles.salesType}>Pre-sales</span>
              <span className={styles.timeTag}>Month</span>
            </div>
          </div>
          <table className={styles.salesTable}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Person Name</th>
                <th>Company name</th>
                <th>Requirement</th>
                <th>Approached via</th>
                <th>Started</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((item, idx) => (
                <tr key={item.srNumber || idx}>
                  <td>{String(idx+1).padStart(2, "0")}</td>
                  <td>{item.personName}</td>
                  <td>{item.client?.clientName}</td>
                  <td>
                    {item.requirements?.length > 38
                      ? item.requirements.slice(0,38) + "..."
                      : item.requirements}
                  </td>
                  <td><ApproachedIcon via={item.approachedVia} /></td>
                  <td>
                    {item.orderStartDateTime
                      ? new Date(item.orderStartDateTime).toLocaleString("en-GB", {
                          day: "2-digit", month: "short", year: "numeric",
                          hour: "2-digit", minute: "2-digit"
                        })
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
