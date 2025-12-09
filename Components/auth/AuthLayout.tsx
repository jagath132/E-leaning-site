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
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-500/40 to-purple-600/40 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/40 to-cyan-400/40 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-500/30 blur-[100px]"
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            x: [null, Math.random() * window.innerWidth],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute w-2 h-2 bg-white/30 rounded-full blur-sm"
        />
      ))}

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-6 left-6 z-20"
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-white/90 hover:text-white transition-all bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-full backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl hover:scale-105 duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </motion.div>

      {/* Main Container with Card and Highlights */}
      <div className="relative z-10 w-full max-w-6xl mx-4 flex items-center justify-center gap-8 flex-col lg:flex-row">
        {/* E-Learning Highlights - Hidden on mobile, shown on large screens */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="hidden lg:block flex-1 max-w-md"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
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
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
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
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md p-8 bg-white/95 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-1 -left-1 w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-2xl opacity-40" />
          <div className="absolute -bottom-1 -right-1 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full blur-2xl opacity-40" />

          <div className="relative text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2 tracking-tight"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-slate-600 text-sm"
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
