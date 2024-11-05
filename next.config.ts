/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/blog/:path*",
        destination: "/",
        permanent: true,
        statusCode: 302,
      },
      {
        source: "/contact",
        destination: "/contacto",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/acerca",
        destination: "/acerca-de-mi",
        permanent: true,
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
