import React from 'react';

// eslint-disable-next-line react/display-name
export default class extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      hits: 0,
    };
  }

  hit() {
    this.setState((prev) => ({
      hits: prev.hits + 1,
    }));
  }

  render() {
    return (
      <div>
        <button className="" onClick={this.hit.bind(this)}>Hit</button>
        <p>{this.state.hits} hits</p>
      </div>
    );
  }
}
