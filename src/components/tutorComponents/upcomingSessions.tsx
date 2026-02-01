import { StatusBadge } from "../adminComponents/StatusBadge";
import { Clock, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { userServices } from "@/services/users.services";
import { tutorDashboard } from "@/services/tutorDashboard.services";

interface Booking {
  id: number;
  createdAt: string;
  startTime: string;
  durationMinutes: number;
  price: number;
  subject: string;
  status: 'completed' | 'upcoming' | 'cancelled';
  student: {
    name: string;
    image: string | undefined;
  };
}

export default async function UpcomingSessions() {
  const session = await userServices.getSession();
  const id = session?.user?.id;

  const data = await tutorDashboard.getBooking(id);
  
  const bookings:Booking[] = data?.data?.slice(0, 5) || [];

  if (bookings.length === 0) {
    return (
      <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
        <p className="text-gray-500">No recent sessions found.</p>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
          Last 5 sessions
        </span>
      </div>

      <div className="space-y-3">
        {bookings.map((item)=> {
         
          const dateLabel = new Date(item.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });

          return (
            <div
              key={item.id}
              className="group flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-50 rounded-xl hover:shadow-sm hover:border-blue-100 transition-all bg-slate-50/50 hover:bg-white"
            >
         
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                  <AvatarImage src={item.student?.image} alt={item.student?.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
                    {item.student?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.student?.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="bg-gray-200 h-1 w-1 rounded-full" />
                    {item.subject}
                  </div>
                </div>
              </div>

             
              <div className="flex flex-row items-center gap-6 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                    <Calendar className="h-3.5 w-3.5 text-blue-500" />
                    {dateLabel} • {item.startTime}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    {item.durationMinutes} mins
                  </div>
                </div>

                <div className="min-w-100px flex justify-end">
                  <StatusBadge status={item.status} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}