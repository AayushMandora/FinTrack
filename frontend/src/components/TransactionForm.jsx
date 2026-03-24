import React, { useState, useEffect } from 'react';
import { MdClose, MdOutlineAttachMoney, MdOutlineCalendarToday, MdOutlineStickyNote2, MdLayers } from 'react-icons/md';
import api from '../api/axios';
import { toast } from 'react-hot-toast';

const TransactionForm = ({ isOpen, onClose, onSuccess, initialData = null }) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    note: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    if (initialData) {
      setFormData({ ...initialData, category: initialData?.category?._id, date: initialData?.date?.split('T')[0] });
    }
  }, [initialData]);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (err) {
      toast.error('Failed to load categories');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      toast.error('Please enter a valid positive amount');
      return false;
    }
    if (!formData.category) {
      toast.error('Please select a category');
      return false;
    }
    if (!formData.date) {
      toast.error('Please select a date');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (initialData?._id) {
        await api.put(`/transactions/${initialData._id}`, formData);
        toast.success('Transaction updated!');
      } else {
        await api.post('/transactions', formData);
        toast.success('Transaction added!');
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const filteredCategories = categories.filter((cat) => cat.type === formData.type);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-slate-800 border border-slate-700/50 rounded-3xl shadow-2xl p-6 md:p-10 animate-in zoom-in slide-in-from-bottom duration-300 overflow-hidden group">
        {/* Glow effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-500"></div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-50 hover:bg-slate-700/50 p-2 rounded-xl transition-all"
        >
          <MdClose size={24} />
        </button>

        <h2 className="text-2xl font-bold text-slate-50 mb-8">
          {initialData ? 'Update Transaction' : 'New Transaction'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Toggle */}
          <div className="flex bg-slate-900/50 p-1.5 rounded-2xl border border-slate-700 gap-1.5">
            <button
              type="button"
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${formData.type === 'income' ? 'bg-green-500 text-white shadow-md shadow-green-500/20' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'}`}
              onClick={() => setFormData({ ...formData, type: 'income', category: '' })}
            >
              Income
            </button>
            <button
              type="button"
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${formData.type === 'expense' ? 'bg-red-500 text-white shadow-md shadow-red-500/20' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'}`}
              onClick={() => setFormData({ ...formData, type: 'expense', category: '' })}
            >
              Expense
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Amount (₹)</label>
              <div className="relative group/field">
                <MdOutlineAttachMoney className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/field:text-indigo-500 transition-colors" size={20} />
                <input
                  type="number"
                  name="amount"
                  className="input-field pl-11"
                  placeholder="0.00"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">Date</label>
              <div className="relative group/field">
                <MdOutlineCalendarToday className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/field:text-indigo-500 transition-colors" size={20} />
                <input
                  type="date"
                  name="date"
                  className="input-field pl-11 appearance-none"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="label">Category</label>
            <div className="relative group/field">
              <MdLayers className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/field:text-indigo-500 transition-colors pointer-events-none" size={20} />
              <select
                name="category"
                className="input-field pl-11 appearance-none cursor-pointer"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {filteredCategories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div>
            <label className="label">Note (Optional)</label>
            <div className="relative group/field">
              <MdOutlineStickyNote2 className="absolute left-3.5 top-4 text-slate-500 group-focus-within/field:text-indigo-500 transition-colors" size={20} />
              <textarea
                name="note"
                className="input-field pl-11 min-h-[100px] py-3.5 resize-none"
                placeholder="What was this for?"
                value={formData.note}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary w-full py-3 text-lg font-semibold shadow-md shadow-indigo-500/20 active:scale-95 transition-all ${loading ? 'opacity-70' : ''}`}
            >
              {loading ? 'Processing...' : initialData ? 'Update Transaction' : 'Save Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
