const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    index: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'react-hot-loader/webpack',
        ]
      }
    ]
  },
}