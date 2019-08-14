const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const env = process.env.NODE_ENV || 'development';

module.exports = {
  mode: env,
  entry: {
    index: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /node_modules/,
          priority: -10
        },
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: env === 'development',
            },
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
              ]
            }
          }
        ],
      },
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          // 'react-hot-loader/webpack',
        ]
      }
    ]
  },
}