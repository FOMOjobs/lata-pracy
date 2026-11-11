import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  ...(process.env.LATA_PRACY_STATIC_EXPORT === "1"
    ? { output: "export" as const, trailingSlash: true }
    : {}),
};

export default nextConfig;
