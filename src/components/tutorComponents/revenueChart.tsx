"use client";

import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useEarningsChart } from "@/hooks/useEarningsChart";
import { authClient } from "@/lib/auth-client";

type Earnig = {
  price: number;
  createdAt: string;
};

export default function RevenueChart() {
  const { data: session, isPending } = authClient.useSession();


  const userId = session?.user?.id ?? "";


  const { EarningsChart, loading, error } = useEarningsChart(userId);


  const chartData = useMemo(() => {
    const safeData: Earnig[] = EarningsChart ?? [];

    const earningsMap = safeData.reduce(
      (acc: Record<string, number>, item) => {
        const date = new Date(item.createdAt);
        const day = date.toLocaleDateString("en-US", {
          weekday: "short",
        });

        acc[day] = (acc[day] || 0) + item.price;
        return acc;
      },
      {}
    );

    return Object.entries(earningsMap).map(([day, earnings]) => ({
      day,
      earnings,
    }));
  }, [EarningsChart]);


  if (isPending || loading) {
    return (
      <div className="lg:col-span-2 bg-white p-6 rounded-xl border">
        <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          Loading chart...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lg:col-span-2 bg-white p-6 rounded-xl border">
        <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
        <div className="h-[300px] flex items-center justify-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="lg:col-span-2 bg-white p-6 rounded-xl border">
        <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          No revenue data found
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Revenue Overview
      </h2>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="day"
              stroke="#9CA3AF"
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
