import React from 'react';

class Body extends React.Component {
  componentDidMount() {
    console.log('Body componentDidMount');
  }

  render() {
    console.log('Body render');

    return (
      <div>Body</div>
    );
  }
}

export default Body;
