import React, { Component } from 'react';
import './screenbody.css';
import cloudLoad from '../assets/cloud_load.gif';

class ScreenBody extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <img alt="loading..." src={cloudLoad} />;
    }
    return <div className="screenbody">{/* <Posts /> */}</div>;
  }
}

export default ScreenBody;
