"use client";

import { useState, useEffect, useRef } from "react";
import { Container } from "../Layout/Container";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Package, X } from "lucide-react";

interface ProductFiltersProps {
  categorySlug?: string;
}

export function ProductFilters({ categorySlug }: ProductFiltersProps) {
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (categorySlug) {
      fetchSubcategories();
    }
  }, [categorySlug]);

  useEffect(() => {
    // Set selected subcategory from URL params
    const subcategoryParam = searchParams.get('subcategory');
    if (subcategoryParam) {
      setSelectedSubcategory(subcategoryParam);
    } else {
      setSelectedSubcategory('all');
    }
  }, [searchParams]);

  useEffect(() => {
    checkScrollButtons();
    // Add event listener for scroll
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, [subcategories]);

  const fetchSubcategories = async () => {
    try {
      // First get the category ID from the slug
      const categoryRes = await fetch(`/api/categories`);
      const categories = await categoryRes.json();
      const category = categories.find((c: any) => c.slug === categorySlug);
      
      if (category) {
        // Fetch subcategories for this category
        const subcategoriesRes = await fetch(`/api/subcategories?categoryId=${category.id}`);
        const subcategoriesData = await subcategoriesRes.json();
        setSubcategories(Array.isArray(subcategoriesData) ? subcategoriesData : []);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setSubcategories([]);
    }
  };

  const handleSubcategoryChange = (value: string) => {
    setSelectedSubcategory(value);
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== 'all') {
      params.set('subcategory', value);
    } else {
      params.delete('subcategory');
    }
    
    // Update URL with the selected subcategory
    router.push(`?${params.toString()}`);
  };

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 320; // Width of approximately one card
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  // Calculate total products including "All"
  const totalProducts = subcategories.reduce((sum, sub) => sum + (sub._count?.products || 0), 0);

  // Don't render if no subcategories
  if (subcategories.length === 0) {
    return null;
  }

  return (
    <div className="py-8 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Filter by Type</h3>
              <p className="text-sm text-gray-500 mt-1">
                Choose a category to explore specific products
              </p>
            </div>
            {selectedSubcategory && selectedSubcategory !== 'all' && (
              <button
                onClick={() => handleSubcategoryChange('all')}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all"
              >
                <X className="w-4 h-4" />
                Clear filter
              </button>
            )}
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Scroll Button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4 bg-white shadow-lg rounded-full p-2 hover:shadow-xl transition-all hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}

          {/* Right Scroll Button */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4 bg-white shadow-lg rounded-full p-2 hover:shadow-xl transition-all hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          )}

          {/* Scrollable Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* All Products Card */}
            <button
              onClick={() => handleSubcategoryChange('all')}
              className={`flex-shrink-0 w-72 sm:w-80 group transition-all duration-300 ${
                selectedSubcategory === 'all' ? 'scale-105' : 'hover:scale-105'
              }`}
            >
              <div
                className={`relative h-32 rounded-xl overflow-hidden transition-all duration-300 ${
                  selectedSubcategory === 'all'
                    ? 'ring-2 ring-emerald-500 shadow-xl'
                    : 'shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  selectedSubcategory === 'all'
                    ? 'from-emerald-500 to-emerald-600'
                    : 'from-gray-100 to-gray-200 group-hover:from-emerald-50 group-hover:to-emerald-100'
                }`} />
                
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)`
                  }} />
                </div>

                {/* Content */}
                <div className="relative h-full p-6 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className={`text-lg font-bold ${
                        selectedSubcategory === 'all' ? 'text-white' : 'text-gray-800'
                      }`}>
                        All Products
                      </h4>
                      <p className={`text-sm mt-1 ${
                        selectedSubcategory === 'all' ? 'text-emerald-100' : 'text-gray-600'
                      }`}>
                        View everything
                      </p>
                    </div>
                    <div className={`p-2 rounded-lg ${
                      selectedSubcategory === 'all' 
                        ? 'bg-white/20' 
                        : 'bg-white group-hover:bg-emerald-50'
                    }`}>
                      <Package className={`w-5 h-5 ${
                        selectedSubcategory === 'all' ? 'text-white' : 'text-gray-700'
                      }`} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-2xl font-bold ${
                      selectedSubcategory === 'all' ? 'text-white' : 'text-gray-800'
                    }`}>
                      {totalProducts}
                    </span>
                    <span className={`text-sm ${
                      selectedSubcategory === 'all' ? 'text-emerald-100' : 'text-gray-500'
                    }`}>
                      products
                    </span>
                  </div>
                </div>

                {/* Selected Indicator */}
                {selectedSubcategory === 'all' && (
                  <div className="absolute top-3 right-3">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            </button>

            {/* Subcategory Cards */}
            {subcategories.map((sub, index) => (
              <button
                key={sub.id}
                onClick={() => handleSubcategoryChange(sub.slug)}
                className={`flex-shrink-0 w-72 sm:w-80 group transition-all duration-300 ${
                  selectedSubcategory === sub.slug ? 'scale-105' : 'hover:scale-105'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={`relative h-32 rounded-xl overflow-hidden transition-all duration-300 ${
                    selectedSubcategory === sub.slug
                      ? 'ring-2 ring-emerald-500 shadow-xl'
                      : 'shadow-lg hover:shadow-xl'
                  }`}
                >
                  {/* Background: Image if available, otherwise gradient */}
                  {sub.image ? (
                    <>
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${sub.image})` }}
                      />
                      <div className={`absolute inset-0 ${
                        selectedSubcategory === sub.slug
                          ? 'bg-emerald-600/70'
                          : 'bg-black/40 group-hover:bg-black/50'
                      } transition-all duration-300`} />
                    </>
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${
                      selectedSubcategory === sub.slug
                        ? 'from-emerald-500 to-emerald-600'
                        : index % 4 === 0
                        ? 'from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200'
                        : index % 4 === 1
                        ? 'from-purple-50 to-purple-100 group-hover:from-purple-100 group-hover:to-purple-200'
                        : index % 4 === 2
                        ? 'from-amber-50 to-amber-100 group-hover:from-amber-100 group-hover:to-amber-200'
                        : 'from-rose-50 to-rose-100 group-hover:from-rose-100 group-hover:to-rose-200'
                    }`} />
                  )}
                  
                  {/* Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)`
                    }} />
                  </div>

                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`text-lg font-bold line-clamp-1 ${
                          selectedSubcategory === sub.slug || sub.image ? 'text-white' : 'text-gray-800'
                        }`}>
                          {sub.name}
                        </h4>
                        {sub.description && (
                          <p className={`text-sm mt-1 line-clamp-1 ${
                            selectedSubcategory === sub.slug || sub.image ? 'text-gray-100' : 'text-gray-600'
                          }`}>
                            {sub.description}
                          </p>
                        )}
                      </div>
                      <div className={`p-2 rounded-lg ml-2 ${
                        selectedSubcategory === sub.slug || sub.image
                          ? 'bg-white/20' 
                          : 'bg-white/80 group-hover:bg-white'
                      }`}>
                        <Package className={`w-5 h-5 ${
                          selectedSubcategory === sub.slug || sub.image ? 'text-white' : 'text-gray-700'
                        }`} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-2xl font-bold ${
                        selectedSubcategory === sub.slug || sub.image ? 'text-white' : 'text-gray-800'
                      }`}>
                        {sub._count?.products || 0}
                      </span>
                      <span className={`text-sm ${
                        selectedSubcategory === sub.slug || sub.image ? 'text-gray-100' : 'text-gray-500'
                      }`}>
                        products
                      </span>
                    </div>
                  </div>

                  {/* Selected Indicator */}
                  {selectedSubcategory === sub.slug && (
                    <div className="absolute top-3 right-3">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Indicator */}
        <div className="flex justify-center mt-4 gap-1 sm:hidden">
          {[...Array(subcategories.length + 1)].map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === 0 && selectedSubcategory === 'all'
                  ? 'w-8 bg-emerald-500'
                  : index > 0 && selectedSubcategory === subcategories[index - 1]?.slug
                  ? 'w-8 bg-emerald-500'
                  : 'w-1.5 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}