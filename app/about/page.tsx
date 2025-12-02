import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { CompanyStory } from "@/components/about/CompanyStory";
import { MissionVisionValues } from "@/components/about/MissionVisionValues";
import { TeamSection } from "@/components/about/TeamSection";
import { Timeline } from "@/components/about/Timeline";
import { WhyChooseUs } from "@/components/about/WhyChooseUs";
import { CertificationsAwards } from "@/components/about/CertificationsAwards";

export const metadata: Metadata = {
  title: "About Us | Infrascapes - Crafting Outdoor Excellence",
  description: "Learn about Infrascapes' journey, mission, and team. Premium outdoor furniture manufacturer and design-build company serving India since 2023.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <AboutHero />
        <CompanyStory />
        <MissionVisionValues />
        <TeamSection />
        {/* <Timeline /> */}
        <WhyChooseUs />
        {/* <CertificationsAwards /> */}
      </main>
      <Footer />
    </>
  );
}