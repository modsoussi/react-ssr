const React = require('react');
const { hydrate, render } = require('react-dom');
const { BrowserRouter } = require('react-router-dom');
const Loadable = require('react-loadable');
const { Provider } = require('react-redux');
const App = require('./routes').default;
const createStore = require('./redux/createStore').default;

if (typeof document !== 'undefined') {
  const data = window.__redux_data;
  delete window.__redux_data;

  const store = createStore(data);

  Loadable.preloadReady().then(() => hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>, document.getElementById('app-root'),
  ));
} else {
  module.exports = {
    App,
  };
}

if (module.hot) {
  module.hot.accept('./routes', () => {
    console.log('Accepting Hello update');
    // eslint-disable-next-line global-require
    const NextApp = require('./routes').default;

    render(
      <BrowserRouter>
        <NextApp />
      </BrowserRouter>, document.getElementById('app-root'),
    );
  });
}
