import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class MainNav extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        {/* <h1>Time Tracker</h1> */}

        {this.props.isLoggedIn ? (
          <div>
            <Navbar color="light" light expand="md">
<<<<<<< HEAD
            <NavbarBrand href="/"> 
              <img src="/timeylogo.jpeg"  
              width="70" height="70"
             /></NavbarBrand>
=======
              <NavbarBrand href="/">Timey</NavbarBrand>
>>>>>>> 235f64bc157a881ab32f2cdd3ac259821dc56399
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <Link to="/home">Home</Link>
                  </NavItem>
                  <NavItem>
                    <a href="#" onClick={this.props.handleClick}>
                      Logout
                    </a>
                  </NavItem>
                  <NavItem>
                    <Link to="/projects/user/tables">Tickets Per Project</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/newproject">New Project</Link>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        ) : (
          <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/"> 
              <img src="./timeylogo.jpeg"  
              style={{width:100}}  /></NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <Link to="/login">Login</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/signup">Sign Up</Link>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        )}
        {/* <hr /> */}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(MainNav);

/**
 * PROP TYPES
 */
MainNav.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
