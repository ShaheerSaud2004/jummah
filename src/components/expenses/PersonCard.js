import React from 'react';

export default function PersonCard({ personName, expenses, total, isOpen, onToggle }) {
  const initials = personName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700/70 dark:bg-slate-900/80">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 text-xs font-bold text-white">
            {initials}
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{personName}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{expenses.length} expense(s)</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">${total.toFixed(2)}</p>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
            {isOpen ? '−' : '+'}
          </span>
        </div>
      </button>

      {isOpen ? (
        <div className="mt-3 space-y-2 border-t border-slate-200 pt-3 dark:border-slate-700">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 dark:bg-slate-800">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{expense.category}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{expense.note || 'No note'}</p>
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">${expense.amount.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
