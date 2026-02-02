import { Activity, Calendar, DollarSign, Users } from "lucide-react";
import { StatsCard } from "./adminDashboard";
import { adminDashboard } from "@/services/admin/adminDashboard.services";

export default async function DashboardCard() {
    const response = await adminDashboard.getDashboardCard();
 
    const stats = response?.data || response; 

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
                title="Total Revenue"
                value={stats?.totalRevenue}
                icon={DollarSign}
                color="green"
            />
            <StatsCard
                title="Total Bookings"
                value={stats?.totalBookings} 
                icon={Calendar}
                color="blue"
            />
            <StatsCard
                title="Active Users"
                value={stats?.activeUsers}
                icon={Users}
                color="purple"
            />
            <StatsCard
                title="Completed Sessions"
                value={stats?.completedSessions}
                icon={Activity}
                color="orange"
            />
        </div>
    );
}
