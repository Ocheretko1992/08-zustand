import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
        pathname: '/fullstack/react/**',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
