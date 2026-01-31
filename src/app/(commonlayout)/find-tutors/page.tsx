"use client";

import { TutorCard } from "@/components/HomeComponents/TutorCard";
import { useAllTutor } from "@/hooks/useAllTutor";
import { Search } from "lucide-react";
import { useState } from "react";
import Loading from "../loading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function FindTutorspage() {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchTerm = searchParams.get("search") || "";
  const selectedSubject = searchParams.get("subject") || "all";
  const selectedPrice = searchParams.get("price") || "all";
  const selectedRating = searchParams.get("rating") || "all";
  


  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key !== "page") {
    params.set("page", "1");
  }
    
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const { tutor, loading } = useAllTutor(searchParams.toString());

  const totalPages = tutor?.data?.meta?.totalPages || 1;
  const currentPage = Number(searchParams.get("page") || "1");

  console.log(tutor?.data?.tutors)

  if (loading) return <Loading />;

  
  
  return (
    <section className="py-20 lg:py-32 px-4 bg-linear-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto ">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Tutor
          </h2>
          <p className="text-xl text-gray-600">
            Search from hundreds of qualified tutors
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search tutors..."
                defaultValue={searchTerm}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900"
              />
            </div>
            </div>

            <select
              value={selectedSubject}
              onChange={(e) => handleFilterChange("subject", e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900"
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
              onChange={(e) => handleFilterChange("price", e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900"
            >
              <option value="all">Any Price</option>
              <option value="0-30">$0 - $30</option>
              <option value="30-50">$30 - $50</option>
              <option value="50+">$50+</option>
            </select>

            <select
              value={selectedRating}
              onChange={(e) => handleFilterChange("rating", e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900"
            >
              <option value="all">Any Rating</option>
              <option value="4.5+">4.5+ Stars</option>
              <option value="4.8+">4.8+ Stars</option>
              <option value="5.0">5.0 Stars</option>
            </select>
          </div>
        </div>

        <div className=" space-y-4 lg:w-3/4">
          {tutor?.data?.tutors?.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>

        <div className="mt-12 lg:w-3/4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handleFilterChange("page", (currentPage - 1).toString());
                }}
                className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={pageNumber === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      handleFilterChange("page", pageNumber.toString());
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) handleFilterChange("page", (currentPage + 1).toString());
                }}
                className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      </div>
    </section>
  );
}
