"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


const generateEarningsData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    earnings: Math.floor(Math.random() * (85 - 45 + 1)) + 45,
  }));
};

const mockEarningsData = generateEarningsData();

console.log(mockEarningsData)


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
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />

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

            Tooltip
            <Tooltip  />

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
