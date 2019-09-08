import React from 'react';
import Head from '../../components/Head';
import Body from '../../components/Body';

import './hello.css';

class Hello extends React.Component {
  componentDidMount() {
    console.log('Hello componentDidMount');
  }

  render() {
    console.log('Hello render');

    return (
      <div>
        <Head />
        <Body />
      </div>
    );
  }
}

export default Hello;
