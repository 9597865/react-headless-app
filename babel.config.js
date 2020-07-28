module.exports = {
  presets: ["@babel/preset-env", "react-app"],,
  plugins: [
    "@babel/plugin-transform-arrow-functions",
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: true,
      },
    ],
  ],
};
