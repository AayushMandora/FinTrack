import React from 'react';
import { MdDeleteOutline, MdEditNote, MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import CategoryBadge from './CategoryBadge';
import { format } from 'date-fns';

const TransactionCard = ({ transaction, onDelete, onEdit }) => {
  const { _id, amount, date, category, note, type } = transaction;
  const isIncome = type === 'income';

  return (
    <div className="card p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 group hover:border-slate-600/50 hover:bg-slate-700/30 transition-all duration-300 animate-in slide-in-from-left duration-500">
      <div className="flex items-center gap-5 flex-1 min-w-0">
        <div className={`p-3.5 rounded-2xl border ${isIncome ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
          {isIncome ? <MdTrendingUp size={24} /> : <MdTrendingDown size={24} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-1.5">
            <span className="text-sm font-bold text-slate-400 tracking-wide">
              {format(new Date(date), 'MMM dd, yyyy')}
            </span>
            <CategoryBadge name={category?.name} />
          </div>
          <p className="text-slate-50 font-semibold text-lg truncate pr-4">
            {note || 'No note added'}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8">
        <div className="text-right">
          <p className={`text-xl font-bold ${isIncome ? 'text-green-500' : 'text-red-500'}`}>
            {isIncome ? '+' : '-'}₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onEdit(transaction)}
            className="p-2.5 rounded-xl bg-slate-800/50 text-slate-400 hover:text-indigo-500 hover:bg-indigo-500/10 border border-slate-700/50 hover:border-indigo-500/30 transition-all active:scale-90"
            title="Edit"
          >
            <MdEditNote size={22} />
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="p-2.5 rounded-xl bg-slate-800/50 text-slate-400 hover:text-red-500 hover:bg-red-500/10 border border-slate-700/50 hover:border-red-500/30 transition-all active:scale-90"
            title="Delete"
          >
            <MdDeleteOutline size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
