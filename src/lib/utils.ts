import { Transaction, TransactionCategory } from "@/lib/mockData";

export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatShortDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const getMonthYear = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

export const computeSummary = (transactions: Transaction[]) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  return { income, expenses, balance: income - expenses };
};

export const getCategoryBreakdown = (transactions: Transaction[]) => {
  const expenses = transactions.filter((t) => t.type === "expense");
  const totals: Record<string, number> = {};
  expenses.forEach((t) => {
    totals[t.category] = (totals[t.category] || 0) + t.amount;
  });
  return Object.entries(totals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getMonthlyComparison = (transactions: Transaction[]) => {
  const monthly: Record<string, { income: number; expenses: number }> = {};
  transactions.forEach((t) => {
    const key = t.date.slice(0, 7);
    if (!monthly[key]) monthly[key] = { income: 0, expenses: 0 };
    if (t.type === "income") monthly[key].income += t.amount;
    else monthly[key].expenses += t.amount;
  });
  return Object.entries(monthly)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, vals]) => ({
      month: new Date(key + "-01").toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      }),
      ...vals,
      savings: vals.income - vals.expenses,
    }));
};

export const CATEGORIES: TransactionCategory[] = [
  "Food & Dining",
  "Shopping",
  "Transport",
  "Housing",
  "Entertainment",
  "Healthcare",
  "Education",
  "Salary",
  "Freelance",
  "Investment",
  "Utilities",
  "Travel",
];
