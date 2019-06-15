import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Hello } from './Hello';
import { Bye } from './Bye';
import { Route, Link } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <nav>
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