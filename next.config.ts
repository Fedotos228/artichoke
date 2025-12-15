import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "artichoke.stellarsolutions.md",
        port: '',
        pathname: "/wp-content/uploads/**",
      },
    ],
    unoptimized: true,
  },
}

export default nextConfig