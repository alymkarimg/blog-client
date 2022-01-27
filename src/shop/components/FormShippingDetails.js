import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { isPostCode } from "../../helpers/Default";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export class FormCardDetails extends Component {
  state = {
    errors: {},
  };

  continue = (e) => {
    e.preventDefault();
    if (
      this.props.values.address.length == 0 ||
      this.props.values.city.length == 0 ||
      !isPostCode(this.props.values.postcode) ||
      this.props.values.country.length == 0
    ) {
      let newErrorsObject = {};
      if (this.props.values.address.length == 0) {
        newErrorsObject = {
          ...newErrorsObject,
          address: "please enter valid address",
        };
      }
      if (this.props.values.city.length == 0) {
        newErrorsObject = {
          ...newErrorsObject,
          city: "please enter valid city",
        };
      }
      if (!isPostCode(this.props.values.postcode)) {
        newErrorsObject = {
          ...newErrorsObject,
          postcode: "please enter valid postcode",
        };
      }
      if (this.props.values.country.length == 0) {
        newErrorsObject = {
          ...newErrorsObject,
          country: "please enter valid country",
        };
      }
      this.setState({
        ...this.state,
        errors: newErrorsObject
      })
    } else {
      this.props.nextStep();
    }
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
                error={!!this.state.errors.address}
                helperText={this.state.errors.address}
                onChange={handleChange("address")}
                defaultValue={values.address}
                margin="normal"
                fullWidth
              />
              <br />
              <TextField
                placeholder="Enter Your city"
                label="City"
                error={!!this.state.errors.city}
                helperText={this.state.errors.city}
                onChange={handleChange("city")}
                defaultValue={values.city}
                margin="normal"
                fullWidth
              />
              <br />
              <TextField
                placeholder="Enter Your Postcode"
                label="Postcode"
                error={!!this.state.errors.postcode}
                helperText={this.state.errors.postcode}
                onChange={handleChange("postcode")}
                defaultValue={values.postcode}
                margin="normal"
                fullWidth
              />
              <TextField
                placeholder="Enter Your Country"
                label="Country"
                error={!!this.state.errors.country}
                helperText={this.state.errors.country}
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
