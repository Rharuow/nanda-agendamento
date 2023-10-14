/** @type {import('next').NextConfig} */
const nextConfig = {
  plugins: [["styled-jsx/babel", { optimizeForSpeed: true }]],
};

module.exports = nextConfig;
