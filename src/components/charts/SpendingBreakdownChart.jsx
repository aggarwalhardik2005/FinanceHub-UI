import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useStore } from "../../store/useStore";
import { PieChart as PieChartIcon } from "lucide-react";

const COLORS = ["#10b981", "#3b82f6", "#f43f5e", "#f59e0b", "#8b5cf6", "#14b8a6", "#ec4899"];

export default function SpendingBreakdownChart() {
  const { transactions } = useStore();

  const data = useMemo(() => {
    const expenses = transactions.filter(t => t.type === "expense");
    const categoryTotals = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

    return Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <div className="glass-card p-6 h-full min-h-[350px] flex flex-col">
      <div className="flex items-center gap-2 text-white mb-4">
        <PieChartIcon className="h-5 w-5 text-primary-400" />
        <h2 className="text-lg font-semibold">Spending Breakdown</h2>
      </div>
      
      {data.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-slate-500">
          No expenses recorded yet.
        </div>
      ) : (
        <div className="flex-1 min-h-[250px] relative w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)', color: '#fff' }} 
                itemStyle={{ color: '#e2e8f0' }}
                formatter={(value) => `$${value.toFixed(2)}`}
              />
              <Legend verticalAlign="bottom" height={72} iconType="circle" />
              <Pie
                data={data}
                innerRadius={65}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
