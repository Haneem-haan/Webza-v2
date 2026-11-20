import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/works",
        destination: "/work",
      },
      {
        source: "/projects",
        destination: "/work",
      },
      {
        source: "/works/:slug*",
        destination: "/work/:slug*",
      },
      {
        source: "/projects/:slug*",
        destination: "/work/:slug*",
      },
    ];
  },
};

export default nextConfig;
