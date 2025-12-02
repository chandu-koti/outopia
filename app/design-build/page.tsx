import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServiceHero } from "@/components/design-build/ServiceHero";
import { ProcessSection } from "@/components/design-build/ProcessSection";
import { ServiceCategories } from "@/components/design-build/ServiceCategories";
import { ServiceCTA } from "@/components/design-build/ServiceCTA";
import { FAQSection } from "@/components/design-build/FAQSection";

export const metadata: Metadata = {
  title: "Design-Build Services | Complete Outdoor Solutions | Infrascapes",
  description: "End-to-end design-build services for outdoor spaces. From concept to installation, our integrated team delivers seamless project execution.",
};

export default function DesignBuildPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <ServiceHero />
        <ProcessSection />
        <ServiceCategories />
        <FAQSection />
        <ServiceCTA />
      </main>
      <Footer />
    </>
  );
}