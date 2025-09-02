import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "no-unused-vars": "off", // Turn off base rule as @typescript-eslint rule is used
      "react-hooks/exhaustive-deps": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "error", // Use base ESLint rule instead
      "no-console": "warn",
      "no-debugger": "error",
    },
  },
];

export default eslintConfig;
