import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProjectsHero } from "@/components/projects/ProjectsHero";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { ProjectStats } from "@/components/projects/ProjectStats";

export const metadata: Metadata = {
  title: "Projects Portfolio | Transforming Outdoor Spaces | Infrascapes",
  description: "Explore our portfolio of successful outdoor transformations across India. From corporate campuses to public parks, see how we bring visions to life.",
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <ProjectsHero />
        <ProjectStats />
        <ProjectsGrid />
      </main>
      <Footer />
    </>
  );
}