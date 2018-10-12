import React from "react";
import PropTypes from "prop-types";

import {formatPrice} from "../helpers";


class Fish extends React.Component {
  // exception handler for improper this.prop imports  
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    addToOrder: PropTypes.func,
  };
  render() {
    // deconstructs the props.details to each element
    const {image, name, price, desc, status} = this.props.details;
    const isAvailable = status === 'available';
    return (
      <li className="menu-fish">
        <img src={image} alt={name}/>
        <h3 className="fish-name">
          {name}
          {/* changes cents to dollars */}
          <span className="price">{formatPrice(price)}</span>
          </h3>
          <p>{desc}</p>
          <button disabled={!isAvailable}
            onClick={() => this.props.addToOrder(this.props.index)}
          >
            {isAvailable ? 'Add to Order' : 'Sold Out!'}
           </button>
        </li>
    )
  }
}
export default Fish;
