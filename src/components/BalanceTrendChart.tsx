"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { MONTHLY_TREND } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-4 py-3 rounded-xl"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-elevated)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <p className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
        {label}
      </p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="text-sm" style={{ color: p.color }}>
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
};

export default function BalanceTrendChart() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === "dark";

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="font-bold text-base"
            style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}
          >
            Balance Trend
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
            6-month income vs expenses
          </p>
        </div>
        <span
          className="text-xs px-3 py-1 rounded-full font-medium"
          style={{
            background: "rgba(0,196,140,0.1)",
            color: "var(--accent-green)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Last 6 months
        </span>
      </div>
      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MONTHLY_TREND} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00c48c" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#00c48c" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff4757" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#ff4757" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#00c48c"
              strokeWidth={2.5}
              fill="url(#incomeGrad)"
              name="Income"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#ff4757"
              strokeWidth={2.5}
              fill="url(#expenseGrad)"
              name="Expenses"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
