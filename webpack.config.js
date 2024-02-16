/* eslint-env node */

const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const Dotenv = require("dotenv-webpack");

module.exports = {
  // Entry point that indicates where
  // should the webpack starts bundling
  entry: "./src/index.tsx",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // checks for .ts or .tsx files
        //use:'ts-loader',
        include:[path.resolve(__dirname,'src')],
        exclude: /(node_modules)/,
        loader: "babel-loader", //#TODO: use ts-loader here and resolve errors
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/, //checks for .css files
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin(),
     new Dotenv(), // Load environment variables from .env file
],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },

  // Options for resolving module requests
  // extensions that are used
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  // Output point is where webpack should
  // output the bundles and assets
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/",
    filename: "bundle.js",

  }
}
