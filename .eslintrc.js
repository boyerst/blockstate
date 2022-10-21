
// const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules)
//   .reduce((acc, rule) => { acc[`jsx-a11y/${rule}`] = 'off'; return acc }, {})

module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react"
  ],
  rules: {
    // ...a11yOff,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-wrap-multilines": "off",
    "react/prop-types": 0,
    "react/jsx-props-no-spreading": 0,
    "quotes": [1, "double"],
    "quote-props": "off",
    "semi": [0, "never"],
    "padded-blocks": ["error", { "classes": "always" }],
    "react/destructuring-assignment": "off",
    "comma-dangle": "off",
    "operator-linebreak": "off",
    "no-multiple-empty-lines": "off",
    "react/jsx-one-expression-per-line": "off",
    "no-nested-ternary": "off",
  },
};
