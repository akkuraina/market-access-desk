/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/readiness-score",
        destination: "/",
        permanent: false,
      },
      {
        source: "/compliance-navigator",
        destination: "/",
        permanent: false,
      },
      {
        source: "/settlement-setup",
        destination: "/",
        permanent: false,
      },
      {
        source: "/partner-network",
        destination: "/",
        permanent: false,
      },
      {
        source: "/trade-insights",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
