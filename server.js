const fs = require('fs');
const express = require('express');
const { renderToStaticMarkup } = require('react-dom/server');
const React = require('react');
const color = require('ansi-colors');
const {
  App,
  StaticRouter,
  Loadable
} = require('./dist');

function server(port) {
  const app = express();

  app.use(express.static('dist'));

  app.get('*', (req, res) => {
    const context = {};
    const modules = []

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

    fs.readFile('./dist/assets/index.html', 'utf-8', (err, html) => {
      if (err) {
        throw err;
      }

      html = html.replace(/{react_markup}/, markup);
      if (process.env.NODE_ENV === 'development') {
        html = html.replace(/"\/index.js"/, `http://localhost:${process.env.DEV_PORT}/build/index.js`);
        html = html.replace(/"\/index.css"/, `http://localhost:${process.env.DEV_PORT}/build/index.css`);
      }

      res.status(200).send(html);
    })
  });

  Loadable.preloadAll().then(()=> {
    app.listen(port, () => {
      console.log(color.bold.green(`Ready on port ${port}`));
    });
  });
}

server(process.env.PORT || 5000);