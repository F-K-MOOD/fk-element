import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginVue from "eslint-plugin-vue";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginVue.configs["flat/recommended"],
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "packages/components/dist/**",
      "packages/playground/**",
      "packages/docs/dist/**",
      "*.config.js",
      "*.config.ts"
    ],
  },
  {
    files: ["*.vue", "**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".vue"],
      },
    },
    plugins: {
      "simple-import-sort": eslintPluginSimpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "vue/max-attributes-per-line": [
        "warn",
        {
          singleline: {
            max: 3,
          },
          multiline: {
            max: 3,
          },
        },
      ],
      "vue/html-self-closing": "off",
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    files: ["*.ts", "**/*.ts"],
    plugins: {
      "simple-import-sort": eslintPluginSimpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
