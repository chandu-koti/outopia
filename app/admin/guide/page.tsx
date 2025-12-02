"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Book, 
  Home, 
  Package, 
  FolderOpen, 
  Palette, 
  Image as ImageIcon,
  MessageSquare,
  FileText,
  Upload,
  Link2,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Users,
  Settings,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';

export default function AdminGuide() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('getting-started');

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
  }, [router]);

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: Home },
    { id: 'brands', title: 'Managing Brands', icon: Palette },
    { id: 'categories', title: 'Managing Categories', icon: FolderOpen },
    { id: 'products', title: 'Managing Products', icon: Package },
    { id: 'projects', title: 'Managing Projects', icon: FileText },
    { id: 'inquiries', title: 'Contact & Quotes', icon: MessageSquare },
    { id: 'images', title: 'Image Management', icon: ImageIcon },
    { id: 'best-practices', title: 'Best Practices', icon: Lightbulb },
    { id: 'troubleshooting', title: 'Troubleshooting', icon: HelpCircle }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-sm text-emerald-600 hover:text-emerald-700">
                ← Back to Dashboard
              </Link>
              <div className="flex items-center gap-2">
                <Book className="w-6 h-6 text-emerald-600" />
                <h1 className="text-2xl font-bold text-gray-900">Admin Guide</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Table of Contents</h3>
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        activeSection === section.id
                          ? 'bg-emerald-50 text-emerald-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Getting Started */}
            {activeSection === 'getting-started' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Your Admin Panel! 👋</h2>
                  <p className="text-gray-600 mb-6">
                    This guide will help you manage your website content easily. Follow these simple steps to add and update your products, projects, and more.
                  </p>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-emerald-900">Quick Tip</h4>
                        <p className="text-sm text-emerald-700 mt-1">
                          The order to follow: First add Brands → Then Categories → Finally Products
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">How This Admin Panel Works</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-emerald-600">1</span>
                          </div>
                          <h4 className="font-medium">Create Structure</h4>
                        </div>
                        <p className="text-sm text-gray-600">Start by setting up your brands and categories</p>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-emerald-600">2</span>
                          </div>
                          <h4 className="font-medium">Add Content</h4>
                        </div>
                        <p className="text-sm text-gray-600">Upload products, projects, and images</p>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-emerald-600">3</span>
                          </div>
                          <h4 className="font-medium">Manage Inquiries</h4>
                        </div>
                        <p className="text-sm text-gray-600">View and respond to customer messages</p>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-emerald-600">4</span>
                          </div>
                          <h4 className="font-medium">Update Anytime</h4>
                        </div>
                        <p className="text-sm text-gray-600">Edit or remove content as needed</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Important Note</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        All changes you make here will appear on your website immediately. Double-check before saving!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Brands Section */}
            {activeSection === 'brands' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Brands</h2>
                  <p className="text-gray-600 mb-6">
                    Brands are the top-level organization for your products. You currently have two brands: <strong>INFRASCAPES</strong> and <strong>OUTOPIA</strong>.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Add/Edit a Brand</h3>
                      <ol className="space-y-3">
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">1</span>
                          <div>
                            <p className="font-medium">Go to "Brands" from the dashboard</p>
                            <p className="text-sm text-gray-600">Click on the Brands card in the main dashboard</p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">2</span>
                          <div>
                            <p className="font-medium">Fill in the brand information</p>
                            <p className="text-sm text-gray-600">Enter name, tagline, description, and choose colors</p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">3</span>
                          <div>
                            <p className="font-medium">Upload brand images</p>
                            <p className="text-sm text-gray-600">Add logo and hero image (see Image Management section)</p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">4</span>
                          <div>
                            <p className="font-medium">Set call-to-action buttons</p>
                            <p className="text-sm text-gray-600">Define primary and secondary button text and links</p>
                          </div>
                        </li>
                      </ol>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-900">Warning</h4>
                          <p className="text-sm text-yellow-700 mt-1">
                            You cannot delete a brand if it has categories or products. Remove all associated items first.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Categories Section */}
            {activeSection === 'categories' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Categories</h2>
                  <p className="text-gray-600 mb-6">
                    Categories organize your products within each brand. For example, "Seating & Benches" or "Play Equipment".
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Steps to Create a Category</h3>
                      <ol className="space-y-3">
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">1</span>
                          <div>
                            <p className="font-medium">Select the parent brand</p>
                            <p className="text-sm text-gray-600">Choose which brand this category belongs to</p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">2</span>
                          <div>
                            <p className="font-medium">Enter category details</p>
                            <p className="text-sm text-gray-600">Name, description, and optional URL slug</p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">3</span>
                          <div>
                            <p className="font-medium">Upload a category image</p>
                            <p className="text-sm text-gray-600">This will be shown on the category cards</p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">4</span>
                          <div>
                            <p className="font-medium">Add subcategories (optional)</p>
                            <p className="text-sm text-gray-600">Click "Add" to create subcategories like "Modern Benches", "Classic Benches"</p>
                          </div>
                        </li>
                      </ol>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">💡 Pro Tip</h4>
                      <p className="text-sm text-gray-600">
                        The slug (URL) is automatically generated from the category name. You can customize it if needed, but keep it short and use hyphens instead of spaces.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Section */}
            {activeSection === 'products' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Products</h2>
                  <p className="text-gray-600 mb-6">
                    Products are the main content of your website. Each product belongs to a category and brand.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Adding a New Product</h3>
                      <ol className="space-y-3">
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">1</span>
                          <div>
                            <p className="font-medium">Basic Information</p>
                            <p className="text-sm text-gray-600">Enter product name, SKU, and select brand/category</p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">2</span>
                          <div>
                            <p className="font-medium">Pricing & Description</p>
                            <p className="text-sm text-gray-600">Set price (e.g., "₹15,000" or "Starting from ₹10,000")</p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">3</span>
                          <div>
                            <p className="font-medium">Product Images</p>
                            <p className="text-sm text-gray-600">Upload main image and up to 5 gallery images</p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">4</span>
                          <div>
                            <p className="font-medium">Features & Specifications</p>
                            <p className="text-sm text-gray-600">Add features (one per line) and technical specifications</p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">5</span>
                          <div>
                            <p className="font-medium">Brochure Upload (Optional)</p>
                            <p className="text-sm text-gray-600">Upload a PDF brochure for customers to download</p>
                          </div>
                        </li>
                      </ol>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">✅ Good Product Names</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Modern Park Bench MB-2024</li>
                          <li>• Stainless Steel Dustbin SD-100</li>
                          <li>• Kids Play System KPS-500</li>
                        </ul>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">❌ Avoid These</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• bench1</li>
                          <li>• New Product</li>
                          <li>• Test Item</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <h4 className="font-semibold text-emerald-900 mb-2">Featured Products</h4>
                      <p className="text-sm text-emerald-700">
                        Check "Featured" to show the product on the homepage. Only feature your best-selling or most impressive products.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Projects Section */}
            {activeSection === 'projects' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Projects</h2>
                  <p className="text-gray-600 mb-6">
                    Projects showcase your completed installations and build credibility with potential customers.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Creating a Project Portfolio</h3>
                      <ol className="space-y-3">
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">1</span>
                          <div>
                            <p className="font-medium">Project Details</p>
                            <p className="text-sm text-gray-600">Title, client name, location, and completion date</p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">2</span>
                          <div>
                            <p className="font-medium">Project Category</p>
                            <p className="text-sm text-gray-600">Select: Corporate, Educational, Residential, Public Park, etc.</p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">3</span>
                          <div>
                            <p className="font-medium">Project Images</p>
                            <p className="text-sm text-gray-600">Upload featured image and gallery (before/after photos work great!)</p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">4</span>
                          <div>
                            <p className="font-medium">Description & Challenges</p>
                            <p className="text-sm text-gray-600">Explain what you did and how you solved any challenges</p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium">5</span>
                          <div>
                            <p className="font-medium">Client Testimonial (Optional)</p>
                            <p className="text-sm text-gray-600">Add a quote from the satisfied client</p>
                          </div>
                        </li>
                      </ol>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Best Practices for Projects</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Use high-quality, professional photos</li>
                        <li>• Include specific numbers (e.g., "Installed 50 benches")</li>
                        <li>• Mention brand names of products used</li>
                        <li>• Keep descriptions concise but informative</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact & Quotes Section */}
            {activeSection === 'inquiries' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Contact Inquiries & Quote Requests</h2>
                  <p className="text-gray-600 mb-6">
                    When customers contact you through the website, their messages appear here.
                  </p>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">📧 Contact Inquiries</h3>
                        <p className="text-sm text-gray-600 mb-3">General questions from the Contact Us page</p>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                            <span>View customer details</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                            <span>Mark as contacted</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                            <span>Delete old inquiries</span>
                          </li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">💰 Quote Requests</h3>
                        <p className="text-sm text-gray-600 mb-3">Product-specific quote requests</p>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                            <span>See which product they want</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                            <span>View quantity needed</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                            <span>Update status (New/Contacted/Completed)</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-900">Quick Response Tips</h4>
                          <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                            <li>• Respond within 24 hours for best results</li>
                            <li>• Call phone numbers provided for urgent requests</li>
                            <li>• Update status after contacting to avoid duplicate follow-ups</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Image Management Section */}
            {activeSection === 'images' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Image Management</h2>
                  <p className="text-gray-600 mb-6">
                    You can add images in two ways: upload directly or use a URL from another source.
                  </p>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Upload className="w-5 h-5 text-emerald-600" />
                          <h3 className="font-semibold text-gray-900">Upload from Computer</h3>
                        </div>
                        <ol className="text-sm text-gray-600 space-y-2">
                          <li>1. Click "Choose File" or drag & drop</li>
                          <li>2. Select image from your computer</li>
                          <li>3. Wait for upload to complete</li>
                          <li>4. Image is automatically optimized</li>
                        </ol>
                        <p className="text-xs text-gray-500 mt-3">Max size: 10MB | Formats: JPG, PNG, WebP</p>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Link2 className="w-5 h-5 text-emerald-600" />
                          <h3 className="font-semibold text-gray-900">Use Image URL</h3>
                        </div>
                        <ol className="text-sm text-gray-600 space-y-2">
                          <li>1. Switch to "URL" mode</li>
                          <li>2. Paste the image URL</li>
                          <li>3. Preview appears automatically</li>
                          <li>4. Save to use the URL</li>
                        </ol>
                        <p className="text-xs text-gray-500 mt-3">Make sure URL is publicly accessible</p>
                      </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <h4 className="font-semibold text-emerald-900 mb-2">Image Optimization Tips</h4>
                      <ul className="text-sm text-emerald-700 space-y-1">
                        <li>• Use landscape images (16:9 ratio) for best display</li>
                        <li>• Minimum resolution: 1200x800 pixels</li>
                        <li>• Compress images before uploading for faster loading</li>
                        <li>• Use descriptive file names (e.g., "modern-park-bench.jpg")</li>
                      </ul>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">📁 Where Images Are Used</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li><strong>Brand Logo:</strong> Appears in navigation and brand pages</li>
                        <li><strong>Hero Images:</strong> Large banners on brand pages</li>
                        <li><strong>Category Images:</strong> Shown on category cards</li>
                        <li><strong>Product Images:</strong> Main image and gallery on product pages</li>
                        <li><strong>Project Images:</strong> Portfolio showcase images</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Best Practices Section */}
            {activeSection === 'best-practices' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
                  <p className="text-gray-600 mb-6">
                    Follow these guidelines to keep your website professional and engaging.
                  </p>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                        <h3 className="font-semibold text-green-900 mb-3">✅ DO's</h3>
                        <ul className="text-sm text-green-700 space-y-2">
                          <li>• Use high-quality, professional images</li>
                          <li>• Write clear, concise descriptions</li>
                          <li>• Keep pricing information updated</li>
                          <li>• Respond to inquiries promptly</li>
                          <li>• Test changes on different devices</li>
                          <li>• Regular backup your content</li>
                          <li>• Use consistent naming conventions</li>
                        </ul>
                      </div>

                      <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                        <h3 className="font-semibold text-red-900 mb-3">❌ DON'Ts</h3>
                        <ul className="text-sm text-red-700 space-y-2">
                          <li>• Don't use copyrighted images</li>
                          <li>• Avoid very long descriptions</li>
                          <li>• Don't leave test content live</li>
                          <li>• Avoid special characters in URLs</li>
                          <li>• Don't delete brands with products</li>
                          <li>• Avoid duplicate product names</li>
                          <li>• Don't ignore customer inquiries</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">📝 Content Writing Tips</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-sm text-gray-700">Product Descriptions:</p>
                          <p className="text-sm text-gray-600">Focus on benefits, not just features. Instead of "Made of steel", write "Durable steel construction ensures 10+ years of outdoor use"</p>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-700">Pricing:</p>
                          <p className="text-sm text-gray-600">Use formats like "₹15,000", "Starting from ₹10,000", or "Contact for Quote" for custom items</p>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-700">Features:</p>
                          <p className="text-sm text-gray-600">List 4-6 key features. Be specific: "UV-resistant coating" instead of "Weather-proof"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Troubleshooting Section */}
            {activeSection === 'troubleshooting' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Troubleshooting Common Issues</h2>
                  <p className="text-gray-600 mb-6">
                    Quick solutions to common problems you might encounter.
                  </p>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Image not uploading?</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Check file size (max 10MB) and format (JPG, PNG, WebP). Try compressing the image or using a URL instead.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Can't delete a brand/category?</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Remove all associated products first. Brands can't be deleted if they have categories, and categories can't be deleted if they have products.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Changes not showing on website?</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Try refreshing the page (Ctrl+F5 or Cmd+Shift+R). If issue persists, clear your browser cache or try incognito mode.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Form not saving?</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Ensure all required fields (marked with *) are filled. Check for error messages in red below the fields.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Lost admin access?</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Contact your developer or system administrator. Never share your login credentials via email or message.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900">Need More Help?</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          If you're still having issues, contact your website developer or administrator with a screenshot of the problem.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions Footer */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/admin/brands" className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <Palette className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium">Manage Brands</span>
                </Link>
                <Link href="/admin/categories" className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <FolderOpen className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium">Manage Categories</span>
                </Link>
                <Link href="/admin/products" className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <Package className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium">Manage Products</span>
                </Link>
                <Link href="/admin/projects" className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium">Manage Projects</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}