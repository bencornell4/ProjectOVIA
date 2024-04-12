const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader',
      },
    ],
  },
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'BASE_URL': JSON.stringify('https://projectovia.onrender.com'), // Set the production API URL
   }),
  ],
};