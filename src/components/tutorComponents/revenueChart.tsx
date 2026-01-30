"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const generateEarningsData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    earnings: Math.floor(Math.random() * (85 - 45 + 1)) + 45, // $45 - $85
  }));
};

const mockEarningsData = generateEarningsData();

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100">
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-blue-600 font-bold text-lg">
          ${payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};


export default function RevenueChart() {
  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Revenue Overview
      </h2>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockEarningsData}>
            {/* Grid */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />

            {/* Axes */}
            <XAxis
              dataKey="day"
              stroke="#9CA3AF"
              tick={{ fontSize: 12, fill: "#6B7280" }}
              interval={4} // show every 5th day
            />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickFormatter={(value) => `$${value}`}
            />

            {/* Tooltip */}
            <Tooltip content={<CustomTooltip />} />

            {/* Line */}
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ r: 4, fill: "#2563EB" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
