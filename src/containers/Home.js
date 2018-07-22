import React, { Component } from 'react';
import './home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Hitchedagram</h1>
          <p>A simple photo uploading app for guests</p>
        </div>
      </div>
    );
  }
}
