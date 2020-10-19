const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const exposedPages = require("./exposed").pages

const sharedLibraries = {
  react: { eager: true },
  'react-dom': { eager: true },
}

const babelLoader = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: [
    {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-react"],
      },
    }
  ]
};

module.exports = [{
  entry: { main: "./src/infra/index.jsx" },
  mode: "development",
  module: {
    rules: [
      babelLoader,
    ],
  },
  // stats: 'none',
  stats: {
    modules: false
  },
  output: {
    publicPath: '/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "infra",
      library: { type: "var", name: "infra" },
      filename: "infra/remoteEntry.js",
      exposes: {},
      shared: sharedLibraries,
    }),
    new ModuleFederationPlugin({
      name: "app",
      library: { type: "var", name: "app" },
      filename: "app/remoteEntry.js",
      exposes: exposedPages,
      shared: sharedLibraries,
    }),
    new HtmlWebpackPlugin({})
  ]
}];
