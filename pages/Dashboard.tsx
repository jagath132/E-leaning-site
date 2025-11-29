import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import MainHeader from "../Components/header/MainHeader";
import MainFooter from "../Components/footer/MainFooter";
import LearningDashboard from "../Components/dashboard/LearningDashboard";
import RecommendationEngine from "../Components/course/RecommendationEngine";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  Bell,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [user, setUser] = useState<{
    id: string;
    full_name: string;
    email: string;
  } | null>(null);

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

  const { data: courseViews = [] } = useQuery({
    queryKey: ["courseViews"],
    queryFn: () => base44.entities.CourseView.list("-view_count"),
  });

  // Get most viewed category for personalized greeting
  const topCategory =
    courseViews.length > 0
      ? courseViews.reduce((acc: Record<string, number>, view) => {
          if (view.course_category) {
            acc[view.course_category] =
              (acc[view.course_category] || 0) + (view.view_count || 0);
          }
          return acc;
        }, {})
      : {};

  const favoriteCategory = Object.entries(topCategory).sort(
    (a: [string, number], b: [string, number]) => b[1] - a[1]
  )[0]?.[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1d69db] to-[#0f4c99] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <GraduationCap className="w-8 h-8" />
              </motion.div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl lg:text-3xl font-bold"
                >
                  Welcome back
                  {user?.full_name ? `, ${user.full_name.split(" ")[0]}` : ""}!
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-blue-100 mt-1"
                >
                  {favoriteCategory
                    ? `Continue your journey in ${favoriteCategory}`
                    : "Ready to continue learning?"}
                </motion.p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Bell className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { icon: Target, label: "Set Goals", desc: "Track your progress" },
              {
                icon: Sparkles,
                label: "AI Tutor",
                desc: "Get personalized help",
              },
              {
                icon: GraduationCap,
                label: "Certificates",
                desc: "View earned certs",
              },
              { icon: User, label: "Profile", desc: "Update your info" },
            ].map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/20">
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{action.label}</p>
                      <p className="text-xs text-blue-100">{action.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Learning Dashboard - Main Content */}
          <div className="lg:col-span-2">
            <LearningDashboard />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Personalized Recommendations */}
            <Card>
              <CardContent className="p-6">
                <RecommendationEngine
                  currentCourseId=""
                  currentCategory={favoriteCategory || ""}
                />
              </CardContent>
            </Card>

            {/* Learning Streak */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Learning Streak</p>
                    <p className="text-4xl font-bold mt-1">7 Days</p>
                  </div>
                  <div className="text-5xl">🔥</div>
                </div>
                <p className="text-sm text-orange-100 mt-4">
                  Keep it up! You're on a roll.
                </p>
              </div>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">
                  Upcoming Live Classes
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "AI Fundamentals Q&A",
                      time: "Today, 3:00 PM",
                      instructor: "Dr. Smith",
                    },
                    {
                      title: "Project Review Session",
                      time: "Tomorrow, 10:00 AM",
                      instructor: "Prof. Johnson",
                    },
                    {
                      title: "Career Workshop",
                      time: "Fri, 2:00 PM",
                      instructor: "Career Team",
                    },
                  ].map((event, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-5 h-5 text-[#1d69db]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {event.title}
                        </p>
                        <p className="text-xs text-gray-500">{event.time}</p>
                        <p className="text-xs text-gray-400">
                          {event.instructor}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Events
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
