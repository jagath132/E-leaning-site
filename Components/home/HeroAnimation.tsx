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
} from "lucide-react";

const floatingIcons = [
  { icon: Code, color: "from-green-500 to-emerald-600", delay: 0 },
  { icon: Cloud, color: "from-blue-500 to-cyan-600", delay: 0.2 },
  { icon: Shield, color: "from-red-500 to-orange-600", delay: 0.4 },
  { icon: BarChart3, color: "from-yellow-500 to-amber-600", delay: 0.6 },
  { icon: Rocket, color: "from-pink-500 to-rose-600", delay: 0.8 },
  { icon: Zap, color: "from-cyan-500 to-blue-600", delay: 1.0 },
  { icon: Target, color: "from-indigo-500 to-purple-600", delay: 1.2 },
  { icon: TrendingUp, color: "from-emerald-500 to-green-600", delay: 1.4 },
  { icon: Award, color: "from-amber-500 to-yellow-600", delay: 1.6 },
];

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [radius, setRadius] = useState<number>(140);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const base = Math.min(rect.width, rect.height);
      const r = Math.max(80, Math.min(180, Math.floor(base * 0.28)));
      setRadius(r);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[500px]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#6366f1"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {floatingIcons.map((item, index) => {
          const count = floatingIcons.length;
          const angle = (index / count) * Math.PI * 2;

          const el = containerRef.current;
          const width = el?.clientWidth ?? 800;
          const height = el?.clientHeight ?? 500;
          const centerX = width / 2;
          const centerY = height / 2;

          const left = centerX + radius * Math.cos(angle);
          const top = centerY + radius * Math.sin(angle);

          return (
            <motion.div
              key={index}
              className={`absolute w-14 h-10 rounded-lg flex items-center justify-center shadow-lg bg-gradient-to-br ${item.color}`}
              style={{
                left: `${left}px`,
                top: `${top}px`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut",
              }}
            >
              <item.icon className="w-5 h-5 text-white" />
            </motion.div>
          );
        })}

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
            <Brain className="w-12 h-12 text-white" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
