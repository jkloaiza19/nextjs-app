/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'elasticbeanstalk-us-east-1-888522137833.s3.amazonaws.com',
        port: '',
        pathname: '/posts/**',
      },
      {
        protocol: 'https',
        hostname: 'flowbite.com',
        port: '',
        pathname: '/docs/images/**',
      },
    ],
  },
}

module.exports = nextConfig
