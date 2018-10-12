import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from './Fish'
import base from '../base'

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };
  
  componentDidMount() {
    const { params } = this.props.match;
    // reinstate local storage
    const localStorageRef = localStorage.getItem(params.storeId)
    if (localStorageRef) {
      this.setState({order: JSON.parse(localStorageRef) });
    }
    // sync fish state with firebase
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
      
    });
  };

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  };

  // removes access to database upon user leaving
  componentWillUnmount() {
  base.removeBinding(this.ref);
  };

  addFish = fish => { 
    // grab copy of existing state (other fishes)
    const fishes = {...this.state.fishes};
    // grab new fish
    fishes[`fish${Date.now()}`] = fish;
    //update new object + to state
    this.setState({fishes});
  };

  updateFish = (key, updatedFish) => {
    console.log('updating fish')
    // take copy of state
    const fishes = {...this.state.fishes};
    // update state
    fishes[key]= updatedFish;
    //set to state
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    // copy current state
    const fishes = {...this.state.fishes};
    // update temp state
    fishes[key] = null;
    // update true state
    this.setState({fishes});
  };
  
  loadSampleFishes = () => {
    this.setState({fishes : sampleFishes});
  };
  
  addToOrder = key => {
  // take copy of state
    const order = {...this.state.order};
    // add or update order
    order[key] = order[key] + 1 || 1;
    // call setState
    this.setState({order});
  };

  removeFromOrder = key => {
    // take copy of state
    const order = {...this.state.order};
    // remove from temp order
    delete order[key];
    // call setState
    this.setState({order});
  };

  render() {
    return (
      <div className="catch-of-the-day">

        <div className="menu">
          <Header tagline="The cake is a lie"/>
          <ul className="fishes">
            {/* get current state of fishes, maps to unique keys, then attributes details*/}
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index = {key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />))}
          </ul>
        </div>

        <Order 
          fishes = {this.state.fishes} 
          order = {this.state.order}
          removeFromOrder = {this.removeFromOrder}
        />
        <Inventory 
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes = {this.state.fishes}
        />
      </div>
    );
  };
}

export default App;
