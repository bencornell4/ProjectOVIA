module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public',
    publicPath: '/',
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: '/index.html',
    }
  },
};