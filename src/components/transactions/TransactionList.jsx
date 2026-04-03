import React, { useState, useMemo } from "react";
import { useStore } from "../../store/useStore";
import { formatCurrency, formatShortDate } from "../../utils/formatters";
import { Plus, Search, Filter, ArrowUpDown, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import TransactionModal from "./TransactionModal";
import EmptyState from "../ui/EmptyState";
import { cn } from "../../utils/cn";

export default function TransactionList() {
  const { transactions, role, deleteTransaction } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  // Extract unique categories for filter dropdown
  const categories = useMemo(() => {
    return ["All", ...new Set(transactions.map((t) => t.category))].sort();
  }, [transactions]);

  // Derived filtered & sorted transactions
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        const matchesSearch = t.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterCategory === "All" || t.category === filterCategory;
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      });
  }, [transactions, searchTerm, filterCategory, sortOrder]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleEdit = (tx) => {
    setEditingTx(tx);
    setIsModalOpen(true);
  };

  const openNew = () => {
    setEditingTx(null);
    setIsModalOpen(true);
  };

  return (
    <div className="glass-card flex flex-col p-6 animate-in slide-in-from-bottom-2 duration-500">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-white tracking-tight">Recent Transactions</h2>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search category..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none w-[160px] md:w-[220px] transition-all"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <select
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 pr-8 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-200 focus:ring-2 focus:ring-primary-500 outline-none appearance-none cursor-pointer"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <button
            onClick={() => {
              setSortOrder(prev => prev === "desc" ? "asc" : "desc");
              setCurrentPage(1);
            }}
            className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:border-slate-500 transition-colors tooltip"
            title="Sort by Date"
          >
            <ArrowUpDown className="h-5 w-5" />
          </button>

          {role === "admin" && (
            <button
              onClick={openNew}
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-primary-500/20"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline-block">Add New</span>
            </button>
          )}
        </div>
      </div>

      {/* List Area */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
        {filteredTransactions.length === 0 ? (
          <EmptyState />
        ) : (
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-800/80 text-xs uppercase text-slate-300">
              <tr>
                <th scope="col" className="px-6 py-4 rounded-tl-xl">Date</th>
                <th scope="col" className="px-6 py-4">Category</th>
                <th scope="col" className="px-6 py-4">Type</th>
                <th scope="col" className="px-6 py-4 font-semibold text-right">Amount</th>
                {role === "admin" && <th scope="col" className="px-6 py-4 text-right rounded-tr-xl">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {paginatedTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-200">
                    {formatShortDate(tx.date)}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                      {tx.category.charAt(0)}
                    </div>
                    <span className="text-slate-300">{tx.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider",
                      tx.type === "income" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    )}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-slate-200">
                    <span className={tx.type === "income" ? "text-emerald-400" : "text-white"}>
                      {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
                    </span>
                  </td>
                  {role === "admin" && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(tx)} className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-md transition-colors">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => deleteTransaction(tx.id)} className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-md transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm text-slate-400">
          <div>
            Showing <span className="text-white font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="text-white font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredTransactions.length)}</span> of <span className="text-white font-medium">{filteredTransactions.length}</span> results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center font-medium transition-colors",
                    currentPage === i + 1 ? "bg-primary-600 text-white shadow-lg shadow-primary-500/20" : "hover:bg-slate-800 text-slate-400"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <TransactionModal
          isOpen={isModalOpen}
          initialData={editingTx}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
