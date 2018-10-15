import React from 'react';
import PropTypes from "prop-types";

import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  myInput = React.createRef();
  
  static propTypes = {
    // exception handler for improper this.prop imports   
    history: PropTypes.object.isRequired,
  };
  goToStore = event => {
    // stop form submission
    event.preventDefault();
    // get text from input
    const newPage = this.myInput.current.value;
    // change page name and goto
    // PUSH command doesn't reload page
    this.props.history.push(`/store/${newPage}`)
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        {/* This is what comments look like, must be inside */}
        <h2>Please Don't Enter A Store</h2>
        <input
          type="text"
          ref={this.myInput}
          required placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store -></button>
      </form>
    )
  }
}

export default StorePicker;

/*    one way to define THIS to one instance is below. if done, goToStore method is declared like so:
            goToStore() { ..... }
      otherwise, you gotta do
            goToStore = event => { .... }      */

  /* constructor() {
    super(); //creates react.component to extend to StorePicker
    this.goToStore = this.goToStore.bind(this); //defines "this" to specific StorePicker instance
  } */
