const webpack = require("webpack");
const {
  override,
  overrideDevServer,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
  addWebpackAlias,
  addWebpackPlugin,
  addBundleVisualizer,
  useEslintRc,
} = require("customize-cra");
const path = require("path");

module.exports = {
  webpack: override(
    useEslintRc(path.resolve(__dirname, ".eslintrc.js")),
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true,
    }), //支持antd按需加载
    // addLessLoader({
    //   javascriptEnabled: true,
    //   modifyVars: themeConfig.defaultVars,
    // }), // 支持les
    addDecoratorsLegacy(), // 支持装饰器
    addBundleVisualizer({}, true), // 显示代码拆分
    addWebpackPlugin(new webpack.ProgressPlugin()),
    addWebpackAlias({
      "@": path.resolve(__dirname, "./src"),
    }), // 文件别名
    (config) => {
      // 编译后文件落盘build目录，用于前后端联合开发
      if (process.env.DEV_MODE === "writeToDisk") {
        config.output = {
          ...config.output,
          path: path.resolve(__dirname, "build"),
          filename: "static/js/[name].js",
          chunkFilename: "static/js/[name].chunk.js",
          hotUpdateChunkFilename: "static/js/[name].hot-update.js",
          hotUpdateMainFilename: "static/js/[hash].hot-update.json",
        };
        config.devtool = false;
      }

      return config;
    }
  ),
  devServer: overrideDevServer((config) => {
    // 编译后文件落盘build目录，用于前后端联合开发
    if (process.env.DEV_MODE === "writeToDisk") {
      config.writeToDisk = true;
      config.open = false;
    }
    return config;
  }),
};
