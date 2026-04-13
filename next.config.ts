import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['pdf-parse', 'canvas', 'better-sqlite3'],
};

export default nextConfig;
