import React, { Component } from 'react';
import './post.css';
import _ from 'lodash';
// import { PageHeader, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { API } from 'aws-amplify';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      posts: []
    };
    // this.getImage = this.getImage.bind(this);
    this.like = this.like.bind(this);
  }

  // getItems() {
  //   API.get(apiName, path).then(response => {
  //     console.log(response);
  //     this.setState({
  //       itemData: response.data
  //     });
  //   });
  // }

  async componentDidMount() {
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

  // async getImage(attachment) {
  //   const image = await Storage.vault.get(attachment);
  //   console.log(image);
  // }

  like(username) {
    // eslint-disable-next-line
    const thisPost = this.state.posts.find(post => post.username === username);
    // eslint-disable-next-line
    const liked = thisPost.hasBeenLiked ? thisPost.likes-- : thisPost.likes++;
    thisPost.hasBeenLiked = !thisPost.hasBeenLiked;

    this.forceUpdate();
  }

  render() {
    return (
      <div className="posts">
        {this.state.posts.map(post => (
          <div key={post.username} className="single-post">
            <div key={post.username} className="header level">
              <figure className="image is-32x32">
                <img alt="gravatar" key={post.userImage} src={post.userImage} />
              </figure>
              <span key={post.username} className="username">
                {post.username}
              </span>
            </div>

            <div key={post.postImage} className="content">
              <div
                onDoubleClick={_.partial(this.like, post.username)}
                className={`image-container ${post.filter}`}
                style={{ backgroundImage: `url(${post.postImage})` }}
                key={post.postImage}
              />
              <div key={post.postImage} className="heart">
                {post.hasBeenLiked ? (
                  <i
                    onClick={_.partial(this.like, post.username)}
                    className="fas fa-heart fa-lg red"
                    key={post.postImage}
                  />
                ) : (
                  <i
                    onClick={_.partial(this.like, post.username)}
                    className="far fa-heart fa-lg"
                    key={post.postImage}
                  />
                )}
              </div>
              <p key={post.likes} className="likes">
                {post.likes} likes
              </p>
              <p key={post.length} className="caption">
                <span>{post.username}:</span> {post.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Posts;
