import { motion } from "framer-motion";
import {
  Video,
  Users,
  Award,
  Clock,
  BookOpen,
  Headphones,
  TrendingUp,
  Star,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Live Interactive Classes",
    description:
      "Engage with industry experts in real-time sessions with live Q&A and interactive discussions",
    stat: "700+",
    statLabel: "Monthly Classes",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Expert Faculty",
    description:
      "Learn from professors at top universities and industry leaders with decades of experience",
    stat: "500+",
    statLabel: "Expert Instructors",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Award,
    title: "Industry Recognized",
    description:
      "Earn certifications from top universities and global companies valued by employers worldwide",
    stat: "1500+",
    statLabel: "Certifications",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description:
      "Self-paced courses with 24/7 access to learning materials and lifetime access to content",
    stat: "24/7",
    statLabel: "Access",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: BookOpen,
    title: "Practical Projects",
    description:
      "Apply skills with real-world projects, case studies, and hands-on assignments",
    stat: "100+",
    statLabel: "Projects",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Headphones,
    title: "Personal Support",
    description:
      "Get dedicated help from mentors, career coaches, and learning advisors throughout your journey",
    stat: "1-on-1",
    statLabel: "Mentorship",
    gradient: "from-teal-500 to-blue-500",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-[#1d69db] to-[#0f4c99] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/5 to-transparent rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">Trusted by Millions</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              E-Learning
            </span>
            ?
          </h2>

          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
            Join the world's leading online learning platform and transform your
            career with industry-leading programs designed by experts
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Card Background with Gradient Border */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl`}
              ></div>

              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 h-full border border-white/20 group-hover:border-white/40 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-blue-500/25 flex flex-col">
                {/* Icon and Stat Badge Row */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} group-hover:scale-110 transition-transform duration-500`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Stat Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-white font-semibold text-sm">
                      {feature.stat} {feature.statLabel}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-500">
                  {feature.title}
                </h3>

                <p className="text-blue-100 leading-relaxed mb-4 flex-grow">
                  {feature.description}
                </p>

                {/* Hover Indicator */}
                <div className="flex items-center gap-2 text-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-auto">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium">Learn More</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
