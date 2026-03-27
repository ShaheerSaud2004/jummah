import React, { useMemo } from 'react';

const CATEGORY_COLORS = {
  Food: '#0ea5e9',
  'Weekly Khateeb Gifts': '#10b981',
  Snacks: '#8b5cf6',
};

export default function ExpensePieChart({ categoryTotals, title = 'Category Split' }) {
  const chartData = useMemo(() => {
    const entries = Object.entries(categoryTotals).filter(([, amount]) => amount > 0);
    const total = entries.reduce((sum, [, amount]) => sum + amount, 0);

    if (total === 0) {
      return { segments: [], total: 0, gradient: 'conic-gradient(#cbd5e1 0deg 360deg)' };
    }

    let current = 0;
    const segments = entries.map(([name, amount]) => {
      const degrees = (amount / total) * 360;
      const start = current;
      const end = current + degrees;
      current = end;
      return {
        name,
        amount,
        percent: (amount / total) * 100,
        color: CATEGORY_COLORS[name] || '#64748b',
        start,
        end,
      };
    });

    const gradient = `conic-gradient(${segments
      .map((segment) => `${segment.color} ${segment.start}deg ${segment.end}deg`)
      .join(', ')})`;

    return { segments, total, gradient };
  }, [categoryTotals]);

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-sm sm:p-5 dark:border-slate-700/70 dark:bg-slate-900/80">
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
      <div className="grid items-center gap-4 md:grid-cols-[minmax(0,180px)_minmax(0,1fr)]">
        <div className="mx-auto w-full max-w-[180px]">
          <div
            className="mx-auto aspect-square w-[min(100%,10rem)] rounded-full border-[6px] border-white shadow-sm sm:w-[min(100%,11rem)] sm:border-8 dark:border-slate-900"
            style={{ background: chartData.gradient }}
          />
          <p className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
            Total: ${chartData.total.toFixed(2)}
          </p>
        </div>

        <div className="min-w-0 space-y-2">
          {chartData.segments.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">No spending data yet.</p>
          ) : (
            chartData.segments.map((segment) => (
              <div key={segment.name} className="flex flex-col gap-1 rounded-xl bg-slate-50 px-3 py-2 sm:flex-row sm:items-center sm:justify-between dark:bg-slate-800">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                    {segment.name}
                  </span>
                </div>
                <div className="text-left text-sm sm:text-right">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">${segment.amount.toFixed(2)}</p>
                  <p className="text-slate-500 dark:text-slate-400">{segment.percent.toFixed(1)}%</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
