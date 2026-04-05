import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Transaction, TRANSACTIONS } from "@/lib/mockData";

export type Role = "viewer" | "admin";
export type ActiveTab = "dashboard" | "transactions" | "insights";
export type SortField = "date" | "amount" | "category" | "type";
export type SortDirection = "asc" | "desc";

interface FilterState {
  search: string;
  type: "all" | "income" | "expense";
  category: string;
  dateFrom: string;
  dateTo: string;
}

interface AppState {
  // Role
  role: Role;
  setRole: (role: Role) => void;

  // Navigation
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Transactions
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id">) => void;
  editTransaction: (id: string, t: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;

  // Filters
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;

  // Sort
  sortField: SortField;
  sortDirection: SortDirection;
  setSort: (field: SortField) => void;
}

const defaultFilters: FilterState = {
  search: "",
  type: "all",
  category: "",
  dateFrom: "",
  dateTo: "",
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      role: "admin",
      setRole: (role) => set({ role }),

      activeTab: "dashboard",
      setActiveTab: (tab) => set({ activeTab: tab }),

      transactions: TRANSACTIONS,
      addTransaction: (t) =>
        set((s) => ({
          transactions: [
            { ...t, id: `t${Date.now()}` },
            ...s.transactions,
          ],
        })),
      editTransaction: (id, t) =>
        set((s) => ({
          transactions: s.transactions.map((tx) =>
            tx.id === id ? { ...tx, ...t } : tx
          ),
        })),
      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((tx) => tx.id !== id),
        })),

      filters: defaultFilters,
      setFilter: (key, value) =>
        set((s) => ({ filters: { ...s.filters, [key]: value } })),
      resetFilters: () => set({ filters: defaultFilters }),

      sortField: "date",
      sortDirection: "desc",
      setSort: (field) =>
        set((s) => ({
          sortField: field,
          sortDirection:
            s.sortField === field && s.sortDirection === "desc" ? "asc" : "desc",
        })),
    }),
    {
      name: "finance-dashboard-store",
      partialize: (state) => ({
        role: state.role,
        transactions: state.transactions,
      }),
    }
  )
);
