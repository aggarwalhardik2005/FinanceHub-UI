import React from "react";
import { useStore } from "../../store/useStore";
import { Shield, ShieldAlert, LayoutDashboard, ReceiptText, PieChart, Settings } from "lucide-react";
import { cn } from "../../utils/cn";
import { AnimatePresence, motion } from "framer-motion";

export default function DashboardLayout({ children }) {
  const { user, role, toggleRole, activeTab, setActiveTab } = useStore();

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Transactions", icon: ReceiptText },
    { name: "Analytics", icon: PieChart },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-200 selection:bg-primary-500/30">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-slate-800/60 bg-slate-900/40 backdrop-blur-xl md:flex">
        <div className="flex h-16 items-center px-6 border-b border-slate-800/60">
          <div 
            className="flex items-center gap-2 font-bold text-xl tracking-tight text-white cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => window.location.reload()}
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <span className="text-white text-lg">F</span>
            </div>
            Finance<span className="text-primary-400">Hub</span>
          </div>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                activeTab === item.name
                  ? "bg-primary-500/10 text-primary-400"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </button>
          ))}
        </nav>
        
        {/* User Card placeholder in Sidebar */}
        <div className="p-4 border-t border-slate-800/60">
          <div className="flex items-center gap-3 rounded-xl bg-slate-800/40 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500/20 text-primary-400 font-semibold border border-primary-500/30">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-white">{user.name}</p>
              <p className="truncate text-xs text-slate-400">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-800/60 bg-slate-900/40 px-6 backdrop-blur-xl shrink-0">
          <h1 
            className="text-xl font-semibold text-white md:hidden cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => window.location.reload()}
          >
            FinanceHub
          </h1>
          <div className="hidden md:block"></div> {/* Spacer */}
          
          <div className="flex items-center gap-4">
            {/* RBAC Toggle */}
            <div className="flex items-center gap-3 rounded-full border border-slate-700 bg-slate-800/50 p-1 pl-3 shadow-inner">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                {role === "admin" ? (
                  <ShieldAlert className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Shield className="h-4 w-4 text-slate-400" />
                )}
                <span className="hidden sm:inline-block font-medium">Role:</span>
              </div>
              <button
                onClick={toggleRole}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-900",
                  role === "admin" ? "bg-emerald-500" : "bg-slate-600"
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                    role === "admin" ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
              <span className="pr-3 text-xs font-semibold uppercase tracking-wider text-slate-400 min-w-[50px] text-center">
                {role}
              </span>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div id="scrollable-container" className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mx-auto max-w-7xl"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
