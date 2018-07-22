import React, { Component } from 'react';
import './popup.css';
import ImagePicker from './ImagePicker.js';

class Popup extends Component {
  render() {
    return (
      <div className="popup">
        <div className="popup-inner">
          <h1>{this.props.text}</h1>
          <ImagePicker />
          <div className="popup-footer">
            <i
              onClick={this.props.closePopup}
              className="fa fa-window-close fa-3x crsr"
              aria-hidden="true"
            />
            <i className="fas fa-arrow-right fa-3x crsr" aria-hidden="true" />
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
