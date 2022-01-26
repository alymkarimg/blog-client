import React, { Component } from "react";
import FormUserDetails from "./FormUserDetails";
import FormCardDetails from "./FormCardDetails";
import FormShippingDetails from "./FormShippingDetails";
import Confirm from "./Confirm";
import Success from "./Success";
import { getLocalStorage, getCookie } from "../../helpers/Default";
import { withRouter } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import axios from 'axios'

export class UserForm extends Component {
  state = {
    step: 1,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    country: "",
    open: this.props.open,
    payment_intent: null,
    payment_intent_client_secret: null,
    redirect_status: null,
  };

  static contextType = CartContext;

  componentDidUpdate(prevProps) {
    const params = decodeURI(this.props.location.search)
      .replace("?", "")
      .split("&")
      .map((param) => param.split("="))
      .reduce((values, [key, value]) => {
        values[key] = value;
        return values;
      }, {});

    // check location object to see if there is a query string
    // split query string
    // if the correct three queries exist
    if (this.props.open && !this.state.open) {
      this.setState({ ...this.state, open: this.props.open });
    }

    if (
      params.payment_intent &&
      params.payment_intent_client_secret &&
      params.redirect_status == "succeeded"
    ) {
      this.setState(
        {
          step: 5,
          open: true,
          payment_intent: params.payment_intent,
          payment_intent_client_secret: params.payment_intent_client_secret,
          redirect_status: params.redirect_status,
        },
        () => {
          this.props.history.replace({
            search: undefined,
          });
        }
      );

      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API}/order/edit`,
        data: {
          payment_intent: params.payment_intent,
          payment_intent_client_secret: params.payment_intent_client_secret,
          redirect_status: params.redirect_status,
        },
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          ContentType: "multipart/form-data",
        },
      })
        .then((response) => {
          console.log("Article Successfully edited", response);
        })
        .catch((error) => {
          console.log("Error saving article", error);
          // error.response.data.err.forEach((error) => {
          //   toast.error(error)
          // })
        });
    }
  }

  componentDidMount() {
    let user = getLocalStorage("user") ? getLocalStorage("user") : {};
    this.setState({
      ...this.state,
      firstName: user.firstname,
      lastName: user.surname,
      email: user.email,
      open: this.props.open,
    });
    if (this.state.step == 5) {
      this.props.openModal();
    }
  }

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
      open: true,
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
      open: true,
    });
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  handleSubmit = () => {
    console.log(
      this.state,
      this.context.cart,
      this.state.payment_intent,
      this.state.payment_intent_client_secret,
      this.state.redirect_status
    );
  };

  render() {
    const { handleCheckout } = this.context;
    const { step } = this.state;
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      postcode,
      country,
    } = this.state;

    const values = {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      postcode,
      country,
    };

    switch (step) {
      case 1:
        return (
          <FormUserDetails
            open={this.state.open}
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            closeModal={() => {
              this.setState({ ...this.state, open: !this.state.open });
              this.props.closeModal();
              handleCheckout();
            }}
            values={values}
          />
        );
      case 2:
        return (
          <FormShippingDetails
            open={this.state.open}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            closeModal={() => {
              this.setState({ ...this.state, open: !this.state.open });
              this.props.closeModal();
            }}
            values={values}
          />
        );
      case 3:
        return (
          <Confirm
            open={this.state.open}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            closeModal={() => {
              this.setState({ ...this.state, open: !this.state.open });
              this.props.closeModal();
            }}
            values={values}
          />
        );
      case 4:
        return (
          <FormCardDetails
            open={this.state.open}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            closeModal={() => {
              this.setState({ ...this.state, open: !this.state.open });
              this.props.closeModal();
            }}
            values={values}
          />
        );
      case 5:
        return (
          <Success
            open={this.state.open}
            handleChange={this.handleChange}
            closeModal={() => {
              this.setState({ ...this.state, open: !this.state.open, step: 1 });
              this.props.closeModal();
              handleCheckout();
            }}
            values={values}
          />
        );
    }
  }
}

export default withRouter(UserForm);
