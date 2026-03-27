import React from 'react';

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString();
}

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-sm sm:p-5 dark:border-slate-700/70 dark:bg-slate-900/80">
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Expense List</h2>

      {expenses.length === 0 ? (
        <p className="rounded-2xl bg-slate-50 py-8 text-center text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          No expenses yet. Add one to get started.
        </p>
      ) : null}

      <div className="space-y-3 sm:hidden">
        {expenses.map((expense) => (
          <article key={expense.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{expense.person}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{formatDate(expense.createdAt)}</p>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">${expense.amount.toFixed(2)}</p>
            </div>
            <p className="mt-2 text-xs font-medium text-slate-700 dark:text-slate-200">{expense.category}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{expense.note || 'No note'}</p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => onEdit(expense)}
                className="flex-1 rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(expense.id)}
                className="flex-1 rounded-xl border border-rose-300 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-950"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400">
              <th className="px-2 py-2">Person</th>
              <th className="px-2 py-2">Amount</th>
              <th className="px-2 py-2">Category</th>
              <th className="px-2 py-2">Note</th>
              <th className="px-2 py-2">Date</th>
              <th className="px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr
                key={expense.id}
                className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
              >
                <td className="px-2 py-3 font-medium text-slate-900 dark:text-slate-100">{expense.person}</td>
                <td className="px-2 py-3 text-slate-900 dark:text-slate-100">${expense.amount.toFixed(2)}</td>
                <td className="px-2 py-3 text-slate-700 dark:text-slate-300">{expense.category}</td>
                <td className="px-2 py-3 text-slate-700 dark:text-slate-300">{expense.note || '-'}</td>
                <td className="px-2 py-3 text-slate-700 dark:text-slate-300">{formatDate(expense.createdAt)}</td>
                <td className="px-2 py-3">
                  <div className="flex gap-2 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onEdit(expense)}
                      className="rounded-xl border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(expense.id)}
                      className="rounded-xl border border-rose-300 px-2.5 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-950"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
