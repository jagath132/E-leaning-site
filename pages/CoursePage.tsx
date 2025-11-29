import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import MainHeader from "../Components/header/MainHeader";
import MainFooter from "../Components/footer/MainFooter";
import QASection from "../Components/course/QASection";
import BookmarkButton from "../Components/course/BookmarkButton";
import RecommendationEngine from "../Components/course/RecommendationEngine";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Calendar,
  Users,
  Star,
  Play,
  CheckCircle2,
  Award,
  Heart,
  Share2,
  ChevronRight,
  Video,
  FileText,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const sampleLessons = [
  { title: "Introduction to the Course", duration: "15 min", type: "video" },
  {
    title: "Getting Started with Fundamentals",
    duration: "45 min",
    type: "video",
  },
  { title: "Core Concepts Deep Dive", duration: "60 min", type: "video" },
  { title: "Hands-on Project 1", duration: "90 min", type: "project" },
  { title: "Advanced Techniques", duration: "55 min", type: "video" },
  { title: "Real-world Case Studies", duration: "40 min", type: "video" },
  { title: "Best Practices & Tips", duration: "30 min", type: "video" },
  { title: "Hands-on Project 2", duration: "120 min", type: "project" },
  { title: "Industry Applications", duration: "50 min", type: "video" },
  {
    title: "Final Assessment & Certification",
    duration: "60 min",
    type: "assessment",
  },
];

export default function CoursePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("id");
  const queryClient = useQueryClient();
  const [activeLesson, setActiveLesson] = useState(0);

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const courses = await base44.entities.Course.filter({ id: courseId });
      return courses[0];
    },
    enabled: !!courseId,
  });

  const { data: bookmarks = [] } = useQuery({
    queryKey: ["bookmarks", courseId],
    queryFn: () => base44.entities.Bookmark.filter({ course_id: courseId }),
    enabled: !!courseId,
  });

  const { data: userProgress } = useQuery({
    queryKey: ["userProgress", courseId],
    queryFn: async () => {
      const progress = await base44.entities.UserProgress.filter({
        course_id: courseId,
      });
      return progress[0];
    },
    enabled: !!courseId,
  });

  // Track course view for recommendations
  const trackViewMutation = useMutation({
    mutationFn: async () => {
      const views = await base44.entities.CourseView.filter({
        course_id: courseId,
      });
      if (views.length > 0) {
        return base44.entities.CourseView.update(views[0].id, {
          view_count: (views[0].view_count || 0) + 1,
        });
      } else {
        return base44.entities.CourseView.create({
          course_id: courseId!,
          course_category: course?.category || "",
          view_count: 1,
        });
      }
    },
  });

  // Create/update progress
  const updateProgressMutation = useMutation({
    mutationFn: async (
      data: Partial<{
        completed_lessons: number[];
        last_accessed: string;
        time_spent_minutes: number;
        is_saved: boolean;
      }>
    ) => {
      if (userProgress) {
        return base44.entities.UserProgress.update(userProgress.id, data);
      } else {
        return base44.entities.UserProgress.create({
          course_id: courseId!,
          course_title: course?.title,
          course_category: course?.category,
          course_image: course?.image_url,
          course_duration: course?.duration,
          total_lessons: sampleLessons.length,
          ...data,
        });
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userProgress", courseId] }),
  });

  useEffect(() => {
    if (course && courseId) {
      trackViewMutation.mutate();
    }
  }, [course, courseId]);

  const handleLessonComplete = (lessonIndex: number) => {
    const completed = userProgress?.completed_lessons || [];
    if (!completed.includes(lessonIndex)) {
      updateProgressMutation.mutate({
        completed_lessons: [...completed, lessonIndex],
        last_accessed: new Date().toISOString(),
        time_spent_minutes: (userProgress?.time_spent_minutes || 0) + 30,
      });
      toast.success("Lesson completed!");
    }
  };

  const handleSaveCourse = () => {
    updateProgressMutation.mutate({
      is_saved: !userProgress?.is_saved,
      last_accessed: new Date().toISOString(),
    });
    toast.success(
      userProgress?.is_saved ? "Removed from saved" : "Course saved!"
    );
  };

  const isLessonBookmarked = (lessonTitle: string) => {
    return bookmarks.find((b) => b.lesson_title === lessonTitle);
  };

  const completedLessons = userProgress?.completed_lessons || [];
  const progressPercentage = Math.round(
    (completedLessons.length / sampleLessons.length) * 100
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="flex items-center justify-center py-32">
          <div className="animate-spin w-8 h-8 border-4 border-[#1d69db] border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="text-center py-32">
          <h1 className="text-2xl font-bold text-gray-900">Course not found</h1>
        </div>
        <MainFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Course Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3 flex-wrap">
                <Badge className="bg-[#1d69db]">{course.category}</Badge>
                {course.partner && (
                  <Badge
                    variant="outline"
                    className="border-white/30 text-white"
                  >
                    {course.partner}
                  </Badge>
                )}
                {course.is_popular && (
                  <Badge className="bg-[#ff6b35]">Popular</Badge>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                {course.title}
              </h1>

              <p className="text-gray-300 text-lg">
                Master the skills needed to excel in your career with this
                comprehensive program designed by industry experts.
              </p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Starts {course.cohort_start}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>12,500+ enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>4.8 (2,340 reviews)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-[#1d69db] hover:bg-[#1557b8] rounded-full px-8"
                  onClick={() => handleLessonComplete(0)}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-full"
                  onClick={handleSaveCourse}
                >
                  <Heart
                    className={`w-5 h-5 mr-2 ${
                      userProgress?.is_saved ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  {userProgress?.is_saved ? "Saved" : "Save Course"}
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-white/10 rounded-full"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Progress Card */}
            <div className="lg:col-span-1">
              <Card className="bg-white text-gray-900 overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-[#1d69db] to-[#0f4c99]">
                  <img
                    src={
                      course.image_url ||
                      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80"
                    }
                    alt={course.title}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <p className="text-3xl font-bold text-[#1d69db]">
                      {progressPercentage}%
                    </p>
                    <p className="text-sm text-gray-500">Complete</p>
                  </div>
                  <Progress value={progressPercentage} className="h-2 mb-4" />
                  <p className="text-sm text-gray-600 text-center">
                    {completedLessons.length} of {sampleLessons.length} lessons
                    completed
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="curriculum" className="space-y-6">
              <TabsList className="bg-white border p-1">
                <TabsTrigger value="curriculum" className="px-6">
                  Curriculum
                </TabsTrigger>
                <TabsTrigger value="overview" className="px-6">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="qa" className="px-6">
                  Q&A
                </TabsTrigger>
                <TabsTrigger value="reviews" className="px-6">
                  Reviews
                </TabsTrigger>
              </TabsList>

              {/* Curriculum Tab */}
              <TabsContent value="curriculum">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      Course Content
                    </h3>
                    <div className="space-y-3">
                      {sampleLessons.map((lesson, index) => {
                        const isCompleted = completedLessons.includes(index);
                        const isActive = activeLesson === index;
                        const bookmark = isLessonBookmarked(lesson.title);

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <div
                              className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                isActive
                                  ? "border-[#1d69db] bg-blue-50"
                                  : isCompleted
                                  ? "border-green-200 bg-green-50"
                                  : "border-gray-100 hover:border-gray-200"
                              }`}
                              onClick={() => setActiveLesson(index)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                      isCompleted
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-100 text-gray-500"
                                    }`}
                                  >
                                    {isCompleted ? (
                                      <CheckCircle2 className="w-5 h-5" />
                                    ) : (
                                      <span className="font-semibold">
                                        {index + 1}
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900">
                                      {lesson.title}
                                    </h4>
                                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                      {lesson.type === "video" && (
                                        <Video className="w-3 h-3" />
                                      )}
                                      {lesson.type === "project" && (
                                        <FileText className="w-3 h-3" />
                                      )}
                                      {lesson.type === "assessment" && (
                                        <Award className="w-3 h-3" />
                                      )}
                                      <span>{lesson.duration}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <BookmarkButton
                                    courseId={courseId!}
                                    courseTitle={course.title}
                                    lessonTitle={lesson.title}
                                    lessonIndex={index}
                                    isBookmarked={!!bookmark}
                                    bookmarkId={bookmark?.id}
                                    onBookmarkChange={() =>
                                      queryClient.invalidateQueries({
                                        queryKey: ["bookmarks", courseId],
                                      })
                                    }
                                  />
                                  {!isCompleted && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleLessonComplete(index);
                                      }}
                                    >
                                      Mark Complete
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Overview Tab */}
              <TabsContent value="overview">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        About This Course
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        This comprehensive program is designed to equip you with
                        the skills and knowledge needed to excel in your chosen
                        field. Through a combination of live classes, hands-on
                        projects, and expert mentorship, you'll gain practical
                        experience that employers value.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">
                        What You'll Learn
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          "Master fundamental concepts and theories",
                          "Apply skills through hands-on projects",
                          "Learn industry best practices",
                          "Build a professional portfolio",
                          "Prepare for certification exams",
                          "Network with industry professionals",
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">
                        Requirements
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                          Basic understanding of the subject matter
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                          Computer with internet access
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                          Dedication to complete the program
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Q&A Tab */}
              <TabsContent value="qa">
                <Card>
                  <CardContent className="p-6">
                    <QASection
                      courseId={courseId!}
                      courseLessons={sampleLessons.map((l) => l.title)}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="text-center">
                        <p className="text-5xl font-bold text-gray-900">4.8</p>
                        <div className="flex items-center gap-1 mt-2">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i <= 4
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-yellow-400/50 text-yellow-400/50"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          2,340 reviews
                        </p>
                      </div>
                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 w-3">
                              {rating}
                            </span>
                            <Progress
                              value={rating === 5 ? 75 : rating === 4 ? 20 : 5}
                              className="h-2 flex-1"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-center text-gray-500">
                      Reviews coming soon...
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Course Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">
                  This Course Includes
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: Video, text: "50+ hours of video content" },
                    { icon: FileText, text: "Downloadable resources" },
                    { icon: Award, text: "Certificate of completion" },
                    { icon: Globe, text: "Lifetime access" },
                    { icon: Users, text: "Community access" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-sm text-gray-600"
                    >
                      <item.icon className="w-5 h-5 text-[#1d69db]" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <RecommendationEngine
              currentCourseId={courseId!}
              currentCategory={course.category}
            />
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
