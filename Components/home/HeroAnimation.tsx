import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Code,
  Cloud,
  Shield,
  BarChart3,
  Rocket,
  Zap,
  Target,
  TrendingUp,
  Award,
  Users,
  BookOpen,
  Globe,
} from "lucide-react";

const serviceIcons = [
  {
    icon: Code,
    label: "Software Dev",
    color: "from-green-500 to-emerald-600",
    delay: 0,
    category: "Development",
  },
  {
    icon: Cloud,
    label: "Cloud Computing",
    color: "from-blue-500 to-cyan-600",
    delay: 0.2,
    category: "Infrastructure",
  },
  {
    icon: Shield,
    label: "Cyber Security",
    color: "from-red-500 to-orange-600",
    delay: 0.4,
    category: "Security",
  },
  {
    icon: BarChart3,
    label: "Data Science",
    color: "from-yellow-500 to-amber-600",
    delay: 0.6,
    category: "Analytics",
  },
  {
    icon: Rocket,
    label: "AI & ML",
    color: "from-pink-500 to-rose-600",
    delay: 0.8,
    category: "AI",
  },
  {
    icon: Zap,
    label: "Digital Marketing",
    color: "from-cyan-500 to-blue-600",
    delay: 1.0,
    category: "Marketing",
  },
  {
    icon: Target,
    label: "Project Mgmt",
    color: "from-indigo-500 to-purple-600",
    delay: 1.2,
    category: "Management",
  },
  {
    icon: TrendingUp,
    label: "Business Analysis",
    color: "from-emerald-500 to-green-600",
    delay: 1.4,
    category: "Business",
  },
  {
    icon: Award,
    label: "Certifications",
    color: "from-amber-500 to-yellow-600",
    delay: 1.6,
    category: "Certification",
  },
  {
    icon: Users,
    label: "Leadership",
    color: "from-purple-500 to-pink-600",
    delay: 1.8,
    category: "Leadership",
  },
  {
    icon: BookOpen,
    label: "Learning",
    color: "from-teal-500 to-cyan-600",
    delay: 2.0,
    category: "Education",
  },
  {
    icon: Globe,
    label: "Global Reach",
    color: "from-orange-500 to-red-600",
    delay: 2.2,
    category: "Global",
  },
];

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [radius, setRadius] = useState<number>(140);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const base = Math.min(rect.width, rect.height);
      const r = Math.max(100, Math.min(200, Math.floor(base * 0.35)));
      setRadius(r);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    window.addEventListener("resize", compute);
    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[500px] cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Interactive service icons */}
        {serviceIcons.map((item, index) => {
          const count = serviceIcons.length;
          const angle = (index / count) * Math.PI * 2;

          const el = containerRef.current;
          const width = el?.clientWidth ?? 800;
          const height = el?.clientHeight ?? 500;
          const centerX = width / 2;
          const centerY = height / 2;

          // Add mouse interaction offset
          const mouseInfluence = hoveredIndex === index ? 0.1 : 0.05;
          const mouseOffsetX = (mousePosition.x - centerX) * mouseInfluence;
          const mouseOffsetY = (mousePosition.y - centerY) * mouseInfluence;

          const left = centerX + radius * Math.cos(angle) + mouseOffsetX;
          const top = centerY + radius * Math.sin(angle) + mouseOffsetY;

          return (
            <motion.div
              key={index}
              className={`absolute rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br ${item.color} cursor-pointer group`}
              style={{
                left: `${left}px`,
                top: `${top}px`,
                transform: "translate(-50%, -50%)",
                width: hoveredIndex === index ? "80px" : "60px",
                height: hoveredIndex === index ? "60px" : "50px",
              }}
              animate={{
                scale: hoveredIndex === index ? 1.1 : [1, 1.05, 1],
                rotate: hoveredIndex === index ? 5 : 0,
              }}
              transition={{
                duration: hoveredIndex === index ? 0.3 : 2,
                repeat: hoveredIndex === index ? 0 : Infinity,
                delay: item.delay,
                ease: "easeInOut",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="w-6 h-6 text-white" />
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10"
                >
                  {item.label}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                </motion.div>
              )}
            </motion.div>
          );
        })}

        {/* Central interactive hub */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="relative">
            <div className="w-28 h-28 bg-gradient-to-br from-purple-500 via-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
              <Brain className="w-14 h-14 text-white" />
            </div>
            {/* Pulsing rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-purple-400/50"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-blue-400/30"
              animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
          </div>
        </motion.div>

        {/* Service categories floating text */}
        <motion.div
          className="absolute top-4 left-4 text-xs font-medium text-gray-600 bg-white/80 px-3 py-1 rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Interactive Learning Hub
        </motion.div>

        <motion.div
          className="absolute bottom-4 right-4 text-xs font-medium text-gray-600 bg-white/80 px-3 py-1 rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        >
          1500+ Courses Available
        </motion.div>
      </div>
    </div>
  );
}
