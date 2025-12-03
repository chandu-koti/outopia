import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedHeroSection } from "@/components/home/AnimatedHeroSection";
import { DynamicBrandSections } from "@/components/home/DynamicBrandSections";
import { ValueProposition } from "@/components/home/ValueProposition";
import { AnimatedProductCategories } from "@/components/home/AnimatedProductCategories";
import { DynamicFeaturedProjects } from "@/components/home/DynamicFeaturedProjects";
import { DesignBuildProcess } from "@/components/home/DesignBuildProcess";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Header />
      <AnimatedHeroSection />
      <DynamicBrandSections />
      <ValueProposition />
      <AnimatedProductCategories 
        title="Our Products"
        subtitle="Explore our premium collection of outdoor furniture and equipment"
      />
      <DynamicFeaturedProjects />
      <DesignBuildProcess />
      <CTASection />
      <Footer />
    </>
  );
}