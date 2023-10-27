/* eslint-env node */

const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

module.exports = {
  // Entry point that indicates where
  // should the webpack starts bundling
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // checks for .js or .jsx files
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/, //checks for .css files
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },

  // Options for resolving module requests
  // extensions that are used
  resolve: { extensions: [".js", ".jsx"] },
  // Output point is where webpack should
  // output the bundles and assets
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/",
    filename: "bundle.js",

  }
}
