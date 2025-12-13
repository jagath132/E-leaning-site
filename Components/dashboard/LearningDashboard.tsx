import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44, UserProgress, User as Base44User } from "@/api/base44Client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Clock,
  Trophy,
  Target,
  Bookmark,
  Play,
  ArrowRight,
  Trash2,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";

export default function LearningDashboard() {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<Base44User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (error) {
        console.log("User not logged in");
      }
    };
    fetchUser();
  }, []);

  const { data: progress = [], isLoading: progressLoading } = useQuery({
    queryKey: ["userProgress", user?.id],
    queryFn: () =>
      user
        ? base44.entities.UserProgress.filter(
            { user_id: user.id },
            "-last_accessed"
          )
        : Promise.resolve([]),
    enabled: !!user,
  });

  const { data: bookmarks = [], isLoading: bookmarksLoading } = useQuery({
    queryKey: ["bookmarks", user?.id],
    queryFn: () =>
      user
        ? base44.entities.Bookmark.filter({ user_id: user.id }, "-created_at")
        : Promise.resolve([]),
    enabled: !!user,
  });

  const deleteBookmarkMutation = useMutation({
    mutationFn: (id: string) => base44.entities.Bookmark.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookmarks"] }),
  });

  const removeProgressMutation = useMutation({
    mutationFn: (id: string) => base44.entities.UserProgress.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userProgress"] }),
  });

  // Calculate stats
  const inProgressCourses = progress.filter((p) => {
    const completedCount = p.completed_lessons?.length || 0;
    return completedCount > 0 && completedCount < (p.total_lessons || 10);
  });

  const completedCourses = progress.filter((p) => {
    const completedCount = p.completed_lessons?.length || 0;
    return completedCount >= (p.total_lessons || 10);
  });

  const savedCourses = progress.filter((p) => p.is_saved);

  const totalTimeSpent = progress.reduce(
    (sum, p) => sum + (p.time_spent_minutes || 0),
    0
  );

  const stats = [
    {
      icon: BookOpen,
      label: "In Progress",
      value: inProgressCourses.length,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: Trophy,
      label: "Completed",
      value: completedCourses.length,
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      icon: Bookmark,
      label: "Saved",
      value: savedCourses.length,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      icon: Clock,
      label: "Hours Learned",
      value: Math.round(totalTimeSpent / 60),
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ];

  const getProgressPercentage = (item: UserProgress) => {
    if (!item.completed_lessons || !item.total_lessons) return 0;
    return Math.round(
      (item.completed_lessons.length / item.total_lessons) * 100
    );
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="progress" className="space-y-6">
        <TabsList className="bg-gray-100 p-1">
          <TabsTrigger value="progress" className="px-6">
            My Progress
          </TabsTrigger>
          <TabsTrigger value="saved" className="px-6">
            Saved Courses
          </TabsTrigger>
          <TabsTrigger value="bookmarks" className="px-6">
            Bookmarks
          </TabsTrigger>
          <TabsTrigger value="completed" className="px-6">
            Completed
          </TabsTrigger>
        </TabsList>

        {/* In Progress Tab */}
        <TabsContent value="progress">
          <div className="space-y-4">
            {progressLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : inProgressCourses.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No courses in progress
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Start learning to track your progress here
                  </p>
                  <Link to={createPageUrl("Home")}>
                    <Button className="bg-[#1d69db] hover:bg-[#1557b8]">
                      Explore Courses
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              inProgressCourses.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-48 h-32 md:h-auto bg-gray-100 flex-shrink-0">
                          <img
                            src={
                              item.course_image ||
                              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80"
                            }
                            alt={item.course_title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <Badge variant="outline" className="mb-2 text-xs">
                                {item.course_category}
                              </Badge>
                              <h3 className="font-bold text-gray-900">
                                {item.course_title}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                <Clock className="w-3 h-3 inline mr-1" />
                                {item.course_duration}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  removeProgressMutation.mutate(item.id)
                                }
                                className="text-gray-400 hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-semibold text-[#1d69db]">
                                {getProgressPercentage(item)}%
                              </span>
                            </div>
                            <Progress
                              value={getProgressPercentage(item)}
                              className="h-2"
                            />
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <p className="text-xs text-gray-400">
                              Last accessed:{" "}
                              {item.last_accessed
                                ? format(
                                    new Date(item.last_accessed),
                                    "MMM d, yyyy"
                                  )
                                : "N/A"}
                            </p>
                            <Link
                              to={createPageUrl(
                                `CoursePage?id=${item.course_id}`
                              )}
                            >
                              <Button
                                size="sm"
                                className="bg-[#1d69db] hover:bg-[#1557b8]"
                              >
                                <Play className="w-4 h-4 mr-1" />
                                Continue
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </TabsContent>

        {/* Saved Courses Tab */}
        <TabsContent value="saved">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedCourses.length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="p-12 text-center">
                  <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No saved courses
                  </h3>
                  <p className="text-gray-500">Save courses to watch later</p>
                </CardContent>
              </Card>
            ) : (
              savedCourses.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={createPageUrl(`CoursePage?id=${item.course_id}`)}>
                    <Card className="group overflow-hidden hover:shadow-lg transition-all cursor-pointer h-full">
                      <div className="relative h-36 overflow-hidden">
                        <img
                          src={
                            item.course_image ||
                            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80"
                          }
                          alt={item.course_title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {item.course_category}
                        </Badge>
                        <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-[#1d69db]">
                          {item.course_title}
                        </h4>
                        <div className="flex items-center gap-1 mt-3 text-sm text-[#1d69db] font-medium">
                          Start Learning <ArrowRight className="w-4 h-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </TabsContent>

        {/* Bookmarks Tab */}
        <TabsContent value="bookmarks">
          <div className="space-y-3">
            {bookmarksLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : bookmarks.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No bookmarks yet
                  </h3>
                  <p className="text-gray-500">
                    Bookmark specific lessons to find them quickly
                  </p>
                </CardContent>
              </Card>
            ) : (
              bookmarks.map((bookmark, index) => (
                <motion.div
                  key={bookmark.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-orange-50">
                            <Bookmark className="w-5 h-5 text-[#ff6b35]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {bookmark.lesson_title}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {bookmark.course_title}
                            </p>
                            {bookmark.notes && (
                              <p className="text-sm text-gray-600 mt-2 italic">
                                "{bookmark.notes}"
                              </p>
                            )}
                            <p className="text-xs text-gray-400 mt-2">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              {bookmark.created_at &&
                                format(
                                  new Date(bookmark.created_at),
                                  "MMM d, yyyy"
                                )}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to={createPageUrl(
                              `CoursePage?id=${bookmark.course_id}`
                            )}
                          >
                            <Button size="sm" variant="outline">
                              Go to Lesson
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              deleteBookmarkMutation.mutate(bookmark.id)
                            }
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </TabsContent>

        {/* Completed Tab */}
        <TabsContent value="completed">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedCourses.length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="p-12 text-center">
                  <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No completed courses yet
                  </h3>
                  <p className="text-gray-500">
                    Complete courses to earn certificates
                  </p>
                </CardContent>
              </Card>
            ) : (
              completedCourses.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <div className="relative h-32 bg-gradient-to-br from-green-500 to-emerald-600">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Trophy className="w-12 h-12 text-white/80" />
                      </div>
                    </div>
                    <CardContent className="p-4 text-center">
                      <Badge className="bg-green-100 text-green-700 mb-2">
                        Completed
                      </Badge>
                      <h4 className="font-semibold text-gray-900">
                        {item.course_title}
                      </h4>
                      <Button className="mt-4 w-full" variant="outline">
                        View Certificate
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
