module.exports = {
  extends: [
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "next/core-web-vitals",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "import", "n", "promise", "unused-imports"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  root: true,
  rules: {
    "unused-imports/no-unused-imports": "error",
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
};
