"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Notification } from '@/components/admin/Notification';
import { ImageUploadField } from '@/components/admin/ImageUploadField';

export default function AdminBrands() {
  const router = useRouter();
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBrand, setEditingBrand] = useState<any>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    lightLogo: '',
    tagline: '',
    subtitle: '',
    description: '',
    heroImage: '',
    gradient: '',
    accentColor: '',
    primaryButton: '',
    primaryButtonLink: '',
    secondaryButton: '',
    secondaryButtonLink: ''
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

    fetchBrands();
  }, [router]);

  const fetchBrands = async () => {
    try {
      const response = await fetch('/api/brands');
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingBrand
        ? `/api/brands/${editingBrand.id}`
        : '/api/brands';
      
      const method = editingBrand ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save brand');
      }

      // Show success notification
      setNotification({
        type: 'success',
        message: editingBrand ? 'Brand updated successfully!' : 'Brand created successfully!'
      });

      // Refresh brands list
      await fetchBrands();

      // Reset form
      setEditingBrand(null);
      setFormData({
        name: '',
        logo: '',
        lightLogo: '',
        tagline: '',
        subtitle: '',
        description: '',
        heroImage: '',
        gradient: '',
        accentColor: '',
        primaryButton: '',
        primaryButtonLink: '',
        secondaryButton: '',
        secondaryButtonLink: ''
      });
    } catch (error: any) {
      console.error('Error saving brand:', error);
      setNotification({
        type: 'error',
        message: error.message || 'Failed to save brand. Please try again.'
      });
    }
  };

  const handleEdit = (brand: any) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      logo: brand.logo,
      lightLogo: brand.lightLogo || '',
      tagline: brand.tagline,
      subtitle: brand.subtitle,
      description: brand.description,
      heroImage: brand.heroImage,
      gradient: brand.gradient,
      accentColor: brand.accentColor,
      primaryButton: brand.primaryButton,
      primaryButtonLink: brand.primaryButtonLink,
      secondaryButton: brand.secondaryButton,
      secondaryButtonLink: brand.secondaryButtonLink
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this brand? This will only work if there are no categories or products associated with it.')) {
      return;
    }

    try {
      const response = await fetch(`/api/brands/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete brand');
      }

      setNotification({
        type: 'success',
        message: 'Brand deleted successfully!'
      });

      await fetchBrands();
    } catch (error: any) {
      console.error('Error deleting brand:', error);
      setNotification({
        type: 'error',
        message: error.message || 'Failed to delete brand. Please try again.'
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
              <h1 className="text-2xl font-bold text-gray-900 mt-2">Manage Brands</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Brand Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">
                {editingBrand ? 'Edit Brand' : 'Add New Brand'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Brand Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="OUTOPIA"
                  />
                </div>

                <ImageUploadField
                  label="Logo"
                  value={formData.logo}
                  onChange={(value) => setFormData({ ...formData, logo: value as string })}
                  required
                  folder="brands/logos"
                  type="main"
                />

                <ImageUploadField
                  label="Light Logo (Optional)"
                  value={formData.lightLogo}
                  onChange={(value) => setFormData({ ...formData, lightLogo: value as string })}
                  folder="brands/logos"
                  type="main"
                  placeholder="Light version of logo for dark backgrounds"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tagline</label>
                  <input
                    type="text"
                    required
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Premium Outdoor Living"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                  <textarea
                    required
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    rows={2}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
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
                  label="Hero Image"
                  value={formData.heroImage}
                  onChange={(value) => setFormData({ ...formData, heroImage: value as string })}
                  required
                  folder="brands/hero"
                  type="main"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gradient</label>
                    <input
                      type="text"
                      required
                      value={formData.gradient}
                      onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                      placeholder="from-emerald-600 to-teal-700"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Accent Color</label>
                    <input
                      type="text"
                      required
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      placeholder="text-emerald-600"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Call-to-Action Buttons</h3>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={formData.primaryButton}
                      onChange={(e) => setFormData({ ...formData, primaryButton: e.target.value })}
                      placeholder="Primary Button Text"
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                    />
                    <input
                      type="text"
                      required
                      value={formData.primaryButtonLink}
                      onChange={(e) => setFormData({ ...formData, primaryButtonLink: e.target.value })}
                      placeholder="Primary Link"
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={formData.secondaryButton}
                      onChange={(e) => setFormData({ ...formData, secondaryButton: e.target.value })}
                      placeholder="Secondary Button Text"
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                    />
                    <input
                      type="text"
                      required
                      value={formData.secondaryButtonLink}
                      onChange={(e) => setFormData({ ...formData, secondaryButtonLink: e.target.value })}
                      placeholder="Secondary Link"
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
                  >
                    {editingBrand ? 'Update' : 'Add'} Brand
                  </button>
                  {editingBrand && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingBrand(null);
                        setFormData({
                          name: '',
                          logo: '',
                          lightLogo: '',
                          tagline: '',
                          subtitle: '',
                          description: '',
                          heroImage: '',
                          gradient: '',
                          accentColor: '',
                          primaryButton: '',
                          primaryButtonLink: '',
                          secondaryButton: '',
                          secondaryButtonLink: ''
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

          {/* Brands List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-bold">Brands ({brands.length})</h2>
              </div>

              <div className="divide-y">
                {brands.map((brand) => (
                  <div key={brand.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg p-2">
                          <Image
                            src={brand.logo}
                            alt={brand.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{brand.name}</h3>
                          <p className="text-sm text-gray-600 font-medium mt-1">{brand.tagline}</p>
                          <p className="text-sm text-gray-500 mt-2">{brand.subtitle}</p>
                          <div className="mt-3 flex gap-4 text-sm text-gray-500">
                            <span>{brand.categories?.length || 0} Categories</span>
                            <span>{brand._count?.products || 0} Products</span>
                          </div>
                          <div className="mt-2">
                            <span 
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${brand.gradient} text-white`}
                            >
                              {brand.accentColor}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(brand)}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        {brand._count?.products === 0 && brand.categories?.length === 0 && (
                          <button
                            onClick={() => handleDelete(brand.id)}
                            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}