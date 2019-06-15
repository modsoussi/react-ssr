const fs = require('fs');
const express = require('express');
const { renderToStaticMarkup } = require('react-dom/server');
const React = require('react');
const color = require('ansi-colors');
const { StaticRouter } = require('react-router-dom');

function server(port) {
  const app = express();

  app.use(express.static('dist'));

  app.get('*', (req, res) => {
    const component = require('./dist');
    const context = {};

    const app = React.createElement(
      StaticRouter,
      { location: req.url, context: context },
      React.createElement(component)
    );
    console.log(app);

    const markup = renderToStaticMarkup(app);

    fs.readFile('./dist/assets/index.html', 'utf-8', (err, html) => {
      if (err) {
        throw err;
      }

      html = html.replace(/{react_markup}/, markup);
      if (process.env.NODE_ENV === 'development') {
        html = html.replace(/"\/index.js"/, `http://localhost:${process.env.DEV_PORT}/build/index.js`);
      }

      res.status(200).send(html);
    })
  });

  app.listen(port, () => {
    console.log(color.bold.green(`Ready on port ${port}`));
  });
}

server(process.env.PORT || 5000);