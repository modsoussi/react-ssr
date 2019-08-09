import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Hello } from './Hello';
import { Route, Link } from 'react-router-dom';
import loadable from 'react-loadable';

const AsyncBye = loadable({
  loader: import('./Bye'),
  loading: () => <div>Loading...</div>,
})

import './app.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <ul className="flex flex-row w-full">
            <li className="p-2 hover:bg-gray-200"><Link to="/">Hello</Link></li>
            <li className="p-2 hover:bg-gray-200"><Link to="/bye">Bye</Link></li>
          </ul>
        </nav>

        <Route path="/" exact component={Hello} />
        <Route path="/bye" component={AsyncBye} />
      </div>
    )
  }
}

export default hot(App);