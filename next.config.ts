import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Image BB — admin-uploaded product/banner images
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
      // Picsum — placeholder images (port: '' = default port only)
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      // Google OAuth user avatars
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      // UI Avatars — generated fallback avatars
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/**',
      },
      // Unsplash — used in storefront showcase components
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Pravatar — used in Testimonials component
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },
    ],
    qualities: [75, 80, 100],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;
