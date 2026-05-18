import React from 'react';
import { MdDeleteOutline, MdEditNote, MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import CategoryBadge from './CategoryBadge';
import { format } from 'date-fns';

const TransactionCard = ({ transaction, onDelete, onEdit }) => {
  const { _id, amount, date, category, note, type } = transaction;
  const isIncome = type === 'income';

  return (
    <div className="card p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 group hover:border-indigo-100 hover:bg-white transition-all duration-300 animate-in slide-in-from-left duration-500">
      <div className="flex items-center gap-5 flex-1 min-w-0">
        <div className={`p-4 rounded-2xl border ${isIncome ? 'bg-green-50 border-green-100 text-green-600' : 'bg-red-50 border-red-100 text-red-600'}`}>
          {isIncome ? <MdTrendingUp size={28} /> : <MdTrendingDown size={28} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {format(new Date(date), 'MMM dd, yyyy')}
            </span>
            <CategoryBadge name={category?.name} />
          </div>
          <p className="text-slate-900 font-bold text-lg truncate pr-4">
            {note || 'No note added'}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8">
        <div className="text-right">
          <p className={`text-2xl font-black ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
            {isIncome ? '+' : '-'}₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onEdit(transaction)}
            className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-100 transition-all active:scale-90"
            title="Edit"
          >
            <MdEditNote size={24} />
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-100 hover:border-red-100 transition-all active:scale-90"
            title="Delete"
          >
            <MdDeleteOutline size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
