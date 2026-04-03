import React from "react";
import DashboardLayout from "./components/layout/DashboardLayout";
import SummaryCard from "./components/dashboard/SummaryCard";
import InsightsWidget from "./components/dashboard/InsightsWidget";
import BalanceTrendChart from "./components/charts/BalanceTrendChart";
import SpendingBreakdownChart from "./components/charts/SpendingBreakdownChart";
import TransactionList from "./components/transactions/TransactionList";
import SettingsView from "./components/settings/SettingsView";
import AnimatedSection from "./components/common/AnimatedSection";
import { useStore } from "./store/useStore";
import { formatCurrency } from "./utils/formatters";
import { Wallet, TrendingUp, TrendingDown, Settings } from "lucide-react";

export default function App() {
  const { getSummaryStats, activeTab } = useStore();
  const { totalIncome, totalExpenses, balance } = getSummaryStats();

  const renderContent = () => {
    switch (activeTab) {
      case "Transactions":
        return (
          <div>
            <div className="mb-8 pl-1">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-gradient">
                Transactions
              </h2>
              <p className="mt-2 text-slate-400">
                View and manage your recent financial activity.
              </p>
            </div>
            <AnimatedSection delay={0.1}>
              <TransactionList />
            </AnimatedSection>
          </div>
        );
      case "Analytics":
        return (
          <div>
            <div className="mb-8 pl-1">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-gradient">
                Analytics & Insights
              </h2>
              <p className="mt-2 text-slate-400">
                Deep dive into your spending patterns and trends.
              </p>
            </div>
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-6">
              <AnimatedSection delay={0.1}><BalanceTrendChart /></AnimatedSection>
              <AnimatedSection delay={0.2}><SpendingBreakdownChart /></AnimatedSection>
            </div>
            <AnimatedSection delay={0.3}><InsightsWidget /></AnimatedSection>
          </div>
        );
      case "Settings":
        return <SettingsView />;
      case "Dashboard":
      default:
        return (
          <div>
            <div className="mb-8 pl-1">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-gradient">
                Financial Overview
              </h2>
              <p className="mt-2 text-slate-400">
                Monitor your spending, analyze trends, and manage your goals securely.
              </p>
            </div>

            {/* Summary Cards */}
            <div className="mb-8 grid gap-4 grid-cols-1 sm:grid-cols-3">
              <AnimatedSection delay={0}>
                <SummaryCard
                  title="Total Balance"
                  amount={formatCurrency(balance)}
                  icon={Wallet}
                  trend="+2.5%"
                  trendLabel="vs last month"
                  lucideColor="text-indigo-400"
                  bgGradient="from-indigo-500/10 to-indigo-500/5"
                />
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <SummaryCard
                  title="Total Income"
                  amount={formatCurrency(totalIncome)}
                  icon={TrendingUp}
                  trend="+12%"
                  trendLabel="vs last month"
                  lucideColor="text-emerald-400"
                  bgGradient="from-emerald-500/10 to-emerald-500/5"
                />
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <SummaryCard
                  title="Total Expenses"
                  amount={formatCurrency(totalExpenses)}
                  icon={TrendingDown}
                  trend="-4%"
                  trendLabel="vs last month"
                  lucideColor="text-rose-400"
                  bgGradient="from-rose-500/10 to-rose-500/5"
                />
              </AnimatedSection>
            </div>

            {/* Dashboard Middle Section (Charts) */}
            <div className="mb-8 grid gap-6 grid-cols-1 lg:grid-cols-3">
              <AnimatedSection delay={0.3} className="lg:col-span-2">
                <BalanceTrendChart />
              </AnimatedSection>
              <AnimatedSection delay={0.4} className="flex flex-col gap-6">
                <SpendingBreakdownChart />
              </AnimatedSection>
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      {renderContent()}
    </DashboardLayout>
  );
}
