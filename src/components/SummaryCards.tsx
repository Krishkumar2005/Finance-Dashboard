"use client";
import { useAppStore } from "@/store/useAppStore";
import { computeSummary, formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function SummaryCards() {
  const { transactions } = useAppStore();
  const { income, expenses, balance } = computeSummary(transactions);
  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

  const cards = [
    {
      label: "Total Balance",
      value: formatCurrency(balance),
      change: "+12.5%",
      positive: true,
      icon: Wallet,
      accent: "var(--accent-blue)",
      bg: "rgba(61,127,255,0.08)",
    },
    {
      label: "Total Income",
      value: formatCurrency(income),
      change: "+8.2%",
      positive: true,
      icon: TrendingUp,
      accent: "var(--accent-green)",
      bg: "rgba(0,196,140,0.08)",
    },
    {
      label: "Total Expenses",
      value: formatCurrency(expenses),
      change: "-3.1%",
      positive: false,
      icon: TrendingDown,
      accent: "var(--accent-red)",
      bg: "rgba(255,71,87,0.08)",
    },
    {
      label: "Savings Rate",
      value: `${savingsRate.toFixed(1)}%`,
      change: "+2.4%",
      positive: true,
      icon: TrendingUp,
      accent: "var(--accent-amber)",
      bg: "rgba(255,184,0,0.08)",
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={card.label}
          className="stat-card animate-in"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="flex items-start justify-between">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: card.bg }}
            >
              <card.icon size={18} style={{ color: card.accent }} />
            </div>
            <span
              className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
              style={{
                background: card.positive ? "rgba(0,196,140,0.1)" : "rgba(255,71,87,0.1)",
                color: card.positive ? "var(--accent-green)" : "var(--accent-red)",
              }}
            >
              {card.positive ? (
                <ArrowUpRight size={11} />
              ) : (
                <ArrowDownRight size={11} />
              )}
              {card.change}
            </span>
          </div>
          <div>
            <p className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
              {card.label}
            </p>
            <p
              className="text-2xl font-bold mt-0.5"
              style={{ color: "var(--text-primary)", fontFamily: "'Syne', sans-serif" }}
            >
              {card.value}
            </p>
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            vs last month
          </p>
        </div>
      ))}
    </div>
  );
}
