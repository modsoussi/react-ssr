const fs = require('fs');
const express = require('express');
const { renderToStaticMarkup } = require('react-dom/server');
const React = require('react');

const component = require('./dist');

function server(port) {
  const app = express();

  app.use(express.static('dist'));

  app.get('*', (req, res) => {
    const markup = renderToStaticMarkup(React.createElement(component));

    fs.readFile('./dist/assets/index.html', 'utf-8', (err, html) => {
      if (err) {
        throw err;
      }

      res.status(200).send(html.replace(/{react_markup}/, markup));
    })
  });

  app.listen(port, () => {
    console.log('Ready');
  });
}

server(5000);