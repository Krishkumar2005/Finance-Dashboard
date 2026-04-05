"use client";
import { useState, useMemo } from "react";
import { useAppStore } from "@/store/useAppStore";
import { formatCurrency, formatDate, CATEGORIES } from "@/lib/utils";
import { CATEGORY_COLORS } from "@/lib/mockData";
import TransactionModal from "@/components/TransactionModal";
import { Transaction } from "@/lib/mockData";
import {
  Search,
  Plus,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Pencil,
  Trash2,
  Filter,
  X,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, string> = {
  "Food & Dining": "🍽️", Shopping: "🛍️", Transport: "🚗",
  Housing: "🏠", Entertainment: "🎬", Healthcare: "💊",
  Education: "📚", Salary: "💼", Freelance: "💻",
  Investment: "📈", Utilities: "⚡", Travel: "✈️",
};

export default function TransactionsList() {
  const {
    transactions, deleteTransaction, role,
    filters, setFilter, resetFilters,
    sortField, sortDirection, setSort,
  } = useAppStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTx, setEditTx] = useState<Transaction | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...transactions];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.merchant?.toLowerCase().includes(q)
      );
    }
    if (filters.type !== "all") list = list.filter((t) => t.type === filters.type);
    if (filters.category) list = list.filter((t) => t.category === filters.category);
    if (filters.dateFrom) list = list.filter((t) => t.date >= filters.dateFrom);
    if (filters.dateTo) list = list.filter((t) => t.date <= filters.dateTo);

    list.sort((a, b) => {
      let cmp = 0;
      if (sortField === "date") cmp = a.date.localeCompare(b.date);
      else if (sortField === "amount") cmp = a.amount - b.amount;
      else if (sortField === "category") cmp = a.category.localeCompare(b.category);
      else if (sortField === "type") cmp = a.type.localeCompare(b.type);
      return sortDirection === "asc" ? cmp : -cmp;
    });
    return list;
  }, [transactions, filters, sortField, sortDirection]);

  const hasActiveFilters =
    filters.search || filters.type !== "all" || filters.category || filters.dateFrom || filters.dateTo;

  const SortIcon = ({ field }: { field: typeof sortField }) => {
    if (sortField !== field) return <ArrowUpDown size={13} style={{ color: "var(--text-muted)" }} />;
    return sortDirection === "asc"
      ? <ArrowUp size={13} style={{ color: "var(--accent-blue)" }} />
      : <ArrowDown size={13} style={{ color: "var(--accent-blue)" }} />;
  };

  return (
    <>
      <div className="card">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 max-w-sm"
              style={{ background: "var(--bg-primary)", border: "1px solid var(--border)" }}
            >
              <Search size={14} style={{ color: "var(--text-muted)" }} />
              <input
                value={filters.search}
                onChange={(e) => setFilter("search", e.target.value)}
                placeholder="Search transactions…"
                className="bg-transparent outline-none text-sm flex-1"
                style={{ color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}
              />
              {filters.search && (
                <button onClick={() => setFilter("search", "")}>
                  <X size={12} style={{ color: "var(--text-muted)" }} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn-ghost flex items-center gap-2 relative ${hasActiveFilters ? "border-blue-400" : ""}`}
            >
              <Filter size={14} />
              Filters
              {hasActiveFilters && (
                <span
                  className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                  style={{ background: "var(--accent-blue)" }}
                />
              )}
            </button>
            {hasActiveFilters && (
              <button onClick={resetFilters} className="text-xs" style={{ color: "var(--accent-red)", fontFamily: "'DM Sans', sans-serif" }}>
                Clear all
              </button>
            )}
          </div>
          {role === "admin" && (
            <button
              onClick={() => { setEditTx(null); setModalOpen(true); }}
              className="btn-primary flex items-center gap-2 ml-3 flex-shrink-0"
            >
              <Plus size={14} />
              Add
            </button>
          )}
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div
            className="px-6 py-4 border-b flex flex-wrap gap-3"
            style={{ borderColor: "var(--border)", background: "var(--bg-primary)" }}
          >
            <select
              value={filters.type}
              onChange={(e) => setFilter("type", e.target.value as any)}
              className="px-3 py-2 rounded-xl text-sm outline-none"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <select
              value={filters.category}
              onChange={(e) => setFilter("category", e.target.value)}
              className="px-3 py-2 rounded-xl text-sm outline-none"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilter("dateFrom", e.target.value)}
              className="px-3 py-2 rounded-xl text-sm outline-none"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}
            />
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilter("dateTo", e.target.value)}
              className="px-3 py-2 rounded-xl text-sm outline-none"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>
        )}

        {/* Table Header */}
        <div
          className="grid px-6 py-3 text-xs font-semibold uppercase tracking-wider"
          style={{
            gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
            color: "var(--text-muted)",
            fontFamily: "'Syne', sans-serif",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <button className="flex items-center gap-1.5 text-left" onClick={() => setSort("date")}>
            Date <SortIcon field="date" />
          </button>
          <button className="flex items-center gap-1.5" onClick={() => setSort("category")}>
            Category <SortIcon field="category" />
          </button>
          <button className="flex items-center gap-1.5" onClick={() => setSort("type")}>
            Type <SortIcon field="type" />
          </button>
          <button className="flex items-center gap-1.5 justify-end" onClick={() => setSort("amount")}>
            Amount <SortIcon field="amount" />
          </button>
          {role === "admin" && <span />}
        </div>

        {/* Rows */}
        <div style={{ maxHeight: 520, overflowY: "auto" }}>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <span style={{ fontSize: 40 }}>🔍</span>
              <p className="font-semibold" style={{ color: "var(--text-secondary)", fontFamily: "'Syne', sans-serif" }}>
                No transactions found
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Try adjusting your filters
              </p>
              {hasActiveFilters && (
                <button onClick={resetFilters} className="btn-ghost mt-1">Clear filters</button>
              )}
            </div>
          ) : (
            filtered.map((t) => (
              <div
                key={t.id}
                className="grid px-6 py-3.5 items-center transition-all"
                style={{
                  gridTemplateColumns: role === "admin" ? "2fr 1fr 1fr 1fr auto" : "2fr 1fr 1fr 1fr",
                  borderBottom: "1px solid var(--border)",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg-primary)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                <div className="flex items-center gap-3 min-w-0">
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
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
                      {t.description}
                    </p>
                    <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                      {formatDate(t.date)}{t.merchant ? ` · ${t.merchant}` : ""}
                    </p>
                  </div>
                </div>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full w-fit"
                  style={{
                    background: CATEGORY_COLORS[t.category]
                      ? `${CATEGORY_COLORS[t.category]}18`
                      : "var(--bg-primary)",
                    color: CATEGORY_COLORS[t.category] || "var(--text-secondary)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {t.category}
                </span>
                <span className={t.type === "income" ? "badge-income w-fit" : "badge-expense w-fit"}>
                  {t.type}
                </span>
                <span
                  className="text-sm font-semibold text-right"
                  style={{
                    color: t.type === "income" ? "var(--accent-green)" : "var(--text-primary)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {t.type === "income" ? "+" : "-"}
                  {formatCurrency(t.amount)}
                </span>
                {role === "admin" && (
                  <div className="flex items-center gap-1 justify-end pl-2">
                    <button
                      onClick={() => { setEditTx(t); setModalOpen(true); }}
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-blue-100 dark:hover:bg-blue-900"
                      title="Edit"
                    >
                      <Pencil size={13} style={{ color: "var(--accent-blue)" }} />
                    </button>
                    <button
                      onClick={() => deleteTransaction(t.id)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-red-100 dark:hover:bg-red-900"
                      title="Delete"
                    >
                      <Trash2 size={13} style={{ color: "var(--accent-red)" }} />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 flex items-center justify-between border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
            {filtered.length} of {transactions.length} transactions
          </p>
        </div>
      </div>

      {modalOpen && (
        <TransactionModal
          transaction={editTx}
          onClose={() => { setModalOpen(false); setEditTx(null); }}
        />
      )}
    </>
  );
}
