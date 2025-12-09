import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, BookOpen, Award, Users, TrendingUp } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Only enable mouse tracking on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;
      container.style.setProperty("--mouse-x", `${x}%`);
      container.style.setProperty("--mouse-y", `${y}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const highlights = [
    {
      icon: BookOpen,
      title: "1000+ Courses",
      description: "Expert-led courses in tech, business & more",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: Award,
      title: "Industry Certifications",
      description: "Get certified by top organizations",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Live Mentorship",
      description: "Learn from industry professionals",
      color: "from-orange-500 to-yellow-400"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Boost your career with in-demand skills",
      color: "from-green-500 to-emerald-400"
    }
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 92, 246, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)
        `,
      }}
    >
      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-br from-pink-500/40 to-purple-600/40 blur-[80px] sm:blur-[100px] md:blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-0 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br from-blue-500/40 to-cyan-400/40 blur-[80px] sm:blur-[100px] md:blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-500/30 blur-[60px] sm:blur-[80px] md:blur-[100px]"
      />

      {/* Floating Particles - Reduced on mobile */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            top: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-white/30 rounded-full blur-sm hidden sm:block"
          style={{ willChange: 'top, left' }}
        />
      ))}

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="absolute top-3 left-3 sm:top-6 sm:left-6 z-20"
      >
        <Link
          to="/"
          className="flex items-center gap-1.5 sm:gap-2 text-white/90 hover:text-white transition-all bg-white/10 hover:bg-white/20 px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-full backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl hover:scale-105 duration-150"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm font-medium">Back to Home</span>
        </Link>
      </motion.div>

      {/* Main Container with Card and Highlights */}
      <div className="relative z-10 w-full max-w-6xl mx-3 sm:mx-4 flex items-center justify-center gap-8 flex-col lg:flex-row py-4 sm:py-0">
        {/* E-Learning Highlights - Hidden on mobile, shown on large screens */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          className="hidden lg:block flex-1 max-w-md"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-white mb-6 flex items-center gap-3"
          >
            <Sparkles className="w-8 h-8 text-yellow-300" />
            Why Choose Simplilearn?
          </motion.h2>
          <div className="space-y-4">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + index * 0.05 }}
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${highlight.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <highlight.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {highlight.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-md p-5 sm:p-6 md:p-8 bg-white/95 backdrop-blur-2xl border border-white/40 rounded-2xl sm:rounded-3xl shadow-2xl"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-1 -left-1 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-2xl opacity-40" />
          <div className="absolute -bottom-1 -right-1 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full blur-2xl opacity-40" />

          <div className="relative text-center mb-6 sm:mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg"
            >
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-1.5 sm:mb-2 tracking-tight"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-slate-600 text-xs sm:text-sm"
            >
              {subtitle}
            </motion.p>
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
