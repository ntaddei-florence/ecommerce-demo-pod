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
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "s.gravatar.com",
      },
    ],
  },
  env: {
    NEXT_COMMERCELAYER_CLIENT_ID: process.env.NEXT_COMMERCELAYER_CLIENT_ID,
    NEXT_COMMERCELAYER_ENDPOINT: process.env.NEXT_COMMERCELAYER_ENDPOINT,
    NEXT_COMMERCELAYER_SLUG: process.env.NEXT_COMMERCELAYER_SLUG,
    NEXT_COMMERCELAYER_SCOPE: process.env.NEXT_COMMERCELAYER_SCOPE,
    NEXT_CL_INTEGRATION_CLIENT_ID: process.env.NEXT_CL_INTEGRATION_CLIENT_ID,
    NEXT_CL_INTEGRATION_SECRET: process.env.NEXT_CL_INTEGRATION_SECRET,
    NEXT_ALGOLIA_APP_ID: process.env.NEXT_ALGOLIA_APP_ID,
    NEXT_ALGOLIA_API_KEY: process.env.NEXT_ALGOLIA_API_KEY,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: `/commercelayer-api`,
  //       destination: process.env.NEXT_COMMERCELAYER_ENDPOINT,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
