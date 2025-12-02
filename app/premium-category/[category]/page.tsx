"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { CategoryHero } from "@/components/premium/Products/CategoryHero";
import { ProductGrid } from "@/components/premium/Products/ProductGrid";
import { ProductFilters } from "@/components/premium/Products/ProductFilters";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const categorySlug = params.category as string;
  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategoryData();
  }, [categorySlug]);

  useEffect(() => {
    // Apply filters when search params change
    const subcategoryFilter = searchParams.get('subcategory');
    if (subcategoryFilter) {
      const subcategories = subcategoryFilter.split(',');
      const filtered = products.filter(p => 
        p.subcategory && subcategories.includes(p.subcategory.slug)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchParams, products]);

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      
      // Fetch category info
      const categoryRes = await fetch('/api/categories');
      if (!categoryRes.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const categories = await categoryRes.json();
      const categoryInfo = categories.find((c: any) => c.slug === categorySlug);
      
      if (!categoryInfo) {
        setError('Category not found');
        return;
      }

      // Fetch products for this category
      const productsRes = await fetch(`/api/products?categorySlug=${categorySlug}`);
      if (!productsRes.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const productsData = await productsRes.json();
      
      setCategory({
        title: categoryInfo.name,
        description: categoryInfo.description,
        image: categoryInfo.image,
      });
      
      setProducts(productsData);
      setFilteredProducts(productsData);
    } catch (error) {
      console.error('Error fetching category data:', error);
      setError('Failed to load category data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !category) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {error || 'Category not found'}
            </h1>
            <a
              href="/products/outopia"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
            >
              Browse All Categories
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Temporarily show coming soon page
  const showComingSoon = false;

  if (showComingSoon) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container text-center py-20">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                Coming Soon
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We're working hard to bring you our premium {category.title} collection.
                Stay tuned for an exceptional range of outdoor furniture and equipment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/products/outopia"
                  className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Browse All Categories
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </div>
              <div className="mt-12 p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Get Notified When We Launch
                </h3>
                <p className="text-gray-600">
                  Contact our sales team to learn more about our upcoming {category.title} products.
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Map products to the format expected by ProductGrid
  const productData = filteredProducts.map((p: any) => ({
    id: p.slug || p.id,
    name: p.name,
    price: p.price,
    image: p.image,
    subcategory: p.subcategory
  }));

  return (
    <>
      <Header />
      <main className="">
        <CategoryHero
          title={category.title}
          description={category.description}
          image={category.image}
        />
        <ProductFilters categorySlug={categorySlug} />
        <ProductGrid products={productData} />
      </main>
      <Footer />
    </>
  );
}