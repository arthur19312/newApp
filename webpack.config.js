// const webpack = require("webpack");
var path = require("path");
const rootResolve = (name) => path.resolve(__dirname, name);

const cssReg = /\.css$/;
const cssModuleReg = /\.module\.css$/;
const lessRegex = /(\.module)?\.css|less$/;
const lessModuleRegex = /\.module\.less$/;

module.exports = {
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://0.0.0.0:3000",
    "./src/index.jsx",
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
    // filename: "[name].js",
    // chunkFilename: "[name].js",
  },
  target: "web",
  devServer: {
    static: "./",
    host: "localhost",
    compress: true,
    port: 3000,
    hot: true,
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: path.resolve(__dirname, "node_modules"),
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: lessRegex,
        exclude: path.resolve(__dirname, "node_modules"),
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              modules: {
                auto: (fileName) => !/(global\.less|\.css)/.test(fileName),
                localIdentName: "[local]-[contenthash:8]",
                exportLocalsConvention: "camelCase",
              },
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "less-loader", // compiles Less to CSS
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|eot|woff2?|ttf)$/i,
        type: "asset",
        generator: {
          filename: "static/[name].[contenthash:8][ext][query]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
      "@": rootResolve("./src"),
      "@utils": rootResolve("./src/utils"),
      "@assets": rootResolve("./src/assets"),
      "@components": rootResolve("./src/components"),
      "@SDVariableJS": rootResolve(
        "./node_modules/sugar-design/foundation/variable.ts"
      ),
      "@SDFoundation": rootResolve(
        "./node_modules/sugar-design/foundation/foundation.ts"
      ),
      "@SDVariable": rootResolve(
        "./node_modules/sugar-design/foundation/variable.less"
      ),
    },
  },
  //   plugins: [new webpack.HotModuleReplacementPlugin()],
};
