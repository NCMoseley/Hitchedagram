import React, { Component } from 'react';
import './post.css';
import { posts } from '../data/posts';
import _ from 'lodash';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    console.log(posts);

    this.like = this.like.bind(this);
  }

  like(username) {
    // eslint-disable-next-line
    const thisPost = posts.find(post => post.username === username);
    // eslint-disable-next-line
    const liked = thisPost.hasBeenLiked ? thisPost.likes-- : thisPost.likes++;
    thisPost.hasBeenLiked = !thisPost.hasBeenLiked;

    this.forceUpdate();
  }

  render() {
    return (
      <div className="posts">
        {posts.map(post => (
          <div className="single-post">
            <div className="header level">
              <figure className="image is-32x32">
                <img alt="gravatar" key={post.userImage} src={post.userImage} />
              </figure>
              <span key={post.username} className="username">
                {post.username}
              </span>
            </div>

            <div className="content">
              <div
                onDoubleClick={_.partial(this.like, post.username)}
                className={`image-container ${post.filter}`}
                style={{ backgroundImage: `url(${post.postImage})` }}
                key={post.postImage}
              />
              <div className="heart">
                {post.hasBeenLiked ? (
                  <i
                    onClick={_.partial(this.like, post.username)}
                    className="fas fa-heart fa-lg red"
                  />
                ) : (
                  <i
                    onClick={_.partial(this.like, post.username)}
                    className="far fa-heart fa-lg"
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

export default Post;
