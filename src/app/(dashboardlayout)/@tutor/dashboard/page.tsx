import MetricsGrid from '@/components/tutorComponents/metricsGrid'
import RevenueChart from '@/components/tutorComponents/revenueChart'
import TutorHeader from '@/components/tutorComponents/tutorHeader'
import React from 'react'

export default function tutorDashboardPage() {
  return (
    <div className='p-4 space-y-8 animate-in fade-in duration-500'>
      <TutorHeader/>
      <MetricsGrid/>
      <div className='grid lg:grid-cols-3 gap-8'>
          <RevenueChart/>
      </div>
    </div>
  )
}
