import React, { useState, useEffect } from 'react';
import { MdAdd, MdRefresh } from 'react-icons/md';
import SummaryCard from '../components/SummaryCard';
import MonthlyBarChart from '../components/charts/MonthlyBarChart';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import TransactionForm from '../components/TransactionForm';
import api from '../api/axios';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
  });
  const [chartData, setChartData] = useState({
    monthlyData: [],
    categoryData: [],
  });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const summaryRes = await api.get('/summary');
      const data = summaryRes.data;

      setSummary({
        balance: data.balance || 0,
        income: data.income || 0,
        expense: data.expense || 0,
      });

      // Transform monthly data
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthlyMap = new Map();

      if (data.monthly) {
        data.monthly.forEach(item => {
          const key = `${item._id.year}-${item._id.month}`;
          if (!monthlyMap.has(key)) {
            monthlyMap.set(key, {
              year: item._id.year,
              monthNum: item._id.month,
              month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
              income: 0,
              expense: 0
            });
          }
          const monthData = monthlyMap.get(key);
          monthData[item._id.type] = item.total;
        });
      }

      const formattedMonthly = Array.from(monthlyMap.values())
        .sort((a, b) => {
          if (a.year !== b.year) return a.year - b.year;
          return a.monthNum - b.monthNum;
        });

      // Transform category 
      const formattedCategories = (data.categoryBreakdown || [])
        .filter(item => item.type === 'expense')
        .map(item => ({
          name: item.categoryName || 'Unknown',
          value: item.total
        }));

      setChartData({
        monthlyData: formattedMonthly,
        categoryData: formattedCategories,
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-indigo-500 min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="text-slate-400 font-medium">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-50">Dashboard</h1>
          <p className="text-slate-400 font-medium mt-1">Welcome back. Here is your financial overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="btn btn-outline p-2.5 transition-transform hover:rotate-180"
            title="Refresh dashboard"
          >
            <MdRefresh size={22} className="text-slate-400" />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary px-6 py-3 shadow-indigo-500/20 shadow-lg scale-105 hover:scale-110 active:scale-95 transition-all"
          >
            <MdAdd size={24} />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Balance"
          value={summary.balance}
          type="balance"
        />
        <SummaryCard
          title="Total Income"
          value={summary.income}
          type="income"
        />
        <SummaryCard
          title="Total Expense"
          value={summary.expense}
          type="expense"
        />
      </div>

      {/* Charts Grid */}
      {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-8"> */}
      <div className="transition-all hover:shadow-2xl hover:shadow-indigo-500/5 duration-500">
        <MonthlyBarChart data={chartData.monthlyData} />
      </div>
      {/* </div> */}
      <div className="transition-all hover:shadow-2xl hover:shadow-indigo-500/5 duration-500">
        <CategoryPieChart data={chartData.categoryData} />
      </div>

      {isModalOpen && (
        <TransactionForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchDashboardData}
        />
      )}
    </div>
  );
};

export default Dashboard;
