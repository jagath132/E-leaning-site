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
  { icon: Code, delay: 0 },
  { icon: Cloud, delay: 0.15 },
  { icon: Shield, delay: 0.3 },
  { icon: BarChart3, delay: 0.45 },
  { icon: Rocket, delay: 0.6 },
  { icon: Zap, delay: 0.75 },
  { icon: Target, delay: 0.9 },
  { icon: TrendingUp, delay: 1.05 },
  { icon: Award, delay: 1.2 },
];

export default function HeroIconsPreview() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [radius, setRadius] = useState(120);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const compute = () => {
      const rect = el.getBoundingClientRect();
      const base = Math.min(rect.width, rect.height);
      setRadius(Math.max(60, Math.min(180, Math.floor(base * 0.25))));
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
    <div className="w-full flex items-center justify-center py-12">
      <div
        ref={ref}
        className="relative w-[780px] h-[420px] rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 shadow-lg"
      >
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid-preview"
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
            <rect width="100%" height="100%" fill="url(#grid-preview)" />
          </svg>
        </div>

        {floatingIcons.map((it, i) => {
          const count = floatingIcons.length;
          const angle = (i / count) * Math.PI * 2;
          const el = ref.current;
          const w = el?.clientWidth ?? 780;
          const h = el?.clientHeight ?? 420;
          const cx = w / 2;
          const cy = h / 2;
          const left = cx + radius * Math.cos(angle);
          const top = cy + radius * Math.sin(angle);

          const Icon = it.icon as any;

          return (
            <motion.div
              key={i}
              className="absolute w-12 h-12 rounded-full flex items-center justify-center shadow-md bg-white"
              style={{
                left: left + "px",
                top: top + "px",
                transform: "translate(-50%, -50%)",
              }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: it.delay,
                ease: "easeInOut",
              }}
            >
              <Icon className="w-6 h-6 text-indigo-600" />
            </motion.div>
          );
        })}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
            <Brain className="w-14 h-14 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
