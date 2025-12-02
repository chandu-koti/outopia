"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Book } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    products: 0,
    projects: 0,
    brands: 0,
    categories: 0,
    subcategories: 0,
    quoteRequests: 0,
    contactInquiries: 0
  });

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'ADMIN') {
      router.push('/unauthorized');
      return;
    }

    setUser(parsedUser);
    fetchStats();
  }, [router]);

  const fetchStats = async () => {
    try {
      const [products, projects, brands, categories, subcategories, quoteRequests, contactInquiries] = await Promise.all([
        fetch('/api/products').then(r => r.json()),
        fetch('/api/projects').then(r => r.json()),
        fetch('/api/brands').then(r => r.json()),
        fetch('/api/categories').then(r => r.json()),
        fetch('/api/subcategories').then(r => r.json()),
        fetch('/api/quote-requests').then(r => r.json()),
        fetch('/api/contact-inquiries').then(r => r.json())
      ]);

      setStats({
        products: products.length,
        projects: projects.length,
        brands: brands.length,
        categories: categories.length,
        subcategories: subcategories.length,
        quoteRequests: quoteRequests.filter((q: any) => q.status === 'NEW').length,
        contactInquiries: contactInquiries.filter((i: any) => i.status === 'NEW').length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user.name || user.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900"
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Guide Banner */}
        <Link
          href="/admin/guide"
          className="block mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Book className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">New to Admin Panel?</h2>
                <p className="text-sm text-gray-600">Read our comprehensive guide on how to manage your website content</p>
              </div>
            </div>
            <div className="text-emerald-600 font-medium">
              Open Guide →
            </div>
          </div>
        </Link>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.products}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Projects</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.projects}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Brands</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.brands}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Categories</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.categories}</p>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin/products"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">Manage Products</h2>
            <p className="text-gray-600">Add, edit, or delete products from your catalog</p>
            <div className="mt-4 text-emerald-600 font-medium">
              Go to Products →
            </div>
          </Link>

          <Link
            href="/admin/projects"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">Manage Projects</h2>
            <p className="text-gray-600">Showcase your completed projects and case studies</p>
            <div className="mt-4 text-emerald-600 font-medium">
              Go to Projects →
            </div>
          </Link>

          <Link
            href="/admin/brands"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">Manage Brands</h2>
            <p className="text-gray-600">Configure brand settings and information</p>
            <div className="mt-4 text-emerald-600 font-medium">
              Go to Brands →
            </div>
          </Link>

          <Link
            href="/admin/categories"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">Manage Categories</h2>
            <p className="text-gray-600">Organize products into categories</p>
            <div className="mt-4 text-emerald-600 font-medium">
              Go to Categories →
            </div>
          </Link>

          <Link
            href="/admin/subcategories"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">Manage Subcategories</h2>
            <p className="text-gray-600">Organize products into subcategories ({stats.subcategories} total)</p>
            <div className="mt-4 text-emerald-600 font-medium">
              Go to Subcategories →
            </div>
          </Link>

          <Link
            href="/admin/quote-requests"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow relative"
          >
            {stats.quoteRequests > 0 && (
              <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {stats.quoteRequests} New
              </div>
            )}
            <h2 className="text-xl font-bold text-gray-900 mb-2">Quote Requests</h2>
            <p className="text-gray-600">View and manage customer quote requests</p>
            <div className="mt-4 text-emerald-600 font-medium">
              Go to Quote Requests →
            </div>
          </Link>

          <Link
            href="/admin/contact-inquiries"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow relative"
          >
            {stats.contactInquiries > 0 && (
              <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {stats.contactInquiries} New
              </div>
            )}
            <h2 className="text-xl font-bold text-gray-900 mb-2">Contact Inquiries</h2>
            <p className="text-gray-600">Manage contact form submissions and leads</p>
            <div className="mt-4 text-emerald-600 font-medium">
              Go to Contact Inquiries →
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}