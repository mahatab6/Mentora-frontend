export type ReviewResponse = {
  success: boolean;
  data: Review[];
};

export type Review = {
  id: number;
  rating: number;
  reviewContent: string;
  replyContent: string | null;
  tutor_id: string;
  student_id: string;
  createdAt: string;
  tutor: TutorInfo;
  student: StudentInfo;
};

export type TutorInfo = {
  fullName: string;
  photoUrl: string;
};

export type StudentInfo = {
  name: string;
  image: string;
};
