/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/data/:path*',
        destination: '/api/data',
      },
    ];
  },
  // Environment variables that should be available on the client side
  env: {
    NEXT_PUBLIC_APP_NAME: 'Math Item Bank Viewer',
  },
};

module.exports = nextConfig;