import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageHeader, ListGroup, ListGroupItem, Image } from 'react-bootstrap';

import Profile2 from '../components/Profile2';
import { increaseLikes } from '../actions/likes';
import { getPosts } from '../actions/getPosts';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      posts: []
    };
    // console.log('this.props from ProfileContainer constructor', this.props);
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    try {
      await this.props.getPosts();
      const postsWithImages = this.props.posts;
      this.setState({
        postsWithImages
      });
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false });
  }

  renderpostsList(postsWithImages) {
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
        <p>A simple photo uploading app for wedding guests</p>
      </div>
    );
  }

  renderposts() {
    return (
      <div className="posts">
        <Profile2 />
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
      <div className="profile">
        {this.props.isAuthenticated ? this.renderposts() : this.renderLander()}
      </div>
    );
  }
}

// Map redux state to component props
function mapStateToProps(state) {
  return {
    count: state.countReducer.count,
    wish_value: state.countReducer.wish_value,
    posts: state.postsReducer.posts
  };
}

// Map redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseLikes()),
    // onUpdateClick: event => dispatch(actions.updateTodo(event.target.value)),
    getPosts: () => dispatch(getPosts())
  };
}

// Connected Component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
