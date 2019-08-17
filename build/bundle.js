/* eslint-disable import/no-extraneous-dependencies */
const { src, dest } = require('gulp');
const glob = require('glob');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { BundleStatsWebpackPlugin } = require('bundle-stats');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const config = require('../webpack.config');
const { parallel } = require('gulp');

const env = process.env.NODE_ENV || 'development';
const devPort = process.env.DEV_PORT || 3000;
const PATHS = {
  src: path.resolve(__dirname, '..', 'src'),
};

function serverBuild() {
  const _config = { ...config };
  _config.entry = {
    main: './src/index.jsx',
    redux: './src/redux/createStore.js'
  }
  _config.output = {
    filename: '[name].node.js',
    path: path.resolve(__dirname, '..', 'dist', 'node'),
    publicPath: '/',
    libraryTarget: 'umd',
    globalObject: 'this',
  };
  _config.target = 'node';
  _config.plugins.push(new CleanWebpackPlugin());

  // if react is not external on the server, then it'll be bundled into main.node.js,
  // and then multiple versions of react will be used, one in the node bundle and one 
  // from node_modules. Setting react as an externals avoids all that.
  _config.externals = [
    'react',
    'react-dom',
  ];

  return src(path.resolve(__dirname, '..', 'src', 'index.jsx'))
    .pipe(webpackStream(_config))
    .pipe(dest(_config.output.path));
}

function clientBuild() {
  const _config = { ...config };
  _config.output = {
    filename: 'bundle.js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, '..', 'dist', 'client'),
    publicPath: '/',
    libraryTarget: 'umd',
  };
  _config.plugins = _config.plugins.concat([
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src', 'index.html'),
      filename: 'assets/index.html',
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
    }),
    // new BundleAnalyzerPlugin(),
    new BundleStatsWebpackPlugin({
      outDir: '..',
    }),
    new CleanWebpackPlugin(),
  ]);

  if (env === 'production') {
    _config.plugins.push(new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/*`, { nodir: true }),
    }));
  }

  if (env !== 'development') {
    _config.plugins.push(new ReactLoadablePlugin({
      filename: './dist/react-loadable.json',
    }));
  }

  return src(path.resolve(__dirname, '..', 'src', 'index.jsx'))
    .pipe(webpackStream(_config))
    .pipe(dest(_config.output.path));
}

function devServer(callback) {
  const _config = { ...config };
  _config.output = {
    filename: 'bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: 'http://localhost:3000/build/',
    libraryTarget: 'umd',
  };

  _config.entry = ['react-hot-loader/patch', './src/index.jsx'];

  _config.plugins = _config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
  ]);

  if (env === 'development') {
    _config.plugins.push(new ReactLoadablePlugin({
      filename: './dist/react-loadable.json',
    }));
  }

  const options = {
    contentBase: path.resolve(__dirname, '..', 'dist', 'client'),
    hot: true,
    host: 'localhost',
    port: devPort,
    publicPath: _config.output.publicPath,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  WebpackDevServer.addDevServerEntrypoints(_config, options);
  const compiler = webpack(_config);
  const server = new WebpackDevServer(compiler, options);

  server.listen(devPort, 'localhost', () => {
    callback();
  });
}

module.exports = {
  build: parallel(clientBuild, serverBuild),
  devServer,
};
