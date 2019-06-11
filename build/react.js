const { parallel, src, dest } = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackDevServer = require('webpack-dev-server');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  ]);

  return src(path.resolve(__dirname, '..', 'src', 'index.js'))
    .pipe(webpackStream(clientConfig))
    .pipe(dest(clientConfig.output.path));
}

function devServer(callback) {
  let devConfig = Object.assign({}, config);
  devConfig.output = {
    filename: '[name].js',
    publicPath: '/',
    libraryTarget: 'umd',
  }

  const options = {
    contentBase: path.resolve(__dirname, '..', 'dist'),
    hot: true,
    host: 'localhost',
    port: 3000
  };

  webpackDevServer.addDevServerEntrypoints(devConfig, options);
  const compiler = webpack(devConfig);
  const server = new webpackDevServer(compiler, options);

  server.listen(3000, 'localhost', () => {
    console.log('Webpack Dev Server listening on 3000 ...');
    callback();
  });
}

module.exports = parallel(devServer, build);

