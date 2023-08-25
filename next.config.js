/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "placekitten.com", // FIXME just for development
      },
      {
        hostname: "images.ctfassets.net",
      },
    ],
  },
};

module.exports = nextConfig;
