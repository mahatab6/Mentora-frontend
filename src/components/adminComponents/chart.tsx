"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

const revenueChartConfig = {
  amount: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;


export default function Chart() {

 const mockPlatformRevenue = [
  { day: "Mon", amount: 120 },
  { day: "Tue", amount: 210 },
  { day: "Wed", amount: 180 },
  { day: "Thu", amount: 260 },
  { day: "Fri", amount: 300 },
  { day: "Sat", amount: 280 },
  { day: "Sun", amount: 340 },
];

  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">


  <div className="h-[350px]">
    <ChartContainer
      config={revenueChartConfig}
      className="h-full w-full"
    >
      <AreaChart data={mockPlatformRevenue}>
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
