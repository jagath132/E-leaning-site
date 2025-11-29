import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

interface RecommendationEngineProps {
  currentCourseId: string;
  currentCategory: string;
}

export default function RecommendationEngine({
  currentCourseId,
  currentCategory,
}: RecommendationEngineProps) {
  // Get user's viewed courses
  const { data: courseViews = [] } = useQuery({
    queryKey: ["courseViews"],
    queryFn: () => base44.entities.CourseView.list("-view_count"),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  // Get all courses (uses same cache as ProgramsSection)
  const { data: allCourses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: () => base44.entities.Course.list(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  // Calculate recommendations based on viewing history
  const getRecommendations = () => {
    // Count category preferences
    const categoryScores: Record<string, number> = {};
    courseViews.forEach((view) => {
      if (view.course_category) {
        categoryScores[view.course_category] =
          (categoryScores[view.course_category] || 0) + (view.view_count || 0);
      }
    });

    // Boost current category
    if (currentCategory) {
      categoryScores[currentCategory] =
        (categoryScores[currentCategory] || 0) + 5;
    }

    // Score and filter courses
    const scoredCourses = allCourses
      .filter((course) => course.id !== currentCourseId)
      .map((course) => ({
        ...course,
        score:
          (categoryScores[course.category || ""] || 0) +
          (course.is_popular ? 3 : 0),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);

    return scoredCourses;
  };

  const recommendations = getRecommendations();

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-[#ff6b35]" />
        <h3 className="text-lg font-bold text-gray-900">Recommended For You</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recommendations.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={createPageUrl(`CoursePage?id=${course.id}`)}>
              <Card className="group overflow-hidden hover:shadow-lg transition-all cursor-pointer h-full">
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={
                      course.image_url ||
                      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80"
                    }
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {course.partner && (
                    <Badge className="absolute bottom-2 left-2 bg-white/90 text-gray-800 text-xs">
                      {course.partner}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-3">
                  <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-[#1d69db] transition-colors">
                    {course.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-[#1d69db] font-medium group-hover:gap-2 transition-all">
                    View Course <ArrowRight className="w-3 h-3" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
