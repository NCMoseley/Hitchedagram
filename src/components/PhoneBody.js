import React, { Component } from 'react';
import './phonebody.css';
// import posts from '../data/posts';
// import filters from '../data/filters';
import Post from './Post';
import Loader from './Loader.js';

class PhoneBody extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1000);
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <Loader />;
    }
    return (
      <div className="phonebody">
        <Post />
      </div>
    );
  }
}

export default PhoneBody;
