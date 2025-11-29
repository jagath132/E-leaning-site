import React from "react";
import { motion } from "framer-motion";

const partners = [
  {
    name: "Michigan Engineering",
    logo: "https://www.simplilearn.com/ice9/university/UniversityLogo-Colored48px.svgz",
  },
  {
    name: "Purdue University",
    logo: "https://www.simplilearn.com/ice9/labels/Purdue_Home.svg",
  },
  {
    name: "Google",
    logo: "https://www.simplilearn.com/ice9/labels/Google_Home.svg",
  },
  {
    name: "PMI",
    logo: "https://www.simplilearn.com/ice9/accreditation_images/Category_Logos/PMI_48px.svgz",
  },
  {
    name: "AWS Partner",
    logo: "https://www.simplilearn.com/ice9/labels/AWS_Home.svg",
  },
  {
    name: "Microsoft",
    logo: "https://www.simplilearn.com/ice9/labels/Miscrosoft_Home.svg",
  },
  {
    name: "IBM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  },
  {
    name: "UC San Diego",
    logo: "https://www.simplilearn.com/ice9/university/UC_San_Diego_megamenu_48px.svgz",
  },
  {
    name: "Scrum Alliance",
    logo: "https://www.simplilearn.com/ice9/labels/REA_Scrum_alliance_40Px.jpg",
  },
  {
    name: "Scaled Agile",
    logo: "https://www.simplilearn.com/ice9/Safe%20Platinum%20Partner%20Logo/Scaled48.svgz",
  },
  {
    name: "Virginia Tech",
    logo: "https://www.simplilearn.com/ice9/university/Virginia_48px.svgz",
  },
];

export default function PartnersSection() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-xl font-semibold text-gray-800 mb-10"
        >
          Partnering with the world's leading universities and companies
        </motion.h2>

        <div className="relative overflow-hidden">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          <motion.div
            className="flex gap-16 items-center"
            animate={{ x: [0, -1500] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 flex items-center justify-center h-16 min-w-[140px] grayscale hover:grayscale-0 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-10 w-auto object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.parentElement.innerHTML = `<span class="font-semibold text-gray-600">${partner.name}</span>`;
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
