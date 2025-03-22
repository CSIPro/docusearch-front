import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: process.env.NODE_ENV === "production" ? "/docusearch" : "",
  // basePath: "/docusearch",
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
