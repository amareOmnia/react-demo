import React from "react";
import PropTypes from "prop-types";

const Login = props => (
  <nav className="login">
    <h2>Inventory</h2>
    <p>Sign in the manage your store's inventory</p>
    <button 
      className="github"
      onClick={() => props.authenticate('Github')}
      >
      Log in with github
      </button>
    <button 
      className="twitter" // no "google" style available
      onClick={() => props.authenticate('Google')}
      >
      Log in with google
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
}

export default Login;