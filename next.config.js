/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['drive.google.com','images.unsplash.com', 'source.unsplash.com','infrascapes-website.blr1.cdn.digitaloceanspaces.com','cdn.digitaloceanspaces.com','blr1.cdn.digitaloceanspaces.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
