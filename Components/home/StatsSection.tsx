import { motion } from "framer-motion";
import { Users, Award, BookOpen, Briefcase } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "8M+",
    label: "Learners Worldwide",
    color: "text-blue-500",
  },
  {
    icon: Award,
    value: "1,500+",
    label: "Courses & Programs",
    color: "text-green-500",
  },
  {
    icon: BookOpen,
    value: "700+",
    label: "Live Classes Monthly",
    color: "text-purple-500",
  },
  {
    icon: Briefcase,
    value: "85%",
    label: "Career Growth",
    color: "text-orange-500",
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Millions
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join the world's largest professional learning community and advance
            your career
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-50 mb-4 ${stat.color}`}
              >
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
