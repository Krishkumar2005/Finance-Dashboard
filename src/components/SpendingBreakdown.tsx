"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useAppStore } from "@/store/useAppStore";
import { getCategoryBreakdown } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { CATEGORY_COLORS } from "@/lib/mockData";

const FALLBACK_COLORS = [
  "#3d7fff", "#00c48c", "#ff4757", "#ffb800", "#7c3aed",
  "#ec4899", "#06b6d4", "#f97316", "#10b981", "#6366f1",
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-3 py-2 rounded-xl text-sm"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-elevated)",
        fontFamily: "'DM Sans', sans-serif",
        color: "var(--text-primary)",
      }}
    >
      <p className="font-semibold">{payload[0].name}</p>
      <p style={{ color: "var(--text-muted)" }}>{formatCurrency(payload[0].value)}</p>
    </div>
  );
};

export default function SpendingBreakdown() {
  const { transactions } = useAppStore();
  const data = getCategoryBreakdown(transactions).slice(0, 7);
  const total = data.reduce((s, d) => s + d.value, 0);

  if (data.length === 0) {
    return (
      <div className="card p-6 flex items-center justify-center" style={{ minHeight: 350 }}>
        <p style={{ color: "var(--text-muted)" }}>No expense data available</p>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h2
          className="font-bold text-base"
          style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}
        >
          Spending Breakdown
        </h2>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
          By category (all time)
        </p>
      </div>

      <div style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, i) => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name] || FALLBACK_COLORS[i % FALLBACK_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {data.slice(0, 5).map((item, i) => {
          const color = CATEGORY_COLORS[item.name] || FALLBACK_COLORS[i];
          const pct = ((item.value / total) * 100).toFixed(1);
          return (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                <span className="text-sm" style={{ color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif" }}>
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="h-1.5 rounded-full"
                  style={{ width: 60, background: "var(--border)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
                <span className="text-xs font-medium w-10 text-right" style={{ color: "var(--text-muted)" }}>
                  {pct}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
