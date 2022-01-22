import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";

class CheckoutForm extends React.Component {
  handleSubmit = async (event) => {
    // nextSlide();
    event.preventDefault();

    const { stripe, elements } = this.props;
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    // save order to db
    this.props.handleSubmit()

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${process.env.REACT_APP_CLIENT_URL}/cart`,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <CardSection />
          <button
            disabled={!this.props.stripe}
            color="primary"
            variant="contained"
          >
            Continue
          </button>
        </form>
      </div>
    );
  }
}

export default function InjectedCheckoutForm({ handleSubmit }) {
  return (
    <ElementsConsumer>
      {({ stripe, elements, }) => (
        <CheckoutForm
          handleSubmit={handleSubmit}
          stripe={stripe}
          elements={elements}
        />
      )}
    </ElementsConsumer>
  );
}
