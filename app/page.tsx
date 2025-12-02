export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold">Infrascapes - Live</h1>
        <p className="text-gray-300">Premium Outdoor Furniture & Design-Build Solutions</p>
      </header>
      
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Welcome to Infrascapes</h2>
          <p className="text-gray-700 mb-4">
            Your project is successfully deployed on Vercel! 🎉
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
            <h3 className="font-bold text-blue-900 mb-2">✅ Deployment Status</h3>
            <ul className="text-blue-800 space-y-1">
              <li>✓ Code deployed successfully</li>
              <li>✓ PostgreSQL database connected (Neon)</li>
              <li>✓ Environment variables configured</li>
              <li>✓ Build completed without errors</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded p-4">
              <h3 className="font-bold mb-2">🚀 Next Steps</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Verify all components load correctly</li>
                <li>• Test API endpoints</li>
                <li>• Check database connectivity</li>
                <li>• Set up custom domain</li>
              </ul>
            </div>
            
            <div className="border rounded p-4">
              <h3 className="font-bold mb-2">📊 Project Info</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Framework: Next.js 15</li>
                <li>• Database: PostgreSQL (Neon)</li>
                <li>• Hosting: Vercel</li>
                <li>• Status: Live ✅</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white p-6 mt-12">
        <p className="text-center text-gray-400">© 2025 Infrascapes. All rights reserved.</p>
      </footer>
    </div>
  );
}