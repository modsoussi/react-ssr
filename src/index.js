const React = require('react');
const { hydrate, render } = require('react-dom');
const Hello = require('./Hello').default;

if (typeof document !== 'undefined') {
  hydrate(<Hello />, document.getElementById('app-root'));
} else {
  module.exports = Hello;
}

if (module.hot) {
  module.hot.accept('./Hello', () => {
    console.log('Accepting Hello update');
    const NextHello = require('./Hello').default;
    render(<NextHello />, document.getElementById('app-root'));
  });
}