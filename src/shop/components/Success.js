import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

export class Success extends Component {
  continue = (e) => {
    e.preventDefault();
    // PROCESS FORM //
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
              <h1>Success</h1>
              <p>You will get an email with your order details.</p>
            </div>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default Success;
