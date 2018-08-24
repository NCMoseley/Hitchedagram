import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, Image } from 'react-bootstrap';
import _ from 'lodash';

import { increaseLikes, toggleLike } from '../actions/likes';
import { getAll } from '../actions/getAll';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      posts: []
    };
    this.like = this.like.bind(this);
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    try {
      await this.props.getAll();
      console.log('home', this.props);
      const postsWithImages = this.props.posts;
      this.setState({
        postsWithImages
      });
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false });
  }

  like(userId) {
    const thisPost = this.state.postsWithImages.find(
      post => post.userId === userId
    );
    this.props.increaseLikes(thisPost);
    this.props.toggleLike(thisPost);
    this.forceUpdate();
  }

  renderpostsList(postsWithImages) {
    return (
      <div className="posts">
        {postsWithImages.map(post => (
          <ListGroup key={post.userId} className="single-post">
            <div key={post.userId} className="header level">
              <figure className="image is-32x32">
                <img
                  alt="gravatar"
                  key={post.attachment}
                  src={post.attachment}
                />
              </figure>
              <span key={post.userId} className="username">
                {post.userId}
              </span>
            </div>

            <div className="content">
              <Image
                style={{ backgroundImage: `url(${post.attachment})` }}
                className={`image-container ${post.filter}`}
                key={post.postId}
                onDoubleClick={_.partial(this.like, post.userId)}
                crossOrigin="anonymous"
                src={post.image}
              />
              <div className="heart">
                {post.hasBeenLiked ? (
                  <i
                    onClick={_.partial(this.like, post.userId)}
                    className="fas fa-heart fa-lg red"
                  />
                ) : (
                  <i
                    onClick={_.partial(this.like, post.userId)}
                    className="far fa-heart fa-lg"
                  />
                )}
              </div>
              <p key={post.likes} className="likes">
                {post.likes} likes
              </p>
              <p key={post.length} className="caption">
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
    increaseLikes: thisPost => dispatch(increaseLikes(thisPost)),
    toggleLike: thisPost => dispatch(toggleLike(thisPost))
  };
};

// Connected Component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
