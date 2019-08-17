import React from 'react';
import { Route, Link } from 'react-router-dom';
import loadable from 'react-loadable';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';
import Hello from './Hello';

import './app.css';

const AsyncBye = loadable({
  loader: () => import('./Bye'),
  loading: () => <div>Loading...</div>,
});

const AsyncHit = loadable({
  loader: () => import('./Hit'),
  loading: () => <div>Loading...</div>,
});

const App = () => (
  <div>
    <nav>
      <ul className="flex flex-row w-full">
        <li className="p-2 hover:bg-gray-200"><Link to="/">Hello</Link></li>
        <li className="p-2 hover:bg-gray-200"><Link to="/bye">Bye</Link></li>
        <li className="p-2 hover:bg-gray-200"><Link to="/hit">Hit</Link></li>
      </ul>
    </nav>

    <Route path="/" exact component={Hello} />
    <Route path="/bye" component={AsyncBye} />
    <Route path="/hit" component={AsyncHit} />
  </div>
);

export default hot(App);
