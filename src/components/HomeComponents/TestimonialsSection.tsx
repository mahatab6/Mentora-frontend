import { findTutor } from '@/services/findTutor.services';
import { Testimonial } from '@/type';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';




export default async function TestimonialsSection() {

  const response  = await findTutor.getAllReview()
  const reviews = response.data || [];

  return (
   <section className="py-24 lg:py-32 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
            Hear From Our <span className="text-blue-600 dark:text-blue-400">Students</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-slate-400 leading-relaxed">
            Discover how personalized tutoring is changing lives and helping students achieve their academic dreams.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {reviews.slice(0, 6).map((testimonial: Testimonial) => (
            <div
              key={testimonial.id}
              className="break-inside-avoid relative group"
            >
              <div className="relative bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group-hover:border-blue-100 dark:group-hover:border-blue-900/50">
                
                {/* Decorative Quote Icon */}
                <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="h-12 w-12 text-blue-600 dark:text-blue-400 fill-blue-600 dark:fill-blue-400" />
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < testimonial.rating 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-gray-200 dark:text-slate-700"
                      }`} 
                    />
                  ))}
                </div>

                {/* Review Content */}
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-8 text-[15px] italic">
                  &ldquo;{testimonial.reviewContent}&rdquo;
                </p>

                {/* Student Info Footer */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-50 dark:border-slate-800">
                  <div className="relative w-12 h-12 shrink-0">
                    <Image
                      src={testimonial.student?.image ?? "/placeholder-avatar.png"}
                      alt={testimonial.student?.name ?? "Student"}
                      fill
                      className="rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-bold text-gray-900 dark:text-white truncate">
                      {testimonial.student?.name}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">
                      Verified Learner
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}