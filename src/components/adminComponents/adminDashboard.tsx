import { ArrowDownRight, ArrowUpRight } from "lucide-react";


export const StatsCard = ({ title, value, icon: Icon, trend, trendValue, color = "blue" }) => {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${colorStyles[color] || colorStyles.blue}`}>
          {Icon && <Icon className="h-5 w-5" />}
        </div>
      </div>
      {trend && (
        <div className="flex items-center text-sm">
          {trend === 'up' ? (
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={trend === 'up' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
            {trendValue}
          </span>
          <span className="text-gray-400 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
};