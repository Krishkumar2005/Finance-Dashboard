"use client";
import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Transaction } from "@/lib/mockData";
import { CATEGORIES } from "@/lib/utils";
import { X } from "lucide-react";

interface Props {
  transaction?: Transaction | null;
  onClose: () => void;
}

export default function TransactionModal({ transaction, onClose }: Props) {
  const { addTransaction, editTransaction } = useAppStore();
  const isEdit = !!transaction;

  const [form, setForm] = useState({
    description: transaction?.description || "",
    amount: transaction?.amount?.toString() || "",
    category: transaction?.category || CATEGORIES[0],
    type: transaction?.type || "expense",
    date: transaction?.date || new Date().toISOString().slice(0, 10),
    merchant: transaction?.merchant || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      e.amount = "Valid positive amount required";
    if (!form.date) e.date = "Date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const data = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      category: form.category as Transaction["category"],
      type: form.type as Transaction["type"],
      date: form.date,
      merchant: form.merchant.trim(),
    };
    if (isEdit && transaction) {
      editTransaction(transaction.id, data);
    } else {
      addTransaction(data);
    }
    onClose();
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 animate-in"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-lg font-bold"
            style={{ fontFamily: "'Syne', sans-serif", color: "var(--text-primary)" }}
          >
            {isEdit ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center btn-ghost"
            style={{ padding: 0 }}
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Type toggle */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-muted)", fontFamily: "'Syne', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Type
            </label>
            <div className="flex gap-2">
              {(["expense", "income"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setForm((f) => ({ ...f, type: t }))}
                  className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background:
                      form.type === t
                        ? t === "income"
                          ? "rgba(0,196,140,0.15)"
                          : "rgba(255,71,87,0.15)"
                        : "var(--bg-primary)",
                    color:
                      form.type === t
                        ? t === "income"
                          ? "var(--accent-green)"
                          : "var(--accent-red)"
                        : "var(--text-muted)",
                    border: `1px solid ${form.type === t ? (t === "income" ? "var(--accent-green)" : "var(--accent-red)") : "var(--border)"}`,
                  }}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-muted)", fontFamily: "'Syne', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Description
            </label>
            <input
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="e.g. Grocery shopping"
              className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                background: "var(--bg-primary)",
                border: `1px solid ${errors.description ? "var(--accent-red)" : "var(--border)"}`,
                color: "var(--text-primary)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            {errors.description && (
              <p className="text-xs mt-1" style={{ color: "var(--accent-red)" }}>{errors.description}</p>
            )}
          </div>

          {/* Amount + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-muted)", fontFamily: "'Syne', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Amount ($)
              </label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{
                  background: "var(--bg-primary)",
                  border: `1px solid ${errors.amount ? "var(--accent-red)" : "var(--border)"}`,
                  color: "var(--text-primary)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
              {errors.amount && (
                <p className="text-xs mt-1" style={{ color: "var(--accent-red)" }}>{errors.amount}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-muted)", fontFamily: "'Syne', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{
                  background: "var(--bg-primary)",
                  border: `1px solid ${errors.date ? "var(--accent-red)" : "var(--border)"}`,
                  color: "var(--text-primary)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-muted)", fontFamily: "'Syne', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as any }))}
              className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
              style={{
                background: "var(--bg-primary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Merchant */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-muted)", fontFamily: "'Syne', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Merchant (optional)
            </label>
            <input
              value={form.merchant}
              onChange={(e) => setForm((f) => ({ ...f, merchant: e.target.value }))}
              placeholder="e.g. Amazon"
              className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
              style={{
                background: "var(--bg-primary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="btn-ghost flex-1">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn-primary flex-1">
            {isEdit ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}
