import React from 'react';

const COLORS = {
  Food: 'bg-sky-500',
  'Weekly Khateeb Gifts': 'bg-emerald-500',
  Snacks: 'bg-violet-500',
};

export default function SpendingChart({ categoryTotals }) {
  const entries = Object.entries(categoryTotals);
  const highest = Math.max(...entries.map(([, amount]) => amount), 0);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Spending Breakdown</h2>
      <div className="space-y-4">
        {entries.map(([category, amount]) => {
          const widthPercent = highest > 0 ? (amount / highest) * 100 : 0;
          return (
            <div key={category}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700 dark:text-slate-200">{category}</span>
                <span className="text-slate-500 dark:text-slate-400">${amount.toFixed(2)}</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
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
