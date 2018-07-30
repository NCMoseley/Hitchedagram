import React, { Component } from 'react';
import { PageHeader, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { API, Storage } from 'aws-amplify';
import './home.css';
import { s3Fetch } from '../libs/awsLib';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      posts: []
    };
    this.getImage = this.getImage.bind(this);
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    try {
      const posts = await this.posts();
      this.setState({
        posts
      });
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false });
  }

  posts() {
    return API.get('posts', '/posts');
  }

  async getImage(attachment) {
    const image = await Storage.vault.get(attachment);
    console.log(image);
    return image;
  }

  renderpostsList(posts) {
    console.log(posts);
    return [{}].concat(posts).map(
      (post, i) =>
        i !== 0 ? (
          <ListGroupItem
            key={post.postId}
            href={`/posts/${post.postId}`}
            onClick={this.handlepostClick}
            header={post.content.trim().split('\n')[0]}
          >
            <Image src={this.getImage(post.attachment)} />
            {'Created: ' + new Date(post.createdAt).toLocaleString()}
          </ListGroupItem>
        ) : (
          <ListGroupItem
            key="new"
            href="/posts/new"
            onClick={this.handlepostClick}
          >
            <h4>
              <b>{'\uFF0B'}</b> Create a new post
            </h4>
          </ListGroupItem>
        )
    );
  }

  handlepostClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute('href'));
  };

  renderLander() {
    return (
      <div className="lander">
        <h1>Hitchedagram</h1>
        <p>A simple photo uploading app for guests</p>
      </div>
    );
  }

  renderposts() {
    return (
      <div className="posts">
        <PageHeader>Your posts</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderpostsList(this.state.posts)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="home">
        {this.props.isAuthenticated ? this.renderposts() : this.renderLander()}
      </div>
    );
  }
}
