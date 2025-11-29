import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection() {
  const handleExplorePrograms = () => {
    // Scroll to programs section
    const programsSection = document.getElementById("programs-section");
    if (programsSection) {
      programsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTalkToAdvisor = () => {
    // For now, show an alert. In a real app, this would open a contact modal or navigate to contact page
    alert("Contact form coming soon! Please reach out to our support team.");
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-[#1d69db] to-[#0f4c99] rounded-3xl p-8 lg:p-16 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-white text-sm font-medium">
                Start Your Learning Journey Today
              </span>
            </div>

            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Transform Your Career?
            </h2>

            <p className="text-xl text-blue-100 mb-10">
              Join 8 million+ professionals who have advanced their careers with
              our industry-leading programs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleExplorePrograms}
                className="bg-white text-[#1d69db] hover:bg-[#1d69db] hover:text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                Explore All Programs
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={handleTalkToAdvisor}
                className="bg-blue-50 text-[#1d69db] hover:bg-[#1d69db] hover:text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                Talk to an Advisor
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
