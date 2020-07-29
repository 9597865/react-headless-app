const level = process.env.NODE_ENV === "production" ? 2 : 1;

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "@tencent/eslint-config-tencent"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react", "react-hooks", "jsx-a11y"],
  rules: {
    "react/display-name": [0],
    "react/jsx-filename-extension": [0, { extensions: [".js", ".jsx"] }],
    "react/jsx-key": [1],
    "react/jsx-one-expression-per-line": [0],
    "react/jsx-props-no-spreading": [0],
    "react/no-array-index-key": [0],
    "react/prop-types": [0],

    "react-hooks/exhaustive-deps": [1],

    "jsx-a11y/label-has-associated-control": [0],
    "jsx-a11y/mouse-events-have-key-events": [0],

    indent: [level, 2, { SwitchCase: 1 }],
    semi: level,
    "spaced-comment": level,
    "no-unused-vars": level,
    "no-debugger": level,
    "no-console": [
      level,
      {
        allow: ["warn", "error", "info"],
      },
    ],
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
