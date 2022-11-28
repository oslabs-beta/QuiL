/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: () => {
    return [
      {
        source: '/graphql',
        destination: 'http://localhost:4000/graphql',
      },
    ];
  },
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
