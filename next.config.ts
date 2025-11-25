import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",     // allow all hosts  ik.imagekit.io
        port: "",           // allow all ports
        pathname: "/**",    // allow all paths
      },
    ],
  },
};

export default nextConfig;
