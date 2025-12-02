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

function getBrandData(brandSlug: string) {
  // Always use static data - no API calls during build or runtime
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
