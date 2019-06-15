const React = require('react');
const { hydrate, render } = require('react-dom');
const App = require('./routes').default;
const { BrowserRouter } = require('react-router-dom');

if (typeof document !== 'undefined') {
  const Client = (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )

  hydrate(<Client />, document.getElementById('app-root'));
} else {
  module.exports = App;
}

if (module.hot) {
  module.hot.accept('./routes', () => {
    console.log('Accepting Hello update');
    const NextApp = require('./routes').default;
    const NextClient = (
      <BrowserRouter>
        <NextApp />
      </BrowserRouter>
    )
    render(<NextClient />, document.getElementById('app-root'));
  });
}