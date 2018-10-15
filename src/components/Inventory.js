import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";

import AddFishForm from './AddFishForm';
import EditFishForm from "./EditFIshForm";
import Login from './Login';
import {firebaseApp} from "../base";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
  };
  
  authHandler = async authData => {
    
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  }

  render() {
    return <Login authenticate={this.authenticate} />;
    return (
      <div className="inventory">
        <h2>Inventory!!</h2>
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
           key={key}
           index={key}
           fish={this.props.fishes[key]}
           updateFish={this.props.updateFish}
           deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    )
  }
}
export default Inventory;
