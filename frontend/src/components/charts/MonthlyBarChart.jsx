import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 border border-slate-200 p-4 rounded-xl shadow-lg backdrop-blur-sm animate-in fade-in duration-300">
        <p className="text-sm font-bold text-slate-900 mb-2">{label}</p>
        <div className="space-y-1.5">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <p className="text-xs font-semibold text-slate-500">
                {entry.name}: <span className="text-slate-900 ml-1">₹{entry.value.toLocaleString()}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const MonthlyBarChart = ({ data }) => {
  return (
    <div className="h-[350px] w-full p-4 card select-none shadow-none border-none">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900">Trend Analysis</h3>
        <p className="text-sm text-slate-500">Monthly overview of cash flow</p>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc', opacity: 0.5 }} />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ paddingBottom: '20px' }}
          />
          <Bar dataKey="income" name="Income" fill="#16a34a" radius={[6, 6, 0, 0]} barSize={24} />
          <Bar dataKey="expense" name="Expense" fill="#dc2626" radius={[6, 6, 0, 0]} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;
