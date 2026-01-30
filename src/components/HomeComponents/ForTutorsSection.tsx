
import { Award, Clock, DollarSign, TrendingUp, Users } from 'lucide-react';
import { Button } from '../ui/button';

export default function ForTutorsSection() {
 const benefits = [
    {
      icon: DollarSign,
      title: 'Earn Income',
      description: 'Set your own rates and earn money doing what you love'
    },
    {
      icon: Award,
      title: 'Build Reputation',
      description: 'Grow your profile with verified reviews and ratings'
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Work on your own schedule, anytime, anywhere'
    },
    {
      icon: Users,
      title: 'Reach Students',
      description: 'Connect with learners from around the world'
    },
    {
      icon: TrendingUp,
      title: 'Grow Your Business',
      description: 'Access tools and analytics to expand your reach'
    }
  ];

  return (
    <section className="py-20 lg:py-32 px-4 ">
      <div className="container mx-auto">
       
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className="order-2 lg:order-1 relative"
          >
            <img
              src="https://images.unsplash.com/photo-1624388611710-bdf95023d1c2"
              alt="Tutor teaching students in a professional learning environment"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </div>

          <div
            className="order-1 lg:order-2"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">For Tutors</h2>
            <p className="text-xl text-gray-600 mb-8">
              Share your expertise, impact lives, and build a thriving tutoring business on your terms.
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4"
                  >
                    <div className="bg-green-500 rounded-lg p-3 shrink-0">
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
              className="mt-8 bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg transition-all hover:scale-105"
            >
              Become a Tutor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
