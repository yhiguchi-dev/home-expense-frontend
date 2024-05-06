import pluginJs from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";
// import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

// https://github.com/vercel/next.js/discussions/49337#discussioncomment-6009130
export default [
  {
    ignores: ["node_modules/*", ".next/*"],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  // pluginReactConfig,
  eslintConfigPrettier,
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": hooksPlugin,
      "@next/next": nextPlugin,
    },
    rules: {
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@next/next/no-img-element": "error",
    },
  },
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
          pathGroups: [
            {
              pattern: "src/**",
              group: "internal",
            },
          ],
        },
      ],
    },
  },
];
