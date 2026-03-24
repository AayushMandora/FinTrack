import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#6366f1', '#22c55e', '#ef4444', '#f59e0b', '#ec4899', '#8b5cf6', '#10b981', '#3b82f6'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-lg shadow-2xl backdrop-blur-sm animate-in zoom-in duration-200">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold text-slate-100">{payload[0].name}</p>
          <p className="text-xs font-semibold text-slate-400">
            Amount: <span className="text-slate-100">₹{payload[0].value.toLocaleString()}</span>
          </p>
          <p className="text-xs font-medium text-indigo-500">
            {((payload[0].value / payload[0].payload.total) * 100).toFixed(1)}% of total
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const CategoryPieChart = ({ data }) => {
  // If data is empty or all values are zero, show empty state or friendly message
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  const chartData = data.map(item => ({ ...item, total }));

  return (
    <div className="h-[350px] w-full p-4 card select-none">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-50">Expense Breakdown</h3>
        <p className="text-sm text-slate-400">By category current month</p>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            stroke="transparent"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            layout="vertical" 
            verticalAlign="middle" 
            align="right" 
            iconType="circle"
            wrapperStyle={{ paddingLeft: '20px' }}
            formatter={(value, entry) => (
              <span className="text-slate-400 text-xs font-semibold hover:text-slate-100 transition-colors">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
