import stylelintConfigRecommended from "stylelint-config-recommended";
import stylelintConfigRecommendedVue from "stylelint-config-recommended-vue";

export default {
  extends: [stylelintConfigRecommended, stylelintConfigRecommendedVue],
  ignoreFiles: [
    "node_modules/**",
    "dist/**",
    "packages/components/dist/**",
    "packages/playground/**",
    "packages/docs/dist/**",
  ],
  overrides: [
    {
      files: ["*.vue", "**/*.vue"],
      rules: {
        "unit-allowed-list": ["em", "rem", "s", "ms", "px"],
      },
    },
  ],
  rules: {
    "no-duplicate-selectors": null,
  },
};
