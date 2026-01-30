import { StatsCard } from "@/components/adminComponents/adminDashboard";
import Chart from "@/components/adminComponents/chart";
import RecentBookings from "@/components/adminComponents/recentBookings";
import SystemHealth from "@/components/adminComponents/systemHealth";
import TopTutors from "@/components/adminComponents/topTutors";

import { Button } from "@/components/ui/button";
import { mockAdminStats } from "@/lib/mockData";
import { Activity, Calendar, DollarSign, Users } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-4">

     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
           <p className="text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex gap-2">
           <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
             <option>Last 7 Days</option>
             <option>Last 30 Days</option>
             <option>Last 90 Days</option>
           </select>
           <Button className="bg-blue-600">Export Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Revenue" 
          value={`$${mockAdminStats.totalRevenue.toLocaleString()}`} 
          icon={DollarSign} 
          trend="up" 
          trendValue="18%" 
          color="green"
        />
        <StatsCard 
          title="Total Bookings" 
          value={mockAdminStats.totalBookings.toLocaleString()} 
          icon={Calendar} 
          trend="up" 
          trendValue="12%" 
          color="blue"
        />
        <StatsCard 
          title="Active Users" 
          value={mockAdminStats.totalUsers.toLocaleString()} 
          icon={Users} 
          trend="up" 
          trendValue="5%" 
          color="purple"
        />
        <StatsCard 
          title="Active Sessions" 
          value={mockAdminStats.activeSessions} 
          icon={Activity} 
          trend="down" 
          trendValue="2%" 
          color="orange"
        />
      </div>

      <div className="hidden lg:grid grid-cols-3 gap-8">
        <Chart/>
        <SystemHealth/>
      </div>

      <div className="hidden lg:grid grid-cols-2 gap-8">
        <RecentBookings/>
        <TopTutors/>
      </div>

    </div>
  )
}
