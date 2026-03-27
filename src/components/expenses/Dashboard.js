import React from 'react';

function StatCard({ title, value, tone = 'default' }) {
  const toneClasses = {
    default: 'text-slate-900 dark:text-slate-100',
    success: 'text-emerald-600 dark:text-emerald-400',
    danger: 'text-rose-600 dark:text-rose-400',
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
      <p className={`mt-2 text-2xl font-semibold ${toneClasses[tone]}`}>{value}</p>
    </div>
  );
}

export default function Dashboard({ budget, totalExpenses, remainingBalance }) {
  const usedPercent = budget > 0 ? Math.min((totalExpenses / budget) * 100, 100) : 0;
  const progressTone =
    usedPercent < 70 ? 'bg-emerald-500' : usedPercent < 90 ? 'bg-amber-500' : 'bg-rose-500';

  return (
    <section className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Budget" value={`$${budget.toFixed(2)}`} />
        <StatCard title="Total Expenses" value={`$${totalExpenses.toFixed(2)}`} tone="danger" />
        <StatCard
          title="Remaining Balance"
          value={`$${remainingBalance.toFixed(2)}`}
          tone={remainingBalance >= 0 ? 'success' : 'danger'}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Spending Progress</p>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{usedPercent.toFixed(1)}%</p>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className={`h-full rounded-full ${progressTone} transition-all duration-500`}
            style={{ width: `${usedPercent}%` }}
          />
        </div>
      </div>
    </section>
  );
}
