/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // For GitHub Pages static export
  images: {
    unoptimized: true, // Required for static export
  },
  // For GitHub Pages with username.github.io, basePath should be empty
  // If using a project page (username.github.io/project-name), set basePath: '/project-name'
};

module.exports = nextConfig;
