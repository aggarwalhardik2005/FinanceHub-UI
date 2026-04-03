import React from "react";
import { cn } from "../../utils/cn";

export default function SummaryCard({ title, amount, icon: Icon, trend, trendLabel, lucideColor, bgGradient }) {
  const isPositive = trend.startsWith("+");
  return (
    <div className="glass-card flex flex-col p-6 interactive-hover">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-400">{title}</h3>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br", bgGradient)}>
          <Icon className={cn("h-5 w-5", lucideColor)} />
        </div>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-white">{amount}</span>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className={cn("font-medium", isPositive ? "text-emerald-400" : "text-rose-400")}>
          {trend}
        </span>
        <span className="text-slate-500">{trendLabel}</span>
      </div>
    </div>
  );
}
