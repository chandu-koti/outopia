import { ProductCategories } from "@/components/common/ProductCategories";

interface Brand {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  subtitle: string;
  description: string;
}

async function getBrands(): Promise<Brand[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/brands`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch brands');
    }

    return response.json();
  } catch (error) {
    return [];
  }
}

export async function DynamicBrandSections() {
  const brands = await getBrands();

  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <>
      {brands.map((brand) => (
        <ProductCategories
          key={brand.id}
          brand={brand.name}
          displayMode="card"
        />
      ))}
    </>
  );
}
