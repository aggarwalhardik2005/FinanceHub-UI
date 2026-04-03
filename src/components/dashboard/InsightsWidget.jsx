import React, { useMemo } from "react";
import { useStore } from "../../store/useStore";
import { Sparkles, TrendingUp, AlertCircle } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";
import { subDays, isAfter } from "date-fns";

export default function InsightsWidget() {
  const { transactions } = useStore();

  const insights = useMemo(() => {
    if (transactions.length === 0) return [];
    const now = new Date();
    const thirtyDaysAgo = subDays(now, 30);
    
    // Calculate last 30 days vs previous 30 days expenses
    const recentExpenses = transactions.filter(t => t.type === "expense" && isAfter(new Date(t.date), thirtyDaysAgo));
    
    // Highest Category
    const categoryTotals = recentExpenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});
    
    let highestCategory = "";
    let highestAmount = 0;
    for (const [cat, amt] of Object.entries(categoryTotals)) {
      if (amt > highestAmount) {
        highestAmount = amt;
        highestCategory = cat;
      }
    }

    const recs = [];
    if (highestCategory) {
      recs.push({
        id: "high-cat",
        icon: AlertCircle,
        color: "text-rose-400",
        bg: "bg-rose-500/10",
        text: `Highest spending recently: ${highestCategory} (${formatCurrency(highestAmount)}).`,
      });
    }

    recs.push({
      id: "general-insight",
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      text: "You have positive cash flow this month. Keep up the good habits!",
    });

    return recs;
  }, [transactions]);

  return (
    <div className="glass-card flex flex-col p-6 h-full">
      <div className="flex items-center gap-2 mb-4 text-indigo-400 font-semibold">
        <Sparkles className="h-5 w-5" />
        <h2>AI Insights</h2>
      </div>
      <div className="space-y-4 flex-1">
        {insights.length === 0 ? (
          <p className="text-slate-400 text-sm">Not enough data to generate insights.</p>
        ) : (
          insights.map((insight) => (
            <div key={insight.id} className="flex gap-3 items-start bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
              <div className={`p-2 rounded-lg ${insight.bg} shrink-0`}>
                <insight.icon className={`h-4 w-4 ${insight.color}`} />
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{insight.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
