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
      name: 'Sarah Johnson',
      subject: 'Web Development',
      rating: 5.0,
      reviews: 127,
      price: 45,
      image: 'https://images.unsplash.com/photo-1701229404076-5629809b331d',
      verified: true,
      sessions: 234
    },
    {
      id: 2,
      name: 'Michael Chen',
      subject: 'Data Science',
      rating: 4.9,
      reviews: 98,
      price: 55,
      image: 'https://images.unsplash.com/photo-1686488594144-65fb516275e1',
      verified: true,
      sessions: 189
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      subject: 'Mathematics',
      rating: 4.8,
      reviews: 156,
      price: 40,
      image: 'https://images.unsplash.com/photo-1561089489-f13d5e730d72',
      verified: true,
      sessions: 312
    },
    {
      id: 4,
      name: 'David Kim',
      subject: 'Design',
      rating: 5.0,
      reviews: 84,
      price: 50,
      image: 'https://images.unsplash.com/photo-1701229404076-5629809b331d',
      verified: true,
      sessions: 156
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      subject: 'Language',
      rating: 4.9,
      reviews: 203,
      price: 35,
      image: 'https://images.unsplash.com/photo-1686488594144-65fb516275e1',
      verified: true,
      sessions: 421
    },
    {
      id: 6,
      name: 'James Wilson',
      subject: 'Business',
      rating: 4.8,
      reviews: 112,
      price: 60,
      image: 'https://images.unsplash.com/photo-1561089489-f13d5e730d72',
      verified: true,
      sessions: 267
    }
  ];

  return (
    <section className="py-20 lg:py-32 px-4 bg-linear-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto">

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor, index) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      </div>
    </section>
  );
}
