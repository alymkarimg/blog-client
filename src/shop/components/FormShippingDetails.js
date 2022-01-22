import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

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

  render() {
    const { values, handleChange, open, closeModal } = this.props;
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
              <h2>Enter your Delivery Details</h2>
              <TextField
                placeholder="Enter Your address"
                label="Address"
                onChange={handleChange("address")}
                defaultValue={values.address}
                margin="normal"
                fullWidth
              />
              <br />
              <TextField
                placeholder="Enter Your city"
                label="City"
                onChange={handleChange("city")}
                defaultValue={values.city}
                margin="normal"
                fullWidth
              />
              <br />
              <TextField
                placeholder="Enter Your Postcode"
                label="Postcode"
                onChange={handleChange("postcode")}
                defaultValue={values.postcode}
                margin="normal"
                fullWidth
              />
              <TextField
                placeholder="Enter Your Country"
                label="Country"
                onChange={handleChange("country")}
                defaultValue={values.country}
                margin="normal"
                fullWidth
              />
              <br />
              <br />
              <Button
                color="primary"
                variant="contained"
                onClick={this.continue}
              >
                Continue
              </Button>
              <Button color="secondary" variant="contained" onClick={this.back}>
                Back
              </Button>
            </div>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default FormCardDetails;
