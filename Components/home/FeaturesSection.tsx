import React from "react";
import { motion } from "framer-motion";
import { Video, Users, Award, Clock, BookOpen, Headphones } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Live Online Classes",
    description: "Interactive sessions with industry experts and real-time Q&A",
  },
  {
    icon: Users,
    title: "World-Class Faculty",
    description:
      "Learn from professors at top universities and industry leaders",
  },
  {
    icon: Award,
    title: "Recognized Certifications",
    description: "Earn certificates from top universities and global companies",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description: "Self-paced courses with 24/7 access to learning materials",
  },
  {
    icon: BookOpen,
    title: "Hands-On Projects",
    description: "Apply your skills with real-world projects and case studies",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "Get help from mentors and career coaches throughout your journey",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[#1d69db] to-[#0f4c99]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Why Choose Simplilearn?
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Industry-leading learning experiences designed to accelerate your
            career
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-blue-100">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
