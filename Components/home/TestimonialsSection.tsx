import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Data Scientist at Google",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content:
      "The AI & Machine Learning program completely transformed my career. Within 6 months of completing the certification, I landed my dream job at Google. The hands-on projects were invaluable.",
    rating: 5,
    program: "AI & Machine Learning",
  },
  {
    name: "Michael Chen",
    role: "Project Manager at Amazon",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    content:
      "The PMP certification training was comprehensive and well-structured. The live classes and exam prep materials helped me pass the PMP exam on my first attempt. Highly recommend!",
    rating: 5,
    program: "PMP Certification",
  },
  {
    name: "Emily Rodriguez",
    role: "Cloud Architect at Microsoft",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content:
      "Simplilearn's cloud computing program gave me the skills I needed to transition from a traditional IT role to cloud architecture. The AWS and Azure certifications opened so many doors.",
    rating: 5,
    program: "Cloud Computing",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hear from learners who transformed their careers with Simplilearn
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-[#1d69db]"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <Quote className="w-8 h-8 text-[#1d69db] mb-4 mx-auto md:mx-0" />
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    "{testimonials[current].content}"
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonials[current].name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {testimonials[current].role}
                    </p>
                    <p className="text-[#1d69db] text-sm font-medium mt-1">
                      {testimonials[current].program}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={prev}
              variant="outline"
              size="icon"
              className="rounded-full border-2 border-gray-300 hover:border-[#1d69db] hover:text-[#1d69db]"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === current
                      ? "bg-[#1d69db] w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
            <Button
              onClick={next}
              variant="outline"
              size="icon"
              className="rounded-full border-2 border-gray-300 hover:border-[#1d69db] hover:text-[#1d69db]"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
