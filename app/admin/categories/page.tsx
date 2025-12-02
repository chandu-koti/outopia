"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Notification } from '@/components/admin/Notification';
import { ImageUploadField } from '@/components/admin/ImageUploadField';

export default function AdminCategories() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    href: '',
    brandId: '',
    count: '',
    subcategories: [] as string[]
  });

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

  const fetchData = async () => {
    try {
      const [categoriesRes, brandsRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/brands')
      ]);

      const categoriesData = await categoriesRes.json();
      const brandsData = await brandsRes.json();

      setCategories(categoriesData);
      setBrands(brandsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingCategory
        ? `/api/categories/${editingCategory.id}`
        : '/api/categories';
      
      const method = editingCategory ? 'PUT' : 'POST';

      // Auto-generate slug if not provided
      const dataToSend = {
        ...formData,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        href: formData.href || `/premium-category/${formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-')}`
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save category');
      }

      // Show success notification
      setNotification({
        type: 'success',
        message: editingCategory ? 'Category updated successfully!' : 'Category created successfully!'
      });

      // Refresh categories list
      await fetchData();

      // Reset form
      setEditingCategory(null);
      setFormData({
        name: '',
        slug: '',
        description: '',
        image: '',
        href: '',
        brandId: '',
        count: '',
        subcategories: []
      });
    } catch (error: any) {
      console.error('Error saving category:', error);
      setNotification({
        type: 'error',
        message: error.message || 'Failed to save category. Please try again.'
      });
    }
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      image: category.image,
      href: category.href,
      brandId: category.brandId,
      count: category.count || '',
      subcategories: category.subcategories || []
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? This will only work if there are no products in this category.')) {
      return;
    }

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete category');
      }

      setNotification({
        type: 'success',
        message: 'Category deleted successfully!'
      });

      await fetchData();
    } catch (error: any) {
      console.error('Error deleting category:', error);
      setNotification({
        type: 'error',
        message: error.message || 'Failed to delete category. Please try again.'
      });
    }
  };

  const handleSubcategoryAdd = () => {
    const subcategory = prompt('Enter new subcategory:');
    if (subcategory) {
      setFormData({ ...formData, subcategories: [...formData.subcategories, subcategory] });
    }
  };

  const handleSubcategoryRemove = (index: number) => {
    setFormData({
      ...formData,
      subcategories: formData.subcategories.filter((_, i) => i !== index)
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // Group categories by brand
  const categoriesByBrand = categories.reduce((acc: Record<string, any[]>, category) => {
    const brandName = category.brand?.name || 'Unknown';
    if (!acc[brandName]) {
      acc[brandName] = [];
    }
    acc[brandName].push(category);
    return acc;
  }, {} as Record<string, any[]>);

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
              <h1 className="text-2xl font-bold text-gray-900 mt-2">Manage Categories</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Seating and Benches"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Slug (URL)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="seating-and-benches (auto-generated if empty)"
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
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <ImageUploadField
                  label="Category Image"
                  value={formData.image}
                  onChange={(value) => setFormData({ ...formData, image: value as string })}
                  required
                  folder="categories"
                  type="main"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700">Page URL</label>
                  <input
                    type="text"
                    value={formData.href}
                    onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="/premium-category/[slug] (auto-generated)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Count Display</label>
                  <input
                    type="text"
                    value={formData.count}
                    onChange={(e) => setFormData({ ...formData, count: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="40+ Products"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategories
                    <button
                      type="button"
                      onClick={handleSubcategoryAdd}
                      className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Add
                    </button>
                  </label>
                  <div className="space-y-1">
                    {formData.subcategories.map((subcategory, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-sm flex-1">{subcategory}</span>
                        <button
                          type="button"
                          onClick={() => handleSubcategoryRemove(index)}
                          className="text-red-500 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    {formData.subcategories.length === 0 && (
                      <p className="text-sm text-gray-400">No subcategories added</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
                  >
                    {editingCategory ? 'Update' : 'Add'} Category
                  </button>
                  {editingCategory && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCategory(null);
                        setFormData({
                          name: '',
                          slug: '',
                          description: '',
                          image: '',
                          href: '',
                          brandId: '',
                          count: '',
                          subcategories: []
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

          {/* Categories List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {Object.entries(categoriesByBrand).map(([brandName, brandCategories]: [string, any[]]) => (
                <div key={brandName} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b bg-gray-50">
                    <h2 className="text-lg font-bold">{brandName} Categories ({brandCategories.length})</h2>
                  </div>

                  <div className="divide-y">
                    {brandCategories.map((category) => (
                      <div key={category.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start gap-4">
                          <div className="relative w-20 h-20 flex-shrink-0">
                            <Image
                              src={category.image}
                              alt={category.name}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {category.name}
                                  <span className="ml-2 text-xs text-gray-500">/{category.slug}</span>
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  {category._count?.products || 0} products • {category.count || 'No count set'}
                                </p>
                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                  {category.description}
                                </p>
                                {category.subcategories && category.subcategories.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-xs text-gray-500 mb-1">Subcategories:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {category.subcategories.map((sub: string, idx: number) => (
                                        <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                          {sub}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEdit(category)}
                                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                  Edit
                                </button>
                                {category._count?.products === 0 && (
                                  <button
                                    onClick={() => handleDelete(category.id)}
                                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}