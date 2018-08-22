import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import './app.css';
// import ScreenBody from '../spare/ScreenBody';
// import Popup from './components/PopUp.js';
import Routes from './Routes';
import { Auth } from 'aws-amplify';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
      isAuthenticated: false,
      isAuthenticating: true
    };
    this.goToProfile = this.goToProfile.bind(this);
    this.goToCreate = this.goToCreate.bind(this);
  }

  async componentDidMount() {
    try {
      if (await Auth.currentSession()) {
        this.userHasAuthenticated(true);
      }
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    this.setState({ isAuthenticating: false });
  }

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    this.props.history.push('/login');
  };

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };
  goToCreate() {
    this.props.history.push('/posts/new');
  }
  goToProfile() {
    this.props.history.push('/profile');
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      !this.state.isAuthenticating && (
        <div className="app">
          <header className="fixed-header">
            <Navbar fluid collapseOnSelect>
              <Navbar.Header>
                <Link className="app-title" to="/">
                  Hitchedagram
                </Link>
                <Navbar.Toggle />
              </Navbar.Header>

              <Navbar.Collapse>
                <Nav pullRight>
                  {this.state.isAuthenticated ? (
                    <NavItem className="logout" onClick={this.handleLogout}>
                      Logout
                    </NavItem>
                  ) : (
                    <Fragment>
                      <LinkContainer className="signup" to="/signup">
                        <NavItem>Signup</NavItem>
                      </LinkContainer>
                      <LinkContainer className="login" to="/login">
                        <NavItem>Login</NavItem>
                      </LinkContainer>
                    </Fragment>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </header>

          <Routes childProps={childProps} />

          {/* <ScreenBody /> */}
          <div className="phone-footer">
            <div onClick={this.goToProfile} className="home-cta">
              <i className="fas fa-home fa-lg cursor" />
            </div>
            <div onClick={this.goToCreate} className="upload-cta">
              <i className="far fa-plus-square fa-lg cursor" />
            </div>
          </div>
        </div>
      )
    );
  }
}

export default withRouter(App);
