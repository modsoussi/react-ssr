const fs = require('fs');
const express = require('express');
const { renderToStaticMarkup } = require('react-dom/server');
const React = require('react');
const color = require('ansi-colors');
const {
  App,
  StaticRouter,
} = require('./dist/index.node');
const Loadable = require('react-loadable');
const { getBundles } = require('react-loadable/webpack');
const manifest = require('./dist/react-loadable.json');

function server(port) {
  const app = express();

  app.use(express.static('dist'));

  app.get('*', (req, res) => {
    const context = {};
    let modules = []

    const app = React.createElement(
      StaticRouter,
      { location: req.url, context: context },
      React.createElement(
        Loadable.Capture,
        { report: (moduleName) => modules.push(moduleName)},
        React.createElement(App),
      ),
    );

    const markup = renderToStaticMarkup(app);
    const bundles = getBundles(manifest, modules);
    console.log(modules, bundles);

    fs.readFile('./dist/assets/index.html', 'utf-8', (err, html) => {
      if (err) {
        throw err;
      }

      html = html.replace(/{react_markup}/, markup);
      if (process.env.NODE_ENV === 'development') {
        html = html.replace(/"\/index.js"/, `http://localhost:${process.env.DEV_PORT}/build/index.js`);
        html = html.replace(/"\/index.css"/, `http://localhost:${process.env.DEV_PORT}/build/index.css`);
      }

      html = html.replace(/{loadable_scripts}/, bundles.map((bundle => `<script src="${bundle.publicPath}"></script>`)).join('/n'));

      res.status(200).send(html);
    })
  });

  Loadable.preloadAll().then(()=> {
    app.listen(port, () => {
      console.log(color.bold.green(`Ready on port ${port}`));
    });
  }).catch(err => console.error(err));
}

server(process.env.PORT || 5000);