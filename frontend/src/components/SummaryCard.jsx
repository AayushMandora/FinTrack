import React from 'react';
import { MdTrendingUp, MdTrendingDown, MdAccountBalanceWallet } from 'react-icons/md';

const SummaryCard = ({ title, value, type, icon: CustomIcon }) => {
  const isIncome = type === 'income';
  const isExpense = type === 'expense';
  const isBalance = type === 'balance';

  const getColorClasses = () => {
    if (isIncome) return 'text-green-500 bg-green-500/10 border-green-500/20';
    if (isExpense) return 'text-red-500 bg-red-500/10 border-red-500/20';
    return 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20';
  };

  const Icon = CustomIcon || (isIncome ? MdTrendingUp : isExpense ? MdTrendingDown : MdAccountBalanceWallet);

  return (
    <div className="card p-6 flex items-center gap-5 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 duration-300">
      <div className={`p-4 rounded-2xl border ${getColorClasses()}`}>
        <Icon size={28} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-50">
          ₹{value?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0}
        </h3>
      </div>
    </div>
  );
};

export default SummaryCard;
