import React from "react";
import PropTypes from "prop-types";

class AddFishForm extends React.Component {
  static propTypes = {
    addFish: PropTypes.func,
  };
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = (event) => {
    //stop form resubmission
    event.preventDefault();
    //collect data
    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value,
    };
    this.props.addFish(fish);
    //resets form after
    event.currentTarget.reset();
  }

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name='name'
          ref={this.nameRef}
          type='text'
          placeholder='name'/>
        <input name='price'
          ref={this.priceRef}
          type='text'
          placeholder='price'/>
        <select name='status'
          ref={this.statusRef}
          type='text'
          placeholder='status'>
            <option value="available">Fresh!!</option>
            <option value="unavailable">SOLD OUT!!</option>
        </select>
        <textarea name='desc'
          ref={this.descRef}
          type='text'
          placeholder='desc'/>
        <input name='image'
          ref={this.imageRef}
          type='text'
          placeholder='image'/>
        <button type='submit'>+ Add Fishbois</button>
      </form>
    )
  }
}
export default AddFishForm;
