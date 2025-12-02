"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Notification } from '@/components/admin/Notification';
import { ImageUploadField } from '@/components/admin/ImageUploadField';

export default function AdminProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    client: '',
    location: '',
    area: '',
    year: '',
    category: '',
    description: '',
    challenge: '',
    solution: '',
    impact: '',
    mainImage: '',
    beforeImage: '',
    afterImage: '',
    images: [] as string[], // Gallery images
    features: [] as string[],
    featured: false,
    testimonial: '',
    testimonialAuthor: ''
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

    fetchProjects();
  }, [router]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingProject
        ? `/api/projects/${editingProject.id}`
        : '/api/projects';
      
      const method = editingProject ? 'PUT' : 'POST';

      // Auto-generate slug if not provided
      const dataToSend = {
        ...formData,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save project');
      }

      // Show success notification
      setNotification({
        type: 'success',
        message: editingProject ? 'Project updated successfully!' : 'Project created successfully!'
      });

      // Refresh projects list
      await fetchProjects();

      // Reset form
      setEditingProject(null);
      setFormData({
        name: '',
        slug: '',
        client: '',
        location: '',
        area: '',
        year: '',
        category: '',
        description: '',
        challenge: '',
        solution: '',
        impact: '',
        mainImage: '',
        beforeImage: '',
        afterImage: '',
        images: [],
        features: [],
        featured: false,
        testimonial: '',
        testimonialAuthor: ''
      });
    } catch (error: any) {
      console.error('Error saving project:', error);
      setNotification({
        type: 'error',
        message: error.message || 'Failed to save project. Please try again.'
      });
    }
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      slug: project.slug || '',
      client: project.client,
      location: project.location,
      area: project.area,
      year: project.year,
      category: project.category,
      description: project.description,
      challenge: project.challenge,
      solution: project.solution,
      impact: project.impact,
      mainImage: project.mainImage,
      beforeImage: project.beforeImage || '',
      afterImage: project.afterImage || '',
      images: project.images || [],
      features: project.features || [],
      featured: project.featured,
      testimonial: project.testimonial || '',
      testimonialAuthor: project.testimonialAuthor || ''
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete project');
      }

      setNotification({
        type: 'success',
        message: 'Project deleted successfully!'
      });

      await fetchProjects();
    } catch (error: any) {
      console.error('Error deleting project:', error);
      setNotification({
        type: 'error',
        message: error.message || 'Failed to delete project. Please try again.'
      });
    }
  };

  const handleFeatureAdd = () => {
    const feature = prompt('Enter new feature:');
    if (feature) {
      setFormData({ ...formData, features: [...formData.features, feature] });
    }
  };

  const handleFeatureRemove = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
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
              <h1 className="text-2xl font-bold text-gray-900 mt-2">Manage Projects</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">
                {editingProject ? 'Edit Project' : 'Add New Project'}
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Client</label>
                    <input
                      type="text"
                      required
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Year</label>
                    <input
                      type="text"
                      required
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      placeholder="2024"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Area/Duration</label>
                    <input
                      type="text"
                      required
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder="5000 sq ft"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select Category</option>
                    <option value="Public Parks">Public Parks</option>
                    <option value="Corporate Campuses">Corporate Campuses</option>
                    <option value="Educational Institutions">Educational Institutions</option>
                    <option value="Residential Communities">Residential Communities</option>
                    <option value="Healthcare Facilities">Healthcare Facilities</option>
                    <option value="Hospitality Projects">Hospitality Projects</option>
                  </select>
                </div>

                <ImageUploadField
                  label="Main Image"
                  value={formData.mainImage}
                  onChange={(value) => setFormData({ ...formData, mainImage: value as string })}
                  required
                  folder="projects"
                  type="main"
                />

                <ImageUploadField
                  label="Gallery Images"
                  value={formData.images}
                  onChange={(value) => setFormData({ ...formData, images: value as string[] })}
                  multiple
                  folder="projects"
                  type="gallery"
                />

                <ImageUploadField
                  label="Before Image (Optional)"
                  value={formData.beforeImage}
                  onChange={(value) => setFormData({ ...formData, beforeImage: value as string })}
                  folder="projects"
                  type="main"
                />

                <ImageUploadField
                  label="After Image (Optional)"
                  value={formData.afterImage}
                  onChange={(value) => setFormData({ ...formData, afterImage: value as string })}
                  folder="projects"
                  type="main"
                />

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

                <div>
                  <label className="block text-sm font-medium text-gray-700">Challenge</label>
                  <textarea
                    required
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    rows={2}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Solution</label>
                  <textarea
                    required
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    rows={2}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                    <button
                      type="button"
                      onClick={handleFeatureAdd}
                      className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Add
                    </button>
                  </label>
                  <div className="space-y-1">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-sm">{feature}</span>
                        <button
                          type="button"
                          onClick={() => handleFeatureRemove(index)}
                          className="text-red-500 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Testimonial (Optional)</label>
                  <textarea
                    value={formData.testimonial}
                    onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                    rows={3}
                    placeholder="Client testimonial text..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Testimonial Author (Optional)</label>
                  <input
                    type="text"
                    value={formData.testimonialAuthor}
                    onChange={(e) => setFormData({ ...formData, testimonialAuthor: e.target.value })}
                    placeholder="Name, Designation"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Featured Project</span>
                  </label>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
                  >
                    {editingProject ? 'Update' : 'Add'} Project
                  </button>
                  {editingProject && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProject(null);
                        setFormData({
                          name: '',
                          slug: '',
                          client: '',
                          location: '',
                          area: '',
                          year: '',
                          category: '',
                          description: '',
                          challenge: '',
                          solution: '',
                          impact: '',
                          mainImage: '',
                          beforeImage: '',
                          afterImage: '',
                          images: [],
                          features: [],
                          featured: false,
                          testimonial: '',
                          testimonialAuthor: ''
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

          {/* Projects List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-bold">Projects ({projects.length})</h2>
              </div>

              <div className="divide-y">
                {projects.map((project) => (
                  <div key={project.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start gap-4">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={project.mainImage}
                          alt={project.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {project.name}
                              {project.featured && (
                                <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                  Featured
                                </span>
                              )}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {project.client} • {project.location} • {project.year}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {project.category} • {project.area}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(project)}
                              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(project.id)}
                              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
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