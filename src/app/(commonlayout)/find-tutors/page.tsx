"use client"

import { TutorCard } from "@/components/HomeComponents/TutorCard";
import { Search } from "lucide-react";
import { useState } from "react";




export default function FindTutorspage() {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');


 const tutors = [
  {
    id: 1,
    tutor_id: "tutor_001",
    fullName: "Sarah Johnson",
    country: "United States",
    timezone: "GMT-5",
    languages: ["English"],
    subjects: ["Mathematics", "Algebra"],
    photoUrl: "https://i.pravatar.cc/150?img=1",
    introVideoUrl: "https://example.com/videos/sarah.mp4",
    shortBio: "Friendly math tutor with 5+ years of experience.",
    aboutMe:
      "I specialize in helping students build strong foundations in math. I focus on clear explanations and practical examples.",
    hourlyRate: 25,
    lessonDuration: "60 minutes",
    totalLessons: 320,
    averageRating: 4.8,
    totalReviews: 120,
  },
  {
    id: 2,
    tutor_id: "tutor_002",
    fullName: "Ahmed Rahman",
    country: "Bangladesh",
    timezone: "GMT+6",
    languages: ["Bangla", "English"],
    subjects: ["JavaScript", "React", "Web Development"],
    photoUrl: "https://i.pravatar.cc/150?img=2",
    introVideoUrl: "https://example.com/videos/ahmed.mp4",
    shortBio: "Full-stack web developer and JavaScript instructor.",
    aboutMe:
      "I teach modern web development with real-world projects. My goal is to make coding simple and enjoyable.",
    hourlyRate: 18,
    lessonDuration: "60 minutes",
    totalLessons: 210,
    averageRating: 4.7,
    totalReviews: 95,
  },
  {
    id: 3,
    tutor_id: "tutor_003",
    fullName: "Maria Gomez",
    country: "Spain",
    timezone: "GMT+1",
    languages: ["Spanish", "English"],
    subjects: ["English", "IELTS Preparation"],
    photoUrl: "https://i.pravatar.cc/150?img=3",
    shortBio: "Certified English tutor for beginners to advanced learners.",
    aboutMe:
      "I help students improve speaking, writing, and exam preparation with structured lessons and practice.",
    hourlyRate: 22,
    lessonDuration: "45 minutes",
    totalLessons: 410,
    averageRating: 4.9,
    totalReviews: 180,
  },
  {
    id: 4,
    tutor_id: "tutor_004",
    fullName: "Daniel Kim",
    country: "South Korea",
    timezone: "GMT+9",
    languages: ["Korean", "English"],
    subjects: ["Physics", "Science"],
    photoUrl: "https://i.pravatar.cc/150?img=4",
    introVideoUrl: "https://example.com/videos/daniel.mp4",
    shortBio: "Physics tutor with a passion for problem-solving.",
    aboutMe:
      "I simplify complex physics concepts using visuals, examples, and step-by-step explanations.",
    hourlyRate: 30,
    lessonDuration: "60 minutes",
    totalLessons: 150,
    averageRating: 4.6,
    totalReviews: 60,
  },
];


  return (
    <section className="py-20 lg:py-32 px-4 bg-linear-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto ">

         <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Tutor</h2>
          <p className="text-xl text-gray-600">Search from hundreds of qualified tutors</p>
        </div>

        <div
          className="bg-white rounded-xl shadow-lg p-6 mb-12"
        >
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search tutors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
            >
              <option value="all">All Subjects</option>
              <option value="web">Web Development</option>
              <option value="data">Data Science</option>
              <option value="math">Mathematics</option>
              <option value="design">Design</option>
              <option value="language">Language</option>
              <option value="business">Business</option>
            </select>

            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
            >
              <option value="all">Any Price</option>
              <option value="0-30">$0 - $30</option>
              <option value="30-50">$30 - $50</option>
              <option value="50+">$50+</option>
            </select>

            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
            >
              <option value="all">Any Rating</option>
              <option value="4.5+">4.5+ Stars</option>
              <option value="4.8+">4.8+ Stars</option>
              <option value="5.0">5.0 Stars</option>
            </select>
          </div>
        </div>

        <div className=" space-y-4 lg:w-3/4">
          {tutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      </div>
    </section>
  );
}
