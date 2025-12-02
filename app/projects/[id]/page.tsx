import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProjectDetailHero } from "@/components/projects/ProjectDetailHero";
import { ProjectOverview } from "@/components/projects/ProjectOverview";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectTestimonial } from "@/components/projects/ProjectTestimonial";
import { RelatedProjects } from "@/components/projects/RelatedProjects";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Fetch project data from API
async function getProject(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/projects`, {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    
    if (!res.ok) {
      return null;
    }
    
    const projects = await res.json();
    return projects.find((p: any) => p.slug === id || p.id === id);
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

// Fetch all projects for related projects
async function getAllProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/projects`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const project = await getProject(id);
  
  if (!project) {
    return {
      title: "Project Not Found | Infrascapes",
    };
  }

  return {
    title: `${project.name} | ${project.category} | Infrascapes`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = await getProject(id);
  
  if (!project) {
    notFound();
  }

  // Transform API data to match component expectations
  const transformedProject = {
    id: project.id,
    title: project.name,
    client: project.client,
    location: project.location,
    category: project.category,
    year: project.year,
    duration: project.area, // Using area as duration
    description: project.description,
    challenge: project.challenge,
    solution: project.solution,
    scope: project.features || [],
    images: {
      main: project.mainImage,
      gallery: project.images || []
    },
    testimonial: project.testimonial && project.testimonialAuthor ? {
      text: project.testimonial,
      author: project.testimonialAuthor.split(',')[0] || '',
      designation: project.testimonialAuthor.split(',')[1]?.trim() || ''
    } : undefined
  };

  // Get related projects
  const allProjects = await getAllProjects();
  const relatedProjects = allProjects
    .filter((p: any) => p.category === project.category && p.id !== project.id)
    .slice(0, 3)
    .map((p: any) => ({
      id: p.id,
      title: p.name,
      client: p.client,
      location: p.location,
      category: p.category,
      year: p.year,
      duration: p.area,
      description: p.description,
      challenge: p.challenge,
      solution: p.solution,
      scope: p.features || [],
      images: {
        main: p.mainImage,
        gallery: p.images || []
      }
    }));

  return (
    <>
      <Header />
      <main className="pt-20">
        <ProjectDetailHero project={transformedProject} />
        <ProjectOverview project={transformedProject} />
        <ProjectGallery project={transformedProject} />
        {transformedProject.testimonial && <ProjectTestimonial testimonial={transformedProject.testimonial} />}
        {relatedProjects.length > 0 && <RelatedProjects projects={relatedProjects} />}
      </main>
      <Footer />
    </>
  );
}