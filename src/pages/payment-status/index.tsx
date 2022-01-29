import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {useStripe} from '@stripe/react-stripe-js';
import { useRouter } from "next/router";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import Loading from 'react-loading-components';

import server, {  baseUrl } from "../../../server";
import { actions as UserAction } from "../../../store/user";

const stripePromise = loadStripe( process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY );

const PaymentStatus = (props) => (
  <Elements stripe={stripePromise}>
    <MyComponent {...props} />
  </Elements>
);

const MyComponent = (props) => {
  const stripe = useStripe();
  const { user } = props;
  const [ loading, setLoading ] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState("Initializing...");

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    const paymentIntent = new URLSearchParams(window.location.search).get(
      'payment_intent'
    );
    
    setLoading(true);
    // Retrieve the PaymentIntent
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({paymentIntent}) => {
        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('Success! Payment received. Waiting for Saving Data');
            server.post(`${baseUrl}/deposit-end`, {
              client_id: user.clientId,
              payment_intent: paymentIntent,
              client_secret: clientSecret,
            })
            .then((response: any) => {
              setMessage( 'Saving Data Success, Now Redirecting...' );
              props.updateUser({clientId: user.clientId, username: user.username, balance: response.data.balance, clientSecret: user.clientSecret});
              setLoading(false);
              router.push('/');
            })
            .catch((error) => {
              setMessage('Saving Data Failed');
              setLoading(false);
            });
            break;

          case 'processing':
            setMessage("Payment processing. We'll update you when payment is received.");
            setLoading(false);
            break;

          case 'requires_payment_method':
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setMessage('Payment failed. Please try another payment method.');
            setLoading(false);
            break;

          default:
            setMessage('Something went wrong.');
            setLoading(false);
            break;
        }
      });
  }, [stripe]);

  return (
    <main className="main bg-white min-h-screen pt-16">
      <div className="grid grid-cols-3 gap-4">
        <div></div>
        <div className="text-center">
          <h2 className="fa-2x text-black text-center mb-4">{ message }</h2>
          {
            loading?
              <div className="inline-block">
                <Loading type='ball_triangle' width={100} height={100} fill='#f44242' class="ml-auto mr-auto" />
              </div>
              : ""
          }
        </div>
        <div></div>
      </div>
    </main>
  );
};

function mapStateToProps(state) {
  return {
      user: state.user.user? state.user.user: {}
  }
}

export default connect(mapStateToProps, UserAction )(PaymentStatus);