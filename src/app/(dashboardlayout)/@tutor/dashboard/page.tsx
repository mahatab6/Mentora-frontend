import MetricsGrid from '@/components/tutorComponents/metricsGrid'
import RevenueChart from '@/components/tutorComponents/revenueChart'
import Reviews from '@/components/tutorComponents/reviews'
import TopSubjects from '@/components/tutorComponents/topSubjects'
import TutorHeader from '@/components/tutorComponents/tutorHeader'
import UpcomingSessions from '@/components/tutorComponents/upcomingSessions'
import React from 'react'

export default function tutorDashboardPage() {
  return (
    <div className='p-4 space-y-8 animate-in fade-in duration-500'>
      <TutorHeader/>
      <MetricsGrid/>
      <RevenueChart/>
     <div className="grid lg:grid-cols-3 gap-8">
        <UpcomingSessions/>
        <TopSubjects/>
     </div>
     <Reviews/>
    </div>
  )
}
