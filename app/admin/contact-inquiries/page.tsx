"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Notification } from '@/components/admin/Notification';

export default function AdminContactInquiries() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

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

    fetchInquiries();
  }, [router]);

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/contact-inquiries');
      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      setNotification({
        type: 'error',
        message: 'Failed to fetch contact inquiries'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/contact-inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setNotification({
        type: 'success',
        message: `Status updated to ${status}`
      });

      await fetchInquiries();
    } catch (error) {
      console.error('Error updating status:', error);
      setNotification({
        type: 'error',
        message: 'Failed to update status'
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) {
      return;
    }

    try {
      const response = await fetch(`/api/contact-inquiries/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete inquiry');
      }

      setNotification({
        type: 'success',
        message: 'Inquiry deleted successfully'
      });

      await fetchInquiries();
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      setNotification({
        type: 'error',
        message: 'Failed to delete inquiry'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-100 text-blue-800';
      case 'CONTACTED':
        return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS':
        return 'bg-purple-100 text-purple-800';
      case 'CONVERTED':
        return 'bg-green-100 text-green-800';
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
              <h1 className="text-2xl font-bold text-gray-900 mt-2">Contact Inquiries</h1>
            </div>
            <div className="text-sm text-gray-600">
              Total: {inquiries.length} inquiries
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget & Timeline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="text-gray-900">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(inquiry.createdAt).toLocaleTimeString()}
                      </div>
                      {inquiry.source && (
                        <div className="text-xs text-gray-400 mt-1">
                          Source: {inquiry.source}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
                      {inquiry.company && (
                        <div className="text-sm text-gray-500">{inquiry.company}</div>
                      )}
                      <div className="text-sm mt-1">
                        <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline">
                          {inquiry.email}
                        </a>
                      </div>
                      <div className="text-sm">
                        <a href={`tel:${inquiry.phone}`} className="text-gray-900">
                          {inquiry.phone}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {inquiry.projectType}
                      </div>
                      {inquiry.location && (
                        <div className="text-sm text-gray-500">
                          📍 {inquiry.location}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {inquiry.budget && (
                        <div className="text-sm text-gray-900">
                          💰 {inquiry.budget}
                        </div>
                      )}
                      {inquiry.timeline && (
                        <div className="text-sm text-gray-500">
                          ⏱️ {inquiry.timeline}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {inquiry.message && (
                        <div className="text-sm text-gray-600 max-w-xs">
                          <details>
                            <summary className="cursor-pointer hover:text-gray-900">
                              View message
                            </summary>
                            <p className="mt-2 whitespace-pre-wrap">{inquiry.message}</p>
                          </details>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={inquiry.status}
                        onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                        className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(inquiry.status)}`}
                      >
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="CONVERTED">Converted</option>
                        <option value="CLOSED">Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(inquiry.id)}
                        className="text-red-600 hover:text-red-900 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {inquiries.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No contact inquiries yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">New</div>
            <div className="text-2xl font-bold text-blue-600">
              {inquiries.filter(i => i.status === 'NEW').length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Contacted</div>
            <div className="text-2xl font-bold text-yellow-600">
              {inquiries.filter(i => i.status === 'CONTACTED').length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">In Progress</div>
            <div className="text-2xl font-bold text-purple-600">
              {inquiries.filter(i => i.status === 'IN_PROGRESS').length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Converted</div>
            <div className="text-2xl font-bold text-green-600">
              {inquiries.filter(i => i.status === 'CONVERTED').length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Closed</div>
            <div className="text-2xl font-bold text-gray-600">
              {inquiries.filter(i => i.status === 'CLOSED').length}
            </div>
          </div>
        </div>

        {/* Project Type Summary */}
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h3 className="text-lg font-semibold mb-4">Inquiries by Project Type</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from(new Set(inquiries.map(i => i.projectType))).map(type => (
              <div key={type} className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {inquiries.filter(i => i.projectType === type).length}
                </div>
                <div className="text-sm text-gray-600">{type}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}