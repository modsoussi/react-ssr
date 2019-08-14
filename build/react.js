const { src, dest } = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackDevServer = require('webpack-dev-server');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const devPort = process.env.DEV_PORT || 3000;
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { BundleStatsWebpackPlugin } = require('bundle-stats');

const config = require('../webpack.config');
const env = process.env.NODE_ENV || 'development';

function serverBuild() {
  let _config = Object.assign({}, config);
  _config.output = {
    filename: '[name].node.js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/',
    libraryTarget: 'commonjs2',
    globalObject: 'this',
  }
  _config.target = 'node';

  return src(path.resolve(__dirname, '..', 'src', 'index.js'))
    .pipe(webpackStream(_config))
    .pipe(dest(_config.output.path));
}

function clientBuild() {
  let _config = Object.assign({}, config);
  _config.output = {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/',
    libraryTarget: 'umd',
  }
  _config.plugins = _config.plugins.concat([
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src', 'index.html'),
      filename: 'assets/index.html',
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
    }),
    new BundleAnalyzerPlugin(),
    new BundleStatsWebpackPlugin(),
  ]);

  if (env !== 'development') {
    _config.plugins.push(new ReactLoadablePlugin({
      filename: './dist/react-loadable.json',
    }));
  }

  return src(path.resolve(__dirname, '..', 'src', 'index.js'))
    .pipe(webpackStream(_config))
    .pipe(dest(_config.output.path));
}

function devServer(callback) {
  let _config = Object.assign({}, config);
  _config.output = {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: 'http://localhost:3000/build/',
    libraryTarget: 'umd',
  }

  _config.plugins = _config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
  ]);

  if (env === 'development') {
    _config.plugins.push(new ReactLoadablePlugin({
      filename: './dist/react-loadable.json',
    }));
  }

  const options = {
    contentBase: path.resolve(__dirname, '..', 'dist'),
    hot: true,
    host: 'localhost',
    port: devPort,
    publicPath: _config.output.publicPath,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  };

  webpackDevServer.addDevServerEntrypoints(_config, options);
  const compiler = webpack(_config);
  const server = new webpackDevServer(compiler, options);

  server.listen(devPort, 'localhost', () => {
    callback();
  });
}

module.exports = {
  clientBuild,
  serverBuild,
  devServer
};

