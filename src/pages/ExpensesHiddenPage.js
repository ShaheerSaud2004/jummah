import React, { useEffect, useMemo, useState } from 'react';
import Dashboard from '../components/expenses/Dashboard';
import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseList from '../components/expenses/ExpenseList';
import PersonCard from '../components/expenses/PersonCard';
import SpendingChart from '../components/expenses/SpendingChart';
import { expenseBackendConfig } from '../config/expenseBackendConfig';

const STORAGE_KEYS = {
  budget: 'expenses.hidden.budget',
  people: 'expenses.hidden.people',
  expenses: 'expenses.hidden.expenses',
  darkMode: 'expenses.hidden.darkMode',
};

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

function normalizeAmount(value) {
  const parsed = Number(value);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return 0;
  }

  return Number(parsed.toFixed(2));
}

export default function ExpensesHiddenPage() {
  const isSupabasePublicConfigPresent = Boolean(
    expenseBackendConfig.supabaseUrl && expenseBackendConfig.supabaseAnonKey
  );
  const [budget, setBudget] = useState(() => Number(localStorage.getItem(STORAGE_KEYS.budget)) || 1000);
  const [people, setPeople] = useState(() => JSON.parse(localStorage.getItem(STORAGE_KEYS.people) || '[]'));
  const [expenses, setExpenses] = useState(() => JSON.parse(localStorage.getItem(STORAGE_KEYS.expenses) || '[]'));
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem(STORAGE_KEYS.darkMode) === 'true');
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [newPersonName, setNewPersonName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [filterPerson, setFilterPerson] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');
  const [expandedPeople, setExpandedPeople] = useState({});

  useEffect(() => {
    // One-time migration for existing local data.
    setExpenses((prev) =>
      prev.map((expense) => ({
        ...expense,
        category: LEGACY_CATEGORY_MAP[expense.category] || expense.category,
      }))
    );
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
    <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Expense Tracker</h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Private view route: <span className="font-medium">/xyz/epsnes</span>
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
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                {darkMode ? 'On' : 'Off'}
              </button>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Budget</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={budget}
                onChange={(event) => setBudget(Math.max(0, Number(event.target.value || 0)))}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
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
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-emerald-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
                <button
                  type="button"
                  onClick={() => {
                    handleAddPerson(newPersonName);
                    setNewPersonName('');
                  }}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                >
                  Add
                </button>
              </div>
            </label>
          </div>
        </header>

        <Dashboard budget={budget} totalExpenses={totalExpenses} remainingBalance={remainingBalance} />

        <div className="grid gap-6 lg:grid-cols-2">
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
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">People Expense Tracking</h2>
          {personGroups.length === 0 ? (
            <p className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              Add people and expenses to view per-person totals.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
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

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
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
