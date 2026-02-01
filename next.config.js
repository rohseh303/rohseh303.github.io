/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configured for Vercel deployment
  images: {
    unoptimized: false, // Vercel supports optimized images
  },
};

module.exports = nextConfig;
