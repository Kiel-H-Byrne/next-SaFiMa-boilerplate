/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import PaymentRequestForm from './PaymentRequestForm';
import { LinearProgress } from '@material-ui/core';

const StripeElement = () => {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe('pk_test_w704PYfwV1pPZVsitJy6cqm800alYmCZ5c'));
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        setStripe(window.Stripe('pk_test_w704PYfwV1pPZVsitJy6cqm800alYmCZ5c'));
      });
    }
  }, []);

  return (
    stripe ? (
      <StripeProvider stripe={stripe}>
        <Elements>
          <PaymentRequestForm stripe={stripe} />
        </Elements>
      </StripeProvider>
  ) : <LinearProgress />
  )
};

export default StripeElement;
