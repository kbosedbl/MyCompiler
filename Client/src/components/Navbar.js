import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem('userTokenTime')
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container">
          <Link className="navbar-brand" to="/">Welcome to MyCompiler</Link>          
          
            <div className="navbar-nav">
              {this.state.loggedIn ?
                <React.Fragment>                  
                  <NavLink className="nav-item nav-link" to="/signOut">Sign Out</NavLink>
                </React.Fragment>
                :
                <React.Fragment>
                  <NavLink className="nav-item nav-link" to="/signIn">Sign In</NavLink>
                  <NavLink className="nav-item nav-link" to="/signUp">Sign Up</NavLink>
                </React.Fragment>}
            </div>          
        </div>
      </nav>
    );
  }
}

export default Navbar;