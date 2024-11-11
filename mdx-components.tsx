import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Headings
    h1: ({ children, ...props }) => (
      <h1
        {...props}
        className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 mt-8 text-gray-800"
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        {...props}
        className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 mt-8"
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        {...props}
        className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 mt-6"
      >
        {children}
      </h3>
    ),
    // Text elements
    p: ({ children, ...props }) => (
      <div {...props} className="text-gray-700 leading-relaxed mb-6">
        {children}
      </div>
    ),
    strong: ({ children, ...props }) => (
      <strong {...props} className="font-bold text-gray-900">
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em {...props} className="italic text-gray-800">
        {children}
      </em>
    ),
    // Lists
    ul: ({ children, ...props }) => (
      <ul {...props} className="list-disc pl-6 mb-6 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol {...props} className="list-decimal list-inside mb-6 space-y-2 pl-4">
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li {...props} className="text-gray-700 marker:text-gray-500">
        {children}
      </li>
    ),
    // Links and media
    a: ({ children, href, ...props }) => (
      <Link
        href={href ?? "#"}
        prefetch={false}
        {...props}
        className="text-[#DA5F6F] hover:text-[#C54B5B] underline underline-offset-2 transition-colors duration-200"
      >
        {children}
      </Link>
    ),
    img: ({ src, alt, ...props }) => (
      <div className="my-6">
        <Image
          {...props}
          src={src ?? ""}
          alt={alt ?? ""}
          width={800}
          height={400}
          className="rounded-lg shadow-md mx-auto"
        />
      </div>
    ),
    // Code blocks
    code: ({ children, ...props }) => (
      <code
        {...props}
        className="bg-gray-100 text-[#DA5F6F] rounded px-1.5 py-0.5 font-mono text-sm"
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        {...props}
        className="bg-gray-900 text-gray-100 rounded-lg p-4 mb-6 overflow-x-auto"
      >
        {children}
      </pre>
    ),
    // Blockquotes
    blockquote: ({ children, ...props }) => (
      <blockquote
        {...props}
        className="border-l-4 border-[#DA5F6F] pl-4 italic text-gray-700 mb-6"
      >
        {children}
      </blockquote>
    ),
    // Tables
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto mb-6">
        <table
          {...props}
          className="min-w-full divide-y divide-gray-200 border"
        >
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th
        {...props}
        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td {...props} className="px-6 py-4 whitespace-nowrap text-gray-700">
        {children}
      </td>
    ),
    // Horizontal Rule
    hr: () => <hr className="border-t border-gray-300 my-8" />,
  };
}
