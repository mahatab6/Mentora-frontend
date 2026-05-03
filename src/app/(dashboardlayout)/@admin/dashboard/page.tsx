import Chart from "@/components/adminComponents/chart";
import DashboardCard from "@/components/adminComponents/dashboardCard";
import RecentBookings from "@/components/adminComponents/recentBookings";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Overview</h1>
        <p className="text-slate-500 dark:text-slate-400">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <DashboardCard />
      <Chart />
      <RecentBookings />
    </div>
  );
}
