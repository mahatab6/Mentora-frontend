
import { UserCheck, Clock, DollarSign, TrendingUp, BarChart } from 'lucide-react';
import { Button } from '../ui/button';

export default function ForStudentsSection() {
 const benefits = [
    {
      icon: UserCheck,
      title: 'Find Qualified Tutors',
      description: 'Access verified, experienced tutors in any subject'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Book sessions that fit your busy schedule'
    },
    {
      icon: DollarSign,
      title: 'Affordable Pricing',
      description: 'Compare rates and find tutors within your budget'
    },
    {
      icon: TrendingUp,
      title: 'Learn at Your Pace',
      description: 'Personalized learning tailored to your needs'
    },
    {
      icon: BarChart,
      title: 'Track Progress',
      description: 'Monitor your improvement with detailed analytics'
    }
  ];
  return (
    <section className="py-20 lg:py-32 px-4 bg-linear-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto">
       
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">For Students</h2>
            <p className="text-xl text-gray-600 mb-8">
              Unlock your potential with personalized tutoring from experts who care about your success.
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4"
                  >
                    <div className="bg-blue-600 rounded-lg p-3 shrink-0">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
             
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg transition-all hover:scale-105"
            >
              Start Learning
            </Button>
          </div>

          <div
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1576870397449-6ef1af18beb4"
              alt="Students learning together in a collaborative environment"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
