import React from 'react';

const COLORS = {
  Food: 'bg-sky-500',
  'Weekly Khateeb Gifts': 'bg-emerald-500',
  Snacks: 'bg-violet-500',
};

export default function SpendingChart({ categoryTotals }) {
  const entries = Object.entries(categoryTotals);
  const total = entries.reduce((sum, [, amount]) => sum + amount, 0);

  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm dark:border-slate-700/70 dark:bg-slate-900/80">
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Spending Breakdown</h2>
      <div className="space-y-4">
        {entries.map(([category, amount]) => {
          const widthPercent = total > 0 ? (amount / total) * 100 : 0;
          return (
            <div key={category}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700 dark:text-slate-200">{category}</span>
                <span className="text-slate-500 dark:text-slate-400">
                  ${amount.toFixed(2)} ({widthPercent.toFixed(1)}%)
                </span>
              </div>
              <div className="h-3.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div
                  className={`h-full rounded-full ${COLORS[category] || 'bg-slate-500'} transition-all duration-500`}
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
