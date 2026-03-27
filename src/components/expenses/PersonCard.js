import React from 'react';

export default function PersonCard({ personName, expenses, total, isOpen, onToggle }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <div>
          <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{personName}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{expenses.length} expense(s)</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-base font-semibold text-emerald-600 dark:text-emerald-400">${total.toFixed(2)}</p>
          <span className="text-slate-500 dark:text-slate-400">{isOpen ? '−' : '+'}</span>
        </div>
      </button>

      {isOpen ? (
        <div className="mt-3 space-y-2 border-t border-slate-200 pt-3 dark:border-slate-700">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800">
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
