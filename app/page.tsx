export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <header style={{ backgroundColor: '#1f2937', color: '#fff', padding: '24px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Infrascapes</h1>
        <p style={{ color: '#d1d5db' }}>Premium Outdoor Furniture & Design-Build Solutions</p>
      </header>
      
      <main style={{ padding: '32px' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Welcome to Infrascapes</h2>
          <p style={{ color: '#374151', marginBottom: '16px' }}>
            Your project is successfully deployed! ✅
          </p>
          
          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
            <h3 style={{ fontWeight: 'bold', color: '#1e3a8a', marginBottom: '8px' }}>✅ Status</h3>
            <ul style={{ color: '#1e40af', lineHeight: '1.75' }}>
              <li>✓ Code deployed successfully</li>
              <li>✓ PostgreSQL database connected (Neon)</li>
              <li>✓ Environment variables configured</li>
              <li>✓ Build completed without errors</li>
            </ul>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>🚀 Next Steps</h3>
              <ul style={{ fontSize: '14px', color: '#374151', lineHeight: '1.75' }}>
                <li>• Verify all components load correctly</li>
                <li>• Test API endpoints</li>
                <li>• Check database connectivity</li>
                <li>• Set up custom domain</li>
              </ul>
            </div>
            
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>📊 Project Info</h3>
              <ul style={{ fontSize: '14px', color: '#374151', lineHeight: '1.75' }}>
                <li>• Framework: Next.js 15</li>
                <li>• Database: PostgreSQL (Neon)</li>
                <li>• Hosting: Vercel</li>
                <li>• Status: Live ✅</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer style={{ backgroundColor: '#1f2937', color: '#fff', padding: '24px', marginTop: '48px' }}>
        <p style={{ textAlign: 'center', color: '#9ca3af' }}>© 2025 Infrascapes. All rights reserved.</p>
      </footer>
    </div>
  );
}