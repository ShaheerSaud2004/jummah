import React from 'react';

const CATEGORIES = ['Food', 'Weekly Khateeb Gifts', 'Snacks'];

export default function ExpenseForm({
  formData,
  setFormData,
  people,
  newPersonName,
  setNewPersonName,
  onSubmit,
  isEditing,
}) {
  const showNewPersonField = formData.person === '__new__';

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
        {isEditing ? 'Edit Expense' : 'Add Expense'}
      </h2>

      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</span>
          <select
            value={formData.person}
            onChange={(event) => setFormData((prev) => ({ ...prev, person: event.target.value }))}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            required
          >
            <option value="">Select person</option>
            {people.map((person) => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
            <option value="__new__">+ Add new person</option>
          </select>
        </label>

        {showNewPersonField ? (
          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">New person name</span>
            <input
              type="text"
              value={newPersonName}
              onChange={(event) => setNewPersonName(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              placeholder="Enter person name"
              required
            />
          </label>
        ) : null}

        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Amount</span>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={formData.amount}
            onChange={(event) => setFormData((prev) => ({ ...prev, amount: event.target.value }))}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            placeholder="0.00"
            required
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</span>
          <select
            value={formData.category}
            onChange={(event) => setFormData((prev) => ({ ...prev, category: event.target.value }))}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            required
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1 md:col-span-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Optional note</span>
          <input
            type="text"
            value={formData.note}
            onChange={(event) => setFormData((prev) => ({ ...prev, note: event.target.value }))}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            placeholder="Dinner, train ticket, snacks..."
          />
        </label>

        <button
          type="submit"
          className="sm:col-span-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          {isEditing ? 'Update Expense' : 'Add Expense'}
        </button>
      </form>
    </section>
  );
}
