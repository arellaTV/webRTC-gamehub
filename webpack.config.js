var webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: './public/dist'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
