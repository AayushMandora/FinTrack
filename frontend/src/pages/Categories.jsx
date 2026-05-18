import React, { useState, useEffect } from 'react';
import { MdAdd, MdDeleteOutline, MdOutlineLabel, MdLayers } from 'react-icons/md';
import api from '../api/axios';
import { toast } from 'react-hot-toast';
import CategoryBadge from '../components/CategoryBadge';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', type: 'expense' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (err) {
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return toast.error('Category name is required');

    setIsSubmitting(true);
    try {
      await api.post('/categories', formData);
      toast.success('Category added successfully');
      setFormData({ ...formData, name: '' });
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add category');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await api.delete(`/categories/${id}`);
        toast.success('Category deleted');
        fetchCategories();
      } catch (err) {
        toast.error('Failed to delete category');
      }
    }
  };

  const incomeCategories = categories.filter(c => c.type === 'income');
  const expenseCategories = categories.filter(c => c.type === 'expense');

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-50">Categories</h1>
          <p className="text-slate-400 font-medium mt-1">Manage your income and expense categories.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Add Form */}
        <div className="lg:col-span-1">
          <div className="card shadow-md shadow-indigo-500/5 bg-slate-800 p-8 border-slate-700/50 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-slate-50 flex items-center gap-2">
              <MdAdd size={24} className="text-indigo-500" />
              New Category
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="label">Type</label>
                <div className="flex bg-slate-900 border border-slate-700 p-1 rounded-xl gap-1">
                  <button
                    type="button"
                    className={`flex-1 py-3 px-2 rounded-lg font-semibold text-xs transition-all ${formData.type === 'income' ? 'bg-green-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-100'}`}
                    onClick={() => setFormData({ ...formData, type: 'income' })}
                  >
                    Income
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-3 px-2 rounded-lg font-semibold text-xs transition-all ${formData.type === 'expense' ? 'bg-red-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-100'}`}
                    onClick={() => setFormData({ ...formData, type: 'expense' })}
                  >
                    Expense
                  </button>
                </div>
              </div>

              <div>
                <label className="label">Category Name</label>
                <div className="relative group/field focus-within:z-10">
                  <MdOutlineLabel className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/field:text-indigo-500 transition-colors pointer-events-none" size={20} />
                  <input
                    type="text"
                    className="input-field pl-11 py-3 font-medium"
                    placeholder="e.g. Salary, Utilities"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary w-full py-3 text-sm font-semibold shadow-md shadow-indigo-500/20 ${isSubmitting ? 'opacity-70' : ''}`}
              >
                {isSubmitting ? 'Adding...' : 'Add Category'}
              </button>
            </form>
          </div>
        </div>

        {/* Right: Category List */}
        <div className="lg:col-span-2 space-y-12">
          {/* Income Categories */}
          <section className="animate-in slide-in-from-right duration-500">
            <h2 className="text-sm font-bold text-slate-500 mb-6 flex items-center gap-3">
              <span className="w-10 h-0.5 bg-green-500"></span>
              Income Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {incomeCategories.map((cat) => (
                <CategoryCard key={cat._id} category={cat} onDelete={handleDelete} />
              ))}
              {incomeCategories.length === 0 && <p className="text-black text-sm font-medium">No income categories found.</p>}
            </div>
          </section>

          {/* Expense Categories */}
          <section className="animate-in slide-in-from-right duration-700">
            <h2 className="text-sm font-bold text-slate-500 mb-6 flex items-center gap-3">
              <span className="w-10 h-0.5 bg-red-500"></span>
              Expense Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {expenseCategories.map((cat) => (
                <CategoryCard key={cat._id} category={cat} onDelete={handleDelete} />
              ))}
              {expenseCategories.length === 0 && <p className="text-black text-sm font-medium">No expense categories found.</p>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const CategoryCard = ({ category, onDelete }) => (
  <div className="card border-slate-700/40 p-5 flex items-center justify-between group hover:bg-slate-800 transition-all hover:border-slate-600/50">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl border ${category.type === 'income' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
        <MdLayers size={20} />
      </div>
      <div>
        <h4 className="text-black font-semibold text-sm">{category.name}</h4>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          {category.isDefault ? 'Default' : 'Custom'}
        </p>
      </div>
    </div>

    {!category.isDefault && (
      <button
        onClick={() => onDelete(category._id)}
        className="p-2 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-all active:scale-95 group-hover:opacity-100"
        title="Delete"
      >
        <MdDeleteOutline size={20} />
      </button>
    )}
  </div>
);

export default Categories;
