const { src, dest } = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackDevServer = require('webpack-dev-server');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const devPort = process.env.DEV_PORT || 3000;

const config = require('../webpack.config');

function build() {
  let clientConfig = Object.assign({}, config);
  clientConfig.output = {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/',
    libraryTarget: 'umd',
    globalObject: 'this',
  }
  clientConfig.plugins = clientConfig.plugins.concat([
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src', 'index.html'),
      filename: 'assets/index.html',
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
    }),
    new CleanWebpackPlugin(),
  ]);

  return src(path.resolve(__dirname, '..', 'src', 'index.js'))
    .pipe(webpackStream(clientConfig))
    .pipe(dest(clientConfig.output.path));
}

function devServer(callback) {
  let devConfig = Object.assign({}, config);
  devConfig.output = {
    filename: '[name].js',
    publicPath: 'http://localhost:3000/build/',
    libraryTarget: 'umd',
  }

  devConfig.plugins = devConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new ManifestPlugin({
      fileName: 'devserver.manifest.json',
    }),
  ]);

  const options = {
    contentBase: path.resolve(__dirname, '..', 'dist'),
    hot: true,
    host: 'localhost',
    port: devPort,
    publicPath: devConfig.output.publicPath,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  };

  webpackDevServer.addDevServerEntrypoints(devConfig, options);
  const compiler = webpack(devConfig);
  const server = new webpackDevServer(compiler, options);

  server.listen(devPort, 'localhost', () => {
    callback();
  });
}

module.exports = {
  build,
  devServer
};

