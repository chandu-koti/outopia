"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Notification } from '@/components/admin/Notification';
import { ImageUploadField } from '@/components/admin/ImageUploadField';

export default function AdminSubcategories() {
  const router = useRouter();
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSubcategory, setEditingSubcategory] = useState<any>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    categoryId: ''
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
      const [subcategoriesRes, categoriesRes] = await Promise.all([
        fetch('/api/subcategories'),
        fetch('/api/categories')
      ]);

      const subcategoriesData = await subcategoriesRes.json();
      const categoriesData = await categoriesRes.json();

      // Ensure subcategories is always an array
      setSubcategories(Array.isArray(subcategoriesData) ? subcategoriesData : []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSubcategories([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.categoryId) {
      setNotification({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    try {
      const url = editingSubcategory
        ? `/api/subcategories/${editingSubcategory.id}`
        : '/api/subcategories';
      
      const method = editingSubcategory ? 'PUT' : 'POST';

      console.log('Submitting subcategory:', formData);

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('API Error:', responseData);
        throw new Error(responseData.error || 'Failed to save subcategory');
      }

      setNotification({
        type: 'success',
        message: editingSubcategory ? 'Subcategory updated successfully!' : 'Subcategory created successfully!'
      });

      await fetchData();

      // Reset form
      setEditingSubcategory(null);
      setFormData({
        name: '',
        slug: '',
        description: '',
        image: '',
        categoryId: ''
      });
    } catch (error: any) {
      console.error('Error saving subcategory:', error);
      setNotification({
        type: 'error',
        message: error.message || 'Failed to save subcategory. Please try again.'
      });
    }
  };

  const handleEdit = (subcategory: any) => {
    setEditingSubcategory(subcategory);
    setFormData({
      name: subcategory.name,
      slug: subcategory.slug,
      description: subcategory.description || '',
      image: subcategory.image || '',
      categoryId: subcategory.categoryId
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subcategory? This will only work if there are no products in this subcategory.')) {
      return;
    }

    try {
      const response = await fetch(`/api/subcategories/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete subcategory');
      }

      setNotification({
        type: 'success',
        message: 'Subcategory deleted successfully!'
      });

      await fetchData();
    } catch (error: any) {
      console.error('Error deleting subcategory:', error);
      setNotification({
        type: 'error',
        message: error.message || 'Failed to delete subcategory. Please try again.'
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

  // Group subcategories by category
  const subcategoriesByCategory = Array.isArray(subcategories) 
    ? subcategories.reduce((acc: Record<string, any[]>, subcategory) => {
        const categoryName = subcategory.category?.name || 'Unknown';
        if (!acc[categoryName]) {
          acc[categoryName] = [];
        }
        acc[categoryName].push(subcategory);
        return acc;
      }, {} as Record<string, any[]>)
    : {};

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
              <h1 className="text-2xl font-bold text-gray-900 mt-2">Manage Subcategories</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subcategory Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">
                {editingSubcategory ? 'Edit Subcategory' : 'Add New Subcategory'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Parent Category</label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
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
                  <label className="block text-sm font-medium text-gray-700">Subcategory Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Tables & Chairs"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Slug (URL)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="tables-chairs (auto-generated if empty)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Brief description of the subcategory"
                  />
                </div>

                <ImageUploadField
                  label="Subcategory Image (Optional)"
                  value={formData.image}
                  onChange={(value) => setFormData({ ...formData, image: value as string })}
                  folder="subcategories"
                  type="main"
                />

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
                  >
                    {editingSubcategory ? 'Update' : 'Add'} Subcategory
                  </button>
                  {editingSubcategory && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSubcategory(null);
                        setFormData({
                          name: '',
                          slug: '',
                          description: '',
                          image: '',
                          categoryId: ''
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

          {/* Subcategories List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {Object.keys(subcategoriesByCategory).length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <p className="text-gray-500">No subcategories found. Add your first subcategory to get started.</p>
                </div>
              ) : (
                Object.entries(subcategoriesByCategory).map(([categoryName, categorySubcategories]: [string, any[]]) => (
                  <div key={categoryName} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b bg-gray-50">
                      <h2 className="text-lg font-bold">
                        {categoryName} 
                        <span className="ml-2 text-sm font-normal text-gray-600">
                          ({categorySubcategories[0]?.category?.brand?.name})
                        </span>
                        <span className="ml-2 text-sm font-normal text-gray-500">
                          {categorySubcategories.length} subcategories
                        </span>
                      </h2>
                    </div>

                    <div className="divide-y">
                      {categorySubcategories.map((subcategory) => (
                        <div key={subcategory.id} className="p-4 hover:bg-gray-50">
                          <div className="flex items-start gap-4">
                            {subcategory.image && (
                              <div className="relative w-16 h-16 flex-shrink-0">
                                <Image
                                  src={subcategory.image}
                                  alt={subcategory.name}
                                  fill
                                  className="object-cover rounded"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-medium text-gray-900">
                                    {subcategory.name}
                                    <span className="ml-2 text-xs text-gray-500">/{subcategory.slug}</span>
                                  </h3>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {subcategory._count?.products || 0} products
                                  </p>
                                  {subcategory.description && (
                                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                      {subcategory.description}
                                    </p>
                                  )}
                                </div>
                                <div className="flex gap-2 ml-4">
                                  <button
                                    onClick={() => handleEdit(subcategory)}
                                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                                  >
                                    Edit
                                  </button>
                                  {subcategory._count?.products === 0 && (
                                    <button
                                      onClick={() => handleDelete(subcategory.id)}
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
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}