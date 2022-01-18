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
import Delete from "@material-ui/icons/Delete";

const DeleteDialog = ({ name, open, handleClose, handleDeleteRow, row }) => {
  const [values, setValues] = useState({
    open,
  });

  const descriptionElementRef = React.useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const scroll = "paper";

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
      <h2 style={{ textAlign: "center", padding: "20px" }}>
        {" "}
        Delete a {name}{" "}
      </h2>
      <DialogContent dividers={scroll === "paper"}>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <div className="row">
            <div className="offset-md-4 col-md-8">
              <h3>Are you sure you want to delete this item?</h3>
            </div>
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

            handleDeleteRow(row);
            handleClose();
          }}
        >
          {"Delete"} {name}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  name: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
};

export default DeleteDialog;
