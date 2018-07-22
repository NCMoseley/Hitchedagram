import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import './app.css';
import PhoneBody from './components/PhoneBody.js';
import Popup from './components/PopUp.js';
import Routes from './Routes';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showPopup: false
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  render() {
    return (
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
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes />
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
    );
  }
}

export default App;
