import React, { Component, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { getLocalStorage, getCookie } from "../../helpers/Default";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { CartContext } from "../../contexts/CartContext";

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

  static contextType = CartContext;

  componentDidMount() {
    let user = {
      firstName: this.props.values.firstName,
      lastName: this.props.values.lastName,
      email: this.props.values.email,
      phone: this.props.values.phone,
    };

    const formCardDetails = this;

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/order/secret/${this.context.cart.storage.total}`,
      data: {
        cart: this.context.cart,
        user,
        shippingAddress: {
          address: this.props.values.phone,
          city: this.props.values.city,
          postcode: this.props.values.postcode,
          country: this.props.values.country,
        },
        username: getLocalStorage("user").username,
      },
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
        ContentType: "multipart/form-data",
      },
    })
      .then(function (responseJson) {
        var clientSecretToSet = responseJson.data.client_secret;
        formCardDetails.setState({
          clientSecret: clientSecretToSet,
          loading: false,
        });
        // Call stripe.confirmCardPayment() with the client secret.
      })
      .catch((err) => {
        console.log(err);
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
