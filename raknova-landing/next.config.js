/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/auth/account-type",
        permanent: true,
      },
      {
        source: "/register",
        destination: "/auth/account-type",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
