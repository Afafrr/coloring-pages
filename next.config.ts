import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.delivery", // Domain name of the image source
        port: "", // Default port for HTTPS
        pathname: "/czjl/**", // Match the directory structure after the domain
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
