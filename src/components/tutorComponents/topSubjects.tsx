"use client";

import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";


const mockSubjectEarnings = [
  { subject: "Mathematics", earnings: 850, color: "#2563EB" },
  { subject: "Physics", earnings: 720, color: "#3B82F6" },
  { subject: "Chemistry", earnings: 580, color: "#60A5FA" },
  { subject: "Biology", earnings: 300, color: "#93C5FD" },
];


const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100 text-sm">
        <p className="text-gray-500">{payload[0].payload.subject}</p>
        <p className="font-semibold text-gray-900">${payload[0].value}</p>
      </div>
    );
  }
  return null;
};


export default function TopSubjects() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Top Subjects</h2>

      {/* Chart */}
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={mockSubjectEarnings}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" hide />
            <YAxis
              dataKey="subject"
              type="category"
              width={120}
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
            <Bar dataKey="earnings" radius={[0, 6, 6, 0]}>
              {mockSubjectEarnings.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend / Values */}
      <div className="mt-4 space-y-3">
        {mockSubjectEarnings.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-600">{item.subject}</span>
            </div>
            <span className="font-medium text-gray-900">${item.earnings}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
