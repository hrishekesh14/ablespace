/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["app", "components", "hooks", "lib", "types", "constants"],
  },
};

export default nextConfig;
