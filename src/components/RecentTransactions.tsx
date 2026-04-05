"use client";
import { useAppStore } from "@/store/useAppStore";
import { formatCurrency, formatShortDate } from "@/lib/utils";
import { CATEGORY_COLORS } from "@/lib/mockData";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const CATEGORY_ICONS: Record<string, string> = {
  "Food & Dining": "🍽️",
  Shopping: "🛍️",
  Transport: "🚗",
  Housing: "🏠",
  Entertainment: "🎬",
  Healthcare: "💊",
  Education: "📚",
  Salary: "💼",
  Freelance: "💻",
  Investment: "📈",
  Utilities: "⚡",
  Travel: "✈️",
};

export default function RecentTransactions() {
  const { transactions, setActiveTab } = useAppStore();
  const recent = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 7);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2
            className="font-bold text-base"
            style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}
          >
            Recent Transactions
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
            Latest activity
          </p>
        </div>
        <button
          onClick={() => setActiveTab("transactions")}
          className="text-xs font-semibold transition-opacity hover:opacity-70"
          style={{ color: "var(--accent-blue)", fontFamily: "'DM Sans', sans-serif" }}
        >
          View all →
        </button>
      </div>

      <div className="space-y-1">
        {recent.length === 0 ? (
          <p className="text-center py-8" style={{ color: "var(--text-muted)" }}>
            No transactions yet
          </p>
        ) : (
          recent.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-3 px-2 py-2.5 rounded-xl transition-all hover:scale-[1.005]"
              style={{ cursor: "default" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "var(--bg-primary)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "transparent")
              }
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                style={{
                  background: CATEGORY_COLORS[t.category]
                    ? `${CATEGORY_COLORS[t.category]}18`
                    : "var(--bg-primary)",
                }}
              >
                {CATEGORY_ICONS[t.category] || "💳"}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium truncate"
                  style={{ color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {t.description}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {formatShortDate(t.date)} · {t.category}
                </p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {t.type === "income" ? (
                  <ArrowUpRight size={13} style={{ color: "var(--accent-green)" }} />
                ) : (
                  <ArrowDownRight size={13} style={{ color: "var(--accent-red)" }} />
                )}
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: t.type === "income" ? "var(--accent-green)" : "var(--text-primary)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {t.type === "income" ? "+" : "-"}
                  {formatCurrency(t.amount)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
