import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, Image } from 'react-bootstrap';
import _ from 'lodash';
import { Auth } from 'aws-amplify';

import { whoLiked } from '../actions/likes';
import { getAll } from '../actions/getAll';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      postsWithImages: [],
      currentUserId: ''
    };
    // this.like = this.like.bind(this);
    // this.heartCount = this.like.heartCount(this);
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    try {
      await this.props.getAll();
      console.log('componentDidMount', this.props.posts);
      const currentUserId =
        Auth._storage[
          'aws.cognito.identity-id.us-east-2:6730df8d-ac6a-4cc3-92cf-c464462c7656'
        ];
      const postsWithImages = this.props.posts;
      this.setState({
        postsWithImages,
        currentUserId
      });
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false });
  }

  like = postId => {
    const currentUserId =
      Auth._storage[
        'aws.cognito.identity-id.us-east-2:6730df8d-ac6a-4cc3-92cf-c464462c7656'
      ];
    const thisPost = this.state.postsWithImages.find(
      post => post.postId === postId
    );
    this.props.whoLiked(thisPost, currentUserId);
    this.forceUpdate();
  };

  renderpostsList(postsWithImages) {
    return (
      <div className="posts">
        {postsWithImages.map(post => (
          <ListGroup key={post.createdAt} className="single-post">
            <div className="header level">
              <figure className="image is-32x32">
                <img alt="gravatar" src={post.attachment} />
              </figure>
              <span className="username">{post.userId}</span>
            </div>

            <div className="content">
              <Image
                style={{ backgroundImage: `url(${post.attachment})` }}
                className={`image-container ${post.filter}`}
                onDoubleClick={_.partial(this.like, post.postId)}
                crossOrigin="anonymous"
                src={post.image}
              />
              <div className="heart">
                {post.whoLiked &&
                post.whoLiked.includes(this.state.currentUserId) ? (
                  <i
                    onClick={_.partial(this.like, post.postId)}
                    className="fas fa-heart fa-lg red"
                  />
                ) : (
                  <i
                    onClick={_.partial(this.like, post.postId)}
                    className="far fa-heart fa-lg"
                  />
                )}
              </div>
              <p className="likes">
                {post.whoLiked && post.whoLiked.length} likes
              </p>
              <p className="caption">
                <span>{post.userId}:</span>
                {post.content}
              </p>
            </div>
          </ListGroup>
        ))}
      </div>
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

// Map redux state to component props
function mapStateToProps(state) {
  return {
    posts: state.allPostsReducer.posts
  };
}

// Map redux actions to component props
const mapDispatchToProps = dispatch => {
  return {
    getAll: () => dispatch(getAll()),
    whoLiked: (thisPost, currentUserId) =>
      dispatch(whoLiked(thisPost, currentUserId))
    // toggleLike: thisPost => dispatch(toggleLike(thisPost))
    // increaseLikes: (thisPost, currentUserId) =>
    //   dispatch(increaseLikes(thisPost, currentUserId))
  };
};

// Connected Component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
