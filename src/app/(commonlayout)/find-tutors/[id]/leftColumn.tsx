
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { TutorType } from '@/type'
import { Clock, GraduationCap, Star } from 'lucide-react'


export default function LeftColumn({tutor} : {tutor: any}) {

    const mockReviews = [
    {
      id: 1,
      studentName: "Emily Davis",
      rating: 5,
      text: "Excellent explanation of complex concepts! Really helped me understand derivatives.",
      date: "2 days ago",
      studentImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      studentName: "David Wilson",
      rating: 4,
      text: "Great session, very patient tutor. Would recommend for physics help.",
      date: "1 week ago",
      studentImage:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      studentName: "Jessica Taylor",
      rating: 5,
      text: "Helped me ace my midterm! Best math tutor on the platform.",
      date: "2 weeks ago",
      studentImage:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    },
  ];

  return (
    <div className="lg:col-span-2 space-y-12">
               {/* About */}
               <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About {tutor.fullName.split(' ')[0]}</h2>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">{tutor.aboutMe}</p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                     <div className="bg-white p-4 rounded-lg border border-gray-100 flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                           <GraduationCap className="h-6 w-6" />
                        </div>
                        <div>
                           <p className="font-semibold text-gray-900">Education</p>
                           <p className="text-sm text-gray-600">Masters Degree</p>
                        </div>
                     </div>
                     <div className="bg-white p-4 rounded-lg border border-gray-100 flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-lg text-green-600">
                           <Clock className="h-6 w-6" />
                        </div>
                        <div>
                           <p className="font-semibold text-gray-900">Experience</p>
                           <p className="text-sm text-gray-600">10 Years Teaching</p>
                        </div>
                     </div>
                  </div>
               </section>

               {/* Subjects */}
               <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Subjects</h2>
                  <div className="flex flex-wrap gap-2">
                     {tutor.subjects.map(subject => (
                        <span key={subject} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 font-medium">
                           {subject}
                        </span>
                     ))}
                  </div>
               </section>

               {/* Reviews */}
               <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Reviews</h2>
                  <div className="grid gap-6">
                     {mockReviews.map((review) => (
                               <div
                                 key={review.id}
                                 className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between"
                               >
                                 {/* Star Rating + Date */}
                                 <div className="flex items-center justify-between mb-3">
                                   <div className="flex items-center gap-1">
                                     {[...Array(5)].map((_, i) => (
                                       <Star
                                         key={i}
                                         className={`h-4 w-4 ${
                                           i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                         }`}
                                       />
                                     ))}
                                   </div>
                                   <span className="text-xs text-gray-500">{review.date}</span>
                                 </div>
                     
                                 {/* Review Text */}
                                 <p className="text-sm text-gray-700 mb-4 line-clamp-3">{review.text}</p>
                     
                                 {/* Student Info */}
                                 <div className="flex items-center gap-3 mt-auto">
                                   <Avatar className="h-10 w-10">
                                     <AvatarImage src={review.studentImage} alt={review.studentName} />
                                     <AvatarFallback>{review.studentName.charAt(0)}</AvatarFallback>
                                   </Avatar>
                                   <span className="text-sm font-medium text-gray-900">{review.studentName}</span>
                                 </div>
                               </div>
                             ))}
                  </div>
                  <Button variant="outline" className="w-full mt-6">Load More Reviews</Button>
               </section>
            </div>
  )
}
