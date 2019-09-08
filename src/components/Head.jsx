import React from 'react';

class Head extends React.Component {
  componentDidMount() {
    console.log('Head componentDidMount');
  }

  render() {
    console.log('Head render');

    return (
      <div>Head</div>
    );
  }
}

export default Head;
