import { ProductDetailHero } from "@/components/premium/Products/ProductDetailHero";
import { ProductFeatures } from "@/components/premium/Products/ProductFeatures";
import { ProductSpecifications } from "@/components/premium/Products/ProductSpecifications";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { notFound } from "next/navigation";

async function getProduct(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products/${id}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string; id: string }> }) {
  const { id } = await params;

  // Get product from API (supports both ID and slug)
  const productData = await getProduct(id);

  if (!productData) {
    notFound();
  }

  // Format product data for components
  const product = {
    id: productData.id,
    name: productData.name,
    category: productData.category?.name || productData.category,
    price: productData.price,
    description: productData.description || `High-quality ${productData.name} designed for durability and style.`,
    images: productData.images?.length > 0 ? productData.images : [productData.image],
    features: productData.features?.length > 0 ? productData.features : [
      "Premium quality materials",
      "Weather-resistant design",
      "Extended warranty",
      "Modern aesthetics",
      "Easy installation",
      "Eco-friendly materials",
    ],
    specifications: {
      dimensions: productData.specifications?.dimensions || "Varies by model",
      weight: productData.specifications?.weight || "Varies by model",
      material: productData.specifications?.material || "Premium Materials",
      colors: productData.specifications?.color ? [productData.specifications.color] : ["Multiple Options Available"],
      capacity: productData.specifications?.capacity || "Varies by model",
      warranty: productData.specifications?.warranty || "5 years",
    },
    brochureUrl: productData.brochureUrl,
    inStock: productData.inStock !== false,
  };

  return (
    <>
      <Header />
      <main className="">
        <ProductDetailHero product={product} />
        {/* <ProductFeatures features={product.features} /> */}
        <ProductSpecifications specifications={product.specifications} />
        {/* <RelatedProducts currentProductId={id} /> */}
      </main>
      <Footer />
    </>
  );
}