import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Hello } from './Hello';
import { Bye } from './Bye';
import { Route, Link } from 'react-router-dom';

import './app.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="container flex bg-gray-200">
          <ul>
            <li><Link to="/">Hello</Link></li>
            <li><Link to="/bye">Bye</Link></li>
          </ul>
        </nav>

        <Route path="/" exact component={Hello} />
        <Route path="/bye" component={Bye} />
      </div>
    )
  }
}

export default hot(App);