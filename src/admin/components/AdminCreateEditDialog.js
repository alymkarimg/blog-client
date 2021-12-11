import React, { setState, useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import EditableArea from "../../core/components/EditableArea";
import MultipleSelect from "../../core/components/MultipleSelect";
import "react-toastify/dist/ReactToastify.min.css";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import "../../assets/css/Style.css";
import ImageUploader from "../../core/components/ImageUploader";
import {
  getFieldsFromPrototype,
  uploadImage,
  getCookie,
} from "../../helpers/Default";
import Banner from "../../core/components/AnimatedBanner";
import { EditableAreaContext } from "../../contexts/EditableAreaContext";
import { AnimatedBannerContext } from "../../contexts/AnimatedBannerContext";

const FullScreenDialog = ({
  title,
  name,
  open,
  prototype,
  handleClose,
  handleCreateRow,
  handleEditRow,
  row
}) => {
  const { updatePublishEditableAreas } = useContext(EditableAreaContext);
  const { updatePublishAnimatedBanners } = useContext(AnimatedBannerContext);

  console.log(row)

  const [values, setValues] = useState({
    prototype,
    open,
    dbItem: {...row, categories: row.categories == undefined ? [] : row.categories },
  });

  useEffect(() => {
    row && setValues({...values, dbItem: {
      
    }})
  }, [])

  var { dbItem, prototype, open, row } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, dbItem: { ...dbItem, [name]: event.target.value } });
  };

  const onEditorChange = (editableArea) => {
    setValues({ ...values, dbItem: { ...dbItem, editableArea } });
  };

  var textfieldsArray = getFieldsFromPrototype(prototype, true);

  const createForm = (arr) => {
    const form = [];
    arr.map((value) => {
      if (value == "title") {
        form.push(
          <div className="col-md-12" style={{ marginBottom: "10px" }}>
            <p>Title</p>
            <TextField
              value={dbItem.title}
              id={`${name}_Title`}
              onChange={handleChange(value)}
              fullWidth
            />
          </div>
        );
      }
      // if (value == "parent") {
      //   form.push(<div className="col-md-12" style={{ marginBottom: "10px" }}>
      //     <p>Title</p>
      //     <TextField id={`${name}_`} onChange={handleChange(value)} fullWidth />
      //   </div>)
      // }
      if (value == "url") {
        form.push(
          <div className="col-md-12" style={{ marginBottom: "10px" }}>
            <p>URL</p>
            <TextField
              value={dbItem.url}
              id={`${name}_Url`}
              onChange={handleChange(value)}
              fullWidth
            />
          </div>
        );
      }
      if (value == "author") {
        form.push(
          <div className="col-md-12" style={{ marginBottom: "10px" }}>
            <p>Author</p>
            <TextField
              value={dbItem.author}
              id={`${name}_Author`}
              onChange={handleChange(value)}
              fullWidth
            />
          </div>
        );
      }
      if (value == "categories") {
        form.push(
          <div
            className="col-md-12"
            style={{ marginLeft: "-10px", marginBottom: "10px" }}
          >
            <MultipleSelect
              value={values.dbItem[value]}
              onChange={handleChange(value)}
              title="Categories"
              menuitems={["Vegetarian", "Recipes", "Articles"]}
            />
          </div>
        );
      }
      if (value == "publishedDate") {
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
    });

    return (
      <div
        className={`row ${
          values.image == undefined ? "col-md-8" : "col-md-12"
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
      <h2 style={{ textAlign: "center", padding: "20px" }}> Add a blog </h2>
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
              >
              </div>
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

            if(dbItem && dbItem.slug){
              handleEditRow(dbItem);
            } else {
              handleCreateRow(dbItem);
            }

            // get current slide
            setValues({ ...values, dbItem });
            handleClose();
          }}
        >
          Create {name}
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
