const customName = require("sugar-design/babel.import");

const babelConfig = {
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "react-hot-loader/babel",
    // [
    //   "import",
    //   {
    //     libraryName: "sugar-design",
    //     camel2DashComponentName: false,
    //     customName,
    //     "style":true
    //   },
    //   "sugar",
    // ],
  ],
};
module.exports = babelConfig;
