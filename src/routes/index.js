import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Hello } from './Hello';
import { Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={Hello} />
      </div>
    )
  }
}

export default hot(App);