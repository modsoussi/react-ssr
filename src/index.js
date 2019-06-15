const React = require('react');
const { hydrate, render } = require('react-dom');
const App = require('./routes').default;
const { BrowserRouter } = require('react-router-dom');

if (typeof document !== 'undefined') {
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>, document.getElementById('app-root'));
} else {
  module.exports = App;
}

if (module.hot) {
  module.hot.accept('./routes', () => {
    console.log('Accepting Hello update');
    const NextApp = require('./routes').default;

    render(
      <BrowserRouter>
        <NextApp />
      </BrowserRouter>, document.getElementById('app-root'));
  });
}