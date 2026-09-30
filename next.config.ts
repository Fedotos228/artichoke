import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75],
    remotePatterns: [
      {
        // wpClient rewrites every WP media URL to https before it reaches next/image.
        protocol: "https",
        hostname: "artichoke.stellarsolutions.md",
        port: '',
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
}

export default nextConfig