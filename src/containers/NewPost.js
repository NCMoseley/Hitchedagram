import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { API } from 'aws-amplify';

import config from '../config';
import { s3Upload } from '../libs/awsLib';
import LoaderButton from '../components/LoaderButton';
import DropdownButton from '../components/DropdownButton';
import './newPost.css';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.file = null;
    this.state = {
      isLoading: null,
      content: '',
      hasBeenLiked: false,
      whoLiked: [],
      filter: 'normal',
      ownerEmail: '',
      ownerName: ''
    };
    console.log(this.props.newUser);
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleFileChange = event => {
    this.file = event.target.files[0];
  };

  handleSubmit = async event => {
    event.preventDefault();
    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }
    this.setState({ isLoading: true });

    try {
      const attachment = this.file ? await s3Upload(this.file) : null;
      await this.createPost({
        attachment,
        content: this.state.content,
        likes: 0,
        hasBeenLiked: false,
        whoLiked: [],
        filter: 'normal'
      });
      this.props.history.push('/');
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  };

  createPost(post) {
    return API.post('HitchedagramAPI', '/posts', {
      body: post
    });
  }

  render() {
    return (
      <div className="newPost">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
          <DropdownButton />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // posts: state.allPostsReducer.posts,
    // newUser: state.usersReducer.user
  };
}

// Map redux actions to component props
const mapDispatchToProps = dispatch => {
  return {
    // getAll: () => dispatch(getAll()),
    // whoLiked: (thisPost, currentUserId) =>
    //   dispatch(whoLiked(thisPost, currentUserId)),
    // createUser: newUser => dispatch(createUser(newUser))
  };
};

// Connected Component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost);
