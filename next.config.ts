/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'image.shutterstock.com',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn-datak.motork.net',
      },
      {
        protocol: 'https',
        hostname: 'www.mitsubishimotors.pr',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.seat.es',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'us.as.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.motor1.com',
        pathname: '/**',
      }
    ]
  },
};

export default nextConfig;
