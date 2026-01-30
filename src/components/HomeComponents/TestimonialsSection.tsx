
import { Star, Quote } from 'lucide-react';


export default function TestimonialsSection() {
 const testimonials = [
    {
      id: 1,
      name: 'Alex Thompson',
      role: 'Student',
      subject: 'Web Development',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1576870397449-6ef1af18beb4',
      text: 'SkillBridge connected me with an amazing tutor who helped me land my dream job as a web developer. The personalized approach made all the difference!'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      role: 'Tutor',
      achievement: '500+ sessions completed',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1624388611710-bdf95023d1c2',
      text: 'As a tutor on SkillBridge, I have been able to reach students worldwide and build a successful tutoring business. The platform makes it easy to manage everything.'
    },
    {
      id: 3,
      name: 'James Chen',
      role: 'Student',
      subject: 'Data Science',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1576870397449-6ef1af18beb4',
      text: 'The flexibility to learn at my own pace with expert guidance was exactly what I needed. My tutor was patient, knowledgeable, and truly invested in my success.'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      role: 'Tutor',
      achievement: 'Top-rated mentor',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1624388611710-bdf95023d1c2',
      text: 'SkillBridge has transformed my teaching career. The tools provided help me deliver better lessons and the community of students is fantastic.'
    },
    {
      id: 5,
      name: 'Michael Rodriguez',
      role: 'Student',
      subject: 'Mathematics',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1576870397449-6ef1af18beb4',
      text: 'I went from struggling with calculus to acing my exams. My tutor explained concepts in ways that finally clicked. Highly recommend!'
    },
    {
      id: 6,
      name: 'Emily Watson',
      role: 'Student',
      subject: 'Design',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1576870397449-6ef1af18beb4',
      text: 'The quality of tutors on SkillBridge is outstanding. Every session was valuable and helped me improve my design skills tremendously.'
    }
  ];
  return (
    <section className="py-20 lg:py-32 px-4 bg-linear-to-br from-blue-50 to-indigo-50">

      <div className="container mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
          <p className="text-xl text-gray-600">Real stories from students and tutors</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
            >
              <Quote className="h-8 w-8 text-blue-600 mb-4" />
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name} - ${testimonial.role}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}
                    {testimonial.subject && ` • ${testimonial.subject}`}
                    {testimonial.achievement && ` • ${testimonial.achievement}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
