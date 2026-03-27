import React, { useEffect, useMemo, useState } from 'react';
import Dashboard from '../components/expenses/Dashboard';
import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseList from '../components/expenses/ExpenseList';
import PersonCard from '../components/expenses/PersonCard';
import SpendingChart from '../components/expenses/SpendingChart';
import ExpensePieChart from '../components/expenses/ExpensePieChart';
import { expenseBackendConfig } from '../config/expenseBackendConfig';

const STORAGE_KEYS = {
  budget: 'expenses.hidden.budget',
  people: 'expenses.hidden.people',
  expenses: 'expenses.hidden.expenses',
  darkMode: 'expenses.hidden.darkMode',
  version: 'expenses.hidden.version',
};
const STORAGE_VERSION = '2';

const EMPTY_FORM = {
  person: '',
  amount: '',
  category: 'Food',
  note: '',
};

const LEGACY_CATEGORY_MAP = {
  Travel: 'Weekly Khateeb Gifts',
  Other: 'Snacks',
};

const TEAM_BASELINE = {
  budget: 6522.13,
  foodFromAlBasha: 2100.0,
  peopleRows: [
    { name: 'Zain Sumor', values: [144.92, 35.94, 61.1, 56.73] },
    { name: 'Ahmed Haris', values: [20.79, 40.49, 15.86, 17.99, 44.75] },
    { name: 'Maimuna', values: [164.59, 58.24] },
  ],
};

const TEAM_BASELINE_NON_FOOD_TOTAL = TEAM_BASELINE.peopleRows.reduce(
  (peopleTotal, row) => peopleTotal + row.values.reduce((rowTotal, value) => rowTotal + value, 0),
  0
);
const TEAM_BASELINE_TOTAL_EXPENSES = TEAM_BASELINE.foodFromAlBasha + TEAM_BASELINE_NON_FOOD_TOTAL;
const TEAM_BASELINE_REMAINING = TEAM_BASELINE.budget - TEAM_BASELINE_TOTAL_EXPENSES;

const TEAM_BASELINE_SEED_EXPENSES = [
  {
    id: 'seed-food-al-basha',
    person: 'Team',
    amount: TEAM_BASELINE.foodFromAlBasha,
    category: 'Food',
    note: 'Food from AL basha',
    createdAt: '2026-03-01T12:00:00.000Z',
  },
  ...TEAM_BASELINE.peopleRows.flatMap((row, rowIndex) =>
    row.values.map((value, valueIndex) => ({
      id: `seed-${rowIndex}-${valueIndex}`,
      person: row.name,
      amount: value,
      category: valueIndex % 2 === 0 ? 'Weekly Khateeb Gifts' : 'Snacks',
      note: 'Team baseline entry',
      createdAt: `2026-03-${String(2 + rowIndex).padStart(2, '0')}T12:${String(valueIndex)
        .padStart(2, '0')}:00.000Z`,
    }))
  ),
];
const TEAM_BASELINE_CATEGORY_TOTALS = {
  Food: TEAM_BASELINE.foodFromAlBasha,
  'Weekly Khateeb Gifts': TEAM_BASELINE.peopleRows.reduce(
    (sum, row) => sum + row.values.filter((_, index) => index % 2 === 0).reduce((a, b) => a + b, 0),
    0
  ),
  Snacks: TEAM_BASELINE.peopleRows.reduce(
    (sum, row) => sum + row.values.filter((_, index) => index % 2 !== 0).reduce((a, b) => a + b, 0),
    0
  ),
};

function normalizeAmount(value) {
  const parsed = Number(value);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return 0;
  }

  return Number(parsed.toFixed(2));
}

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

export default function ExpensesHiddenPage() {
  const isSupabasePublicConfigPresent = Boolean(
    expenseBackendConfig.supabaseUrl && expenseBackendConfig.supabaseAnonKey
  );
  const [budget, setBudget] = useState(() => Number(localStorage.getItem(STORAGE_KEYS.budget)) || TEAM_BASELINE.budget);
  const [people, setPeople] = useState(() => {
    const savedPeople = JSON.parse(localStorage.getItem(STORAGE_KEYS.people) || '[]');
    if (savedPeople.length > 0) {
      return savedPeople;
    }

    return ['Team', ...TEAM_BASELINE.peopleRows.map((row) => row.name)];
  });
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = JSON.parse(localStorage.getItem(STORAGE_KEYS.expenses) || '[]');
    if (savedExpenses.length > 0) {
      return savedExpenses;
    }

    return TEAM_BASELINE_SEED_EXPENSES;
  });
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem(STORAGE_KEYS.darkMode) === 'true');
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [newPersonName, setNewPersonName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [filterPerson, setFilterPerson] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');
  const [expandedPeople, setExpandedPeople] = useState({});

  useEffect(() => {
    // One-time category migration for existing local data.
    setExpenses((prev) =>
      prev.map((expense) => ({
        ...expense,
        category: LEGACY_CATEGORY_MAP[expense.category] || expense.category,
      }))
    );
  }, []);

  useEffect(() => {
    // Data migration: move legacy default budget (1000) to your provided baseline.
    const existingVersion = localStorage.getItem(STORAGE_KEYS.version);
    if (existingVersion === STORAGE_VERSION) {
      return;
    }

    const savedBudgetRaw = localStorage.getItem(STORAGE_KEYS.budget);
    const savedBudget = savedBudgetRaw ? Number(savedBudgetRaw) : null;
    if (savedBudget === null || savedBudget === 1000) {
      setBudget(TEAM_BASELINE.budget);
    }

    const savedPeople = JSON.parse(localStorage.getItem(STORAGE_KEYS.people) || '[]');
    if (!Array.isArray(savedPeople) || savedPeople.length === 0) {
      setPeople(['Team', ...TEAM_BASELINE.peopleRows.map((row) => row.name)]);
    }

    const savedExpenses = JSON.parse(localStorage.getItem(STORAGE_KEYS.expenses) || '[]');
    if (!Array.isArray(savedExpenses) || savedExpenses.length === 0) {
      setExpenses(TEAM_BASELINE_SEED_EXPENSES);
    }

    localStorage.setItem(STORAGE_KEYS.version, STORAGE_VERSION);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.budget, String(budget));
  }, [budget]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.people, JSON.stringify(people));
  }, [people]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.expenses, JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.darkMode, String(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const totalExpenses = useMemo(
    () => expenses.reduce((total, expense) => total + Number(expense.amount || 0), 0),
    [expenses]
  );
  const remainingBalance = budget - totalExpenses;

  const personGroups = useMemo(() => {
    return people.map((person) => {
      const personExpenses = expenses.filter((expense) => expense.person === person);
      const total = personExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      return { person, expenses: personExpenses, total };
    });
  }, [expenses, people]);

  const categoryTotals = useMemo(() => {
    return expenses.reduce(
      (totals, expense) => {
        if (!Object.prototype.hasOwnProperty.call(totals, expense.category)) {
          totals[expense.category] = 0;
        }
        totals[expense.category] += expense.amount;
        return totals;
      },
      { Food: 0, 'Weekly Khateeb Gifts': 0, Snacks: 0 }
    );
  }, [expenses]);

  const filteredAndSortedExpenses = useMemo(() => {
    const filtered = expenses.filter((expense) => {
      if (filterPerson !== 'all' && expense.person !== filterPerson) {
        return false;
      }
      if (filterCategory !== 'all' && expense.category !== filterCategory) {
        return false;
      }
      return true;
    });

    const sorted = [...filtered];
    sorted.sort((a, b) => {
      switch (sortBy) {
        case 'amount_asc':
          return a.amount - b.amount;
        case 'amount_desc':
          return b.amount - a.amount;
        case 'date_asc':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'date_desc':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return sorted;
  }, [expenses, filterCategory, filterPerson, sortBy]);

  const handleAddPerson = (name) => {
    const trimmed = name.trim();
    if (!trimmed || people.includes(trimmed)) {
      return trimmed;
    }

    setPeople((prev) => [...prev, trimmed]);
    return trimmed;
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setNewPersonName('');
    setEditingId(null);
  };

  const handleSubmitExpense = (event) => {
    event.preventDefault();

    const amount = normalizeAmount(formData.amount);
    if (amount <= 0) {
      return;
    }

    const selectedPerson =
      formData.person === '__new__' ? handleAddPerson(newPersonName) : formData.person.trim();

    if (!selectedPerson) {
      return;
    }

    if (!people.includes(selectedPerson)) {
      setPeople((prev) => [...prev, selectedPerson]);
    }

    const expensePayload = {
      id: editingId || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      person: selectedPerson,
      amount,
      category: formData.category,
      note: formData.note.trim(),
      createdAt: editingId
        ? expenses.find((expense) => expense.id === editingId)?.createdAt || new Date().toISOString()
        : new Date().toISOString(),
    };

    if (editingId) {
      setExpenses((prev) => prev.map((expense) => (expense.id === editingId ? expensePayload : expense)));
    } else {
      setExpenses((prev) => [expensePayload, ...prev]);
    }

    resetForm();
  };

  const handleEditExpense = (expense) => {
    setEditingId(expense.id);
    setFormData({
      person: expense.person,
      amount: expense.amount.toString(),
      category: expense.category,
      note: expense.note,
    });
    setNewPersonName('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));
    if (editingId === expenseId) {
      resetForm();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-100 px-3 py-5 text-slate-900 transition-colors sm:px-4 sm:py-8 dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl dark:bg-sky-900/40" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl dark:bg-indigo-900/30" />
      <div className="relative mx-auto w-full max-w-[1400px] space-y-6">
        <header className="rounded-3xl border border-slate-200/80 bg-white/85 p-4 shadow-sm backdrop-blur sm:p-6 dark:border-slate-700/70 dark:bg-slate-900/75">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky-600 dark:text-sky-300">
                Rutgers Team Finance
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Team Expense Center</h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Premium private dashboard for team + internal admin tracking.
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Backend status: {isSupabasePublicConfigPresent ? 'Supabase public keys detected' : 'Local storage mode'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Dark mode</label>
              <button
                type="button"
                onClick={() => setDarkMode((prev) => !prev)}
                className="rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                {darkMode ? 'On' : 'Off'}
              </button>
            </div>
          </div>
          <div className="mt-4 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Private route: /xyz/epsnes
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-sm sm:p-6 dark:border-slate-700/70 dark:bg-slate-900/80">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Team Snapshot (Read-only)
            </h2>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              Team members only
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400">Budget</p>
              <p className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100">{formatCurrency(TEAM_BASELINE.budget)}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400">Food (Food from AL basha)</p>
              <p className="mt-1 text-xl font-bold text-rose-600 dark:text-rose-400">{formatCurrency(TEAM_BASELINE.foodFromAlBasha)}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400">Total Expenses</p>
              <p className="mt-1 text-xl font-bold text-rose-600 dark:text-rose-400">{formatCurrency(TEAM_BASELINE_TOTAL_EXPENSES)}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400">Remaining</p>
              <p className="mt-1 text-xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(TEAM_BASELINE_REMAINING)}</p>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="min-w-[640px] text-xs sm:min-w-full sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-slate-700 dark:text-slate-200">Name</th>
                  <th className="px-3 py-2 text-left font-semibold text-slate-700 dark:text-slate-200">Values</th>
                  <th className="px-3 py-2 text-right font-semibold text-slate-700 dark:text-slate-200">Total</th>
                </tr>
              </thead>
              <tbody>
                {TEAM_BASELINE.peopleRows.map((row) => {
                  const rowTotal = row.values.reduce((sum, value) => sum + value, 0);
                  return (
                    <tr key={row.name} className="border-t border-slate-200 dark:border-slate-700">
                      <td className="px-3 py-2 font-medium text-slate-900 dark:text-slate-100">{row.name}</td>
                      <td className="px-3 py-2 text-slate-600 dark:text-slate-300">
                        {row.values.map((value) => formatCurrency(value)).join(' • ')}
                      </td>
                      <td className="px-3 py-2 text-right font-semibold text-slate-900 dark:text-slate-100">
                        {formatCurrency(rowTotal)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <ExpensePieChart categoryTotals={TEAM_BASELINE_CATEGORY_TOTALS} title="Team Snapshot Pie Chart" />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-sm sm:p-6 dark:border-slate-700/70 dark:bg-slate-900/80">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Expense Manager (Editable)
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Add/update/delete expenses here. This section is for your ongoing entries.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Budget</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={budget}
                onChange={(event) => setBudget(Math.max(0, Number(event.target.value || 0)))}
                className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-sky-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </label>
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Quick add person</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPersonName}
                  onChange={(event) => setNewPersonName(event.target.value)}
                  placeholder="Type name"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-sky-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
                <button
                  type="button"
                  onClick={() => {
                    handleAddPerson(newPersonName);
                    setNewPersonName('');
                  }}
                  className="rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-sky-500 hover:to-indigo-500"
                >
                  Add
                </button>
              </div>
            </label>
          </div>
        </section>

        <Dashboard budget={budget} totalExpenses={totalExpenses} remainingBalance={remainingBalance} />

        <div className="grid gap-6 xl:grid-cols-3">
          <ExpenseForm
            formData={formData}
            setFormData={setFormData}
            people={people}
            newPersonName={newPersonName}
            setNewPersonName={setNewPersonName}
            onSubmit={handleSubmitExpense}
            isEditing={Boolean(editingId)}
          />
          <SpendingChart categoryTotals={categoryTotals} />
          <ExpensePieChart categoryTotals={categoryTotals} title="Live Expense Pie Chart" />
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">People Expense Tracking</h2>
          {personGroups.length === 0 ? (
            <p className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              Add people and expenses to view per-person totals.
            </p>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {personGroups.map((group) => (
                <PersonCard
                  key={group.person}
                  personName={group.person}
                  expenses={group.expenses}
                  total={group.total}
                  isOpen={Boolean(expandedPeople[group.person])}
                  onToggle={() =>
                    setExpandedPeople((prev) => ({ ...prev, [group.person]: !prev[group.person] }))
                  }
                />
              ))}
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-sm sm:p-5 dark:border-slate-700/70 dark:bg-slate-900/80">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Filters</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">By person</span>
              <select
                value={filterPerson}
                onChange={(event) => setFilterPerson(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="all">All</option>
                {people.map((person) => (
                  <option key={person} value={person}>
                    {person}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">By category</span>
              <select
                value={filterCategory}
                onChange={(event) => setFilterCategory(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="all">All</option>
                <option value="Food">Food</option>
                <option value="Weekly Khateeb Gifts">Weekly Khateeb Gifts</option>
                <option value="Snacks">Snacks</option>
              </select>
            </label>

            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Sort</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="date_desc">Date (newest first)</option>
                <option value="date_asc">Date (oldest first)</option>
                <option value="amount_desc">Amount (high to low)</option>
                <option value="amount_asc">Amount (low to high)</option>
              </select>
            </label>
          </div>
        </section>

        <ExpenseList expenses={filteredAndSortedExpenses} onEdit={handleEditExpense} onDelete={handleDeleteExpense} />
      </div>
    </div>
  );
}
