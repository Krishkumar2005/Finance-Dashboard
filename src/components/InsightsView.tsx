"use client";
import { useMemo } from "react";
import { useAppStore } from "@/store/useAppStore";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";
import { getCategoryBreakdown, getMonthlyComparison, formatCurrency } from "@/lib/utils";
import { CATEGORY_COLORS } from "@/lib/mockData";
import { TrendingUp, TrendingDown, Award, AlertCircle, PiggyBank } from "lucide-react";
import AIInsightCards from "@/components/AIInsightCards";

const FALLBACK_COLORS = ["#3d7fff","#00c48c","#ff4757","#ffb800","#7c3aed","#ec4899","#f97316"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-3 py-2.5 rounded-xl text-sm"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-elevated)", fontFamily: "'DM Sans', sans-serif" }}
    >
      <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
};

export default function InsightsView() {
  const { transactions } = useAppStore();
  const categoryData = getCategoryBreakdown(transactions);
  const monthlyData = getMonthlyComparison(transactions);

  const insights = useMemo(() => {
    const topCategory = categoryData[0];
    const totalIncome = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100) : 0;

    const lastTwo = monthlyData.slice(-2);
    const expenseChange = lastTwo.length === 2
      ? ((lastTwo[1].expenses - lastTwo[0].expenses) / lastTwo[0].expenses * 100)
      : 0;

    const avgMonthlyExpense = monthlyData.length
      ? monthlyData.reduce((s, m) => s + m.expenses, 0) / monthlyData.length
      : 0;

    return { topCategory, savingsRate, expenseChange, avgMonthlyExpense, totalIncome, totalExpense };
  }, [transactions, categoryData, monthlyData]);

  const insightCards = [
    {
      icon: Award,
      label: "Top Spending Category",
      value: insights.topCategory?.name || "N/A",
      sub: insights.topCategory ? formatCurrency(insights.topCategory.value) + " total" : "No data",
      accent: "var(--accent-purple)",
      bg: "rgba(124,58,237,0.08)",
    },
    {
      icon: PiggyBank,
      label: "Savings Rate",
      value: `${insights.savingsRate.toFixed(1)}%`,
      sub: insights.savingsRate >= 20 ? "Great job! 🎉" : insights.savingsRate >= 10 ? "Doing okay" : "Room to improve",
      accent: "var(--accent-green)",
      bg: "rgba(0,196,140,0.08)",
    },
    {
      icon: insights.expenseChange >= 0 ? TrendingUp : TrendingDown,
      label: "Expense Change (MoM)",
      value: `${insights.expenseChange >= 0 ? "+" : ""}${insights.expenseChange.toFixed(1)}%`,
      sub: "vs previous month",
      accent: insights.expenseChange >= 0 ? "var(--accent-red)" : "var(--accent-green)",
      bg: insights.expenseChange >= 0 ? "rgba(255,71,87,0.08)" : "rgba(0,196,140,0.08)",
    },
    {
      icon: AlertCircle,
      label: "Avg Monthly Spend",
      value: formatCurrency(insights.avgMonthlyExpense),
      sub: "based on all recorded months",
      accent: "var(--accent-amber)",
      bg: "rgba(255,184,0,0.08)",
    },
  ];

  return (
    <div className="space-y-6">
      <AIInsightCards /> 
      {/* Insight Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {insightCards.map((card, i) => (
          <div
            key={card.label}
            className="stat-card animate-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: card.bg }}
            >
              <card.icon size={18} style={{ color: card.accent }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
                {card.label}
              </p>
              <p className="text-xl font-bold mt-0.5" style={{ color: "var(--text-primary)", fontFamily: "'Syne', sans-serif" }}>
                {card.value}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly comparison chart */}
      <div className="card p-6">
        <div className="mb-6">
          <h2 className="font-bold text-base" style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}>
            Monthly Comparison
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
            Income, expenses & savings per month
          </p>
        </div>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} barGap={4} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "var(--text-muted)", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--text-muted)", fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="income" fill="#00c48c" radius={[6, 6, 0, 0]} name="Income" />
              <Bar dataKey="expenses" fill="#ff4757" radius={[6, 6, 0, 0]} name="Expenses" />
              <Bar dataKey="savings" fill="#3d7fff" radius={[6, 6, 0, 0]} name="Savings" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-5 mt-4 justify-center">
          {[
            { color: "#00c48c", label: "Income" },
            { color: "#ff4757", label: "Expenses" },
            { color: "#3d7fff", label: "Savings" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ background: l.color }} />
              <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category bar chart */}
      <div className="card p-6">
        <div className="mb-6">
          <h2 className="font-bold text-base" style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}>
            Spending by Category
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>All-time breakdown</p>
        </div>
        {categoryData.length === 0 ? (
          <p className="text-center py-8" style={{ color: "var(--text-muted)" }}>No expense data</p>
        ) : (
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                layout="vertical"
                margin={{ top: 0, right: 20, left: 80, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--text-muted)", fontSize: 12 }}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                  width={80}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} name="Amount">
                  {categoryData.map((entry, i) => (
                    <Cell
                      key={entry.name}
                      fill={CATEGORY_COLORS[entry.name] || FALLBACK_COLORS[i % FALLBACK_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
