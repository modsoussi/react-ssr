const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const { renderToStaticMarkup } = require('react-dom/server');
const React = require('react');
// eslint-disable-next-line import/no-extraneous-dependencies
const color = require('ansi-colors');
const Loadable = require('react-loadable');
const { getBundles } = require('react-loadable/webpack');
const {
  App,
  StaticRouter,
} = require('./dist/node/main.node');
const manifest = require('./dist/react-loadable.json');

function server(port) {
  const _app = express();

  _app.use(express.static('dist'));

  _app.get('*', (req, res) => {
    const context = {};
    const modules = [];

    const app = React.createElement(
      StaticRouter,
      { location: req.url, context },
      React.createElement(
        Loadable.Capture,
        { report: (moduleName) => modules.push(moduleName) },
        React.createElement(App),
      ),
    );

    const markup = renderToStaticMarkup(app);
    const bundles = getBundles(manifest, modules);

    fs.readFile('./dist/client/assets/index.html', 'utf-8', (err, html) => {
      if (err) {
        throw err;
      }

      let _html = html.replace(/{react_markup}/, markup);
      if (process.env.NODE_ENV === 'development') {
        _html = _html.replace(/"\/bundle.js"/, `http://localhost:${process.env.DEV_PORT}/build/bundle.js`);
        _html = _html.replace(/"\/main.css"/, `http://localhost:${process.env.DEV_PORT}/build/main.css`);
      }

      _html = _html.replace(/{loadable_scripts}/, bundles.map(((bundle) => `<script src="${bundle.publicPath}"></script>`)).join('/n'));

      res.status(200).send(_html);
    });
  });

  Loadable.preloadAll().then(() => {
    _app.listen(port, () => {
      console.log(color.bold.green(`Ready on port ${port}`));
    });
  }).catch((err) => console.error(err));
}

server(process.env.PORT || 5000);
