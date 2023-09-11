module.exports = {
  extends: ["eslint:recommended", "next", "prettier", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  root: true,
  rules: {
    "react/display-name": "off",
    "prettier/prettier": "error",
    "no-empty-pattern": "off",
    "react/jsx-key": [
      "warn",
      {
        checkFragmentShorthand: true,
        warnOnDuplicates: true,
      },
    ],
  },
};
