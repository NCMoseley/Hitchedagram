import React, { Component } from 'react';
import { PageHeader, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { API, Storage } from 'aws-amplify';

// import _ from 'lodash';
import './profile.css';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      posts: []
    };
    this.getImage = this.getImage.bind(this);
    // console.log(this.props);
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    try {
      const posts = await this.posts();
      const postsWithImages = await Promise.all(
        posts.map(async post => {
          const image = await this.getImage(post.attachment);
          return { ...post, image };
        })
      );
      this.setState({
        postsWithImages
      });
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false });
  }

  posts() {
    // const currentUserId =
    //   Auth._storage[
    //     'aws.cognito.identity-id.us-east-2:6730df8d-ac6a-4cc3-92cf-c464462c7656'
    //   ];
    return API.get('HitchedagramAPI', '/posts');
  }

  async getImage(attachment) {
    const image = await Storage.get(attachment);
    // console.log('getImage', image);
    return image;
  }

  renderpostsList(postsWithImages) {
    // console.log(postsWithImages);
    // const myPost = postsWithImages.map(post => post.userId === userId);
    return [{}].concat(postsWithImages).map(
      (post, i) =>
        i !== 0 ? (
          <ListGroupItem
            key={post.postId}
            href={`/posts/${post.postId}`}
            // onClick={this.handlepostClick}
            header={post.content.trim().split('\n')[0]}
          >
            <Image key={post.postId} crossOrigin="anonymous" src={post.image} />
            {'Created: ' + new Date(post.createdAt).toLocaleString()}
          </ListGroupItem>
        ) : (
          <ListGroupItem
            key="new"
            href="/posts/new"
            // onClick={this.handlepostClick}
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
          {!this.state.isLoading &&
            this.renderpostsList(this.state.postsWithImages)}
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
