module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // Allow unused variables only in build-time files
    "@typescript-eslint/no-unused-vars": "off",
  },
  overrides: [
    {
      files: ["*.config.js", "*.cjs", "*.mjs", "build/**/*.js"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
};
