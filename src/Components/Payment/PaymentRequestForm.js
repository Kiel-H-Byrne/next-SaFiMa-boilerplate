/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  CardElement,
  injectStripe,
  PaymentRequestButtonElement
} from 'react-stripe-elements';
// import analytics from '/lib/analytics/analytics.min.js';
// const Stripe = require("stripe")("pk_test_w704PYfwV1pPZVsitJy6cqm800alYmCZ5c")
import Button from '@material-ui/core/Button';
import {
  FormControl,
  InputLabel,
  Input,
  FormGroup,
  Card
} from '@material-ui/core';

const style = {
  base: {
    fontSize: '16px',
    color: '#424770',
    fontFamily: 'Open Sans, sans-serif',
    letterSpacing: '0.025em',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#c23d4b'
  }
};

const PaymentRequestForm = props => {
  // For full documentation of the available paymentRequest options, see:
  // https://stripe.com/docs/stripe.js#the-payment-request-object
  const user = useSelector(state => state.users);
  const authUser = useSelector(state => state.session.authUser);
  let appointmentTotal = user.appointmentTotal;
  let [purchaseComplete, setpurchaseComplete] = useState(false);
  let [canMakePayment, setCanMakePayment] = useState(false);
  let [paymentRequest, setPaymentRequest] = useState(null);
  const [errorMessage, setErrorMessage] = '';

  useEffect(() => {
    //PAYMENTREQUEST (APPLE/CHROME/ANDROID PAY) API
    let tempReq = props.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: `CCBD Consultation:`,
        amount: appointmentTotal * 100
      },
      requestPayerName: true,
      requestPayerEmail: true
    });
    //CHARGES API
    tempReq.on('token', async ({ complete, token, ...data }) => {
      console.log('Received Stripe token: ', token);
      console.log('Received customer information: ', data);
      // Send the token to your server to charge it!
      //checkout page started payment intent and got client id, update intent and charge it.

      // const response = await fetch('/payment', {
      //   method: 'POST',
      //   body: JSON.stringify({ token: token.id }),
      //   headers: { 'content-type': 'application/json' }
      // });
      console.log(response, response.body);
      if (response.ok) {
        // Report to the browser that the payment was successful, prompting
        // it to close the browser payment interface.
        complete('success');
      } else {
        // Report to the browser that the payment failed, prompting it to
        // re-show the payment interface, or show an error message and close
        // the payment interface.
        complete('fail');
      }
    });
    //=====================
    //INTENTS API
    tempReq.on('paymentmethod', async ({ complete, paymentMethod }) => {
      const confirmResult = await stripe.confirmPaymentIntent(clientSecret, {
        payment_method: paymentMethod.id
      });

      if (confirmResult.error) {
        // Report to the browser that the payment failed, prompting it to
        // re-show the payment interface, or show an error message and close
        // the payment interface.
        complete('fail');
      } else {
        // Report to the browser that the confirmation was successful, prompting
        // it to close the browser payment method collection interface.
        complete('success');
        if (!confirmResult.paymentIntent.next_action) {
          // The payment has succeeded.
        } else {
          // The PaymentIntent requires additional action, pass it back to
          // Stripe.js to handle the rest of the flow.
          const { error, paymentIntent } = await stripe.handleCardPayment(
            clientSecret
          );
          if (error) {
            console.error(error);
            // The payment failed -- ask your customer for a new payment method.
          } else {
            console.log('successful payment intent');
            // The payment has succeeded.
          }
        }
      }
    });

    tempReq.canMakePayment().then(result => {
      console.log('canMakePayment?', !!result);
      //flip from undefined. if insecure site
      setCanMakePayment(!!result);
    });
    setPaymentRequest(tempReq);
  }, []);

  const handleCharge = async token => {
    //   const handleClose = props.handleClose
    console.log(authUser);

    // props.stripe.handleCardPayment()
    // const userEmail = user.emails[0].address;

    //   const userEmailProps = [
    //     "Congratulations! Your PAKKE experience is just beginning!",
    //     eventPurchasedTemplate(user, event)
    //   ];
    //   const hostEmailProps = [
    //     "You've got a new guest to your upcoming PAKKE Experience!",
    //     eventPurchasedHostTemplate(user, event)
    //   ];
    //   const adminEmailProps = [
    //     `{\u0394 TICKET PURCHASE: ${event.byline} \u0394}`,
    //     eventPurchasedAdminTemplate(user, event)
    //   ];
    //   try {

    // const response = await createCharge("userEmail", appointmentTotal, "AppointmentName", token)
    // console.log(response)

    //       if (error) {
    //         Bert.alert(error.reason, "danger");
    //         throw Meteor.Error('failed',error.reason)
    //       } else {
    //         // result ? console.log(result) : null
    //         handleClose();
    //         Bert.alert(`Yay! Check your inbox [${userEmail}] for more info!`, "pk-success", "fixed-bottom", "fa-thumbs-up");
    //         Meteor.call('amConfirmed', event._id);
    //         //EMAIL TO VISITOR
    //         if (Meteor.isProduction) {
    //           Meteor.call('sendEmail', userEmail, ...userEmailProps);
    //           //EMAIL TO HOST
    //           // let hostEmail = Meteor.users.findOne(event.hostId).emails[0].address;
    //           // Meteor.call('sendEmail', hostEmail, ...hostEmailProps);
    //           //EMAIL TO ADMIN
    //           Meteor.call('sendEmail', "info@pakke.us", ...adminEmailProps);

    //           analytics.track("Ticket Purchase", {
    //             InputLabel: event.byline,
    //             commerce: event.price,
    //             value: event.price,
    //             host: event.hostId,
    //           })

    //           analytics.track('Order Completed', {
    //             total: event.price,
    //             revenue: event.price - ((event.price*.029)+.30),
    //             currency: 'USD',
    //             products: [
    //               {
    //                 product_id: event._id,
    //                 name: event.byline,
    //                 price: event.price,
    //                 quantity: 1,
    //                 image_url: event.image
    //               }
    //             ]
    //           });
    //         } else {
    //           // console.log(token);
    //           console.log('emails wouldve been sent if not for development')
    //         }
    //       }
    //       return result
    //     });
    // } catch (error) {
    //   console.log(error)
    // }
  };

  const handleSubmit = async (e) => {
    console.log(e.target[2]);
    //check for fields, if not, ask again or show no validate, if so, send payment
    e.preventDefault();
    // try {
    //   const { paymentMethod, error } = await props.stripe.createPaymentMethod('card', {
    //     billing_details: { name: 'SudoPsience' }
    //   });
    //   if (error) {console.log(error)} else {
    //     console.log(paymentMethod, appointmentTotal)
    //     const {paymentIntent, error} = await props.stripe.handleCardPayment(paymentMethod.id)
    //     if(error) {console.log(error)} else {
    //       console.log(paymentIntent)
    //     }
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
    // try {
    //   const response = await fetch(`/checkout`, {
    //     method: 'POST',
    //     body: JSON.stringify({ appointmentTotal }),
    //     headers: { 'content-type': 'application/json' }
    //   });
    //   console.log(response, response.body);
    // } catch (err) {
    //   console.log(err);
    // }
  };
  const createToken = async (ev) => {
    ev.preventDefault();
    try {
      const {token, error} = await props.stripe.createToken({name: "sulallah"})  
      if (error ) {
        console.warn(error)
      } else {
        console.log(token)
        // use token to make payment
        props.stripe.charges.create()
      }
    } catch (error) {
      console.warn(error)
    }
    
  }

  const handlePayment = async ev => {
    console.log(props.stripe)
    // const { paymentMethod, error } = await props.stripe.createPaymentMethod('card', {
    //   billing_details: { name: 'SudoPsience' }
    // });
  };
  // Within the context of `Elements`, this call to createToken knows which Element to
  // tokenize, since there's only one in this group.
  //   props.stripe.createToken({'name': props.user.profile.name}).then(({error, token}) => {
  //     if (error) {
  //       // Bert.alert(error.message, "danger", "growl-topc-right");
  //     } else {
  //     handleCharge(token)
  //       //find class '.modal in' and change to '.modal hide'
  //       //amex 3796 330728 93002 6/20 9534 20031
  //       //testcard
  //     }
  //   });

  return purchaseComplete ? (
    <h2>Purchase Complete</h2>
  ) : canMakePayment ? (
    <PaymentRequestButtonElement
      paymentRequest={paymentRequest}
      className="PaymentRequestButton"
      style={
        appointmentTotal > 0
          ? {
              // For more details on how to style the Payment Request Button, see:
              // https://stripe.com/docs/elements/payment-request-button#styling-the-element
              paymentRequestButton: {
                theme: 'light',
                height: '64px'
              }
            }
          : {
              paymentRequestButton: {
                theme: 'dark',
                height: '64px',
                type: 'donate'
              }
            }
      }
    />
  ) : (
    <Card style={{ margin: '1rem', padding: '1rem' }}>
      <form id="payment-form" onSubmit={ev => handleSubmit(ev)}>
        <FormControl>
          <InputLabel htmlFor="card-name">Name</InputLabel>
          <Input
            id="card-name"
            type="text"
            placeholder={user.username || 'Your Name?'}
            required={true}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="card-phone">Phone</InputLabel>
          <Input
            id="card-phone"
            type="tel"
            placeholder={authUser.phoneNumber || ''}
            required={true}
          />
        </FormControl>

        <div
          id="card-element"
          style={{ height: '2rem', lineHeight: '2rem', fontSize: '2rem' }}
        >
          <CardElement />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Pay ${appointmentTotal}
          </Button>
        </div>
        {/* <div className="error" role="alert">
        <svg width="17" height="17" viewBox="0 0 17 17">
          <path
            className="base"
            fill="#000"
            d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
          ></path>
          <path
            className="glyph"
            fill="#FFF"
            d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
          ></path>
        </svg>
        <span className="message"></span>
      </div>
      <div className="success"> 
        <div className="icon">
          <svg width="84px" height="84px" viewBox="0 0 84 84" version="1.1">
            <circle
              className="border"
              cx="42"
              cy="42"
              r="40"
              strokeLinecap="round"
              strokeWidth="4"
              stroke="#000"
              fill="none"
            ></circle>
            <path
              className="checkmark"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M23.375 42.5488281 36.8840688 56.0578969 64.891932 28.0500338"
              strokeWidth="4"
              stroke="#000"
              fill="none"
            ></path>
          </svg>
        </div>
        <h3 className="h6">Payment successful</h3>
        <p className="message">
          <span>See You Soon!</span>
        </p>
        <a className="reset" href="#">
          <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
            <path
              fill="#000000"
              d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
            ></path>
          </svg>
        </a>
      </div> */}
      </form>
    </Card>
  );
};

export default injectStripe(PaymentRequestForm);
