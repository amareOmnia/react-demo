import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";

import AddFishForm from './AddFishForm';
import EditFishForm from "./EditFIshForm";
import Login from './Login';
import base, {firebaseApp} from "../base";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
  };
  
  static state = {
    uid: null,
    owner: null,
  }

  authHandler = async authData => {
    // lookup current store in FB database
    const store = await base.fetch(this.props.storeId, { context: this }); // await prevents promise assignment
    console.log("store: ", store);
    // claim it if no owner
    if (!store.owner) {
      //save user as owner
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    // set state of inventory component to reflect user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    })
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({user});
      }
    })
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  }

  logout = async () => {
    console.log('loggin\' out yo');
    await firebase.auth().signOut();
    this.setState({uid : null});
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out!!!</button>;
    //check for current login
    if(this.state==null || !this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    };
    if(this.state.uid !== this.state.owner) {
      return(
        <div>
          <p>Sorry bro, you're not the owner!</p>
          {logout}
        </div>
      )
    }
    return (
      <div className="inventory">
        <h2>Inventory!!</h2>
        {logout}
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
