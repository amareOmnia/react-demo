import React from "react";
import {formatPrice} from "../helpers"
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';
    const transitionOptions = {
      // config for adding/removing order item
      classNames: "order",
      key,
      timeout:{enter:1000, exit:500}
    };
    // if fish from DB is not loaded, continue
    if (!fish) return null;
    if(!isAvailable) {
      return ( 
      <CSSTransition {...transitionOptions}>
      <li key={key}>Sorry, {fish ? fish.name : "fish"} is no longer available</li>
      </CSSTransition>
      )
    }
    return (
      <CSSTransition {...transitionOptions}>
      <li key={key}>
      <span>
          <TransitionGroup component="span" className="count">
            <CSSTransition classNames="count" key={count} timeout={{enter: 200, exit: 200}}>
              <span>{count}</span>
            </CSSTransition>
          </TransitionGroup>
          lbs {fish.name}
          {formatPrice(count * fish.price)}
          <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
          </span>
      </li>
      </CSSTransition>
    );
  }
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if(isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          <br/>Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}
export default Order;
