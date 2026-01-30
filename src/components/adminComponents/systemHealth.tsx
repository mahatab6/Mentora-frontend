"use client"

import { mockAdminStats, mockUserGrowth } from '@/lib/mockData'
import { AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

export default function SystemHealth() {
  return (
    <div className="space-y-6">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">System Health</h2>
              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center gap-2">
                       <CheckCircle className="h-4 w-4 text-green-500" /> Server Status
                    </span>
                    <span className="font-medium text-green-600">Healthy</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center gap-2">
                       <Clock className="h-4 w-4 text-blue-500" /> Uptime
                    </span>
                    <span className="font-medium text-gray-900">{mockAdminStats.uptime}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center gap-2">
                       <AlertCircle className="h-4 w-4 text-orange-500" /> Pending Payouts
                    </span>
                    <span className="font-medium text-orange-600">{mockAdminStats.pendingPayouts}</span>
                 </div>
              </div>
           </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">User Growth</h2>
              <div className="h-[200px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockUserGrowth}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} />
                       <XAxis dataKey="week" hide />
                       <Tooltip />
                       <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={2} dot={false} />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>
  )
}
