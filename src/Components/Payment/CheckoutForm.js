import React from 'react';
import {useSelector} from 'react-redux'
import {CardElement, injectStripe} from 'react-stripe-elements';

const CheckoutForm = (props) => {
  
  const cart = useSelector(state => state.users.cart)
console.log(cart)

  const submit = async ev => {
    // User clicked submit
    console.log("dispatch some actions here...")
  }

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={submit}>Send</button>
      </div>
    );
}

export default injectStripe(CheckoutForm);
