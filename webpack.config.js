const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  mode: env,
  entry: {
    main: './src/index.jsx',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new DefinePlugin({
      __NODE_ENV__: JSON.stringify(env),
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
        },
      },
    },
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
                // eslint-disable-next-line global-require
                require('tailwindcss'),
                // eslint-disable-next-line global-require
                require('autoprefixer'),
              ],
            },
          },
        ],
      },
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'react-hot-loader/webpack',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
