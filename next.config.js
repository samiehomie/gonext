/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '**/*'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**/*'
      },
      {
        protocol: 'https',
        hostname: 'upcdn.io',
        port: '',
        pathname: '**/*'
      }
    ]
  }
}

module.exports = nextConfig
