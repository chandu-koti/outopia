"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginDebugPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@outopia.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setDebugInfo('');
    setLoading(true);

    try {
      setDebugInfo('Attempting login...');
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      setDebugInfo(prev => prev + '\nResponse received: ' + JSON.stringify(data, null, 2));

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token in localStorage for client-side use
      localStorage.setItem('auth-token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setDebugInfo(prev => prev + '\nData stored in localStorage');
      setDebugInfo(prev => prev + '\nRedirecting to /admin...');

      // Try redirect
      setTimeout(() => {
        router.push('/admin');
      }, 1000);
      
    } catch (err: any) {
      setError(err.message);
      setDebugInfo(prev => prev + '\nError: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const testApi = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: 'admin@outopia.com', 
          password: 'admin123' 
        })
      });
      
      const data = await response.json();
      alert('API Test Result:\n' + JSON.stringify(data, null, 2));
    } catch (err: any) {
      alert('API Test Error: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Login Debug Page
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Debug version to test login functionality
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded">
          <h3 className="font-bold mb-2">Quick Tests:</h3>
          <div className="space-x-2">
            <button
              onClick={testApi}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Test API Directly
            </button>
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Go to Admin (No Auth)
            </button>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {debugInfo && (
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-bold mb-2">Debug Info:</h3>
              <pre className="text-xs whitespace-pre-wrap">{debugInfo}</pre>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in with Debug'}
          </button>

          <div className="text-sm text-center text-gray-600">
            Current values:<br />
            Email: {email}<br />
            Password: {password}
          </div>
        </form>
      </div>
    </div>
  );
}
