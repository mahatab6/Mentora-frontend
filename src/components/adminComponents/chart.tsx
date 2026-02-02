"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { useAllEarning } from "@/hooks/useAllEarningChart";
import { useMemo } from "react";

const revenueChartConfig = {
  amount: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

type Earnig = {
  price: number;
  createdAt: string;
};

export default function Chart() {

  const { allEarning, loading, error } = useAllEarning();
console.log(allEarning)
 const chartData = useMemo(() => {
  const safeData: Earnig[] = allEarning ?? [];

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


  return Object.entries(earningsMap).map(([day, total]) => ({
    day,
    amount: total, 
  }));
}, [allEarning]);

    if ( loading) {
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


  <div className="h-[350px]">
    <ChartContainer
      config={revenueChartConfig}
      className="h-full w-full"
    >
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-amount)" stopOpacity={0.2} />
            <stop offset="95%" stopColor="var(--color-amount)" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          vertical={false}
          strokeDasharray="3 3"
          stroke="hsl(var(--border))"
        />

        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `$${value}`}
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
        />

        <Area
          dataKey="amount"
          type="monotone"
          stroke="var(--color-amount)"
          fill="url(#fillRevenue)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  </div>
</div>
  )
}
