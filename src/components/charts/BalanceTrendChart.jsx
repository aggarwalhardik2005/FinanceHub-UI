import React, { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useStore } from "../../store/useStore";
import { format, subMonths, isAfter } from "date-fns";

export default function BalanceTrendChart() {
  const { transactions } = useStore();

  const data = useMemo(() => {
    // Generate last 6 months list
    const months = [];
    for (let i = 5; i >= 0; i--) {
      months.push(format(subMonths(new Date(), i), "MMM yyyy"));
    }

    // Initialize data map
    const monthlyData = months.reduce((acc, month) => {
      acc[month] = { name: month, balance: 0, income: 0, expense: 0 };
      return acc;
    }, {});

    // Calculate aggregated data
    const sixMonthsAgo = subMonths(new Date(), 6);
    transactions.forEach(tx => {
      const txDate = new Date(tx.date);
      if (isAfter(txDate, sixMonthsAgo)) {
        const monthKey = format(txDate, "MMM yyyy");
        if (monthlyData[monthKey]) {
          if (tx.type === "income") monthlyData[monthKey].income += tx.amount;
          if (tx.type === "expense") monthlyData[monthKey].expense += tx.amount;
        }
      }
    });

    // Calculate cumulative balance logically (simplified for chart visual)
    let cumulative = 0;
    return Object.values(monthlyData).map(m => {
      cumulative += (m.income - m.expense);
      return { ...m, balance: cumulative };
    });
  }, [transactions]);

  return (
    <div className="glass-card p-6 h-full min-h-[400px] flex flex-col">
      <h2 className="text-lg font-semibold text-white mb-6">Balance Trend (6 Months)</h2>
      <div className="flex-1 min-h-0 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dx={-10} tickFormatter={(v) => `$${v}`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }} 
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Area type="monotone" dataKey="balance" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
