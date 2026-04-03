import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useStore } from "../../store/useStore";
import { cn } from "../../utils/cn";

export default function TransactionModal({ isOpen, onClose, initialData }) {
  const { addTransaction, editTransaction } = useStore();
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    type: "expense",
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        amount: initialData.amount,
        category: initialData.category,
        type: initialData.type,
        date: new Date(initialData.date).toISOString().slice(0, 10),
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category || !formData.date) return;

    const payload = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date).toISOString(),
    };

    if (initialData) {
      editTransaction(initialData.id, payload);
    } else {
      addTransaction({ ...payload, id: `tx-${Date.now()}` });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-card w-full max-w-md p-6 relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold text-white mb-6">
          {initialData ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3 mb-2">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "income" })}
              className={cn(
                "py-2 px-4 rounded-xl text-sm font-medium transition-colors border",
                formData.type === "income"
                  ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                  : "bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800"
              )}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "expense" })}
              className={cn(
                "py-2 px-4 rounded-xl text-sm font-medium transition-colors border",
                formData.type === "expense"
                  ? "bg-rose-500/20 border-rose-500/50 text-rose-400"
                  : "bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800"
              )}
            >
              Expense
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Amount ($)</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-slate-600"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Category</label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-slate-600"
              placeholder="e.g. Housing, Food, Salary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Date</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all icon-light"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-primary-600 hover:bg-primary-500 shadow-lg shadow-primary-500/30 transition-all hover:scale-105 active:scale-95"
            >
              {initialData ? "Save Changes" : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
