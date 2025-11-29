import React from "react";
import MainHeader from "../Components/header/MainHeader";
import HeroSection from "../Components/home/HeroSection";
import PartnersSection from "../Components/home/PartnersSection";
import ProgramsSection from "../Components/home/ProgramsSection";
import StatsSection from "../Components/home/StatsSection";
import FeaturesSection from "../Components/home/FeaturesSection";
import TestimonialsSection from "../Components/home/TestimonialsSection";
import CTASection from "../Components/home/CTASection";
import MainFooter from "../Components/footer/MainFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <MainHeader />
      <HeroSection />
      <PartnersSection />
      <ProgramsSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <MainFooter />
    </div>
  );
}
