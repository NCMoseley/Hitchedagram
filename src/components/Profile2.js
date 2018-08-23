import React, { Component } from 'react';

export default class Profile2 extends Component {
  render() {
    const { count, onIncreaseClick, onUpdateClick } = this.props;
    return (
      <div>
        <button onClick={onIncreaseClick}>Increase</button>
        <input value={count} type="text" onChange={onUpdateClick} />
      </div>
    );
  }
}
