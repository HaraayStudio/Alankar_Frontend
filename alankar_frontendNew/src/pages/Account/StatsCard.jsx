// src/components/DashboardStatCard.jsx
import React from "react";
import styles from "./DashboardStatCard.module.scss";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronDown } from "lucide-react";

export default function DashboardStatCard({
  title,
  value,
  data,
  dataKey = "value",
  xKey = "label",
  growth = "+10%",
  gradientColor = "#2674e0",
  accent = "#e8f0fe",
  periodLabel = "Weekly",
}) {
  return (
    <div className={styles.statCard}>
      <div className={styles.topRow}>
        <span className={styles.title}>{title}</span>
        <span className={styles.periodBtn}>
          {periodLabel} <ChevronDown size={15} />
        </span>
      </div>
      <div className={styles.valueRow}>
        <span className={styles.value}>{value}</span>
        <span className={styles.growth}>{growth}</span>
      </div>
      <ResponsiveContainer width="100%" height={140}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor={gradientColor} stopOpacity={0.7} />
              <stop offset="90%" stopColor={accent} stopOpacity={0.15} />
            </linearGradient>
          </defs>
          <YAxis
            axisLine={false}
            tickLine={false}
            width={32}
            tick={{ fontSize: 13, fill: "#b4bcd0" }}
            domain={[0, 750]}
          />
          <XAxis
            dataKey={xKey}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 13, fill: "#b4bcd0" }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "none",
              boxShadow: "0 2px 8px rgba(60,110,240,0.10)",
            }}
            labelStyle={{ fontWeight: 600, color: "#344266" }}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={gradientColor}
            strokeWidth={2.5}
            fill={`url(#gradient-${title})`}
            activeDot={{ r: 6 }}
            dot={{ r: 3 }}
            animationDuration={700}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
