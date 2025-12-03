import { ProductCategories } from "@/components/common/ProductCategories";
import { brandsData } from "@/lib/data/brands";

export function DynamicBrandSections() {
  const brands = Object.values(brandsData);

  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <>
      {brands.map((brand: any) => (
        <ProductCategories
          key={brand.id}
          brand={brand.name}
          displayMode="card"
        />
      ))}
    </>
  );
}
