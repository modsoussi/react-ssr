/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Clicker from '../../components/Clicker';

import './hello.css';

class Hello extends React.Component {
  render() {
    return (
      <div>
        <Clicker />
      </div>
    );
  }
}

export default Hello;
