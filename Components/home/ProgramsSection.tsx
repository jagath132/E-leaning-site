import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import sampleCourses from "../../Entites/Courses.json";
import ProgramCard from "./ProgramCard";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  "Most Popular",
  "Generative AI",
  "AI & Machine Learning",
  "Data Science",
  "Project Management",
  "Cyber Security",
  "Cloud Computing",
  "Software Development",
];

export default function ProgramsSection() {
  const [activeCategory, setActiveCategory] = useState("Most Popular");

  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => base44.entities.Course.list(),
    // If backend is empty or offline, fall back to bundled sample data
    initialData: sampleCourses,
  });

  const filteredCourses =
    activeCategory === "Most Popular"
      ? courses.filter((c) => c.is_popular)
      : courses.filter((c) => c.category === activeCategory);

  return (
    <section className="py-16 lg:py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-10">
          Explore Our Top Programs
        </h2>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === category
                  ? "bg-[#1d69db] text-white shadow-lg shadow-blue-200"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {isLoading ? (
              Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl overflow-hidden shadow-lg"
                  >
                    <Skeleton className="h-44 w-full" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                ))
            ) : filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <ProgramCard key={course.id} program={course} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                <p className="text-lg">No courses found in this category.</p>
                <p className="text-sm mt-2">
                  Check back soon for new programs!
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-white border-2 border-[#1d69db] text-[#1d69db] rounded-full font-semibold hover:bg-[#1d69db] hover:text-white transition-all">
            View All Programs
          </button>
        </div>
      </div>
    </section>
  );
}
