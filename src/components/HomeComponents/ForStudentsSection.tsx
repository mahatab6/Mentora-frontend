import { UserCheck, Clock, DollarSign, TrendingUp, BarChart, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function ForStudentsSection() {
  const benefits = [
    {
      icon: UserCheck,
      title: 'Find Qualified Tutors',
      description: 'Access verified, experienced tutors in any subject.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Book sessions that fit your busy schedule.',
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      icon: DollarSign,
      title: 'Affordable Pricing',
      description: 'Compare rates and find tutors within your budget.',
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      icon: TrendingUp,
      title: 'Learn at Your Pace',
      description: 'Personalized learning tailored to your needs.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: BarChart,
      title: 'Track Progress',
      description: 'Monitor your improvement with detailed analytics.',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <section className="py-20 lg:py-32 px-4 bg-white overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
   
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
              <CheckCircle2 className="w-4 h-4" />
              <span>For Lifelong Learners</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Unlock Your Potential with <span className="text-blue-600">Expert Guidance</span>
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Experience a personalized approach to learning. Our platform connects you with 
              top-tier tutors dedicated to helping you master any subject.
            </p>

            <div className="grid sm:grid-cols-1 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="group flex items-start gap-5 transition-all duration-300"
                  >
                    <div className={`shrink-0 rounded-2xl p-4 transition-transform group-hover:scale-110 ${benefit.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 leading-snug">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link href="/find-tutors">
              <Button className="mt-12 bg-blue-600 hover:cursor-pointer hover:bg-blue-700 text-white px-10 py-7 text-lg rounded-2xl shadow-xl shadow-blue-200 transition-all hover:translate-y-[-4px] active:scale-95">
                Start Your Journey
              </Button>
            </Link>
          </div>

       
          <div className="relative">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50" />
            
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border-8 border-white">
              <Image
                width={800}
                height={1000}
                src="https://i.ibb.co.com/66szzng/student.jpg"
                alt="Student learning with expert tutor"
                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>

            
            <div className="absolute bottom-8 -left-8 z-20 bg-white p-6 rounded-2xl shadow-2xl hidden sm:block animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <TrendingUp className="text-green-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Average Success</p>
                  <p className="text-xl font-bold text-gray-900">+92% Score Improvement</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}