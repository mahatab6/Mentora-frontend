import { Award, Clock, DollarSign, TrendingUp, Users, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function ForTutorsSection() {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Earn Income',
      description: 'Set your own rates and keep what you earn with transparent payouts.',
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      icon: Award,
      title: 'Build Reputation',
      description: 'Stand out with a professional profile and verified student reviews.',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: Clock,
      title: 'Total Flexibility',
      description: 'Balance your life by choosing exactly when and how much you work.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Users,
      title: 'Global Reach',
      description: 'Connect with students globally without leaving your home.',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <section className="py-24 lg:py-36 px-4 bg-slate-50 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
        
          <div className="order-2 lg:order-1 relative">
     
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-200 rounded-full blur-[80px] opacity-40" />
            
            <div className="relative z-10">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-[12px] border-white">
                <Image
                  width={600}
                  height={750}
                  src="https://i.ibb.co.com/YB0vhk86/tutor.jpg"
                  alt="Professional tutor teaching online"
                  className="w-full h-[550px] object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>

           
              <div className="absolute top-10 -right-6 lg:-right-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 hidden md:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <TrendingUp className="text-white w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-gray-500">Monthly Growth</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">+125%</p>
                <div className="mt-2 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-green-500 w-[70%] h-full rounded-full" />
                </div>
              </div>

             
              <div className="absolute -bottom-6 left-10 bg-white p-4 rounded-xl shadow-lg border border-gray-50 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-green-500">
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold">Top Rated Tutor</span>
                    <CheckCircle className="w-3 h-3 text-blue-500 fill-blue-500" />
                  </div>
                  <p className="text-xs text-gray-500">5.0 (480 Reviews)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Teach on Your Terms</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-[1.15]">
              Transform Your Expertise into a <span className="text-green-600">Thriving Business</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Join thousands of experts who have found a better way to teach. We provide the tools; you provide the inspiration.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="group transition-all">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3 ${benefit.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
              
              <Link href={"/become-a-tutor"}>
              <Button className="w-full sm:w-auto hover:cursor-pointer bg-green-600 hover:bg-green-700 text-white px-10 py-7 text-lg rounded-2xl shadow-xl shadow-green-100 transition-all hover:-translate-y-1 active:scale-95">
                Apply to Teach
              </Button>
              </Link>
              <Link href="/how-it-works" className="text-gray-600 font-semibold hover:text-green-600 transition-colors underline decoration-2 underline-offset-4">
                Learn how it works
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}