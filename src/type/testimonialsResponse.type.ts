
 interface Student {
  name: string;
  image: string;
}

export interface Testimonial {
  id: number;
  rating: number;
  reviewContent: string;
  replyContent: string | null;
  tutor_id: string;
  student_id: string;
  createdAt: string;
  student: Student;
}

export interface TestimonialsResponse {
  testimonials: Testimonial[];
}