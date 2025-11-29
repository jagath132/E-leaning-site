import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Course } from "@/api/base44Client";

export default function ProgramCard({
  program,
  index,
}: {
  program: Course;
  index: number;
}) {
  const partnerColors: Record<string, string> = {
    Purdue: "bg-amber-100 text-amber-800",
    Michigan: "bg-blue-100 text-blue-800",
    "Virginia Tech": "bg-orange-100 text-orange-800",
    Google: "bg-green-100 text-green-800",
    PMI: "bg-purple-100 text-purple-800",
    default: "bg-gray-100 text-gray-800",
  };

  const getPartnerColor = (partner: string) => {
    return partnerColors[partner] || partnerColors.default;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={createPageUrl(`CoursePage?id=${program.id}`)}>
        <Card className="group h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white">
          {/* Image */}
          <div className="relative h-44 overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700">
            <img
              src={
                program.image_url ||
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80"
              }
              alt={program.title}
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Partner Badge */}
            {program.partner && (
              <div className="absolute bottom-4 left-4">
                <Badge
                  className={`${getPartnerColor(
                    program.partner
                  )} px-3 py-1 text-xs font-semibold`}
                >
                  {program.partner}
                </Badge>
              </div>
            )}

            {program.is_popular && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-[#ff6b35] text-white px-3 py-1 text-xs font-semibold">
                  Popular
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <CardContent className="p-5">
            <h3 className="font-bold text-gray-900 text-lg leading-tight mb-4 group-hover:text-[#1d69db] transition-colors line-clamp-2 min-h-[3.5rem]">
              {program.title}
            </h3>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>
                  Duration:{" "}
                  <strong className="text-gray-800">{program.duration}</strong>
                </span>
              </div>
              {program.cohort_start && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>
                    Cohort Starts:{" "}
                    <strong className="text-gray-800">
                      {program.cohort_start}
                    </strong>
                  </span>
                </div>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100">
              <span className="text-[#1d69db] font-semibold text-sm group-hover:underline">
                View Program →
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
