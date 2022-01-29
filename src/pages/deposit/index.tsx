import React from 'react';
import { connect } from 'react-redux';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from '../../components/features/checkout-form';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function Deposit(props) {
  const {user} = props;
  const options = {
    // passing the client secret obtained in step 2
    clientSecret: user.clientSecret,
    // Fully customizable with appearance API.
    appearance: {/*...*/},
  };

  return (
      <main className="main bg-white min-h-screen pt-16">
        <div className="grid grid-cols-3 gap-4">
          <div></div>
          <div className="">
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm />
            </Elements>
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

export default connect(mapStateToProps, null )(Deposit);