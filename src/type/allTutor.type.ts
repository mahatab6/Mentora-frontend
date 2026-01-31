export type Tutor = {
  id: number;
  tutor_id: string;
  fullName: string;
  shortBio: string;
  aboutMe: string;
  education: string;
  country: string;
  timezone: string;
  languages: string[];
  subjects: string[];
  hourlyRate: number;
  lessonDuration: string;
  totalLessons: number;
  totalReviews: number;
  averageRating: number;
  photoUrl: string;
  introVideoUrl: string;
  isProfileActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};


export type AllTutorResponse = {
  success: boolean;
  data: {
    meta: PaginationMeta;
    tutors: Tutor[];
  };
};
