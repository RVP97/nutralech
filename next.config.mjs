import createMDX from "@next/mdx";
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-mdx-remote"],
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async redirects() {
    return [
      // {
      //   source: "/blog/:path*",
      //   destination: "/",
      //   permanent: true,
      //   statusCode: 302,
      // },
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

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
