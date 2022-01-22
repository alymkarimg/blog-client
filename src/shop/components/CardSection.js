import React, { Fragment } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
//   style: {
//     base: {
//       color: "#303238",
//       fontSize: "16px",
//       fontFamily: "sans-serif",
//       fontSmoothing: "antialiased",
//       "::placeholder": {
//         color: "#CFD7DF",
//       },
//     },
//     invalid: {
//       color: "#e5424d",
//       ":focus": {
//         color: "#303238",
//       },
//     },
//   },
};

function CardSection({ handleSubmit }) {

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement id={"card-element"} />
    </form>
  );
}

export default CardSection;
