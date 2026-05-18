import React from 'react';
import { MdTrendingUp, MdTrendingDown, MdAccountBalanceWallet } from 'react-icons/md';

const SummaryCard = ({ title, value, type, icon: CustomIcon }) => {
  const isIncome = type === 'income';
  const isExpense = type === 'expense';
  const isBalance = type === 'balance';

  const getColorClasses = () => {
    if (isIncome) return 'text-green-600 bg-green-50 border-green-100';
    if (isExpense) return 'text-red-600 bg-red-50 border-red-100';
    return 'text-indigo-600 bg-indigo-50 border-indigo-100';
  };

  const Icon = CustomIcon || (isIncome ? MdTrendingUp : isExpense ? MdTrendingDown : MdAccountBalanceWallet);

  return (
    <div className="card p-6 flex items-center gap-5 transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-100 duration-300">
      <div className={`p-4 rounded-2xl border ${getColorClasses()}`}>
        <Icon size={28} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">
          ₹{value?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0}
        </h3>
      </div>
    </div>
  );
};

export default SummaryCard;
