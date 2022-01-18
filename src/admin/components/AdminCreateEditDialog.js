import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import MultipleSelect from "../../core/components/MultipleSelect";
import "react-toastify/dist/ReactToastify.min.css";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import "../../assets/css/Style.css";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { getFieldsFromPrototype } from "../../helpers/Default";
import SimpleSelect from "../../core/components/Select";

const FullScreenDialog = ({
  title,
  name,
  open,
  prototype,
  handleClose,
  handleCreateRow,
  handleEditRow,
  row,
}) => {
  const [values, setValues] = useState({
    prototype,
    open,
    dbItem: {
      ...row,
      categories: row && row.categories ? row.categories : [],
      type: row && row.type ? row.type : [],
    },
  });

  var { dbItem } = values;

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      dbItem: {
        ...dbItem,
        [name]: event && event.target ? event.target.value : event,
      },
    });
  };

  var textfieldsArray = getFieldsFromPrototype(prototype, true);

  const createForm = (arr) => {
    const form = [];
    arr.map((value) => {
      if (
        value === "title" ||
        value === "username" ||
        value === "firstname" ||
        value === "surname" ||
        value === "url" ||
        value === "author"
      ) {
        form.push(
          <div className="col-md-12" style={{ marginBottom: "10px" }}>
            <p>{value.charAt(0).toUpperCase() + value.slice(1)}</p>
            <TextField
              value={dbItem[value]}
              id={`${name}_${value}`}
              onChange={handleChange(value)}
              fullWidth
            />
          </div>
        );
      }
      if (value === "category") {
        form.push(
          <div className="col-md-12" style={{ marginBottom: "10px" }}>
            <SimpleSelect
              value={dbItem[value] || ""}
              sort="Newest listed"
              title="Category"
              menuitems={["Most popular", "Newest listed", "Oldest listed"]}
            />
          </div>
        );
      }
      if (value === "categories") {
        form.push(
          <div
            className="col-md-12"
            style={{ marginLeft: "-10px", marginBottom: "10px" }}
          >
            <MultipleSelect
              value={values.dbItem[value]}
              onChange={handleChange(value)}
              title="Categories"
              // blogs/products/users
              loadMenuItems={"blog"}
            />
          </div>
        );
      }
      if (value === "type") {
        form.push(
          <div
            className="col-md-12"
            style={{ marginLeft: "-10px", marginBottom: "10px" }}
          >
            <SimpleSelect
              sort={values.dbItem[value]}
              onChange={handleChange(value)}
              title="Type"
              menuitems={["blog", "product", "users", "menu"]}
            />
          </div>
        );
      }
      if (value === "publishedDate") {
        form.push(
          <div className="col-md-12">
            <p>Published Date</p>
            <TextField
              value={dbItem.published}
              onChange={handleChange(value)}
              id="datetime-local"
              type="datetime-local"
              defaultValue={Date.now()}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        );
      }
      if (value === "price") {
        form.push(
          <div className="col-md-12">
            <p>Price</p>
            <CurrencyTextField
              id="pricefield"
              variant="standard"
              value={dbItem.price}
              currencySymbol="£"
              outputFormat="string"
              onChange={handleChange(value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        );
      }
      if (value === "countInStock") {
        form.push(
          <div className="col-md-12">
            <p>Count In Stock</p>
            <TextField
              value={dbItem.countInStock}
              onChange={handleChange(value)}
              id="stockfield"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        );
      }
      return null;
    });

    return (
      <div
        className={`row ${
          values.image === undefined ? "col-md-8" : "col-md-12"
        }`}
      >
        {" "}
        {form}{" "}
      </div>
    );
  };

  const scroll = "paper";
  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      fullWidth
      disableBackdropClick={true}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <h2 style={{ textAlign: "center", padding: "20px" }}> Add a {name} </h2>
      <DialogContent dividers={scroll === "paper"}>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <div className="row">
            {createForm(textfieldsArray)}
            {
              <div
                className="row col-md-4"
                style={{ justifyContent: "center" }}
              ></div>
            }
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          variant="contained"
          component="label"
          onClick={(e) => {
            e.preventDefault();
            // replace image with newImage
            // if new image is present, display new image on the slide

            if (dbItem && dbItem.slug) {
              handleEditRow(dbItem);
            } else {
              handleCreateRow(dbItem);
            }

            // get current slide
            setValues({ ...values, dbItem });
            handleClose();
          }}
        >
          {!dbItem.slug ? "Create" : "Edit"} {name}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FullScreenDialog.propTypes = {
  name: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCreateRow: PropTypes.func.isRequired,
  handleEditRow: PropTypes.func.isRequired,
  prototype: PropTypes.array.isRequired,
  getURL: PropTypes.string.isRequired,
};

export default FullScreenDialog;
