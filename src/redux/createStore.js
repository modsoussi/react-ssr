import thunk from 'redux-thunk';
import { createStore as _createStore, applyMiddleware, compose } from 'redux';

export default function createStore(data) {
  // react router redux middleware to have to access to routing
  // action creators.
  const middlware = [thunk];

  let createFinalStore;
  // eslint-disable-next-line no-undef
  if (__NODE_ENV__ !== 'production') {
    createFinalStore = compose(
      applyMiddleware(...middlware),
      typeof window !== 'undefined' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function'
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (c) => c,
    )(_createStore);
  } else {
    createFinalStore = applyMiddleware(...middlware)(_createStore);
  }

  // eslint-disable-next-line global-require
  const reducer = require('./modules/reducer').default;

  const store = createFinalStore(reducer, data);

  // eslint-disable-next-line no-undef
  if (module.hot) {
    module.hot.accept('./modules/reducer', () => {
      // eslint-disable-next-line global-require
      store.replaceReducer(require('./modules/reducer').default);
    });
  }

  return store;
}
