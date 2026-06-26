/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // We type-check in editor/CI; keep lint from blocking the cinematic build.
  eslint: { ignoreDuringBuilds: true },
  webpack: (config) => {
    // Allow importing GLSL-ish files as strings if added later.
    return config;
  },
};

export default nextConfig;
