"use client";
import { useTheme } from "next-themes";
import { useAppStore } from "@/store/useAppStore";
import { Sun, Moon, Bell, Download } from "lucide-react";
import { useEffect, useState } from "react";

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: "Dashboard", subtitle: "Your financial overview at a glance" },
  transactions: { title: "Transactions", subtitle: "All your financial activity" },
  insights: { title: "Insights", subtitle: "Patterns and observations from your data" },
};

export default function Topbar() {
  const { theme, setTheme } = useTheme();
  const { activeTab, transactions, role } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { title, subtitle } = PAGE_TITLES[activeTab] || PAGE_TITLES.dashboard;

  const handleExport = () => {
    const csv = [
      ["Date", "Description", "Category", "Type", "Amount"],
      ...transactions.map((t) => [
        t.date,
        t.description,
        t.category,
        t.type,
        t.amount.toString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  return (
    <header
      className="flex items-center justify-between px-8 py-5 border-b"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      <div>
        <h1
          className="font-bold text-xl leading-tight"
          style={{
            fontFamily: "'Syne', sans-serif",
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {role === "admin" && (
          <button
            onClick={handleExport}
            className="btn-ghost flex items-center gap-2"
          >
            <Download size={14} />
            Export CSV
          </button>
        )}

        <button
          className="relative w-9 h-9 rounded-lg flex items-center justify-center transition-all btn-ghost"
          style={{ padding: 0 }}
        >
          <Bell size={16} />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--accent-red)" }}
          />
        </button>

        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 rounded-lg flex items-center justify-center btn-ghost"
            style={{ padding: 0 }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        )}
      </div>
    </header>
  );
}
