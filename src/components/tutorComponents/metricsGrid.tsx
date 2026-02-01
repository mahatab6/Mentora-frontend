import { tutorDashboard } from "@/services/tutorDashboard.services";
import { userServices } from "@/services/users.services";
import { Calendar, DollarSign, Star } from "lucide-react";
import { LucideIcon } from "lucide-react";

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
    </div>
  );
};

export default async function MetricsGrid() {

  const session = await userServices.getSession();

  const id = session?.user?.id;
  const data = await tutorDashboard.getMetricsGrid(id)
  const metrics = data?.data;


  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total Earnings"
          value={metrics?.earnings}
          icon={DollarSign}
          trend="up"
          trendValue="12%"
          color="green"
        />
        <StatsCard
          title="Average Rating"
          value={metrics?.averageRating}
          icon={Star}
          trend="up"
          trendValue="0.2"
          color="yellow"
        />
        <StatsCard
          title="Total Sessions"
          value={metrics?.completedSessions}
          icon={Calendar}
          trend="up"
          trendValue="8"
          color="blue"
        />
      </div>
    </div>
  );
}
