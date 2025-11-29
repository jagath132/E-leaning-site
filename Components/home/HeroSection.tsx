import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HeroAnimation from "./HeroAnimation";

const slides = [
  {
    title: "Get Certified.",
    subtitle: "Get Ahead.",
    stats: [
      { value: "8 Million+", label: "Careers advanced" },
      { value: "1,500", label: "Live classes every month" },
      { value: "85%", label: "Report career benefits" },
    ],
    cta1: "Explore Programs",
    cta2: "Try Simplilearn for Business",
  },
  {
    title: "Be a Leader",
    subtitle: "in Your Field",
    description: "Change, Adapt and Build with AI",
    stats: [],
    cta1: "Explore Programs",
    cta2: null,
  },
  {
    title: "Unlock Unlimited",
    subtitle: "Live Classes",
    stats: [
      { value: "700+", label: "Live classes monthly" },
      { value: "550+", label: "Learning solutions" },
      { value: "100+", label: "Hands-on projects" },
    ],
    cta1: "Explore Learning Hub+",
    cta2: null,
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[500px] lg:min-h-[600px] py-12 lg:py-0">
          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="z-10"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {slide.title}
                <br />
                <span className="text-gray-900">{slide.subtitle}</span>
              </h1>

              {slide.description && (
                <p className="mt-4 text-xl text-gray-600">
                  {slide.description}
                </p>
              )}

              {slide.stats.length > 0 && (
                <div className="mt-8 space-y-3">
                  {slide.stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#1d69db]" />
                      <span className="text-gray-700">
                        <strong className="text-gray-900">{stat.value}</strong>{" "}
                        {stat.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#1d69db] hover:bg-[#1557b8] text-white rounded-full px-8 py-6 text-lg font-medium shadow-lg shadow-blue-200 hover:shadow-xl transition-all">
                  {slide.cta1}
                </Button>
                {slide.cta2 && (
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-6 text-lg font-medium border-2 border-gray-300 hover:border-[#1d69db] hover:text-[#1d69db]"
                  >
                    {slide.cta2}
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Animated Right Side */}
          <div className="relative hidden lg:block">
            <HeroAnimation />
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-[#1d69db] w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
