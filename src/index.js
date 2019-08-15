const React = require('react');
const { hydrate, render } = require('react-dom');
const App = require('./routes').default;
const { BrowserRouter, StaticRouter } = require('react-router-dom');
const Loadable = require('react-loadable');

if (typeof document !== 'undefined') {
  Loadable.preloadReady().then(() => hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>, document.getElementById('app-root')));
} else {
  // We export StaticRouter so server and client use the exact same singleton context instance
  module.exports = { App, StaticRouter, Loadable };
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