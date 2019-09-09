/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Head from '../../components/Head';
import Body from '../../components/Body';

import './hello.css';

class Hello extends React.Component {
  render() {
    return (
      <div>
        <Head />
        <Body />
      </div>
    );
  }
}

export default Hello;
