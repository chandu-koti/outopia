"use client";

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Notification } from '@/components/admin/Notification';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import { DocumentUploadField } from '@/components/admin/DocumentUploadField';

export default function AdminProducts() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    categoryId: '',
    subcategoryId: '',
    brandId: '',
    price: '',
    image: '',
    description: '',
    images: [] as string[],
    features: [] as string[],
    specifications: {
      material: '',
      dimensions: '',
      weight: '',
      color: '',
      warranty: '',
      capacity: ''
    },
    brochureUrl: '',
    inStock: true,
    displayOrder: null as number | null
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<any[]>([]);

  // Filter states
  const [filterBrandId, setFilterBrandId] = useState<string>('');
  const [filterCategoryId, setFilterCategoryId] = useState<string>('');
  const [filterSubcategoryId, setFilterSubcategoryId] = useState<string>('');
  const [filterAvailableSubcategories, setFilterAvailableSubcategories] = useState<any[]>([]);

  // Auto-organize states
  const [isOrganizing, setIsOrganizing] = useState(false);
  const [isDuplicateFixing, setIsDuplicateFixing] = useState(false);
  const [unorderedCount, setUnorderedCount] = useState(0);
  const [duplicateCount, setDuplicateCount] = useState(0);
  const [suggestedOrder, setSuggestedOrder] = useState<number | null>(null);

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(userData);
    if (user.role !== 'ADMIN') {
      router.push('/unauthorized');
      return;
    }

    fetchData();
  }, [router]);

  // Recalculate unordered count and duplicates when products or filter category changes
  useEffect(() => {
    if (filterCategoryId) {
      const categoryProducts = products.filter(p => p.categoryId === filterCategoryId);
      const unordered = categoryProducts.filter(p => p.displayOrder === null);
      setUnorderedCount(unordered.length);

      const dupCount = calculateDuplicates(filterCategoryId);
      setDuplicateCount(dupCount);
    } else {
      setUnorderedCount(0);
      setDuplicateCount(0);
    }
  }, [products, filterCategoryId]);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes, brandsRes, subcategoriesRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
        fetch('/api/brands'),
        fetch('/api/subcategories')
      ]);

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      const brandsData = await brandsRes.json();
      const subcategoriesData = await subcategoriesRes.json();

      setProducts(productsData);
      setCategories(categoriesData);
      setBrands(brandsData);
      setSubcategories(subcategoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingProduct
        ? `/api/products/${editingProduct.id}`
        : '/api/products';

      const method = editingProduct ? 'PUT' : 'POST';

      // Auto-generate slug if not provided
      const dataToSend = {
        ...formData,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        images: formData.images.length > 0 ? formData.images : [formData.image],
        subcategoryId: formData.subcategoryId || null
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save product');
      }

      const savedProduct = await response.json();

      // If displayOrder was set, handle automatic reordering
      if (formData.displayOrder !== null && formData.displayOrder !== undefined) {
        try {
          const reorderResponse = await fetch('/api/products/reorder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              productId: savedProduct.id,
              categoryId: formData.categoryId,
              newOrder: formData.displayOrder
            })
          });

          if (!reorderResponse.ok) {
            console.error('Failed to reorder products');
          }
        } catch (reorderError) {
          console.error('Error reordering products:', reorderError);
          // Don't fail the whole operation if reordering fails
        }
      }

      // Show success notification
      setNotification({
        type: 'success',
        message: editingProduct ? 'Product updated successfully!' : 'Product created successfully!'
      });

      // Refresh products list
      await fetchData();

      // Reset form
      setEditingProduct(null);
      setFormData({
        name: '',
        slug: '',
        categoryId: '',
        subcategoryId: '',
        brandId: '',
        price: '',
        image: '',
        description: '',
        images: [],
        features: [],
        specifications: {
          material: '',
          dimensions: '',
          weight: '',
          color: '',
          warranty: '',
          capacity: ''
        },
        brochureUrl: '',
        inStock: true,
        displayOrder: null
      });
    } catch (error: any) {
      console.error('Error saving product:', error);
      setNotification({
        type: 'error',
        message: error.message || 'Failed to save product. Please try again.'
      });
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug || '',
      categoryId: product.categoryId,
      subcategoryId: product.subcategoryId || '',
      brandId: product.brandId,
      price: product.price,
      image: product.image,
      description: product.description || '',
      images: product.images || [],
      features: product.features || [],
      specifications: {
        material: product.specifications?.material || '',
        dimensions: product.specifications?.dimensions || '',
        weight: product.specifications?.weight || '',
        color: product.specifications?.color || '',
        warranty: product.specifications?.warranty || '',
        capacity: product.specifications?.capacity || ''
      },
      brochureUrl: product.brochureUrl || '',
      inStock: product.inStock,
      displayOrder: product.displayOrder ?? null
    });
    
    // Filter subcategories based on selected category
    if (product.categoryId) {
      const filtered = subcategories.filter(sub => sub.categoryId === product.categoryId);
      setFilteredSubcategories(filtered);
    }
  };

  // Helper function to get next available order in a category
  const getNextAvailableOrder = (categoryId: string): number | null => {
    if (!categoryId) return null;

    const categoryProducts = products.filter(p => p.categoryId === categoryId);
    const orderedProducts = categoryProducts.filter(p => p.displayOrder !== null);

    if (orderedProducts.length === 0) {
      return 1; // First product in category
    }

    const maxOrder = Math.max(...orderedProducts.map(p => p.displayOrder!));
    return maxOrder + 1;
  };

  // Helper function to calculate duplicate orders in a category
  const calculateDuplicates = (categoryId: string): number => {
    const categoryProducts = products.filter(p => p.categoryId === categoryId);
    const orderedProducts = categoryProducts.filter(p => p.displayOrder !== null);

    // Count occurrences of each order number
    const orderCounts = new Map<number, number>();
    orderedProducts.forEach(p => {
      const count = orderCounts.get(p.displayOrder!) || 0;
      orderCounts.set(p.displayOrder!, count + 1);
    });

    // Count how many products are duplicates (beyond the first occurrence)
    let duplicates = 0;
    orderCounts.forEach(count => {
      if (count > 1) {
        duplicates += count - 1; // Each duplicate after the first
      }
    });

    return duplicates;
  };

  const handleCategoryChange = (categoryId: string) => {
    setFormData({ ...formData, categoryId, subcategoryId: '' });
    const filtered = subcategories.filter(sub => sub.categoryId === categoryId);
    setFilteredSubcategories(filtered);

    // Auto-set order for new products (not editing)
    if (!editingProduct && categoryId) {
      const nextOrder = getNextAvailableOrder(categoryId);
      setSuggestedOrder(nextOrder);
      setFormData(prev => ({ ...prev, categoryId, subcategoryId: '', displayOrder: nextOrder }));
    } else {
      setSuggestedOrder(null);
    }
  };

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (filterBrandId) {
      filtered = filtered.filter(product => product.brandId === filterBrandId);
    }

    if (filterCategoryId) {
      filtered = filtered.filter(product => product.categoryId === filterCategoryId);
    }

    if (filterSubcategoryId) {
      filtered = filtered.filter(product => product.subcategoryId === filterSubcategoryId);
    }

    // Sort by displayOrder (nulls last), then by creation date
    filtered.sort((a, b) => {
      // Products with displayOrder come first
      if (a.displayOrder !== null && b.displayOrder === null) return -1;
      if (a.displayOrder === null && b.displayOrder !== null) return 1;

      // Both have displayOrder, sort by order
      if (a.displayOrder !== null && b.displayOrder !== null) {
        return a.displayOrder - b.displayOrder;
      }

      // Both have no displayOrder, sort by creation date
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return filtered;
  }, [products, filterBrandId, filterCategoryId, filterSubcategoryId]);

  // Handle filter category change
  const handleFilterCategoryChange = (categoryId: string) => {
    setFilterCategoryId(categoryId);
    setFilterSubcategoryId(''); // Reset subcategory when category changes

    if (categoryId) {
      const filtered = subcategories.filter(sub => sub.categoryId === categoryId);
      setFilterAvailableSubcategories(filtered);

      // Calculate unordered count for this category
      const categoryProducts = products.filter(p => p.categoryId === categoryId);
      const unordered = categoryProducts.filter(p => p.displayOrder === null);
      setUnorderedCount(unordered.length);
    } else {
      setFilterAvailableSubcategories([]);
      setUnorderedCount(0);
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilterBrandId('');
    setFilterCategoryId('');
    setFilterSubcategoryId('');
    setFilterAvailableSubcategories([]);
  };

  // Handle fix duplicates
  const handleFixDuplicates = async () => {
    if (!filterCategoryId) return;

    const confirmed = confirm(
      `This will fix ${duplicateCount} duplicate orders by reassigning them sequentially. Continue?`
    );

    if (!confirmed) return;

    setIsDuplicateFixing(true);

    try {
      const response = await fetch('/api/products/fix-duplicates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId: filterCategoryId })
      });

      if (!response.ok) {
        throw new Error('Failed to fix duplicates');
      }

      const result = await response.json();

      setNotification({
        type: 'success',
        message: `Fixed ${result.updated} duplicate order${result.updated > 1 ? 's' : ''}`
      });

      // Refresh products list
      await fetchData();
    } catch (error: any) {
      console.error('Error fixing duplicates:', error);
      setNotification({
        type: 'error',
        message: error.message || 'Failed to fix duplicates'
      });
    } finally {
      setIsDuplicateFixing(false);
    }
  };

  // Handle auto-organize products
  const handleAutoOrganize = async () => {
    if (!filterCategoryId) return;

    const confirmed = confirm(
      `This will assign sequential orders to ${unorderedCount} unordered products in this category. Continue?`
    );

    if (!confirmed) return;

    setIsOrganizing(true);

    try {
      const response = await fetch('/api/products/auto-organize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId: filterCategoryId })
      });

      if (!response.ok) {
        throw new Error('Failed to auto-organize products');
      }

      const result = await response.json();

      setNotification({
        type: 'success',
        message: `Successfully organized ${result.organized} products (orders #${result.startOrder}-#${result.endOrder})`
      });

      // Refresh products list
      await fetchData();
    } catch (error: any) {
      console.error('Error auto-organizing products:', error);
      setNotification({
        type: 'error',
        message: error.message || 'Failed to auto-organize products'
      });
    } finally {
      setIsOrganizing(false);
    }
  };

  const handleAddFeature = () => {
    const feature = prompt('Enter feature:');
    if (feature) {
      setFormData({ ...formData, features: [...formData.features, feature] });
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete product');
      }

      setNotification({
        type: 'success',
        message: 'Product deleted successfully!'
      });

      await fetchData();
    } catch (error: any) {
      console.error('Error deleting product:', error);
      setNotification({
        type: 'error',
        message: error.message || 'Failed to delete product. Please try again.'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <Link href="/admin" className="text-sm text-emerald-600 hover:text-emerald-700">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 mt-2">Manage Products</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Slug (URL)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="auto-generated from name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Brand</label>
                  <select
                    required
                    value={formData.brandId}
                    onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.brand.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Subcategory (Optional)</label>
                  <select
                    value={formData.subcategoryId}
                    onChange={(e) => setFormData({ ...formData, subcategoryId: e.target.value })}
                    disabled={!formData.categoryId}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100"
                  >
                    <option value="">Select Subcategory (Optional)</option>
                    {filteredSubcategories.map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
                  {!formData.categoryId && (
                    <p className="text-xs text-gray-500 mt-1">Select a category first</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="₹45,000"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Display Order (Optional)
                    {suggestedOrder && !editingProduct && (
                      <span className="text-xs text-blue-600 ml-2 font-normal">
                        Next available: #{suggestedOrder}
                      </span>
                    )}
                    {!formData.categoryId && (
                      <span className="text-xs text-gray-500 ml-2 font-normal">
                        Select category first
                      </span>
                    )}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.displayOrder ?? ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      displayOrder: e.target.value ? parseInt(e.target.value) : null
                    })}
                    placeholder={suggestedOrder && !editingProduct ? `Suggested: ${suggestedOrder}` : 'e.g., 1, 2, 3...'}
                    disabled={!formData.categoryId}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {suggestedOrder && !editingProduct ? (
                      <>Auto-set to next available position. Change if needed.</>
                    ) : (
                      <>Leave empty to show at end. Lower numbers appear first.</>
                    )}
                  </p>
                </div>

                <ImageUploadField
                  label="Main Image"
                  value={formData.image}
                  onChange={(value) => setFormData({ ...formData, image: value as string })}
                  required
                  folder="products"
                  type="main"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <ImageUploadField
                  label="Gallery Images"
                  value={formData.images}
                  onChange={(value) => setFormData({ ...formData, images: value as string[] })}
                  multiple
                  folder="products"
                  type="gallery"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Add
                    </button>
                  </label>
                  <div className="space-y-1">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-sm flex-1">{feature}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="text-red-500 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    {formData.features.length === 0 && (
                      <p className="text-sm text-gray-400">No features added</p>
                    )}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Specifications</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600">Material</label>
                      <input
                        type="text"
                        value={formData.specifications.material}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          specifications: { ...formData.specifications, material: e.target.value } 
                        })}
                        className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600">Dimensions</label>
                      <input
                        type="text"
                        value={formData.specifications.dimensions}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          specifications: { ...formData.specifications, dimensions: e.target.value } 
                        })}
                        placeholder="1800mm x 600mm x 850mm"
                        className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600">Weight</label>
                      <input
                        type="text"
                        value={formData.specifications.weight}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          specifications: { ...formData.specifications, weight: e.target.value } 
                        })}
                        placeholder="65 kg"
                        className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600">Color</label>
                      <input
                        type="text"
                        value={formData.specifications.color}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          specifications: { ...formData.specifications, color: e.target.value } 
                        })}
                        className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600">Warranty</label>
                      <input
                        type="text"
                        value={formData.specifications.warranty}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          specifications: { ...formData.specifications, warranty: e.target.value } 
                        })}
                        placeholder="5 years"
                        className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600">Capacity</label>
                      <input
                        type="text"
                        value={formData.specifications.capacity}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          specifications: { ...formData.specifications, capacity: e.target.value } 
                        })}
                        className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <DocumentUploadField
                  label="Product Brochure"
                  value={formData.brochureUrl}
                  onChange={(value) => setFormData({ ...formData, brochureUrl: value })}
                  folder="products/brochures"
                  placeholder="Enter brochure URL or upload PDF"
                  acceptedFormats={['pdf']}
                />

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">In Stock</span>
                  </label>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
                  >
                    {editingProduct ? 'Update' : 'Add'} Product
                  </button>
                  {editingProduct && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct(null);
                        setFormData({
                          name: '',
                          slug: '',
                          categoryId: '',
                          subcategoryId: '',
                          brandId: '',
                          price: '',
                          image: '',
                          description: '',
                          images: [],
                          features: [],
                          specifications: {
                            material: '',
                            dimensions: '',
                            weight: '',
                            color: '',
                            warranty: '',
                            capacity: ''
                          },
                          brochureUrl: '',
                          inStock: true,
                          displayOrder: null
                        });
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Products List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Filter Section */}
              <div className="px-6 py-4 border-b bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-700">Filter Products</h3>
                  {(filterBrandId || filterCategoryId || filterSubcategoryId) && (
                    <button
                      onClick={handleClearFilters}
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Brand Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Brand</label>
                    <select
                      value={filterBrandId}
                      onChange={(e) => setFilterBrandId(e.target.value)}
                      className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">All Brands</option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
                    <select
                      value={filterCategoryId}
                      onChange={(e) => handleFilterCategoryChange(e.target.value)}
                      className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subcategory Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Subcategory</label>
                    <select
                      value={filterSubcategoryId}
                      onChange={(e) => setFilterSubcategoryId(e.target.value)}
                      disabled={!filterCategoryId}
                      className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">All Subcategories</option>
                      {filterAvailableSubcategories.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </option>
                      ))}
                    </select>
                    {!filterCategoryId && (
                      <p className="text-xs text-gray-400 mt-1">Select a category first</p>
                    )}
                  </div>
                </div>

                {/* Auto-Organize Section */}
                {filterCategoryId && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-col gap-1">
                      {unorderedCount > 0 && (
                        <span className="text-sm text-amber-600 font-medium">
                          {unorderedCount} product{unorderedCount !== 1 ? 's' : ''} without order
                        </span>
                      )}
                      {duplicateCount > 0 && (
                        <span className="text-sm text-red-600 font-medium">
                          ⚠️ {duplicateCount} duplicate order{duplicateCount !== 1 ? 's' : ''} found
                        </span>
                      )}
                      {unorderedCount === 0 && duplicateCount === 0 && (
                        <span className="text-sm text-green-600 font-medium">
                          ✓ All products organized
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {duplicateCount > 0 && (
                        <button
                          onClick={handleFixDuplicates}
                          disabled={isDuplicateFixing || isOrganizing}
                          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors"
                        >
                          {isDuplicateFixing ? (
                            <>
                              <span className="inline-block animate-spin mr-2">⚙️</span>
                              Fixing...
                            </>
                          ) : (
                            `Fix ${duplicateCount} Duplicate${duplicateCount > 1 ? 's' : ''}`
                          )}
                        </button>
                      )}
                      {unorderedCount > 0 && (
                        <button
                          onClick={handleAutoOrganize}
                          disabled={isOrganizing || isDuplicateFixing}
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                        >
                          {isOrganizing ? (
                            <>
                              <span className="inline-block animate-spin mr-2">⚙️</span>
                              Organizing...
                            </>
                          ) : (
                            `Auto-Organize ${unorderedCount}`
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-bold">
                  Products ({filteredProducts.length}
                  {filteredProducts.length !== products.length && (
                    <span className="text-sm font-normal text-gray-500"> of {products.length}</span>
                  )})
                </h2>
              </div>

              <div className="divide-y">
                {filteredProducts.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <p>No products found matching the selected filters.</p>
                    {(filterBrandId || filterCategoryId || filterSubcategoryId) && (
                      <button
                        onClick={handleClearFilters}
                        className="mt-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <div key={product.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {product.displayOrder && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              #{product.displayOrder}
                            </span>
                          )}
                          <h3 className="font-medium text-gray-900">
                            {product.name}
                            {product.slug && (
                              <span className="ml-2 text-xs text-gray-500">/{product.slug}</span>
                            )}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500">
                          {product.category.name} {product.subcategory && `› ${product.subcategory.name}`} • {product.brand.name}
                        </p>
                        <p className="text-sm font-medium text-emerald-600">{product.price}</p>
                        {product.features && product.features.length > 0 && (
                          <p className="text-xs text-gray-400 mt-1">
                            {product.features.length} features • {product.images?.length || 1} images
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}