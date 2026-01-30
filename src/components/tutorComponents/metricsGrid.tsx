"use client";

import React, { useState } from "react";
import { Calendar, DollarSign, MessageSquare, Star } from "lucide-react";
import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";



type Trend = "up" | "down";

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: Trend;
  trendValue?: string;
  color?: "blue" | "green" | "orange" | "purple" | "yellow";
};

const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = "blue",
}: StatsCardProps) => {
  const colorStyles: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
    yellow: "bg-yellow-50 text-yellow-600",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${colorStyles[color]}`}>
          {Icon && <Icon className="h-5 w-5" />}
        </div>
      </div>

      {trend && trendValue && (
        <div className="flex items-center text-sm">
          {trend === "up" ? (
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span
            className={
              trend === "up"
                ? "text-green-600 font-medium"
                : "text-red-600 font-medium"
            }
          >
            {trendValue}
          </span>
          <span className="text-gray-400 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
};


export default function MetricsGrid() {
 
  const [mockTutorStats, setMockTutorStats] = useState({
    totalEarnings: 2450,
    averageRating: 4.8,
    totalSessions: 156,
    responseRate: 98,
    responseTime: "2.3 hours",
    cancellationRate: "2%",
    completionRate: 98,
  });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Earnings"
          value={`$${mockTutorStats.totalEarnings}`}
          icon={DollarSign}
          trend="up"
          trendValue="12%"
          color="green"
        />
        <StatsCard
          title="Average Rating"
          value={mockTutorStats.averageRating}
          icon={Star}
          trend="up"
          trendValue="0.2"
          color="yellow"
        />
        <StatsCard
          title="Total Sessions"
          value={mockTutorStats.totalSessions}
          icon={Calendar}
          trend="up"
          trendValue="8"
          color="blue"
        />
        <StatsCard
          title="Response Rate"
          value={`${mockTutorStats.responseRate}%`}
          icon={MessageSquare}
          trend="down"
          trendValue="1%"
          color="purple"
        />
      </div>
    </div>
  );
}
