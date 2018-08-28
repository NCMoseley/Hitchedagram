import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, Image } from 'react-bootstrap';
import _ from 'lodash';
import { Auth } from 'aws-amplify';
import Gravatar from 'react-gravatar';

import { createUser, getUsers } from '../actions/users';
import { whoLiked } from '../actions/likes';
import { getAll } from '../actions/getAll';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      postsWithImages: [],
      currentUserId: '',
      dbUsers: ''
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    if (this.props.newUser) {
      this.props.createUser(this.props.newUser);
    }
    try {
      await this.props.getUsers();
      await this.props.getAll();
      console.log('componentDidMount', this.props.dbUsers);
      const currentUserId =
        Auth._storage[
          'aws.cognito.identity-id.us-east-2:6730df8d-ac6a-4cc3-92cf-c464462c7656'
        ];
      const postsWithImages = this.props.posts;
      const dbUsers = this.props.dbUsers;
      const combined = postsWithImages.map(post => {
        post.userId = dbUsers.find(user => user.userId === post.userId);
      });
      // console.log(combined);
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
    const thisPost = this.state.postsWithImages.find(
      post => post.postId === postId
    );
    console.log(thisPost);
    this.props.whoLiked(thisPost, this.state.currentUserId);
    this.forceUpdate();
  };

  renderpostsList(postsWithImages) {
    console.log(postsWithImages);
    return (
      <div className="posts">
        {postsWithImages.map(post => (
          <ListGroup key={post.createdAt} className="single-post">
            <div className="header level">
              <figure className="image is-32x32">
                <Gravatar email={`${post.userId.ownerEmail}`} />
              </figure>
              <span className="username">{post.userId.ownerName}</span>
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
              <p className="caption">{post.content}</p>
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
    posts: state.allPostsReducer.posts,
    newUser: state.usersReducer.newUser,
    dbUsers: state.usersReducer.dbUsers
  };
}

// Map redux actions to component props
const mapDispatchToProps = dispatch => {
  return {
    getAll: () => dispatch(getAll()),
    whoLiked: (thisPost, currentUserId) =>
      dispatch(whoLiked(thisPost, currentUserId)),
    createUser: newUser => dispatch(createUser(newUser)),
    getUsers: () => dispatch(getUsers())
  };
};

// Connected Component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

//       const [itemsList, usersList] = response;

//       const combined = itemsList.map(item => {
//         item.itemowner = usersList.find(user => user.id === item.itemowner);

//         if (item.borrower) {
//           item.borrower = usersList.find(user => user.id === item.borrower);
//         }
//         return item;
//       });

//       dispatch(getProfile(combined));
//     })
//     .catch(error => dispatch(getProfileError(error)));
