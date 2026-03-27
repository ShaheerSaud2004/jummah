import React from 'react';

function StatCard({ title, value, tone = 'default' }) {
  const toneClasses = {
    default: 'text-slate-900 dark:text-white',
    success: 'text-emerald-600 dark:text-emerald-300',
    danger: 'text-rose-600 dark:text-rose-300',
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700/70 dark:bg-slate-900/80">
      <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-slate-200/60 blur-xl dark:bg-slate-700/50" />
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{title}</p>
      <p className={`mt-2 text-3xl font-bold tracking-tight ${toneClasses[tone]}`}>{value}</p>
    </div>
  );
}

export default function Dashboard({ budget, totalExpenses, remainingBalance }) {
  const usedPercent = budget > 0 ? Math.min((totalExpenses / budget) * 100, 100) : 0;
  const progressTone =
    usedPercent < 70 ? 'bg-emerald-500' : usedPercent < 90 ? 'bg-amber-500' : 'bg-rose-500';

  return (
    <section className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Budget" value={`$${budget.toFixed(2)}`} />
        <StatCard title="Total Expenses" value={`$${totalExpenses.toFixed(2)}`} tone="danger" />
        <StatCard
          title="Remaining Balance"
          value={`$${remainingBalance.toFixed(2)}`}
          tone={remainingBalance >= 0 ? 'success' : 'danger'}
        />
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm dark:border-slate-700/70 dark:bg-slate-900/80">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Spending Progress</p>
          <p className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {usedPercent.toFixed(1)}% used
          </p>
        </div>
        <div className="h-3.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className={`h-full rounded-full ${progressTone} transition-all duration-500`}
            style={{ width: `${usedPercent}%` }}
          />
        </div>
      </div>
    </section>
  );
}
