import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core/";
import Button from "@material-ui/core/Button";

export class Confirm extends Component {
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
    const {
      values: {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        postcode,
        country,
      },
    } = this.props;

    return (
      <MuiThemeProvider>
        <>
          <Dialog
            onBackdropClick={this.props.closeModal}
            open={this.props.open}
            fullWidth
            maxWidth="sm"
          >
            <div style={{ padding: "20px" }}>
              <h2>Confirm Your Details</h2>
              <List>
                <ListItem>
                  <ListItemText primary="First Name" secondary={firstName} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Last Name" secondary={lastName} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Email" secondary={email} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Phone" secondary={phone} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Address" secondary={address} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="City" secondary={city} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Postcode" secondary={postcode} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Country" secondary={country} />
                </ListItem>
              </List>
              <br />

              <Button
                color="primary"
                variant="contained"
                onClick={this.continue}
              >
                Confirm & Continue
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

export default Confirm;
