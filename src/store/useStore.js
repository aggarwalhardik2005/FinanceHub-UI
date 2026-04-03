import { create } from "zustand";
import { initialTransactions } from "../utils/mockData";

export const useStore = create((set, get) => ({
  user: { name: "Hardik Aggarwal", email: "haggarwal_be22@thapar.edu" },
  role: "viewer", // 'viewer' | 'admin'
  activeTab: "Dashboard",
  transactions: initialTransactions,

  // Actions
  updateUser: (userData) => set((state) => ({ user: { ...state.user, ...userData } })),
  setActiveTab: (tab) => set({ activeTab: tab }),

  toggleRole: () =>
    set((state) => ({ role: state.role === "viewer" ? "admin" : "viewer" })),

  addTransaction: (newTx) =>
    set((state) => ({
      transactions: [newTx, ...state.transactions].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ),
    })),

  editTransaction: (id, updatedTx) =>
    set((state) => ({
      transactions: state.transactions.map((tx) =>
        tx.id === id ? { ...tx, ...updatedTx } : tx
      ).sort((a, b) => new Date(b.date) - new Date(a.date)),
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((tx) => tx.id !== id),
    })),

  // Derived state getters
  getSummaryStats: () => {
    const { transactions } = get();
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0);
    
    return {
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses,
    };
  },
}));
