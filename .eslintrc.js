module.exports = {
  extends: ["eslint:recommended", "next", "prettier"],
  plugins: ["prettier"],
  rules: {
    "react/display-name": "off",
    "prettier/prettier": "error",
    "no-empty-pattern": "off",
    "no-unused-vars": ["error"],
    "react/jsx-key": [
      "warn",
      {
        checkFragmentShorthand: true,
        warnOnDuplicates: true,
      },
    ],
  },
};
