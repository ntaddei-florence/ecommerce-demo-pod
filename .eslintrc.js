module.exports = {
  extends: ["next/core-web-vitals", "prettier"],
  plugins: ["prettier"],
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
