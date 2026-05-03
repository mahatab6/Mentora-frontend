"use client";

import { TutorCard } from "@/components/HomeComponents/TutorCard";
import { useAllTutor } from "@/hooks/useAllTutor";
import { Search } from "lucide-react";
import Loading from "../loading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { useGetCategory } from "@/hooks/useGetCategory";

export default function FindTutorspage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { category } = useGetCategory();

  const searchTerm = searchParams.get("search") || "";
  const selectedcategory = searchParams.get("category") || "all";
  const selectedPrice = searchParams.get("price") || "all";
  const selectedRating = searchParams.get("rating") || "all";

  const [localSearch, setLocalSearch] = useState(searchTerm);

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
  const categories = category ?? [];

  return (
    <section className="py-20 lg:py-32 px-4 transition-colors duration-300 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Find Your Perfect Tutor
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-400">
            Search from hundreds of qualified tutors
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-none p-6 mb-12 border border-gray-100 dark:border-slate-800">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search Input Group */}
            <div className="flex md:col-span-1 gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search tutors..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    handleFilterChange("search", localSearch)
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <button
                onClick={() => handleFilterChange("search", localSearch)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition hover:cursor-pointer font-semibold active:scale-95"
              >
                Search
              </button>
            </div>

            {/* Category Select */}
            <select
              value={selectedcategory}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white bg-transparent dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="all" className="dark:bg-slate-900">
                All Categories
              </option>
              {categories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.name}
                  className="dark:bg-slate-900"
                >
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Price Select */}
            <select
              value={selectedPrice}
              onChange={(e) => handleFilterChange("price", e.target.value)}
              className="px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white bg-transparent dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="all" className="dark:bg-slate-900">
                Any Price
              </option>
              <option value="0-30" className="dark:bg-slate-900">
                $0 - $30
              </option>
              <option value="30-50" className="dark:bg-slate-900">
                $30 - $50
              </option>
              <option value="50+" className="dark:bg-slate-900">
                $50+
              </option>
            </select>

            {/* Rating Select */}
            <select
              value={selectedRating}
              onChange={(e) => handleFilterChange("rating", e.target.value)}
              className="px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white bg-transparent dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="all" className="dark:bg-slate-900">
                Any Rating
              </option>
              <option value="4.5+" className="dark:bg-slate-900">
                4.5+ Stars
              </option>
              <option value="4.8+" className="dark:bg-slate-900">
                4.8+ Stars
              </option>
              <option value="5.0" className="dark:bg-slate-900">
                5.0 Stars
              </option>
            </select>
          </div>
        </div>

        {/* Tutor Cards List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <></>
          ) : tutor?.data?.tutors?.length ? (
            tutor.data.tutors.map((t) => <TutorCard key={t.id} tutor={t} />)
          ) : (
            <div className="col-span-full text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800">
              <p className="text-gray-500 dark:text-slate-400">
                No tutors found for your criteria.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-12 ">
          <Pagination className="text-gray-600 dark:text-slate-300">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1)
                      handleFilterChange("page", (currentPage - 1).toString());
                  }}
                  className={
                    currentPage <= 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800"
                  }
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
                      className={
                        pageNumber === currentPage
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100 dark:hover:bg-slate-800"
                      }
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
                    if (currentPage < totalPages)
                      handleFilterChange("page", (currentPage + 1).toString());
                  }}
                  className={
                    currentPage >= totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
}
