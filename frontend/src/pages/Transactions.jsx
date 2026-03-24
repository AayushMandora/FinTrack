import React, { useState, useEffect } from 'react';
import { MdSearch, MdFilterList, MdOutlineCalendarToday, MdOutlineSearchOff, MdHistory, MdExpandMore } from 'react-icons/md';
import api from '../api/axios';
import { toast } from 'react-hot-toast';
import TransactionCard from '../components/TransactionCard';
import TransactionForm from '../components/TransactionForm';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    startDate: '',
    endDate: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const res = await api.get(`/transactions?${queryParams}`);
      setTransactions(res.data);
    } catch (err) {
      toast.error('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, [filters]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await api.delete(`/transactions/${id}`);
        toast.success('Transaction deleted');
        fetchTransactions();
      } catch (err) {
        toast.error('Failed to delete transaction');
      }
    }
  };

  const clearFilters = () => {
    setFilters({ type: '', category: '', startDate: '', endDate: '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-50">Transactions</h1>
          <p className="text-slate-400 font-medium mt-1">View and filter your transactions.</p>
        </div>
        <button
          onClick={() => { setSelectedTransaction(null); setIsModalOpen(true); }}
          className="btn btn-primary px-6 py-2.5 font-semibold"
        >
          Add Transaction
        </button>
      </div>

      {/* Filters Bar */}
      <div className="card border-slate-700/50 p-6 flex flex-wrap items-end gap-5 lg:gap-8 backdrop-blur-sm bg-slate-800/40 sticky top-0 md:top-6 z-20 shadow-2xl">
        <div className="flex-1 min-w-[240px]">
          <label className="label">Transaction Type</label>
          <div className="relative group/filter flex items-center bg-slate-900 border border-slate-700 rounded-xl overflow-hidden focus-within:border-indigo-500 transition-colors">
            <div className="pl-4 text-slate-500 group-focus-within/filter:text-indigo-500 transition-colors">
              <MdFilterList size={22} />
            </div>
            <select
              className="flex-1 bg-transparent py-3 pr-4 outline-none text-slate-100 font-bold appearance-none cursor-pointer"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">All Transactions</option>
              <option value="income">Income Only</option>
              <option value="expense">Expense Only</option>
            </select>
            <MdExpandMore className="absolute right-4 text-slate-500 pointer-events-none" size={20} />
          </div>
        </div>

        <div className="flex-1 min-w-[240px]">
          <label className="label">Category</label>
          <div className="relative group/filter flex items-center bg-slate-900 border border-slate-700 rounded-xl overflow-hidden focus-within:border-indigo-500 transition-colors">
            <div className="pl-4 text-slate-500 group-focus-within/filter:text-indigo-500 transition-colors">
              <MdSearch size={22} />
            </div>
            <select
              className="flex-1 bg-transparent py-3 pr-4 outline-none text-slate-100 font-bold appearance-none cursor-pointer"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <MdExpandMore className="absolute right-4 text-slate-500 pointer-events-none" size={20} />
          </div>
        </div>

        <div className="flex-1 min-w-[300px] flex items-end gap-3">
          <div className="flex-1">
            <label className="label">Date Range</label>
            <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl overflow-hidden focus-within:border-indigo-500 transition-all">
              <input
                type="date"
                className="flex-1 bg-transparent p-3 outline-none text-slate-100 font-bold text-sm"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              />
              <span className="text-slate-600 px-1 font-black">/</span>
              <input
                type="date"
                className="flex-1 bg-transparent p-3 outline-none text-slate-100 font-bold text-sm"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              />
            </div>
          </div>
        </div>

        <button
          onClick={clearFilters}
          className="btn btn-outline py-2 border-slate-700 px-4 h-[44px] font-medium text-sm rounded-lg"
        >
          Reset
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-indigo-500">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <p className="text-slate-400 font-medium">Loading Transactions...</p>
        </div>
      ) : transactions.length > 0 ? (
        <div className="space-y-4 pb-20">
          {transactions.map((t) => (
            <TransactionCard
              key={t._id}
              transaction={t}
              onDelete={handleDelete}
              onEdit={(trans) => { setSelectedTransaction(trans); setIsModalOpen(true); }}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-40 card border-dashed border-slate-700/50 bg-transparent animate-in zoom-in duration-500">
          <div className="p-8 rounded-full bg-slate-800/80 mb-6 border border-slate-700 animate-bounce">
            <MdOutlineSearchOff size={60} className="text-slate-500/30" />
          </div>
          <h3 className="text-2xl font-bold text-slate-100">No Transactions Found</h3>
          <p className="text-slate-500 mt-2 font-medium max-w-sm text-center">
            Adjust your filters or start recording new expenses to see your financial activity here.
          </p>
          <button
            onClick={() => { setSelectedTransaction(null); setIsModalOpen(true); }}
            className="mt-6 btn btn-primary px-6 py-2.5 font-semibold"
          >
            Add Transaction
          </button>
        </div>
      )}

      {isModalOpen && (
        <TransactionForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchTransactions}
          initialData={selectedTransaction}
        />
      )}
    </div>
  );
};

export default Transactions;
