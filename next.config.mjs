import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["next-mdx-remote"],
	// Configure `pageExtensions` to include markdown and MDX files
	typedRoutes: true,
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	images: {
		qualities: [50, 75, 100],
	},
	async redirects() {
		return [
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
