import React from "react";
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react";

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
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="text-2xl font-bold mb-4">
              <span className="text-white">simpli</span>
              <span className="text-[#ff6b35]">learn</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Simplilearn is one of the world's leading providers of online
              training for Digital Marketing, Cloud Computing, Project
              Management, Data Science, IT, Software Development, and many more
              emerging technologies.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#1d69db] transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 Simplilearn. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
