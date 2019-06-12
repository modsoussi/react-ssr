const fs = require('fs');
const express = require('express');
const { renderToStaticMarkup } = require('react-dom/server');
const React = require('react');

function server(port) {
  const app = express();

  app.use(express.static('dist'));

  app.get('*', (req, res) => {
    const component = require('./dist');
    const markup = renderToStaticMarkup(React.createElement(component));
    console.log(markup);

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
    console.log(`Ready on port ${port}`);
  });
}

server(process.env.PORT || 5000);