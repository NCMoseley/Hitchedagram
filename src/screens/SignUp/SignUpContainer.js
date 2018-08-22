import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { createUserInAuthAndDB } from '../../helpers/firebaseAuth';
import { headerBarStyle } from '../../config/styles';
import SignUp from './SignUp';
export default class SignUpContainer extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  static navigationOptions = ({ navigation }) => ({
    title: 'SIGN UP',
    ...headerBarStyle(navigation)
  });
  constructor() {
    super();
    this.state = {
      fullname: '',
      email: '',
      password: '',
      showPassword: false,
      fullnameErr: { isError: false, text: '' },
      emailErr: { isError: false, text: '' },
      passwordErr: { isError: false, text: '' },
      firebaseErr: { isError: false, text: '' },
      loading: false
    };
    this.updateFullname = this.updateFullname.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkFullname = this.checkFullname.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.togglePasswordView = this.togglePasswordView.bind(this);
    this.submit = this.submit.bind(this);
  }

  updateFullname(text) {
    this.setState({
      fullname: text
    });
  }
  updateEmail(text) {
    this.setState({
      email: text
    });
  }
  updatePassword(text) {
    this.setState({
      password: text
    });
  }

  checkFullname() {
    if (this.state.fullname.length < 1) {
      this.setState({
        fullnameErr: { isError: true, text: 'Full Name is required.' }
      });
    } else {
      this.setState({ fullnameErr: { isError: false, text: 'valid' } });
    }
  }
  checkEmail() {
    if (this.state.email.length < 1) {
      this.setState({
        emailErr: { isError: true, text: 'Email is required.' }
      });
    } else if (
      /* eslint-disable-next-line */
      !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        this.state.email
      )
    ) {
      this.setState({
        emailErr: { isError: true, text: 'Please enter a valid email.' }
      });
    } else {
      this.setState({ emailErr: { isError: false, text: 'valid' } });
    }
  }
  checkPassword(text = '') {
    if (text.length < 1) {
      this.setState({
        passwordErr: { isError: true, text: 'Password is required.' }
      });
    } else if (text.length < 6) {
      this.setState({
        passwordErr: {
          isError: true,
          text: 'Password must be at least 6 characters'
        }
      });
    } else {
      this.setState({ passwordErr: { isError: false, text: 'valid' } });
    }
  }
  togglePasswordView() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  async submit() {
    this.setState({ loading: true });
    try {
      await createUserInAuthAndDB(
        this.state.fullname,
        this.state.email.toLowerCase(),
        this.state.password
      );
    } catch (e) {
      this.setState({
        firebaseErr: {
          isError: true,
          text: e.message
        },
        loading: false
      });
      return;
    }
    this.setState({
      firebaseErr: {
        isError: false,
        text: ''
      },
      loading: false
    });
    this.props.navigation.navigate('SignUpWorkStyle');
  }
  render() {
    return (
      <SignUp
        updateFullname={this.updateFullname}
        updateEmail={this.updateEmail}
        updatePassword={this.updatePassword}
        fullname={this.state.fullname}
        email={this.state.email}
        password={this.state.password}
        fullnameErr={this.state.fullnameErr}
        emailErr={this.state.emailErr}
        passwordErr={this.state.passwordErr}
        checkFullname={this.checkFullname}
        checkEmail={this.checkEmail}
        checkPassword={this.checkPassword}
        showPassword={this.state.showPassword}
        togglePasswordView={this.togglePasswordView}
        submit={this.submit}
        loading={this.state.loading}
        firebaseErr={this.state.firebaseErr}
      />
    );
  }
}
