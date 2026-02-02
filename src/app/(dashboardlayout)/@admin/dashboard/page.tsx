
import Chart from "@/components/adminComponents/chart";
import DashboardCard from "@/components/adminComponents/dashboardCard";
import RecentBookings from "@/components/adminComponents/recentBookings";
import SystemHealth from "@/components/adminComponents/systemHealth";
import TopTutors from "@/components/adminComponents/topTutors";



export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
        <p className="text-gray-500">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <DashboardCard/>

      <div className="hidden lg:grid grid-cols-3 gap-8">
        <Chart />
        <SystemHealth />
      </div>

      <div className="hidden lg:grid grid-cols-2 gap-8">
        <RecentBookings />
        <TopTutors />
      </div>
    </div>
  );
}
