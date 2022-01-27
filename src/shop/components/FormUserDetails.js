import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { isEmail } from "../../helpers/Default";

class FormUserDetails extends Component {
  state = {
    errors: {},
  };

  continue = (e) => {
    e.preventDefault();
    let newErrorsObject = {};
    if (
      this.props.values.firstName.length < 3 ||
      this.props.values.lastName.length < 3 ||
      !isEmail(this.props.values.email)
    ) {
      if (this.props.values.firstName.length < 3) {
        newErrorsObject = {
          ...newErrorsObject,
          firstName:
            "please enter valid a first name that is more than three letters",
        };
      }
      if (this.props.values.lastName.length < 3) {
        newErrorsObject = {
          ...newErrorsObject,
          lastName:
            "please enter valid a last name that is more than three letters",
        };
      }
      if (!isEmail(this.props.values.email)) {
        newErrorsObject = {
          ...newErrorsObject,
          email: "please enter a valid email",
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

  render() {
    const { values, handleChange, open, closeModal } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            onBackdropClick={closeModal}
            open={open}
            fullWidth
            maxWidth="xs"
          >
            <div style={{ padding: "20px" }}>
              <h1>Enter User Details</h1>
              <TextField
                placeholder="Enter Your First Name"
                label="First Name"
                error={!!this.state.errors.firstName}
                helperText={this.state.errors.firstName}
                onChange={handleChange("firstName")}
                defaultValue={values.firstName}
                margin="normal"
                fullWidth
              />
              <br />
              <TextField
                placeholder="Enter Your Last Name"
                label="Last Name"
                error={!!this.state.errors.lastName}
                helperText={this.state.errors.lastName}
                onChange={handleChange("lastName")}
                defaultValue={values.lastName}
                margin="normal"
                fullWidth
              />
              <br />
              <TextField
                placeholder="Enter Your Email"
                label="Email"
                error={!!this.state.errors.email}
                helperText={this.state.errors.email}
                onChange={handleChange("email")}
                defaultValue={values.email}
                margin="normal"
                fullWidth
              />
              <br />
              <TextField
                placeholder="Enter Your Phone Number"
                label="Phone"
                onChange={handleChange("phone")}
                defaultValue={values.phone}
                margin="normal"
                fullWidth
              />
              <br />
              <Button
                color="primary"
                variant="contained"
                onClick={this.continue}
              >
                Continue
              </Button>
            </div>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default FormUserDetails;
