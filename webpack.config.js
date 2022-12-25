const path = require('path');
const CopyFilePlugin = require("copy-webpack-plugin")

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: 'dist',
    open: true,
  },
  plugins: [
    new CopyFilePlugin({
      patterns: [
        {
          context: path.resolve(__dirname, "frontend/from_public"),
          from: path.resolve(__dirname, "frontend/from_public/**/*"),
          to: path.resolve(__dirname, "to_public/packs"),
        },
      ],
    }),
  ]
};
