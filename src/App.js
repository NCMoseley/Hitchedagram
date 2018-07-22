import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import './app.css';
import PhoneBody from './components/PhoneBody.js';
import Popup from './components/PopUp.js';
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
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      !this.state.isAuthenticating && (
        <div className="app">
          <header className="phone-header">
            <h1 className="app-title">Hitchedagram</h1>
          </header>
          <div className="SvrlsApp container">
            <Navbar fluid collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/">Scratch</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                  {this.state.isAuthenticated ? (
                    <NavItem onClick={this.handleLogout}>Logout</NavItem>
                  ) : (
                    <Fragment>
                      <LinkContainer to="/signup">
                        <NavItem>Signup</NavItem>
                      </LinkContainer>
                      <LinkContainer to="/login">
                        <NavItem>Login</NavItem>
                      </LinkContainer>
                    </Fragment>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Routes childProps={childProps} />
          </div>

          <PhoneBody />
          <div className="phone-footer">
            <div className="home-cta">
              <i className="fas fa-home fa-lg crsr" />
            </div>
            <div onClick={this.togglePopup.bind(this)} className="upload-cta">
              <i className="far fa-plus-square fa-lg crsr" />
            </div>
          </div>
          {this.state.showPopup ? (
            <Popup
              text="Choose an image from file"
              closePopup={this.togglePopup.bind(this)}
            />
          ) : null}
        </div>
      )
    );
  }
}

export default withRouter(App);
