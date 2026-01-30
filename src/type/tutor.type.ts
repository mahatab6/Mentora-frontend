export type TutorType = {
  id: number;
  tutor_id: string;
  fullName: string;
  country: string;
  timezone: string;
  languages: string[];
  subjects: string[];
  photoUrl: string;
  introVideoUrl?: string;
  shortBio: string;
  aboutMe: string;
  hourlyRate: number;
  lessonDuration: string;
  totalLessons: number;
  averageRating: number;
  totalReviews: number;
};