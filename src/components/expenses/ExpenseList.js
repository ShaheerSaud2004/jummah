import React from 'react';

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString();
}

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Expense List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
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
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-2 py-6 text-center text-slate-500 dark:text-slate-400">
                  No expenses yet. Add one to get started.
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
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
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(expense)}
                        className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(expense.id)}
                        className="rounded-lg border border-rose-300 px-2.5 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-950"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
