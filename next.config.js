/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    // Ensure that static file serving is enabled (this is the default behavior)
    reactStrictMode: true,
    // You can add more configuration options here as needed
  }
  
  module.exports = nextConfig