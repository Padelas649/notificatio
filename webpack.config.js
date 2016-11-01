module.exports = {
  devtool: 'eval',
  entry: './src/client.js',
  output: {
    path: './public',
    filename: 'notificatio.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
