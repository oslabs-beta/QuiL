/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination:
          'http://quilbackend1-env.eba-52zmdsmp.us-east-1.elasticbeanstalk.com/graphql',
      },
    ];
  },
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
