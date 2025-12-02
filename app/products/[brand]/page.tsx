import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductHero } from "@/components/common/ProductHero";
import { ProductCategories } from "@/components/common/ProductCategories";
import { notFound } from "next/navigation";
import { brandsData } from "@/lib/data/brands";

// Helper function to generate slug from brand name
const generateSlug = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

async function getBrandData(brandSlug: string) {
  // Always use static data during build
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return Object.values(brandsData).find((b: any) => {
      const slug = generateSlug(b.name || b.id);
      return slug === brandSlug || (b.id && b.id === brandSlug);
    }) || null;
  }

  // In production, try to fetch from API
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_API_URL) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/brands`,
        { next: { revalidate: 60 } } // Cache for 60 seconds
      );

      if (res.ok) {
        const brands = await res.json();
        const brandList: any[] = Array.isArray(brands) ? brands : [];
        
        const brandData = brandList.find((b: any) => {
          const slug = generateSlug(b.name || b.id);
          return slug === brandSlug || (b.id && b.id === brandSlug);
        });

        if (brandData) return brandData;
      }
    } catch (error) {
      console.error('Error fetching brand from API:', error);
      // Continue to fallback
    }
  }

  // Fallback to static data
  return Object.values(brandsData).find((b: any) => {
    const slug = generateSlug(b.name || b.id);
    return slug === brandSlug || (b.id && b.id === brandSlug);
  }) || null;
}

export default async function BrandProductsPage({
  params
}: {
  params: Promise<{ brand: string }>
}) {
  const { brand } = await params;

  // Validate brand exists via API using slug
  const brandData = await getBrandData(brand);
  // If not found in API, continue with static data without 404

  return (
    <>
      <Header />
      <main>
        <ProductHero brandId={(brandData?.name || brand)} />
        <ProductCategories brand={(brandData?.name || brand)} displayMode="detailed" showHeader={false} />
      </main>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  // Use static data to generate params during build
  return Object.values(brandsData).map((brand: any) => ({
    brand: generateSlug(brand.name || brand.id)
  }));
}

// Ensure the page is statically generated at build time
export const dynamicParams = false; // Return 404 for unknown routes
export const revalidate = 60; // Revalidate every 60 seconds
