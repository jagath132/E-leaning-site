import {
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  ArrowUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const footerLinks = {
  Programs: [
    "AI & Machine Learning",
    "Data Science",
    "Cloud Computing",
    "Cyber Security",
    "Project Management",
    "Digital Marketing",
  ],
  Company: [
    "About Us",
    "Careers",
    "Newsroom",
    "Alumni",
    "Partners",
    "Affiliates",
  ],
  Resources: [
    "Blog",
    "Free Courses",
    "Webinars",
    "Tutorials",
    "Reviews",
    "Salary Guide",
  ],
  Support: [
    "Help Center",
    "Contact Us",
    "Terms of Use",
    "Privacy Policy",
    "Cookie Policy",
    "Refund Policy",
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Youtube, href: "#" },
  { icon: Instagram, href: "#" },
];

export default function MainFooter() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b35]/10 to-[#1d69db]/10"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-[#ff6b35]/5 rounded-full blur-3xl"></div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-span-1 lg:col-span-2"
          >
            <motion.div
              className="text-2xl font-bold mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-white">simpli</span>
              <span className="text-[#ff6b35]">learn</span>
            </motion.div>
            <motion.p
              className="text-gray-300 mb-6 text-sm leading-relaxed"
              whileHover={{ scale: 1.02, color: "#e5e7eb" }}
              transition={{ duration: 0.2 }}
            >
              Simplilearn is one of the world's leading providers of online
              training for Digital Marketing, Cloud Computing, Project
              Management, Data Science, IT, Software Development, and many more
              emerging technologies.
            </motion.p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#1d69db] transition-all duration-300"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#1d69db",
                    boxShadow: "0 0 20px rgba(29, 105, 219, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(
            ([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-white font-semibold mb-4">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.4 + categoryIndex * 0.1 + linkIndex * 0.05,
                      }}
                      viewport={{ once: true }}
                    >
                      <motion.a
                        href="#"
                        className="text-gray-400 hover:text-white text-sm transition-all duration-300 flex items-center gap-2 group"
                        whileHover={{ x: 5, color: "#ffffff" }}
                      >
                        <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-[#ff6b35] transition-colors"></span>
                        {link}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          )}
        </div>
      </motion.div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-[#ff6b35] hover:bg-[#e55a2b] text-white rounded-full flex items-center justify-center shadow-lg z-50 transition-all duration-300"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showBackToTop ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
