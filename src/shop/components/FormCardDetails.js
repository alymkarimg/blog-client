import React, { Component, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { CartContext }  from '../../contexts/CartContext'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export class FormCardDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  state = {
    clientSecret: "",
    loading: true,
  };

  static contextType = CartContext

  componentDidMount() {
    const formCardDetails = this;
    fetch(`${process.env.REACT_APP_API}/secret/${this.context.cart.storage.total}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (responseJson) {
        var clientSecretToSet = responseJson.client_secret;
        formCardDetails.setState({
          clientSecret: clientSecretToSet,
          loading: false,
        });
        // Call stripe.confirmCardPayment() with the client secret.
      });
  }

  render() {
    const { values, handleChange, open, closeModal } = this.props;
    const { clientSecret, loading } = this.state;
    if (!loading) {
      return (
        <MuiThemeProvider>
          <>
            <Dialog
              onBackdropClick={closeModal}
              open={open}
              fullWidth
              maxWidth="sm"
            >
              <div style={{ padding: "20px" }}>
                <h2> Enter Your Card Details</h2>
                <div style={{ padding: "20px" }}>
                  {
                    <Elements
                      stripe={stripePromise}
                      options={{ clientSecret: clientSecret }}
                    >
                      <CheckoutForm
                        handleSubmit={this.props.handleSubmit}
                        nextSlide={this.continue}
                        back={this.back}
                      />
                    </Elements>
                  }
                </div>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={this.back}
                >
                  Back
                </Button>
              </div>
            </Dialog>
          </>
        </MuiThemeProvider>
      );
    } else {
      return (
        <MuiThemeProvider>
          <>
            <Dialog
              onBackdropClick={closeModal}
              open={open}
              fullWidth
              maxWidth="sm"
            >
              <div style={{ padding: "20px" }}>
                <h2> Loading... </h2>
              </div>
            </Dialog>
          </>
        </MuiThemeProvider>
      );
    }
  }
}

export default FormCardDetails;
